import React from "react";
import FeatureBlock from "./FeatureBlock";
import SmartMock from "../primitives/SmartMock";
import MockReviewBuilder from "../mocks/MockReviewBuilder";
import { SCREENSHOTS } from "../constants";
import { COPY } from "@/lib/copy";

export default function FeatureReviewBuilder() {
  return (
    <FeatureBlock
      index={COPY.reviewBuilder.index}
      category={COPY.reviewBuilder.category}
      title={[...COPY.reviewBuilder.title]}
      description={COPY.reviewBuilder.description}
      bullets={[...COPY.reviewBuilder.bullets]}
      mock={
        <SmartMock
          screenshot={SCREENSHOTS.reviewBuilder}
          fallback={<MockReviewBuilder />}
          alt={COPY.reviewBuilder.mockAlt}
        />
      }
      orientation={COPY.reviewBuilder.orientation}
    />
  );
}
