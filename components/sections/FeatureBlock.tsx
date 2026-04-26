import React from "react";
import { Check } from "lucide-react";
import Reveal from "../primitives/Reveal";
import SectionLabel from "../primitives/SectionLabel";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";
import { COPY } from "@/lib/copy";

type Orientation = "text-left" | "text-right";

type BulletStatus = "ready" | "pilot";
type BulletItem = string | { text: string; status: BulletStatus };

const getBulletText = (b: BulletItem) =>
  typeof b === "string" ? b : b.text;
const getBulletStatus = (b: BulletItem): BulletStatus =>
  typeof b === "string" ? "ready" : b.status;

export default function FeatureBlock({
  index,
  category,
  title,
  description,
  bullets,
  mock,
  orientation = "text-left",
  footerNote,
}: {
  index: string;
  category: string;
  title: string[];
  description: string;
  bullets: BulletItem[];
  mock: React.ReactNode;
  orientation?: Orientation;
  footerNote?: React.ReactNode;
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
            {description.split("\n\n").map((para, i) => (
              <p
                key={i}
                className={`text-[15.5px] text-slate-600 leading-[1.8] whitespace-pre-line ${
                  i === 0 ? "mt-6" : "mt-4"
                }`}
              >
                {para}
              </p>
            ))}
          </Reveal>
          <Reveal delay={240}>
            <ul className="mt-8 space-y-3">
              {bullets.map((b) => {
                const text = getBulletText(b);
                const status = getBulletStatus(b);
                return (
                  <li key={text} className="flex items-start gap-3">
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
                      {text}
                      {status === "pilot" && (
                        <span
                          className="ml-2 text-xs italic"
                          style={{ color: "#6B7280" }}
                        >
                          · {COPY.shared.pilotBadge}
                        </span>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
          {footerNote && (
            <Reveal delay={320}>
              <div className="mt-4">{footerNote}</div>
            </Reveal>
          )}
        </div>
        <div className={`lg:col-span-6 ${mockCol}`}>
          <Reveal delay={100}>{mock}</Reveal>
        </div>
      </div>
    </section>
  );
}
