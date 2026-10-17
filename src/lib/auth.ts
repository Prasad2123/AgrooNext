import { cookies } from 'next/headers';
import { SignJWT, jwtVerify } from 'jose';
import prisma from './prisma';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'agroonext_dev_secret_key_change_in_production_1234567890'
);

const COOKIE_NAME = 'agroonext_session';

export interface SessionUser {
  id: string;
  email: string | null;
  phone?: string | null;
  role: string; // 'STUDENT_LEARNER' | 'SYSTEM_ADMIN' | 'STAFF_TRAINER' | 'PUBLIC_VISITOR'
  fullName?: string;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  return await new SignJWT({
    sub: user.id,
    email: user.email,
    phone: user.phone,
    role: user.role,
    fullName: user.fullName || '',
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(JWT_SECRET);
}

export async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    if (!payload.sub) return null;
    return {
      id: payload.sub as string,
      email: (payload.email as string) || null,
      phone: (payload.phone as string) || null,
      role: (payload.role as string) || 'STUDENT_LEARNER',
      fullName: (payload.fullName as string) || '',
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;

  const session = await verifySessionToken(token);
  if (!session) return null;

  // Verify that the user still exists and is active in database
  const dbUser = await prisma.user.findUnique({
    where: { id: session.id },
    select: { id: true, email: true, phone: true, role: true, isActive: true },
  });

  if (!dbUser || !dbUser.isActive) {
    return null;
  }

  return {
    ...session,
    role: dbUser.role,
  };
}

export async function setSessionCookie(token: string) {
  const cookieStore = cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function requireAuth(allowedRoles?: string[]): Promise<SessionUser> {
  const session = await getSession();
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(session.role)) {
    throw new Error('FORBIDDEN');
  }
  return session;
}
