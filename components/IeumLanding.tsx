"use client";

import Nav from "./sections/Nav";
import Hero from "./sections/Hero";
import ProblemIntro from "./sections/ProblemIntro";
import FeatureConsultCoach from "./sections/FeatureConsultCoach";
import FeatureReviewBuilder from "./sections/FeatureReviewBuilder";
import MidCTA from "./sections/MidCTA";
import FeatureCareNote from "./sections/FeatureCareNote";
import Audience from "./sections/Audience";
import PilotBanner from "./sections/PilotBanner";
import FAQ from "./sections/FAQ";
import FinalCTA from "./sections/FinalCTA";
import Footer from "./sections/Footer";

/* =========================================================
   이음 (ieum) 소개페이지 (v1)
   - 톤: Afterdoc 단정형 카피 + Laney 정제 레이아웃
   - 컬러: 이음 Blue #1E6FD9 (dominant) + Slate neutrals
   - 폰트: Pretendard Variable (한글) + Manrope (영문/숫자)
   ========================================================= */

export default function IeumLanding() {
  return (
    <div className="bg-white text-slate-900 antialiased" id="features">
      {/* 폰트는 app/layout.tsx의 <link>로 이동; 여기는 #features 스코프만 */}
      <style>{`
        #features, #features * {
          font-family: 'Pretendard Variable', Pretendard, -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          letter-spacing: -0.01em;
        }
        #features .font-display {
          font-family: 'Manrope', 'Pretendard Variable', Pretendard, sans-serif;
        }
        #features .font-mono {
          font-family: 'SF Mono', Menlo, Consolas, monospace;
        }
        #features button { cursor: pointer; }
        #features html { scroll-behavior: smooth; }
      `}</style>

      <Nav />
      <Hero />
      <ProblemIntro />
      <FeatureConsultCoach />
      <FeatureReviewBuilder />
      <MidCTA />
      <FeatureCareNote />
      <Audience />
      <PilotBanner />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  );
}
