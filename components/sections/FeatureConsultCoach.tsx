"use client";

import React from "react";
import { Check } from "lucide-react";
import Reveal from "../primitives/Reveal";
import SectionLabel from "../primitives/SectionLabel";
import SmartMock from "../primitives/SmartMock";
import MockConsultCoach from "../mocks/MockConsultCoach";
import { BRAND_BLUE, BRAND_BLUE_FAINT, SCREENSHOTS } from "../constants";

type Orientation = "text-left" | "text-right";

type ChecklistItem = {
  text: string;
  status?: "beta";
};

type ConsultStage = {
  key: string;
  caption: string;
  heading: string;
  body: string;
  checklist: ChecklistItem[];
  image: string;
  orientation: Orientation;
};

const STAGE_IMAGES: Record<string, string> = {
  stage1: "/screenshots/consult-coach-stage1.png",
  stage2: "/screenshots/consult-coach-stage2.png",
  stage3: "/screenshots/consult-coach-stage3.png",
};

const CONSULT_STAGES: ConsultStage[] = [
  {
    key: "stage1",
    caption: "1차 · 온라인 상담 / 전화·카톡",
    heading: "전화 한 통이면, 그 환자분만의 상담 준비가 끝나요",
    body: "AI가 통화와 카톡을 듣고 정리해요. 실장님은 환자 이름만 누르면 바로 상담을 시작할 수 있어요. 처음 만나는 환자분인데도, 오래 봐온 분처럼 자연스럽게 이야기가 이어집니다.",
    checklist: [
      { text: "환자분별 맞춤 질문 10개 자동 생성" },
      { text: "통화 녹음 업로드 또는 실시간 전사" },
      { text: "방문 목적·걱정·예산 자동 정리" },
      { text: "콜센터 통화 패턴 분석", status: "beta" },
    ],
    image: STAGE_IMAGES.stage1,
    orientation: "text-left",
  },
  {
    key: "stage2",
    caption: "2차 · 오프라인 현장 / 내원 당일",
    heading:
      "환자분이 의자에 앉기 전에, 실장님 손에는 그분의 이야기가 들려 있어요",
    body: `1차 상담에서 나눈 모든 이야기가 2차로 그대로 이어져요. 환자분이 어제 무엇을 걱정했고, 무엇을 듣고 싶어하셨는지 — 다시 묻지 않아도 돼요.

"내 이야기를 기억해주는 병원이네." — 환자분의 이 한마디는, 2차 상담에서 시작돼요.`,
    checklist: [
      { text: "1차 상담 내용 자동 인계" },
      { text: "환자분별 핵심 고민 카드" },
      { text: "되는말·안되는말 가이드 (병원 자체 룰북 반영)" },
    ],
    image: STAGE_IMAGES.stage2,
    orientation: "text-right",
  },
  {
    key: "stage3",
    caption: "3차 · 원장님 상담 / 진료실",
    heading: "원장님이 들어가시기 전에, 환자분의 모든 이야기가 한 화면에",
    body: `전화부터 내원까지의 모든 대화·기록·걱정·예산이 한 화면으로 정리돼요. 원장님은 차트 대신, 환자분 얼굴을 더 오래 마주볼 수 있어요.

환자분이 가장 안심하시는 순간은, "원장님이 나를 알고 있구나" 싶을 때예요.`,
    checklist: [
      { text: "원장님 전용 진료 스크립트 자동 생성 (1·2차 대화 기반)" },
      { text: "추천 사진/케이스 자동 첨부" },
      { text: "환자분 통합 타임라인 (상담·후기·케어 한 화면)" },
    ],
    image: STAGE_IMAGES.stage3,
    orientation: "text-left",
  },
];

function StageBlock({ stage }: { stage: ConsultStage }) {
  const textCol =
    stage.orientation === "text-left" ? "lg:order-1" : "lg:order-2";
  const mockCol =
    stage.orientation === "text-left" ? "lg:order-2" : "lg:order-1";

  return (
    <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
      <div className={`lg:col-span-6 ${textCol}`}>
        <Reveal>
          <div
            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{
              backgroundColor: BRAND_BLUE_FAINT,
              color: BRAND_BLUE,
            }}
          >
            {stage.caption}
          </div>
        </Reveal>
        <Reveal delay={80}>
          <h3 className="font-display text-2xl lg:text-[32px] leading-[1.3] tracking-[-0.02em] font-extrabold text-slate-900">
            {stage.heading}
          </h3>
        </Reveal>
        <Reveal delay={160}>
          {stage.body.split("\n\n").map((para, i) => (
            <p
              key={i}
              className={`text-[15.5px] text-slate-600 leading-[1.8] ${
                i === 0 ? "mt-5" : "mt-4"
              }`}
            >
              {para}
            </p>
          ))}
        </Reveal>
        <Reveal delay={240}>
          <ul className="mt-7 space-y-3">
            {stage.checklist.map((item) => (
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
                  {item.status === "beta" && (
                    <span
                      className="ml-2 text-xs italic"
                      style={{ color: "#6B7280" }}
                    >
                      · 베타 운영 중
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>

      <div className={`lg:col-span-6 ${mockCol}`}>
        <Reveal delay={100}>
          <SmartMock
            screenshot={stage.image ?? SCREENSHOTS.consultCoach}
            fallback={<MockConsultCoach />}
            alt={`이음 상담 코치 ${stage.caption} 화면`}
          />
        </Reveal>
      </div>
    </div>
  );
}

export default function FeatureConsultCoach() {
  return (
    <section className="py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal>
          <SectionLabel index="0.1">CONSULT COACH</SectionLabel>
        </Reveal>

        <div className="space-y-20 lg:space-y-28 mt-12">
          {CONSULT_STAGES.map((stage) => (
            <StageBlock key={stage.key} stage={stage} />
          ))}
        </div>
      </div>
    </section>
  );
}
