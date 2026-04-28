"use client";

import React from "react";
import { Check } from "lucide-react";
import Reveal from "../primitives/Reveal";
import SectionLabel from "../primitives/SectionLabel";
import SmartMock from "../primitives/SmartMock";
import MockConsultCoach from "../mocks/MockConsultCoach";
import { BRAND_BLUE, BRAND_BLUE_FAINT, SCREENSHOTS } from "../constants";
import { COPY } from "@/lib/copy";

/* ═══════════════════════════════════════════════════════════════════
   FeatureConsultCoach — 0.1 CONSULT COACH 3-stage 섹션
   ═══════════════════════════════════════════════════════════════════
   layout: 가운데 정렬 카피(상) → 풀폭 dashboard mock(하) — 상하 stack.
   각 stage(1차/2차/3차)가 같은 패턴으로 stack. 좌우 grid 폐기.
   0.2 ReviewBuilder / 0.3 CareNote와 layout 일관 (max-w-5xl mock).
   ═══════════════════════════════════════════════════════════════════ */

type ConsultStage = (typeof COPY.consultCoach.stages)[number];

/** stage.key("stage1"/"stage2"/"stage3") → MockConsultCoach 의 stage prop(1|2|3) 매핑.
    잘못된 키가 들어오면 1로 폴백. */
function stageVariant(key: string): 1 | 2 | 3 {
  if (key === "stage2") return 2;
  if (key === "stage3") return 3;
  return 1;
}

function StageBlock({ stage }: { stage: ConsultStage }) {
  return (
    <div>
      {/* ─── 1. 가운데 정렬 카피 영역 ─── */}
      <div className="text-center max-w-3xl mx-auto">
        <Reveal>
          <div className="flex justify-center mb-5">
            <div
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: BRAND_BLUE_FAINT,
                color: BRAND_BLUE,
              }}
            >
              {stage.caption}
            </div>
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="font-display text-2xl lg:text-[32px] leading-[1.3] tracking-[-0.02em] font-extrabold text-slate-900 whitespace-pre-line">
            {stage.heading}
          </h3>
        </Reveal>
        <Reveal delay={160}>
          {stage.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-[15.5px] text-slate-600 leading-[1.8] whitespace-pre-line ${
                i === 0 ? "mt-6" : "mt-4"
              }`}
            >
              {para}
            </p>
          ))}
        </Reveal>
        <Reveal delay={240}>
          <ul className="mt-8 inline-flex flex-wrap gap-x-6 gap-y-3 justify-center">
            {stage.checklist.map((item) => (
              <li key={item.text} className="flex items-center gap-2">
                <span
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: BRAND_BLUE_FAINT }}
                >
                  <Check
                    className="w-3 h-3"
                    strokeWidth={3}
                    style={{ color: BRAND_BLUE }}
                  />
                </span>
                <span className="text-[14px] text-slate-700 leading-relaxed">
                  {item.text}
                  {"status" in item && item.status === "beta" && (
                    <span
                      className="ml-2 text-xs italic"
                      style={{ color: "#6B7280" }}
                    >
                      · {COPY.shared.betaBadge}
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      {/* ─── 2. mock 영역 (풀폭 max-w-5xl) ─── */}
      <div className="mt-12 max-w-5xl mx-auto">
        <Reveal delay={100}>
          <SmartMock
            screenshot={stage.image ?? SCREENSHOTS.consultCoach}
            fallback={<MockConsultCoach stage={stageVariant(stage.key)} />}
            alt={`이음 상담 코치 ${stage.caption} 화면`}
          />
        </Reveal>
      </div>
    </div>
  );
}

export default function FeatureConsultCoach() {
  return (
    <section className="py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex justify-center">
            <SectionLabel index={COPY.consultCoach.sectionIndex}>
              {COPY.consultCoach.sectionLabel}
            </SectionLabel>
          </div>
        </Reveal>

        <div className="space-y-20 lg:space-y-28 mt-12">
          {COPY.consultCoach.stages.map((stage) => (
            <StageBlock key={stage.key} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
