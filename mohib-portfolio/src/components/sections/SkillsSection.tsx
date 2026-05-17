"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skills } from "@/data/skills";

// Map each category to a short terminal-style ID
const CATEGORY_IDS: Record<string, string> = {
  "Frontend":        "SYS::FE",
  "Backend":         "SYS::BE",
  "Mobile":          "SYS::MOB",
  "Blockchain":      "SYS::WEB3",
  "AI / ML":         "SYS::AI",
  "Infrastructure":  "SYS::OPS",
};

function SkillCard({
  group,
  index,
}: {
  group: (typeof skills)[number];
  index: number;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState<string | null>(null);

  const termId = CATEGORY_IDS[group.category] ?? `SYS::${group.category.toUpperCase().slice(0, 4)}`;

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: index * 0.09, ease: "easeOut" }}
      className="group relative will-change-transform overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#030e14] p-7 transition-colors duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_48px_rgba(34,211,238,0.06)]"
    >
      {/* corner accent — top left */}
      <span className="absolute left-0 top-0 h-6 w-6 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-[1.75rem]" />
      <span className="absolute right-0 bottom-0 h-6 w-6 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.75rem]" />

      {/* scanlines */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)",
          backgroundSize: "100% 3px",
        }}
      />

      {/* hover glow sweep */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

      <div className="relative space-y-5">

        {/* header */}
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-[0.38em] text-cyan-400/50 uppercase">
              {termId}
            </p>
            <h3 className="font-mono text-base font-semibold uppercase tracking-[0.15em] text-cyan-100">
              {group.category}
            </h3>
          </div>

          {/* live dot */}
          <div className="mt-1 flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.9)] animate-pulse" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-cyan-400/40 uppercase">
              {group.items.length} modules
            </span>
          </div>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />

        {/* skill pills */}
        <div className="flex flex-wrap gap-2">
          {group.items.map((item, i) => (
            <motion.span
              key={item}
           initial={{
  opacity: 0,
  x: -24,
}}

animate={
  inView
    ? {
        opacity: 1,
        x: 0,
      }
    : {}
}

transition={{
  duration: 0.55,
  delay: index * 0.08,
  ease: [0.22, 1, 0.36, 1],
}}
              onMouseEnter={() => setHovered(item)}
              onMouseLeave={() => setHovered(null)}
              className={`
                relative font-mono text-[11px] tracking-[0.12em] uppercase
                rounded-lg border px-3 py-1.5 cursor-default
                transition-colors duration-300 select-none
                ${hovered === item
                  ? "border-cyan-400/50 bg-cyan-400/10 text-cyan-100 shadow-[0_0_14px_rgba(34,211,238,0.15)]"
                  : "border-cyan-400/12 bg-cyan-400/[0.03] text-cyan-300/70"
                }
              `}
            >
              {/* glitch layers on hover */}
              {hovered === item && (
                <>
                  <span className="absolute inset-0 flex items-center px-3 text-cyan-400/25 translate-x-[1.5px] pointer-events-none" aria-hidden>
                    {item}
                  </span>
                  <span className="absolute inset-0 flex items-center px-3 text-emerald-400/15 -translate-x-[1.5px] pointer-events-none" aria-hidden>
                    {item}
                  </span>
                </>
              )}
              <span className="relative z-10">{item}</span>
            </motion.span>
          ))}
        </div>

      </div>
    </motion.article>
  );
}

export default function SkillsSection() {
  const headRef  = useRef<HTMLDivElement>(null);
  const headView = useInView(headRef, { once: true, margin: "-40px" });

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-t border-cyan-400/8 py-28"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(34,211,238,0.04),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_100%,rgba(34,211,238,0.03),transparent_45%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
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
            [ SKILLS_MATRIX ]
          </motion.p>

          <div className="relative group inline-block overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={headView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-white leading-[0.95]"
            >
              Technical Stack
            </motion.h2>
            {/* glitch layers */}
            <h2 className="pointer-events-none absolute left-0 top-0 text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-cyan-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:translate-x-[3px] group-hover:opacity-60 leading-[0.95]" aria-hidden>
              Technical Stack
            </h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-emerald-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:-translate-x-[3px] group-hover:opacity-50 leading-[0.95]" aria-hidden>
              Technical Stack
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="max-w-xl text-base leading-7 text-slate-400 font-mono text-sm"
          >
            Every line here is something i've shipped with. no filler.
          </motion.p>
        </div>

        {/* grid */}
        <div className="grid gap-5 lg:grid-cols-2">
          {skills.map((group, i) => (
            <SkillCard key={group.category} group={group} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}