import React from "react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

type PainCard = { title: string; quote: string; note?: string };

const PAIN_CARDS: PainCard[] = [
  {
    title: "실장님이 또 그만둔 날",
    quote: "기껏 가르쳐 놨더니 또 퇴사네요. 내일 당장 상담은 누가 하죠?",
  },
  {
    title: "광고비는 또 나가는 달",
    quote: "수술·시술은 잘 됐는데, 왜 우리 병원 후기는 안 쌓일까요?",
  },
  {
    title: "주말 밤, 환자분의 전화",
    quote: "수술·시술은 잘 됐는데, 퇴근 후 불안한 전화는 누가 받죠?",
  },
];

export default function ProblemIntro() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl leading-tight tracking-[-0.02em] font-extrabold text-slate-900">
            원장님, 이런 장면
            <br />
            <span style={{ color: BRAND_BLUE }}>익숙하시죠?</span>
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 text-slate-500 text-base leading-[1.7]">
            매달 반복되는데, 매달 해결은 안 되는 세 장면.
            <br />
            실장이 바뀌어도, 환자가 바뀌어도 똑같이 돌아오는.
          </p>
        </Reveal>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-14 grid md:grid-cols-3 gap-5">
        {PAIN_CARDS.map((p, i) => (
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
                className="mt-4 pl-4 text-[15px] text-slate-700 leading-[1.7] italic"
                style={{ borderLeft: `3px solid ${BRAND_BLUE_FAINT}` }}
              >
                “{p.quote}”
              </blockquote>
              {p.note && (
                <p className="mt-3 text-[13px] text-slate-500 leading-[1.7]">
                  {p.note}
                </p>
              )}
            </div>
          </Reveal>
        ))}
      </div>

      <div className="max-w-3xl mx-auto px-6 mt-16 text-center">
        <Reveal>
          <p className="text-[17px] text-slate-700 leading-[1.8]">
            광고로 환자분을 모셔올 수는 있어요.
            <br />
            하지만 그 환자분이{" "}
            <span className="font-semibold">
              친구에게 우리 병원을 소개하실지는
            </span>
            , 광고로는 안 돼요.
            <br />
            <span style={{ color: BRAND_BLUE }} className="font-semibold">
              이음은 그 한 장면을 실장님 곁에서 같이 만들어드려요.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
