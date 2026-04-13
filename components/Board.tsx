"use client";

import { useEffect, useRef, useState } from "react";

export default function Board() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ballX, setBallX] = useState<number | null>(null);
  const [ballY, setBallY] = useState<number | null>(null);

  const width = 500;
  const height = 600;

  const rows = 12;
  const spacing = 30;

  const drawBoard = (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "white";

    for (let r = 0; r < rows; r++) {
      const pegs = r + 1;
      const rowWidth = pegs * spacing;

      for (let p = 0; p < pegs; p++) {
        const x = width / 2 - rowWidth / 2 + p * spacing + spacing / 2;
        const y = 80 + r * spacing;

        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  };

  const drawBins = (ctx: CanvasRenderingContext2D) => {
    const binCount = 13;
    const binWidth = width / binCount;
    const binY = 520;

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    for (let i = 0; i <= binCount; i++) {
      const x = i * binWidth;

      ctx.beginPath();
      ctx.moveTo(x, binY);
      ctx.lineTo(x, binY + 40);
      ctx.stroke();
    }
  };
  const highlightBin = (binIndex: number) => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const binCount = 13;
    const binWidth = width / binCount;
    const binY = 520;

    ctx.fillStyle = "rgba(0,255,0,0.4)";

    ctx.fillRect(binIndex * binWidth, binY, binWidth, 40);
  };

  const drawBall = (ctx: CanvasRenderingContext2D) => {
    if (ballX === null || ballY === null) return;

    ctx.fillStyle = "red";

    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
    ctx.fill();
  };

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    canvas.width = width;
    canvas.height = height;

    drawBoard(ctx);
    drawBins(ctx);
    drawBall(ctx);
  }, [ballX, ballY]);
  const dropBall = async () => {
    try {
      // commit
      const commitRes = await fetch("/api/rounds/commit", {
        method: "POST",
      });

      const commit = await commitRes.json();

      const roundId = commit.roundId;

      //  start round
      const startRes = await fetch(`/api/rounds/${roundId}/start`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clientSeed: "candidate-hello",
          betCents: 100,
          dropColumn: 6,
        }),
      });

      const start = await startRes.json();

      const path = start.pathJson;
      const binIndex = start.binIndex;

      animatePath(path, binIndex);
    } catch (err) {
      console.error(err);
    }
  };
  const animatePath = (path: string[], binIndex: number) => {
    const spacing = 30;

    let pos = 0;
    let x = width / 2;
    let y = 10;

    setBallX(x);
    setBallY(y);

    const step = () => {
      // If finished all peg moves
      if (pos >= path.length) {
        const finalY = y + 90;
        let progress = 0;

        const drop = setInterval(() => {
          progress += 0.08;

          const newY = y + (finalY - y) * progress;

          setBallY(newY);

          if (progress >= 1) {
            clearInterval(drop);
            highlightBin(binIndex);
          }
        }, 16);

        return;
      }

      const dir = path[pos];

      const targetX = dir === "L" ? x - spacing / 2 : x + spacing / 2;

      const targetY = y + spacing;

      let progress = 0;

      const anim = setInterval(() => {
        progress += 0.08;

        const newX = x + (targetX - x) * progress;
        const newY = y + (targetY - y) * progress;

        setBallX(newX);
        setBallY(newY);

        if (progress >= 1) {
          clearInterval(anim);

          x = targetX;
          y = targetY;

          pos++;

          setTimeout(step, 40);
        }
      }, 16);
    };

    step();
  };

  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <canvas ref={canvasRef} className="bg-black rounded-xl shadow-lg" />

      <button onClick={dropBall} className="px-6 py-2 bg-green-500 rounded-lg">
        DROP BALL
      </button>
    </div>
  );
}
