"use client";

import { ReactNode, useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export default function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const isMobile =
      /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(
        navigator.userAgent
      ) || window.innerWidth < 768;

    lenisRef.current = new Lenis({
      duration: isMobile ? 0.5 : 0.8,

      // smooth desktop wheel scrolling
      smoothWheel: true,

      // IMPORTANT
      // prevents delayed mobile scrolling
      syncTouch: false,

      // lighter easing
      easing: (t: number) => 1 - Math.pow(1 - t, 3),

      orientation: "vertical",
      gestureOrientation: "vertical",
      touchMultiplier: 1,
      wheelMultiplier: 1,
      infinite: false,
    });

    let rafId: number;

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    const resize = () => {
      lenisRef.current?.resize();
    };

    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);

      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
