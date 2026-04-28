"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
     · stage1 카드 → STAGE1_CARDS
     · stage2 필드/인계 → STAGE2_FIELDS / STAGE2_HANDOVER
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

/* ─── 하단 KPI bar — stage별 다른 운영 라인 ─── */
const STAGE_KPI: Record<StageVariant, { left: string; right: string }> = {
  1: { left: "통화 녹취 08:23 / 12:45", right: "응대 만족도 ↑ 23%" },
  2: { left: "현장 정리 03:42", right: "필드 4/4 자동 채움" },
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

      <div className="flex">
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

          {/* stage cycle 영역 */}
          <div className="flex-1 min-h-0">
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
            <div
              className="font-semibold shrink-0"
              style={{ color: BRAND_BLUE }}
            >
              {STAGE_KPI[stage].right}
            </div>
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
              className={`rounded-lg px-2 py-2 mb-0.5 ${
                isActive ? "bg-white shadow-sm ring-1 ring-slate-200" : ""
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-slate-900 truncate">
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
   Stage 1 — 1차 온라인 상담: 카드 3개 차례 등장
   ════════════════════════════════════════════════════════════ */

const STAGE1_CARDS = [
  {
    label: "환자분 핵심 요구",
    body: "다크서클·애교살 라인 자연스럽게, 회복 기간 최소화를 원함.",
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

const STAGE1_DURATIONS = {
  step1: 1500,
  step2: 500,
  step3: 500,
  step4: 3000,
  reset: 500,
} as const;

function Stage1Animated() {
  type Step = 0 | 1 | 2 | 3 | 4;
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      const t1 = STAGE1_DURATIONS.step1;
      const t2 = t1 + STAGE1_DURATIONS.step2;
      const t3 = t2 + STAGE1_DURATIONS.step3;
      const t4 = t3 + STAGE1_DURATIONS.step4;
      const tEnd = t4 + STAGE1_DURATIONS.reset;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(0), t4));
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

      <div className="space-y-3 min-h-[220px]">
        <AnimatePresence>
          {step === 1 && (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
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
                  scale: card.tone === "brand" ? 1.05 : 1,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: card.tone === "brand" ? 0.5 : 0.4,
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

function Stage1Indicator({ step }: { step: 0 | 1 | 2 | 3 | 4 }) {
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
          정리 중 08:23
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
      <div className="rounded-xl border border-slate-200 p-3.5">
        <div className="text-[11px] font-semibold text-rose-500 tracking-wider mb-1.5">
          {card.label}
        </div>
        <p className="text-[13px] text-slate-600 leading-relaxed">
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
   Stage 2 — 2차 현장: 4 필드 차례 채워짐 + 인계 박스
   ════════════════════════════════════════════════════════════ */

const STAGE2_FIELDS = [
  { label: "방문 목적", value: "다크서클 + 애교살 라인 정리" },
  { label: "가장 큰 걱정", value: "회복 기간 (5일 안에 출근 복귀)" },
  { label: "예산 범위", value: "200만 원 이내" },
  { label: "결정 우선순위", value: "자연스러움 > 빠른 회복" },
];

const STAGE2_HANDOVER = {
  label: "원장님 인계 한 줄 요약",
  body: "자연스러움과 빠른 회복 두 가지 모두 중요. 재배치 추천 시 회복 일정 먼저 안내해 주세요.",
};

const STAGE2_DURATIONS = {
  step1: 1200,
  field: 600,
  handover: 1700,
  reset: 500,
} as const;

function Stage2Animated() {
  type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;
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
      const t6 = t5 + STAGE2_DURATIONS.handover;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(5), t4));
      timers.push(setTimeout(() => setStep(6), t5));
      timers.push(setTimeout(() => setStep(0), t6));
      timers.push(setTimeout(cycle, t6 + STAGE2_DURATIONS.reset));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isFieldFilled = (i: number) => step !== 0 && step >= i + 2;
  const isHandoverVisible = step >= 6 && step !== 0;

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
        <motion.div
          animate={{ opacity: step === 0 ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-2 text-xs font-medium text-emerald-600"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          현장 정리 03:42
        </motion.div>
      </div>

      <motion.div
        animate={{ opacity: step === 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 min-h-[260px]"
      >
        <div className="rounded-xl border border-slate-200 divide-y divide-slate-100 overflow-hidden">
          {STAGE2_FIELDS.map((f, i) => (
            <div key={f.label} className="flex items-start gap-3 px-3.5 py-2.5">
              <div className="text-[11px] font-semibold text-slate-400 tracking-wider w-[68px] shrink-0 pt-[2px]">
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
                      className="text-[13px] text-slate-700 leading-snug block"
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
          ))}
        </div>

        <AnimatePresence>
          {isHandoverVisible && (
            <motion.div
              key="handover"
              initial={{ opacity: 0, y: 16, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
                {STAGE2_HANDOVER.label}
              </div>
              <p className="text-[13px] text-slate-800 leading-relaxed">
                {STAGE2_HANDOVER.body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}

/* ════════════════════════════════════════════════════════════
   Stage 3 — 3차 진료실: 타임라인 dot 차례 켜짐 + 진료 스크립트
   ════════════════════════════════════════════════════════════ */

const STAGE3_TIMELINE = [
  { date: "3/1", channel: "카톡", note: "다크서클 상담 문의", highlight: false },
  {
    date: "3/2",
    channel: "통화",
    note: "1차 응대 · 시술 종류 안내 (08:23)",
    highlight: false,
  },
  {
    date: "3/5",
    channel: "현장",
    note: "2차 상담 · 재배치 방향 결정",
    highlight: true,
  },
  { date: "오늘", channel: "진료", note: "원장님 상담 예정", highlight: false },
];

const STAGE3_SCRIPT = {
  label: "오늘 강조하실 포인트",
  body: "회복 5일 안에 출근하셔야 한다는 점이 가장 큰 걱정. 자연스러움은 기본이고, 일정부터 안심시켜드리는 게 핵심이에요.",
};

const STAGE3_DURATIONS = {
  step1: 1000,
  dot: 400,
  script: 2900,
  reset: 500,
} as const;

function Stage3Animated() {
  type Step = 0 | 1 | 2 | 3 | 4 | 5 | 6;
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      const t1 = STAGE3_DURATIONS.step1;
      const t2 = t1 + STAGE3_DURATIONS.dot;
      const t3 = t2 + STAGE3_DURATIONS.dot;
      const t4 = t3 + STAGE3_DURATIONS.dot;
      const t5 = t4 + STAGE3_DURATIONS.dot;
      const t6 = t5 + STAGE3_DURATIONS.script;
      timers.push(setTimeout(() => setStep(2), t1));
      timers.push(setTimeout(() => setStep(3), t2));
      timers.push(setTimeout(() => setStep(4), t3));
      timers.push(setTimeout(() => setStep(5), t4));
      timers.push(setTimeout(() => setStep(6), t5));
      timers.push(setTimeout(() => setStep(0), t6));
      timers.push(setTimeout(cycle, t6 + STAGE3_DURATIONS.reset));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isDotActive = (i: number) => step !== 0 && step >= i + 2;
  const isScriptVisible = step >= 6 && step !== 0;

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
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="w-2 h-2 rounded-full bg-slate-400" />
          진료실 입실 직전
        </div>
      </div>

      <motion.div
        animate={{ opacity: step === 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="space-y-3 min-h-[260px]"
      >
        <div className="rounded-xl border border-slate-200 p-3">
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-2">
            환자분 통합 타임라인
          </div>
          <div className="relative pl-3.5 space-y-2">
            <div className="absolute left-[5px] top-1 bottom-1 w-px bg-slate-200" />
            {STAGE3_TIMELINE.map((t, i) => {
              const active = isDotActive(i);
              return (
                <div key={t.date + t.channel} className="relative">
                  <motion.span
                    className="absolute -left-[10px] top-1.5 w-2 h-2 rounded-full"
                    initial={false}
                    animate={{
                      backgroundColor: active
                        ? t.highlight
                          ? BRAND_BLUE
                          : "#64748B"
                        : "#E2E8F0",
                      scale: active && t.highlight ? 1.3 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.div
                    initial={false}
                    animate={{
                      opacity: active ? 1 : 0.35,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-[11px] font-semibold text-slate-500 w-7 shrink-0">
                      {t.date}
                    </span>
                    <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {t.channel}
                    </span>
                    <span
                      className={`text-[12px] leading-snug ${
                        t.highlight && active
                          ? "font-semibold text-slate-900"
                          : "text-slate-600"
                      }`}
                    >
                      {t.note}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <AnimatePresence>
          {isScriptVisible && (
            <motion.div
              key="script"
              initial={{ opacity: 0, y: 16, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
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
                {STAGE3_SCRIPT.label}
              </div>
              <p className="text-[13px] text-slate-800 leading-relaxed">
                {STAGE3_SCRIPT.body}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
