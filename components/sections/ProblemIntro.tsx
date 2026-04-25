import React from "react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";
import { COPY } from "@/lib/copy";

export default function ProblemIntro() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.02em] font-extrabold text-slate-900">
            {COPY.problem.headline.line1}
            <br />
            <span style={{ color: BRAND_BLUE }}>
              {COPY.problem.headline.highlight}
            </span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 text-slate-500 text-base leading-[1.7]">
            {COPY.problem.sub}
          </p>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-3 gap-5">
        {COPY.problem.cards.map((p, i) => (
          <Reveal key={p.title} delay={i * 100}>
            <div className="h-full rounded-2xl border border-slate-200 bg-white p-7 hover:border-slate-300 hover:shadow-sm transition">
              <div
                className="font-display text-4xl font-bold mb-5"
                style={{ color: BRAND_BLUE, opacity: 0.25 }}
              >
                0{i + 1}
              </div>
              <h3 className="text-lg font-bold text-slate-900 leading-snug tracking-tight">
                {p.title}
              </h3>
              <blockquote
                className="mt-4 pl-4 text-[15px] text-slate-700 leading-[1.7] italic whitespace-pre-line"
                style={{ borderLeft: `3px solid ${BRAND_BLUE_FAINT}` }}
              >
                “{p.quote}”
              </blockquote>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <Reveal>
          <p className="text-[17px] text-slate-700 leading-[1.8]">
            {COPY.problem.footer.line1}
            <br />
            {COPY.problem.footer.line2Pre}
            <span className="font-semibold">
              {COPY.problem.footer.line2Highlight}
            </span>
            {COPY.problem.footer.line2Post}
            <br />
            <span style={{ color: BRAND_BLUE }} className="font-semibold">
              {COPY.problem.footer.line3Highlight}
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
