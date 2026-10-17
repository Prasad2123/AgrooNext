import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../../lib/auth';
import { getPrivateDocument } from '../../../../../../lib/storage';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const { id } = params;

    const fileData = await getPrivateDocument(id, session);

    return new NextResponse(new Uint8Array(fileData.buffer), {
      status: 200,
      headers: {
        'Content-Type': fileData.mimeType,
        'Content-Disposition': `attachment; filename="${encodeURIComponent(fileData.fileName)}"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message.includes('FORBIDDEN')) {
      return NextResponse.json({ error: 'FORBIDDEN: Access denied.' }, { status: 403 });
    }
    return NextResponse.json({ error: error.message || 'Failed to download document.' }, { status: 404 });
  }
}
