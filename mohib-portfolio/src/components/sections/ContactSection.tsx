"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Download, Copy, Check } from "lucide-react";

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mohib-ur-rehman-70bb321a4" },
];

const NAV = [
  { label: "Home",       href: "#home" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills",     href: "#skills" },
  { label: "Contact",    href: "#contact" },
];

export default function ContactSection() {
  const [copied, setCopied]   = useState(false);
  const headRef               = useRef<HTMLDivElement>(null);
  const headView              = useInView(headRef, { once: true, margin: "-40px" });
  const panelRef              = useRef<HTMLDivElement>(null);
  const panelView             = useInView(panelRef, { once: true, margin: "-60px" });

  const handleCopy = async () => {
    await navigator.clipboard.writeText("rajamohib9@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section id="contact" className="relative overflow-hidden border-t border-cyan-400/8 py-28">

      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(34,211,238,0.05),transparent_50%)]" />
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
            [ CONTACT_NODE_ACTIVE ]
          </motion.p>

          <div className="relative group inline-block overflow-hidden">
            <motion.h2
              initial={{ y: "105%" }}
              animate={headView ? { y: 0 } : {}}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em] text-white"
            >
              Let's build<br />something real.
            </motion.h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em] text-cyan-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:translate-x-[3px] group-hover:opacity-55" aria-hidden>
              Let's build<br />something real.
            </h2>
            <h2 className="pointer-events-none absolute left-0 top-0 text-[clamp(2.8rem,7vw,6rem)] font-bold leading-[0.92] tracking-[-0.05em] text-emerald-400 opacity-0 blur-[1px] transition-colors duration-300 group-hover:-translate-x-[3px] group-hover:opacity-45" aria-hidden>
              Let's build<br />something real.
            </h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={headView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.55 }}
            className="max-w-xl font-mono text-sm leading-7 text-slate-400"
          >
            available for production work, contract roles, and systems that matter.
          </motion.p>
        </div>

        {/* panels */}
        <div ref={panelRef} className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">

          {/* EMAIL PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={panelView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#030e14] p-10 transition-colors duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_60px_rgba(34,211,238,0.06)]"
          >
            {/* corner brackets */}
            <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-[1.75rem]" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.75rem]" />

            {/* scanlines */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)", backgroundSize: "100% 3px" }} />

            {/* glow */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

            {/* sweep */}
            <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/[0.04] to-transparent transition-transform duration-700 group-hover:translate-x-full" />

            <div className="relative space-y-7">
              <div className="space-y-1">
                <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-400/45">
                  SYS::CONTACT
                </p>
                <p className="font-mono text-sm text-cyan-200/60">
                  rajamohib9@gmail.com
                </p>
              </div>

              {/* divider */}
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />

              <div className="flex flex-wrap gap-3">
                {/* copy email */}
                <button
                  onClick={handleCopy}
                  className="group/btn relative overflow-hidden flex items-center gap-2.5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200/80 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-100"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                  {copied
                    ? <><Check size={13} /><span>copied</span></>
                    : <><Copy size={13} /><span>copy email</span></>
                  }
                </button>

                {/* send email */}
                <a
                  href="mailto:rajamohib9@gmail.com"
                  className="group/btn relative overflow-hidden flex items-center gap-2.5 rounded-xl border border-cyan-400/20 bg-cyan-400/[0.05] px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-cyan-200/80 transition-colors duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-100"
                >
                  <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent transition-transform duration-500 group-hover/btn:translate-x-full" />
                  <Mail size={13} />
                  <span>send message</span>
                </a>

                {/* resume */}
                <a
                  href="/Mohib-Rehman-Full-Stack-Developer-CV.pdf"  // ← changed
  download="Mohib-Rehman-CV.pdf"                    // ← added
  target="_blank"
  rel="noopener noreferrer"
  className="group/btn relative overflow-hidden flex items-center gap-2.5 rounded-xl border border-cyan-400/10 bg-transparent px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 transition-colors duration-300 hover:border-cyan-400/25 hover:text-cyan-300/80"
>
  <Download size={13} />
  <span>resume</span>
</a>
              </div>
            </div>
          </motion.div>

          {/* SOCIAL + STATUS PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 28, filter: "blur(8px)" }}
            animate={panelView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
            className="group relative overflow-hidden rounded-[1.75rem] border border-cyan-400/10 bg-[#030e14] p-10 transition-colors duration-300 hover:border-cyan-400/25 hover:shadow-[0_0_60px_rgba(34,211,238,0.06)]"
          >
            <span className="pointer-events-none absolute left-0 top-0 h-7 w-7 border-l-2 border-t-2 border-cyan-400/30 rounded-tl-[1.75rem]" />
            <span className="pointer-events-none absolute right-0 bottom-0 h-7 w-7 border-r-2 border-b-2 border-cyan-400/10 rounded-br-[1.75rem]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(34,211,238,0.5) 2px,rgba(34,211,238,0.5) 3px)", backgroundSize: "100% 3px" }} />
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_top_left,rgba(34,211,238,0.05),transparent_55%)]" />

            <div className="relative space-y-7">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.38em] text-cyan-400/45 mb-4">
                  SYS::NODES
                </p>
                <div className="flex flex-wrap gap-2.5">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[10px] uppercase tracking-[0.2em] rounded-lg border border-cyan-400/10 bg-cyan-400/[0.03] px-4 py-2.5 text-cyan-300/60 transition-colors duration-300 hover:border-cyan-400/38 hover:bg-cyan-400/[0.07] hover:text-cyan-200"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* divider */}
              <div className="h-px w-full bg-gradient-to-r from-cyan-400/20 via-cyan-400/5 to-transparent" />

              {/* status readout */}
              <div className="rounded-xl border border-cyan-400/10 bg-cyan-400/[0.03] px-5 py-4 space-y-3">
                {[
                  { label: "Status",     value: "Available",      active: true  },
                  { label: "Mode",       value: "Contract / Full-time",  active: false },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-cyan-400/35">
                      {row.label}
                    </span>
                    <span className={`font-mono text-[10px] uppercase tracking-[0.22em] flex items-center gap-1.5 ${row.active ? "text-cyan-300" : "text-slate-400"}`}>
                      {row.active && <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_rgba(34,211,238,0.9)]" />}
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* FOOTER */}
        <footer className="border-t border-cyan-400/8 pt-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div className="space-y-1">
              <p className="font-mono text-[11px] uppercase tracking-[0.45em] text-cyan-300/60">
                Mohib — Digital Engineer
              </p>
            </div>

            <nav className="flex flex-wrap gap-5">
              {NAV.map((n) => (
                <a
                  key={n.label}
                  href={n.href}
                  className="font-mono text-[10px] uppercase tracking-[0.28em] text-slate-500 transition-colors duration-200 hover:text-cyan-300/80"
                >
                  {n.label}
                </a>
              ))}
            </nav>

          </div>
        </footer>

      </div>
    </section>
  );
}
