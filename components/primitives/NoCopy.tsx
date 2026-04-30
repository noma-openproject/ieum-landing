"use client";

import React from "react";

/* ═══════════════════════════════════════════════════════════════════
   NoCopy — 핵심 카피의 무심한 드래그 복사·우클릭 메뉴 차단
   ═══════════════════════════════════════════════════════════════════
   ▎동작
   ─────────────────────────────────────────────────────────────────
   • user-select: none (Tailwind `select-none`) — 텍스트 드래그 선택 차단
   • onCopy preventDefault — Cmd/Ctrl+C 차단
   • onContextMenu preventDefault — 우클릭 메뉴 차단

   ▎주의
   ─────────────────────────────────────────────────────────────────
   "약한 보호"용 — 일반 방문자의 무심한 복사만 막습니다.
   진짜 베끼려는 경쟁사는 DevTools/뷰소스로 우회 가능.
   강제력 없으니 SEO·검색 인덱싱은 그대로 유지됩니다.

   ▎사용처
   ─────────────────────────────────────────────────────────────────
   Hero / ProblemIntro / FeatureConsultCoach 본문 카피만 감쌉니다.
   ═══════════════════════════════════════════════════════════════════ */

export default function NoCopy({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`select-none ${className}`}
      onCopy={(e) => e.preventDefault()}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
