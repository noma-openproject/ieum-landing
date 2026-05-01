import type { Metadata } from "next";
import "./globals.css";
import CopyGuard from "@/components/primitives/CopyGuard";

export const metadata: Metadata = {
  title: "이음 — 상담 어시스턴트",
  description:
    "잘하는 실장님의 하루를, 모든 실장님의 하루로 이어드립니다. 실장님의 상담·후기·케어를 이어주는 AI 상담 어시스턴트.",
  openGraph: {
    title: "이음 — AI 상담 어시스턴트",
    description: "실장님의 상담·후기·케어를 이어주는 AI 상담 어시스턴트",
    locale: "ko_KR",
    type: "website",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full antialiased">
      <head>
        {/* AI 학습 거부 의사 표시 — robots.txt와 함께 명시적 표명 (강제력 없음) */}
        <meta name="robots" content="noai, noimageai" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.css"
        />
        {/* App Router 관례상 layout.tsx의 <link>는 정상이며, 아래 규칙은 Pages Router 대상이라 false positive */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <CopyGuard />
        {children}
      </body>
    </html>
  );
}
