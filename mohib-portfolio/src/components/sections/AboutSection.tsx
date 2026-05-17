"use client";

import { motion } from "framer-motion";

const container = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const item = {
  hidden:   { opacity: 0, y: 30 },
  visible:  { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-cyan-400/10 py-28"
    >
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.04),transparent_40%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.04),transparent_40%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(34,211,238,0.2) 1px, transparent 1px)",
            backgroundSize: "100% 3px",
          }}
        />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        // items-stretch makes both columns fill the row height equally
        className="page-container relative z-10 grid gap-5 lg:grid-cols-[0.95fr_1fr] lg:items-stretch"
      >

        {/* ── LEFT ── */}
        <motion.div
          variants={item}
          className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#030e14] p-8 transition-colors duration-500 hover:border-cyan-400/25 hover:shadow-[0_0_48px_rgba(34,211,238,0.06)]"
        >
          {/* corner brackets */}
          <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-[1.75rem]" />
          <span className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.75rem]" />

          {/* scanlines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)", backgroundSize: "100% 3px" }} />

          {/* hover glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

          <div className="relative flex flex-1 flex-col space-y-8">

            {/* terminal label */}
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-cyan-400/55">
                [ ABOUT_ME ]
              </p>
            </div>

            {/* heading with glitch */}
            <div className="group/title relative inline-block">
              <h2 className="relative z-10 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl">
                Results-driven Full-Stack Developer
                building futuristic digital systems.
              </h2>
              <h2 className="pointer-events-none absolute left-0 top-0 z-0 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-cyan-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover/title:translate-x-[3px] group-hover/title:opacity-60 sm:text-5xl" aria-hidden>
                Results-driven Full-Stack Developer
                building futuristic digital systems.
              </h2>
              <h2 className="pointer-events-none absolute left-0 top-0 z-0 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-emerald-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover/title:-translate-x-[3px] group-hover/title:opacity-50 sm:text-5xl" aria-hidden>
                Results-driven Full-Stack Developer
                building futuristic digital systems.
              </h2>
            </div>

            {/* divider */}
            <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />

            {/* mini stats — pushed to bottom with mt-auto */}
            <div className="mt-auto grid grid-cols-2 gap-3">
              {[
                ["3+",        "Years Experience"  ],
                ["10+",       "Projects Shipped"  ],
                ["Full Stack","Web + Mobile"       ],
                ["Realtime",  "AI + Web3 Systems"  ],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4 transition-colors duration-200 hover:border-cyan-400/25 hover:bg-cyan-400/[0.06]"
                >
                  <div className="font-mono text-xl font-bold text-cyan-100">{value}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-400">{label}</div>
                </div>
              ))}
            </div>

          </div>
        </motion.div>

        {/* ── RIGHT ── */}
        <motion.div
          variants={item}
          className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#030e14] p-8 text-base leading-8 text-slate-300 transition-colors duration-500 hover:border-cyan-400/25 hover:shadow-[0_0_48px_rgba(34,211,238,0.06)] sm:text-lg"
        >
          {/* corner brackets */}
          <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-[1.75rem]" />
          <span className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.75rem]" />

          {/* scanlines */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)", backgroundSize: "100% 3px" }} />

          {/* hover glow */}
          <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

          <div className="relative flex flex-1 flex-col space-y-6">

            {/* terminal label */}
            <div className="flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400/40" />
              <p className="font-mono text-[10px] uppercase tracking-[0.42em] text-cyan-400/45">
                [ SYS::BIO ]
              </p>
            </div>

            {/* divider */}
            <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />

            {/* bio paragraphs */}
            <p>
              I specialize in
              <span className="mx-1.5 font-semibold text-cyan-200">React.js</span>,
              <span className="mx-1.5 font-semibold text-cyan-200">Next.js</span>,
              <span className="mx-1.5 font-semibold text-cyan-200">React Native</span>,
              <span className="mx-1.5 font-semibold text-cyan-200">Node.js</span>,
              <span className="mx-1.5 font-semibold text-cyan-200">NestJS</span>
              and
              <span className="mx-1.5 font-semibold text-cyan-200">Django REST</span>
              ecosystems.
            </p>

            <p>
              My expertise spans scalable architecture,
              real-time systems, AI-powered applications,
              blockchain integrations, WebSockets,
              and cinematic frontend experiences.
            </p>

            <p>
              At Silverthread Labs, I architect
              production-grade systems and build products
              ranging from office management platforms
              and mobile apps to multiplayer Web3 games
              and analytics dashboards.
            </p>

            <p>
              I focus on engineering clean,
              maintainable, high-performance applications
              aligned with modern development standards,
              performance optimization, and scalable UX systems.
            </p>

            {/* terminal footer — pushed to bottom */}
            <div className="mt-auto flex items-center gap-3 pt-4 font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400/50">
              <div className="h-px flex-1 bg-cyan-400/15" />
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-cyan-400 animate-pulse" />
                System Status: Online
              </span>
              <div className="h-px flex-1 bg-cyan-400/15" />
            </div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}