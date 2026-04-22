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
      title={["상담에서 나눈 이야기가,", "환자분의 첫 후기로 이어져요"]}
      description={`상담에서 나눈 이야기가 그대로 담긴 후기 초안이, 환자분 손에 먼저 도착해요.

"좋았는데 막상 글로 쓰려니 어렵네" — 그 마음을 이음이 알아요. 환자분은 초안을 읽어보고, 본인 말투로 다듬기만 하면 돼요.`}
      bullets={[
        "상담 경험 + 설문 기반 초안 자동 생성 (3안 비교)",
        "4개 페르소나 × 길이 선택 (짧게 / 길게)",
        "QR · 카카오 · 네이버 · 강남언니 딥링크",
        "홈페이지 기록 + 중복 후기 자동 감지",
        "후기 작성 환자분께 보상 자동 지급",
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
