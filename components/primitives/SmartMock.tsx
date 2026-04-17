import React from "react";

/* SmartMock: 스크린샷 경로가 주어지면 이미지 렌더, 없으면 HTML 목업으로 폴백 */

export default function SmartMock({
  screenshot,
  fallback,
  alt,
}: {
  screenshot: string;
  fallback: React.ReactNode;
  alt: string;
}) {
  if (screenshot) {
    return (
      <div className="rounded-2xl overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshot}
          alt={alt}
          className="w-full h-auto block"
          loading="lazy"
        />
      </div>
    );
  }
  return <>{fallback}</>;
}
