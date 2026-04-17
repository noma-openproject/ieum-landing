import React from "react";

export default function SectionLabel({
  index,
  children,
}: {
  index: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <span className="font-display text-xs tracking-[0.2em] text-slate-500">
        [ {index} ]
      </span>
      <span className="font-display text-xs tracking-[0.2em] text-slate-400">
        {children}
      </span>
    </div>
  );
}
