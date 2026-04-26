import React from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, TrendingUp, Link2 } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";
import { COPY } from "@/lib/copy";

const ICON_MAP: Record<string, LucideIcon> = {
  Building2,
  TrendingUp,
  Link2,
};

export default function Audience() {
  return (
    <section
      id="audience"
      className="py-24 bg-slate-50/60 border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="font-display text-xs tracking-[0.2em] text-slate-500 mb-4">
            {COPY.audience.sectionLabel}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.02em] font-extrabold text-slate-900">
            {COPY.audience.headline.line1}
            <br />
            {COPY.audience.headline.line2}
          </h2>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-3 gap-5">
        {COPY.audience.cards.map((card, i) => {
          const Icon = ICON_MAP[card.iconName] ?? Building2;
          return (
            <Reveal key={card.label} delay={i * 100}>
              <div className="h-full rounded-2xl bg-white border border-slate-200 p-8">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: BRAND_BLUE_FAINT }}
                >
                  <Icon className="w-5 h-5" style={{ color: BRAND_BLUE }} />
                </div>
                <h3 className="text-[17px] font-bold text-slate-900 leading-snug tracking-tight">
                  {card.label}
                </h3>
                <blockquote
                  className="mt-3 pl-3 text-[14px] text-slate-600 leading-[1.7] italic"
                  style={{ borderLeft: `2px solid ${BRAND_BLUE_FAINT}` }}
                >
                  “{card.quote}”
                </blockquote>
                <p
                  className="mt-4 text-[14px] leading-[1.75] font-semibold"
                  style={{ color: BRAND_BLUE }}
                >
                  → {card.body}
                </p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-14 md:mt-16 text-center">
        <Reveal delay={300}>
          <p
            className="text-sm md:text-base leading-[1.8]"
            style={{ color: "#6B7280" }}
          >
            {COPY.audience.footer.pre}
            <strong style={{ color: BRAND_BLUE }}>
              {COPY.audience.footer.highlight}
            </strong>
            {COPY.audience.footer.post}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
