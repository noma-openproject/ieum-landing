import React from "react";
import { ArrowRight } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_DARK, ctaHref } from "../constants";
import { COPY } from "@/lib/copy";

export default function MidCTA() {
  const href = ctaHref(COPY.ctaSubject.demo);
  if (!href) return null;
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-12 lg:px-14 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          style={{
            background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
          }}
        >
          {/* 장식용 빛 번짐 */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
            }}
          />
          {/* 도트는 오른쪽 영역에만 제한 (텍스트 위로 오지 않음) */}
          <div
            className="hidden md:block absolute inset-y-0 right-0 w-1/2 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 0.8px, transparent 0)",
              backgroundSize: "22px 22px",
              maskImage:
                "linear-gradient(to left, black 20%, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 20%, transparent 90%)",
            }}
          />

          <div className="relative z-10">
            <h3 className="font-display text-2xl lg:text-[28px] tracking-[-0.02em] font-bold text-white leading-snug">
              {COPY.midCta.headline.line1}
              <br />
              {COPY.midCta.headline.line2}
            </h3>
          </div>
          <div className="relative z-10">
            <a
              href={href}
              className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-lg text-sm font-medium tracking-tight hover:bg-slate-50 transition whitespace-nowrap"
              style={{ color: BRAND_BLUE }}
            >
              {COPY.midCta.cta}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
