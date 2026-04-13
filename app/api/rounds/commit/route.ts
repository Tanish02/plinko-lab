// for now api move to seprate project API
import {
  createCommit,
  generateNonce,
  generateServerSeed,
} from "@/lib/fairness";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  const serverSeed = generateServerSeed();
  const nonce = generateNonce();

  const commitHex = createCommit(serverSeed, nonce);

  const round = await prisma.round.create({
    data: {
      status: "CREATED",

      commitHex,
      rows: 12,
    },
  });

  return NextResponse.json({
    roundId: round.id,
    commitHex,
    nonce,
  });
}
