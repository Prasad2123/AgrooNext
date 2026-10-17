import prisma from './prisma';

export interface AuditLogParams {
  userId?: string | null;
  action: string;
  entityName: string;
  entityId?: string | null;
  oldState?: Record<string, unknown> | null;
  newState?: Record<string, unknown> | null;
  ipAddress?: string | null;
}

export async function recordAuditLog(params: AuditLogParams) {
  try {
    await prisma.auditLog.create({
      data: {
        userId: params.userId || null,
        action: params.action,
        entityName: params.entityName,
        entityId: params.entityId || null,
        oldState: params.oldState ? JSON.stringify(params.oldState) : null,
        newState: params.newState ? JSON.stringify(params.newState) : null,
        ipAddress: params.ipAddress || null,
      },
    });
  } catch (error) {
    console.error('Failed to write audit log:', error);
  }
}
