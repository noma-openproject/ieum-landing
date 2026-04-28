import React from "react";
import { Check } from "lucide-react";
import Reveal from "../primitives/Reveal";
import SectionLabel from "../primitives/SectionLabel";
import SmartMock from "../primitives/SmartMock";
import MockCareNote from "../mocks/MockCareNote";
import { BRAND_BLUE, BRAND_BLUE_FAINT, SCREENSHOTS } from "../constants";
import { COPY } from "@/lib/copy";

/* ═══════════════════════════════════════════════════════════════════
   FeatureCareNote — 0.3 CARE NOTE 섹션
   ═══════════════════════════════════════════════════════════════════
   layout: 가운데 정렬 카피(상) → 큰 dashboard mock(하) — 상하 stack.
   FeatureBlock(좌우 zigzag) 사용 안 함. afterdoc.ai 톤 참고.
   ═══════════════════════════════════════════════════════════════════ */

export default function FeatureCareNote() {
  return (
    <section className="py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        {/* ─── 1. 가운데 정렬 카피 영역 ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <div className="flex justify-center">
              <SectionLabel index={COPY.careNote.index}>
                {COPY.careNote.category}
              </SectionLabel>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.02em] font-extrabold text-slate-900">
              {COPY.careNote.title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < COPY.careNote.title.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="text-[16px] text-slate-600 leading-[1.7] mt-6 whitespace-pre-line">
              {COPY.careNote.description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 inline-flex flex-wrap gap-x-6 gap-y-3 justify-center">
              {COPY.careNote.bullets.map((b) => (
                <li key={b.text} className="flex items-center gap-2">
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
                    {b.text}
                    {b.status === "pilot" && (
                      <span
                        className="ml-2 text-xs italic"
                        style={{ color: "#6B7280" }}
                      >
                        · {COPY.shared.pilotBadge}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ─── 2. mock 영역 (상하 stack 의 아래쪽, 더 큰 사이즈) ─── */}
        <div className="mt-16 max-w-5xl mx-auto">
          <Reveal delay={100}>
            <SmartMock
              screenshot={SCREENSHOTS.careNote}
              fallback={<MockCareNote />}
              alt={COPY.careNote.mockAlt}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
