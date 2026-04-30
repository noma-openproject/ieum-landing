"use client";

import React, { useState } from "react";
import { BRAND_BLUE, BRAND_BLUE_DARK } from "../constants";
import DemoContactModal from "./DemoContactModal";

type ButtonProps = {
  children: React.ReactNode;
  href?: string | null;
  className?: string;
};

/* mailto:로 시작하는 href는 메일 앱 없는 환경(특히 윈도우)에서 동작 안 함.
   → 이 경우 a 태그 대신 button + DemoContactModal trigger로 전환. */
function isMailto(href?: string | null): href is string {
  return typeof href === "string" && href.startsWith("mailto:");
}

export function PrimaryButton({ children, href, className = "" }: ButtonProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (href === null) return null;
  const baseClassName = `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-medium tracking-tight transition shadow-sm hover:shadow ${className}`;
  const style: React.CSSProperties = { backgroundColor: BRAND_BLUE };
  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = BRAND_BLUE;
  };

  if (isMailto(href)) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={baseClassName}
          style={style}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
        >
          {children}
        </button>
        <DemoContactModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          mailtoHref={href}
        />
      </>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={baseClassName}
        style={style}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={baseClassName}
      style={style}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({ children, href, className = "" }: ButtonProps) {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (href === null) return null;
  const baseClassName = `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-sm font-medium tracking-tight transition border hover:bg-slate-50 ${className}`;
  const style: React.CSSProperties = {
    color: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  };

  if (isMailto(href)) {
    return (
      <>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className={baseClassName}
          style={style}
        >
          {children}
        </button>
        <DemoContactModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          mailtoHref={href}
        />
      </>
    );
  }

  if (href) {
    return (
      <a href={href} className={baseClassName} style={style}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={baseClassName} style={style}>
      {children}
    </button>
  );
}
