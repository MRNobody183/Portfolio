"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const RAIN_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01";

// pause = ms to wait AFTER this line finishes before showing next
// speed = ms per character (lower = faster)
const logs = [
  { text: "hey. you.",                                                     pause: 320,  speed: 55  },
  { text: "yeah you, the one evaluating developers right now.",          pause: 280,  speed: 28  },
  { text: "let me save you some time.",                                    pause: 260,  speed: 32  },
  { text: "most portfolios you've seen today?",                            pause: 220,  speed: 30  },
  { text: "templates.",                                                    pause: 380,  speed: 60  },
  { text: "i'm Mohib.",                                                    pause: 260,  speed: 52  },
  { text: "i build real systems.",                                         pause: 240,  speed: 38  },
  { text: "React. Next.js. NestJS. Node.",                                 pause: 220,  speed: 26  },
  { text: "real-time. AI-integrated. production-grade.",                   pause: 240,  speed: 26  },
  { text: "the kind that's still running when you need it most.",          pause: 280,  speed: 26  },
  { text: "now",                                                         pause: 180,  speed: 55  },
  { text: "are you here to hire, or just browsing?",                       pause: 0,    speed: 30  },
];

function useMatrixRain(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);
    const cols = Math.floor(canvas.width / 16);
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -80);
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < drops.length; i++) {
        const ch = RAIN_CHARS[Math.floor(Math.random() * RAIN_CHARS.length)];
        const b = Math.random();
        if (b > 0.97)       { ctx.fillStyle = "#fff";    ctx.font = "bold 12px monospace"; }
        else if (b > 0.87)  { ctx.fillStyle = "#22d3ee"; ctx.font = "12px monospace"; }
        else                { ctx.fillStyle = `rgba(34,${Math.floor(130 + b * 100)},${Math.floor(160 + b * 80)},${0.15 + b * 0.45})`; ctx.font = "11px monospace"; }
        ctx.fillText(ch, i * 16, drops[i] * 16);
        if (drops[i] * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.5 + Math.random() * 0.4;
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
}

export default function MatrixCore({ onReady }: { onReady?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bodyRef   = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(0);
  const [typingIdx,    setTypingIdx]    = useState(-1);
  const [typedText,    setTypedText]    = useState("");
  const [showPills,    setShowPills]    = useState(false);
  const [chosen,       setChosen]       = useState<"red" | "blue" | null>(null);
  const [glitchIdx,    setGlitchIdx]    = useState<number | null>(null);
  const [focus,        setFocus]        = useState(0);

  const advancedRef = useRef(-1);
  const typingTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMatrixRain(canvasRef);

  // kick off sequence
  useEffect(() => {
    const t = setTimeout(() => startLine(0), 400);
    return () => clearTimeout(t);
  }, []);

  function startLine(idx: number) {
    if (idx >= logs.length) return;
    setVisibleCount(idx + 1);
    setTypingIdx(idx);
    setTypedText("");
    typeChar(idx, 0);
  }

  function typeChar(lineIdx: number, charIdx: number) {
    const line = logs[lineIdx];
    if (charIdx > line.text.length) {
      // line done — advance
      if (advancedRef.current >= lineIdx) return;
      advancedRef.current = lineIdx;
      setTypingIdx(-1);
      if (lineIdx === logs.length - 1) {
        typingTimer.current = setTimeout(() => {
          setShowPills(true);
          onReady?.();   // ungate the rest of the page
        }, 600);
      } else {
        typingTimer.current = setTimeout(() => startLine(lineIdx + 1), line.pause);
      }
      return;
    }
    setTypedText(line.text.slice(0, charIdx));
    typingTimer.current = setTimeout(
      () => typeChar(lineIdx, charIdx + 1),
      line.speed + Math.random() * 10
    );
  }

  useEffect(() => () => { if (typingTimer.current) clearTimeout(typingTimer.current); }, []);

  // auto scroll
  useEffect(() => {
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [visibleCount, typedText, showPills, chosen]);

  // glitch
  useEffect(() => {
    const id = setInterval(() => {
      if (visibleCount > 1 && Math.random() > 0.85) {
        const i = Math.floor(Math.random() * (visibleCount - 1));
        setGlitchIdx(i);
        setTimeout(() => setGlitchIdx(null), 80 + Math.random() * 70);
      }
    }, 1200);
    return () => clearInterval(id);
  }, [visibleCount]);

  // mouse depth
  useEffect(() => {
    const fn = (e: MouseEvent) =>
      setFocus(Math.min(10, Math.round(((e.clientX / window.innerWidth) + (e.clientY / window.innerHeight)) * 5)));
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  const handlePill = (pill: "red" | "blue") => {
    setChosen(pill);
    setShowPills(false);
    if (pill === "red") {
      setTimeout(() => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="relative w-full">
      <div className="absolute inset-0 rounded-[2rem] bg-cyan-500/5 blur-3xl pointer-events-none" />

      <div className="relative w-full min-h-[420px] sm:min-h-[520px] lg:h-[620px] overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-[#020c10] font-mono">

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-35" />

        {/* scanlines */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.025) 2px,rgba(34,211,238,0.025) 3px)", backgroundSize: "100% 3px" }} />

        {/* vignette */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 30%, rgba(2,12,16,0.85) 100%)" }} />

        {/* header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-5 py-3 border-b border-cyan-400/10 bg-[#020c10]/70">
          <span className="text-[10px] tracking-[0.38em] text-cyan-400/50 uppercase">mohib.dev — terminal</span>
          <span className="text-[10px] tracking-[0.22em] text-cyan-400/40">depth: {focus}/10</span>
        </div>

        {/* body */}
        <div ref={bodyRef} className="absolute inset-0 top-10 bottom-0 overflow-y-auto px-5 sm:px-8 pt-5 pb-6 scrollbar-hide z-10">
          <div className="space-y-[6px]">

            {logs.slice(0, visibleCount).map((log, i) => {
              const isTyping  = i === typingIdx;
              const isDone    = i < typingIdx || (i === typingIdx && typedText === log.text) || typingIdx === -1;
              const isHook    = i === 0 || i === 1; // first two lines get emphasis
              const isGlitch  = glitchIdx === i;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex gap-2 items-baseline text-[12px] sm:text-[13px] leading-[1.75] transition-all duration-75 ${
                    isGlitch
                      ? "text-red-400 translate-x-[3px] scale-[1.01]"
                      : isHook
                        ? "text-white"
                        : "text-cyan-200/85"
                  }`}
                >
                  <span className={`shrink-0 mt-[2px] ${isHook ? "text-cyan-300" : "text-cyan-400/40"}`}>›</span>
                  <span className={isHook ? "font-semibold tracking-wide" : ""}>
                    {isTyping ? typedText : log.text}
                    {isTyping && (
                      <span className="inline-block w-[6px] h-[12px] bg-cyan-300 ml-[2px] align-middle animate-[blink_0.6s_step-end_infinite]" />
                    )}
                  </span>
                </motion.div>
              );
            })}

            {/* idle cursor between lines */}
            {!showPills && !chosen && typingIdx === -1 && visibleCount > 0 && visibleCount < logs.length && (
              <div className="flex gap-2 text-cyan-400/25 text-[12px]">
                <span>›</span>
                <span className="animate-pulse">_</span>
              </div>
            )}

            {/* pills */}
            <AnimatePresence>
              {showPills && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="pt-5 pb-2 flex flex-col gap-4"
                >
                  <p className="text-[11px] tracking-[0.3em] text-cyan-400/40 uppercase">make your choice</p>
                  <div className="flex gap-4 flex-wrap">

                    {/* red */}
                    <button
                      onClick={() => handlePill("red")}
                      className="group relative overflow-hidden rounded-full px-7 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-200"
                      style={{ background: "linear-gradient(135deg,#7f0000,#cc0000)", color: "#ffc9c9", boxShadow: "0 0 18px rgba(180,0,0,0.35)" }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-300 inline-block" />
                        Red Pill — show me the work
                      </span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "linear-gradient(135deg,#cc0000,#ff2222)" }} />
                    </button>

                    {/* blue */}
                    <button
                      onClick={() => handlePill("blue")}
                      className="group relative overflow-hidden rounded-full px-7 py-2.5 text-[11px] font-bold tracking-[0.2em] uppercase transition-all duration-200"
                      style={{ background: "linear-gradient(135deg,#00007f,#0044cc)", color: "#c9dfff", boxShadow: "0 0 18px rgba(0,50,200,0.35)" }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-300 inline-block" />
                        Blue Pill — I was just browsing
                      </span>
                      <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "linear-gradient(135deg,#0044cc,#2266ff)" }} />
                    </button>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* chosen response */}
            <AnimatePresence>
              {chosen === "red" && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="pt-3 flex gap-2 text-[12px] sm:text-[13px]">
                  <span className="text-cyan-400/40">›</span>
                  <span className="text-white font-semibold tracking-wide">
                    buckle up. <span className="text-cyan-300">Kansas is going bye-bye.</span>
                  </span>
                </motion.div>
              )}
              {chosen === "blue" && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="pt-3 flex gap-2 text-[12px] sm:text-[13px]">
                  <span className="text-cyan-400/40">›</span>
                  <span className="text-cyan-400/60 italic">the story ends. you wake up in your bed.</span>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-4" />
          </div>
        </div>

      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </motion.div>
  );
}