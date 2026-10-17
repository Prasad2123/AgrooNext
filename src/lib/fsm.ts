import prisma from './prisma';
import { recordAuditLog } from './audit';
import { sendNotification } from './notifications';
import { SessionUser } from './auth';

export type ApplicationState =
  | 'DRAFT'
  | 'SUBMITTED'
  | 'UNDER_REVIEW'
  | 'ACTION_REQUIRED'
  | 'APPROVED'
  | 'PAYMENT_PENDING'
  | 'PAYMENT_CONFIRMED'
  | 'ENROLLED'
  | 'COMPLETED'
  | 'WAITLISTED'
  | 'REJECTED'
  | 'CANCELLED';

export const TERMINAL_STATES: ApplicationState[] = ['REJECTED', 'CANCELLED', 'COMPLETED'];

export interface FSMTransitionRule {
  from: ApplicationState;
  to: ApplicationState;
  allowedRoles: string[]; // e.g. ['STUDENT_LEARNER'], ['SYSTEM_ADMIN', 'STAFF_TRAINER'], etc.
  description: string;
}

export const PERMITTED_TRANSITIONS: FSMTransitionRule[] = [
  // From DRAFT
  {
    from: 'DRAFT',
    to: 'SUBMITTED',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Applicant submits completed application for review',
  },
  {
    from: 'DRAFT',
    to: 'CANCELLED',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Applicant discards draft application',
  },

  // From SUBMITTED
  {
    from: 'SUBMITTED',
    to: 'UNDER_REVIEW',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Admissions staff opens application dossier for review',
  },
  {
    from: 'SUBMITTED',
    to: 'CANCELLED',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Applicant withdraws application prior to review',
  },

  // From UNDER_REVIEW
  {
    from: 'UNDER_REVIEW',
    to: 'APPROVED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Eligibility confirmed; batch seat quota available',
  },
  {
    from: 'UNDER_REVIEW',
    to: 'ACTION_REQUIRED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Additional documentation or corrections required from learner',
  },
  {
    from: 'UNDER_REVIEW',
    to: 'WAITLISTED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Batch currently full; applicant placed on active waitlist',
  },
  {
    from: 'UNDER_REVIEW',
    to: 'REJECTED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Applicant ineligible or fails minimum prerequisites',
  },

  // From ACTION_REQUIRED
  {
    from: 'ACTION_REQUIRED',
    to: 'UNDER_REVIEW',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Learner resubmits corrected documents or information',
  },
  {
    from: 'ACTION_REQUIRED',
    to: 'CANCELLED',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Applicant withdraws or remediation window lapses',
  },

  // From APPROVED
  {
    from: 'APPROVED',
    to: 'PAYMENT_PENDING',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER', 'STUDENT_LEARNER'],
    description: 'Fee payment initiated; seat hold window active',
  },
  {
    from: 'APPROVED',
    to: 'CANCELLED',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Applicant declines admission or seat hold lapses',
  },

  // From PAYMENT_PENDING
  {
    from: 'PAYMENT_PENDING',
    to: 'PAYMENT_CONFIRMED',
    allowedRoles: ['SYSTEM_ADMIN'], // Gateway webhook or admin offline reconciliation
    description: 'Payment verified via gateway webhook or bank reconciliation',
  },
  {
    from: 'PAYMENT_PENDING',
    to: 'CANCELLED',
    allowedRoles: ['SYSTEM_ADMIN'],
    description: 'Payment expired or rejected by administrator',
  },

  // From PAYMENT_CONFIRMED
  {
    from: 'PAYMENT_CONFIRMED',
    to: 'ENROLLED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Enrollment record finalized; roll number generated',
  },

  // From ENROLLED
  {
    from: 'ENROLLED',
    to: 'COMPLETED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Course training finished, attendance and evaluation criteria satisfied',
  },
  {
    from: 'ENROLLED',
    to: 'CANCELLED',
    allowedRoles: ['SYSTEM_ADMIN'],
    description: 'Emergency withdrawal or batch cancellation',
  },

  // From WAITLISTED (Non-terminal active holding state per Audit v1.2.0)
  {
    from: 'WAITLISTED',
    to: 'APPROVED',
    allowedRoles: ['SYSTEM_ADMIN', 'STAFF_TRAINER'],
    description: 'Seat opens in batch; promoted from waitlist',
  },
  {
    from: 'WAITLISTED',
    to: 'CANCELLED',
    allowedRoles: ['STUDENT_LEARNER', 'SYSTEM_ADMIN'],
    description: 'Applicant withdraws from waitlist or batch commences',
  },
];

export function canTransition(
  currentStatus: ApplicationState,
  targetStatus: ApplicationState,
  actorRole: string
): { allowed: boolean; reason?: string } {
  if (currentStatus === targetStatus) {
    return { allowed: false, reason: 'Application is already in this status.' };
  }

  if (TERMINAL_STATES.includes(currentStatus)) {
    return {
      allowed: false,
      reason: `Application is in terminal state '${currentStatus}' and cannot be altered.`,
    };
  }

  const rule = PERMITTED_TRANSITIONS.find(
    (r) => r.from === currentStatus && r.to === targetStatus
  );

  if (!rule) {
    return {
      allowed: false,
      reason: `Invalid transition from '${currentStatus}' to '${targetStatus}'.`,
    };
  }

  if (!rule.allowedRoles.includes(actorRole)) {
    return {
      allowed: false,
      reason: `Role '${actorRole}' is not authorized to perform transition from '${currentStatus}' to '${targetStatus}'.`,
    };
  }

  return { allowed: true };
}

export function getValidNextStatuses(
  currentStatus: ApplicationState,
  actorRole?: string
): ApplicationState[] {
  return PERMITTED_TRANSITIONS.filter(
    (r) => r.from === currentStatus && (!actorRole || r.allowedRoles.includes(actorRole))
  ).map((r) => r.to);
}

export async function transitionApplication(
  applicationId: string,
  targetStatus: ApplicationState,
  actorUser: SessionUser,
  comments?: string
) {
  const application = await prisma.application.findUnique({
    where: { id: applicationId },
    include: {
      user: {
        include: { profile: true },
      },
      batch: {
        include: { course: true },
      },
    },
  });

  if (!application) {
    throw new Error('Application not found.');
  }

  const currentStatus = application.currentStatus as ApplicationState;

  // Validate security and state machine rules on server
  const check = canTransition(currentStatus, targetStatus, actorUser.role);
  if (!check.allowed) {
    throw new Error(check.reason || 'Transition not allowed.');
  }

  // Learner can only transition their own application
  if (actorUser.role === 'STUDENT_LEARNER' && application.userId !== actorUser.id) {
    throw new Error('FORBIDDEN: You can only transition your own applications.');
  }

  // Execute transition in a database transaction
  const result = await prisma.$transaction(async (tx) => {
    // 1. Update application status
    const updated = await tx.application.update({
      where: { id: applicationId },
      data: {
        currentStatus: targetStatus,
        submittedAt: targetStatus === 'SUBMITTED' ? new Date() : application.submittedAt,
      },
    });

    // 2. Append immutable record to application_audit_trail
    await tx.applicationAuditTrail.create({
      data: {
        applicationId,
        previousStatus: currentStatus,
        newStatus: targetStatus,
        changedByUserId: actorUser.id,
        comments: comments || null,
      },
    });

    // 3. System audit log
    await tx.auditLog.create({
      data: {
        userId: actorUser.id,
        action: `APPLICATION_STATUS_${targetStatus}`,
        entityName: 'applications',
        entityId: applicationId,
        oldState: JSON.stringify({ status: currentStatus }),
        newState: JSON.stringify({ status: targetStatus, comments }),
      },
    });

    // 4. Auto-enrollment trigger if confirmed/enrolled
    if (targetStatus === 'ENROLLED') {
      const existingEnrollment = await tx.enrollment.findUnique({
        where: { applicationId },
      });

      if (!existingEnrollment) {
        const year = new Date().getFullYear();
        const count = await tx.enrollment.count();
        const enrollmentNumber = `ENR-${year}-${String(count + 1).padStart(4, '0')}`;

        await tx.enrollment.create({
          data: {
            enrollmentNumber,
            applicationId,
            userId: application.userId,
            batchId: application.batchId,
            enrollmentStatus: 'ACTIVE',
          },
        });
      }
    }

    return updated;
  });

  // 5. Notify learner of status change
  await sendNotification({
    userId: application.userId,
    title: `Application ${application.applicationNumber}: Status Updated to ${targetStatus.replace('_', ' ')}`,
    message: comments
      ? `Your application for ${application.batch.course.title} is now ${targetStatus}. Note: ${comments}`
      : `Your application for ${application.batch.course.title} is now in status: ${targetStatus}.`,
    notificationType: 'ADMISSION_UPDATE',
    linkUrl: `/portal/applications/${applicationId}`,
    emailRecipient: application.user.email || undefined,
  });

  return result;
}
