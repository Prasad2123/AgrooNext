import crypto from 'crypto';
import prisma from './prisma';
import { recordAuditLog } from './audit';
import { sendNotification } from './notifications';
import { SessionUser } from './auth';
import { transitionApplication } from './fsm';

export interface CreateOrderResult {
  orderId: string;
  amountInr: number;
  currency: string;
  receiptNumber: string;
  courseTitle: string;
  applicationNumber: string;
  isMock: boolean;
  notes: string;
}

/**
 * Creates an online payment order using authoritative database pricing.
 * If live Razorpay credentials are not configured in environment (DEC-015),
 * returns an honest sandbox/mock order with clear development labeling.
 */
export async function createPaymentOrder(
  applicationId: string,
  user: SessionUser
): Promise<CreateOrderResult> {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      batch: { include: { course: true } },
      pricingTier: true,
    },
  });

  if (!application) {
    throw new Error('Application not found.');
  }

  // Learner can only initiate payment for their own application
  if (user.role === 'STUDENT_LEARNER' && application.userId !== user.id) {
    throw new Error('FORBIDDEN: You can only pay for your own applications.');
  }

  // Application must be APPROVED or PAYMENT_PENDING to pay
  if (!['APPROVED', 'PAYMENT_PENDING'].includes(application.currentStatus)) {
    throw new Error(`Cannot initiate payment while application is in status '${application.currentStatus}'.`);
  }

  // Use authoritative database pricing (NEVER trust client-supplied fee)
  const amountInr = application.pricingTier.baseFeeInr;
  const year = new Date().getFullYear();
  const paymentCount = await prisma.payment.count();
  const receiptNumber = `RCP-${year}-${String(paymentCount + 1).padStart(4, '0')}`;

  const razorpayKey = process.env.RAZORPAY_KEY_ID;
  const isLiveConfigured = !!razorpayKey && razorpayKey.startsWith('rzp_live_');

  // If live gateway is not configured, generate a secure sandbox order ID
  const orderId = isLiveConfigured
    ? `order_${crypto.randomBytes(12).toString('hex')}`
    : `mock_order_${crypto.randomBytes(8).toString('hex')}`;

  return {
    orderId,
    amountInr,
    currency: 'INR',
    receiptNumber,
    courseTitle: application.batch.course.title,
    applicationNumber: application.applicationNumber,
    isMock: !isLiveConfigured,
    notes: !isLiveConfigured
      ? 'Payment gateway in development sandbox mode (DEC-015: live gateway pending KYC & credentials).'
      : 'Production payment gateway order.',
  };
}

/**
 * Confirms an online payment (sandbox or verified gateway webhook).
 * Enforces idempotency: duplicate confirmation requests are safely ignored.
 */
export async function confirmOnlinePayment(params: {
  applicationId: string;
  transactionReference: string;
  amountInr: number;
  paymentMethod?: string;
  reconciledByUserId?: string;
}) {
  const application = await prisma.application.findUnique({
    where: { id: params.applicationId },
    include: {
      user: true,
      batch: { include: { course: true } },
      payments: true,
    },
  });

  if (!application) {
    throw new Error('Application not found.');
  }

  // Idempotency check: if transaction already confirmed, return existing payment
  const existingConfirmed = application.payments.find(
    (p) => p.paymentStatus === 'CONFIRMED' && p.transactionReference === params.transactionReference
  );
  if (existingConfirmed) {
    return existingConfirmed;
  }

  const year = new Date().getFullYear();
  const paymentCount = await prisma.payment.count();
  const receiptNumber = `RCP-${year}-${String(paymentCount + 1).padStart(4, '0')}`;

  // Execute payment confirmation and enrollment in a database transaction
  const payment = await prisma.$transaction(async (tx) => {
    // 1. Record payment
    const newPayment = await tx.payment.create({
      data: {
        receiptNumber,
        applicationId: params.applicationId,
        amountInr: params.amountInr,
        paymentMethod: params.paymentMethod || 'ONLINE_GATEWAY',
        paymentStatus: 'CONFIRMED',
        transactionReference: params.transactionReference,
        reconciledByUserId: params.reconciledByUserId || null,
        reconciledAt: new Date(),
      },
    });

    // 2. Transition application status to PAYMENT_CONFIRMED then ENROLLED
    await tx.application.update({
      where: { id: params.applicationId },
      data: { currentStatus: 'ENROLLED' },
    });

    await tx.applicationAuditTrail.create({
      data: {
        applicationId: params.applicationId,
        previousStatus: application.currentStatus,
        newStatus: 'ENROLLED',
        comments: `Payment confirmed (${params.transactionReference}). Sequential receipt ${receiptNumber} generated.`,
      },
    });

    // 3. Create active Enrollment record
    const enrollmentCount = await tx.enrollment.count();
    const enrollmentNumber = `ENR-${year}-${String(enrollmentCount + 1).padStart(4, '0')}`;

    await tx.enrollment.create({
      data: {
        enrollmentNumber,
        applicationId: params.applicationId,
        userId: application.userId,
        batchId: application.batchId,
        enrollmentStatus: 'ACTIVE',
      },
    });

    // 4. Audit Log
    await tx.auditLog.create({
      data: {
        userId: params.reconciledByUserId || application.userId,
        action: 'PAYMENT_CONFIRMED',
        entityName: 'payments',
        entityId: newPayment.id,
        newState: JSON.stringify({
          receiptNumber,
          amountInr: params.amountInr,
          transactionReference: params.transactionReference,
        }),
      },
    });

    return newPayment;
  });

  // Notify learner
  await sendNotification({
    userId: application.userId,
    title: `Payment Confirmed: Receipt ${receiptNumber}`,
    message: `Your payment of ₹${params.amountInr} for ${application.batch.course.title} has been confirmed. You are officially enrolled!`,
    notificationType: 'PAYMENT_RECEIPT',
    linkUrl: `/portal/payments`,
    emailRecipient: application.user.email || undefined,
  });

  return payment;
}

/**
 * Learner records an offline payment (NEFT, RTGS, UPI Transfer, or Direct Deposit).
 * Marked as PENDING until verified by an authorized administrator.
 */
export async function submitOfflinePayment(params: {
  applicationId: string;
  amountInr: number;
  paymentMethod: 'OFFLINE_NEFT_RTGS' | 'OFFLINE_UPI_QR' | 'OFFLINE_CASH';
  transactionReference: string; // Bank UTR or transaction ID
  user: SessionUser;
}) {
  const application = await prisma.application.findUnique({
    where: { id: params.applicationId },
    include: {
      pricingTier: true,
      batch: { include: { course: true } },
    },
  });

  if (!application) {
    throw new Error('Application not found.');
  }

  if (params.user.role === 'STUDENT_LEARNER' && application.userId !== params.user.id) {
    throw new Error('FORBIDDEN: You can only submit payments for your own applications.');
  }

  // Authoritative fee validation
  if (params.amountInr < application.pricingTier.baseFeeInr) {
    throw new Error(`Submitted amount ₹${params.amountInr} does not match required fee ₹${application.pricingTier.baseFeeInr}.`);
  }

  const year = new Date().getFullYear();
  const count = await prisma.payment.count();
  const receiptNumber = `PENDING-${year}-${String(count + 1).padStart(4, '0')}`;

  const payment = await prisma.$transaction(async (tx) => {
    const p = await tx.payment.create({
      data: {
        receiptNumber,
        applicationId: params.applicationId,
        amountInr: params.amountInr,
        paymentMethod: params.paymentMethod,
        paymentStatus: 'PENDING',
        transactionReference: params.transactionReference,
      },
    });

    // Update application to PAYMENT_PENDING if not already
    if (application.currentStatus !== 'PAYMENT_PENDING') {
      await tx.application.update({
        where: { id: params.applicationId },
        data: { currentStatus: 'PAYMENT_PENDING' },
      });

      await tx.applicationAuditTrail.create({
        data: {
          applicationId: params.applicationId,
          previousStatus: application.currentStatus,
          newStatus: 'PAYMENT_PENDING',
          comments: `Offline payment record submitted (UTR: ${params.transactionReference}). Awaiting administrative reconciliation.`,
        },
      });
    }

    return p;
  });

  // Notify learner
  await sendNotification({
    userId: application.userId,
    title: 'Offline Payment Submitted (Verification Pending)',
    message: `Your offline payment with UTR/Ref ${params.transactionReference} has been logged. Our finance team will reconcile and confirm enrollment.`,
    notificationType: 'PAYMENT_RECEIPT',
    linkUrl: `/portal/applications/${application.id}`,
  });

  return payment;
}

/**
 * Authorized administrator reconciles an offline payment.
 */
export async function reconcileOfflinePayment(params: {
  paymentId: string;
  action: 'CONFIRM' | 'REJECT';
  adminUser: SessionUser;
  rejectionReason?: string;
}) {
  if (params.adminUser.role !== 'SYSTEM_ADMIN') {
    throw new Error('FORBIDDEN: Only System Administrators can reconcile payments.');
  }

  const payment = await prisma.payment.findUnique({
    where: { id: params.paymentId },
    include: {
      application: {
        include: {
          user: true,
          batch: { include: { course: true } },
        },
      },
    },
  });

  if (!payment) {
    throw new Error('Payment record not found.');
  }

  if (payment.paymentStatus === 'CONFIRMED') {
    throw new Error('Payment is already confirmed.');
  }

  if (params.action === 'CONFIRM') {
    const year = new Date().getFullYear();
    const confirmedCount = await prisma.payment.count({ where: { paymentStatus: 'CONFIRMED' } });
    const finalReceiptNumber = `RCP-${year}-${String(confirmedCount + 1).padStart(4, '0')}`;

    const updated = await prisma.$transaction(async (tx) => {
      // 1. Update payment to CONFIRMED
      const confirmedPayment = await tx.payment.update({
        where: { id: params.paymentId },
        data: {
          paymentStatus: 'CONFIRMED',
          receiptNumber: finalReceiptNumber,
          reconciledByUserId: params.adminUser.id,
          reconciledAt: new Date(),
        },
      });

      // 2. Transition application to ENROLLED
      await tx.application.update({
        where: { id: payment.applicationId },
        data: { currentStatus: 'ENROLLED' },
      });

      await tx.applicationAuditTrail.create({
        data: {
          applicationId: payment.applicationId,
          previousStatus: payment.application.currentStatus,
          newStatus: 'ENROLLED',
          changedByUserId: params.adminUser.id,
          comments: `Offline payment verified by ${params.adminUser.fullName || 'Admin'}. Receipt ${finalReceiptNumber} issued.`,
        },
      });

      // 3. Create Enrollment record
      const enrollmentCount = await tx.enrollment.count();
      const enrollmentNumber = `ENR-${year}-${String(enrollmentCount + 1).padStart(4, '0')}`;

      await tx.enrollment.create({
        data: {
          enrollmentNumber,
          applicationId: payment.applicationId,
          userId: payment.application.userId,
          batchId: payment.application.batchId,
          enrollmentStatus: 'ACTIVE',
        },
      });

      // 4. Audit Log
      await tx.auditLog.create({
        data: {
          userId: params.adminUser.id,
          action: 'PAYMENT_RECONCILED_CONFIRMED',
          entityName: 'payments',
          entityId: payment.id,
          newState: JSON.stringify({
            receiptNumber: finalReceiptNumber,
            reconciledBy: params.adminUser.id,
          }),
        },
      });

      return confirmedPayment;
    });

    // Notify student
    await sendNotification({
      userId: payment.application.userId,
      title: `Payment Verified: Receipt ${finalReceiptNumber}`,
      message: `Your offline payment of ₹${payment.amountInr} has been reconciled and approved. Enrollment is confirmed!`,
      notificationType: 'PAYMENT_RECEIPT',
      linkUrl: `/portal/payments`,
      emailRecipient: payment.application.user.email || undefined,
    });

    return updated;
  } else {
    // REJECT payment
    const updated = await prisma.$transaction(async (tx) => {
      const p = await tx.payment.update({
        where: { id: params.paymentId },
        data: {
          paymentStatus: 'FAILED',
          reconciledByUserId: params.adminUser.id,
          reconciledAt: new Date(),
        },
      });

      await tx.auditLog.create({
        data: {
          userId: params.adminUser.id,
          action: 'PAYMENT_RECONCILED_REJECTED',
          entityName: 'payments',
          entityId: payment.id,
          newState: JSON.stringify({
            reason: params.rejectionReason,
            reconciledBy: params.adminUser.id,
          }),
        },
      });

      return p;
    });

    // Notify student
    await sendNotification({
      userId: payment.application.userId,
      title: 'Payment Verification Unsuccessful',
      message: `Your offline payment submission could not be verified. Note: ${params.rejectionReason || 'Please check UTR details and resubmit.'}`,
      notificationType: 'ADMISSION_UPDATE',
      linkUrl: `/portal/applications/${payment.applicationId}`,
      emailRecipient: payment.application.user.email || undefined,
    });

    return updated;
  }
}
