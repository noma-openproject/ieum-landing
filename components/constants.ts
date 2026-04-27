/* =========================================================
   이음 (ieum) — 공통 상수 · 연락 설정 · CTA href 해석
   ========================================================= */

export const BRAND_BLUE = "#1E6FD9";
export const BRAND_BLUE_DARK = "#1558B5";
export const BRAND_BLUE_FAINT = "#E8F1FC";

/* -------- 연락 채널 설정 --------
   실제 운영 시 이 객체만 교체하면 전체 CTA가 업데이트됨.
   모든 값이 비어있으면 CTA 버튼이 자동으로 숨겨짐.

   우선순위: demoFormUrl > kakaoChannelUrl > email
   - demoFormUrl: Tally / Typeform / Google Form 등 외부 폼 링크 (권장)
   - kakaoChannelUrl: 카카오톡 채널 1:1 채팅 URL
   - email: 지정 시 mailto: 링크 생성
*/
export const CONTACT = {
  demoFormUrl: "", // 외부 폼 생기면 최우선
  kakaoChannelUrl: "", // 카카오톡 채널 URL
  email: "idforshots@gmail.com", // 기본 연락처
  showBrochureButton: false, // 상품 소개서 PDF 준비되면 true
} as const;

export function ctaHref(subject: string): string | null {
  if (CONTACT.demoFormUrl) return CONTACT.demoFormUrl;
  if (CONTACT.kakaoChannelUrl) return CONTACT.kakaoChannelUrl;
  if (CONTACT.email)
    return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}`;
  return null;
}

/* -------- 실제 앱 스크린샷·영상 (선택) --------
   값이 비어있으면 HTML 목업(MockConsultCoach 등)이 그대로 표시됨.
   파일을 public/screenshots/ 폴더에 넣고 경로를 지정하면 자동 교체.

   ▎지원 형식 (SmartMock 이 확장자로 자동 분기):
     · 이미지: .png / .jpg / .gif / .webp / .avif → <img>
     · 영상:   .mp4 / .webm / .mov              → <video> 자동재생·무음·루프

   ▎예시:
     consultCoach: "/screenshots/hero-demo.mp4"     // 영상으로 시연
     consultCoach: "/screenshots/consult-coach.png" // 정적 이미지
     consultCoach: ""                                // HTML 목업 사용

   현재(2026-04-27): Laney 스타일 합성 mock으로 전환 — 모든 값 빈 문자열.
   파일로 교체하려면 경로 채우면 됨. */
export const SCREENSHOTS = {
  consultCoach: "",
  reviewBuilder: "",
  careNote: "",
} as const;
