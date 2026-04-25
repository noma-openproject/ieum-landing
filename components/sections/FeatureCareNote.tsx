import React from "react";
import FeatureBlock from "./FeatureBlock";
import SmartMock from "../primitives/SmartMock";
import MockCareNote from "../mocks/MockCareNote";
import { SCREENSHOTS } from "../constants";
import { COPY } from "@/lib/copy";

export default function FeatureCareNote() {
  return (
    <FeatureBlock
      index={COPY.careNote.index}
      category={COPY.careNote.category}
      title={[...COPY.careNote.title]}
      description={COPY.careNote.description}
      bullets={COPY.careNote.bullets.map((b) => ({
        text: b.text,
        status: b.status,
      }))}
      mock={
        <SmartMock
          screenshot={SCREENSHOTS.careNote}
          fallback={<MockCareNote />}
          alt={COPY.careNote.mockAlt}
        />
      }
      orientation={COPY.careNote.orientation}
    />
  );
}
