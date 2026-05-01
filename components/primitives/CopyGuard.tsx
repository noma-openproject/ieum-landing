"use client";

import { useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════════
   CopyGuard — 페이지 전체 텍스트 복사·우클릭 메뉴 차단 (글로벌)
   ═══════════════════════════════════════════════════════════════════
   ▎동작
   ─────────────────────────────────────────────────────────────────
   • document 전역 copy/cut/contextmenu/selectstart 이벤트 가로채서 preventDefault.
   • CSS 보조: app/globals.css 의 body { user-select: none } 와 함께 동작.

   ▎예외 (정상 동작 보장)
   ─────────────────────────────────────────────────────────────────
   target 이 다음 중 하나면 차단하지 않음:
     · <input>, <textarea>, <select>
     · contentEditable="true"
     · 조상 어딘가에 [data-allow-select] 속성 가진 요소가 있음

   ▎사용처
   ─────────────────────────────────────────────────────────────────
   app/layout.tsx body 직속에 한 번만 마운트.
   이후 추가되는 모든 섹션·카피·페이지에 자동 적용됨.

   ▎주의
   ─────────────────────────────────────────────────────────────────
   "약한 보호"용 — 일반 방문자 무심한 복사만 막습니다.
   DevTools/뷰소스로 우회 가능하지만 SEO·검색 인덱싱은 그대로 유지.
   ═══════════════════════════════════════════════════════════════════ */

function isInteractiveTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  if (target.closest("[data-allow-select]")) return true;
  return false;
}

export default function CopyGuard() {
  useEffect(() => {
    const block = (e: Event) => {
      if (!isInteractiveTarget(e.target)) {
        e.preventDefault();
      }
    };
    document.addEventListener("copy", block);
    document.addEventListener("cut", block);
    document.addEventListener("contextmenu", block);
    document.addEventListener("selectstart", block);
    return () => {
      document.removeEventListener("copy", block);
      document.removeEventListener("cut", block);
      document.removeEventListener("contextmenu", block);
      document.removeEventListener("selectstart", block);
    };
  }, []);

  return null;
}
