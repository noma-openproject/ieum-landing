import React from "react";
import FeatureBlock from "./FeatureBlock";
import SmartMock from "../primitives/SmartMock";
import MockConsultCoach from "../mocks/MockConsultCoach";
import { SCREENSHOTS } from "../constants";

export default function FeatureConsultCoach() {
  return (
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
  );
}
