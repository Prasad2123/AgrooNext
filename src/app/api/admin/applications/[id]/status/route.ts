import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { requireAuth } from '@/lib/auth';
import { transitionApplication, ApplicationState } from '@/lib/fsm';

export const dynamic = 'force-dynamic';

const transitionSchema = z.object({
  targetStatus: z.string().min(1, 'Target status is required.'),
  comments: z.string().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(['SYSTEM_ADMIN', 'STAFF_TRAINER']);
    const { id } = params;
    const body = await req.json();
    const validated = transitionSchema.parse(body);

    const updated = await transitionApplication(
      id,
      validated.targetStatus as ApplicationState,
      session,
      validated.comments
    );

    return NextResponse.json({ success: true, application: updated });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return NextResponse.json({ error: error.errors?.[0]?.message || 'Invalid input data.' }, { status: 400 });
    }
    if (error.message === 'UNAUTHORIZED' || error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Access denied: Administrator privileges required.' }, { status: 403 });
    }
    console.error('Error transitioning application status:', error);
    return NextResponse.json({ error: error.message || 'Failed to update application status.' }, { status: 400 });
  }
}
