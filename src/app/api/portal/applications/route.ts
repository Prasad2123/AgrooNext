import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

const createApplicationSchema = z.object({
  batchId: z.string().min(1, 'Please select a training batch.'),
  pricingTierId: z.string().min(1, 'Please select an applicable pricing tier.'),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);

    const applications = await prisma.application.findMany({
      where: { userId: session.id },
      include: {
        batch: {
          include: {
            course: {
              include: { programme: true },
            },
          },
        },
        pricingTier: true,
        payments: {
          orderBy: { createdAt: 'desc' },
        },
        enrollment: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ applications });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Please sign in to view applications.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to retrieve applications.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = createApplicationSchema.parse(body);

    // Validate batch existence and capacity
    const batch = await prisma.batch.findUnique({
      where: { id: validated.batchId },
      include: {
        course: true,
        applications: {
          where: {
            currentStatus: { in: ['SUBMITTED', 'UNDER_REVIEW', 'APPROVED', 'PAYMENT_PENDING', 'ENROLLED'] },
          },
        },
      },
    });

    if (!batch) {
      return NextResponse.json({ error: 'Selected batch does not exist.' }, { status: 404 });
    }

    if (batch.batchStatus === 'CANCELLED' || batch.batchStatus === 'COMPLETED') {
      return NextResponse.json({ error: 'This training batch is not accepting new applications.' }, { status: 400 });
    }

    // Validate pricing tier exists and matches course
    const pricingTier = await prisma.pricingTier.findUnique({
      where: { id: validated.pricingTierId },
    });

    if (!pricingTier || pricingTier.courseId !== batch.courseId) {
      return NextResponse.json({ error: 'Invalid pricing tier for this course.' }, { status: 400 });
    }

    // Check if learner already has an active application for this batch
    const existing = await prisma.application.findFirst({
      where: {
        userId: session.id,
        batchId: validated.batchId,
        currentStatus: { notIn: ['CANCELLED', 'REJECTED'] },
      },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'You already have an active application for this batch.' },
        { status: 409 }
      );
    }

    // Generate sequential application number
    const year = new Date().getFullYear();
    const count = await prisma.application.count();
    const applicationNumber = `APP-${year}-${String(count + 1).padStart(4, '0')}`;

    // Create application in SUBMITTED state
    const application = await prisma.$transaction(async (tx) => {
      const app = await tx.application.create({
        data: {
          applicationNumber,
          userId: session.id,
          batchId: validated.batchId,
          pricingTierId: validated.pricingTierId,
          currentStatus: 'SUBMITTED',
          calculatedFeeInr: pricingTier.baseFeeInr,
          submittedAt: new Date(),
          auditTrail: {
            create: [
              {
                previousStatus: null,
                newStatus: 'DRAFT',
                changedByUserId: session.id,
                comments: 'Application initialized by applicant.',
              },
              {
                previousStatus: 'DRAFT',
                newStatus: 'SUBMITTED',
                changedByUserId: session.id,
                comments: validated.notes || 'Application submitted for admission review.',
              },
            ],
          },
        },
        include: {
          batch: { include: { course: true } },
          pricingTier: true,
        },
      });

      await tx.auditLog.create({
        data: {
          userId: session.id,
          action: 'APPLICATION_CREATED',
          entityName: 'applications',
          entityId: app.id,
          newState: JSON.stringify({ applicationNumber, course: batch.course.title }),
        },
      });

      return app;
    });

    return NextResponse.json({ success: true, application }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Create application error:', error);
    return NextResponse.json({ error: 'Failed to submit application.' }, { status: 500 });
  }
}
