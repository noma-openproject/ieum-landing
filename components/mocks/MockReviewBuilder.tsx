"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockReviewBuilder — 0.2 REVIEW BUILDER 3-column dashboard mock
   ═══════════════════════════════════════════════════════════════════
   ▎구성 (afterdoc 톤 — multi-area dashboard)
   ─────────────────────────────────────────────────────────────────
   • 윈도우 크롬 (이음 · 후기 만들기 + 실시간 동기화 indicator)
   • 3-column flex (lg+):
       col 1: 후기 대기 환자분 4명 (작성중/대기/완료 chip + 시간)
       col 2: 메인 — stepper 5단계 + 페르소나 4 카드 cycle (기존)
       col 3: 우측 — QR + 환자 전달 링크 + 채널별 발송 통계 + 주간 KPI

   ▎모바일 (lg 미만): col 1·3 hidden, 메인만 노출

   ▎이 mock 안의 카피 수정
   ─────────────────────────────────────────────────────────────────
     · 사이드바 → REVIEW_PATIENTS 상수
     · stepper 단계 → STEPPER_LABELS 상수
     · 페르소나 카드 → PERSONAS 상수
     · 우측 QR/링크 → LINK_BAR 상수
     · 채널 통계 → CHANNEL_STATS 상수
     · 주간 KPI → WEEKLY_KPI 상수

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
  channels: ["네이버", "카카오", "강남언니"],
};

/* ─── col 1 사이드바: 후기 대기 환자 4명 ─── */
type ReviewStatus = "작성중" | "대기" | "완료";

const REVIEW_PATIENTS: Array<{
  name: string;
  detail: string;
  status: ReviewStatus;
  time: string;
  active: boolean;
}> = [
  {
    name: "홍서연",
    detail: "눈밑지방재배치",
    status: "작성중",
    time: "방금",
    active: true,
  },
  {
    name: "김민지",
    detail: "코필러",
    status: "대기",
    time: "5분 전",
    active: false,
  },
  {
    name: "박지영",
    detail: "리프팅",
    status: "완료",
    time: "30분 전",
    active: false,
  },
  {
    name: "이지수",
    detail: "윤곽주사",
    status: "대기",
    time: "1시간 전",
    active: false,
  },
];

const STATUS_STYLE: Record<ReviewStatus, { bg: string; fg: string }> = {
  작성중: { bg: "#E8F1FC", fg: "#1558B5" },
  대기: { bg: "#F1F5F9", fg: "#64748B" },
  완료: { bg: "#DCFCE7", fg: "#166534" },
};

/* ─── col 3 채널별 발송 통계 ─── */
const CHANNEL_STATS = [
  { name: "네이버 플레이스", count: 12, percent: 60 },
  { name: "카카오맵", count: 8, percent: 40 },
  { name: "강남언니", count: 4, percent: 20 },
];

/* ─── col 3 주간 KPI ─── */
const WEEKLY_KPI = [
  { label: "이번 주 발송", value: "4건" },
  { label: "작성 완료", value: "3건" },
  { label: "진행 중", value: "1건" },
];

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
  const showLinkActive = step >= 5 && step !== 0;

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)]">
      {/* 윈도우 크롬 */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/60">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="ml-3 text-[11px] text-slate-400 font-medium">
          이음 · 후기 만들기
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          실시간 동기화
        </div>
      </div>

      <div className="flex">
        <ReviewSidebar />

        <main className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col">
          {/* stepper */}
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

          {/* 페르소나 카드 */}
          <motion.div
            animate={{ opacity: step === 0 ? 0 : 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-2 min-h-[170px]"
          >
            {PERSONAS.map((p, i) => (
              <div
                key={p.key}
                className="rounded-xl border p-3 text-xs relative overflow-hidden"
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
                      <div className="h-3 w-14 bg-slate-100 rounded animate-pulse" />
                      <div className="h-2 w-full bg-slate-100 rounded animate-pulse" />
                      <div className="h-2 w-3/4 bg-slate-100 rounded animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* 하단 KPI bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-slate-500 font-medium truncate">
                초안 생성 04:12 · 페르소나 4안 자동
              </span>
            </div>
            <div
              className="font-semibold shrink-0"
              style={{ color: BRAND_BLUE }}
            >
              중복 후기 0건
            </div>
          </div>
        </main>

        <RightPanel showLinkActive={showLinkActive} />
      </div>
    </div>
  );
}

/* ─── col 1 사이드바: 후기 대기 환자 (lg+ only) ─── */
function ReviewSidebar() {
  return (
    <aside className="hidden lg:flex w-[170px] shrink-0 border-r border-slate-100 bg-slate-50/40 flex-col">
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
          후기 대기
        </div>
        <span className="text-[10px] font-semibold text-slate-500">
          {REVIEW_PATIENTS.length}
        </span>
      </div>
      <div className="flex-1 overflow-hidden px-1.5 pb-3">
        {REVIEW_PATIENTS.map((p) => (
          <div
            key={p.name}
            className={`rounded-lg px-2 py-2 mb-0.5 ${
              p.active ? "bg-white shadow-sm ring-1 ring-slate-200" : ""
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-semibold text-slate-900 truncate">
                {p.name}
              </span>
              <span
                className="text-[8px] font-semibold px-1 py-0.5 rounded leading-none"
                style={{
                  backgroundColor: STATUS_STYLE[p.status].bg,
                  color: STATUS_STYLE[p.status].fg,
                }}
              >
                {p.status}
              </span>
              <span className="ml-auto text-[9px] text-slate-400">
                {p.time}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500 truncate">
              {p.detail}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ─── col 3 우측 패널: QR + 채널 통계 + 주간 KPI (lg+ only) ─── */
function RightPanel({ showLinkActive }: { showLinkActive: boolean }) {
  return (
    <aside className="hidden lg:flex w-[210px] shrink-0 border-l border-slate-100 flex-col p-3.5 gap-3.5">
      {/* QR + 환자 전달 링크 */}
      <div className="rounded-xl border border-slate-200 p-3">
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
          {LINK_BAR.label}
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            animate={{
              backgroundColor: showLinkActive ? BRAND_BLUE_FAINT : "#F1F5F9",
            }}
            transition={{ duration: 0.4 }}
            className="w-12 h-12 rounded-md flex-shrink-0 flex items-center justify-center"
          >
            <QrCode
              className="w-6 h-6"
              style={{ color: showLinkActive ? BRAND_BLUE : "#94A3B8" }}
            />
          </motion.div>
          <div className="flex-1 min-w-0">
            <div className="text-[10px] text-slate-700 truncate font-mono">
              {LINK_BAR.url}
            </div>
            <div className="flex gap-1 mt-1 flex-wrap">
              {LINK_BAR.channels.map((c) => (
                <span
                  key={c}
                  className="px-1 py-0.5 rounded text-[8px] bg-slate-100 text-slate-600"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 채널별 발송 통계 */}
      <div>
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
          채널별 발송
        </div>
        <div className="space-y-1.5">
          {CHANNEL_STATS.map((c) => (
            <div key={c.name}>
              <div className="flex items-center justify-between text-[10px] mb-0.5">
                <span className="text-slate-600 truncate">{c.name}</span>
                <span className="font-semibold text-slate-900">
                  {c.count}건
                </span>
              </div>
              <div className="h-1 w-full rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${c.percent}%`,
                    backgroundColor: BRAND_BLUE,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 주간 KPI */}
      <div
        className="rounded-xl p-2.5 mt-auto"
        style={{ backgroundColor: BRAND_BLUE_FAINT }}
      >
        <div
          className="text-[10px] font-semibold tracking-wider uppercase mb-1.5"
          style={{ color: BRAND_BLUE }}
        >
          이번 주 KPI
        </div>
        <div className="space-y-1">
          {WEEKLY_KPI.map((k) => (
            <div key={k.label} className="flex items-center justify-between">
              <span className="text-[10px] text-slate-700">{k.label}</span>
              <span
                className="text-[11px] font-bold"
                style={{ color: BRAND_BLUE }}
              >
                {k.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
