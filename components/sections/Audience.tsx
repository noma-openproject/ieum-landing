import React from "react";
import type { LucideIcon } from "lucide-react";
import { Building2, TrendingUp, Link2 } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

type AudienceCard = {
  icon: LucideIcon;
  label: string;
  quote: string;
  body: string;
};

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    icon: Building2,
    label: "실장님 이직이 잦은 병원",
    quote: "이번 달도 새 실장 교육 중이에요",
    body: "신입과 베테랑을 이어드려요.",
  },
  {
    icon: TrendingUp,
    label: "환자분 후기 마케팅이 어려운 병원",
    quote: "바쁘게 나가시는 분들 붙잡기가 참 민망해요",
    body: "환자의 만족과 후기를 이어드려요.",
  },
  {
    icon: Link2,
    label: "지점이 여러 개인 네트워크 병원",
    quote: "지점마다 상담 품질이 다 달라요",
    body: "지점과 지점을 같은 기준으로 이어드려요.",
  },
];

export default function Audience() {
  return (
    <section
      id="audience"
      className="py-24 bg-slate-50/60 border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="font-display text-xs tracking-[0.2em] text-slate-500 mb-4">
            {"[ WHO IT'S FOR ]"}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.02em] font-extrabold text-slate-900">
            이음이 먼저
            <br />
            닿고 싶은 병원
          </h2>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-3 gap-5">
        {AUDIENCE_CARDS.map(({ icon: Icon, label, quote, body }, i) => (
          <Reveal key={label} delay={i * 100}>
            <div className="h-full rounded-2xl bg-white border border-slate-200 p-8">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: BRAND_BLUE_FAINT }}
              >
                <Icon className="w-5 h-5" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 leading-snug tracking-tight">
                {label}
              </h3>
              <blockquote
                className="mt-3 pl-3 text-[14px] text-slate-600 leading-[1.7] italic"
                style={{ borderLeft: `2px solid ${BRAND_BLUE_FAINT}` }}
              >
                “{quote}”
              </blockquote>
              <p
                className="mt-4 text-[14px] leading-[1.75] font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                → {body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
