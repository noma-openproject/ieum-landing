import React from "react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";
import HeroAnimatedMain from "./HeroAnimatedMain";

/* ═══════════════════════════════════════════════════════════════════
   MockHeroComposite — Hero 우측 합성 목업
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   • 좌측: 데스크톱 대시보드
       1) 윈도우 크롬 (상단 빨강·노랑·초록 점)
       2) 사이드바 — 오늘 환자분 리스트 (PATIENT_LIST 상수로 관리)
       3) 메인 패널 — 단계 탭 + HeroAnimatedMain (5단계 자동 애니메이션)
   • 우측: 카카오톡 스타일 모바일 폰 (lg 이상에서만 노출, KAKAO_MESSAGES)

   ▎이 mock 안의 카피를 수정하고 싶다면?
   ─────────────────────────────────────────────────────────────────
   이 mock의 텍스트는 lib/copy.ts 에 없습니다 — 데모용 가공 데이터.
     · 사이드바 환자 리스트 → 아래 PATIENT_LIST 상수
     · 카톡 메시지 → 아래 KAKAO_MESSAGES 상수
     · 메인 패널의 카드/인디케이터 → HeroAnimatedMain.tsx 안

   ▎애니메이션 동작
   ─────────────────────────────────────────────────────────────────
   메인 패널은 HeroAnimatedMain 컴포넌트가 담당. Framer Motion으로
   6초 주기 5단계 자동 재생 (Step 1 분석 중 → Step 4 카드 등장 → Reset).
   carousel·폰 fade keyframe 폐기됨 (이전 버전 → 단일 컴포넌트로 통합).

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/Hero.tsx 의 SmartMock fallback.
   PNG/MP4 사용 시(constants.ts SCREENSHOTS.consultCoach 채움)
   이 mock 무시되고 미디어 파일이 보임.
   ═══════════════════════════════════════════════════════════════════ */

const KAKAO_YELLOW = "#FEE500";

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
];

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

export default function MockHeroComposite() {
  return (
    <div className="relative">
      {/* ============ 데스크톱 대시보드 ============ */}
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

        <div className="flex h-[380px] sm:h-[420px]">
          {/* 사이드바 — 환자 리스트 */}
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

          {/* 메인 패널 — 단계 탭 + HeroAnimatedMain (자동 5단계 애니메이션) */}
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

            {/* 환자 헤더 + 인디케이터 + 카드 영역 (Framer Motion 자동 애니메이션) */}
            <div className="flex-1 min-h-0">
              <HeroAnimatedMain />
            </div>
          </main>
        </div>
      </div>

      {/* ============ 모바일 카톡 폰 (lg 이상에서만, 항상 노출) ============ */}
      <div
        className="hidden lg:block absolute -right-48 -bottom-12 w-[200px] select-none pointer-events-none"
        aria-hidden="true"
      >
        <div className="relative bg-white rounded-[28px] p-1.5 shadow-2xl shadow-black/20 ring-1 ring-slate-900/10">
          {/* 노치 */}
          <div className="absolute left-1/2 top-1.5 -translate-x-1/2 z-20 h-[16px] w-[64px] rounded-b-xl bg-white" />
          <div className="relative overflow-hidden rounded-[22px] bg-white">
            {/* 헤더 */}
            <div className="relative z-10 flex items-center gap-2 border-b border-slate-100 bg-white px-3 pb-2 pt-6">
              <div
                className="flex size-7 items-center justify-center rounded-full"
                style={{ backgroundColor: KAKAO_YELLOW + "55" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-4 text-slate-700"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 3C6.48 3 2 6.58 2 11c0 2.83 1.88 5.32 4.71 6.73-.16.57-.58 2.07-.67 2.39-.11.4.15.39.31.28.13-.08 2.04-1.38 2.86-1.93.92.14 1.86.21 2.79.21 5.52 0 10-3.58 10-8C22 6.58 17.52 3 12 3z" />
                </svg>
              </div>
              <div className="leading-tight">
                <p className="text-[10px] font-semibold text-slate-800">
                  스마일성형외과
                </p>
                <p className="text-[8px] text-slate-500">실장님 응대</p>
              </div>
            </div>

            {/* 메시지 영역 */}
            <div className="flex flex-col gap-1.5 bg-slate-50 px-2.5 pt-2 pb-2.5">
              {KAKAO_MESSAGES.map((m, i) =>
                m.from === "patient" ? (
                  <div key={i} className="flex justify-end">
                    <div
                      className="max-w-[150px] rounded-xl rounded-tr-sm px-2 py-1.5 text-[9.5px] leading-[1.35] text-slate-900"
                      style={{ backgroundColor: KAKAO_YELLOW }}
                    >
                      {m.text}
                    </div>
                  </div>
                ) : (
                  <div key={i} className="flex justify-start">
                    <div className="max-w-[155px] rounded-xl rounded-tl-sm px-2 py-1.5 text-[9.5px] leading-[1.35] bg-white text-slate-800 ring-1 ring-slate-100">
                      {m.text}
                    </div>
                  </div>
                ),
              )}
            </div>

            {/* 입력 바 */}
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
          </div>
        </div>
      </div>
    </div>
  );
}
