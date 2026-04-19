import { NextResponse } from "next/server";
import { getFundraiserStats } from "@/lib/stats";

export async function GET() {
  const stats = await getFundraiserStats();
  return NextResponse.json(stats);
}
