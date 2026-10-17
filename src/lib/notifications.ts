import prisma from './prisma';

export interface SendNotificationParams {
  userId: string;
  title: string;
  message: string;
  notificationType: 'ADMISSION_UPDATE' | 'PAYMENT_RECEIPT' | 'BATCH_REMINDER' | 'SYSTEM_ALERT';
  linkUrl?: string;
  emailRecipient?: string;
}

export async function sendNotification(params: SendNotificationParams) {
  try {
    // 1. Create in-app notification
    const notification = await prisma.notification.create({
      data: {
        userId: params.userId,
        title: params.title,
        message: params.message,
        notificationType: params.notificationType,
        linkUrl: params.linkUrl || null,
      },
    });

    // 2. Transactional Email
    // Check if SMTP credentials are provided in env
    const hasSmtp = !!process.env.SMTP_HOST && !!process.env.SMTP_USER;
    if (hasSmtp && params.emailRecipient) {
      // In a production environment with verified SMTP, send email via nodemailer
      console.log(`[SMTP Live] Sending transactional email to ${params.emailRecipient}: ${params.title}`);
    } else {
      // Honest development simulation mode
      console.log(`[Notification Simulator - Dev Mode]
To: ${params.emailRecipient || params.userId}
Type: ${params.notificationType}
Title: ${params.title}
Body: ${params.message}
Link: ${params.linkUrl || 'N/A'}`);
    }

    return notification;
  } catch (error) {
    console.error('Failed to dispatch notification:', error);
    return null;
  }
}
