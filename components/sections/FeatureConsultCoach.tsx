"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import Reveal from "../primitives/Reveal";
import SectionLabel from "../primitives/SectionLabel";
import SmartMock from "../primitives/SmartMock";
import MockConsultCoach from "../mocks/MockConsultCoach";
import {
  BRAND_BLUE,
  BRAND_BLUE_DARK,
  BRAND_BLUE_FAINT,
  SCREENSHOTS,
} from "../constants";

type TabStatus = "ready" | "pilot";

type ConsultTab = {
  id: string;
  label: string;
  heading: string[];
  body: string;
  checklist: { text: string; status: TabStatus }[];
};

// Phase 1 재시도: 1/2/3차 탭별 실제 제품 스크린샷 매핑.
// activeTab === stage{N} 일 때 해당 PNG 노출. 매칭 실패 시 기존 consult-coach.png fallback.
const STAGE_IMAGES: Record<string, string> = {
  stage1: "/screenshots/consult-coach-stage1.png",
  stage2: "/screenshots/consult-coach-stage2.png",
  stage3: "/screenshots/consult-coach-stage3.png",
};

const CONSULT_TABS: ConsultTab[] = [
  {
    id: "stage1",
    label: "1차 · 온라인 상담",
    heading: [
      "통화와 문의를 디지털로 정리해",
      "환자만을 위한 준비를 이어드려요",
    ],
    body: "콜 녹취와 예약 문의를 AI가 듣고 정리해, 실장님 손에는 그 환자만을 위한 상담 준비가 이미 들려 있어요.",
    checklist: [
      { text: "통화 녹음 업로드 또는 실시간 녹음 전사", status: "ready" },
      { text: "방문 목적·걱정·예산 자동 정리", status: "ready" },
      { text: "환자별 맞춤 질문 10개 자동 생성", status: "ready" },
      { text: "콜센터 통화 패턴 분석", status: "pilot" },
    ],
  },
  {
    id: "stage2",
    label: "2차 · 오프라인 현장",
    heading: ["1차 데이터 그대로,", "현장 상담으로 이어드려요"],
    body: "1차에서 파악한 환자 정보가 2차 화면에 그대로 떠요. 환자가 원하는 모습과 실제 얼굴을 나란히 보며 설명하면, 만족도는 올라가고 불만은 줄어듭니다.",
    checklist: [
      { text: "1차 상담에서 파악한 환자 정보 자동 연결", status: "ready" },
      {
        text: "연예인 기대 사진 vs 실제 환자 사진 동시 비교",
        status: "ready",
      },
      { text: "오버랩 캔버스 (투명도·회전·캡처)", status: "ready" },
      { text: "현장 녹음 자동 분석", status: "ready" },
    ],
  },
  {
    id: "stage3",
    label: "3차 · 원장님 상담",
    heading: ["원장님의 전문성,", "환자에게 닿게 이어드려요"],
    body: "원장님의 지식을 대체하지 않습니다. 닿게 도와드릴 뿐이에요. 1·2차에서 파악한 환자 걱정·예산·기대에 맞춰 마케팅 용어와 의학 근거가 균형 잡힌 스크립트를 준비해드려요.",
    checklist: [
      { text: "1차 + 2차 데이터 통합 스크립트 자동 생성", status: "ready" },
      {
        text: "실제 대사 + 환자 반응 + 물리 액션 5개 섹션",
        status: "ready",
      },
      { text: "연예인 유도 질문 자동 삽입", status: "ready" },
      { text: "인라인 이미지 갤러리 + 오버랩 캔버스", status: "ready" },
    ],
  },
];

export default function FeatureConsultCoach() {
  const [activeTab, setActiveTab] = useState<string>(CONSULT_TABS[0].id);
  const current =
    CONSULT_TABS.find((t) => t.id === activeTab) ?? CONSULT_TABS[0];

  return (
    <section className="py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-center">
        <div className="lg:col-span-6 lg:order-1">
          <Reveal>
            <SectionLabel index="0.1">CONSULT COACH</SectionLabel>
          </Reveal>

          {/* 탭 버튼 */}
          <Reveal delay={40}>
            <div
              role="tablist"
              aria-label="상담 단계"
              className="flex gap-2 mb-7 overflow-x-auto whitespace-nowrap"
            >
              {CONSULT_TABS.map((tab) => {
                const isActive = tab.id === activeTab;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-4 py-2.5 rounded-full text-sm font-medium tracking-tight transition flex-shrink-0"
                    style={
                      isActive
                        ? { backgroundColor: BRAND_BLUE, color: "#FFFFFF" }
                        : {
                            backgroundColor: BRAND_BLUE_FAINT,
                            color: BRAND_BLUE_DARK,
                          }
                    }
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* Heading */}
          <Reveal delay={80}>
            <h2 className="font-display text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.02em] font-extrabold text-slate-900">
              {current.heading.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < current.heading.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </Reveal>

          {/* Body */}
          <Reveal delay={160}>
            <p className="mt-6 text-[15.5px] text-slate-600 leading-[1.8]">
              {current.body}
            </p>
          </Reveal>

          {/* Checklist */}
          <Reveal delay={240}>
            <ul className="mt-8 space-y-3">
              {current.checklist.map((item) => (
                <li key={item.text} className="flex items-start gap-3">
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
                    {item.text}
                    {item.status === "pilot" && (
                      <span
                        className="ml-2 text-xs italic"
                        style={{ color: "#6B7280" }}
                      >
                        · 파일럿 협력 병원과 함께 개발 중
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:order-2">
          <Reveal delay={100}>
            <SmartMock
              screenshot={STAGE_IMAGES[activeTab] ?? SCREENSHOTS.consultCoach}
              fallback={<MockConsultCoach />}
              alt={`이음 상담 코치 ${current.label} 화면`}
            />
          </Reveal>
        </div>
      </div>

      {/* 탭 공통 하단 문구 */}
      <div className="max-w-6xl mx-auto px-6 mt-10 lg:mt-14 text-center">
        <Reveal delay={320}>
          <p className="text-sm leading-[1.8]" style={{ color: "#6B7280" }}>
            <strong style={{ color: BRAND_BLUE_DARK }}>누구든</strong>
            {" — 소극적이든 적극적이든, 경력 10년이든 첫날이든."}
            <br />
            {"전환율을 올리는 데 필요한 준비는 이음이 이어드려요."}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
