"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "../primitives/Button";
import { ctaHref } from "../constants";
import { Logo } from "../Logo";

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const closeMobile = () => setMobileOpen(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <Logo priority />
        </a>

        <nav className="hidden md:flex items-center gap-7 text-sm text-slate-600">
          <a href="#features" className="hover:text-slate-900 transition">
            기능
          </a>
          <a href="#audience" className="hover:text-slate-900 transition">
            도입 대상
          </a>
          <a href="#faq" className="hover:text-slate-900 transition">
            FAQ
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <PrimaryButton
            href={ctaHref("이음 데모 신청")}
            className="!py-2 !px-4 text-[13px]"
          >
            데모 신청
          </PrimaryButton>
          <button
            type="button"
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="메뉴 토글"
          >
            {mobileOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 드롭다운 */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white">
          <nav className="flex flex-col py-2 text-sm text-slate-700">
            <a
              href="#features"
              className="px-6 py-3 hover:bg-slate-50 transition"
              onClick={closeMobile}
            >
              기능
            </a>
            <a
              href="#audience"
              className="px-6 py-3 hover:bg-slate-50 transition"
              onClick={closeMobile}
            >
              도입 대상
            </a>
            <a
              href="#faq"
              className="px-6 py-3 hover:bg-slate-50 transition"
              onClick={closeMobile}
            >
              FAQ
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
