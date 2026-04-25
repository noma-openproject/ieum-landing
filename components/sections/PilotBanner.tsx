import React from "react";
import { ArrowRight } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { SecondaryButton } from "../primitives/Button";
import { ctaHref } from "../constants";
import { COPY } from "@/lib/copy";

export default function PilotBanner() {
  return (
    <section className="py-12 bg-slate-50/60">
      <div className="max-w-4xl mx-auto px-6">
        <Reveal>
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-8 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <div className="text-[11px] font-semibold tracking-[0.2em] text-slate-500 mb-2">
                {COPY.pilotBanner.badge}
              </div>
              <p className="text-slate-800 text-[15px] font-semibold leading-snug">
                {COPY.pilotBanner.title}
              </p>
              <p className="mt-1 text-[14px] text-slate-500">
                {COPY.pilotBanner.subtitle}
              </p>
            </div>
            <SecondaryButton
              href={ctaHref(COPY.ctaSubject.pilotInquiry)}
              className="whitespace-nowrap"
            >
              {COPY.pilotBanner.cta}
              <ArrowRight className="w-4 h-4" />
            </SecondaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
