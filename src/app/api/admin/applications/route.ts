import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';

export async function GET(req: NextRequest) {
  try {
    await requireAuth(['SYSTEM_ADMIN', 'STAFF_TRAINER']);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const batchId = searchParams.get('batchId');
    const query = searchParams.get('q');

    const where: any = {};
    if (status && status !== 'ALL') {
      where.currentStatus = status;
    }
    if (batchId && batchId !== 'ALL') {
      where.batchId = batchId;
    }
    if (query) {
      where.OR = [
        { applicationNumber: { contains: query } },
        { user: { email: { contains: query } } },
        { user: { profile: { fullName: { contains: query } } } },
      ];
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            phone: true,
            profile: {
              select: {
                fullName: true,
                city: true,
                state: true,
                educationLevel: true,
                institutionName: true,
                idProofStatus: true,
              },
            },
          },
        },
        batch: {
          include: {
            course: { include: { programme: true } },
          },
        },
        pricingTier: true,
        payments: true,
        enrollment: true,
        auditTrail: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const batches = await prisma.batch.findMany({
      include: { course: { select: { title: true } } },
      orderBy: { startDate: 'asc' },
    });

    return NextResponse.json({ applications, batches });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: 'Failed to retrieve applications.' }, { status: 500 });
  }
}
