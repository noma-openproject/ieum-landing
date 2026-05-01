"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Copy, NotebookPen } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockConsultCoach — 0.1 CONSULT COACH 2-column dashboard mock
   ═══════════════════════════════════════════════════════════════════
   ▎구성 (afterdoc 톤 — 좌측 환자 리스트 + 메인 stage cycle + 하단 KPI)
   ─────────────────────────────────────────────────────────────────
   • 윈도우 크롬 (이음 · 상담 코치 + 실시간 동기화 indicator)
   • 2-column flex (lg+):
       col 1: 진행 중 환자분 4명 (stage prop에 따라 active 변경)
       col 2: 메인 — 단계 탭 + Stage1/2/3 cycle + 하단 KPI bar

   ▎모바일 (lg 미만): col 1 hidden, 메인만 노출

   ▎stage prop (1·2·3) → 자동 재생 시나리오 + 사이드바 active 환자 + KPI 변경

   ▎이 mock 안의 카피 수정
   ─────────────────────────────────────────────────────────────────
     · 사이드바 → PATIENTS 상수
     · stage별 KPI → STAGE_KPI 상수
     · stage1 카드 (4개) → STAGE1_CARDS
     · stage2 흐름 stepper → STAGE2_STEPPER
     · stage2 필드 (6개) → STAGE2_FIELDS
     · stage2 인계 → STAGE2_HANDOVER
     · stage3 타임라인/스크립트 → STAGE3_TIMELINE / STAGE3_SCRIPT
     · 메인 환자 헤더 → PATIENT

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/FeatureConsultCoach.tsx 의 SmartMock fallback.
   ═══════════════════════════════════════════════════════════════════ */

type StageVariant = 1 | 2 | 3;

const TAB_LABELS: Record<StageVariant, string> = {
  1: "1차 온라인 상담",
  2: "2차 오프라인 현장",
  3: "3차 원장님 상담",
};

const TAB_ORDER: StageVariant[] = [1, 2, 3];

const PATIENT = {
  name: "홍서연",
  detail: "눈밑지방재배치",
};

/* ─── col 1 사이드바: 진행 중 환자 4명 (stage 매칭) ─── */
const PATIENTS: Array<{
  name: string;
  stage: StageVariant | null;
  chip: string;
  chipBg: string;
  chipFg: string;
  detail: string;
  time: string;
}> = [
  {
    name: "홍서연",
    stage: 1,
    chip: "1차",
    chipBg: "bg-amber-100",
    chipFg: "text-amber-800",
    detail: "눈밑지방재배치",
    time: "08:23",
  },
  {
    name: "김민지",
    stage: 2,
    chip: "2차",
    chipBg: "bg-blue-100",
    chipFg: "text-blue-800",
    detail: "코필러 현장",
    time: "10:15",
  },
  {
    name: "박지영",
    stage: 3,
    chip: "3차",
    chipBg: "bg-emerald-100",
    chipFg: "text-emerald-800",
    detail: "리프팅 진료",
    time: "14:00",
  },
  {
    name: "이지수",
    stage: null,
    chip: "케어",
    chipBg: "bg-violet-100",
    chipFg: "text-violet-800",
    detail: "윤곽주사 D+3",
    time: "어제",
  },
];

/* ─── 하단 KPI bar — stage별 다른 운영 라인 (right는 optional, stage 1에선 우측 비움) ─── */
const STAGE_KPI: Record<StageVariant, { left: string; right?: string }> = {
  1: { left: "상담 내용 정리 중 08:23 / 12:45" },
  2: { left: "내원 상담 준비 완료 03:42", right: "필드 6/6 자동 채움" },
  3: { left: "통합 타임라인 4 이력", right: "강조 포인트 1건" },
};

export default function MockConsultCoach({
  stage = 1,
}: {
  stage?: StageVariant;
} = {}) {
  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)]">
      {/* 윈도우 크롬 */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/60">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="ml-3 text-[11px] text-slate-400 font-medium">
          이음 · 상담 코치
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          실시간 동기화
        </div>
      </div>

      <div className="flex min-h-[460px]">
        <PatientSidebar activeStage={stage} />

        <main className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col">
          {/* 단계 탭 */}
          <div className="flex items-center gap-1 mb-4 border-b border-slate-100 pb-3 flex-wrap">
            {TAB_ORDER.map((s) => {
              const active = s === stage;
              return (
                <div
                  key={s}
                  className={
                    active
                      ? "px-3 py-1.5 rounded-md text-xs font-semibold"
                      : "px-3 py-1.5 text-xs text-slate-400"
                  }
                  style={
                    active
                      ? {
                          backgroundColor: BRAND_BLUE_FAINT,
                          color: BRAND_BLUE,
                        }
                      : {}
                  }
                >
                  {TAB_LABELS[s]}
                </div>
              );
            })}
          </div>

          {/* stage cycle 영역 — min-h-[880px]로 Stage 1 4 카드 + Stage 2 fields/guide/handover
              3카드 + Stage 3 timeline/briefing/photos/script-3step/buttons 모두 안전 마진 확보. */}
          <div className="min-h-[880px]">
            {stage === 1 && <Stage1Animated />}
            {stage === 2 && <Stage2Animated />}
            {stage === 3 && <Stage3Animated />}
          </div>

          {/* 하단 KPI bar (정적, stage별) */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-slate-500 font-medium truncate">
                {STAGE_KPI[stage].left}
              </span>
            </div>
            {STAGE_KPI[stage].right && (
              <div
                className="font-semibold shrink-0"
                style={{ color: BRAND_BLUE }}
              >
                {STAGE_KPI[stage].right}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

/* ─── col 1 사이드바 (lg+ only, 정적) ─── */
function PatientSidebar({ activeStage }: { activeStage: StageVariant }) {
  return (
    <aside className="hidden lg:flex w-[150px] shrink-0 border-r border-slate-100 bg-slate-50/40 flex-col">
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
          진행 중
        </div>
        <span className="text-[10px] font-semibold text-slate-500">
          {PATIENTS.length}
        </span>
      </div>
      <div className="flex-1 px-1.5 pb-3">
        {PATIENTS.map((p) => {
          const isActive = p.stage === activeStage;
          return (
            <div
              key={p.name}
              className={`relative rounded-lg px-2 py-2 mb-0.5 ${
                isActive ? "bg-white shadow-sm" : ""
              }`}
              style={
                isActive
                  ? {
                      boxShadow: `0 1px 3px rgba(15,23,42,0.05), 0 0 0 1.5px ${BRAND_BLUE}`,
                    }
                  : {}
              }
            >
              {isActive && (
                <span
                  className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r"
                  style={{ backgroundColor: BRAND_BLUE }}
                />
              )}
              <div className="flex items-center gap-1.5">
                <span
                  className={`text-[12px] truncate ${
                    isActive
                      ? "font-bold text-slate-900"
                      : "font-semibold text-slate-900"
                  }`}
                >
                  {p.name}
                </span>
                <span
                  className={`text-[8px] font-semibold px-1 py-0.5 rounded leading-none ${p.chipBg} ${p.chipFg}`}
                >
                  {p.chip}
                </span>
                <span className="ml-auto text-[9px] text-slate-400">
                  {p.time}
                </span>
              </div>
              <p className="mt-1 text-[10px] text-slate-500 truncate">
                {p.detail}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

/* ════════════════════════════════════════════════════════════
   Stage 1 — 1차 온라인 상담: 카드 4개 차례 등장 (스크립트 예시 포함)
   ════════════════════════════════════════════════════════════ */

const STAGE1_CARDS = [
  {
    label: "AI 핵심 니즈 요약",
    body: "다크서클과 애교살 개선을 원하지만, 회복기간과 자연스러운 결과를 가장 걱정하고 있어요.",
    tone: "neutral" as const,
  },
  {
    label: "AI 권장 상담 멘트",
    body: "“눈 밑이 자연스럽게 정리되는 방향을 원하시는 만큼, 회복기간과 기존 인상을 함께 고려해서 상담 도와드릴게요.”",
    tone: "brand" as const,
  },
  {
    label: "주의할 표현",
    body: "“무조건 자연스러워요”, “부작용 없어요”, “다른 병원보다 낫습니다”처럼 단정·보장·비교 표현은 피해주세요.",
    tone: "danger" as const,
  },
  {
    label: "상담 스크립트 예시",
    body: `“안녕하세요 ○○○님, 어제 카톡 주신 다크서클·애교살 라인 건이세요.”

“환자분께서 자연스러움하고 회복 기간 두 가지 모두 신경 쓰신다고 하셨는데, 재배치로 진행하시면 꺼짐 없이 부드럽게 마무리되고 5일 안에 출근 일정 맞추실 수 있어요.”

“일정 잡아드릴까요?”`,
    tone: "script" as const,
  },
];

const STAGE1_DURATIONS = {
  step1: 2000,
  step2: 850,
  step3: 850,
  step4: 850,
  step5: 4200,
  reset: 700,
} as const;

function Stage1Animated() {
  type Step = 0 | 1 | 2 | 3 | 4 | 5;
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      const t1 = STAGE1_DURATIONS.step1;
      const t2 = t1 + STAGE1_DURATIONS.step2;
      const t3 = t2 + STAGE1_DURATIONS.step3;
      const t4 = t3 + STAGE1_DURATIONS.step4;
      const t5 = t4 + STAGE1_DURATIONS.step5;
      const tEnd = t5 + STAGE1_DURATIONS.reset;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(5), t4));
      timers.push(setTimeout(() => setStep(0), t5));
      timers.push(setTimeout(cycle, tEnd));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isCardVisible = (i: number) => step !== 0 && step >= i + 2;

  return (
    <>
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            {PATIENT.name}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {PATIENT.detail}
          </div>
        </div>
        <Stage1Indicator step={step} />
      </div>

      <div className="space-y-4 min-h-[420px]">
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {[0, 1, 2].map((i) => (
                <SkeletonRow key={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {STAGE1_CARDS.map((card, i) =>
            isCardVisible(i) ? (
              <motion.div
                key={`s1-card-${i}`}
                initial={{
                  opacity: 0,
                  y: 16,
                  scale:
                    card.tone === "brand" || card.tone === "script" ? 1.04 : 1,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration:
                    card.tone === "brand" || card.tone === "script" ? 0.5 : 0.4,
                  ease: "easeOut",
                }}
              >
                <Stage1Card card={card} />
              </motion.div>
            ) : null,
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function Stage1Indicator({ step }: { step: 0 | 1 | 2 | 3 | 4 | 5 }) {
  return (
    <AnimatePresence mode="wait">
      {step === 1 || step === 0 ? (
        <motion.div
          key="analyzing"
          initial={{ opacity: 0 }}
          animate={{ opacity: step === 0 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-[12px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
          </span>
          AI 상담 가이드 생성 중
        </motion.div>
      ) : (
        <motion.div
          key="completed"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"
        >
          <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
          AI 상담 가이드 생성 완료
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function SkeletonRow() {
  return (
    <div className="rounded-xl border border-slate-200 p-3.5 bg-slate-50/50">
      <div className="h-2.5 w-24 bg-slate-200 rounded mb-2 animate-pulse" />
      <div className="h-2.5 w-full bg-slate-200/70 rounded animate-pulse" />
    </div>
  );
}

type Stage1CardData = (typeof STAGE1_CARDS)[number];
function Stage1Card({ card }: { card: Stage1CardData }) {
  if (card.tone === "brand") {
    return (
      <div
        className="rounded-xl border p-3.5"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div
          className="text-[11px] font-semibold tracking-wider mb-1.5"
          style={{ color: BRAND_BLUE }}
        >
          {card.label}
        </div>
        <p className="text-[13px] text-slate-800 leading-relaxed">
          {card.body}
        </p>
      </div>
    );
  }
  if (card.tone === "danger") {
    return (
      <div
        className="rounded-xl border p-3.5"
        style={{
          borderColor: "#FECACA",
          backgroundColor: "#FFF5F5",
        }}
      >
        <div className="text-[11px] font-semibold text-rose-600 tracking-wider mb-1.5">
          {card.label}
        </div>
        <p className="text-[13px] text-slate-700 leading-relaxed">
          {card.body}
        </p>
      </div>
    );
  }
  if (card.tone === "script") {
    return (
      <div
        className="rounded-xl border p-4"
        style={{
          borderColor: "#CBD5E1",
          backgroundColor: "#FFFFFF",
          boxShadow: "0 4px 12px -4px rgba(15,23,42,0.08)",
        }}
      >
        <div className="flex items-center gap-1.5 mb-2">
          <span
            className="text-[11px] font-semibold tracking-wider"
            style={{ color: BRAND_BLUE }}
          >
            {card.label}
          </span>
          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
            대화체
          </span>
        </div>
        <p className="text-[13px] text-slate-800 leading-[1.7] whitespace-pre-line">
          {card.body}
        </p>
      </div>
    );
  }
  return (
    <div className="rounded-xl border border-slate-200 p-3.5">
      <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-1.5">
        {card.label}
      </div>
      <p className="text-[13px] text-slate-700 leading-relaxed">{card.body}</p>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   Stage 2 — 2차 현장: 4-step 흐름 stepper + 6 필드 차례 채워짐 + 인계 박스
   ════════════════════════════════════════════════════════════ */

/* 정적 stepper — cycle 안 돌지 않음 (흔들림 0). "1차→현장→차트→원장님" 흐름 시각화. */
const STAGE2_STEPPER: Array<{
  label: string;
  state: "done" | "active" | "pending";
}> = [
  { label: "1차 인계", state: "done" },
  { label: "현장 설문", state: "active" },
  { label: "차트 반영", state: "pending" },
  { label: "원장님 인계", state: "pending" },
];

const STAGE2_FIELDS = [
  { label: "방문 목적", value: "눈 밑 다크서클·애교살 라인 개선" },
  { label: "방문 경로", value: "지인 추천 후 카카오톡 문의" },
  { label: "가장 큰 걱정", value: "출근 전까지 붓기와 멍이 빠질지" },
  { label: "예산 범위", value: "200만 원 이내" },
  { label: "시술 이력", value: "타원 보톡스 1회" },
  { label: "결정 우선순위", value: "자연스러움 > 회복기간 > 비용" },
];

const STAGE2_HANDOVER = {
  label: "원장님 인계 브리핑",
  body: `자연스러운 변화를 원하고,
출근 일정 때문에 회복기간에 민감한 환자분입니다.
상담 시 회복 일정과 유사 케이스를 먼저 설명해주시면 좋습니다.`,
};

const STAGE2_GUIDE = {
  label: "현장 확인 질문",
  items: [
    {
      title: "Q1. 일정 확인",
      body: `“회복기간이 가장 걱정되신다고 하셨는데,
혹시 꼭 피해야 하는 일정이 있으실까요?”`,
    },
    {
      title: "Q2. 기대 결과 확인",
      body: `“자연스러운 변화를 원하신다고 하셔서,
지금 가장 원하시는 느낌을 먼저 같이 확인해볼게요.”`,
    },
    {
      title: "Q3. 원장님 상담 전 정리",
      body: `“회복기간, 예산, 결과 느낌 중
가장 중요하게 보시는 부분을 먼저 정리해드릴게요.”`,
    },
  ],
};

const STAGE2_DURATIONS = {
  step1: 1700,
  field: 750,
  guide: 1500,
  handover: 2700,
  reset: 700,
} as const;

function Stage2Animated() {
  type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      const t1 = STAGE2_DURATIONS.step1;
      const t2 = t1 + STAGE2_DURATIONS.field;
      const t3 = t2 + STAGE2_DURATIONS.field;
      const t4 = t3 + STAGE2_DURATIONS.field;
      const t5 = t4 + STAGE2_DURATIONS.field;
      const t6 = t5 + STAGE2_DURATIONS.field;
      const t7 = t6 + STAGE2_DURATIONS.field;
      const t8 = t7 + STAGE2_DURATIONS.guide;
      const t9 = t8 + STAGE2_DURATIONS.handover;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(5), t4));
      timers.push(setTimeout(() => setStep(6), t5));
      timers.push(setTimeout(() => setStep(7), t6));
      timers.push(setTimeout(() => setStep(8), t7));
      timers.push(setTimeout(() => setStep(9), t8));
      timers.push(setTimeout(() => setStep(0), t9));
      timers.push(setTimeout(cycle, t9 + STAGE2_DURATIONS.reset));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isFieldFilled = (i: number) => step !== 0 && step >= i + 2;
  const isGuideVisible = step >= 8 && step !== 0;
  const isHandoverVisible = step >= 9 && step !== 0;

  return (
    <>
      {/* NEW: 4-step 흐름 stepper (정적) */}
      <div className="flex items-center gap-1.5 text-[10px] mb-4 flex-wrap">
        {STAGE2_STEPPER.map((s, i) => (
          <React.Fragment key={s.label}>
            <span
              className="px-2 py-0.5 rounded font-medium"
              style={
                s.state === "active"
                  ? { backgroundColor: BRAND_BLUE, color: "#FFFFFF" }
                  : s.state === "done"
                    ? { backgroundColor: BRAND_BLUE_FAINT, color: BRAND_BLUE }
                    : { backgroundColor: "#F1F5F9", color: "#94A3B8" }
              }
            >
              {i + 1}. {s.label}
            </span>
            {i < STAGE2_STEPPER.length - 1 && (
              <span className="text-slate-300">—</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            {PATIENT.name}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {PATIENT.detail}
          </div>
        </div>
        <motion.div
          animate={{ opacity: step === 0 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs font-medium text-emerald-600"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          내원 상담 준비 완료 03:42
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: step === 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 min-h-[520px]"
      >
        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          <div className="px-3.5 py-2 bg-slate-50/70 text-[10px] font-semibold text-slate-500 tracking-wider">
            방문 정보 요약
          </div>
          {STAGE2_FIELDS.map((f, i) => {
            const isPriority = f.label === "가장 큰 걱정" || f.label === "결정 우선순위";
            return (
              <div
                key={f.label}
                className="flex items-start gap-3 px-3.5 py-2.5"
              >
                <div
                  className={`text-[11px] tracking-wider w-[68px] shrink-0 pt-[2px] ${
                    isPriority
                      ? "font-bold text-slate-600"
                      : "font-semibold text-slate-400"
                  }`}
                >
                  {f.label}
                </div>
                <div className="flex-1 min-h-[18px]">
                  <AnimatePresence mode="wait">
                    {isFieldFilled(i) ? (
                      <motion.span
                        key="filled"
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className={`text-[13px] leading-snug block ${
                          isPriority
                            ? "font-semibold text-slate-900"
                            : "text-slate-700"
                        }`}
                      >
                        {f.value}
                      </motion.span>
                    ) : (
                      <motion.span
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="block h-2 w-2/3 bg-slate-100 rounded animate-pulse mt-1.5"
                      />
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>

        <div className="min-h-[230px]">
          <AnimatePresence>
            {isGuideVisible && (
              <motion.div
                key="guide"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="rounded-xl border p-3.5"
                style={{
                  borderColor: BRAND_BLUE_FAINT,
                  backgroundColor: "#F8FBFF",
                }}
              >
                <div
                  className="text-[11px] font-semibold tracking-wider mb-2"
                  style={{ color: BRAND_BLUE }}
                >
                  {STAGE2_GUIDE.label}
                </div>
                <ul className="space-y-2.5">
                  {STAGE2_GUIDE.items.map((item, i) => (
                    <li key={i} className="leading-snug">
                      <div
                        className="text-[11.5px] font-bold mb-0.5"
                        style={{ color: BRAND_BLUE }}
                      >
                        {item.title}
                      </div>
                      <p className="text-[12px] text-slate-700 leading-[1.6] whitespace-pre-line">
                        {item.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="min-h-[100px]">
          <AnimatePresence>
            {isHandoverVisible && (
              <motion.div
                key="handover"
                initial={{ opacity: 0, y: 16, scale: 1.03 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-xl border p-3.5 bg-white"
                style={{ borderColor: "#CBD5E1" }}
              >
                <div className="text-[11px] font-semibold tracking-wider mb-1.5 text-slate-500">
                  {STAGE2_HANDOVER.label}
                </div>
                <p className="text-[13px] text-slate-800 leading-relaxed">
                  {STAGE2_HANDOVER.body}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   Stage 3 — 3차 진료실: 9-step 흐름
   상담 흐름 요약 → 브리핑 → 사진 비교 → 스크립트 3-step → 액션 버튼
   ════════════════════════════════════════════════════════════ */

const STAGE3_TIMELINE = [
  { date: "3/1", channel: "카톡", note: "다크서클·애교살 상담 문의", highlight: false },
  { date: "3/2", channel: "통화", note: "회복기간 문의 · 1차 응대", highlight: false },
  { date: "3/5", channel: "현장", note: "눈밑재배치 방향 상담", highlight: true },
  { date: "오늘", channel: "진료", note: "원장님 상담 예정", highlight: false },
];

const STAGE3_BRIEFING = {
  label: "오늘 상담 브리핑",
  lines: [
    "가장 큰 걱정은 출근 전까지 붓기와 멍이 빠질지입니다.",
    "자연스러운 변화는 기본이고,",
    "회복 일정과 유사 케이스를 먼저 보여주는 것이 중요합니다.",
  ],
};

const STAGE3_SCRIPT_STEPS = [
  {
    title: "공감으로 시작",
    body: `“카톡으로 다크서클과 애교살 라인 고민을 남겨주셨고,
5일 안에 출근하셔야 한다는 점도 확인했습니다.”`,
  },
  {
    title: "사진 비교로 설명",
    body: `“왼쪽은 원하시는 자연스러운 눈 밑 라인이고,
오른쪽은 비슷한 고민을 가진 환자분의 재배치 케이스입니다.”`,
  },
  {
    title: "회복 일정 안내",
    body: `“오늘은 이 정도 변화가 가능한지와
출근 일정에 맞춘 회복 계획을 함께 설명드리겠습니다.”`,
  },
];

const STAGE3_PHOTOS = [
  {
    label: "환자 희망 결과",
    caption: "자연스럽게 정리된 눈 밑 라인",
    sub: "과한 변화 없이 인상 유지",
    tone: "patient" as const,
  },
  {
    label: "원장님 추천 케이스",
    caption: "유사 고민 환자 · 눈밑재배치",
    sub: "5일 회복 일정 고려 케이스",
    tone: "doctor" as const,
  },
];

const STAGE3_DURATIONS = {
  initial: 700,
  timeline: 1700,
  briefing: 1700,
  patientPhoto: 1300,
  doctorPhoto: 1700,
  scriptGen: 1500,
  scriptItem: 1300,
  hold: 3500,
  reset: 800,
} as const;

/* ─── 눈 밑 일러스트 — public/illustrations/ PNG 사용.
   patient = 피치 배경 / doctor = 블루 배경 + 점선 마킹. */
function EyeAreaIllustration({ tone }: { tone: "patient" | "doctor" }) {
  const src =
    tone === "doctor"
      ? "/illustrations/eye-doctor.png"
      : "/illustrations/eye-patient.png";
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 w-full h-full object-cover"
      draggable={false}
    />
  );
}

function Stage3Animated() {
  type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      const t1 = STAGE3_DURATIONS.initial;
      const t2 = t1 + STAGE3_DURATIONS.timeline;
      const t3 = t2 + STAGE3_DURATIONS.briefing;
      const t4 = t3 + STAGE3_DURATIONS.patientPhoto;
      const t5 = t4 + STAGE3_DURATIONS.doctorPhoto;
      const t6 = t5 + STAGE3_DURATIONS.scriptGen;
      const t7 = t6 + STAGE3_DURATIONS.scriptItem;
      const t8 = t7 + STAGE3_DURATIONS.scriptItem;
      const t9 = t8 + STAGE3_DURATIONS.hold;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(5), t4));
      timers.push(setTimeout(() => setStep(6), t5));
      timers.push(setTimeout(() => setStep(7), t6));
      timers.push(setTimeout(() => setStep(8), t7));
      timers.push(setTimeout(() => setStep(9), t8));
      timers.push(setTimeout(() => setStep(0), t9));
      timers.push(setTimeout(cycle, t9 + STAGE3_DURATIONS.reset));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const visible = step !== 0;
  const isTimelineVisible = visible && step >= 2;
  const isBriefingVisible = visible && step >= 3;
  const isPatientPhotoVisible = visible && step >= 4;
  const isDoctorPhotoVisible = visible && step >= 5;
  const isCompareVisible = visible && step >= 5;
  const isScriptBoxVisible = visible && step >= 6;
  const isScriptGenerating = step === 6;
  const isScriptItemVisible = (i: number) => visible && step >= 7 + i;
  const areButtonsVisible = visible && step >= 9;
  const isReady = step >= 9;

  return (
    <>
      {/* 헤더: 환자 + 브리핑 상태 배지 */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 mb-3">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            {PATIENT.name}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {PATIENT.detail}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {isReady ? (
            <motion.div
              key="ready"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full"
            >
              <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
              브리핑 준비 완료
            </motion.div>
          ) : (
            <motion.div
              key="prep"
              initial={{ opacity: 0 }}
              animate={{ opacity: visible ? 1 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-1.5 text-[12px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-full"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
              </span>
              브리핑 준비 중
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ① 상담 흐름 요약 */}
      <div className="min-h-[148px] mb-3">
        <AnimatePresence>
          {isTimelineVisible && (
            <motion.div
              key="timeline"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-xl border border-slate-200 p-3"
            >
              <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-2">
                상담 흐름 요약
              </div>
              <div className="relative pl-3.5 space-y-1.5">
                <div className="absolute left-[5px] top-1 bottom-1 w-px bg-slate-200" />
                {STAGE3_TIMELINE.map((t) => (
                  <div
                    key={t.date + t.channel}
                    className="relative flex items-baseline gap-2"
                  >
                    <span
                      className="absolute -left-[10px] top-1.5 w-2 h-2 rounded-full"
                      style={{
                        backgroundColor: t.highlight ? BRAND_BLUE : "#94A3B8",
                      }}
                    />
                    <span className="text-[11px] font-semibold text-slate-500 w-7 shrink-0">
                      {t.date}
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {t.channel}
                    </span>
                    <span
                      className={`text-[12px] leading-snug ${
                        t.highlight
                          ? "font-semibold text-slate-900"
                          : "text-slate-600"
                      }`}
                    >
                      {t.note}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ② 오늘 상담 브리핑 */}
      <div className="min-h-[110px] mb-3">
        <AnimatePresence>
          {isBriefingVisible && (
            <motion.div
              key="briefing"
              initial={{ opacity: 0, y: 10, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-xl border p-3.5"
              style={{
                borderColor: BRAND_BLUE_FAINT,
                backgroundColor: "#F8FBFF",
              }}
            >
              <div
                className="text-[11px] font-semibold tracking-wider mb-1.5"
                style={{ color: BRAND_BLUE }}
              >
                {STAGE3_BRIEFING.label}
              </div>
              <div className="space-y-0.5">
                {STAGE3_BRIEFING.lines.map((line, i) => (
                  <p
                    key={i}
                    className={`text-[12.5px] leading-[1.7] ${
                      i === 0
                        ? "font-semibold text-slate-900"
                        : "text-slate-700"
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ③④⑤⑥ 사진 비교: 환자 희망(좌) ↔ 원장님 추천(우) */}
      <div className="relative grid grid-cols-2 gap-2 mb-3 min-h-[180px]">
        {STAGE3_PHOTOS.map((p, idx) => {
          const photoVisible =
            idx === 0 ? isPatientPhotoVisible : isDoctorPhotoVisible;
          if (!photoVisible) {
            return (
              <div
                key={p.label}
                className="rounded-xl border border-dashed border-slate-200 bg-slate-50/40"
              />
            );
          }
          return (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, x: idx === 0 ? -10 : 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-xl border p-2.5"
              style={{
                borderColor:
                  p.tone === "doctor" ? BRAND_BLUE_FAINT : "#E2E8F0",
                backgroundColor:
                  p.tone === "doctor" ? "#F8FBFF" : "#FAFBFC",
              }}
            >
              <div
                className="relative aspect-[4/3] rounded-lg overflow-hidden mb-2"
                style={{
                  backgroundColor:
                    p.tone === "doctor" ? "#EFF5FF" : "#FDF2F0",
                }}
              >
                <EyeAreaIllustration tone={p.tone} />
                {p.tone === "doctor" && (
                  <span
                    className="absolute top-1.5 right-1.5 inline-flex items-center gap-0.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full text-white"
                    style={{ backgroundColor: BRAND_BLUE }}
                  >
                    <Check className="w-2.5 h-2.5" strokeWidth={3.5} />
                    추천
                  </span>
                )}
                {p.tone === "patient" && (
                  <span className="absolute top-1.5 right-1.5 text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-white/90 text-slate-600 border border-slate-200">
                    희망
                  </span>
                )}
              </div>
              <div
                className="text-[10px] font-semibold tracking-wider mb-1"
                style={{
                  color: p.tone === "doctor" ? BRAND_BLUE : "#64748B",
                }}
              >
                {p.label}
              </div>
              <p className="text-[11px] font-medium text-slate-700 leading-snug">
                {p.caption}
              </p>
              <p className="text-[10px] text-slate-500 leading-snug mt-0.5">
                {p.sub}
              </p>
            </motion.div>
          );
        })}
        {/* 비교 인디케이터 — 두 사진 사이 가운데 */}
        <AnimatePresence>
          {isCompareVisible && (
            <motion.div
              key="compare"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut", delay: 0.15 }}
              className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 z-10 px-2 py-1 rounded-full text-[10px] font-bold text-white pointer-events-none whitespace-nowrap"
              style={{
                backgroundColor: BRAND_BLUE,
                boxShadow: `0 0 0 4px #FFFFFF`,
              }}
            >
              ↔ 비교
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ⑦⑧⑨ 원장님 상담 스크립트 — 1·2·3 차례 등장 + 액션 버튼 */}
      <div className="min-h-[280px]">
        <AnimatePresence>
          {isScriptBoxVisible && (
            <motion.div
              key="script-box"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="rounded-xl border p-3.5"
              style={{
                borderColor: BRAND_BLUE,
                backgroundColor: "#FFFFFF",
                boxShadow: `0 4px 14px -4px ${BRAND_BLUE_FAINT}, 0 0 0 1px ${BRAND_BLUE_FAINT}`,
              }}
            >
              <div className="flex items-center gap-1.5 mb-2.5">
                <span
                  className="text-[11px] font-bold tracking-wider"
                  style={{ color: BRAND_BLUE }}
                >
                  원장님 상담 스크립트
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
                  1·2차 상담 기반
                </span>
                {isScriptGenerating && (
                  <span className="ml-auto flex items-center gap-1.5 text-[10.5px] font-semibold text-slate-500">
                    <span className="relative flex h-1.5 w-1.5">
                      <span
                        className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                        style={{ backgroundColor: BRAND_BLUE }}
                      />
                      <span
                        className="relative inline-flex h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: BRAND_BLUE }}
                      />
                    </span>
                    생성 중
                  </span>
                )}
              </div>
              <div className="space-y-2.5">
                {STAGE3_SCRIPT_STEPS.map((s, i) => (
                  <ScriptItem
                    key={i}
                    idx={i + 1}
                    title={s.title}
                    body={s.body}
                    visible={isScriptItemVisible(i)}
                    pending={isScriptGenerating && !isScriptItemVisible(i)}
                  />
                ))}
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 min-h-[36px]">
                <AnimatePresence>
                  {areButtonsVisible && (
                    <motion.div
                      key="buttons"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                      className="flex items-center gap-2"
                    >
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-md text-white"
                        style={{ backgroundColor: BRAND_BLUE }}
                      >
                        <Copy className="w-3 h-3" strokeWidth={2.5} />
                        스크립트 복사
                      </button>
                      <button
                        type="button"
                        className="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-md border text-slate-700 bg-white"
                        style={{ borderColor: "#CBD5E1" }}
                      >
                        <NotebookPen className="w-3 h-3" strokeWidth={2.5} />
                        진료 메모에 추가
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

function ScriptItem({
  idx,
  title,
  body,
  visible,
  pending,
}: {
  idx: number;
  title: string;
  body: string;
  visible: boolean;
  pending: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 min-h-[58px]">
      <span
        className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-bold mt-0.5"
        style={{
          backgroundColor: visible ? BRAND_BLUE : "#E2E8F0",
          color: visible ? "#FFFFFF" : "#94A3B8",
          transition: "background-color 0.3s, color 0.3s",
        }}
      >
        {idx}
      </span>
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {visible ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <div className="text-[11.5px] font-bold text-slate-900 mb-0.5">
                {title}
              </div>
              <p className="text-[12px] text-slate-700 leading-[1.6] whitespace-pre-line">
                {body}
              </p>
            </motion.div>
          ) : pending ? (
            <motion.div
              key="pending"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1.5 pt-1"
            >
              <div className="h-2 w-1/3 bg-slate-200 rounded animate-pulse" />
              <div className="h-2 w-full bg-slate-100 rounded animate-pulse" />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}
