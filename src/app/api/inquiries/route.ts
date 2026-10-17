import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '../../../lib/prisma';
import { recordAuditLog } from '../../../lib/audit';

const inquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name.'),
  email: z.string().email('Please provide a valid email address.'),
  phone: z.string().regex(/^[0-9+\s()-]{8,15}$/, 'Please provide a valid phone number (8-15 digits).'),
  audienceType: z.string(),
  programme: z.string(),
  organizationName: z.string().optional(),
  message: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validated = inquirySchema.parse(body);

    const inquiry = await prisma.inquiry.create({
      data: {
        inquiryType: validated.audienceType === 'institution' ? 'INSTITUTIONAL_WORKSHOP' : 'GENERAL_INQUIRY',
        fullName: validated.fullName,
        email: validated.email.toLowerCase(),
        phone: validated.phone,
        institutionName: validated.organizationName || null,
        targetGroup: validated.audienceType,
        programme: validated.programme,
        message: validated.message || 'No specific notes provided.',
        status: 'NEW',
      },
    });

    await recordAuditLog({
      action: 'PUBLIC_INQUIRY_SUBMITTED',
      entityName: 'inquiries',
      entityId: inquiry.id,
      newState: { email: inquiry.email, programme: inquiry.programme },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your training enquiry has been registered successfully.',
        inquiryId: inquiry.id,
        timestamp: inquiry.createdAt.toISOString(),
      },
      { status: 201 }
    );
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0]?.message || 'Validation error' }, { status: 400 });
    }
    console.error('Inquiry submission error:', error);
    return NextResponse.json({ error: 'Failed to submit enquiry.' }, { status: 500 });
  }
}
