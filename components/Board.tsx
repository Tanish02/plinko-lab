"use client";

import { useEffect, useRef } from "react";

export default function PlinkoBoard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const width = 500;
    const height = 600;

    canvas.width = width;
    canvas.height = height;

    const rows = 12;
    const pegRadius = 4;
    const spacing = 30;

    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = "#ffffff";

    for (let r = 0; r < rows; r++) {
      const pegs = r + 1;

      const rowWidth = pegs * spacing;

      for (let p = 0; p < pegs; p++) {
        const x = width / 2 - rowWidth / 2 + p * spacing + spacing / 2;
        const y = 80 + r * spacing;

        ctx.beginPath();
        ctx.arc(x, y, pegRadius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  return (
    <div className="flex justify-center mt-10">
      <canvas ref={canvasRef} className="bg-black rounded-xl shadow-lg" />
    </div>
  );
}

// end code
