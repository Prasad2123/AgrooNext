import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";
import { z } from "zod";

const updateInquirySchema = z.object({
  inquiryId: z.string().uuid(),
  status: z.enum(["NEW", "IN_REVIEW", "CONTACTED", "RESOLVED", "CLOSED"]).optional(),
  assignedToUserId: z.string().uuid().nullable().optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["SYSTEM_ADMIN", "STAFF_TRAINER"]);

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");

    const where: any = {};
    if (status && status !== "ALL") {
      where.status = status;
    }
    if (search) {
      where.OR = [
        { fullName: { contains: search } },
        { email: { contains: search } },
        { institutionName: { contains: search } },
      ];
    }

    const inquiries = await prisma.inquiry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        assignedToUser: {
          select: { id: true, email: true, profile: { select: { fullName: true } } },
        },
      },
    });

    return NextResponse.json({ inquiries });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin inquiries GET error:", error);
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SYSTEM_ADMIN", "STAFF_TRAINER"]);

    const body = await request.json();
    const parsed = updateInquirySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.format() }, { status: 400 });
    }

    const existing = await prisma.inquiry.findUnique({
      where: { id: parsed.data.inquiryId },
    });
    if (!existing) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    const updated = await prisma.inquiry.update({
      where: { id: parsed.data.inquiryId },
      data: {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.assignedToUserId !== undefined ? { assignedToUserId: parsed.data.assignedToUserId } : {}),
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: "INQUIRY_STATUS_UPDATED",
      entityName: "inquiries",
      entityId: existing.id,
      oldState: { status: existing.status, assignedToUserId: existing.assignedToUserId },
      newState: { status: updated.status, assignedToUserId: updated.assignedToUserId },
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    return NextResponse.json({ inquiry: updated });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin inquiries PATCH error:", error);
    return NextResponse.json({ error: "Failed to update inquiry" }, { status: 500 });
  }
}
