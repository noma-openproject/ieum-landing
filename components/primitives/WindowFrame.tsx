import React from "react";

export default function WindowFrame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative rounded-2xl bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)] overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-100 bg-slate-50/70">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-300" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
        </div>
        <div className="ml-2 text-[11px] text-slate-400 font-medium tracking-tight">
          {title}
        </div>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
