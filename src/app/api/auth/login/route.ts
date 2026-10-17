import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';
import { createSessionToken, setSessionCookie } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

const loginSchema = z.object({
  identifier: z.string().min(3, 'Please enter your email or phone number.'),
  password: z.string().min(1, 'Please enter your password.'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    const identifier = validated.identifier.trim().toLowerCase();

    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { phone: validated.identifier.trim() },
        ],
      },
      include: { profile: true },
    });

    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'Invalid email, phone, or password credentials.' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(validated.password, user.passwordHash);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email, phone, or password credentials.' },
        { status: 401 }
      );
    }

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
      action: 'USER_LOGGED_IN',
      entityName: 'users',
      entityId: user.id,
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        fullName: user.profile?.fullName,
      },
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Invalid input' }, { status: 400 });
    }
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to process login.' }, { status: 500 });
  }
}
