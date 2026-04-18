import React from "react";
import { QrCode } from "lucide-react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

export default function MockReviewBuilder() {
  const personas = [
    { key: "20f", label: "20대 여성", tint: "#FEE2E2", color: "#DC2626" },
    { key: "30w", label: "30대 직장인", tint: "#E0E7FF", color: "#4338CA" },
    { key: "40f", label: "40대 주부", tint: "#FEF3C7", color: "#B45309" },
    { key: "30m", label: "30대 남성", tint: "#DCFCE7", color: "#166534" },
  ];

  return (
    <WindowFrame title="이음 · 후기 만들기">
      {/* 스테퍼 */}
      <div className="flex items-center gap-2 text-[11px] mb-5">
        {["시작", "질문", "말투 선택", "편집", "전달"].map((s, i) => (
          <React.Fragment key={s}>
            <span
              className={`px-2 py-1 rounded-md font-medium ${
                i <= 2 ? "text-white" : "text-slate-400 bg-slate-100"
              }`}
              style={i <= 2 ? { backgroundColor: BRAND_BLUE } : {}}
            >
              {i + 1}. {s}
            </span>
            {i < 4 && <span className="text-slate-300">—</span>}
          </React.Fragment>
        ))}
      </div>

      {/* 페르소나 4카드 */}
      <div className="grid grid-cols-2 gap-2 mb-5">
        {personas.map((p, i) => (
          <div
            key={p.key}
            className="rounded-xl border p-3 text-xs"
            style={
              i === 0
                ? {
                    borderColor: BRAND_BLUE,
                    boxShadow: `0 0 0 3px ${BRAND_BLUE_FAINT}`,
                  }
                : { borderColor: "#E2E8F0" }
            }
          >
            <div
              className="inline-block px-2 py-0.5 rounded-md text-[10px] font-semibold mb-1.5"
              style={{ backgroundColor: p.tint, color: p.color }}
            >
              {p.label}
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              {p.key === "20f" && "다들 예뻐졌다고 ㅎㅎ 진짜 만족이에요~"}
              {p.key === "30w" && "처음엔 걱정했는데 잘한 선택이었어요."}
              {p.key === "40f" && "원장님이 꼼꼼히 봐주셔서 넘 좋았어요~"}
              {p.key === "30m" && "확실히 달라짐. 설명 잘 해줘서 믿고 맡김."}
            </p>
          </div>
        ))}
      </div>

      {/* QR + 딥링크 바 */}
      <div className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
        <div
          className="w-14 h-14 rounded-md flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: BRAND_BLUE_FAINT }}
        >
          <QrCode className="w-7 h-7" style={{ color: BRAND_BLUE }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[11px] font-semibold text-slate-500 mb-0.5">
            환자 전달 링크
          </div>
          <div className="text-xs text-slate-700 truncate font-mono">
            ieum.co/r/RREQ-30FEF3DC…
          </div>
          <div className="flex gap-1.5 mt-1.5">
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
              네이버 플레이스
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
              카카오맵
            </span>
            <span className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600">
              강남언니
            </span>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}
