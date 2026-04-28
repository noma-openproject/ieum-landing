"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode } from "lucide-react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockReviewBuilder — 0.2 REVIEW BUILDER mock (Framer Motion 자동 재생)
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   상단:   5단계 stepper (시작 → 질문 → 말투 선택 → 편집 → 전달)
   중간:   환자분 유형 4 카드 (20대 여성/30대 직장인/40대 주부/30대 남성)
   하단:   QR + 환자 전달 링크 박스

   ▎시나리오 (총 ~6.5s 주기, 무한 반복)
   ─────────────────────────────────────────────────────────────────
   Step 1 (0~0.6s):     stepper [1] 활성, 카드 영역 빈 자리
   Step 2 (0.6~1.2s):   stepper [1,2] 활성
   Step 3 (1.2~2.4s):   stepper [1,2,3] 활성, 카드 4개 stagger 등장
   Step 4 (2.4~3.0s):   stepper [1,2,3,4] 활성, 1번 카드 강조 ring
   Step 5 (3.0~6.0s):   stepper 모두 활성, QR + 링크 박스 등장
   Reset (6.0~6.5s):    페이드아웃 → Step 1 복귀

   ▎이 mock 안의 카피를 수정하고 싶다면?
   ─────────────────────────────────────────────────────────────────
   이 mock의 텍스트는 lib/copy.ts 에 없습니다 — 데모용 가공 데이터.
     · stepper 단계 → STEPPER_LABELS 상수
     · 환자분 유형 카드 → PERSONAS 상수
     · QR 링크 / 채널 칩 → LINK_BAR 상수

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/FeatureReviewBuilder.tsx 의 SmartMock fallback.
   ═══════════════════════════════════════════════════════════════════ */

const STEPPER_LABELS = ["시작", "질문", "말투 선택", "편집", "전달"];

const PERSONAS = [
  {
    key: "20f",
    label: "20대 여성",
    tint: "#FEE2E2",
    color: "#DC2626",
    body: "다들 예뻐졌다고 ㅎㅎ 진짜 만족이에요~",
  },
  {
    key: "30w",
    label: "30대 직장인",
    tint: "#E0E7FF",
    color: "#4338CA",
    body: "처음엔 걱정했는데 잘한 선택이었어요.",
  },
  {
    key: "40f",
    label: "40대 주부",
    tint: "#FEF3C7",
    color: "#B45309",
    body: "원장님이 꼼꼼히 봐주셔서 넘 좋았어요~",
  },
  {
    key: "30m",
    label: "30대 남성",
    tint: "#DCFCE7",
    color: "#166534",
    body: "확실히 달라짐. 설명 잘 해줘서 믿고 맡김.",
  },
];

const LINK_BAR = {
  label: "환자 전달 링크",
  url: "ieum.co/r/RREQ-30FEF3DC…",
  channels: ["네이버 플레이스", "카카오맵", "강남언니"],
};

const DURATIONS = {
  step1: 500,
  step2: 500,
  step3: 1200,
  step4: 500,
  step5: 2800,
  reset: 500,
} as const;

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export default function MockReviewBuilder() {
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      const t1 = DURATIONS.step1;
      const t2 = t1 + DURATIONS.step2;
      const t3 = t2 + DURATIONS.step3;
      const t4 = t3 + DURATIONS.step4;
      const t5 = t4 + DURATIONS.step5;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(5), t4));
      timers.push(setTimeout(() => setStep(0), t5));
      timers.push(setTimeout(cycle, t5 + DURATIONS.reset));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const activeStepperCount = step === 0 ? 0 : step;
  const showPersonas = step >= 3 && step !== 0;
  const showHighlight = step >= 4 && step !== 0;
  const showLinkBar = step >= 5 && step !== 0;

  return (
    <WindowFrame title="이음 · 후기 만들기">
      {/* stepper — 3-state visual: completed(옅은 파랑), current(진한 파랑+scale), pending(회색) */}
      <div className="flex items-center gap-2 text-[11px] mb-5 flex-wrap">
        {STEPPER_LABELS.map((s, i) => {
          const isCurrent = i === activeStepperCount - 1 && step !== 0;
          const isCompleted = i < activeStepperCount - 1;
          return (
            <React.Fragment key={s}>
              <motion.span
                animate={{
                  backgroundColor: isCurrent
                    ? BRAND_BLUE
                    : isCompleted
                      ? BRAND_BLUE_FAINT
                      : "#F1F5F9",
                  color: isCurrent
                    ? "#FFFFFF"
                    : isCompleted
                      ? BRAND_BLUE
                      : "#94A3B8",
                  scale: isCurrent ? 1.08 : 1,
                }}
                transition={{ duration: 0.3 }}
                className="px-2 py-1 rounded-md font-medium"
              >
                {i + 1}. {s}
              </motion.span>
              {i < STEPPER_LABELS.length - 1 && (
                <span className="text-slate-300">—</span>
              )}
            </React.Fragment>
          );
        })}
      </div>

      <motion.div
        animate={{ opacity: step === 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 gap-2 mb-5 min-h-[170px]"
      >
        {PERSONAS.map((p, i) => (
          <div
            key={p.key}
            className="rounded-xl border p-3 text-xs relative overflow-hidden min-h-[78px]"
            style={{
              borderColor: showHighlight && i === 0 ? BRAND_BLUE : "#E2E8F0",
              boxShadow:
                showHighlight && i === 0
                  ? `0 0 0 3px ${BRAND_BLUE_FAINT}`
                  : "none",
              transition: "border-color 0.3s, box-shadow 0.3s",
            }}
          >
            <AnimatePresence mode="wait">
              {showPersonas ? (
                <motion.div
                  key="filled"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: i * 0.1,
                    ease: "easeOut",
                  }}
                >
                  <div
                    className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold mb-1.5"
                    style={{ backgroundColor: p.tint, color: p.color }}
                  >
                    {p.label}
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    {p.body}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-2"
                >
                  {/* placeholder height 를 실제 페르소나 카드와 일치 → layout shift 방지 */}
                  <div className="h-3.5 w-14 bg-slate-100 rounded animate-pulse" />
                  <div className="h-2 w-full bg-slate-100 rounded animate-pulse" />
                  <div className="h-2 w-3/4 bg-slate-100 rounded animate-pulse" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </motion.div>

      <div className="min-h-[80px]">
        <AnimatePresence mode="popLayout">
          {showLinkBar && (
            <motion.div
              key="linkbar"
              initial={{ opacity: 0, y: 16, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 rounded-xl border border-slate-200 p-3"
            >
              <div
                className="w-14 h-14 rounded-md flex-shrink-0 flex items-center justify-center"
                style={{ backgroundColor: BRAND_BLUE_FAINT }}
              >
                <QrCode className="w-7 h-7" style={{ color: BRAND_BLUE }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[11px] font-semibold text-slate-500 mb-0.5">
                  {LINK_BAR.label}
                </div>
                <div className="text-xs text-slate-700 truncate font-mono">
                  {LINK_BAR.url}
                </div>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {LINK_BAR.channels.map((c) => (
                    <span
                      key={c}
                      className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
}
