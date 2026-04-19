import { NextResponse } from "next/server";
import { getFundraiserStats } from "@/lib/stats";

export async function GET() {
  try {
    const stats = await getFundraiserStats();
    return NextResponse.json(stats);
  } catch (error) {
    console.error("Failed to load fundraiser stats:", error);
    return NextResponse.json(
      {
        totalRaisedCents: 0,
        donorCount: 0,
        recentDonors: [],
        error: "Stats temporarily unavailable"
      },
      { status: 200 }
    );
  }
}
