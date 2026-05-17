"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { experience } from "@/data/experience";

function ExperienceCard({
  itemData,
  index,
  total,
}: {
  itemData: (typeof experience)[number];
  index: number;
  total: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: index * 0.09, ease: "easeOut" }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#030e14] transition-colors duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_60px_rgba(34,211,238,0.06)]"
    >
      {/* corner brackets */}
      <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-[1.75rem]" />
      <span className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.75rem]" />

      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

      {/* sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative grid gap-0 sm:grid-cols-[96px_1fr]">

        {/* LEFT — index column */}
        <div className="flex flex-col items-center justify-start gap-3 border-r border-cyan-400/8 px-6 pt-10 pb-8 sm:pt-10">
          {/* zero-padded index */}
          <span className="font-mono text-3xl font-bold tracking-[-0.06em] text-cyan-400/20 group-hover:text-cyan-400/40 transition-colors duration-300">
            {String(index + 1).padStart(2, "0")}
          </span>
          {/* vertical timeline line */}
          <div className="flex-1 w-px bg-gradient-to-b from-cyan-400/15 to-transparent min-h-[40px]" />
          {/* status dot */}
          <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${active ? "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]" : "bg-cyan-400/25"}`} />
        </div>

        {/* RIGHT — content */}
        <div className="space-y-5 px-8 py-10">

          {/* top bar */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-400/50">
                {itemData.company}
              </span>
              <span className="text-cyan-400/20 font-mono text-[10px]">•</span>
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400/35">
                {itemData.period}
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.2em] text-cyan-400/20">
              [{String(index + 1).padStart(2,"0")}/{String(total).padStart(2,"0")}]
            </span>
          </div>

          {/* title with glitch */}
          <div className="relative inline-block">
            <h3 className="text-2xl sm:text-3xl font-bold tracking-[-0.04em] text-white leading-tight transition-colors duration-300 group-hover:text-cyan-100">
              {itemData.title}
            </h3>
            <h3 className="pointer-events-none absolute left-0 top-0 text-2xl sm:text-3xl font-bold tracking-[-0.04em] text-cyan-400 opacity-0 blur-[1px] leading-tight transition-colors duration-300 group-hover:translate-x-[2px] group-hover:opacity-45" aria-hidden>
              {itemData.title}
            </h3>
            <h3 className="pointer-events-none absolute left-0 top-0 text-2xl sm:text-3xl font-bold tracking-[-0.04em] text-emerald-400 opacity-0 blur-[1px] leading-tight transition-colors duration-300 group-hover:-translate-x-[2px] group-hover:opacity-35" aria-hidden>
              {itemData.title}
            </h3>
          </div>

          {/* divider */}
          <div className="h-px w-full bg-gradient-to-r from-cyan-400/18 via-cyan-400/5 to-transparent" />

          {/* description */}
          <p className="font-mono text-[13px] leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
            {itemData.description}
          </p>

          {/* tags */}
          <div className="flex flex-wrap gap-2 pt-1">
            {itemData.items.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] uppercase tracking-[0.14em] rounded-lg border border-cyan-400/10 bg-cyan-400/[0.03] px-3 py-1.5 text-cyan-300/60 transition-colors duration-300 hover:border-cyan-400/35 hover:bg-cyan-400/[0.07] hover:text-cyan-200"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </motion.article>
  );
}

export default function ExperienceSection() {
  const headRef  = useRef<HTMLDivElement>(null);
  const headView = useInView(headRef, { once: true, margin: "-40px" });

  return (
    <section
      id="experience"
      className="relative overflow-hidden border-t border-cyan-400/8 py-28"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.04),transparent_50%)]" />
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)",
            backgroundSize: "100% 3px",
          }}
        />
      </div>

      <div className="page-container relative z-10 space-y-16">

        {/* heading */}
        <div ref={headRef} className="space-y-5 max-w-4xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={headView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="font-mono text-[11px] uppercase tracking-[0.45em] text-cyan-400/50"
          >
            [ SYSTEM_LOG ]
          </motion.p>

          <div className="relative group inline-block overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={headView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-white leading-[0.95]"
            >
              Experience
            </motion.h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-cyan-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:translate-x-[3px] group-hover:opacity-60 leading-[0.95]" aria-hidden>
              Experience
            </h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-emerald-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:-translate-x-[3px] group-hover:opacity-50 leading-[0.95]" aria-hidden>
              Experience
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="max-w-xl font-mono text-sm leading-7 text-slate-400"
          >
            3+ years shipping production systems that stay up.
          </motion.p>
        </div>

        {/* timeline */}
        <div className="space-y-5">
          {experience.map((exp, i) => (
            <ExperienceCard
              key={exp.number}
              itemData={exp}
              index={i}
              total={experience.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}