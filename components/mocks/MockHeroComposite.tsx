"use client";

import React from "react";
import { Stethoscope } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";
import HeroAnimatedMain from "./HeroAnimatedMain";

/* ═══════════════════════════════════════════════════════════════════
   MockHeroComposite — Hero 풀폭 dashboard mock (4-column)
   ═══════════════════════════════════════════════════════════════════
   ▎구성 (afterdoc.ai 톤 — 한 화면에 핵심 기능 4개 영역)
   ─────────────────────────────────────────────────────────────────
   • 윈도우 크롬 (이음 · 상담 코치)
   • 4-column dashboard (lg+):
       col 1: 환자 리스트 사이드바 (오늘 환자분 5명, 정적)
       col 2: 메인 상담 가이드 (HeroAnimatedMain — Framer Motion cycle)
       col 3: 카톡 메시지 박스 (환자분과 상담실장 대화, 정적)
       col 4: 응급 케어 알림 (D+1·D+3·D+7 mini 타임라인 + 의료진 알림, 정적)

   ▎모바일 (lg 미만):
   ─────────────────────────────────────────────────────────────────
   col 1 + col 2 만 보임 (col 3·4 hidden)

   ▎이 mock 안의 카피 수정:
   ─────────────────────────────────────────────────────────────────
     · 환자 리스트 → PATIENT_LIST
     · 카톡 메시지 → KAKAO_MESSAGES
     · 케어 타임라인 → CARE_TIMELINE
     · 메인 패널 카드/인디케이터 → HeroAnimatedMain.tsx

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/Hero.tsx 의 SmartMock fallback.
   ═══════════════════════════════════════════════════════════════════ */

const KAKAO_YELLOW = "#FEE500";

/* ─── 좌 사이드바: 오늘 환자분 리스트 ─── */
const PATIENT_LIST = [
  {
    name: "홍서연",
    chip: "카톡",
    chipBg: "bg-amber-100",
    chipFg: "text-amber-800",
    detail: "눈밑지방재배치 상담",
    time: "14:32",
    active: true,
    badge: 2,
  },
  {
    name: "김민지",
    chip: "콜센터",
    chipBg: "bg-blue-100",
    chipFg: "text-blue-800",
    detail: "보톡스 1차 통화",
    time: "13:18",
    active: false,
  },
  {
    name: "박지영",
    chip: "방문",
    chipBg: "bg-emerald-100",
    chipFg: "text-emerald-800",
    detail: "코필러 현장 상담",
    time: "11:05",
    active: false,
  },
  {
    name: "이지수",
    chip: "케어",
    chipBg: "bg-violet-100",
    chipFg: "text-violet-800",
    detail: "윤곽주사 D+3 사진",
    time: "어제",
    active: false,
    badge: 1,
  },
  {
    name: "최아름",
    chip: "후기",
    chipBg: "bg-rose-100",
    chipFg: "text-rose-800",
    detail: "라식 후기 작성 중",
    time: "어제",
    active: false,
  },
];

/* ─── col 3 카톡 메시지 박스 ─── */
const KAKAO_MESSAGES: Array<{ from: "patient" | "clinic"; text: string }> = [
  { from: "patient", text: "안녕하세요, 눈밑지방재배치 상담 가능할까요?" },
  {
    from: "clinic",
    text: "안녕하세요 홍서연님! 화요일 14시 어떠세요? 😊",
  },
  { from: "patient", text: "회복 기간이 얼마나 걸리나요?" },
  {
    from: "clinic",
    text: "보통 5~7일이세요. 환자분께 가장 잘 맞는 방식으로 안내드릴게요.",
  },
];

/* ─── col 4 응급 케어 알림 (mini 타임라인) ─── */
type Tone = "amber" | "emerald" | "rose";
const CARE_TIMELINE: { day: string; status: string; tone: Tone; note: string }[] = [
  { day: "D+1", status: "관찰", tone: "amber", note: "붓기 / 통증 3" },
  { day: "D+3", status: "정상", tone: "emerald", note: "멍 정상 범위" },
  { day: "D+7", status: "응급", tone: "rose", note: "부분 발적" },
];
const TONE_MAP: Record<Tone, { bg: string; fg: string }> = {
  amber: { bg: "#FEF3C7", fg: "#B45309" },
  emerald: { bg: "#DCFCE7", fg: "#166534" },
  rose: { bg: "#FFE4E6", fg: "#BE123C" },
};

export default function MockHeroComposite() {
  return (
    <div className="rounded-2xl bg-white overflow-hidden shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.06)]">
      {/* 상단 윈도우 크롬 */}
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 border-b border-slate-100 bg-slate-50/60">
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <span className="w-2.5 h-2.5 rounded-full bg-slate-200" />
        <div className="ml-3 text-[11px] text-slate-400 font-medium">
          이음 · 상담 코치
        </div>
      </div>

      <div className="flex h-[420px] sm:h-[460px]">
        {/* ═══ col 1: 환자 리스트 사이드바 ═══ */}
        <PatientSidebar />

        {/* ═══ col 2: 메인 상담 가이드 (cycle) ═══ */}
        <main className="flex-1 min-w-0 p-4 overflow-hidden flex flex-col">
          {/* 단계 탭 (정적) */}
          <div className="flex items-center gap-1 mb-3 border-b border-slate-100 pb-2.5">
            <div
              className="px-2.5 py-1 rounded-md text-[11px] font-semibold"
              style={{
                backgroundColor: BRAND_BLUE_FAINT,
                color: BRAND_BLUE,
              }}
            >
              1차 온라인
            </div>
            <div className="px-2.5 py-1 text-[11px] text-slate-400">
              2차 현장
            </div>
            <div className="px-2.5 py-1 text-[11px] text-slate-400">
              3차 원장님
            </div>
          </div>

          {/* 환자 헤더 + 인디케이터 + 카드 영역 (Framer Motion cycle) */}
          <div className="flex-1 min-h-0">
            <HeroAnimatedMain />
          </div>
        </main>

        {/* ═══ col 3: 카톡 메시지 박스 (lg+ 만) ═══ */}
        <KakaoBox />

        {/* ═══ col 4: 응급 케어 알림 (lg+ 만) ═══ */}
        <CareAlert />
      </div>
    </div>
  );
}

/* ─── col 1: 환자 리스트 사이드바 ─── */
function PatientSidebar() {
  return (
    <aside className="w-[150px] sm:w-[170px] shrink-0 border-r border-slate-100 bg-slate-50/40 flex flex-col">
      <div className="px-3 pt-3 pb-2">
        <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase">
          오늘 환자분
        </div>
      </div>
      <div className="flex-1 overflow-hidden px-1.5">
        {PATIENT_LIST.map((p) => (
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
                className={`text-[8px] font-semibold px-1 py-0.5 rounded leading-none ${p.chipBg} ${p.chipFg}`}
              >
                {p.chip}
              </span>
              <span className="ml-auto text-[9px] text-slate-400">
                {p.time}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-1">
              <p className="text-[10px] text-slate-500 truncate flex-1">
                {p.detail}
              </p>
              {p.badge ? (
                <span
                  className="shrink-0 inline-flex items-center justify-center min-w-[14px] h-[14px] px-1 rounded-full text-[9px] font-semibold text-white"
                  style={{ backgroundColor: BRAND_BLUE }}
                >
                  {p.badge}
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}

/* ─── col 3: 카톡 메시지 박스 (lg+ 만, 정적) ─── */
function KakaoBox() {
  return (
    <aside className="hidden lg:flex flex-col w-[210px] shrink-0 border-l border-slate-100 bg-slate-50/30">
      <div className="flex items-center gap-2 px-3 pt-3 pb-2 border-b border-slate-100 bg-white">
        <div
          className="flex size-6 items-center justify-center rounded-full"
          style={{ backgroundColor: KAKAO_YELLOW + "55" }}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-3.5 text-slate-700"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.88 5.32 4.71 6.73-.16.57-.58 2.07-.67 2.39-.11.4.15.39.31.28.13-.08 2.04-1.38 2.86-1.93.92.14 1.86.21 2.79.21 5.52 0 10-3.58 10-8C22 6.58 17.52 3 12 3z" />
          </svg>
        </div>
        <div className="leading-tight">
          <p className="text-[10px] font-semibold text-slate-800">
            홍서연 · 카톡
          </p>
          <p className="text-[8px] text-slate-500">스마일성형외과</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-1.5 px-2.5 pt-2 pb-2.5 overflow-hidden">
        {KAKAO_MESSAGES.map((m, i) =>
          m.from === "patient" ? (
            <div key={i} className="flex justify-end">
              <div
                className="max-w-[160px] rounded-xl rounded-tr-sm px-2 py-1.5 text-[9.5px] leading-[1.35] text-slate-900"
                style={{ backgroundColor: KAKAO_YELLOW }}
              >
                {m.text}
              </div>
            </div>
          ) : (
            <div key={i} className="flex justify-start">
              <div className="max-w-[165px] rounded-xl rounded-tl-sm px-2 py-1.5 text-[9.5px] leading-[1.35] bg-white text-slate-800 ring-1 ring-slate-100">
                {m.text}
              </div>
            </div>
          ),
        )}
      </div>

      <div className="flex items-center gap-1.5 border-t border-slate-100 bg-white px-2 py-1.5">
        <div className="flex-1 rounded-full bg-slate-50 px-2.5 py-1 text-[8px] text-slate-400 ring-1 ring-slate-100">
          메시지를 입력하세요
        </div>
        <div
          className="flex size-5 items-center justify-center rounded-full"
          style={{ backgroundColor: KAKAO_YELLOW }}
        >
          <svg
            viewBox="0 0 24 24"
            className="size-3 text-slate-700"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden="true"
          >
            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </div>
      </div>
    </aside>
  );
}

/* ─── col 4: 응급 케어 알림 (lg+ 만, 정적) ─── */
function CareAlert() {
  return (
    <aside className="hidden lg:flex flex-col w-[190px] shrink-0 border-l border-slate-100 p-3.5">
      <div className="text-[10px] font-semibold text-slate-400 tracking-wider uppercase mb-3">
        케어 노트 — D+7
      </div>

      {/* 환자 헤더 (응급 indicator) */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-100">
        <div className="flex-1 min-w-0">
          <div className="text-[12px] font-semibold text-slate-900 truncate">
            홍서연
          </div>
          <div className="text-[9px] text-slate-500">눈밑지방재배치</div>
        </div>
        <span
          className="w-2 h-2 rounded-full shrink-0"
          style={{ backgroundColor: TONE_MAP.rose.fg }}
          aria-label="응급"
        />
      </div>

      {/* mini 타임라인 */}
      <div className="relative pl-3 flex-1 space-y-2.5">
        <div className="absolute left-[4px] top-1 bottom-1 w-px bg-slate-200" />
        {CARE_TIMELINE.map((t) => (
          <div key={t.day} className="relative">
            <span
              className="absolute -left-[8px] top-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: TONE_MAP[t.tone].fg }}
            />
            <div className="flex items-center gap-1.5 mb-0.5">
              <span className="text-[10px] font-semibold text-slate-700">
                {t.day}
              </span>
              <span
                className="px-1 py-0.5 rounded text-[8px] font-semibold leading-none"
                style={{
                  backgroundColor: TONE_MAP[t.tone].bg,
                  color: TONE_MAP[t.tone].fg,
                }}
              >
                {t.status}
              </span>
            </div>
            <p className="text-[9.5px] text-slate-500 leading-snug">{t.note}</p>
          </div>
        ))}
      </div>

      {/* 의료진 확인 알림 */}
      <div
        className="mt-3 rounded-lg p-2.5 flex items-center gap-1.5"
        style={{ backgroundColor: BRAND_BLUE_FAINT }}
      >
        <Stethoscope className="w-3.5 h-3.5 shrink-0" style={{ color: BRAND_BLUE }} />
        <span
          className="text-[10px] font-semibold leading-tight"
          style={{ color: BRAND_BLUE }}
        >
          의료진 확인 1건
        </span>
      </div>
    </aside>
  );
}
