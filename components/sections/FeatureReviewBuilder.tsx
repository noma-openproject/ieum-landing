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
  );
}
