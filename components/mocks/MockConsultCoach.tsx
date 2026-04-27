import React from "react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   MockConsultCoach — 0.1 CONSULT COACH 3 stage mock
   ═══════════════════════════════════════════════════════════════════
   ▎구성
   ─────────────────────────────────────────────────────────────────
   FeatureConsultCoach 섹션의 stage 1/2/3 영역에서 SmartMock fallback.
   stage prop(1|2|3)에 따라 다른 콘텐츠 렌더:
     · stage=1: 1차 온라인 상담 — AI 가이드 카드 3개 + 녹음 중 표시
     · stage=2: 2차 현장 — 자동 정리 4필드 + 원장 인계 박스
     · stage=3: 3차 진료실 — 환자분 통합 타임라인 + 진료 스크립트
   prop 없이 호출하면 stage=1 (기본값).

   ▎구조
   ─────────────────────────────────────────────────────────────────
   상단:   단계 탭 (1차/2차/3차) — TAB_LABELS · TAB_ORDER
   중간:   환자 헤더 (PatientHeader) — stage별 우측 상태 다름
   하단:   stage별 본문 (Stage1Body / Stage2Body / Stage3Body)

   ▎이 mock 안의 카피를 수정하고 싶다면?
   ─────────────────────────────────────────────────────────────────
   이 mock의 텍스트는 lib/copy.ts 에 없습니다 — 데모용 가공 데이터.
     · 환자 이름·시술명 → PatientHeader 함수 안에서 수정
     · stage별 카드 본문 → Stage1Body / Stage2Body / Stage3Body 안 수정
     · stage별 우측 상태 텍스트(녹음 중/녹화 중/입실 직전) → PatientHeader 의 right 객체

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   components/sections/FeatureConsultCoach.tsx 의 SmartMock fallback.
   PNG(constants.ts SCREENSHOTS.consultCoach 또는 stage.image) 채우면
   이 mock 무시되고 PNG 가 보임.
   ═══════════════════════════════════════════════════════════════════ */

type StageVariant = 1 | 2 | 3;

const TAB_LABELS: Record<StageVariant, string> = {
  1: "1차 온라인 상담",
  2: "2차 오프라인 현장",
  3: "3차 원장님 상담",
};

const TAB_ORDER: StageVariant[] = [1, 2, 3];

export default function MockConsultCoach({
  stage = 1,
}: {
  stage?: StageVariant;
} = {}) {
  return (
    <WindowFrame title="이음 · 상담 코치">
      {/* 단계 탭 */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-100 pb-3">
        {TAB_ORDER.map((s) => {
          const active = s === stage;
          return (
            <div
              key={s}
              className={
                active
                  ? "px-3 py-1.5 rounded-md text-xs font-semibold"
                  : "px-3 py-1.5 text-xs text-slate-400"
              }
              style={
                active
                  ? {
                      backgroundColor: BRAND_BLUE_FAINT,
                      color: BRAND_BLUE,
                    }
                  : {}
              }
            >
              {TAB_LABELS[s]}
            </div>
          );
        })}
      </div>

      {/* 환자 헤더 (모든 stage 공통, 우측만 stage별로 다름) */}
      <PatientHeader stage={stage} />

      {/* stage별 본문 */}
      {stage === 1 && <Stage1Body />}
      {stage === 2 && <Stage2Body />}
      {stage === 3 && <Stage3Body />}
    </WindowFrame>
  );
}

function PatientHeader({ stage }: { stage: StageVariant }) {
  const right: Record<StageVariant, React.ReactNode> = {
    1: (
      <div className="flex items-center gap-2 text-xs font-medium text-rose-500">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
        </span>
        정리 중 08:23
      </div>
    ),
    2: (
      <div className="flex items-center gap-2 text-xs font-medium text-emerald-600">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        현장 정리 03:42
      </div>
    ),
    3: (
      <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
        <span className="w-2 h-2 rounded-full bg-slate-400" />
        진료실 입실 직전
      </div>
    ),
  };

  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 mb-4">
      <div>
        <div className="text-sm font-semibold text-slate-900 tracking-tight">
          홍서연
        </div>
        <div className="text-[11px] text-slate-500 mt-0.5">
          눈밑지방재배치 · P-F9A1279B
        </div>
      </div>
      {right[stage]}
    </div>
  );
}

/* Stage 1 — 1차 온라인 상담: AI 응대 가이드 카드 3개 */
function Stage1Body() {
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 p-3.5">
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-1.5">
          환자의 핵심 요구 사항 요약
        </div>
        <p className="text-[13px] text-slate-700 leading-relaxed">
          다크서클·애교살 라인 자연스럽게, 회복 기간 최소화를 원함.
        </p>
      </div>
      <div
        className="rounded-xl border p-3.5"
        style={{ borderColor: BRAND_BLUE_FAINT, backgroundColor: "#F8FBFF" }}
      >
        <div
          className="text-[11px] font-semibold tracking-wider mb-1.5"
          style={{ color: BRAND_BLUE }}
        >
          권장 멘트
        </div>
        <p className="text-[13px] text-slate-800 leading-relaxed">
          &ldquo;재배치로 하시면 꺼짐 없이 자연스럽게 마무리됩니다.&rdquo;
        </p>
      </div>
      <div className="rounded-xl border border-slate-200 p-3.5">
        <div className="text-[11px] font-semibold text-rose-500 tracking-wider mb-1.5">
          피해야 할 말
        </div>
        <p className="text-[13px] text-slate-600 leading-relaxed">
          타 병원 시술 결과와 직접 비교하는 표현은 삼가주세요.
        </p>
      </div>
    </div>
  );
}

/* Stage 2 — 2차 오프라인 현장: 자동 정리된 응답 + 원장 인계 박스 */
function Stage2Body() {
  const fields = [
    { label: "방문 목적", value: "다크서클 + 애교살 라인 정리" },
    { label: "가장 큰 걱정", value: "회복 기간 (5일 안에 출근 복귀)" },
    { label: "예산 범위", value: "200만 원 이내" },
    { label: "결정 우선순위", value: "자연스러움 > 빠른 회복" },
  ];
  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-slate-200 divide-y divide-slate-100">
        {fields.map((f) => (
          <div key={f.label} className="flex items-start gap-3 px-3.5 py-2.5">
            <div className="text-[11px] font-semibold text-slate-400 tracking-wider w-[68px] shrink-0 pt-[2px]">
              {f.label}
            </div>
            <div className="text-[13px] text-slate-700 leading-snug">
              {f.value}
            </div>
          </div>
        ))}
      </div>
      <div
        className="rounded-xl border p-3.5"
        style={{ borderColor: BRAND_BLUE_FAINT, backgroundColor: "#F8FBFF" }}
      >
        <div
          className="text-[11px] font-semibold tracking-wider mb-1.5"
          style={{ color: BRAND_BLUE }}
        >
          원장님 인계 한 줄 요약
        </div>
        <p className="text-[13px] text-slate-800 leading-relaxed">
          자연스러움과 빠른 회복 두 가지 모두 중요. 재배치 추천 시 회복 일정
          먼저 안내해 주세요.
        </p>
      </div>
    </div>
  );
}

/* Stage 3 — 3차 원장님 진료실: 환자분 통합 타임라인 + 진료 스크립트 미리보기 */
function Stage3Body() {
  const timeline = [
    { date: "3/1", channel: "카톡", note: "다크서클 상담 문의" },
    {
      date: "3/2",
      channel: "통화",
      note: "1차 응대 · 시술 종류 안내 (08:23)",
    },
    {
      date: "3/5",
      channel: "현장",
      note: "2차 상담 · 재배치 방향 결정",
      highlight: true,
    },
    { date: "오늘", channel: "진료", note: "원장님 상담 예정" },
  ];

  return (
    <div className="space-y-3">
      {/* 통합 타임라인 */}
      <div className="rounded-xl border border-slate-200 p-3">
        <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-2">
          환자분 통합 타임라인
        </div>
        <div className="relative pl-3.5 space-y-2">
          <div className="absolute left-[5px] top-1 bottom-1 w-px bg-slate-200" />
          {timeline.map((t) => (
            <div key={t.date + t.channel} className="relative">
              <span
                className="absolute -left-[10px] top-1.5 w-2 h-2 rounded-full"
                style={{
                  backgroundColor: t.highlight ? BRAND_BLUE : "#CBD5E1",
                }}
              />
              <div className="flex items-baseline gap-2">
                <span className="text-[11px] font-semibold text-slate-500 w-7 shrink-0">
                  {t.date}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                  {t.channel}
                </span>
                <span
                  className={`text-[12px] leading-snug ${
                    t.highlight
                      ? "font-semibold text-slate-900"
                      : "text-slate-600"
                  }`}
                >
                  {t.note}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 진료 스크립트 박스 */}
      <div
        className="rounded-xl border p-3.5"
        style={{ borderColor: BRAND_BLUE_FAINT, backgroundColor: "#F8FBFF" }}
      >
        <div
          className="text-[11px] font-semibold tracking-wider mb-1.5"
          style={{ color: BRAND_BLUE }}
        >
          오늘 강조하실 포인트
        </div>
        <p className="text-[13px] text-slate-800 leading-relaxed">
          회복 5일 안에 출근하셔야 한다는 점이 가장 큰 걱정. 자연스러움은
          기본이고, 일정부터 안심시켜드리는 게 핵심이에요.
        </p>
      </div>
    </div>
  );
}
