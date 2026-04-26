import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../primitives/Reveal";
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

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경 도트 */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
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
            <h1 className="font-display text-[40px] sm:text-5xl lg:text-[56px] leading-[1.15] tracking-[-0.03em] font-extrabold text-slate-900">
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
            <p className="mt-7 text-[17px] text-slate-600 leading-[1.7] max-w-xl whitespace-pre-line">
              {COPY.hero.sub}
            </p>
            <p className="mt-4 text-[17px] leading-[1.7] max-w-xl">
              <span className="font-semibold text-slate-800">
                {COPY.hero.productName}
              </span>
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap gap-3">
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

        <div className="lg:col-span-5">
          <Reveal delay={160}>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl -z-10 blur-2xl opacity-30"
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
