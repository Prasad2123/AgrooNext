import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { createPaymentOrder, submitOfflinePayment, confirmOnlinePayment } from '../../../../lib/payment';

const createOrderSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required.'),
});

const offlinePaymentSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required.'),
  amountInr: z.number().positive('Payment amount must be positive.'),
  paymentMethod: z.enum(['OFFLINE_NEFT_RTGS', 'OFFLINE_UPI_QR', 'OFFLINE_CASH']),
  transactionReference: z.string().min(4, 'Bank UTR or transaction reference is required.'),
});

const sandboxConfirmSchema = z.object({
  applicationId: z.string().min(1, 'Application ID is required.'),
  orderId: z.string().min(1, 'Order ID is required.'),
  transactionReference: z.string().min(1, 'Transaction reference is required.'),
});

export async function GET() {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);

    const payments = await prisma.payment.findMany({
      where: {
        application: { userId: session.id },
      },
      include: {
        application: {
          include: {
            batch: {
              include: { course: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ payments });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to retrieve payments.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const body = await req.json();

    // Mode A: Initiate payment order (Online)
    if (body.type === 'CREATE_ORDER') {
      const validated = createOrderSchema.parse(body);
      const order = await createPaymentOrder(validated.applicationId, session);
      return NextResponse.json({ success: true, order });
    }

    // Mode B: Submit Offline Payment (NEFT/UPI/Cash)
    if (body.type === 'SUBMIT_OFFLINE') {
      const validated = offlinePaymentSchema.parse(body);
      const payment = await submitOfflinePayment({
        applicationId: validated.applicationId,
        amountInr: validated.amountInr,
        paymentMethod: validated.paymentMethod,
        transactionReference: validated.transactionReference,
        user: session,
      });
      return NextResponse.json({ success: true, payment });
    }

    // Mode C: Confirm Sandbox Payment (when live gateway is not configured per DEC-015)
    if (body.type === 'CONFIRM_SANDBOX') {
      const validated = sandboxConfirmSchema.parse(body);
      const app = await prisma.application.findUnique({
        where: { id: validated.applicationId },
        include: { pricingTier: true },
      });

      if (!app) {
        return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
      }

      if (session.role === 'STUDENT_LEARNER' && app.userId !== session.id) {
        return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
      }

      const confirmed = await confirmOnlinePayment({
        applicationId: validated.applicationId,
        transactionReference: validated.transactionReference,
        amountInr: app.pricingTier.baseFeeInr,
        paymentMethod: 'ONLINE_GATEWAY_SANDBOX',
      });

      return NextResponse.json({ success: true, payment: confirmed });
    }

    return NextResponse.json({ error: 'Invalid payment request type.' }, { status: 400 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ error: error.message || 'Payment processing failed.' }, { status: 400 });
  }
}
