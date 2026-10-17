import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { recordAuditLog } from "@/lib/audit";
import { z } from "zod";

const updateUserSchema = z.object({
  targetUserId: z.string().uuid(),
  isActive: z.boolean().optional(),
  role: z.enum(["STUDENT_LEARNER", "STAFF_TRAINER", "SYSTEM_ADMIN"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["SYSTEM_ADMIN"]);

    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");
    const search = searchParams.get("search");

    const where: any = {};
    if (role && role !== "ALL") {
      where.role = role;
    }
    if (search) {
      where.OR = [
        { email: { contains: search } },
        { phone: { contains: search } },
        { profile: { fullName: { contains: search } } },
      ];
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
        profile: {
          select: {
            fullName: true,
            city: true,
            state: true,
            institutionName: true,
            idProofStatus: true,
          },
        },
        _count: {
          select: {
            applications: true,
            documents: true,
          },
        },
      },
    });

    return NextResponse.json({ users });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin users GET error:", error);
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await requireAuth(["SYSTEM_ADMIN"]);

    const body = await request.json();
    const parsed = updateUserSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.format() }, { status: 400 });
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: parsed.data.targetUserId },
    });
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Safety constraint: Prevent admin from deactivating or demoting themselves
    if (targetUser.id === session.id) {
      if (parsed.data.isActive === false) {
        return NextResponse.json({ error: "Cannot deactivate your own administrator account" }, { status: 400 });
      }
      if (parsed.data.role && parsed.data.role !== "SYSTEM_ADMIN") {
        return NextResponse.json({ error: "Cannot demote your own administrator account" }, { status: 400 });
      }
    }

    const updated = await prisma.user.update({
      where: { id: targetUser.id },
      data: {
        ...(parsed.data.isActive !== undefined ? { isActive: parsed.data.isActive } : {}),
        ...(parsed.data.role ? { role: parsed.data.role } : {}),
      },
      select: {
        id: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });

    await recordAuditLog({
      userId: session.id,
      action: "USER_UPDATED",
      entityName: "users",
      entityId: targetUser.id,
      oldState: { isActive: targetUser.isActive, role: targetUser.role },
      newState: { isActive: updated.isActive, role: updated.role },
      ipAddress: request.headers.get("x-forwarded-for") || "127.0.0.1",
    });

    return NextResponse.json({ user: updated });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    console.error("Admin users PATCH error:", error);
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
}
