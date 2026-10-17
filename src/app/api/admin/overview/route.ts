import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await requireAuth(['SYSTEM_ADMIN', 'STAFF_TRAINER']);

    // Truthful, database-backed operational metrics
    const [
      totalApplications,
      submittedApps,
      underReviewApps,
      approvedApps,
      enrolledApps,
      waitlistedApps,
      totalPayments,
      confirmedPayments,
      pendingPayments,
      totalUsers,
      totalBatches,
      activeBatches,
      totalInquiries,
      newInquiries,
    ] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { currentStatus: 'SUBMITTED' } }),
      prisma.application.count({ where: { currentStatus: 'UNDER_REVIEW' } }),
      prisma.application.count({ where: { currentStatus: 'APPROVED' } }),
      prisma.application.count({ where: { currentStatus: 'ENROLLED' } }),
      prisma.application.count({ where: { currentStatus: 'WAITLISTED' } }),
      prisma.payment.count(),
      prisma.payment.count({ where: { paymentStatus: 'CONFIRMED' } }),
      prisma.payment.count({ where: { paymentStatus: 'PENDING' } }),
      prisma.user.count({ where: { role: 'STUDENT_LEARNER' } }),
      prisma.batch.count(),
      prisma.batch.count({ where: { batchStatus: 'ENROLLING' } }),
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: 'NEW' } }),
    ]);

    // Calculate confirmed revenue
    const confirmedRevenueAggregate = await prisma.payment.aggregate({
      where: { paymentStatus: 'CONFIRMED' },
      _sum: { amountInr: true },
    });

    const confirmedRevenueInr = confirmedRevenueAggregate._sum.amountInr || 0;

    // Recent 5 applications
    const recentApplications = await prisma.application.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: {
        user: { select: { email: true, profile: { select: { fullName: true } } } },
        batch: { include: { course: true } },
      },
    });

    // Recent 5 inquiries
    const recentInquiries = await prisma.inquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      metrics: {
        totalApplications,
        pendingReviewCount: submittedApps + underReviewApps,
        approvedApps,
        enrolledApps,
        waitlistedApps,
        totalLearners: totalUsers,
        totalBatches,
        activeBatches,
        totalPayments,
        pendingReconciliationCount: pendingPayments,
        confirmedPaymentsCount: confirmedPayments,
        confirmedRevenueInr,
        totalInquiries,
        newInquiriesCount: newInquiries,
      },
      recentApplications,
      recentInquiries,
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied: Administrator privileges required.' }, { status: 403 });
    }
    console.error('Admin overview error:', error);
    return NextResponse.json({ error: 'Failed to retrieve overview metrics.' }, { status: 500 });
  }
}
