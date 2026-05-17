"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/projects";

function ProjectCard({
  project,
  index,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [active, setActive] = useState(false);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 36, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: "easeOut" }}
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

      {/* hover glow */}
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

      {/* energy sweep */}
      <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

      <div className="relative p-8 sm:p-10 space-y-7">

        {/* top bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${active ? "bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,1)]" : "bg-cyan-400/50"}`} />
            <span className="font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-400/50">
              {project.category}
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.22em] text-cyan-400/30">
            [{String(index + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}]
          </span>
        </div>

        {/* title */}
        <div className="relative inline-block group/title">
          <h3 className="text-4xl sm:text-5xl font-bold tracking-[-0.05em] text-white leading-[0.95] transition-colors duration-300 group-hover:text-cyan-100">
            {project.name}
          </h3>
          {/* glitch layers */}
          <h3 className="pointer-events-none absolute left-0 top-0 text-4xl sm:text-5xl font-bold tracking-[-0.05em] text-cyan-400 opacity-0 blur-[1px] leading-[0.95] transition-colors duration-300 group-hover:translate-x-[2px] group-hover:opacity-50" aria-hidden>
            {project.name}
          </h3>
          <h3 className="pointer-events-none absolute left-0 top-0 text-4xl sm:text-5xl font-bold tracking-[-0.05em] text-emerald-400 opacity-0 blur-[1px] leading-[0.95] transition-colors duration-300 group-hover:-translate-x-[2px] group-hover:opacity-40" aria-hidden>
            {project.name}
          </h3>
        </div>

        {/* divider */}
        <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />

        {/* description */}
        <p className="max-w-3xl text-[15px] leading-7 text-slate-400 transition-colors duration-300 group-hover:text-slate-300 font-mono">
          {project.description}
        </p>

        {/* stack + links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">

          {/* tech pills */}
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-[10px] uppercase tracking-[0.15em] rounded-lg border border-cyan-400/10 bg-cyan-400/[0.03] px-3 py-1.5 text-cyan-300/60 transition-colors duration-300 hover:border-cyan-400/35 hover:bg-cyan-400/[0.07] hover:text-cyan-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* links
          <div className="flex items-center gap-3 shrink-0">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400/40 hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1.5"
              >
                <span className="h-px w-4 bg-current" />
                source
              </a>
            )}
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.28em] rounded-lg border border-cyan-400/20 bg-cyan-400/[0.05] px-4 py-2 text-cyan-300/80 hover:border-cyan-400/45 hover:bg-cyan-400/10 hover:text-cyan-100 transition-colors duration-300 flex items-center gap-2"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                live
              </a>
            )}
          </div> */}

        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  const headRef  = useRef<HTMLDivElement>(null);
  const headView = useInView(headRef, { once: true, margin: "-40px" });

  return (
    <section
      id="projects"
      className="relative overflow-hidden border-t border-cyan-400/8 py-28"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_0%,rgba(34,211,238,0.04),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_90%_100%,rgba(34,211,238,0.03),transparent_40%)]" />
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
            [ PROJECT_STREAM ]
          </motion.p>

          <div className="relative group inline-block overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={headView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-white leading-[0.95]"
            >
              Selected Builds
            </motion.h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-cyan-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:translate-x-[3px] group-hover:opacity-60 leading-[0.95]" aria-hidden>
              Selected Builds
            </h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-5xl sm:text-6xl font-bold tracking-[-0.05em] text-emerald-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:-translate-x-[3px] group-hover:opacity-50 leading-[0.95]" aria-hidden>
              Selected Builds
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="max-w-xl font-mono text-sm leading-7 text-slate-400"
          >
            production systems. real problems. shipped.
          </motion.p>
        </div>

        {/* project list */}
        <div className="space-y-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.name}
              project={project}
              index={i}
              total={projects.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
}