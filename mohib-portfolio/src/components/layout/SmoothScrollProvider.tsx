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

    // destroy existing instance
    lenisRef.current?.destroy();

    lenisRef.current = new Lenis({
      duration: isMobile ? 0.55 : 0.8,

      // smoother desktop wheel
      smoothWheel: true,

      // IMPORTANT:
      // native mobile scrolling feels much better
      smoothTouch: false,
      syncTouch: false,

      // lighter easing
      easing: (t: number) => 1 - Math.pow(1 - t, 3),

      orientation: "vertical",
      gestureOrientation: "vertical",
      wheelMultiplier: 1,
      touchMultiplier: 1,
      infinite: false,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenisRef.current?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    // optional resize handling
    const handleResize = () => {
      lenisRef.current?.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);

      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
