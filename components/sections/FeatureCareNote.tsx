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
      title={["수술이 끝난 뒤의 시간을,", "환자분에게 이어드려요"]}
      description='수술이 끝이 아닙니다. 환자분이 "잊히지 않았다"고 느끼게 해드리는 시스템이에요. 귀가 당일부터 1년 후까지, 이음이 자연스럽게 이어드려요.'
      bullets={[
        {
          text: "사진 업로드 → AI 초안 답변 → 병원·원장 확인",
          status: "ready",
        },
        { text: "통증 0~10 색상 피드백 + AI 응급도 분류", status: "ready" },
        { text: "상담 기록 통합 타임라인", status: "ready" },
        { text: "귀가 당일 주의사항 자동 발송", status: "pilot" },
        {
          text: "1개월·6개월·1년 정기 케어 메시지 자동 발송",
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
