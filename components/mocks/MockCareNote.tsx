"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Image as ImageIcon } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockCareNote — 0.3 CARE NOTE 3-column dashboard mock
   ═══════════════════════════════════════════════════════════════════
   ▎구성 (afterdoc 톤 — multi-area dashboard)
   ─────────────────────────────────────────────────────────────────
   • 윈도우 크롬 (이음 · 케어 노트 + 실시간 동기화 indicator)
   • 3-column flex (lg+):
       col 1: 케어 중 환자분 4명 (D+1·3·7·14 dot 색)
       col 2: 메인 — 환자 헤더 + D+1/D+3/D+7 타임라인 cycle (기존)
       col 3: 우측 — 환자 사진 썸네일 + 통증 추이 sparkline + 응급 알림

   ▎모바일 (lg 미만): col 1·3 hidden, 메인만 노출

   ▎이 mock 안의 카피 수정
   ─────────────────────────────────────────────────────────────────
     · 사이드바 → CARE_PATIENTS 상수
     · 메인 환자 헤더 → PATIENT 상수
     · 타임라인 → TIMELINE 상수
     · 우측 사진 → UPLOADS 상수
     · 통증 추이 → PAIN_TREND 상수
     · 응급 알림 → ALERT 상수

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/FeatureCareNote.tsx 의 SmartMock fallback.
   ═══════════════════════════════════════════════════════════════════ */

type Tone = "amber" | "emerald" | "rose" | "slate";

const PATIENT = {
  name: "홍서연",
  detail: "눈밑지방재배치 · 수술 후 7일차",
  uploads: "환자 업로드 3건",
};

const TIMELINE: { day: string; status: string; tone: Tone; note: string }[] = [
  { day: "D+1", status: "관찰", tone: "amber", note: "붓기 있음 / 통증 3단계" },
  {
    day: "D+3",
    status: "정상",
    tone: "emerald",
    note: "붓기 감소. 멍 정상 범위",
  },
  {
    day: "D+7",
    status: "응급",
    tone: "rose",
    note: "부분 발적 — 의료진 확인 요청",
  },
];

const ALERT = {
  text: "의료진 확인 요청 1건",
};

const TONE_MAP: Record<Tone, { bg: string; fg: string }> = {
  amber: { bg: "#FEF3C7", fg: "#B45309" },
  emerald: { bg: "#DCFCE7", fg: "#166534" },
  rose: { bg: "#FFE4E6", fg: "#BE123C" },
  slate: { bg: "#F1F5F9", fg: "#64748B" },
};

/* ─── col 1 사이드바: 케어 중 환자 4명 ─── */
const CARE_PATIENTS: Array<{
  name: string;
  detail: string;
  day: string;
  tone: Tone;
  active: boolean;
  upload: string;
}> = [
  {
    name: "홍서연",
    detail: "눈밑지방재배치",
    day: "D+7",
    tone: "rose",
    active: true,
    upload: "10분 전 사진",
  },
  {
    name: "김민지",
    detail: "코필러",
    day: "D+3",
    tone: "emerald",
    active: false,
    upload: "어제 사진",
  },
  {
    name: "박지영",
    detail: "리프팅",
    day: "D+1",
    tone: "amber",
    active: false,
    upload: "오늘 새벽",
  },
  {
    name: "이지수",
    detail: "윤곽주사",
    day: "D+14",
    tone: "slate",
    active: false,
    upload: "3일 전",
  },
];

/* ─── col 3 통증 추이 sparkline ─── */
const PAIN_TREND = [
  { day: "D+1", level: 3 },
  { day: "D+2", level: 4 },
  { day: "D+3", level: 2 },
  { day: "D+5", level: 1 },
  { day: "D+7", level: 3 },
];

const PAIN_MAX = 5;

/* ─── col 3 환자 업로드 사진 (placeholder) ─── */
const UPLOADS = [
  { day: "D+1", time: "오후 2:14" },
  { day: "D+3", time: "오전 9:30" },
  { day: "D+7", time: "10분 전" },
];

const DURATIONS = {
  step1: 1500,
  step2: 850,
  step3: 850,
  step4: 850,
  step5: 4500,
  reset: 700,
} as const;

type Step = 0 | 1 | 2 | 3 | 4 | 5;

export default function MockCareNote() {
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

  const isCardVisible = (i: number) => step !== 0 && step >= i + 2;
  const isAlertVisible = step >= 5 && step !== 0;

  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)]">
      {/* 윈도우 크롬 */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/60">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="ml-3 text-[11px] text-slate-400 font-medium">
          이음 · 케어 노트
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] text-slate-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          실시간 동기화
        </div>
      </div>

      <div className="flex">
        <CareSidebar />

        <main className="flex-1 min-w-0 p-4 lg:p-5 flex flex-col">
          {/* 환자 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-sm font-semibold text-slate-900 tracking-tight flex items-center gap-2">
                {PATIENT.name}
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: TONE_MAP.rose.fg }}
                />
              </div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                {PATIENT.detail}
              </div>
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {PATIENT.uploads}
            </div>
          </div>

          {/* 타임라인 — opacity 항상 1 (cycle reset 시 들썩임 방지). 카드 자체는 AnimatePresence로 in/out */}
          <motion.div
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative pl-4 flex-1 min-h-[230px]"
          >
            <div className="absolute left-[6px] top-1 bottom-1 w-px bg-slate-200" />

            {step === 1 && (
              <div className="space-y-3">
                {TIMELINE.map((it, i) => (
                  <div key={`ph-${i}`} className="relative">
                    <span className="absolute -left-[11px] top-2.5 w-2.5 h-2.5 rounded-full bg-slate-200" />
                    <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/30">
                      <div className="h-3 w-20 bg-slate-100 rounded mb-2 animate-pulse" />
                      <div className="h-2.5 w-full bg-slate-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <AnimatePresence>
              {step !== 1 &&
                TIMELINE.map((it, i) =>
                  isCardVisible(i) ? (
                    <motion.div
                      key={`card-${i}`}
                      initial={{
                        opacity: 0,
                        y: 16,
                        scale: it.tone === "rose" ? 1.05 : 1,
                      }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{
                        duration: it.tone === "rose" ? 0.5 : 0.4,
                        ease: "easeOut",
                      }}
                      className={`relative ${i > 0 ? "mt-3" : ""}`}
                    >
                      <span
                        className="absolute -left-[11px] top-2.5 w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: TONE_MAP[it.tone].fg }}
                      />
                      <div className="rounded-xl border border-slate-200 p-3 bg-white">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-semibold text-slate-700">
                            {it.day}
                          </span>
                          <span
                            className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                            style={{
                              backgroundColor: TONE_MAP[it.tone].bg,
                              color: TONE_MAP[it.tone].fg,
                            }}
                          >
                            AI 분석 · {it.status}
                          </span>
                        </div>
                        <p className="text-[12px] text-slate-600">{it.note}</p>
                      </div>
                    </motion.div>
                  ) : null,
                )}
            </AnimatePresence>
          </motion.div>

          {/* 하단 KPI bar */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="text-slate-500 font-medium truncate">
                케어 중 4명 · 응급 1 / 관찰 1 / 정상 2
              </span>
            </div>
            <div
              className="font-semibold shrink-0"
              style={{ color: BRAND_BLUE }}
            >
              평균 응답 4분
            </div>
          </div>
        </main>

        <CareRightPanel isAlertVisible={isAlertVisible} />
      </div>
    </div>
  );
}

/* ─── col 1 사이드바: 케어 중 환자 4명 (lg+ only) ─── */
function CareSidebar() {
  return (
    <aside className="hidden lg:flex w-[170px] shrink-0 border-r border-slate-100 bg-slate-50/40 flex-col">
      <div className="px-3 pt-3 pb-2 flex items-center justify-between">
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
          케어 중
        </div>
        <span className="text-[10px] font-semibold text-slate-500">
          {CARE_PATIENTS.length}
        </span>
      </div>
      <div className="flex-1 overflow-hidden px-1.5 pb-3">
        {CARE_PATIENTS.map((p) => (
          <div
            key={p.name}
            className={`rounded-lg px-2 py-2 mb-0.5 ${
              p.active ? "bg-white shadow-sm ring-1 ring-slate-200" : ""
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: TONE_MAP[p.tone].fg }}
              />
              <span className="text-[12px] font-semibold text-slate-900 truncate">
                {p.name}
              </span>
              <span
                className="ml-auto text-[9px] font-semibold"
                style={{ color: TONE_MAP[p.tone].fg }}
              >
                {p.day}
              </span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500 truncate">
              {p.detail}
            </p>
            <p className="mt-0.5 text-[9px] text-slate-400 truncate">
              {p.upload}
            </p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ─── col 3 우측 패널: 사진 + 통증 추이 + 응급 알림 (lg+ only) ─── */
function CareRightPanel({ isAlertVisible }: { isAlertVisible: boolean }) {
  return (
    <aside className="hidden lg:flex w-[200px] shrink-0 border-l border-slate-100 flex-col p-3.5 gap-3.5">
      {/* 환자 업로드 사진 placeholder */}
      <div>
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
          환자 업로드
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {UPLOADS.map((u) => (
            <div
              key={u.day}
              className="aspect-square rounded-md bg-slate-100 ring-1 ring-slate-200/50 flex flex-col items-center justify-center text-[8px] text-slate-400 gap-0.5"
            >
              <ImageIcon className="w-3 h-3" />
              <span className="font-semibold text-slate-500">{u.day}</span>
            </div>
          ))}
        </div>
        <p className="mt-1.5 text-[9px] text-slate-400">
          최근 업로드 {UPLOADS[UPLOADS.length - 1].time}
        </p>
      </div>

      {/* 통증 추이 sparkline */}
      <div>
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
          통증 추이
        </div>
        <div className="flex items-end gap-1 h-12">
          {PAIN_TREND.map((p) => {
            const heightPercent = (p.level / PAIN_MAX) * 100;
            const isHigh = p.level >= 3;
            return (
              <div key={p.day} className="flex-1 flex flex-col items-center">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-sm"
                    style={{
                      height: `${heightPercent}%`,
                      backgroundColor: isHigh
                        ? TONE_MAP.rose.fg
                        : TONE_MAP.emerald.fg,
                      opacity: isHigh ? 1 : 0.6,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 mt-1">
          {PAIN_TREND.map((p) => (
            <span
              key={p.day}
              className="flex-1 text-center text-[8px] text-slate-400"
            >
              {p.day}
            </span>
          ))}
        </div>
      </div>

      {/* 응급 알림 */}
      <motion.div
        animate={{
          backgroundColor: isAlertVisible ? BRAND_BLUE_FAINT : "#F8FAFC",
          opacity: isAlertVisible ? 1 : 0.6,
        }}
        transition={{ duration: 0.4 }}
        className="rounded-xl p-2.5 flex items-center gap-2 mt-auto"
      >
        <Stethoscope
          className="w-4 h-4 shrink-0"
          style={{ color: BRAND_BLUE }}
        />
        <span
          className="text-[11px] font-semibold leading-tight"
          style={{ color: BRAND_BLUE }}
        >
          {ALERT.text}
        </span>
      </motion.div>
    </aside>
  );
}
