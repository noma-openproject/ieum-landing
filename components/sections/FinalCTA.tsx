import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { PrimaryButton, SecondaryButton } from "../primitives/Button";
import { BRAND_BLUE, CONTACT, ctaHref } from "../constants";

export default function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 border-t border-slate-100">
      {/* 그라디언트 배경 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #E8F1FC 0%, #F8FBFF 50%, #EEF4FC 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #C7D8EF 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-[42px] leading-[1.2] tracking-[-0.02em] font-extrabold text-slate-900">
            실장이 바뀌어도,
            <br />
            <span style={{ color: BRAND_BLUE }}>
              환자분 경험은 바뀌지 않는 병원으로
            </span>
            <br />
            만들어드릴게요
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 text-slate-600 text-[15px]">
            {CONTACT.showBrochureButton
              ? "상품 소개서와 데모를 준비해 드릴게요."
              : "바로 보여드릴게요."}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {CONTACT.showBrochureButton ? (
              <>
                <PrimaryButton href={ctaHref("이음 상품 소개서 요청")}>
                  상품 소개서 받아보기
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
                <SecondaryButton href={ctaHref("이음 데모 신청")}>
                  데모 신청하기
                </SecondaryButton>
              </>
            ) : (
              <PrimaryButton href={ctaHref("이음 데모 신청")}>
                데모 신청하기
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
