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
  );
}
