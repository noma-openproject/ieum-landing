import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../primitives/Reveal";
import NoCopy from "../primitives/NoCopy";
import { PrimaryButton, SecondaryButton } from "../primitives/Button";
import SmartMock from "../primitives/SmartMock";
import MockHeroComposite from "../mocks/MockHeroComposite";
import {
  BRAND_BLUE,
  BRAND_BLUE_FAINT,
  CONTACT,
  ctaHref,
} from "../constants";
import { COPY } from "@/lib/copy";

/* ═══════════════════════════════════════════════════════════════════
   Hero — 상하 stack + 풀폭 dashboard (afterdoc.ai 톤 참고)
   ═══════════════════════════════════════════════════════════════════
   ▎layout
   ─────────────────────────────────────────────────────────────────
   1. 가운데 정렬 텍스트 (badge → h1 2줄 → sub + productName → CTA)
   2. 그 아래 풀폭 dashboard mock (4-column: 환자 / 메인 / 카톡 / 응급 케어)

   ▎fold 처리 (1280px viewport 기준)
   ─────────────────────────────────────────────────────────────────
   첫 화면에 텍스트+CTA + dashboard 첫 1/3 들어옴.
     · py 축소 (pt-14 pb-12)
     · h1 살짝 축소 (52px) + 2줄
     · sub + productName 컴팩트
   ═══════════════════════════════════════════════════════════════════ */

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경 도트 — 가운데 정렬 layout 에 맞춰 mask 중앙으로 */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 30%, black 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 pt-14 pb-12 lg:pt-20 lg:pb-16 relative">
        {/* ─── 1. 가운데 정렬 텍스트 영역 ─── */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-5"
              style={{
                backgroundColor: BRAND_BLUE_FAINT,
                color: BRAND_BLUE,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: BRAND_BLUE }}
              />
              {COPY.hero.badge}
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[36px] sm:text-[44px] lg:text-[52px] leading-[1.15] tracking-[-0.03em] font-extrabold text-slate-900">
              {COPY.hero.h1Lines.map((line, i) => (
                <React.Fragment key={i}>
                  {i === COPY.hero.h1HighlightLineIndex ? (
                    <span style={{ color: BRAND_BLUE }}>{line}</span>
                  ) : (
                    line
                  )}
                  {i < COPY.hero.h1Lines.length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <NoCopy>
              <p className="text-[16px] text-slate-600 leading-[1.7] whitespace-pre-line mt-6">
                {COPY.hero.sub}
              </p>
              <p className="mt-2 text-[16px] leading-[1.7]">
                <span className="font-semibold text-slate-800">
                  {COPY.hero.productName}
                </span>
              </p>
            </NoCopy>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              {CONTACT.showBrochureButton ? (
                <>
                  <PrimaryButton href={ctaHref(COPY.ctaSubject.brochure)}>
                    {COPY.hero.ctaSecondary}
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                  <SecondaryButton href={ctaHref(COPY.ctaSubject.demo)}>
                    {COPY.hero.ctaPrimary}
                  </SecondaryButton>
                </>
              ) : (
                <PrimaryButton href={ctaHref(COPY.ctaSubject.demo)}>
                  {COPY.hero.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              )}
            </div>
          </Reveal>
        </div>

        {/* ─── 2. 풀폭 dashboard mock ─── */}
        <div className="mt-10 lg:mt-12">
          <Reveal delay={160}>
            <div className="relative">
              {/* 부드러운 그라데이션 글로우 */}
              <div
                className="absolute -inset-8 rounded-3xl -z-10 blur-3xl opacity-25"
                style={{
                  background:
                    "linear-gradient(135deg, #1E6FD9 0%, #8FC2FF 100%)",
                }}
              />
              <SmartMock
                screenshot=""
                fallback={<MockHeroComposite />}
                alt={COPY.hero.mockAlt}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
