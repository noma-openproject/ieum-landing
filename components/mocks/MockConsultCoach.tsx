import React from "react";
import WindowFrame from "../primitives/WindowFrame";
import { BRAND_BLUE, BRAND_BLUE_FAINT } from "../constants";

export default function MockConsultCoach() {
  return (
    <WindowFrame title="이음 · 상담 코치">
      {/* 탭 */}
      <div className="flex items-center gap-1 mb-4 border-b border-slate-100 pb-3">
        <div
          className="px-3 py-1.5 rounded-md text-xs font-semibold"
          style={{
            backgroundColor: BRAND_BLUE_FAINT,
            color: BRAND_BLUE,
          }}
        >
          1차 온라인 상담
        </div>
        <div className="px-3 py-1.5 text-xs text-slate-400">
          2차 오프라인 현장
        </div>
        <div className="px-3 py-1.5 text-xs text-slate-400">
          3차 원장님 상담
        </div>
      </div>

      {/* 환자 + 녹음 상태 */}
      <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 mb-4">
        <div>
          <div className="text-sm font-semibold text-slate-900 tracking-tight">
            홍서연
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            눈밑지방재배치 · P-F9A1279B
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-medium text-rose-500">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500" />
          </span>
          녹음 중 08:23
        </div>
      </div>

      {/* AI 결과 스니펫 */}
      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 p-3.5">
          <div className="text-[11px] font-semibold text-slate-400 tracking-wider mb-1.5">
            환자의 핵심 요구 사항 요약
          </div>
          <p className="text-[13px] text-slate-700 leading-relaxed">
            다크서클·애교살 라인 자연스럽게, 회복 기간 최소화를 원함.
          </p>
        </div>
        <div
          className="rounded-xl border p-3.5"
          style={{ borderColor: BRAND_BLUE_FAINT, backgroundColor: "#F8FBFF" }}
        >
          <div
            className="text-[11px] font-semibold tracking-wider mb-1.5"
            style={{ color: BRAND_BLUE }}
          >
            권장 멘트
          </div>
          <p className="text-[13px] text-slate-800 leading-relaxed">
            “재배치로 하시면 꺼짐 없이 자연스럽게 마무리됩니다.”
          </p>
        </div>
        <div className="rounded-xl border border-slate-200 p-3.5">
          <div className="text-[11px] font-semibold text-rose-500 tracking-wider mb-1.5">
            피해야 할 말
          </div>
          <p className="text-[13px] text-slate-600 leading-relaxed">
            타 병원 시술 결과와 직접 비교하는 표현은 삼가주세요.
          </p>
        </div>
      </div>
    </WindowFrame>
  );
}
