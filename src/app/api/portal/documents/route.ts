import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';
import { requireAuth } from '../../../../lib/auth';
import { savePrivateDocument } from '../../../../lib/storage';

export async function GET() {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);

    const documents = await prisma.document.findMany({
      where: { userId: session.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        documentType: true,
        fileName: true,
        fileSizeBytes: true,
        mimeType: true,
        isVerified: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ documents });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: 'Failed to retrieve documents.' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth(['STUDENT_LEARNER', 'SYSTEM_ADMIN']);
    const formData = await req.formData();

    const file = formData.get('file') as File | null;
    const documentType = (formData.get('documentType') as string) || 'STUDENT_ID_PROOF';

    if (!file) {
      return NextResponse.json({ error: 'No file was provided in upload request.' }, { status: 400 });
    }

    const validTypes = ['STUDENT_ID_PROOF', 'PAYMENT_RECEIPT', 'CERTIFICATE_PDF', 'INSTITUTION_MOU'];
    if (!validTypes.includes(documentType)) {
      return NextResponse.json({ error: 'Invalid document type specified.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const doc = await savePrivateDocument({
      userId: session.id,
      documentType: documentType as any,
      fileName: file.name,
      mimeType: file.type || 'application/octet-stream',
      buffer,
      uploaderUser: session,
    });

    return NextResponse.json(
      {
        success: true,
        document: {
          id: doc.id,
          fileName: doc.fileName,
          documentType: doc.documentType,
          fileSizeBytes: doc.fileSizeBytes,
          createdAt: doc.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.json({ error: error.message || 'File upload failed.' }, { status: 400 });
  }
}
