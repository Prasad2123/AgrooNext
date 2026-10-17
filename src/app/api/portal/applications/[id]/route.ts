import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { transitionApplication } from '@/lib/fsm';

export const dynamic = 'force-dynamic';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const { id } = params;

    const application = await prisma.application.findUnique({
      where: { id },
      include: {
        batch: {
          include: {
            course: { include: { programme: true } },
          },
        },
        pricingTier: true,
        auditTrail: {
          include: {
            changedByUser: { select: { role: true, profile: { select: { fullName: true } } } },
          },
          orderBy: { createdAt: 'asc' },
        },
        payments: {
          orderBy: { createdAt: 'desc' },
        },
        enrollment: true,
      },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    // Security check: learner can only access their own application
    if (session.role === 'STUDENT_LEARNER' && application.userId !== session.id) {
      return NextResponse.json({ error: 'FORBIDDEN: You do not have access to this application.' }, { status: 403 });
    }

    return NextResponse.json({ application });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to retrieve application details.' }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const { id } = params;
    const body = await req.json();

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json({ error: 'Application not found.' }, { status: 404 });
    }

    if (session.role === 'STUDENT_LEARNER' && application.userId !== session.id) {
      return NextResponse.json({ error: 'FORBIDDEN' }, { status: 403 });
    }

    // Handle learner withdrawal / cancellation
    if (body.action === 'CANCEL') {
      const updated = await transitionApplication(
        id,
        'CANCELLED',
        session,
        body.reason || 'Withdrawn by applicant.'
      );
      return NextResponse.json({ success: true, application: updated });
    }

    return NextResponse.json({ error: 'Invalid action requested.' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to update application.' }, { status: 400 });
  }
}
