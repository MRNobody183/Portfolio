"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 3,  suffix: "+", label: "Years industry experience", id: "SYS::EXP"  },
  { value: 10, suffix: "+", label: "Projects completed",        id: "SYS::PROJ" },
  { value: 4,  suffix: "",  label: "Brands collaborated with",  id: "SYS::CLNT" },
  { value: 15, suffix: "+", label: "Interfaces shipped",        id: "SYS::UI"   },
];

function CountUp({
  target,
  suffix,
  active,
}: {
  target: number;
  suffix: string;
  active: boolean;
}) {
  const [count, setCount] = useState(0);
  const hasRun = useRef(false);

  useEffect(() => {
    if (!active || hasRun.current) return;
    hasRun.current = true;

    const duration = 1200;
    const steps    = 40;
    const interval = duration / steps;
    let step = 0;

    const id = setInterval(() => {
      step++;
      // ease-out curve
      const progress = 1 - Math.pow(1 - step / steps, 3);
      setCount(Math.round(progress * target));
      if (step >= steps) clearInterval(id);
    }, interval);

    return () => clearInterval(id);
  }, [active, target]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[number];
  index: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative overflow-hidden rounded-[1.5rem] border border-cyan-400/10 bg-[#030e14] p-7 transition-colors duration-500 hover:border-cyan-400/25 hover:shadow-[0_0_40px_rgba(34,211,238,0.06)]"
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-cyan-400/28 rounded-tl-[1.5rem]" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.5rem]" />

      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_60%)]" />

      {/* sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative space-y-3">
        {/* system id */}
        <p className="font-mono text-[9px] uppercase tracking-[0.38em] text-cyan-400/40">
          {stat.id}
        </p>

        {/* divider */}
        <div className="h-px w-8 bg-gradient-to-r from-cyan-400/30 to-transparent" />

        {/* value */}
        <p className="font-mono text-[clamp(2.4rem,4vw,3.2rem)] font-bold leading-none tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-cyan-100">
          <CountUp target={stat.value} suffix={stat.suffix} active={inView} />
        </p>

        {/* label */}
        <p className="font-mono text-[11px] leading-[1.6] tracking-[0.06em] text-slate-400 transition-colors duration-300 group-hover:text-slate-300 uppercase">
          {stat.label}
        </p>

        {/* bottom pulse indicator */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className={`h-1 w-1 rounded-full transition-colors duration-300 ${hovered ? "bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)]" : "bg-cyan-400/25"}`} />
          <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-400/25 uppercase">verified</span>
        </div>
      </div>
    </motion.article>
  );
}

export default function StatsSection() {
  return (
    <section className="relative overflow-hidden border-t border-cyan-400/8 py-20">
      {/* bg */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(34,211,238,0.03),transparent_60%)]" />
      </div>

      <div className="page-container relative z-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.id} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}