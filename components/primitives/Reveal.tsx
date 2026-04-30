"use client";

import React, { useState, useEffect, useRef } from "react";

/* -------- 유틸: IntersectionObserver 기반 fade-in -------- */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

export default function Reveal({
  children,
  delay = 0,
  className = "",
  distance = 16,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  /** translateY 거리(px). 0이면 fade-only (mock 영역 들썩임 방지). */
  distance?: number;
}) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : `translateY(${distance}px)`,
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,0.9,0.35,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
