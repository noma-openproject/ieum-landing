"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, ctaHref } from "../constants";
import { COPY } from "@/lib/copy";

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");
  const inquiryHref = ctaHref(COPY.ctaSubject.generalInquiry);
  return (
    <section id="faq" className="py-24 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="font-display text-4xl tracking-[-0.02em] font-extrabold text-slate-900">
              {COPY.faq.title}
            </h2>
            <p className="mt-4 text-slate-500 text-[15px]">
              {COPY.faq.subtitle}
            </p>
            {inquiryHref && (
              <p className="mt-6 text-sm text-slate-500">
                {COPY.faq.contactPrompt}{" "}
                <a
                  href={inquiryHref ?? undefined}
                  className="font-semibold underline underline-offset-4"
                  style={{ color: BRAND_BLUE }}
                >
                  {COPY.faq.contactCta}
                </a>
              </p>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {COPY.faq.categories.map((cat, ci) => (
            <div key={cat.category}>
              <div
                className="font-semibold mb-3 text-[15px]"
                style={{ color: BRAND_BLUE }}
              >
                {cat.category}
              </div>
              <div className="divide-y divide-slate-100 border-t border-b border-slate-100">
                {cat.items.map((it, ii) => {
                  const key = `${ci}-${ii}`;
                  const open = openKey === key;
                  return (
                    <div key={key}>
                      <button
                        type="button"
                        onClick={() => setOpenKey(open ? null : key)}
                        className="w-full flex items-center justify-between gap-6 py-5 text-left"
                      >
                        <span className="text-[15px] font-semibold text-slate-800 tracking-tight">
                          {it.q}
                        </span>
                        <span
                          className="flex-shrink-0 w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-500 transition"
                          style={
                            open
                              ? { borderColor: BRAND_BLUE, color: BRAND_BLUE }
                              : {}
                          }
                        >
                          {open ? (
                            <Minus className="w-4 h-4" />
                          ) : (
                            <Plus className="w-4 h-4" />
                          )}
                        </span>
                      </button>
                      <div
                        className="overflow-hidden transition-all duration-300"
                        style={{ maxHeight: open ? 1200 : 0 }}
                      >
                        <p className="pb-5 pr-10 text-[14px] text-slate-600 leading-[1.8] whitespace-pre-line">
                          {it.a}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
