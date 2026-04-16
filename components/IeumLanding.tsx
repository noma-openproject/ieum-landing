"use client";

import React, { useState, useEffect, useRef } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Check,
  ArrowRight,
  Sparkles,
  Building2,
  TrendingUp,
  Link2,
  Plus,
  Minus,
  MessageCircle,
  Stethoscope,
  QrCode,
  Menu,
  X,
} from "lucide-react";

/* =========================================================
   이음 (ieum) 소개페이지 (v1)
   - 톤: Afterdoc 단정형 카피 + Laney 정제 레이아웃
   - 컬러: 이음 Blue #1E6FD9 (dominant) + Slate neutrals
   - 폰트: Pretendard Variable (한글) + Manrope (영문/숫자)
   ========================================================= */

const BRAND_BLUE = "#1E6FD9";
const BRAND_BLUE_DARK = "#1558B5";
const BRAND_BLUE_FAINT = "#E8F1FC";

/* -------- 연락 채널 설정 --------
   실제 운영 시 이 객체만 교체하면 전체 CTA가 업데이트됨.
   모든 값이 비어있으면 CTA 버튼이 자동으로 숨겨짐.

   우선순위: demoFormUrl > kakaoChannelUrl > email
   - demoFormUrl: Tally / Typeform / Google Form 등 외부 폼 링크 (권장)
   - kakaoChannelUrl: 카카오톡 채널 1:1 채팅 URL
   - email: 지정 시 mailto: 링크 생성
*/
const CONTACT = {
  demoFormUrl: "", // 외부 폼 생기면 최우선
  kakaoChannelUrl: "", // 카카오톡 채널 URL
  email: "idforshots@gmail.com", // 기본 연락처
  showBrochureButton: false, // 상품 소개서 PDF 준비되면 true
} as const;

function ctaHref(subject: string): string | null {
  if (CONTACT.demoFormUrl) return CONTACT.demoFormUrl;
  if (CONTACT.kakaoChannelUrl) return CONTACT.kakaoChannelUrl;
  if (CONTACT.email)
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
  return null;
}

/* -------- 실제 앱 스크린샷 (선택) --------
   값이 비어있으면 HTML 목업(MockConsultCoach 등)이 그대로 표시됨.
   PNG를 준비해 public/screenshots/ 폴더에 넣고 경로를 지정하면 자동 교체.
*/
const SCREENSHOTS = {
  consultCoach: "", // 예: "/screenshots/consult-coach.png"
  reviewBuilder: "", // 예: "/screenshots/review-builder.png"
  careNote: "", // 예: "/screenshots/care-note.png"
} as const;

/* -------- 타입 -------- */

type PainCard = { title: string; quote: string; note?: string };
type AudienceCard = {
  icon: LucideIcon;
  label: string;
  quote: string;
  body: string;
};
type FaqItem = { q: string; a: string };
type FaqCategory = { category: string; items: FaqItem[] };
type Orientation = "text-left" | "text-right";
type Tone = "amber" | "emerald" | "rose";

/* -------- 데이터 -------- */

const PAIN_CARDS: PainCard[] = [
  {
    title: "실장님이 또 그만둔 날",
    quote: "기껏 일 다 가르쳐 놨더니 또 퇴사네요. 내일 당장 상담은 누가 하죠?",
  },
  {
    title: "환자분께 후기 요청을 미룬 일주일",
    quote:
      "결제하고 바쁘게 나가시는 분 붙잡고 후기 써달라 매달리기 눈치 보여요…",
  },
  {
    title: "수술 7일째, 환자분의 전화",
    quote:
      "병원 문 닫았는데 수술 부위가 부어올라요. 원장님, 이거 부작용 아닌가요?",
  },
];

const AUDIENCE_CARDS: AudienceCard[] = [
  {
    icon: Building2,
    label: "실장님 이직이 잦은 병원",
    quote: "이번 달도 새 실장 교육 중이에요",
    body: "신입과 베테랑을 이어드려요.",
  },
  {
    icon: TrendingUp,
    label: "환자분 후기 마케팅이 어려운 병원",
    quote: "바쁘게 나가시는 분들 붙잡기가 참 민망해요",
    body: "환자의 만족과 후기를 이어드려요.",
  },
  {
    icon: Link2,
    label: "지점이 여러 개인 네트워크 병원",
    quote: "지점마다 상담 품질이 다 달라요",
    body: "지점과 지점을 같은 기준으로 이어드려요.",
  },
];

const FAQ_DATA: FaqCategory[] = [
  {
    category: "서비스",
    items: [
      {
        q: "이음은 어떤 도구인가요?",
        a: "성형·피부 클리닉 실장님의 업무(상담·후기·케어)를 AI가 유기적으로 이어주는 어시스턴트예요. 기존 CRM이 환자 기록을 ‘저장’만 했다면, 이음은 실장님이 매일 실제 업무를 ‘실행’하는 작업대랍니다.",
      },
      {
        q: "도입까지 얼마나 걸리나요?",
        a: "파일럿 기준 당일 시작 가능해요. 계정 발급 후 바로 상담 코치·후기·케어 노트를 사용하실 수 있고, 기존 환자 데이터 이관이 필요한 경우 CSV/엑셀로 1~2일 내 완료돼요.",
      },
      {
        q: "이미 쓰는 CRM이 있는데 같이 써도 되나요?",
        a: "네, 같이 쓰실 수 있어요. 이음은 환자 기록 관리 시스템이 아니라 실장님의 매일 업무 흐름을 중심으로 설계되었어요. 기존 CRM의 환자 DB는 그대로 두고, 상담 준비·후기 생성·사후 케어만 이음으로 편하게 실행만 하시면 돼요.",
      },
    ],
  },
  {
    category: "의료법 & 데이터 보안",
    items: [
      {
        q: "환자 정보가 AI에게 그대로 전달되나요?",
        a: "아니요. AI 호출 전에 환자 이름·연락처·환자번호를 자동으로 안전하게 마스킹한 뒤 전송해요. AI가 응답을 돌려주면 다시 실제 환자분 정보로 복원해 드려요.",
      },
      {
        q: "후기 기능이 의료법에 걸리지 않나요?",
        a: "의료법 27조3항(환자유인행위 금지)을 준수하도록 설계되었어요. AI는 후기 초안만 제안하고, 실장님 검토 후 환자분이 직접 본인 계정으로 게시해요. 당연히 대가성 금품도 제공하지 않고요.",
      },
      {
        q: "우리 병원 데이터가 밖으로 나가지 않나요?",
        a: "국내 클라우드에 암호화되어 보관되고, 병원별로 분리 관리돼요. AI로 전송되는 내용은 환자 식별정보가 제거된 상태라, 전체 대화 기록이 밖으로 나가지 않아요.",
      },
      {
        q: "기존 데이터를 옮겨올 수 있나요?",
        a: "네, 물론이에요. CSV·엑셀 일괄 등록을 지원해요. 기존 CRM에서 내보낸 파일을 그대로 올리시면 돼요.",
      },
    ],
  },
];

/* -------- 유틸: IntersectionObserver 기반 fade-in -------- */

function useRevealOnScroll() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useRevealOnScroll();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(16px)",
        transition: `opacity 700ms ease-out ${delay}ms, transform 700ms cubic-bezier(0.22,0.9,0.35,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* -------- 공통 UI -------- */

type ButtonProps = {
  children: React.ReactNode;
  href?: string | null;
  className?: string;
};

function PrimaryButton({ children, href, className = "" }: ButtonProps) {
  if (href === null) return null;
  const baseClassName = `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-medium tracking-tight transition shadow-sm hover:shadow ${className}`;
  const style: React.CSSProperties = { backgroundColor: BRAND_BLUE };
  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = BRAND_BLUE;
  };
  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        style={style}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={baseClassName}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, href, className = "" }: ButtonProps) {
  if (href === null) return null;
  const baseClassName = `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-sm font-medium tracking-tight transition border hover:bg-slate-50 ${className}`;
  const style: React.CSSProperties = {
    color: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  };
  if (href) {
    return (
      <a href={href} className={baseClassName} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={baseClassName} style={style}>
      {children}
    </button>
  );
}

function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="font-display text-xs tracking-[0.2em] text-slate-500">
        [ {index} ]
      </span>
      <span className="font-display text-xs tracking-[0.2em] text-slate-400">
        {children}
      </span>
    </div>
  );
}

/* -------- 제품 UI 모킹 3종 -------- */

function WindowFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        </div>
        <div className="ml-2 text-[11px] text-slate-400 font-medium tracking-tight">
          {title}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

/* SmartMock: 스크린샷 경로가 주어지면 이미지 렌더, 없으면 HTML 목업으로 폴백 */
function SmartMock({
  screenshot,
  fallback,
  alt,
}: {
  screenshot: string;
  fallback: React.ReactNode;
  alt: string;
}) {
  if (screenshot) {
    return (
      <div className="rounded-2xl overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshot}
          alt={alt}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    );
  }
  return <>{fallback}</>;
}

function MockConsultCoach() {
  return (
    <WindowFrame title="이음 · 상담 코치">
      {/* 탭 */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-100 pb-3">
        <div
          className="px-3 py-1.5 rounded-md text-xs font-semibold"
          style={{
            backgroundColor: BRAND_BLUE_FAINT,
            color: BRAND_BLUE,
          }}
        >
          1차 온라인 상담
        </div>
        <div className="px-3 py-1.5 text-xs text-slate-400">
          2차 오프라인 현장
        </div>
        <div className="px-3 py-1.5 text-xs text-slate-400">
          3차 원장님 상담
        </div>
      </div>

      {/* 환자 + 녹음 상태 */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            홍서연
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            눈밑지방재배치 · P-F9A1279B
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-rose-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          녹음 중 08:23
        </div>
      </div>

      {/* AI 결과 스니펫 */}
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
            “재배치로 하시면 꺼짐 없이 자연스럽게 마무리됩니다.”
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
    </WindowFrame>
  );
}

function MockReviewBuilder() {
  const personas = [
    { key: "20f", label: "20대 여성", tint: "#FEE2E2", color: "#DC2626" },
    { key: "30w", label: "30대 직장인", tint: "#E0E7FF", color: "#4338CA" },
    { key: "40f", label: "40대 주부", tint: "#FEF3C7", color: "#B45309" },
    { key: "30m", label: "30대 남성", tint: "#DCFCE7", color: "#166534" },
  ];

  return (
    <WindowFrame title="이음 · 후기 만들기">
      {/* 스테퍼 */}
      <div className="flex items-center gap-2 text-[11px] mb-5">
        {["시작", "질문", "말투 선택", "편집", "전달"].map((s, i) => (
          <React.Fragment key={s}>
            <span
              className={`px-2 py-1 rounded-md font-medium ${
                i <= 2 ? "text-white" : "text-slate-400 bg-slate-100"
              }`}
              style={i <= 2 ? { backgroundColor: BRAND_BLUE } : {}}
            >
              {i + 1}. {s}
            </span>
            {i < 4 && <span className="text-slate-300">—</span>}
          </React.Fragment>
        ))}
      </div>

      {/* 페르소나 4카드 */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {personas.map((p, i) => (
          <div
            key={p.key}
            className="rounded-xl border p-3 text-xs"
            style={
              i === 0
                ? {
                    borderColor: BRAND_BLUE,
                    boxShadow: `0 0 0 3px ${BRAND_BLUE_FAINT}`,
                  }
                : { borderColor: "#E2E8F0" }
            }
          >
            <div
              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold mb-1.5"
              style={{ backgroundColor: p.tint, color: p.color }}
            >
              {p.label}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {p.key === "20f" && "다들 예뻐졌다고 ㅎㅎ 진짜 만족이에요~"}
              {p.key === "30w" && "처음엔 걱정했는데 잘한 선택이었어요."}
              {p.key === "40f" && "원장님이 꼼꼼히 봐주셔서 넘 좋았어요~"}
              {p.key === "30m" && "확실히 달라짐. 설명 잘 해줘서 믿고 맡김."}
            </p>
          </div>
        ))}
      </div>

      {/* QR + 딥링크 바 */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
        <div
          className="w-14 h-14 rounded-md flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: BRAND_BLUE_FAINT }}
        >
          <QrCode className="w-7 h-7" style={{ color: BRAND_BLUE }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-slate-500 mb-0.5">
            환자 전달 링크
          </div>
          <div className="text-xs text-slate-700 truncate font-mono">
            ieum.co/r/RREQ-30FEF3DC…
          </div>
          <div className="flex gap-1.5 mt-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
              네이버 플레이스
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
              카카오맵
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
              강남언니
            </span>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

function MockCareNote() {
  const items: { day: string; status: string; tone: Tone; note: string }[] = [
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
  const toneMap: Record<Tone, { bg: string; fg: string }> = {
    amber: { bg: "#FEF3C7", fg: "#B45309" },
    emerald: { bg: "#DCFCE7", fg: "#166534" },
    rose: { bg: "#FFE4E6", fg: "#BE123C" },
  };

  return (
    <WindowFrame title="이음 · 케어 노트">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            홍서연
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            눈밑지방재배치 · 수술 후 7일차
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">
          환자 업로드 3건
        </div>
      </div>

      {/* 타임라인 */}
      <div className="relative pl-4">
        <div className="absolute left-[6px] top-1 bottom-1 w-px bg-slate-200" />
        {items.map((it, i) => (
          <div key={it.day} className={`relative ${i > 0 ? "mt-3" : ""}`}>
            <span
              className="absolute -left-[11px] top-2.5 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: toneMap[it.tone].fg }}
            />
            <div className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-semibold text-slate-700">
                  {it.day}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                  style={{
                    backgroundColor: toneMap[it.tone].bg,
                    color: toneMap[it.tone].fg,
                  }}
                >
                  AI 트리아지 · {it.status}
                </span>
              </div>
              <p className="text-[12px] text-slate-600">{it.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-4 rounded-xl p-3 flex items-center gap-2"
        style={{ backgroundColor: BRAND_BLUE_FAINT }}
      >
        <Stethoscope className="w-4 h-4" style={{ color: BRAND_BLUE }} />
        <span
          className="text-[11px] font-semibold"
          style={{ color: BRAND_BLUE }}
        >
          의료진 확인 요청 1건
        </span>
      </div>
    </WindowFrame>
  );
}

/* -------- 섹션 컴포넌트 -------- */

function Nav() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: BRAND_BLUE }}
          >
            <Sparkles className="w-4 h-4 text-white" />
          </span>
          <span className="font-display text-base font-bold tracking-tight text-slate-900">
            이음
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition">
            기능
          </a>
          <a href="#audience" className="hover:text-slate-900 transition">
            도입 대상
          </a>
          <a href="#faq" className="hover:text-slate-900 transition">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <PrimaryButton
            href={ctaHref("이음 데모 신청")}
            className="!py-2 !px-4 text-[13px]"
          >
            데모 신청
          </PrimaryButton>
          <button
            type="button"
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 토글"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <nav className="flex flex-col py-2 text-sm text-slate-700">
            <a
              href="#features"
              className="px-6 py-3 hover:bg-slate-50 transition"
              onClick={closeMobile}
            >
              기능
            </a>
            <a
              href="#audience"
              className="px-6 py-3 hover:bg-slate-50 transition"
              onClick={closeMobile}
            >
              도입 대상
            </a>
            <a
              href="#faq"
              className="px-6 py-3 hover:bg-slate-50 transition"
              onClick={closeMobile}
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* 배경 도트 */}
      <div
        className="absolute inset-0 opacity-[0.5] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #CBD5E1 1px, transparent 0)",
          backgroundSize: "24px 24px",
          maskImage:
            "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 30% 40%, black 0%, transparent 70%)",
        }}
      />

      <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 lg:pt-28 lg:pb-32 grid lg:grid-cols-12 gap-12 items-center relative">
        <div className="lg:col-span-7">
          <Reveal>
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mb-6"
              style={{
                backgroundColor: BRAND_BLUE_FAINT,
                color: BRAND_BLUE,
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: BRAND_BLUE }}
              />
              파일럿 파트너 모집 중
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="font-display text-[40px] sm:text-5xl lg:text-[56px] leading-[1.15] tracking-[-0.03em] font-extrabold text-slate-900">
              잘하는 실장님의 하루를,
              <br />
              모든 실장님의 하루로{" "}
              <span style={{ color: BRAND_BLUE }}>이어드릴게요</span>
            </h1>
          </Reveal>

          <Reveal delay={180}>
            <p className="mt-7 text-[17px] text-slate-600 leading-[1.7] max-w-xl">
              실장님의 상담·후기·케어를 이어주는
              <br />
              <span className="font-semibold text-slate-800">
                AI 상담 어시스턴트, 이음
              </span>
            </p>
          </Reveal>

          <Reveal delay={280}>
            <div className="mt-9 flex flex-wrap gap-3">
              {CONTACT.showBrochureButton ? (
                <>
                  <PrimaryButton href={ctaHref("이음 상품 소개서 요청")}>
                    상품 소개서 받아보기
                    <ArrowRight className="w-4 h-4" />
                  </PrimaryButton>
                  <SecondaryButton href={ctaHref("이음 데모 신청")}>
                    데모 신청하기
                  </SecondaryButton>
                </>
              ) : (
                <PrimaryButton href={ctaHref("이음 데모 신청")}>
                  데모 신청하기
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
              )}
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal delay={160}>
            <div className="relative">
              <div
                className="absolute -inset-6 rounded-3xl -z-10 blur-2xl opacity-30"
                style={{
                  background:
                    "linear-gradient(135deg, #1E6FD9 0%, #8FC2FF 100%)",
                }}
              />
              <SmartMock
                screenshot={SCREENSHOTS.consultCoach}
                fallback={<MockConsultCoach />}
                alt="이음 상담 코치 화면"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ProblemIntro() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.02em] font-extrabold text-slate-900">
            원장님, 이런 장면
            <br />
            <span style={{ color: BRAND_BLUE }}>익숙하시죠?</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 text-slate-500 text-base">
            실장님도 환자도 피곤한 세 순간.
          </p>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-3 gap-5">
        {PAIN_CARDS.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 hover:border-slate-300 hover:shadow-sm transition">
              <div
                className="font-display text-4xl font-bold mb-5"
                style={{ color: BRAND_BLUE, opacity: 0.25 }}
              >
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight">
                {p.title}
              </h3>
              <blockquote
                className="mt-4 pl-4 text-[15px] text-slate-700 leading-[1.7] italic"
                style={{ borderLeft: `3px solid ${BRAND_BLUE_FAINT}` }}
              >
                “{p.quote}”
              </blockquote>
              {p.note && (
                <p className="mt-3 text-[13px] text-slate-500 leading-[1.7]">
                  {p.note}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <Reveal>
          <p className="text-[17px] text-slate-700 leading-[1.8]">
            환자 전환은 광고비가 아니라,
            <br className="md:hidden" />{" "}
            <span className="font-semibold">실장님의 실력에서 결정돼요.</span>
            <br />
            이음은 그 실력을{" "}
            <span style={{ color: BRAND_BLUE }} className="font-semibold">
              병원의 자산으로 이어드릴게요.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureBlock({
  index,
  category,
  title,
  description,
  bullets,
  mock,
  orientation = "text-left",
}: {
  index: string;
  category: string;
  title: string[];
  description: string;
  bullets: string[];
  mock: React.ReactNode;
  orientation?: Orientation;
}) {
  const textCol = orientation === "text-left" ? "lg:order-1" : "lg:order-2";
  const mockCol = orientation === "text-left" ? "lg:order-2" : "lg:order-1";
  return (
    <section className="py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-center">
        <div className={`lg:col-span-6 ${textCol}`}>
          <Reveal>
            <SectionLabel index={index}>{category}</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.02em] font-extrabold text-slate-900">
              {title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[15.5px] text-slate-600 leading-[1.8]">
              {description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: BRAND_BLUE_FAINT }}
                  >
                    <Check
                      className="w-3 h-3"
                      strokeWidth={3}
                      style={{ color: BRAND_BLUE }}
                    />
                  </span>
                  <span className="text-[14.5px] text-slate-700 leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className={`lg:col-span-6 ${mockCol}`}>
          <Reveal delay={100}>{mock}</Reveal>
        </div>
      </div>
    </section>
  );
}

function MidCTA() {
  const href = ctaHref("이음 데모 신청");
  if (!href) return null;
  return (
    <section className="py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="relative rounded-3xl overflow-hidden px-8 py-12 lg:px-14 lg:py-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
          style={{
            background: `linear-gradient(135deg, ${BRAND_BLUE} 0%, ${BRAND_BLUE_DARK} 100%)`,
          }}
        >
          {/* 장식용 빛 번짐 */}
          <div
            className="absolute -top-20 -right-20 w-80 h-80 rounded-full opacity-20 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%)",
            }}
          />
          {/* 도트는 오른쪽 영역에만 제한 (텍스트 위로 오지 않음) */}
          <div
            className="hidden md:block absolute inset-y-0 right-0 w-1/2 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 0.8px, transparent 0)",
              backgroundSize: "22px 22px",
              maskImage:
                "linear-gradient(to left, black 20%, transparent 90%)",
              WebkitMaskImage:
                "linear-gradient(to left, black 20%, transparent 90%)",
            }}
          />

          <div className="relative z-10">
            <h3 className="font-display text-2xl lg:text-[28px] tracking-[-0.02em] font-bold text-white leading-snug">
              원장님의 고민,
              <br />
              10분이면 이음에서 어떻게 풀리는지 보여드릴게요
            </h3>
          </div>
          <div className="relative z-10">
            <a
              href={href}
              className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-lg text-sm font-medium tracking-tight hover:bg-slate-50 transition whitespace-nowrap"
              style={{ color: BRAND_BLUE }}
            >
              10분 데모 신청하기
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Audience() {
  return (
    <section
      id="audience"
      className="py-24 bg-slate-50/60 border-t border-slate-100"
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="font-display text-xs tracking-[0.2em] text-slate-500 mb-4">
            {"[ WHO IT'S FOR ]"}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.02em] font-extrabold text-slate-900">
            이음이 먼저
            <br />
            닿고 싶은 병원
          </h2>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-3 gap-5">
        {AUDIENCE_CARDS.map(({ icon: Icon, label, quote, body }, i) => (
          <Reveal key={label} delay={i * 100}>
            <div className="h-full rounded-2xl bg-white border border-slate-200 p-8">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: BRAND_BLUE_FAINT }}
              >
                <Icon className="w-5 h-5" style={{ color: BRAND_BLUE }} />
              </div>
              <h3 className="text-[17px] font-bold text-slate-900 leading-snug tracking-tight">
                {label}
              </h3>
              <blockquote
                className="mt-3 pl-3 text-[14px] text-slate-600 leading-[1.7] italic"
                style={{ borderLeft: `2px solid ${BRAND_BLUE_FAINT}` }}
              >
                “{quote}”
              </blockquote>
              <p
                className="mt-4 text-[14px] leading-[1.75] font-semibold"
                style={{ color: BRAND_BLUE }}
              >
                → {body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function PilotBanner() {
  return (
    <section className="py-12 bg-slate-50/60">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 mb-2">
                PILOT PROGRAM
              </div>
              <p className="text-slate-800 text-[15px] font-semibold leading-snug">
                지금은 초기 파일럿 병원을 모집하고 있어요.
              </p>
              <p className="mt-1 text-[14px] text-slate-500">
                실장 1~2명 규모의 병원부터 함께 시작해요.
              </p>
            </div>
            <SecondaryButton
              href={ctaHref("이음 파일럿 문의")}
              className="whitespace-nowrap"
            >
              파일럿 문의하기
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");
  return (
    <section id="faq" className="py-24 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="font-display text-4xl tracking-[-0.02em] font-extrabold text-slate-900">
              FAQs
            </h2>
            <p className="mt-4 text-slate-500 text-[15px]">
              자주 묻는 질문들을 모았어요.
            </p>
            {ctaHref("이음 문의") && (
              <p className="mt-6 text-sm text-slate-500">
                더 궁금한 점이 있으세요?{" "}
                <a
                  href={ctaHref("이음 문의") ?? undefined}
                  className="font-semibold underline underline-offset-4"
                  style={{ color: BRAND_BLUE }}
                >
                  문의하기
                </a>
              </p>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {FAQ_DATA.map((cat, ci) => (
            <div key={cat.category}>
              <div
                className="font-semibold mb-3 text-[15px]"
                style={{ color: BRAND_BLUE }}
              >
                {cat.category}
              </div>
              <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                {cat.items.map((it, ii) => {
                  const key = `${ci}-${ii}`;
                  const open = openKey === key;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : key)}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="text-[15px] font-semibold text-slate-800 tracking-tight">
                          {it.q}
                        </span>
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition"
                          style={
                            open
                              ? { borderColor: BRAND_BLUE, color: BRAND_BLUE }
                              : {}
                          }
                        >
                          {open ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: open ? 1200 : 0 }}
                      >
                        <p className="pb-5 pr-10 text-[14px] text-slate-600 leading-[1.8]">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 border-t border-slate-100">
      {/* 그라디언트 배경 */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #E8F1FC 0%, #F8FBFF 50%, #EEF4FC 100%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #C7D8EF 1px, transparent 0)",
          backgroundSize: "26px 26px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, black 20%, transparent 75%)",
        }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-[42px] leading-[1.2] tracking-[-0.02em] font-extrabold text-slate-900">
            실장님의 실력이,
            <br />
            <span style={{ color: BRAND_BLUE }}>
              병원의 자산으로 이어져요
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 text-slate-600 text-[15px]">
            {CONTACT.showBrochureButton
              ? "상품 소개서와 데모를 준비해 드릴게요."
              : "10분 데모로 바로 보여드릴게요."}
          </p>
        </Reveal>
        <Reveal delay={180}>
          <div className="mt-10 flex flex-wrap gap-3 justify-center">
            {CONTACT.showBrochureButton ? (
              <>
                <PrimaryButton href={ctaHref("이음 상품 소개서 요청")}>
                  상품 소개서 받아보기
                  <ArrowRight className="w-4 h-4" />
                </PrimaryButton>
                <SecondaryButton href={ctaHref("이음 데모 신청")}>
                  데모 신청하기
                </SecondaryButton>
              </>
            ) : (
              <PrimaryButton href={ctaHref("이음 데모 신청")}>
                데모 신청하기
                <ArrowRight className="w-4 h-4" />
              </PrimaryButton>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center gap-2">
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: BRAND_BLUE }}
            >
              <Sparkles className="w-4 h-4 text-white" />
            </span>
            <span className="font-display text-base font-bold tracking-tight text-slate-900">
              이음
            </span>
          </div>
          <p className="mt-3 text-sm text-slate-500">
            실장님의 상담·후기·케어를 이어드려요
          </p>
          <p className="mt-6 text-xs text-slate-400">Noma OpenProject</p>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-3">
            PRODUCT
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#features" className="hover:text-slate-900">
                기능
              </a>
            </li>
            <li>
              <a href="#audience" className="hover:text-slate-900">
                도입 대상
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-slate-900">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-3">
            COMPANY
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#" className="hover:text-slate-900">
                이용약관
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900">
                개인정보처리방침
              </a>
            </li>
            {ctaHref("이음 문의") && (
              <li>
                <a
                  href={ctaHref("이음 문의") ?? undefined}
                  className="hover:text-slate-900"
                >
                  문의하기
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Noma OpenProject. All rights reserved.</span>
          {CONTACT.kakaoChannelUrl && (
            <span className="flex items-center gap-4">
              <a
                href={CONTACT.kakaoChannelUrl}
                className="hover:text-slate-600 inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> 카카오톡
              </a>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}

/* -------- 메인 -------- */

export default function IeumLanding() {
  return (
    <div className="bg-white text-slate-900 antialiased" id="features">
      {/* 폰트는 app/layout.tsx의 <link>로 이동; 여기는 #features 스코프만 */}
      <style>{`
        #features, #features * {
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.01em;
        }
        #features .font-display {
          font-family: 'Manrope', 'Pretendard Variable', Pretendard, sans-serif;
        }
        #features .font-mono {
          font-family: 'SF Mono', Menlo, Consolas, monospace;
        }
        #features button { cursor: pointer; }
        #features html { scroll-behavior: smooth; }
      `}</style>

      <Nav />
      <Hero />
      <ProblemIntro />

      <FeatureBlock
        index="0.1"
        category="CONSULT COACH"
        title={["베테랑의 상담을,", "신입 실장님의 첫날로 이어드려요"]}
        description="15년차 실장님의 질문 방식, 권장 멘트, 피해야 할 말. AI가 녹음을 듣고 정리해, 누구든 첫날부터 쓸 수 있게 만들어드려요."
        bullets={[
          "1차 온라인 → 2차 오프라인 현장 → 3차 원장님 상담",
          "녹음 파일 업로드 또는 실시간 녹음 30분",
          "환자별 맞춤 질문 10개 자동 생성",
          "금지 표현 → 허용 표현 자동 변환",
        ]}
        mock={
          <SmartMock
            screenshot={SCREENSHOTS.consultCoach}
            fallback={<MockConsultCoach />}
            alt="이음 상담 코치 화면"
          />
        }
        orientation="text-left"
      />

      <FeatureBlock
        index="0.2"
        category="REVIEW BUILDER"
        title={["환자분의 만족을,", "자연스러운 후기로 이어드려요"]}
        description="체크 10개만 하면 AI가 환자분 말투에 맞는 후기 초안을 만들어 드려요. 환자분이 검토하고 본인이 직접 올리시니까, 실장님은 확인만 하시면 돼요."
        bullets={[
          "4가지 페르소나 (20대 여성 / 30대 직장인 / 40대 주부 / 30대 남성)",
          "네이버 플레이스 · 카카오맵 · 강남언니 딥링크",
          "QR 코드 한 번에 전달",
          "환자 본인 계정 게시 (의료법 27조3항 준수)",
        ]}
        mock={
          <SmartMock
            screenshot={SCREENSHOTS.reviewBuilder}
            fallback={<MockReviewBuilder />}
            alt="이음 후기 만들기 화면"
          />
        }
        orientation="text-right"
      />

      <MidCTA />

      <FeatureBlock
        index="0.3"
        category="CARE NOTE"
        title={["수술이 끝난 뒤의 시간을,", "환자분에게 이어드려요"]}
        description='"원장님이 저를 계속 보고 계신 것 같아요" — 환자분이 가장 듣고 싶어 하는 말이죠. 환자분이 보낸 증상과 사진을 AI가 먼저 분류해 드리면, 원장님은 중요한 케어에만 집중하실 수 있어요.'
        bullets={[
          "환자 링크로 증상·사진 직접 업로드",
          "AI 트리아지 — 응급 · 관찰 · 정상 분류",
          "환자별 타임라인 자동 정리",
          "의료진 확인 기록 남김",
        ]}
        mock={
          <SmartMock
            screenshot={SCREENSHOTS.careNote}
            fallback={<MockCareNote />}
            alt="이음 케어 노트 화면"
          />
        }
        orientation="text-left"
      />

      <Audience />
      <PilotBanner />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
