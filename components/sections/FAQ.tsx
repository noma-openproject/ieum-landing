"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, ctaHref } from "../constants";

type FaqItem = { q: string; a: string };
type FaqCategory = { category: string; items: FaqItem[] };

const FAQ_DATA: FaqCategory[] = [
  {
    category: "서비스",
    items: [
      {
        q: "이음은 어떤 도구인가요?",
        a: "성형·피부 클리닉 실장님의 업무(상담·후기·케어)를 AI가 유기적으로 이어주는 어시스턴트예요. 기존 CRM이 환자 기록을 ‘저장’만 했다면, 이음은 실장님이 매일 실제 업무를 ‘실행’하는 작업대랍니다.",
      },
      {
        q: "도입까지 얼마나 걸리나요?",
        a: "파일럿 기준 당일 시작 가능해요. 계정 발급 후 바로 상담 코치·후기·케어 노트를 사용하실 수 있고, 기존 환자 데이터 이관이 필요한 경우 CSV/엑셀로 1~2일 내 완료돼요.",
      },
      {
        q: "이미 쓰는 CRM이 있는데 같이 써도 되나요?",
        a: "네, 같이 쓰실 수 있어요. 이음은 환자 기록 관리 시스템이 아니라 실장님의 매일 업무 흐름을 중심으로 설계되었어요. 기존 CRM의 환자 DB는 그대로 두고, 상담 준비·후기 생성·사후 케어만 이음으로 편하게 실행만 하시면 돼요.",
      },
    ],
  },
  {
    category: "의료법 & 데이터 보안",
    items: [
      {
        q: "환자 정보가 AI에게 그대로 전달되나요?",
        a: "아니요. AI 호출 전에 환자 이름·연락처·환자번호를 자동으로 안전하게 마스킹한 뒤 전송해요. AI가 응답을 돌려주면 다시 실제 환자분 정보로 복원해 드려요.",
      },
      {
        q: "후기 기능이 의료법에 걸리지 않나요?",
        a: "의료법 27조3항(환자유인행위 금지)을 준수하도록 설계되었어요. AI는 후기 초안만 제안하고, 실장님 검토 후 환자분이 직접 본인 계정으로 게시해요. 당연히 대가성 금품도 제공하지 않고요.",
      },
      {
        q: "우리 병원 데이터가 밖으로 나가지 않나요?",
        a: "국내 클라우드에 암호화되어 보관되고, 병원별로 분리 관리돼요. AI로 전송되는 내용은 환자 식별정보가 제거된 상태라, 전체 대화 기록이 밖으로 나가지 않아요.",
      },
      {
        q: "기존 데이터를 옮겨올 수 있나요?",
        a: "네, 물론이에요. CSV·엑셀 일괄 등록을 지원해요. 기존 CRM에서 내보낸 파일을 그대로 올리시면 돼요.",
      },
    ],
  },
];

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>("0-0");
  return (
    <section id="faq" className="py-24 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <h2 className="font-display text-4xl tracking-[-0.02em] font-extrabold text-slate-900">
              FAQs
            </h2>
            <p className="mt-4 text-slate-500 text-[15px]">
              자주 묻는 질문들을 모았어요.
            </p>
            {ctaHref("이음 문의") && (
              <p className="mt-6 text-sm text-slate-500">
                더 궁금한 점이 있으세요?{" "}
                <a
                  href={ctaHref("이음 문의") ?? undefined}
                  className="font-semibold underline underline-offset-4"
                  style={{ color: BRAND_BLUE }}
                >
                  문의하기
                </a>
              </p>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-8 space-y-10">
          {FAQ_DATA.map((cat, ci) => (
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
                        <p className="pb-5 pr-10 text-[14px] text-slate-600 leading-[1.8]">
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
