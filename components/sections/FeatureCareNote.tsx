import React from "react";
import FeatureBlock from "./FeatureBlock";
import SmartMock from "../primitives/SmartMock";
import MockCareNote from "../mocks/MockCareNote";
import { SCREENSHOTS } from "../constants";

export default function FeatureCareNote() {
  return (
    <FeatureBlock
      index="0.3"
      category="CARE NOTE"
      title={["수술·시술이 끝난 뒤에도,", "환자분 곁에 남아 도와드려요"]}
      description={`수술·시술이 끝이 아니에요. 귀가 당일부터 1년 후까지, 환자분이 "이 병원은 나를 잊지 않았구나" 느끼시도록, 이음이 곁에 머물러요.

매뉴얼대로가 아니라, 환자분 한 분 한 분의 상황에 맞춰서요.`}
      bullets={[
        {
          text: "사진 업로드 → AI 초안 답변 → 병원·원장 확인",
          status: "ready",
        },
        { text: "통증 0~10 색상 피드백 + AI 응급도 분류", status: "ready" },
        { text: "상담·후기·케어 통합 타임라인", status: "ready" },
        { text: "환자분이 직접 사진 올리는 공개 링크", status: "ready" },
        { text: "귀가 당일 주의사항 자동 발송", status: "pilot" },
        {
          text: "1·6·12개월 정기 케어 메시지 자동 발송",
          status: "pilot",
        },
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
  );
}
