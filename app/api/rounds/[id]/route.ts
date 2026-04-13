import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } },
) {
  const round = await prisma.round.findUnique({
    where: { id: params.id },
  });

  if (!round) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(round);
}
