import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await requireAuth(["SYSTEM_ADMIN"]);

    const { searchParams } = new URL(request.url);
    const action = searchParams.get("action");
    const entityName = searchParams.get("entityName");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.min(100, Math.max(5, parseInt(searchParams.get("limit") || "30", 10)));

    const where: any = {};
    if (action && action !== "ALL") {
      where.action = action;
    }
    if (entityName && entityName !== "ALL") {
      where.entityName = entityName;
    }

    const [total, logs] = await Promise.all([
      prisma.auditLog.count({ where }),
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
        include: {
          user: {
            select: { id: true, email: true, role: true, profile: { select: { fullName: true } } },
          },
        },
      }),
    ]);

    return NextResponse.json({
      logs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    if (error.message === 'UNAUTHORIZED') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (error.message === 'FORBIDDEN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    console.error("Admin audit-logs GET error:", error);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}
