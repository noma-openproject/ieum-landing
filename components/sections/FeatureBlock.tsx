import React from "react";
import { Check } from "lucide-react";
import Reveal from "../primitives/Reveal";
import SectionLabel from "../primitives/SectionLabel";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

type Orientation = "text-left" | "text-right";

export default function FeatureBlock({
  index,
  category,
  title,
  description,
  bullets,
  mock,
  orientation = "text-left",
}: {
  index: string;
  category: string;
  title: string[];
  description: string;
  bullets: string[];
  mock: React.ReactNode;
  orientation?: Orientation;
}) {
  const textCol = orientation === "text-left" ? "lg:order-1" : "lg:order-2";
  const mockCol = orientation === "text-left" ? "lg:order-2" : "lg:order-1";
  return (
    <section className="py-20 lg:py-28 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14 items-center">
        <div className={`lg:col-span-6 ${textCol}`}>
          <Reveal>
            <SectionLabel index={index}>{category}</SectionLabel>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="font-display text-3xl lg:text-[40px] leading-[1.2] tracking-[-0.02em] font-extrabold text-slate-900">
              {title.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < title.length - 1 && <br />}
                </span>
              ))}
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 text-[15.5px] text-slate-600 leading-[1.8]">
              {description}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: BRAND_BLUE_FAINT }}
                  >
                    <Check
                      className="w-3 h-3"
                      strokeWidth={3}
                      style={{ color: BRAND_BLUE }}
                    />
                  </span>
                  <span className="text-[14.5px] text-slate-700 leading-relaxed">
                    {b}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <div className={`lg:col-span-6 ${mockCol}`}>
          <Reveal delay={100}>{mock}</Reveal>
        </div>
      </div>
    </section>
  );
}
