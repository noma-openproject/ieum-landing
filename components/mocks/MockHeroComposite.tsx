import React from "react";
import { Check, X } from "lucide-react";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockHeroComposite — Hero 우측 합성 목업
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   • 좌측: 데스크톱 대시보드
       1) 윈도우 크롬 (상단 빨강·노랑·초록 점)
       2) 사이드바 — 오늘 환자분 리스트 (PATIENT_LIST 상수로 관리)
       3) 메인 패널 — 단계 탭 + 환자 헤더 + 자동 carousel
          · Screen 1: AI 가이드 카드 3개 (요구·권장·피해야 할 말)
          · Screen 2: 환자분 시나리오 (발화 → 권장/피해야 할 응답)
   • 우측: 카카오톡 스타일 모바일 폰 (lg 이상에서만 노출, KAKAO_MESSAGES)

   ▎이 mock 안의 카피를 수정하고 싶다면?
   ─────────────────────────────────────────────────────────────────
   이 mock의 텍스트는 lib/copy.ts 에 없습니다 — 데모용 가공 데이터
   라서 이 파일 안에 직접 작성되어 있어요. 수정하고 싶다면:
     · 사이드바 환자 리스트 → 아래 PATIENT_LIST 상수 수정
     · 카톡 메시지 → 아래 KAKAO_MESSAGES 상수 수정
     · Screen 1 본문 → Screen1() 함수 안 카드 텍스트 수정
     · Screen 2 시나리오 → Screen2() 함수 안 카드 텍스트 수정

   ▎carousel 동작
   ─────────────────────────────────────────────────────────────────
   12초 주기로 Screen 1 ↔ Screen 2 가로 슬라이드 전환.
   카톡 폰도 동기화되어 Screen 2 시점엔 fade out 됨.
   keyframe 정의는 app/globals.css 의 .mock-hero-track / .mock-hero-phone.

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/Hero.tsx 에서 SmartMock 의 fallback 으로 사용.
   PNG 스크린샷 사용 시(constants.ts SCREENSHOTS.consultCoach 채움)
   이 mock 은 무시되고 PNG 가 보임.
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

          {/* 메인 — 1차 상담 코치 (탭 + 환자 헤더 + 자동 carousel 콘텐츠) */}
          <main className="flex-1 min-w-0 p-4 overflow-hidden flex flex-col">
            {/* 단계 탭 */}
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

            {/* 환자 헤더 (녹음 중 표시 제거됨) */}
            <div className="rounded-lg bg-slate-50 px-3 py-2 mb-3">
              <div className="text-[12px] font-semibold text-slate-900 leading-tight">
                홍서연
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">
                눈밑지방재배치 · P-F9A1279B
              </div>
            </div>

            {/* 자동 carousel 영역 — 가로 트랙이 슬라이드해서 한 번에 한 화면만 보임 */}
            <div className="relative flex-1 min-h-0 overflow-hidden">
              <div className="mock-hero-track flex h-full">
                <div className="w-1/2 shrink-0 pr-1">
                  <Screen1 />
                </div>
                <div className="w-1/2 shrink-0 pl-1">
                  <Screen2 />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* ============ 모바일 카톡 폰 (lg 이상에서만) ============ */}
      {/* mock-hero-phone: carousel과 동기화 — Screen 1 시점만 보이고 Screen 2 시점엔 fade out */}
      <div
        className="mock-hero-phone hidden lg:block absolute -right-6 -bottom-10 w-[210px] select-none pointer-events-none"
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

/* Screen 1 — AI 가이드 카드 3개 (요구·권장·피해야 할 말, 작은 카드 3개) */
function Screen1() {
  return (
    <div className="space-y-2">
      <div className="rounded-lg border border-slate-200 p-2.5">
        <div className="text-[9px] font-semibold text-slate-400 tracking-wider mb-1">
          환자분 핵심 요구
        </div>
        <p className="text-[11px] text-slate-700 leading-snug">
          다크서클·애교살 자연스럽게, 회복기간 최소화 원함.
        </p>
      </div>
      <div
        className="rounded-lg border p-2.5"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div
          className="text-[9px] font-semibold tracking-wider mb-1"
          style={{ color: BRAND_BLUE }}
        >
          권장 멘트
        </div>
        <p className="text-[11px] text-slate-800 leading-snug">
          &ldquo;재배치로 하시면 꺼짐 없이 자연스럽게 마무리됩니다.&rdquo;
        </p>
      </div>
      <div className="rounded-lg border border-slate-200 p-2.5">
        <div className="text-[9px] font-semibold text-rose-500 tracking-wider mb-1">
          피해야 할 말
        </div>
        <p className="text-[11px] text-slate-600 leading-snug">
          타 병원 시술 결과와 직접 비교하는 표현은 삼가주세요.
        </p>
      </div>
    </div>
  );
}

/* Screen 2 — 환자분 시나리오 형태 (환자 발화 + 권장 응답 큰 카드 + 피해야 할 응답 큰 카드) */
function Screen2() {
  return (
    <div className="space-y-2.5">
      {/* 환자 발화 */}
      <div className="rounded-lg bg-slate-100 px-3 py-2">
        <div className="text-[9px] font-semibold text-slate-500 tracking-wider mb-1">
          환자분이 이렇게 물으시면…
        </div>
        <p className="text-[12px] text-slate-800 leading-snug font-medium">
          &ldquo;다른 병원에서는 30만 원에 해준다는데, 여기는 왜 비싸요?&rdquo;
        </p>
      </div>

      {/* 권장 응답 — 큰 카드 */}
      <div
        className="rounded-lg border p-2.5"
        style={{
          borderColor: BRAND_BLUE_FAINT,
          backgroundColor: "#F8FBFF",
        }}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <span
            className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </span>
          <span
            className="text-[10px] font-semibold tracking-wider"
            style={{ color: BRAND_BLUE }}
          >
            이렇게 응대해 보세요
          </span>
        </div>
        <p className="text-[11.5px] text-slate-800 leading-snug">
          &ldquo;병원마다 사용하는 약품과 시술 디테일이 달라서 단순 비교가
          어려워요. 환자분께 맞는 방식부터 같이 봐드릴게요.&rdquo;
        </p>
      </div>

      {/* 피해야 할 응답 — 큰 카드 */}
      <div className="rounded-lg border border-rose-100 bg-rose-50/40 p-2.5">
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-rose-500">
            <X className="w-2.5 h-2.5 text-white" strokeWidth={3} />
          </span>
          <span className="text-[10px] font-semibold tracking-wider text-rose-500">
            이 답변은 피하세요
          </span>
        </div>
        <p className="text-[11.5px] text-slate-700 leading-snug">
          &ldquo;거기는 그 가격에 그만큼만 해주는 거예요.&rdquo;
        </p>
      </div>
    </div>
  );
}
