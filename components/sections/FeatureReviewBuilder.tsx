import React from "react";
import FeatureBlock from "./FeatureBlock";
import SmartMock from "../primitives/SmartMock";
import MockReviewBuilder from "../mocks/MockReviewBuilder";
import { SCREENSHOTS } from "../constants";

export default function FeatureReviewBuilder() {
  return (
    <FeatureBlock
      index="0.2"
      category="REVIEW BUILDER"
      title={["환자분의 만족을,", "자연스러운 후기로 이어드려요"]}
      description="후기가 안 써지는 건 환자도 똑같아요. 1·2·3차 상담 경험과 간단한 설문만으로 후기 초안이 완성돼요. 글솜씨가 없어도 환자 본인 이야기가 그대로 담깁니다."
      bullets={[
        "상담 경험 + 설문 기반 초안 자동 생성",
        "4개 페르소나 × 3단계 길이 선택",
        "QR · 카카오 · 네이버 · 강남언니 딥링크",
        "홈페이지 기록 + 중복 후기 자동 감지",
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
  );
}
