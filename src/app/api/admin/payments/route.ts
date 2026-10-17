import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { reconcileOfflinePayment } from '../../../../lib/payment';

const reconcileSchema = z.object({
  paymentId: z.string().min(1, 'Payment ID is required.'),
  action: z.enum(['CONFIRM', 'REJECT']),
  rejectionReason: z.string().optional(),
});

export async function GET(req: NextRequest) {
  try {
    await requireAuth(['SYSTEM_ADMIN']);
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.paymentStatus = status;
    }

    const payments = await prisma.payment.findMany({
      where,
      include: {
        application: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                phone: true,
                profile: { select: { fullName: true } },
              },
            },
            batch: {
              include: { course: true },
            },
          },
        },
        reconciledByUser: {
          select: { role: true, profile: { select: { fullName: true } } },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ payments });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied: Administrator privileges required.' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to retrieve payments.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  return reconcileHandler(req);
}

// Frontend sends PATCH for reconcile actions
export async function PATCH(req: NextRequest) {
  return reconcileHandler(req);
}

async function reconcileHandler(req: NextRequest) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = reconcileSchema.parse(body);

    const reconciled = await reconcileOfflinePayment({
      paymentId: validated.paymentId,
      action: validated.action,
      adminUser: session,
      rejectionReason: validated.rejectionReason,
    });

    return NextResponse.json({ success: true, payment: reconciled });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Payment reconciliation failed.' }, { status: 400 });
  }
}
