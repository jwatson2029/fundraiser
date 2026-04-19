import { NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const amountCents = session.amount_total ?? 0;

    await prisma.donation.upsert({
      where: { stripeSessionId: session.id },
      update: {},
      create: {
        stripeSessionId: session.id,
        stripePaymentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
        donorEmail: session.customer_details?.email ?? null,
        donorName: session.metadata?.donorName || null,
        schoolAffiliation: session.metadata?.schoolAffiliation || null,
        donorMessage: session.metadata?.donorMessage || null,
        amountCents,
        isRecurringMonthly: session.mode === "subscription",
        showOnWall: session.metadata?.showOnWall === "true"
      }
    });
  }

  return NextResponse.json({ received: true });
}
