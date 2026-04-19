import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

import { allowRequest } from "@/lib/rate-limit";
import { stripe } from "@/lib/stripe";

const bodySchema = z.object({
  amount: z.number().int().min(5).max(50_000),
  recurringMonthly: z.boolean(),
  donorName: z.string().max(80).optional(),
  schoolAffiliation: z.string().max(120).optional(),
  donorMessage: z.string().max(240).optional(),
  showOnWall: z.boolean().default(false)
});

export async function POST(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for") ?? "local";
  if (!allowRequest(forwarded)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const parsed = bodySchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { amount, recurringMonthly, donorName, schoolAffiliation, donorMessage, showOnWall } = parsed.data;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;

  const session = await stripe.checkout.sessions.create({
    mode: recurringMonthly ? "subscription" : "payment",
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/?donationCanceled=true`,
    customer_creation: "always",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Forsyth County Schools Sports & Clubs Fundraiser",
            description: "100% split equally among all 8 Forsyth County high schools"
          },
          unit_amount: amount * 100,
          recurring: recurringMonthly ? { interval: "month" } : undefined
        },
        quantity: 1
      }
    ],
    metadata: {
      donorName: donorName || "",
      schoolAffiliation: schoolAffiliation || "",
      donorMessage: donorMessage || "",
      showOnWall: String(showOnWall),
      recurringMonthly: String(recurringMonthly)
    },
    custom_text: {
      submit: { message: "Your donation will be split equally among all 8 Forsyth County high schools." }
    }
  });

  return NextResponse.json({ url: session.url });
}
