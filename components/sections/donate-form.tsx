"use client";

import { useState } from "react";
import { DONATION_PRESETS } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DonateForm() {
  const [amount, setAmount] = useState<number>(DONATION_PRESETS[2]);
  const [customAmount, setCustomAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [schoolAffiliation, setSchoolAffiliation] = useState("");
  const [donorMessage, setDonorMessage] = useState("");
  const [showOnWall, setShowOnWall] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const resolvedAmount = customAmount ? Number(customAmount) : amount;

  async function handleSubmit() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: resolvedAmount,
          recurringMonthly: false,
          donorName,
          schoolAffiliation,
          donorMessage,
          showOnWall
        })
      });

      let data: { url?: string; error?: string } = {};
      try {
        data = (await res.json()) as { url?: string; error?: string };
      } catch {
        data = { error: "Unexpected server response. Please try again." };
      }

      if (!res.ok || !data.url) throw new Error(data.error || "Unable to create checkout session");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create checkout session");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="donate" className="rounded-2xl border border-brandBlue/20 bg-white p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-brandBlue">Donate Today</h3>
      <p className="mt-2 text-sm text-slate-700">
        Your donation will be split equally among all 8 Forsyth County high schools.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {DONATION_PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            className={`rounded-md border px-3 py-2 text-sm font-medium ${
              amount === preset && !customAmount
                ? "border-brandBlue bg-brandBlue text-white"
                : "border-slate-300 bg-white text-slate-800"
            }`}
            onClick={() => {
              setCustomAmount("");
              setAmount(preset);
            }}
          >
            ${preset.toLocaleString()}
          </button>
        ))}
      </div>

      <div className="mt-4 space-y-4">
        <div>
          <Label htmlFor="customAmount">Other Amount (USD)</Label>
          <Input
            id="customAmount"
            type="number"
            min={5}
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
            placeholder="Enter custom donation amount"
          />
        </div>
        <div>
          <Label htmlFor="donorName">Donor Name (optional)</Label>
          <Input id="donorName" value={donorName} onChange={(e) => setDonorName(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="schoolAffiliation">School Affiliation (optional)</Label>
          <Input
            id="schoolAffiliation"
            value={schoolAffiliation}
            onChange={(e) => setSchoolAffiliation(e.target.value)}
            placeholder="Parent, alumni, business, etc."
          />
        </div>
        <div>
          <Label htmlFor="donorMessage">Message (optional)</Label>
          <Input id="donorMessage" value={donorMessage} onChange={(e) => setDonorMessage(e.target.value)} />
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={showOnWall}
            onChange={(e) => setShowOnWall(e.target.checked)}
            className="h-4 w-4"
          />
          Display my name on the donor recognition wall
        </label>
      </div>

      <Button className="mt-6 w-full" size="lg" onClick={handleSubmit} disabled={loading || resolvedAmount < 5}>
        {loading ? "Redirecting to secure checkout..." : "Donate Securely with Stripe"}
      </Button>
      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
