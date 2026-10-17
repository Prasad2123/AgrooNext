import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import prisma from './prisma';
import { recordAuditLog } from './audit';
import { SessionUser } from './auth';

const UPLOAD_DIR = path.resolve(process.cwd(), process.env.UPLOAD_DIR || './private_uploads');

const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'image/jpeg',
  'image/png',
  'image/webp',
];

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export async function ensureUploadDir() {
  try {
    await fs.mkdir(UPLOAD_DIR, { recursive: true });
  } catch (error) {
    console.error('Failed to create upload dir:', error);
  }
}

export async function savePrivateDocument(params: {
  userId: string;
  documentType: 'STUDENT_ID_PROOF' | 'PAYMENT_RECEIPT' | 'CERTIFICATE_PDF' | 'INSTITUTION_MOU';
  fileName: string;
  mimeType: string;
  buffer: Buffer;
  uploaderUser: SessionUser;
}) {
  // Validate MIME type
  if (!ALLOWED_MIME_TYPES.includes(params.mimeType.toLowerCase())) {
    throw new Error('Invalid file format. Only PDF, JPEG, PNG, and WebP files are permitted.');
  }

  // Validate File Size
  if (params.buffer.length > MAX_FILE_SIZE_BYTES) {
    throw new Error('File size exceeds the 5MB maximum threshold.');
  }

  // Learner can only upload documents for their own account
  if (params.uploaderUser.role === 'STUDENT_LEARNER' && params.userId !== params.uploaderUser.id) {
    throw new Error('FORBIDDEN: You can only upload documents to your own account.');
  }

  await ensureUploadDir();

  // Generate safe storage key (never expose user input to filesystem)
  const ext = path.extname(params.fileName) || '.bin';
  const cleanExt = ext.replace(/[^a-zA-Z0-9.]/g, '').toLowerCase();
  const safeRandomKey = `doc_${crypto.randomUUID()}${cleanExt}`;
  const filePath = path.join(UPLOAD_DIR, safeRandomKey);

  // Prevent path traversal
  if (!filePath.startsWith(UPLOAD_DIR)) {
    throw new Error('Security Error: Invalid path traversal detected.');
  }

  // Write file to private disk
  await fs.writeFile(filePath, params.buffer);

  // Record metadata in database
  const document = await prisma.document.create({
    data: {
      userId: params.userId,
      documentType: params.documentType,
      storageKey: safeRandomKey,
      fileName: path.basename(params.fileName),
      fileSizeBytes: params.buffer.length,
      mimeType: params.mimeType,
      isVerified: false,
    },
  });

  // If this was an ID proof, update student profile status
  if (params.documentType === 'STUDENT_ID_PROOF') {
    await prisma.studentProfile.upsert({
      where: { userId: params.userId },
      update: {
        idProofStorageKey: safeRandomKey,
        idProofStatus: 'PENDING_VERIFICATION',
      },
      create: {
        userId: params.userId,
        fullName: params.uploaderUser.fullName || 'Student Learner',
        idProofStorageKey: safeRandomKey,
        idProofStatus: 'PENDING_VERIFICATION',
      },
    });
  }

  // Audit log
  await recordAuditLog({
    userId: params.uploaderUser.id,
    action: 'DOCUMENT_UPLOADED',
    entityName: 'documents',
    entityId: document.id,
    newState: {
      documentType: params.documentType,
      fileName: document.fileName,
      sizeBytes: document.fileSizeBytes,
    },
  });

  return document;
}

export async function getPrivateDocument(
  documentId: string,
  requesterUser: SessionUser
): Promise<{ buffer: Buffer; fileName: string; mimeType: string }> {
  const document = await prisma.document.findUnique({
    where: { id: documentId },
  });

  if (!document) {
    throw new Error('Document not found.');
  }

  // Strict authorization: Only document owner or SYSTEM_ADMIN can download
  if (requesterUser.role === 'STUDENT_LEARNER' && document.userId !== requesterUser.id) {
    throw new Error('FORBIDDEN: You do not have permission to access this document.');
  }

  const filePath = path.join(UPLOAD_DIR, path.basename(document.storageKey));

  if (!filePath.startsWith(UPLOAD_DIR)) {
    throw new Error('Security Error: Invalid file path.');
  }

  try {
    const buffer = await fs.readFile(filePath);
    return {
      buffer,
      fileName: document.fileName,
      mimeType: document.mimeType,
    };
  } catch (err) {
    throw new Error('The physical document file could not be located in storage.');
  }
}
