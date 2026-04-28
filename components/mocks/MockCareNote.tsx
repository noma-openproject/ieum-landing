"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Stethoscope, Image as ImageIcon } from "lucide-react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockCareNote — 0.3 CARE NOTE mock (dashboard 형식)
   ═══════════════════════════════════════════════════════════════════
   ▎구성 (3-column dashboard, lg+에서만 사이드바·우측 보임)
   ─────────────────────────────────────────────────────────────────
   좌 사이드바 (정적): 케어 중 환자분 리스트 (D+N 진행 일자, 응급 1명 highlight)
   가운데 메인 (cycle): 환자 헤더 + 타임라인 D+1·D+3·D+7 + 의료진 확인 알림
   우 사이드 (정적): 환자 업로드 사진 썸네일 3장 + 응급도 분포 미니

   모바일: 좌·우 사이드 hidden, 메인만 표시.

   ▎시나리오 (메인만 cycle, 6초 주기)
   ─────────────────────────────────────────────────────────────────
   Step 1 (0~1.0s):    헤더만, 타임라인 placeholder
   Step 2 (1.0~1.5s):  D+1 카드 fade-up
   Step 3 (1.5~2.0s):  D+3 카드
   Step 4 (2.0~2.5s):  D+7 rose scale-up
   Step 5 (2.5~5.5s):  의료진 알림 등장
   Reset (5.5~6.0s):   페이드아웃

   ▎카피 수정 위치
   ─────────────────────────────────────────────────────────────────
     · 환자 정보 → PATIENT
     · 타임라인 카드 → TIMELINE
     · 알림 박스 → ALERT
     · 사이드바 환자 → CARE_QUEUE
     · 우측 사진 → PHOTOS
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

/* 좌 사이드바: 케어 중 환자 리스트 (정적) */
const CARE_QUEUE: {
  name: string;
  day: string;
  tone: Tone;
  note: string;
  active: boolean;
}[] = [
  {
    name: "홍서연",
    day: "D+7",
    tone: "rose",
    note: "응급 확인 요청",
    active: true,
  },
  { name: "김민지", day: "D+3", tone: "emerald", note: "정상", active: false },
  { name: "박지영", day: "D+1", tone: "amber", note: "관찰", active: false },
  {
    name: "이지수",
    day: "D+14",
    tone: "emerald",
    note: "회복 완료",
    active: false,
  },
];

/* 우 사이드: 환자 업로드 사진 썸네일 (정적) */
const PHOTOS = [
  { label: "D+7 좌측", tint: "#FFE4E6" },
  { label: "D+7 우측", tint: "#FEE2E2" },
  { label: "D+3 정면", tint: "#DCFCE7" },
];

const SEVERITY = [
  { label: "응급", count: 1, color: "#BE123C" },
  { label: "관찰", count: 1, color: "#B45309" },
  { label: "정상", count: 2, color: "#166534" },
];

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

  const isCardVisible = (i: number) => step !== 0 && step >= i + 2;
  const isAlertVisible = step >= 5 && step !== 0;

  return (
    <WindowFrame title="이음 · 케어 노트">
      <div className="flex gap-4">
        {/* ═══ 좌 사이드바 — 정적 ═══ */}
        <CareSidebar />

        {/* ═══ 가운데 메인 — cycle ═══ */}
        <div className="flex-1 min-w-0">
          {/* 환자 헤더 */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div>
                <div className="text-sm font-semibold text-slate-900 tracking-tight">
                  {PATIENT.name}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {PATIENT.detail}
                </div>
              </div>
              <span
                className="w-2 h-2 rounded-full ml-1"
                style={{ backgroundColor: TONE_MAP.rose.fg }}
                aria-label="응급"
              />
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              {PATIENT.uploads}
            </div>
          </div>

          {/* 타임라인 */}
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

          {/* 의료진 확인 알림 */}
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
                  <Stethoscope
                    className="w-4 h-4"
                    style={{ color: BRAND_BLUE }}
                  />
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
        </div>

        {/* ═══ 우 사이드 — 정적 사진 + 응급도 ═══ */}
        <CarePhotos />
      </div>
    </WindowFrame>
  );
}

/* ─── 좌 사이드바: 케어 중 환자 리스트 (lg+ 에서만 보임) ─── */
function CareSidebar() {
  return (
    <aside className="hidden lg:flex flex-col w-[180px] shrink-0 border-r border-slate-100 pr-4">
      <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
        케어 중
      </div>
      <div className="space-y-1">
        {CARE_QUEUE.map((p) => (
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
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: TONE_MAP[p.tone].fg }}
                />
              </div>
              <span
                className="text-[9px] font-semibold"
                style={{ color: TONE_MAP[p.tone].fg }}
              >
                {p.day}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 truncate">{p.note}</p>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ─── 우 사이드: 환자 업로드 사진 + 응급도 분포 (lg+ 에서만 보임) ─── */
function CarePhotos() {
  return (
    <aside className="hidden lg:flex flex-col w-[160px] shrink-0 border-l border-slate-100 pl-4">
      <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
        환자 업로드
      </div>
      <div className="grid grid-cols-3 gap-1.5 mb-4">
        {PHOTOS.map((ph, i) => (
          <div
            key={i}
            className="aspect-square rounded-md flex items-center justify-center"
            style={{ backgroundColor: ph.tint }}
            title={ph.label}
          >
            <ImageIcon
              className="w-4 h-4"
              style={{ color: "rgba(15, 23, 42, 0.4)" }}
            />
          </div>
        ))}
      </div>
      <div>
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-2">
          응급도 분포
        </div>
        <div className="space-y-1.5">
          {SEVERITY.map((s) => (
            <div
              key={s.label}
              className="flex items-center justify-between text-[11px]"
            >
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-slate-600">{s.label}</span>
              </div>
              <span className="font-semibold text-slate-900">{s.count}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
