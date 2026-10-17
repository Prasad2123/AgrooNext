import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';
import { createSessionToken, setSessionCookie } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

const registerSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().regex(/^[0-9+\s()-]{8,15}$/, 'Please enter a valid phone number (8-15 digits).'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  city: z.string().optional(),
  state: z.string().optional(),
  educationLevel: z.string().optional(),
  institutionName: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = registerSchema.parse(body);

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: validated.email.toLowerCase() },
          { phone: validated.phone },
        ],
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'An account with this email or phone number already exists.' },
        { status: 409 }
      );
    }

    const passwordHash = await bcrypt.hash(validated.password, 10);

    const user = await prisma.user.create({
      data: {
        email: validated.email.toLowerCase(),
        phone: validated.phone,
        passwordHash,
        role: 'STUDENT_LEARNER',
        profile: {
          create: {
            fullName: validated.fullName,
            city: validated.city || 'Pune',
            state: validated.state || 'Maharashtra',
            educationLevel: validated.educationLevel || null,
            institutionName: validated.institutionName || null,
          },
        },
      },
      include: { profile: true },
    });

    const sessionUser = {
      id: user.id,
      email: user.email,
      phone: user.phone,
      role: user.role,
      fullName: user.profile?.fullName,
    };

    const token = await createSessionToken(sessionUser);
    await setSessionCookie(token);

    await recordAuditLog({
      userId: user.id,
      action: 'USER_REGISTERED',
      entityName: 'users',
      entityId: user.id,
      newState: { email: user.email, role: user.role },
    });

    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          fullName: user.profile?.fullName,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to complete registration.' }, { status: 500 });
  }
}
