import React from "react";
import { MessageCircle } from "lucide-react";
import { CONTACT, ctaHref } from "../constants";
import { Logo } from "../Logo";
import { COPY } from "@/lib/copy";

export default function Footer() {
  const generalInquiryHref = ctaHref(COPY.ctaSubject.generalInquiry);
  return (
    <footer className="bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-5">
          <div className="flex items-center">
            <Logo />
          </div>
          <p className="mt-3 text-sm text-slate-500">
            {COPY.footer.description}
          </p>
          <p className="mt-6 text-xs text-slate-400">{COPY.footer.org}</p>
        </div>

        <div className="md:col-span-4">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-3">
            {COPY.footer.productMenuLabel}
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {COPY.footer.productMenu.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-slate-900">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold text-slate-500 tracking-wider mb-3">
            {COPY.footer.companyMenuLabel}
          </div>
          <ul className="space-y-2 text-sm text-slate-600">
            {COPY.footer.companyMenu.map((item) => (
              <li key={item.label}>
                <a href={item.href} className="hover:text-slate-900">
                  {item.label}
                </a>
              </li>
            ))}
            {generalInquiryHref && (
              <li>
                <a
                  href={generalInquiryHref ?? undefined}
                  className="hover:text-slate-900"
                >
                  {COPY.footer.contactCta}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between text-xs text-slate-400">
          <span>{COPY.footer.copyright}</span>
          {CONTACT.kakaoChannelUrl && (
            <span className="flex items-center gap-4">
              <a
                href={CONTACT.kakaoChannelUrl}
                className="hover:text-slate-600 inline-flex items-center gap-1"
              >
                <MessageCircle className="w-3.5 h-3.5" /> {COPY.footer.kakaoLabel}
              </a>
            </span>
          )}
        </div>
      </div>
    </footer>
  );
}
