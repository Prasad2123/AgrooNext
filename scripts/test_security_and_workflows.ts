/**
 * Automated Security, FSM, and Integration Verification Suite
 * Tests IDOR protection, role authorization, FSM transitions, payment reconciliation, and audit logs.
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createSessionToken, verifySessionToken } from '../src/lib/auth';
import { transitionApplication, getValidNextStatuses } from '../src/lib/fsm';
import { confirmOnlinePayment, submitOfflinePayment, reconcileOfflinePayment } from '../src/lib/payment';
import { savePrivateDocument, getPrivateDocument } from '../src/lib/storage';

const prisma = new PrismaClient();

async function runTests() {
  console.log('====================================================');
  console.log('   AGROONEXT INTEGRATION & SECURITY TEST SUITE       ');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  [PASS] ${testName}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${testName}`);
      failed++;
    }
  }

  try {
    // 1. AUTHENTICATION & PASSWORD HASHING TEST
    console.log('\n--- 1. Identity & Auth Tests ---');
    const admin = await prisma.user.findUnique({ where: { email: 'admin@agroonext.org' } });
    assert(!!admin, 'Admin account exists in database');
    const adminPassMatch = admin ? await bcrypt.compare('AgrooNext@2026', admin.passwordHash) : false;
    assert(adminPassMatch, 'Admin password verifies with bcrypt hash');

    const learnerA = await prisma.user.findUnique({ where: { email: 'learner@example.com' } });
    const learnerB = await prisma.user.findUnique({ where: { email: 'learner2@example.com' } });
    assert(!!learnerA && !!learnerB, 'Learner A and Learner B exist for isolation testing');

    // Token creation and verification
    const adminToken = await createSessionToken({
      id: admin!.id,
      email: admin!.email!,
      role: admin!.role,
      fullName: 'System Administrator',
    });
    const verifiedAdmin = await verifySessionToken(adminToken);
    assert(verifiedAdmin?.role === 'SYSTEM_ADMIN', 'JWT token verifies with correct SYSTEM_ADMIN role');

    const learnerAToken = await createSessionToken({
      id: learnerA!.id,
      email: learnerA!.email!,
      role: learnerA!.role,
      fullName: 'Pooja Patil',
    });
    const verifiedLearnerA = await verifySessionToken(learnerAToken);
    assert(verifiedLearnerA?.role === 'STUDENT_LEARNER', 'JWT token verifies with STUDENT_LEARNER role');

    // 2. IDOR PROTECTION & APPLICATION ISOLATION TESTS
    console.log('\n--- 2. IDOR & Access Control Isolation Tests ---');
    const appA = await prisma.application.findFirst({
      where: { userId: learnerA!.id },
    });
    assert(!!appA, 'Learner A has an existing application in DB');

    // Learner B attempting to submit payment for Learner A's application must fail
    let idorPaymentBlocked = false;
    try {
      const learnerBUser = {
        id: learnerB!.id,
        email: learnerB!.email!,
        role: learnerB!.role,
        fullName: 'Learner B',
      };
      await submitOfflinePayment({
        applicationId: appA!.id,
        amountInr: appA!.calculatedFeeInr,
        paymentMethod: 'OFFLINE_UPI_QR',
        transactionReference: 'TEST_IDOR_REF',
        user: learnerBUser,
      });
    } catch (err: any) {
      if (err.message.includes('FORBIDDEN')) {
        idorPaymentBlocked = true;
      }
    }
    assert(idorPaymentBlocked, 'IDOR Prevention: Learner B is forbidden from submitting payment for Learner A application');

    // 3. SECURE FILE STORAGE & DOCUMENT IDOR ISOLATION
    console.log('\n--- 3. Secure File Storage & Document IDOR Tests ---');
    const testFileBuffer = Buffer.from('Mock Student ID document content for isolation verification');
    const storedDoc = await savePrivateDocument({
      userId: learnerA!.id,
      documentType: 'STUDENT_ID_PROOF',
      fileName: 'student_id_proof.png',
      mimeType: 'image/png',
      buffer: testFileBuffer,
      uploaderUser: verifiedLearnerA!,
    });
    assert(!!storedDoc.id && storedDoc.storageKey.startsWith('doc_'), 'Private file saved with randomized non-guessable storage key');

    // Learner A can download their own document
    const docA = await getPrivateDocument(storedDoc.id, verifiedLearnerA!);
    assert(docA.buffer.length === testFileBuffer.length, 'Learner A successfully downloads their own document');

    // Learner B attempting to download Learner A's private document MUST be rejected with FORBIDDEN
    let idorDocBlocked = false;
    try {
      const learnerBUser = {
        id: learnerB!.id,
        email: learnerB!.email!,
        role: learnerB!.role,
        fullName: 'Learner B',
      };
      await getPrivateDocument(storedDoc.id, learnerBUser);
    } catch (err: any) {
      if (err.message.includes('FORBIDDEN')) {
        idorDocBlocked = true;
      }
    }
    assert(idorDocBlocked, 'Document IDOR Protection: Learner B is strictly forbidden from downloading Learner A private document');

    // Admin can access document for review
    const docAdmin = await getPrivateDocument(storedDoc.id, verifiedAdmin!);
    assert(docAdmin.buffer.length === testFileBuffer.length, 'Administrator authorized to access student document for review');

    // 4. ADMISSIONS FSM STATE MACHINE TESTS
    console.log('\n--- 4. Admissions 12-State FSM Verification ---');
    const draftNext = getValidNextStatuses('DRAFT');
    assert(draftNext.includes('SUBMITTED') && draftNext.includes('CANCELLED'), 'DRAFT transitions to SUBMITTED or CANCELLED');

    const waitlistedNext = getValidNextStatuses('WAITLISTED');
    assert(waitlistedNext.includes('APPROVED') && waitlistedNext.includes('CANCELLED'), 'WAITLISTED is active non-terminal state (can transition to APPROVED or CANCELLED)');

    const completedNext = getValidNextStatuses('COMPLETED');
    assert(completedNext.length === 0, 'COMPLETED is a terminal state (zero outgoing transitions)');

    // Create a fresh test application to step through FSM
    const batch = await prisma.batch.findFirst({
      include: { course: { include: { pricingTiers: true } } },
    });
    const pricingTier = batch!.course.pricingTiers[0];

    const testApp = await prisma.application.create({
      data: {
        applicationNumber: `TEST-APP-${Date.now()}`,
        userId: learnerB!.id,
        batchId: batch!.id,
        pricingTierId: pricingTier.id,
        currentStatus: 'DRAFT',
        calculatedFeeInr: pricingTier.baseFeeInr,
      },
    });

    // Step 1: DRAFT -> SUBMITTED (by Learner B)
    const step1 = await transitionApplication(
      testApp.id,
      'SUBMITTED',
      { id: learnerB!.id, email: learnerB!.email!, role: 'STUDENT_LEARNER' },
      'Learner submitted online application'
    );
    assert(step1.currentStatus === 'SUBMITTED', 'FSM Transition: DRAFT -> SUBMITTED succeeded');

    // Step 2: Invalid transition attempt: Learner attempting to jump directly to APPROVED or ENROLLED
    let invalidTransitionBlocked = false;
    try {
      await transitionApplication(
        testApp.id,
        'ENROLLED',
        { id: learnerB!.id, email: learnerB!.email!, role: 'STUDENT_LEARNER' },
        'Illegal jump'
      );
    } catch (err: any) {
      if (err.message.includes('Invalid') || err.message.includes('not authorized')) {
        invalidTransitionBlocked = true;
      }
    }
    assert(invalidTransitionBlocked, 'FSM Protection: Direct jump from SUBMITTED to ENROLLED is rejected');

    // Step 3: Admin transitions SUBMITTED -> UNDER_REVIEW -> APPROVED
    await transitionApplication(
      testApp.id,
      'UNDER_REVIEW',
      { id: admin!.id, email: admin!.email!, role: 'SYSTEM_ADMIN' },
      'Staff verifying credentials'
    );
    const approved = await transitionApplication(
      testApp.id,
      'APPROVED',
      { id: admin!.id, email: admin!.email!, role: 'SYSTEM_ADMIN' },
      'Application approved for payment'
    );
    assert(approved.currentStatus === 'APPROVED', 'FSM Transition: UNDER_REVIEW -> APPROVED succeeded');

    // 5. PAYMENT RECONCILIATION & ENROLLMENT WORKFLOW
    console.log('\n--- 5. Payment Reconciliation & Receipt Issuance ---');
    // Learner submits offline payment reference
    const offlinePay = await submitOfflinePayment({
      applicationId: testApp.id,
      amountInr: testApp.calculatedFeeInr,
      paymentMethod: 'OFFLINE_NEFT_RTGS',
      transactionReference: `NEFT_TEST_${Date.now()}`,
      user: { id: learnerB!.id, email: learnerB!.email!, role: 'STUDENT_LEARNER', fullName: 'Learner B' },
    });
    assert(offlinePay.paymentStatus === 'PENDING', 'Offline payment created in PENDING state awaiting reconciliation');
    assert(offlinePay.receiptNumber.startsWith('PENDING-'), 'Pending payment assigned temporary PENDING receipt number');

    // Admin reconciles payment
    const reconciled = await reconcileOfflinePayment({
      paymentId: offlinePay.id,
      action: 'CONFIRM',
      adminUser: { id: admin!.id, email: admin!.email!, role: 'SYSTEM_ADMIN', fullName: 'Administrator' },
    });
    assert(reconciled.paymentStatus === 'CONFIRMED', 'Admin reconciliation confirmed payment');
    assert(reconciled.receiptNumber.startsWith('RCP-'), 'Official sequential receipt RCP-2026-XXXX generated upon confirmation');

    // Verify application transitioned to ENROLLED and enrollment record created
    const enrolledApp = await prisma.application.findUnique({
      where: { id: testApp.id },
      include: { enrollment: true },
    });
    assert(enrolledApp?.currentStatus === 'ENROLLED', 'Application atomically transitioned to ENROLLED upon payment confirmation');
    assert(!!enrolledApp?.enrollment?.enrollmentNumber, 'Official enrollment record created with unique enrollmentNumber');

    // 6. IDEMPOTENCY TEST
    console.log('\n--- 6. Payment Idempotency & Webhook Safety ---');
    const duplicatePayment = await confirmOnlinePayment({
      applicationId: testApp.id,
      transactionReference: reconciled.transactionReference!,
      amountInr: testApp.calculatedFeeInr,
    });
    assert(duplicatePayment.id === reconciled.id, 'Idempotency: Re-submitting identical transaction reference returns existing record without duplicate charges');

    // 7. AUDIT LOG VALIDATION
    console.log('\n--- 7. Immutable Audit Trail Verification ---');
    const latestLogs = await prisma.auditLog.findMany({
      where: { entityId: testApp.id },
    });
    assert(latestLogs.length > 0, `Audit logs recorded for test application mutations (${latestLogs.length} events logged)`);

    // Clean up test application, document, and payment
    await prisma.enrollment.deleteMany({ where: { applicationId: testApp.id } });
    await prisma.payment.deleteMany({ where: { applicationId: testApp.id } });
    await prisma.applicationAuditTrail.deleteMany({ where: { applicationId: testApp.id } });
    await prisma.application.delete({ where: { id: testApp.id } });
    await prisma.document.delete({ where: { id: storedDoc.id } });

    console.log('\n====================================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('====================================================\n');

    if (failed > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Fatal error during test suite execution:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

runTests();
