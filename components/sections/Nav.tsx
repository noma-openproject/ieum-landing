"use client";

import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { PrimaryButton } from "../primitives/Button";
import { ctaHref } from "../constants";
import { Logo } from "../Logo";
import { COPY } from "@/lib/copy";

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
          {COPY.nav.menu.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hover:text-slate-900 transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <PrimaryButton
            href={ctaHref(COPY.ctaSubject.demo)}
            className="!py-2 !px-4 text-[13px]"
          >
            {COPY.nav.cta}
          </PrimaryButton>
          <button
            type="button"
            className="md:hidden p-1.5 text-slate-600 hover:text-slate-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={COPY.nav.mobileMenuToggleAria}
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
            {COPY.nav.menu.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-6 py-3 hover:bg-slate-50 transition"
                onClick={closeMobile}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
