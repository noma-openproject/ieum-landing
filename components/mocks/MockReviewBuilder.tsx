"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockReviewBuilder — 0.2 REVIEW BUILDER 5-step stagger mock
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   • 윈도우 크롬 (이음 · 후기 만들기 + 실시간 동기화)
   • Stepper: 1.시작 → 2.질문 → 3.말투 선택 → 4.편집 → 5.전달
   • 5칸 가로 grid — 좌→우 stagger 등장
       ① 시작     : 시술 정보 자동 채움
       ② 질문     : 추천 질문 3개
       ③ 말투 선택 : 4 페르소나 mini grid
       ④ 편집     : 텍스트 + cursor blink
       ⑤ 전달     : QR + 채널 chip
   • 하단 완성 영역 (step 6) : "후기 등록 완료" 카드 (네이버·카카오·강남언니 자동)
   • 하단 status bar : 진행 상태 + 평균 작성 시간

   ▎흔들림 0 보장
   ─────────────────────────────────────────────────────────────────
   • 5칸 grid: fixed height (min-h-[150px]) — skeleton ↔ content 동일
   • 하단 완성 영역: reserved (min-h-[140px]) — 등장/사라짐 무관 height 유지
   • stepper, status bar: 정적

   ▎이 mock 안의 카피 수정
   ─────────────────────────────────────────────────────────────────
   STEPPER, PROCEDURE_INFO, QUESTIONS, PERSONAS, EDIT_TEXT_PREVIEW,
   FULL_REVIEW, CHANNELS 상수

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/FeatureReviewBuilder.tsx 의 SmartMock fallback.
   ═══════════════════════════════════════════════════════════════════ */

const STEPPER = ["시작", "질문", "말투 선택", "편집", "전달"];

const PROCEDURE_INFO = {
  name: "눈밑지방재배치",
  date: "3/8 시술",
  notes: ["1차 카톡", "2차 현장", "3차 진료"],
};

const QUESTIONS = [
  "가장 걱정되셨던 점은?",
  "결과를 보시고 어떠셨나요?",
  "인상 깊었던 한 마디?",
];

const PERSONAS = [
  { label: "20대 여성", color: "#DC2626", tint: "#FEE2E2" },
  { label: "30대 직장인", color: "#4338CA", tint: "#E0E7FF" },
  { label: "40대 주부", color: "#B45309", tint: "#FEF3C7" },
  { label: "30대 남성", color: "#166534", tint: "#DCFCE7" },
];

const EDIT_TEXT_PREVIEW = "다들 예뻐졌다고 ㅎㅎ 회복도 빨라서";

const FULL_REVIEW =
  "다들 예뻐졌다고 ㅎㅎ 회복도 빨라서 출근 일정에 무리 없었어요. 원장님이 꼼꼼히 봐주신 덕분이에요.";

const CHANNELS = [
  { label: "네이버", color: "#03C75A", text: "#FFFFFF" },
  { label: "카카오", color: "#FEE500", text: "#000000" },
  { label: "강남언니", color: "#FF6E5A", text: "#FFFFFF" },
];

const DURATIONS = {
  initial: 300,
  step: 600,
  complete: 1800,
  hold: 1200,
  reset: 400,
} as const;

export default function MockReviewBuilder() {
  /** step 의미:
   *  -1: reset 페이드아웃 중
   *   0: 모두 skeleton
   *   1~5: 1~5칸 차례 채워짐 (active 칸 강조)
   *   6: 모든 칸 완료 + 하단 "후기 등록 완료" 등장
   */
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(0);
      let t = DURATIONS.initial;
      [1, 2, 3, 4, 5].forEach((s) => {
        timers.push(setTimeout(() => setStep(s), t));
        t += DURATIONS.step;
      });
      timers.push(setTimeout(() => setStep(6), t));
      t += DURATIONS.complete;
      t += DURATIONS.hold;
      timers.push(setTimeout(() => setStep(-1), t));
      t += DURATIONS.reset;
      timers.push(setTimeout(cycle, t));
    };
    cycle();
    return () => timers.forEach(clearTimeout);
  }, []);

  const isCellVisible = (idx: number) => step !== -1 && step >= idx + 1;
  const isCompleteVisible = step === 6;

  const statusText =
    step === 6
      ? "5단계 완료 · 후기 등록됨"
      : step >= 1 && step <= 5
        ? `${step}단계 진행 중 · ${STEPPER[step - 1]}`
        : "대기 중";

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
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          실시간 동기화
        </div>
      </div>

      <div className="p-4 lg:p-5">
        {/* 5단계 stepper */}
        <div className="flex items-center justify-between gap-1 mb-5">
          {STEPPER.map((label, i) => {
            const idx = i + 1;
            const isActive = step === idx;
            const isCompleted =
              (step !== -1 && step > idx) || step === 6;
            return (
              <React.Fragment key={label}>
                <motion.div
                  animate={{ scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center gap-1 min-w-0 flex-1"
                >
                  <motion.span
                    animate={{
                      backgroundColor: isActive
                        ? BRAND_BLUE
                        : isCompleted
                          ? BRAND_BLUE_FAINT
                          : "#F1F5F9",
                      color: isActive
                        ? "#FFFFFF"
                        : isCompleted
                          ? BRAND_BLUE
                          : "#94A3B8",
                    }}
                    transition={{ duration: 0.3 }}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold"
                  >
                    {idx}
                  </motion.span>
                  <span
                    className={`text-[10px] font-semibold tracking-tight whitespace-nowrap ${
                      isActive
                        ? "text-slate-900"
                        : isCompleted
                          ? "text-slate-700"
                          : "text-slate-400"
                    }`}
                  >
                    {label}
                  </span>
                </motion.div>
                {i < STEPPER.length - 1 && (
                  <span className="text-slate-200 mb-4">—</span>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* 5칸 가로 grid */}
        <div className="grid grid-cols-5 gap-2 mb-5">
          <Cell visible={isCellVisible(0)} active={step === 1}>
            <CellHeader idx={1} label="시작" />
            <div className="text-[10.5px] font-bold text-slate-900 leading-tight mb-1">
              {PROCEDURE_INFO.name}
            </div>
            <div className="text-[9.5px] text-slate-500 mb-2">
              {PROCEDURE_INFO.date}
            </div>
            <div className="space-y-1">
              {PROCEDURE_INFO.notes.map((n) => (
                <div
                  key={n}
                  className="flex items-center gap-1 text-[9px] text-slate-600"
                >
                  <span className="w-1 h-1 rounded-full bg-slate-300" />
                  {n}
                </div>
              ))}
            </div>
          </Cell>

          <Cell visible={isCellVisible(1)} active={step === 2}>
            <CellHeader idx={2} label="질문" />
            <div className="space-y-1.5">
              {QUESTIONS.map((q) => (
                <div
                  key={q}
                  className="rounded px-1.5 py-1 text-[9px] leading-snug"
                  style={{
                    backgroundColor: BRAND_BLUE_FAINT,
                    color: BRAND_BLUE,
                  }}
                >
                  {q}
                </div>
              ))}
            </div>
          </Cell>

          <Cell visible={isCellVisible(2)} active={step === 3}>
            <CellHeader idx={3} label="말투 선택" />
            <div className="grid grid-cols-2 gap-1">
              {PERSONAS.map((p, i) => (
                <div
                  key={p.label}
                  className="rounded px-1 py-1.5"
                  style={{
                    backgroundColor: p.tint,
                    border:
                      i === 0
                        ? `1.5px solid ${BRAND_BLUE}`
                        : "1.5px solid transparent",
                  }}
                >
                  <div
                    className="text-[8.5px] font-bold leading-tight"
                    style={{ color: p.color }}
                  >
                    {p.label}
                  </div>
                </div>
              ))}
            </div>
          </Cell>

          <Cell visible={isCellVisible(3)} active={step === 4}>
            <CellHeader idx={4} label="편집" />
            <div className="rounded border border-slate-200 p-1.5 bg-slate-50">
              <div className="text-[9px] text-slate-700 leading-snug">
                {EDIT_TEXT_PREVIEW}
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="inline-block w-px h-2.5 align-middle ml-0.5"
                  style={{ backgroundColor: BRAND_BLUE }}
                />
              </div>
            </div>
            <div className="text-[8px] text-slate-400 mt-1.5">
              글자수 142 / 300
            </div>
          </Cell>

          <Cell visible={isCellVisible(4)} active={step === 5}>
            <CellHeader idx={5} label="전달" />
            <div
              className="aspect-square rounded mb-1.5 flex items-center justify-center"
              style={{ backgroundColor: BRAND_BLUE_FAINT }}
            >
              <QrCode
                className="w-7 h-7"
                style={{ color: BRAND_BLUE }}
                strokeWidth={1.5}
              />
            </div>
            <div className="flex flex-wrap gap-0.5">
              {CHANNELS.map((c) => (
                <span
                  key={c.label}
                  className="text-[7.5px] px-1 py-0.5 rounded font-semibold leading-none"
                  style={{
                    backgroundColor: c.color,
                    color: c.text,
                  }}
                >
                  {c.label}
                </span>
              ))}
            </div>
          </Cell>
        </div>

        {/* 하단 완성 영역 — 항상 reserved (min-h) */}
        <div className="min-h-[140px]">
          <AnimatePresence>
            {isCompleteVisible && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-xl border p-3.5 flex items-start gap-3"
                style={{
                  borderColor: BRAND_BLUE_FAINT,
                  backgroundColor: "#F8FBFF",
                }}
              >
                <div
                  className="w-12 h-12 rounded-md flex-shrink-0 flex items-center justify-center"
                  style={{ backgroundColor: BRAND_BLUE_FAINT }}
                >
                  <QrCode
                    className="w-7 h-7"
                    style={{ color: BRAND_BLUE }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className="text-[10px] font-bold tracking-wider uppercase mb-1"
                    style={{ color: BRAND_BLUE }}
                  >
                    ✓ 후기 등록 완료
                  </div>
                  <p className="text-[12px] text-slate-800 leading-relaxed line-clamp-2">
                    “{FULL_REVIEW}”
                  </p>
                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[9.5px] text-slate-500 font-medium">
                      자동 등록:
                    </span>
                    {CHANNELS.map((c) => (
                      <span
                        key={c.label}
                        className="text-[9px] px-1.5 py-0.5 rounded font-semibold leading-none"
                        style={{
                          backgroundColor: c.color,
                          color: c.text,
                        }}
                      >
                        ✓ {c.label}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 하단 status bar */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-500 font-medium truncate">
              {statusText}
            </span>
          </div>
          <div
            className="font-semibold shrink-0"
            style={{ color: BRAND_BLUE }}
          >
            평균 작성 1분 47초
          </div>
        </div>
      </div>
    </div>
  );
}

function CellHeader({ idx, label }: { idx: number; label: string }) {
  return (
    <div className="flex items-center gap-1 mb-1.5">
      <span
        className="w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-bold leading-none"
        style={{
          backgroundColor: BRAND_BLUE_FAINT,
          color: BRAND_BLUE,
        }}
      >
        {idx}
      </span>
      <span className="text-[9px] font-semibold text-slate-500 tracking-tight">
        {label}
      </span>
    </div>
  );
}

function Cell({
  visible,
  active,
  children,
}: {
  visible: boolean;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className="rounded-lg border p-2 min-h-[150px] relative overflow-hidden bg-white"
      style={{
        borderColor: active ? BRAND_BLUE : "#E2E8F0",
        boxShadow: active ? `0 0 0 3px ${BRAND_BLUE_FAINT}` : "none",
        transition: "border-color 0.3s, box-shadow 0.3s",
      }}
    >
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        ) : (
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="space-y-1.5"
          >
            <div className="h-2 w-2/3 bg-slate-100 rounded animate-pulse" />
            <div className="h-1.5 w-full bg-slate-100 rounded animate-pulse" />
            <div className="h-1.5 w-4/5 bg-slate-100 rounded animate-pulse" />
            <div className="h-1.5 w-3/5 bg-slate-100 rounded animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
