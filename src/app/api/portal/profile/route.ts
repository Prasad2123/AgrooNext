import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

const updateProfileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  gender: z.string().optional(),
  dateOfBirth: z.string().optional(),
  educationLevel: z.string().optional(),
  institutionName: z.string().optional(),
  guardianName: z.string().optional(),
  guardianContact: z.string().optional(),
  city: z.string().min(2, 'City must be specified.'),
  state: z.string().min(2, 'State must be specified.'),
  idProofType: z.string().optional(),
});

export async function GET() {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const profile = await prisma.studentProfile.findUnique({
      where: { userId: session.id },
      include: {
        user: { select: { email: true, phone: true, role: true } },
      },
    });

    if (!profile) {
      return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });
    }

    return NextResponse.json({ profile });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Please sign in to view your profile.' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to load profile.' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const body = await req.json();
    const validated = updateProfileSchema.parse(body);

    const oldProfile = await prisma.studentProfile.findUnique({
      where: { userId: session.id },
    });

    const updatedProfile = await prisma.studentProfile.upsert({
      where: { userId: session.id },
      update: {
        fullName: validated.fullName,
        gender: validated.gender || null,
        dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : null,
        educationLevel: validated.educationLevel || null,
        institutionName: validated.institutionName || null,
        guardianName: validated.guardianName || null,
        guardianContact: validated.guardianContact || null,
        city: validated.city,
        state: validated.state,
        idProofType: validated.idProofType || null,
      },
      create: {
        userId: session.id,
        fullName: validated.fullName,
        gender: validated.gender || null,
        dateOfBirth: validated.dateOfBirth ? new Date(validated.dateOfBirth) : null,
        educationLevel: validated.educationLevel || null,
        institutionName: validated.institutionName || null,
        guardianName: validated.guardianName || null,
        guardianContact: validated.guardianContact || null,
        city: validated.city,
        state: validated.state,
        idProofType: validated.idProofType || null,
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: 'PROFILE_UPDATED',
      entityName: 'student_profiles',
      entityId: updatedProfile.id,
      oldState: oldProfile ? { city: oldProfile.city, state: oldProfile.state } : null,
      newState: { city: updatedProfile.city, state: updatedProfile.state },
    });

    return NextResponse.json({ success: true, profile: updatedProfile });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Update profile error:', error);
    return NextResponse.json({ error: 'Failed to update profile.' }, { status: 500 });
  }
}
