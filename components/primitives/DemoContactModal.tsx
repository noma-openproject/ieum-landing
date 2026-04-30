"use client";

import React, { useEffect, useState } from "react";
import { X, Copy, Mail, Check } from "lucide-react";
import { CONTACT, BRAND_BLUE, BRAND_BLUE_DARK } from "../constants";

/* ═══════════════════════════════════════════════════════════════════
   DemoContactModal — 데모 신청 이메일 안내 모달
   ═══════════════════════════════════════════════════════════════════
   ▎왜 모달인가?
   ─────────────────────────────────────────────────────────────────
   기본 mailto: 링크는 메일 앱이 등록된 환경에서만 동작합니다.
   (특히 윈도우 + 브라우저에서 메일 앱 미설치인 경우 클릭해도 무반응)
   → 모달로 이메일 주소를 직접 보여주고 복사/메일 앱 열기 모두 제공.

   ▎구성
   ─────────────────────────────────────────────────────────────────
   • 배경 dim + ESC/배경 클릭으로 닫기
   • 이메일 주소 표시 + 복사 버튼 (clipboard.writeText)
   • 메일 앱 열기 버튼 (mailto: 링크)
   • body scroll lock

   ▎렌더 위치
   ─────────────────────────────────────────────────────────────────
   PrimaryButton/SecondaryButton에서 href가 "mailto:" 로 시작하면
   자동으로 a 태그 대신 이 모달을 trigger하는 button으로 전환됩니다.
   ═══════════════════════════════════════════════════════════════════ */

export default function DemoContactModal({
  open,
  onClose,
  mailtoHref,
}: {
  open: boolean;
  onClose: () => void;
  mailtoHref: string;
}) {
  const [copied, setCopied] = useState<boolean>(false);

  /* ESC 키로 닫기 */
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  /* body scroll lock */
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  if (!open) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback for older browsers / non-secure context */
      const textarea = document.createElement("textarea");
      textarea.value = CONTACT.email;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        /* clipboard 완전 실패 — 사용자가 수동 복사 */
      }
      document.body.removeChild(textarea);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* 배경 dim */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" />

      {/* 모달 본체 */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center">
          <h3 className="font-display text-xl font-bold text-slate-900 tracking-tight">
            이음 데모 신청
          </h3>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            아래 이메일로 연락 주시면 빠르게 답변드릴게요.
          </p>
        </div>

        {/* 이메일 표시 + 복사 */}
        <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 flex items-center justify-between gap-3">
          <span className="text-[15px] font-mono text-slate-800 truncate">
            {CONTACT.email}
          </span>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition shrink-0 border"
            style={{
              backgroundColor: copied ? "#10B981" : "white",
              color: copied ? "white" : BRAND_BLUE,
              borderColor: copied ? "#10B981" : BRAND_BLUE,
            }}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                복사됨
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                복사
              </>
            )}
          </button>
        </div>

        {/* 메일 앱 열기 */}
        <a
          href={mailtoHref}
          className="mt-3 inline-flex items-center justify-center gap-2 w-full px-5 py-3 rounded-lg text-white text-sm font-medium tracking-tight transition shadow-sm hover:shadow"
          style={{ backgroundColor: BRAND_BLUE }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = BRAND_BLUE;
          }}
        >
          <Mail className="w-4 h-4" />
          메일 앱으로 열기
        </a>

        <p className="mt-4 text-[11px] text-slate-400 text-center leading-relaxed">
          메일 앱이 열리지 않는 환경(웹 메일·일부 윈도우)에서는
          <br />위 이메일을 복사해서 사용하세요.
        </p>
      </div>
    </div>
  );
}
