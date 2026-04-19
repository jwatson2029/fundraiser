import { prisma } from "@/lib/prisma";

export async function getFundraiserStats() {
  const aggregate = await prisma.donation.aggregate({
    _sum: { amountCents: true },
    _count: { id: true }
  });

  const recent = await prisma.donation.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
    where: { showOnWall: true },
    select: {
      donorName: true,
      amountCents: true,
      createdAt: true
    }
  });

  return {
    totalRaisedCents: aggregate._sum.amountCents ?? 0,
    donorCount: aggregate._count.id ?? 0,
    recentDonors: recent.map((r) => ({
      name: r.donorName || "Anonymous Supporter",
      amountCents: r.amountCents,
      createdAt: r.createdAt.toISOString()
    }))
  };
}
