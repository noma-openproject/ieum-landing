"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope } from "lucide-react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockCareNote — 0.3 CARE NOTE mock (Framer Motion 자동 재생)
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   상단:   환자 헤더 (홍서연 / 눈밑지방재배치 / 수술 후 7일차 / 업로드 3건)
   중간:   타임라인 카드 3개 (D+1 amber / D+3 emerald / D+7 rose)
   하단:   의료진 확인 요청 알림 박스

   ▎시나리오 (총 ~6.0s 주기, 무한 반복)
   ─────────────────────────────────────────────────────────────────
   Step 1 (0~1.0s):    환자 헤더만, 타임라인 자리 placeholder
   Step 2 (1.0~1.5s):  D+1 카드 fade-up (amber dot)
   Step 3 (1.5~2.0s):  D+3 카드 fade-up (emerald dot)
   Step 4 (2.0~2.6s):  D+7 카드 scale-up 강조 (rose dot — 응급)
   Step 5 (2.6~5.6s):  의료진 확인 요청 알림 박스 등장 + 머무름
   Reset (5.6~6.0s):   페이드아웃 → Step 1 복귀

   ▎이 mock 안의 카피를 수정하고 싶다면?
   ─────────────────────────────────────────────────────────────────
   이 mock의 텍스트는 lib/copy.ts 에 없습니다 — 데모용 가공 데이터.
     · 환자 정보 → PATIENT 상수
     · 타임라인 카드 → TIMELINE 상수 (day/status/tone/note)
     · 알림 박스 → ALERT 상수

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/FeatureCareNote.tsx 의 SmartMock fallback.
   ═══════════════════════════════════════════════════════════════════ */

type Tone = "amber" | "emerald" | "rose";

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
};

const DURATIONS = {
  step1: 1000,
  step2: 500,
  step3: 500,
  step4: 500,
  step5: 3000,
  reset: 500,
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

  // 카드 i 가 보이는 조건: i=0 → step≥2, i=1 → step≥3, i=2 → step≥4
  const isCardVisible = (i: number) => step !== 0 && step >= i + 2;
  const isAlertVisible = step >= 5 && step !== 0;

  return (
    <WindowFrame title="이음 · 케어 노트">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            {PATIENT.name}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {PATIENT.detail}
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">
          {PATIENT.uploads}
        </div>
      </div>

      <motion.div
        animate={{ opacity: step === 0 ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        className="relative pl-4 min-h-[230px]"
      >
        <div className="absolute left-[6px] top-1 bottom-1 w-px bg-slate-200" />

        {step === 1 && (
          <div className="space-y-3">
            {TIMELINE.map((it, i) => (
              <div key={`ph-${i}`} className="relative">
                <span className="absolute -left-[11px] top-2.5 w-2.5 h-2.5 rounded-full bg-slate-200" />
                <div className="rounded-xl border border-slate-200 p-3 bg-slate-50/30 min-h-[60px]">
                  <div className="h-3 w-20 bg-slate-100 rounded mb-2 animate-pulse" />
                  <div className="h-2.5 w-full bg-slate-100 rounded mb-1.5 animate-pulse" />
                  <div className="h-2.5 w-2/3 bg-slate-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="popLayout">
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

      <div className="mt-4 min-h-[44px]">
        <AnimatePresence mode="popLayout">
          {isAlertVisible && (
            <motion.div
              key="alert"
              initial={{ opacity: 0, y: 12, scale: 1.03 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="rounded-xl p-3 flex items-center gap-2"
              style={{ backgroundColor: BRAND_BLUE_FAINT }}
            >
              <Stethoscope className="w-4 h-4" style={{ color: BRAND_BLUE }} />
              <span
                className="text-[11px] font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                {ALERT.text}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
}
