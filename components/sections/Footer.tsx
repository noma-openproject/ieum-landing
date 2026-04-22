import React from "react";
import { MessageCircle } from "lucide-react";
import { CONTACT, ctaHref } from "../constants";
import { Logo } from "../Logo";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center">
            <Logo />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            환자분의 상담부터 후기·케어까지, 병원의 모든 순간을 이어드려요.
          </p>
          <p className="mt-6 text-xs text-slate-400">Noma OpenProject</p>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-3">
            PRODUCT
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#features" className="hover:text-slate-900">
                기능
              </a>
            </li>
            <li>
              <a href="#audience" className="hover:text-slate-900">
                도입 대상
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-slate-900">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-3">
            COMPANY
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            <li>
              <a href="#" className="hover:text-slate-900">
                이용약관
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-slate-900">
                개인정보처리방침
              </a>
            </li>
            {ctaHref("이음 문의") && (
              <li>
                <a
                  href={ctaHref("이음 문의") ?? undefined}
                  className="hover:text-slate-900"
                >
                  문의하기
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-400">
          <span>© 2026 Noma OpenProject. All rights reserved.</span>
          {CONTACT.kakaoChannelUrl && (
            <span className="flex items-center gap-4">
              <a
                href={CONTACT.kakaoChannelUrl}
                className="hover:text-slate-600 inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> 카카오톡
              </a>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
