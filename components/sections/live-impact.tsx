"use client";

import { useEffect, useMemo, useState } from "react";
import { FUNDRAISER_GOAL_CENTS } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

type Stats = {
  totalRaisedCents: number;
  donorCount: number;
  recentDonors: { name: string; amountCents: number; createdAt: string }[];
};

const initialStats: Stats = { totalRaisedCents: 0, donorCount: 0, recentDonors: [] };

export function LiveImpact() {
  const [stats, setStats] = useState<Stats>(initialStats);

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const res = await fetch("/api/stats", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as Stats;
        if (mounted) setStats(data);
      } catch {
        // Keep current stats on transient network/API failures.
      }
    };
    void load();
    const interval = setInterval(() => void load(), 20_000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const progress = useMemo(() => (stats.totalRaisedCents / FUNDRAISER_GOAL_CENTS) * 100, [stats.totalRaisedCents]);

  return (
    <section id="impact" className="section-shell">
      <h2 className="text-3xl font-bold text-brandBlue">Live Impact Dashboard</h2>
      <p className="mt-3 text-slate-700">
        Your donation helps every high school athlete and club member. Every contribution is split equally among all
        8 official Forsyth County high schools.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-600">Total Raised</p>
          <p className="text-3xl font-semibold text-brandBlue">{formatCurrency(stats.totalRaisedCents)}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-600">Donors</p>
          <p className="text-3xl font-semibold text-brandBlue">{stats.donorCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-600">Goal Progress</p>
          <p className="text-3xl font-semibold text-brandBlue">{progress.toFixed(1)}%</p>
        </div>
      </div>
      <Progress value={progress} className="mt-5" />
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <h3 className="text-lg font-semibold text-brandBlue">Donor Recognition Wall</h3>
        <p className="mt-1 text-sm text-slate-600">Displayed only for donors who opted in.</p>
        <div className="mt-3 space-y-2">
          {stats.recentDonors.length ? (
            stats.recentDonors.map((donor) => (
              <p key={`${donor.name}-${donor.createdAt}`} className="text-sm text-slate-700">
                {donor.name} - {formatCurrency(donor.amountCents)}
              </p>
            ))
          ) : (
            <p className="text-sm text-slate-600">Be the first donor to appear here.</p>
          )}
        </div>
      </div>
    </section>
  );
}
