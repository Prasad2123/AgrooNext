import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

const batchSchema = z.object({
  id: z.string().optional(),
  courseId: z.string().min(1, 'Course is required.'),
  batchCode: z.string().min(3, 'Batch code is required.'),
  startDate: z.string().min(1, 'Start date is required.'),
  endDate: z.string().min(1, 'End date is required.'),
  venueType: z.string().default('TRAINING_CENTER'),
  venueAddress: z.string().min(3, 'Venue address description is required.'),
  minimumCapacity: z.number().int().min(1).default(5),
  maximumCapacity: z.number().int().min(1).default(30),
  batchStatus: z.enum(['SCHEDULED', 'ENROLLING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED']).default('SCHEDULED'),
});

export async function GET() {
  try {
    const batches = await prisma.batch.findMany({
      include: {
        course: { select: { title: true, courseCode: true, offeringType: true } },
        _count: {
          select: {
            applications: true,
            enrollments: true,
          },
        },
      },
      orderBy: { startDate: 'desc' },
    });

    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      select: { id: true, title: true, courseCode: true },
      orderBy: { title: 'asc' },
    });

    return NextResponse.json({ batches, courses });
  } catch (error) {
    console.error('Fetch batches error:', error);
    return NextResponse.json({ error: 'Failed to retrieve batches.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN', 'STAFF_TRAINER']);
    const body = await req.json();
    const validated = batchSchema.parse(body);

    const existing = await prisma.batch.findUnique({
      where: { batchCode: validated.batchCode },
    });

    if (existing) {
      return NextResponse.json({ error: 'A batch with this code already exists.' }, { status: 409 });
    }

    const batch = await prisma.batch.create({
      data: {
        courseId: validated.courseId,
        batchCode: validated.batchCode,
        startDate: new Date(validated.startDate),
        endDate: new Date(validated.endDate),
        venueType: validated.venueType,
        venueAddress: validated.venueAddress,
        minimumCapacity: validated.minimumCapacity,
        maximumCapacity: validated.maximumCapacity,
        batchStatus: validated.batchStatus,
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: 'BATCH_CREATED',
      entityName: 'batches',
      entityId: batch.id,
      newState: { batchCode: batch.batchCode, courseId: batch.courseId },
    });

    return NextResponse.json({ success: true, batch }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create batch.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = batchSchema.parse(body);

    if (!validated.id) {
      return NextResponse.json({ error: 'Batch ID is required for update.' }, { status: 400 });
    }

    const batch = await prisma.batch.update({
      where: { id: validated.id },
      data: {
        courseId: validated.courseId,
        startDate: new Date(validated.startDate),
        endDate: new Date(validated.endDate),
        venueType: validated.venueType,
        venueAddress: validated.venueAddress,
        minimumCapacity: validated.minimumCapacity,
        maximumCapacity: validated.maximumCapacity,
        batchStatus: validated.batchStatus,
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: 'BATCH_UPDATED',
      entityName: 'batches',
      entityId: batch.id,
      newState: { batchStatus: batch.batchStatus, capacity: batch.maximumCapacity },
    });

    return NextResponse.json({ success: true, batch });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update batch.' }, { status: 400 });
  }
}
