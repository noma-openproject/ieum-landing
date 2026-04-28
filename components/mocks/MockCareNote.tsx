import React from "react";
import { Stethoscope } from "lucide-react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

type Tone = "amber" | "emerald" | "rose";

export default function MockCareNote() {
  const items: { day: string; status: string; tone: Tone; note: string }[] = [
    { day: "D+1", status: "관찰", tone: "amber", note: "붓기 있음 / 통증 3단계" },
    {
      day: "D+3",
      status: "정상",
      tone: "emerald",
      note: "붓기 감소. 멍 정상 범위",
    },
    {
      day: "D+7",
      status: "응급",
      tone: "rose",
      note: "부분 발적 — 의료진 확인 요청",
    },
  ];
  const toneMap: Record<Tone, { bg: string; fg: string }> = {
    amber: { bg: "#FEF3C7", fg: "#B45309" },
    emerald: { bg: "#DCFCE7", fg: "#166534" },
    rose: { bg: "#FFE4E6", fg: "#BE123C" },
  };

  return (
    <WindowFrame title="이음 · 케어 노트">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            홍서연
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            눈밑지방재배치 · 수술 후 7일차
          </div>
        </div>
        <div className="text-[10px] text-slate-400 font-medium">
          환자 업로드 3건
        </div>
      </div>

      {/* 타임라인 */}
      <div className="relative pl-4">
        <div className="absolute left-[6px] top-1 bottom-1 w-px bg-slate-200" />
        {items.map((it, i) => (
          <div key={it.day} className={`relative ${i > 0 ? "mt-3" : ""}`}>
            <span
              className="absolute -left-[11px] top-2.5 w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: toneMap[it.tone].fg }}
            />
            <div className="rounded-xl border border-slate-200 p-3">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[11px] font-semibold text-slate-700">
                  {it.day}
                </span>
                <span
                  className="px-1.5 py-0.5 rounded text-[10px] font-semibold"
                  style={{
                    backgroundColor: toneMap[it.tone].bg,
                    color: toneMap[it.tone].fg,
                  }}
                >
                  AI 분석 · {it.status}
                </span>
              </div>
              <p className="text-[12px] text-slate-600">{it.note}</p>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-4 rounded-xl p-3 flex items-center gap-2"
        style={{ backgroundColor: BRAND_BLUE_FAINT }}
      >
        <Stethoscope className="w-4 h-4" style={{ color: BRAND_BLUE }} />
        <span
          className="text-[11px] font-semibold"
          style={{ color: BRAND_BLUE }}
        >
          의료진 확인 요청 1건
        </span>
      </div>
    </WindowFrame>
  );
}
