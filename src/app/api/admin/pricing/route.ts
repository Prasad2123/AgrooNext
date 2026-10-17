import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

export const dynamic = 'force-dynamic';

const updatePricingSchema = z.object({
  id: z.string().min(1, 'Pricing tier ID is required.'),
  baseFeeInr: z.number().positive('Fee must be a positive number.'),
  eligibilityNotes: z.string().optional(),
});

export async function GET() {
  try {
    const pricingTiers = await prisma.pricingTier.findMany({
      include: {
        course: { select: { title: true, courseCode: true, standardDuration: true } },
      },
      orderBy: { baseFeeInr: 'asc' },
    });

    return NextResponse.json({ pricingTiers });
  } catch (error) {
    console.error('Fetch pricing error:', error);
    return NextResponse.json({ error: 'Failed to retrieve pricing tiers.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = updatePricingSchema.parse(body);

    const oldTier = await prisma.pricingTier.findUnique({
      where: { id: validated.id },
      include: { course: true },
    });

    if (!oldTier) {
      return NextResponse.json({ error: 'Pricing tier not found.' }, { status: 404 });
    }

    const updated = await prisma.pricingTier.update({
      where: { id: validated.id },
      data: {
        baseFeeInr: validated.baseFeeInr,
        eligibilityNotes: validated.eligibilityNotes !== undefined ? validated.eligibilityNotes : oldTier.eligibilityNotes,
      },
    });

    // Mandatory financial audit log
    await recordAuditLog({
      userId: session.id,
      action: 'PRICING_FEE_UPDATED',
      entityName: 'pricing_tiers',
      entityId: updated.id,
      oldState: { course: oldTier.course.title, baseFeeInr: oldTier.baseFeeInr },
      newState: { course: oldTier.course.title, baseFeeInr: updated.baseFeeInr },
    });

    return NextResponse.json({ success: true, pricingTier: updated });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied: Only System Administrators can alter pricing.' }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update pricing.' }, { status: 400 });
  }
}
