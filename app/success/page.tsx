import Link from "next/link";
import { stripe } from "@/lib/stripe";
import { Button } from "@/components/ui/button";

export default async function SuccessPage({
  searchParams
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  let donorName = "Supporter";
  let receiptUrl = "";

  if (session_id) {
    const session = await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["payment_intent"]
    });
    donorName = session.metadata?.donorName || donorName;
    const paymentIntent = session.payment_intent;
    if (paymentIntent && typeof paymentIntent !== "string") {
      const latestCharge = paymentIntent.latest_charge;
      if (latestCharge && typeof latestCharge !== "string") {
        receiptUrl = latestCharge.receipt_url || "";
      }
    }
  }

  return (
    <main className="section-shell">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <p className="text-sm font-semibold text-brandBlue">Donation Received</p>
        <h1 className="mt-3 text-3xl font-bold text-brandBlue">Thank you, {donorName}!</h1>
        <p className="mt-4 text-slate-700">
          Your generosity powers every athlete and club member. 100% of your donation is being split equally among all
          8 Forsyth County high schools.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {receiptUrl ? (
            <Button asChild>
              <a href={receiptUrl} target="_blank" rel="noreferrer">
                Download Receipt
              </a>
            </Button>
          ) : null}
          <Button asChild variant="outline">
            <Link href="/">Back to Fundraiser Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
