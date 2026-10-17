import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

const courseSchema = z.object({
  id: z.string().optional(),
  programmeId: z.string().optional().nullable(),
  courseCode: z.string().min(3),
  title: z.string().min(3),
  slug: z.string().min(3),
  summary: z.string().min(10),
  offeringType: z.string(),
  deliveryLevel: z.string(),
  standardDuration: z.string(),
  prerequisites: z.string().optional(),
  isPublished: z.boolean().default(true),
});

export async function GET() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        programme: true,
        pricingTiers: true,
        _count: { select: { batches: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    const programmes = await prisma.programme.findMany({
      orderBy: { displayOrder: 'asc' },
    });

    return NextResponse.json({ courses, programmes });
  } catch (error) {
    console.error('Fetch courses error:', error);
    return NextResponse.json({ error: 'Failed to retrieve courses.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = courseSchema.parse(body);

    const course = await prisma.course.create({
      data: {
        courseCode: validated.courseCode,
        programmeId: validated.programmeId || null,
        title: validated.title,
        slug: validated.slug,
        summary: validated.summary,
        offeringType: validated.offeringType,
        deliveryLevel: validated.deliveryLevel,
        standardDuration: validated.standardDuration,
        prerequisites: validated.prerequisites || null,
        isPublished: validated.isPublished,
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: 'COURSE_CREATED',
      entityName: 'courses',
      entityId: course.id,
      newState: { code: course.courseCode, title: course.title },
    });

    return NextResponse.json({ success: true, course }, { status: 201 });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to create course.' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = courseSchema.parse(body);

    if (!validated.id) {
      return NextResponse.json({ error: 'Course ID is required.' }, { status: 400 });
    }

    const course = await prisma.course.update({
      where: { id: validated.id },
      data: {
        title: validated.title,
        summary: validated.summary,
        standardDuration: validated.standardDuration,
        prerequisites: validated.prerequisites || null,
        isPublished: validated.isPublished,
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: 'COURSE_UPDATED',
      entityName: 'courses',
      entityId: course.id,
      newState: { title: course.title, isPublished: course.isPublished },
    });

    return NextResponse.json({ success: true, course });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied' }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to update course.' }, { status: 400 });
  }
}
