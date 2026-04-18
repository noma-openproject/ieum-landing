"use client";

import React from "react";
import { BRAND_BLUE, BRAND_BLUE_DARK } from "../constants";

type ButtonProps = {
  children: React.ReactNode;
  href?: string | null;
  className?: string;
};

export function PrimaryButton({ children, href, className = "" }: ButtonProps) {
  if (href === null) return null;
  const baseClassName = `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-medium tracking-tight transition shadow-sm hover:shadow ${className}`;
  const style: React.CSSProperties = { backgroundColor: BRAND_BLUE };
  const handleEnter = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = BRAND_BLUE_DARK;
  };
  const handleLeave = (e: React.MouseEvent<HTMLElement>) => {
    e.currentTarget.style.backgroundColor = BRAND_BLUE;
  };
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
  if (href === null) return null;
  const baseClassName = `inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-white text-sm font-medium tracking-tight transition border hover:bg-slate-50 ${className}`;
  const style: React.CSSProperties = {
    color: BRAND_BLUE,
    borderColor: BRAND_BLUE,
  };
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
