"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import MatrixCore from "../layout/InterectiveUI";

const heroLines = ["HI, I'M MOHIB", "DIGITAL ENGINEER"];

export default function HeroSection() {
  const glowRef = useRef<HTMLDivElement | null>(null);

  // 0 = boot, 1 = scanning, 2 = decode, 3 = ready
  const [bootPhase, setBootPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setBootPhase(1), 300);
    const t2 = setTimeout(() => setBootPhase(2), 800);
    const t3 = setTimeout(() => setBootPhase(3), 1200);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  // glow only after boot completes
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!glowRef.current || bootPhase < 3) return;

      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;

      glowRef.current.style.background = `
        radial-gradient(
          circle at ${x}% ${y}%,
          rgba(124,58,237,0.14),
          transparent 45%
        )
      `;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [bootPhase]);

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-28 ">

      {/* GLOW (locked until ready) */}
      <div
        ref={glowRef}
        className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
          bootPhase === 3 ? "opacity-40 mix-blend-soft-light" : "opacity-0"
        }`}
      />

      {/* SCANLINES */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "100% 3px",
          }}
        />
      </div>

      <div className="page-container relative z-10 grid gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">

        {/* LEFT */}
        <div className="space-y-10">

          {/* BOOT HEADER */}
          <div className={`font-mono text-xs uppercase tracking-[0.45em] ${bootPhase === 3 ? "text-green-500" : "text-violet-300"}`}>
            {bootPhase === 0 && "INITIALIZING SYSTEM..."}
            {bootPhase === 1 && "LOADING UI ENGINE..."}
            {bootPhase === 2 && "DECODING INTERFACE..."}
            {bootPhase === 3 && "[ SYSTEM ONLINE ]"}
          </div>

          {/* HERO TEXT */}
          <div className="space-y-2">
            {heroLines.map((line, i) => (
                <div key={i} className="relative overflow-hidden">
                  {/* GLITCH ONLY AFTER BOOT */}
                  {bootPhase >= 3 && (

                      <>
                {/* MAIN TEXT */}
                <motion.h1
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={
                    bootPhase >= 2
                      ? { opacity: 1, y: 0, filter: "blur(0px)" }
                      : {}
                  }
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-[clamp(3.5rem,8vw,10rem)] font-bold leading-[0.9] tracking-[-0.06em] text-white"
                >
                  {line}
                </motion.h1>

                    <h1 className="absolute left-0 top-0 text-[clamp(3.5rem,8vw,10rem)] font-bold text-violet-400 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all blur-[1px]">
                      {line}
                    </h1>

                    <h1 className="absolute left-0 top-0 text-[clamp(3.5rem,8vw,10rem)] font-bold text-violet-200 opacity-0 group-hover:opacity-60 group-hover:-translate-x-[2px] transition-all blur-[1px]">
                      {line}
                    </h1>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* DESCRIPTION */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={bootPhase >= 3 ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="max-w-2xl space-y-6 text-slate-300"
          >
            <p className="text-lg leading-8">
              Full-Stack Engineer building cinematic systems, real-time interfaces, and AI-powered applications.
            </p>

            <p className="text-lg leading-8">
              React • Next.js • React Native • Node.js • Web3 architecture
            </p>

            {/* CTA */}
            {bootPhase >= 3 && (
              <div className="flex flex-wrap gap-4 pt-4">

                <a
                  href="#projects"
                  className="group relative overflow-hidden rounded-full border border-violet-400/20 bg-violet-400/10 px-6 py-3 font-semibold text-violet-200 hover:text-white hover:border-violet-300/40 transition"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    View Work <ArrowRight size={16} />
                  </span>

                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                </a>

                <a
                  href="mailto:rajamohib9@gmail.com"
                  className="rounded-full border border-slate-700/50 bg-slate-900/60 px-6 py-3 text-sm font-semibold text-slate-200 hover:border-violet-400/30 transition"
                >
                  Contact Me
                </a>
              </div>
            )}
          </motion.div>
        </div>

        {/* RIGHT */}
       { <MatrixCore />}
      </div>
    </section>
  );
}