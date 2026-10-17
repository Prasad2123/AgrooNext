import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { confirmOnlinePayment } from "@/lib/payment";

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get("x-razorpay-signature") || request.headers.get("x-webhook-signature");
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || "development_sandbox_secret";

    // 1. Signature Verification
    if (process.env.NODE_ENV === "production" && !process.env.RAZORPAY_WEBHOOK_SECRET) {
      return NextResponse.json({ error: "Webhook secret not configured in production" }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing webhook signature header" }, { status: 400 });
    }

    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody)
      .digest("hex");

    // Timing-safe comparison to prevent timing attacks
    const sigBuffer = Buffer.from(signature);
    const expectedBuffer = Buffer.from(expectedSignature);

    let isValid = false;
    if (sigBuffer.length === expectedBuffer.length) {
      isValid = crypto.timingSafeEqual(sigBuffer, expectedBuffer);
    }

    // In development/sandbox test mode, also accept explicit test signature if sandbox token provided
    if (!isValid && process.env.NODE_ENV !== "production" && signature === "sandbox_test_signature") {
      isValid = true;
    }

    if (!isValid) {
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 401 });
    }

    // 2. Parse Event Payload
    const payload = JSON.parse(rawBody);
    const event = payload.event;

    // Handle payment capture / order paid events
    if (event === "order.paid" || event === "payment.captured") {
      const paymentEntity = payload.payload?.payment?.entity || payload.data;
      const notes = paymentEntity?.notes || {};
      const applicationId = notes.applicationId || payload.applicationId;
      const amountInr = (paymentEntity?.amount ? paymentEntity.amount / 100 : payload.amountInr) || 0;
      const transactionReference = paymentEntity?.id || payload.transactionReference || `TXN_${Date.now()}`;

      if (!applicationId) {
        return NextResponse.json({ error: "Missing applicationId in webhook payload" }, { status: 400 });
      }

      // Idempotently confirm payment
      await confirmOnlinePayment({
        applicationId,
        transactionReference,
        amountInr,
        paymentMethod: "ONLINE_GATEWAY",
      });

      return NextResponse.json({ status: "success", received: true, event });
    }

    // Unhandled event types acknowledged with 200
    return NextResponse.json({ status: "ignored", event });
  } catch (error: any) {
    console.error("Payment webhook processing error:", error);
    return NextResponse.json({ error: "Webhook processing failure", details: error.message }, { status: 500 });
  }
}
