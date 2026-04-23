"use client";

import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, ctaHref } from "../constants";

type FaqItem = { q: string; a: string };
type FaqCategory = { category: string; items: FaqItem[] };

const FAQ_DATA: FaqCategory[] = [
  {
    category: "도입 · 시작하기",
    items: [
      {
        q: "도입까지 얼마나 걸리나요?",
        a: "당일 시작 가능해요.\n계정 만드시면 바로 상담 코치·후기·케어 노트 다 쓰실 수 있어요.\n기존 환자 데이터를 옮겨오셔야 하는 경우엔, CSV·엑셀로 1~2일 안에 끝나요.",
      },
      {
        q: "기존 데이터를 옮겨올 수 있나요?",
        a: "네, 옮겨오실 수 있어요.\nCSV·엑셀 파일을 그대로 올리시면 일괄 등록돼요.\n기존 CRM에서 내보낸 파일을 그 형식 그대로 받아요. 별도로 변환하실 일은 없으세요.",
      },
      {
        q: "이미 쓰는 CRM이 있는데 같이 써도 되나요?",
        a: "네, 같이 쓰실 수 있어요.\n이음은 환자 기록을 ‘저장’하는 시스템이 아니라,\n실장님이 매일 상담·후기·케어를 ‘실행’하는 작업대예요.\n\n기존 CRM의 환자 정보는 그대로 두시고,\n실제 매일의 업무 흐름만 이음에서 편하게 처리하시면 돼요.",
      },
    ],
  },
  {
    category: "보안 · 데이터",
    items: [
      {
        q: "환자 정보가 AI에게 그대로 전달되나요?",
        a: "아니요. 그대로 전달되지 않아요.\nAI를 부르기 전에 환자분 성함·연락처·환자번호를 자동으로 가려서 보내요.\nAI 답변이 돌아오면, 다시 실제 환자분 정보로 자동 복원해드려요.\n\n실장님은 평소처럼 환자분 성함으로 작업하시면 되고,\nAI 쪽으로는 식별 정보가 빠진 상태로만 전달됩니다.",
      },
      {
        q: "우리 병원 데이터가 밖으로 나가지 않나요?",
        a: "나가지 않아요.\n국내 클라우드에 암호화해서 보관하고, 병원별로 따로 분리해서 관리해요.\n다른 병원이 우리 병원 데이터를 보는 일도, AI 학습에 쓰이는 일도 없어요.\n\nAI에 전달되는 내용도 환자 식별 정보가 빠진 상태라,\n환자분 개인을 알아볼 수 있는 정보가 외부로 나가지 않습니다.",
      },
    ],
  },
  {
    category: "의료법",
    items: [
      {
        q: "후기 기능이 의료법에 걸리지 않나요?",
        a: "의료법 제27조 제3항(환자유인행위 금지)을 지키도록 설계했어요.\n\nAI는 후기 초안만 만들어드리고,\n실장님이 한 번 검토하신 뒤,\n환자분이 본인 계정으로 직접 게시하는 구조예요.\n대가성 금품도 일체 없습니다.",
      },
    ],
  },
  {
    category: "이음에 대해",
    items: [
      {
        q: "이음은 어떤 도구인가요?",
        a: "성형·피부 클리닉 실장님의 상담 → 후기 → 케어가\n끊기지 않도록 AI가 이어주는 작업대예요.\n\n기존 CRM이 환자 기록을 ‘저장’만 했다면,\n이음은 실장님이 매일 실제 업무를 ‘실행’하는 곳이에요.\n\n원장님이 도입하시면, 실장님이 매일 쓰시고,\n그 결과를 환자분이 체감하시는 도구예요.",
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
