import { NextResponse } from 'next/server';
import { clearSessionCookie, getSession } from '../../../../lib/auth';
import { recordAuditLog } from '../../../../lib/audit';

export async function POST() {
  try {
    const session = await getSession();
    if (session) {
      await recordAuditLog({
        userId: session.id,
        action: 'USER_LOGGED_OUT',
        entityName: 'users',
        entityId: session.id,
      });
    }

    await clearSessionCookie();
    return NextResponse.json({ success: true, message: 'Logged out successfully.' });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Failed to process logout.' }, { status: 500 });
  }
}
