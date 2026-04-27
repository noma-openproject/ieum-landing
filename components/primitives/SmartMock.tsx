import React from "react";

/* ═══════════════════════════════════════════════════════════════════
   SmartMock — Hero·Feature 섹션 우측 시각 자료 자동 분기
   ═══════════════════════════════════════════════════════════════════
   screenshot prop의 경로 확장자에 따라 자동으로 다른 태그를 렌더:

   • .mp4 / .webm / .mov  → <video> (자동재생·무음·루프, 모바일 inline)
   • .png / .jpg / .gif / .webp / .avif  → <img>
   • 빈 문자열 ""         → fallback 컴포넌트 (HTML 목업)

   ▎파일 위치
   ─────────────────────────────────────────────────────────────────
   public/screenshots/ 폴더에 자료를 두시고, 경로는 /screenshots/파일명.확장자
   예) "/screenshots/hero-demo.mp4"
       "/screenshots/consult-coach-stage1.png"

   ▎비디오 사용 시 권장 사양
   ─────────────────────────────────────────────────────────────────
   • 길이: 5~15초 (loop 되니 짧게)
   • 해상도: 1280×720 정도면 충분
   • 코덱: H.264 (.mp4) 또는 VP9 (.webm) — 둘 다 모든 브라우저 지원
   • 음성: 없음 (자동재생을 위해 무음이 필수)
   • 파일 크기: 1~3MB 권장 (10MB 넘으면 모바일에서 무거움)

   변환 도구 추천: HandBrake, ffmpeg, 또는 ezgif.com (브라우저)        */

const VIDEO_EXT = /\.(mp4|webm|mov)$/i;

const WRAPPER_CLASS =
  "rounded-2xl overflow-hidden bg-white shadow-[0_30px_60px_-30px_rgba(15,23,42,0.25),0_0_0_1px_rgba(15,23,42,0.05)]";

export default function SmartMock({
  screenshot,
  fallback,
  alt,
}: {
  screenshot: string;
  fallback: React.ReactNode;
  alt: string;
}) {
  if (!screenshot) return <>{fallback}</>;

  /* ── 비디오 분기 (.mp4 / .webm / .mov) ── */
  if (VIDEO_EXT.test(screenshot)) {
    return (
      <div className={WRAPPER_CLASS}>
        <video
          src={screenshot}
          className="w-full h-auto block"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      </div>
    );
  }

  /* ── 이미지 분기 (PNG·JPG·GIF·WebP 등) ── */
  return (
    <div className={WRAPPER_CLASS}>
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
