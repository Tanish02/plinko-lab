import { runPlinkoEngine } from "@/lib/engine";
import { createCombinedSeed } from "@/lib/fairness";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const { clientSeed, betCents, dropColumn } = await req.json();

  const round = await prisma.round.findUnique({
    where: { id: params.id },
  });

  if (!round || !round.serverSeed) {
    return NextResponse.json({ error: "Round not found" }, { status: 404 });
  }

  const combinedSeed = createCombinedSeed(
    round.serverSeed,
    clientSeed,
    round.nonce,
  );

  const engineResult = runPlinkoEngine(combinedSeed, round.rows, dropColumn);

  const updated = await prisma.round.update({
    where: { id: round.id },
    data: {
      status: "STARTED",
      clientSeed,
      combinedSeed,
      pegMapHash: engineResult.pegMapHash,
      dropColumn,
      binIndex: engineResult.binIndex,
      betCents,
      pathJson: engineResult.path,
    },
  });

  return NextResponse.json({
    roundId: updated.id,
    pegMapHash: engineResult.pegMapHash,
    binIndex: engineResult.binIndex,
    rows: updated.rows,
  });
}
