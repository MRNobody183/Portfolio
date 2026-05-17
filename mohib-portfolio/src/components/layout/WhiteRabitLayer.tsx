"use client";

import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const context = ctx;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);

    // 🧠 MATRIX SYMBOL SET (NOT PARTICLES)
    const chars = "01░▒▓<>/\\[]{}@#$%^&*";
    const columns = Math.floor(w / 14);

    const drops = new Array(columns).fill(0).map(() => Math.random() * h);

    let mouseX = w / 2;
    let mouseY = h / 2;

    window.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    let glitch = 0;

    function triggerGlitch() {
      glitch = 1;
      setTimeout(() => (glitch = 0), 120 + Math.random() * 120);
    }

    // random system corruption events
    setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch();
    }, 2000);

    function draw() {
      // 🔥 base fade (memory persistence)
      context.fillStyle = "rgba(5, 8, 22, 0.08)";
      context.fillRect(0, 0, w, h);

      context.fillStyle = "#0ff";
      context.font = "14px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];

        const x = i * 14;
        const y = drops[i];

        // 🧠 CURSOR DISTORTION (KEY MATRIX FEEL)
        const dx = mouseX - x;
        const dy = mouseY - y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const alpha = dist < 200 ? 1 : 0.2;

        context.fillStyle = `rgba(0,255,255,${alpha})`;

        // glitch effect
        if (glitch) {
          context.fillText(text, x + Math.random() * 6, y);
        } else {
          context.fillText(text, x, y);
        }

        drops[i] += 10;

        if (drops[i] > h && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }

      requestAnimationFrame(draw);
    }

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* scanlines */}
      <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:100%_3px]" />

      {/* glow haze */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(0,255,255,0.08),transparent_60%)]" />

      <canvas ref={canvasRef} className="absolute inset-0 opacity-70" />
    </div>
  );
}