import { NextResponse } from 'next/server';
import { getSession } from '../../../../lib/auth';
import prisma from '../../../../lib/prisma';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ user: null });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.id },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        profile: {
          select: {
            fullName: true,
            gender: true,
            dateOfBirth: true,
            educationLevel: true,
            institutionName: true,
            city: true,
            state: true,
            idProofType: true,
            idProofStatus: true,
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        phone: user.phone,
        role: user.role,
        fullName: user.profile?.fullName,
        profile: user.profile,
      },
    });
  } catch (error) {
    console.error('Session check error:', error);
    return NextResponse.json({ user: null });
  }
}
