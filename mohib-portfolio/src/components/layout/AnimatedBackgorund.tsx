"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationFrame: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();

    window.addEventListener("resize", resizeCanvas);

    // Matrix characters
    const letters =
      "アァカサタナハマヤャラワガザダバパABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const fontSize = 14;

    let columns = Math.floor(canvas.width / fontSize);

    let drops: number[] = [];

    const initDrops = () => {
      columns = Math.floor(canvas.width / fontSize);

      drops = [];

      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }
    };

    initDrops();

    const draw = () => {
      // transparent black for trail effect
      ctx.fillStyle = "rgba(5, 8, 22, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#22d3ee";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text =
          letters[Math.floor(Math.random() * letters.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // reset randomly
        if (
          drops[i] * fontSize > canvas.height &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }

        drops[i]++;
      }

      animationFrame = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      resizeCanvas();
      initDrops();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrame);

      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-[#050816]">
      {/* matrix canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-40"
      />

      {/* cinematic overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(124,58,237,0.09),transparent_45%)]" />

      <div className="absolute inset-0 bg-black/30" />
    </div>
  );
}