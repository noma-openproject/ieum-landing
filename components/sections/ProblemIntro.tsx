import React from "react";
import Reveal from "../primitives/Reveal";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

type PainCard = { title: string; quote: string; note?: string };

const PAIN_CARDS: PainCard[] = [
  {
    title: "실장님이 또 그만둔 날",
    quote: "기껏 일 다 가르쳐 놨더니 또 퇴사네요. 내일 당장 상담은 누가 하죠?",
  },
  {
    title: "환자분께 후기 요청을 미룬 일주일",
    quote:
      "결제하고 바쁘게 나가시는 분 붙잡고 후기 써달라 매달리기 눈치 보여요…",
  },
  {
    title: "수술 7일째, 환자분의 전화",
    quote:
      "병원 문 닫았는데 수술 부위가 부어올라요. 원장님, 이거 부작용 아닌가요?",
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
          <p className="mt-5 text-slate-500 text-base">
            실장님도 환자도 피곤한 세 순간.
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
            환자 전환은 광고비가 아니라,
            <br className="md:hidden" />{" "}
            <span className="font-semibold">실장님의 실력에서 결정돼요.</span>
            <br />
            이음은 그 실력을{" "}
            <span style={{ color: BRAND_BLUE }} className="font-semibold">
              병원의 자산으로 이어드릴게요.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
