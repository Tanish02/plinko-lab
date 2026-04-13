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
    drawBall(ctx);
  }, [ballX, ballY]);

  const dropBall = async () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const startX = width / 2;
    let y = 20;

    setBallX(startX);
    setBallY(y);

    const interval = setInterval(() => {
      y += 5;
      setBallY(y);

      if (y > height - 40) {
        clearInterval(interval);
      }
    }, 16);
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
