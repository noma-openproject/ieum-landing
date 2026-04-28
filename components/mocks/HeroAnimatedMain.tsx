"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   HeroAnimatedMain — Hero mock 메인 패널 5단계 자동 재생 애니메이션
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   환자 정보 헤더 (홍서연 + 동적 인디케이터) + 카드 영역(스켈레톤 ↔ 카드 3개)

   ▎무한 반복 시퀀스 (총 ~6.0초)
   ─────────────────────────────────────────────────────────────────
   Step 1 (0~1.5s):  amber dot 깜빡 + "상담 내용 분석 중..." + 스켈레톤
   Step 2 (1.5~2.0s): emerald dot + "정리 완료 08:23" + 1번 카드 fade-up
   Step 3 (2.0~2.5s): 2번 카드 fade-up + scale-up 강조 (1.05→1.0)
   Step 4 (2.5~5.5s): 3번 카드 fade-up + 3초 머무름
   Reset (5.5~6.0s):  전체 페이드아웃 → Step 1 복귀

   ▎카피 수정 위치
   ─────────────────────────────────────────────────────────────────
   카드 텍스트 → 아래 CARDS 상수
   인디케이터 텍스트 → Indicator 컴포넌트 안 텍스트
   타이밍 → STEP_DURATIONS 상수                                       */

type Step = 1 | 2 | 3 | 4 | 0; // 0: reset 페이드아웃 단계

const STEP_DURATIONS = {
  step1: 1500, // 분석 중
  step2: 500, // 1번 카드 등장 후 대기
  step3: 500, // 2번 카드 등장 후 대기
  step4: 3000, // 3번 카드 등장 후 머무름
  reset: 500, // 페이드아웃
} as const;

const CARDS = [
  {
    label: "환자분 핵심 요구",
    body: "다크서클·애교살 자연스럽게, 회복기간 최소화 원함.",
    tone: "neutral" as const,
  },
  {
    label: "권장 멘트",
    body: "“재배치로 하시면 꺼짐 없이 자연스럽게 마무리됩니다.”",
    tone: "brand" as const,
  },
  {
    label: "피해야 할 말",
    body: "타 병원 시술 결과와 직접 비교하는 표현은 삼가주세요.",
    tone: "danger" as const,
  },
];

export default function HeroAnimatedMain() {
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const cycle = () => {
      setStep(1);
      const t1 = STEP_DURATIONS.step1;
      const t2 = t1 + STEP_DURATIONS.step2;
      const t3 = t2 + STEP_DURATIONS.step3;
      const t4 = t3 + STEP_DURATIONS.step4;
      const tEnd = t4 + STEP_DURATIONS.reset;

      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(0), t4)); // reset 페이드아웃 시작
      timers.push(setTimeout(cycle, tEnd)); // 다음 cycle
    };

    cycle();

    return () => {
      timers.forEach(clearTimeout);
    };
  }, []);

  // 카드 가시성: card[i] 는 step ≥ i+2 일 때 보임
  // i=0 → step≥2, i=1 → step≥3, i=2 → step≥4. step=0(reset)이면 전부 hidden.
  const isCardVisible = (i: number) => step !== 0 && step >= i + 2;

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* 환자 헤더 + 동적 인디케이터 */}
      <div className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
        <div>
          <div className="text-[12px] font-semibold text-slate-900 leading-tight">
            홍서연
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5">
            눈밑지방재배치
          </div>
        </div>
        <Indicator step={step} />
      </div>

      {/* 카드 영역 (스켈레톤 ↔ 카드 3개) — fixed min-h 로 layout shift 방지 */}
      <div className="space-y-2 flex-1 min-h-[200px]">
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-2"
            >
              {[0, 1, 2].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {CARDS.map((card, i) =>
            isCardVisible(i) ? (
              <motion.div
                key={`card-${i}`}
                initial={{
                  opacity: 0,
                  y: 16,
                  scale: card.tone === "brand" ? 1.05 : 1,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: card.tone === "brand" ? 0.5 : 0.4,
                  ease: "easeOut",
                }}
              >
                <Card card={card} />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── 인디케이터 (step 1·0 → amber 분석 중, step 2~4 → emerald 정리 완료) ─── */
function Indicator({ step }: { step: Step }) {
  return (
    <AnimatePresence mode="wait">
      {step === 1 || step === 0 ? (
        <motion.div
          key="analyzing"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 0 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs font-medium text-amber-600"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          상담 내용 분석 중...
        </motion.div>
      ) : (
        <motion.div
          key="completed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs font-medium text-emerald-600"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          정리 완료 08:23
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── 스켈레톤 카드 (Step 1) — 실제 카드와 같은 height 로 layout shift 방지 ─── */
function SkeletonCard() {
  return (
    <div className="rounded-lg border border-slate-200 p-2.5 bg-slate-50/50 min-h-[58px]">
      <div className="h-2 w-20 bg-slate-200 rounded mb-2 animate-pulse" />
      <div className="h-2 w-full bg-slate-200/70 rounded mb-1.5 animate-pulse" />
      <div className="h-2 w-3/4 bg-slate-200/50 rounded animate-pulse" />
    </div>
  );
}

/* ─── 실제 카드 (Step 2~4) ─── */
type CardData = (typeof CARDS)[number];
function Card({ card }: { card: CardData }) {
  if (card.tone === "brand") {
    return (
      <div
        className="rounded-lg border p-2.5"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div
          className="text-[9px] font-semibold tracking-wider mb-1"
          style={{ color: BRAND_BLUE }}
        >
          {card.label}
        </div>
        <p className="text-[11px] text-slate-800 leading-snug">{card.body}</p>
      </div>
    );
  }
  if (card.tone === "danger") {
    return (
      <div className="rounded-lg border border-slate-200 p-2.5">
        <div className="text-[9px] font-semibold text-rose-500 tracking-wider mb-1">
          {card.label}
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">{card.body}</p>
      </div>
    );
  }
  return (
    <div className="rounded-lg border border-slate-200 p-2.5">
      <div className="text-[9px] font-semibold text-slate-400 tracking-wider mb-1">
        {card.label}
      </div>
      <p className="text-[11px] text-slate-700 leading-snug">{card.body}</p>
    </div>
  );
}
