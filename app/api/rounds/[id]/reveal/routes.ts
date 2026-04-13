import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  const round = await prisma.round.findUnique({
    where: { id },
  });

  if (!round) {
    return NextResponse.json({ error: "Round not found" }, { status: 404 });
  }

  await prisma.round.update({
    where: { id },
    data: {
      status: "REVEALED",
      revealedAt: new Date(),
    },
  });

  return NextResponse.json({
    serverSeed: round.serverSeed,
  });
}
