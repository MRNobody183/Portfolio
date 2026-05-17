"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume.pdf" },
];

const navItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (custom: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: custom * 0.12,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const mobileMenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3 },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.2 },
  },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const href = e.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
        setMenuOpen(false);
      }
    }
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-all duration-300",
        scrolled
          ? "border-slate-700/30 bg-slate-950/95 backdrop-blur-xl text-slate-100"
          : "border-transparent bg-transparent text-slate-100"
      )}
    >
      <div className="page-container flex h-16 items-center justify-between gap-6">
        <motion.a
          href="#home"
          onClick={handleNavClick}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-100 hover:text-slate-100 transition-colors"
        >
          mohib
        </motion.a>

        <nav className="hidden items-center gap-10 md:flex">
          {navigation.map((item, idx) => (
            <motion.a
              key={item.label}
              custom={idx}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              href={item.href}
              onClick={handleNavClick}
              className="text-sm uppercase tracking-[0.28em] text-slate-300 transition-all hover:text-slate-100 hover:drop-shadow-[0_0_10px_rgba(124,58,237,0.35)] relative group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-400 to-violet-300 group-hover:w-full transition-all duration-300" />
            </motion.a>
          ))}
        </nav>

        <motion.button
          type="button"
          onClick={() => setMenuOpen((current) => !current)}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-700/40 bg-slate-900 text-slate-100 shadow-sm transition hover:border-violet-400/60 hover:text-slate-100 hover:shadow-[0_0_15px_rgba(124,58,237,0.25)] md:hidden"
          aria-label="Toggle navigation"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="border-t border-slate-700/70 bg-slate-950/95 md:hidden"
          >
            <div className="page-container py-4">
              <div className="flex flex-col gap-3">
                {navigation.map((item, idx) => (
                  <motion.a
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    href={item.href}
                    onClick={handleNavClick}
                    className="block rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.28em] text-slate-300 transition hover:bg-slate-900/50 hover:text-slate-100 hover:border-l-2 hover:border-violet-400 relative group"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
