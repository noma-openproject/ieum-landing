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
      description={`상담에서 나눈 고민과 느낌들이, 환자분 손에 먼저 도착해요.

"좋았는데 막상 글로 쓰려니 어렵네" — 그 마음을 이음도 압니다. 환자분은 자신의 이야기가 담긴 초안을 보시고, 다듬으시기만 하면 돼요.

후기는 환자분 본인 계정으로 남기고, 병원에는 진짜 자산이 쌓여요.`}
      bullets={[
        "상담 경험 + 설문 기반 초안 자동 생성 (3안 비교)",
        "4개 페르소나 × 길이 선택 (짧게 / 길게)",
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
