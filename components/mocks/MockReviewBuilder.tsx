"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, Check } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockReviewBuilder — 0.2 REVIEW BUILDER 5-stage rich cycle mock
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   • 윈도우 크롬 (이음 · 후기 만들기 + 실시간 동기화)
   • 상단 stepper: 1.시작 → 2.질문 → 3.말투 선택 → 4.편집 → 5.전달
   • 메인 영역: 활성 단계의 상세 화면 한 개 표시 (slow fade transition)
       1) 시작     : 시술 정보 카드 (시술명·날짜·상담 이력 3건)
       2) 질문     : 좌측 질문 리스트 + 우측 객관식 답변 (선택 강조)
       3) 말투 선택 : 인물 속성 4 + 문체 4 (각 1개씩 선택 강조)
       4) 편집     : 자동 생성된 후기 초안 3단락 + 글자수/cursor blink
       5) 전달     : QR + 3 채널 chip + 보조 문구
   • 하단 완료 카드 (step 6) : "후기 초안 전달 완료" + 초안 미리보기
   • 하단 status bar : 진행 상태 + 평균 작성 시간

   ▎흔들림 0
   ─────────────────────────────────────────────────────────────────
   • 메인 영역: min-h-[290px] 고정 — 모든 stage 동일
   • 하단 완료 카드: min-h-[180px] reserved — 등장/사라짐 무관

   ▎이 mock 카피 수정
   ─────────────────────────────────────────────────────────────────
   STEPPER, PROCEDURE_INFO, QUESTIONS, PERSONAS, TONES,
   REVIEW_DRAFT, CHANNELS, COMPLETION_NOTE 상수.

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

/* 질문 + 객관식 — 각 질문에 4지선다, selectedIdx 가 강조 */
const QUESTIONS = [
  {
    q: "가장 만족스러웠던 점은 무엇인가요?",
    options: [
      "티 나지 않는 자연스러운 변화",
      "생각보다 편했던 회복",
      "원장님의 자세한 설명",
      "상담실장님의 꼼꼼한 안내",
    ],
    selectedIdx: 0,
  },
  {
    q: "시술 전 가장 걱정했던 부분은 무엇인가요?",
    options: [
      "붓기와 멍",
      "회복기간",
      "인상이 과하게 바뀌는 것",
      "통증에 대한 걱정",
    ],
    selectedIdx: 1,
  },
];

const PERSONAS = [
  { label: "20대 여성", selected: true },
  { label: "30대 직장인", selected: false },
  { label: "40대 주부", selected: false },
  { label: "30대 남성", selected: false },
];

const TONES = [
  { label: "담백하게", selected: true },
  { label: "친근하게", selected: false },
  { label: "자세하게", selected: false },
  { label: "짧고 간단하게", selected: false },
];

const REVIEW_DRAFT_PARAGRAPHS = [
  "눈 밑이 자연스럽게 정리돼서\n전보다 인상이 훨씬 편안해 보인다는 말을 많이 들었어요.",
  "시술 전에는 회복이 가장 걱정됐는데\n생각보다 일상 복귀가 빨라서 부담이 덜했고,",
  "상담 때 자세히 설명해주셔서 안심이 됐어요.",
];

const CHANNELS = [
  { label: "네이버", color: "#03C75A", text: "#FFFFFF" },
  { label: "카카오", color: "#FEE500", text: "#000000" },
  { label: "강남언니", color: "#FF6E5A", text: "#FFFFFF" },
];

const DELIVERY_NOTE = "후기 초안과 작성 링크가 함께 전달됩니다";

const COMPLETION_PREVIEW =
  "눈 밑이 자연스럽게 정리돼서 인상이 훨씬 편안해졌어요. 회복도 생각보다 빨라서 일정에 큰 무리가 없었고, 상담 때 자세히 설명해주셔서 안심이 됐어요.";

const COMPLETION_NOTE = "환자분 확인 후 네이버 · 카카오 · 강남언니에 바로 작성 가능";

/* 사이클 — 천천히 재생 (각 단계 ~3.0s, 완료 카드 ~4.5s) */
const DURATIONS = {
  step: 3000,
  complete: 4500,
  hold: 1200,
  reset: 700,
} as const;

type Step = -1 | 1 | 2 | 3 | 4 | 5 | 6;

export default function MockReviewBuilder() {
  const [step, setStep] = useState<Step>(1);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const cycle = () => {
      setStep(1);
      let t = DURATIONS.step;
      [2, 3, 4, 5].forEach((s) => {
        timers.push(setTimeout(() => setStep(s as Step), t));
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

  const isCompleteVisible = step === 6;
  const statusText =
    step === 6
      ? "5단계 완료 · 후기 초안 전달됨"
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
        <Stepper step={step} />

        {/* 메인 stage 영역 — 흔들림 0 보장 (min-h 고정) */}
        <div className="mt-5 min-h-[290px]">
          <AnimatePresence mode="wait">
            {step >= 1 && step <= 6 && (
              <motion.div
                key={`stage-${step}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                className="h-full"
              >
                {step === 1 && <Stage1Start />}
                {step === 2 && <Stage2Questions />}
                {step === 3 && <Stage3Tone />}
                {step === 4 && <Stage4Edit />}
                {step === 5 && <Stage5Deliver />}
                {step === 6 && <Stage5Deliver />}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 하단 완료 카드 — reserved (min-h-[180px]) */}
        <div className="mt-4 min-h-[180px]">
          <AnimatePresence>
            {isCompleteVisible && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="rounded-xl border p-3.5"
                style={{
                  borderColor: BRAND_BLUE_FAINT,
                  backgroundColor: "#F8FBFF",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-10 h-10 rounded-md flex-shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: BRAND_BLUE_FAINT }}
                  >
                    <Check
                      className="w-5 h-5"
                      strokeWidth={3}
                      style={{ color: BRAND_BLUE }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="text-[11px] font-bold tracking-wider mb-1"
                      style={{ color: BRAND_BLUE }}
                    >
                      ✓ 후기 초안 전달 완료
                    </div>
                    <p className="text-[12px] text-slate-800 leading-relaxed line-clamp-3">
                      “{COMPLETION_PREVIEW}”
                    </p>
                    <div className="mt-2 text-[10.5px] text-slate-600 font-medium">
                      {COMPLETION_NOTE}
                    </div>
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

/* ─── Stepper ─── */
function Stepper({ step }: { step: Step }) {
  return (
    <div className="flex items-center justify-between gap-1">
      {STEPPER.map((label, i) => {
        const idx = i + 1;
        const isActive = step === idx;
        const isCompleted = (step !== -1 && step > idx) || step === 6;
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
  );
}

/* ─── 1. 시작 ─── */
function Stage1Start() {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: BRAND_BLUE_FAINT,
        backgroundColor: "#F8FBFF",
      }}
    >
      <div
        className="text-[10px] font-bold tracking-wider mb-2"
        style={{ color: BRAND_BLUE }}
      >
        시술 정보 자동 채움
      </div>
      <div className="text-[16px] font-bold text-slate-900 mb-1">
        {PROCEDURE_INFO.name}
      </div>
      <div className="text-[12px] text-slate-500 mb-3">
        {PROCEDURE_INFO.date}
      </div>
      <div className="flex flex-wrap gap-1.5">
        {PROCEDURE_INFO.notes.map((n) => (
          <span
            key={n}
            className="text-[10.5px] font-medium px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600"
          >
            {n}
          </span>
        ))}
      </div>
      <div className="mt-3 pt-3 border-t border-slate-200/60 text-[10.5px] text-slate-500 leading-snug">
        상담 이력을 바탕으로 환자분께 꼭 맞는 질문을 곧 준비합니다.
      </div>
    </div>
  );
}

/* ─── 2. 질문 + 객관식 ─── */
function Stage2Questions() {
  return (
    <div className="grid grid-cols-2 gap-2.5 h-full">
      {/* 좌: 질문 리스트 (활성 첫 번째) */}
      <div className="rounded-xl border border-slate-200 p-3 bg-white">
        <div className="text-[10px] font-bold text-slate-400 tracking-wider mb-2">
          질문
        </div>
        <ul className="space-y-1.5">
          {QUESTIONS.map((item, i) => {
            const isActive = i === 0;
            return (
              <li
                key={item.q}
                className="rounded-lg px-2 py-1.5 text-[11px] leading-snug"
                style={{
                  backgroundColor: isActive ? BRAND_BLUE_FAINT : "transparent",
                  color: isActive ? BRAND_BLUE : "#64748B",
                  fontWeight: isActive ? 700 : 500,
                }}
              >
                {`${i + 1}. ${item.q}`}
              </li>
            );
          })}
        </ul>
      </div>
      {/* 우: 활성 질문 객관식 */}
      <div
        className="rounded-xl border p-3"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div
          className="text-[10px] font-bold tracking-wider mb-2"
          style={{ color: BRAND_BLUE }}
        >
          객관식 선택
        </div>
        <ul className="space-y-1.5">
          {QUESTIONS[0].options.map((opt, i) => {
            const isSelected = i === QUESTIONS[0].selectedIdx;
            return (
              <li
                key={opt}
                className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] leading-snug"
                style={{
                  backgroundColor: isSelected ? "#FFFFFF" : "#FFFFFF",
                  border: isSelected
                    ? `1.5px solid ${BRAND_BLUE}`
                    : "1.5px solid #E2E8F0",
                  color: isSelected ? "#0F172A" : "#64748B",
                  fontWeight: isSelected ? 700 : 500,
                }}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 flex items-center justify-center"
                  style={{
                    borderColor: isSelected ? BRAND_BLUE : "#CBD5E1",
                    backgroundColor: isSelected ? BRAND_BLUE : "transparent",
                  }}
                >
                  {isSelected && (
                    <Check
                      className="w-2 h-2 text-white"
                      strokeWidth={4}
                    />
                  )}
                </span>
                {opt}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ─── 3. 말투 선택 — 인물 + 문체 ─── */
function Stage3Tone() {
  return (
    <div className="space-y-3">
      <div
        className="rounded-xl border p-3"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div
          className="text-[10px] font-bold tracking-wider mb-2"
          style={{ color: BRAND_BLUE }}
        >
          인물 속성
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {PERSONAS.map((p) => (
            <ToneChip key={p.label} label={p.label} selected={p.selected} />
          ))}
        </div>
      </div>
      <div
        className="rounded-xl border p-3"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div
          className="text-[10px] font-bold tracking-wider mb-2"
          style={{ color: BRAND_BLUE }}
        >
          문체 톤
        </div>
        <div className="grid grid-cols-4 gap-1.5">
          {TONES.map((t) => (
            <ToneChip key={t.label} label={t.label} selected={t.selected} />
          ))}
        </div>
      </div>
      <div className="text-[10.5px] text-slate-500 leading-snug px-1">
        선택된 톤으로 후기 초안이 곧 자동 완성됩니다.
      </div>
    </div>
  );
}

function ToneChip({ label, selected }: { label: string; selected: boolean }) {
  return (
    <div
      className="rounded-lg px-1.5 py-2 text-center text-[10.5px] leading-tight"
      style={{
        backgroundColor: selected ? BRAND_BLUE : "#FFFFFF",
        color: selected ? "#FFFFFF" : "#64748B",
        border: selected
          ? `1.5px solid ${BRAND_BLUE}`
          : "1.5px solid #E2E8F0",
        fontWeight: selected ? 700 : 500,
      }}
    >
      {label}
    </div>
  );
}

/* ─── 4. 편집 ─── */
function Stage4Edit() {
  return (
    <div
      className="rounded-xl border p-4"
      style={{
        borderColor: "#CBD5E1",
        backgroundColor: "#FFFFFF",
        boxShadow: "0 4px 12px -4px rgba(15,23,42,0.06)",
      }}
    >
      <div className="flex items-center gap-1.5 mb-2.5">
        <span
          className="text-[10px] font-bold tracking-wider"
          style={{ color: BRAND_BLUE }}
        >
          후기 초안 자동 완성
        </span>
        <span className="text-[9px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500">
          편집 가능
        </span>
      </div>
      <div className="space-y-2">
        {REVIEW_DRAFT_PARAGRAPHS.map((p, i) => (
          <p
            key={i}
            className="text-[12px] text-slate-800 leading-[1.7] whitespace-pre-line"
          >
            {p}
            {i === REVIEW_DRAFT_PARAGRAPHS.length - 1 && (
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block w-px h-3 align-middle ml-0.5"
                style={{ backgroundColor: BRAND_BLUE }}
              />
            )}
          </p>
        ))}
      </div>
      <div className="mt-3 pt-2 border-t border-slate-100 text-[9.5px] text-slate-400">
        글자수 142 / 300
      </div>
    </div>
  );
}

/* ─── 5. 전달 ─── */
function Stage5Deliver() {
  return (
    <div
      className="rounded-xl border p-4 flex flex-col items-center text-center"
      style={{
        borderColor: BRAND_BLUE_FAINT,
        backgroundColor: "#F8FBFF",
      }}
    >
      <div
        className="text-[10px] font-bold tracking-wider mb-2"
        style={{ color: BRAND_BLUE }}
      >
        QR로 전달
      </div>
      <div
        className="w-20 h-20 rounded-lg flex items-center justify-center mb-2.5"
        style={{ backgroundColor: "#FFFFFF", border: `1.5px solid ${BRAND_BLUE_FAINT}` }}
      >
        <QrCode
          className="w-14 h-14"
          style={{ color: BRAND_BLUE }}
          strokeWidth={1.5}
        />
      </div>
      <div className="flex flex-wrap gap-1.5 justify-center mb-2">
        {CHANNELS.map((c) => (
          <span
            key={c.label}
            className="text-[10.5px] px-2 py-0.5 rounded-full font-semibold leading-none"
            style={{ backgroundColor: c.color, color: c.text }}
          >
            {c.label}
          </span>
        ))}
      </div>
      <div className="text-[10.5px] text-slate-600 leading-snug">
        {DELIVERY_NOTE}
      </div>
    </div>
  );
}
