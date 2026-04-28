"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode } from "lucide-react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockReviewBuilder — 0.2 REVIEW BUILDER mock (dashboard 형식)
   ═══════════════════════════════════════════════════════════════════
   ▎구성 (3-column dashboard, lg+에서만 사이드바·우측 보임)
   ─────────────────────────────────────────────────────────────────
   좌 사이드바 (정적): 후기 대상 환자분 리스트 (4명, 진행 중 1명 highlight)
   가운데 메인 (cycle): stepper 5단계 + 페르소나 4 카드 + QR/링크 박스
   우 사이드 (정적): 이번 주 발송 통계 미니 카드 (전달·작성 카운터)

   모바일: 좌·우 사이드 hidden, 메인만 표시 (단일 column).

   ▎시나리오 (메인만 cycle, 6초 주기)
   ─────────────────────────────────────────────────────────────────
   Step 1 (0~0.5s):     stepper [1] 활성, 카드 placeholder
   Step 2 (0.5~1.0s):   stepper [1,2]
   Step 3 (1.0~2.2s):   stepper [1,2,3], 페르소나 4카드 stagger 등장
   Step 4 (2.2~2.7s):   stepper [1,2,3,4], 1번 페르소나 ring
   Step 5 (2.7~5.5s):   stepper 모두, QR 박스 등장
   Reset (5.5~6.0s):    페이드아웃

   ▎카피 수정 위치
   ─────────────────────────────────────────────────────────────────
     · stepper → STEPPER_LABELS
     · 페르소나 → PERSONAS
     · QR / 채널 → LINK_BAR
     · 사이드바 환자 → REVIEW_QUEUE
     · 우측 통계 → STATS
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

/* 좌 사이드바 — 후기 대상 환자분 리스트 (정적) */
const REVIEW_QUEUE = [
  { name: "홍서연", status: "초안 작성 중", time: "오늘", active: true },
  { name: "김민지", status: "전달 완료", time: "어제", active: false },
  { name: "박지영", status: "초안 검토", time: "2일 전", active: false },
  { name: "이지수", status: "후기 게시", time: "3일 전", active: false },
];

/* 우 사이드 — 이번 주 발송 통계 (정적) */
const STATS = {
  weekLabel: "이번 주 후기",
  sent: { label: "전달", value: "12건" },
  draft: { label: "작성 중", value: "4건" },
  rate: { label: "도달율", value: "92%" },
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
      <div className="flex gap-4">
        {/* ═══ 좌 사이드바 — 정적 ═══ */}
        <ReviewSidebar />

        {/* ═══ 가운데 메인 — cycle ═══ */}
        <div className="flex-1 min-w-0">
          {/* stepper — 3-state */}
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

          {/* 페르소나 4 카드 */}
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
                  borderColor:
                    showHighlight && i === 0 ? BRAND_BLUE : "#E2E8F0",
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
                      <div className="h-3.5 w-14 bg-slate-100 rounded animate-pulse" />
                      <div className="h-2 w-full bg-slate-100 rounded animate-pulse" />
                      <div className="h-2 w-3/4 bg-slate-100 rounded animate-pulse" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>

          {/* QR + 링크 박스 — Step 5 진입 시 등장 */}
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
        </div>

        {/* ═══ 우 사이드 — 정적 통계 ═══ */}
        <ReviewStats />
      </div>
    </WindowFrame>
  );
}

/* ─── 좌 사이드바: 후기 대상 환자 리스트 (lg+ 에서만 보임) ─── */
function ReviewSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[180px] shrink-0 border-r border-slate-100 pr-4">
      <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
        후기 대상
      </div>
      <div className="space-y-1">
        {REVIEW_QUEUE.map((p) => (
          <div
            key={p.name}
            className={`rounded-lg px-2 py-2 ${
              p.active ? "bg-slate-50 ring-1 ring-slate-200" : ""
            }`}
          >
            <div className="flex items-center justify-between mb-0.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[12px] font-semibold text-slate-900">
                  {p.name}
                </span>
                {p.active && (
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: BRAND_BLUE }}
                  />
                )}
              </div>
              <span className="text-[9px] text-slate-400">{p.time}</span>
            </div>
            <p className="text-[10px] text-slate-500 truncate">{p.status}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ─── 우 사이드: 이번 주 발송 통계 (lg+ 에서만 보임) ─── */
function ReviewStats() {
  return (
    <aside className="hidden lg:flex flex-col w-[160px] shrink-0 border-l border-slate-100 pl-4">
      <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
        {STATS.weekLabel}
      </div>
      <div className="space-y-3">
        <StatRow item={STATS.sent} accent />
        <StatRow item={STATS.draft} />
        <StatRow item={STATS.rate} />
      </div>
      {/* mini bar — 발송 추이 시각화 */}
      <div className="mt-5">
        <div className="text-[9px] text-slate-400 mb-2">최근 7일 추이</div>
        <div className="flex items-end gap-1 h-12">
          {[0.4, 0.6, 0.5, 0.8, 0.7, 0.9, 1.0].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm"
              style={{
                height: `${h * 100}%`,
                backgroundColor: i === 6 ? BRAND_BLUE : BRAND_BLUE_FAINT,
              }}
            />
          ))}
        </div>
      </div>
    </aside>
  );
}

function StatRow({
  item,
  accent = false,
}: {
  item: { label: string; value: string };
  accent?: boolean;
}) {
  return (
    <div>
      <div className="text-[10px] text-slate-500">{item.label}</div>
      <div
        className="text-[15px] font-semibold mt-0.5"
        style={{ color: accent ? BRAND_BLUE : "#0F172A" }}
      >
        {item.value}
      </div>
    </div>
  );
}
