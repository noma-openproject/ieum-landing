/**
 * 이음 (ieum) 랜딩페이지 — 단일 카피 진실 원천
 *
 * 모든 노출 텍스트는 이 파일에서 관리.
 * 컴포넌트는 마크업 + 강조 처리(BRAND_BLUE span 등)만 담당하고,
 * 카피는 COPY.<섹션>.<필드> 참조.
 *
 * 사람 읽기용 스냅샷: copy.txt (project root)
 * 카피 수정 시 lib/copy.ts와 copy.txt를 함께 업데이트해주세요.
 */

export const COPY = {
  /* ============ 헤더 (Nav) ============ */
  nav: {
    menu: [
      { label: "기능", href: "#features" },
      { label: "도입 대상", href: "#audience" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "데모 신청",
    mobileMenuToggleAria: "메뉴 토글",
  },

  /* ============ Hero ============ */
  hero: {
    badge: "데모 사용 병원 모집 중",
    /** Phase J-2 (2026-04-26): 911 작성 표현으로 헤드라인 변경.
        이전 "실장님이 바뀌어도 / 흔들리지 않는 병원으로" → 새 표현.
        sub 첫 줄에 같은 표현이 있던 게 중복 → sub line 1 제거, line 2만 유지. */
    h1Lines: ["베테랑 실장님이 떠나도,", "그 노하우는 병원에 남아 있어요!"],
    /** 두 번째 줄에 BRAND_BLUE 강조 적용 (인덱스 1) */
    h1HighlightLineIndex: 1,
    sub: "환자분이 다시 찾아오는 병원, 친구에게 소개하는 병원으로.",
    productName: "AI 상담 어시스턴트, 이음",
    ctaPrimary: "데모 신청하기",
    ctaSecondary: "상품 소개서 받아보기",
    mockAlt: "이음 상담 코치 화면",
  },

  /* ============ Problem Intro ============ */
  problem: {
    headline: { line1: "원장님, 이런 장면", highlight: "익숙하시죠?" },
    sub: "계속 반복되지만, 해결되지 않는 고민들.",
    cards: [
      {
        title: "실장님이 또 그만둔 날",
        quote: "기껏 가르쳐 놨더니 또 퇴사네요. 내일 당장 상담은 누가 하죠?",
      },
      {
        title: "광고비는 또 나가는 달",
        quote:
          "환자분들도 많고, 다들 만족한다고 하시는데\n왜 아무도 후기를 쓰지 않으실까요?",
      },
      {
        title: "주말 밤, 환자분의 전화",
        quote: "수술·시술은 잘 됐는데, 퇴근 후 불안한 전화는 누가 받죠?",
      },
    ],
    /** 꼬리 카피 — line2는 [pre + highlight(slate-bold) + post] 3분할, line3는 통째 BRAND_BLUE-bold */
    footer: {
      line1: "광고로 환자분을 모셔올 수는 있어요.",
      line2Pre: "하지만 ",
      line2Highlight: "환자분이 계속 찾아오실 이유까지",
      line2Post: ", 광고가 만들어주진 않아요.",
      line3Highlight: "이음은 그 이유를, 우리 병원 안에서 만들어드려요.",
    },
  },

  /* ============ 0.1 CONSULT COACH ============ */
  consultCoach: {
    sectionIndex: "0.1",
    sectionLabel: "CONSULT COACH",
    stages: [
      {
        key: "stage1",
        caption: "1차 · 온라인 상담 / 전화·카톡",
        heading: "전화 한 통이면, 그 환자분만의 상담 준비가 끝나요",
        body: 'AI가 통화 내용과 카톡 대화를 함께 정리해드려요. 환자분 이름만 누르시면 첫 인사말부터 바로 이어가실 수 있어요. 누가 받아도, 환자분은 처음부터 "이 병원은 나를 알고 있네" 느낄 수 있어요.',
        checklist: [
          { text: "환자분별 맞춤 질문 10개 자동 생성" },
          { text: "통화 녹음 업로드 또는 실시간 전사" },
          { text: "방문 목적·걱정·예산 자동 정리" },
          { text: "콜센터 통화 패턴 분석", status: "beta" as const },
        ],
        image: "/screenshots/consult-coach-stage1.png",
        orientation: "text-left" as const,
      },
      {
        key: "stage2",
        caption: "2차 · 오프라인 현장 / 내원 당일",
        heading:
          "환자분이 의자에 앉기 전에, 그분의 고민이 이미 도착해 있어요",
        body: `전화 상담에서 나눈 모든 이야기가 현장 상담으로 이어져요. 환자분이 무엇을 걱정하셨고, 무엇을 듣고 싶어하셨는지 — 다시 묻지 않으셔도 돼요.

"내 이야기를 기억해주는 병원이네." — 환자분의 이 한마디가 중요해요.`,
        checklist: [
          { text: "1차 상담 내용 자동 인계" },
          { text: "환자분별 핵심 고민 카드" },
          { text: "되는말·안되는말 가이드 (병원 자체 룰북 반영)" },
        ],
        image: "/screenshots/consult-coach-stage2.png",
        orientation: "text-right" as const,
      },
      {
        key: "stage3",
        caption: "3차 · 원장님 상담 / 진료실",
        heading:
          "원장님이 들어가시기 전에, 환자분의 모든 이야기가 한 화면에",
        body: `전화부터 내원까지의 모든 대화·기록·걱정·예산이 한 화면으로 정리돼요. 원장님은 차트 대신, 환자분 얼굴을 더 오래 마주보실 수 있어요.

환자분이 가장 안심하시는 순간은, "원장님이 나를 알고 있구나" 싶을 때예요.`,
        checklist: [
          { text: "원장님 전용 진료 스크립트 자동 생성 (1·2차 대화 기반)" },
          { text: "추천 사진/케이스 자동 첨부" },
          { text: "환자분 통합 타임라인 (상담·후기·케어 한 화면)" },
        ],
        image: "/screenshots/consult-coach-stage3.png",
        orientation: "text-left" as const,
      },
    ],
    betaBadge: "베타 운영 중",
  },

  /* ============ 0.2 REVIEW BUILDER ============ */
  reviewBuilder: {
    index: "0.2",
    category: "REVIEW BUILDER",
    title: ["상담에서 나눈 이야기가,", "환자분의 첫 후기로 이어져요"],
    description: `상담에서 나눈 고민과 느낌들이, 환자분 손에 먼저 도착해요.

"좋았는데 막상 글로 쓰려니 어렵네" — 그 마음을 이음도 압니다. 환자분은 자신의 이야기가 담긴 초안을 보시고, 다듬으시기만 하면 돼요.

후기는 환자분 본인 계정으로 남기고, 병원에는 진짜 자산이 쌓여요.`,
    bullets: [
      "상담 경험 + 설문 기반 초안 자동 생성 (3안 비교)",
      "4개 페르소나 × 길이 선택 (짧게 / 길게)",
      "QR · 카카오 · 네이버 · 강남언니 딥링크",
      "홈페이지 기록 + 중복 후기 자동 감지",
    ],
    mockAlt: "이음 후기 만들기 화면",
    orientation: "text-right" as const,
  },

  /* ============ 0.3 CARE NOTE ============ */
  careNote: {
    index: "0.3",
    category: "CARE NOTE",
    title: ["수술·시술이 끝난 뒤에도,", "환자분 곁에 남아 도와드려요"],
    description: `수술·시술이 끝이 아니에요. 귀가 당일부터 1년 후까지, 환자분이 "이 병원은 나를 잊지 않았구나" 느끼시도록, 이음이 곁에 머물러요.

매뉴얼대로가 아니라, 환자분 한 분 한 분의 상황에 맞춰서요.`,
    bullets: [
      {
        text: "사진 업로드 → AI 초안 답변 → 병원·원장 확인",
        status: "ready" as const,
      },
      {
        text: "통증 0~10 색상 피드백 + AI 응급도 분류",
        status: "ready" as const,
      },
      { text: "상담·후기·케어 통합 타임라인", status: "ready" as const },
      {
        text: "환자분이 직접 사진 올리시는 공개 링크",
        status: "ready" as const,
      },
      { text: "귀가 당일 주의사항 자동 발송", status: "pilot" as const },
      {
        text: "1·6·12개월 정기 케어 메시지 자동 발송",
        status: "pilot" as const,
      },
    ],
    mockAlt: "이음 케어 노트 화면",
    orientation: "text-left" as const,
  },

  /* ============ Mid CTA ============ */
  midCta: {
    headline: {
      line1: "원장님의 고민,",
      line2: "이음에서 어떻게 풀리는지 보여드릴게요",
    },
    cta: "데모 신청하기",
  },

  /* ============ WHO IT'S FOR (Audience) ============ */
  audience: {
    sectionLabel: "[ WHO IT'S FOR ]",
    headline: { line1: "이음이 먼저", line2: "닿고 싶은 병원" },
    /** iconName: lucide-react 아이콘 이름 (Building2 / TrendingUp / Link2 등) */
    cards: [
      {
        iconName: "Building2",
        label: "실장님 이직이 잦은 병원",
        quote: "이번 달도 새 실장님 교육 중이에요",
        body: "신입과 베테랑을 같은 출발선에 세워드려요.",
      },
      {
        iconName: "TrendingUp",
        label: "환자분 만족도는 높은데 후기는 안 쌓이는 병원",
        quote: "잘 시술해드렸는데 온라인에서는 안 보여요",
        body: "환자분이 친구에게 소개하고 싶은 이야기를, 후기로 옮겨드려요.",
      },
      {
        iconName: "Link2",
        label: "지점이 여러 개인 네트워크 병원",
        quote: "지점마다 상담 품질이 다 달라요",
        body: "지점마다 다르던 상담 품질을 같은 기준 위에 맞춰드려요.",
      },
    ],
    /** 꼬리 카피 — [pre + highlight(BRAND_BLUE-bold) + post] */
    footer: {
      pre: "누구를 뽑아도, 누가 그만둬도,",
      highlight: "병원의 상담 품질",
      post: "은 흔들리지 않아요.",
    },
  },

  /* ============ Pilot Banner ============ */
  pilotBanner: {
    badge: "EARLY ACCESS",
    title: "지금은 초기 도입 병원을 모집하고 있어요.",
    subtitle: "실장님 1~2명 규모의 병원부터 함께 시작해요.",
    cta: "도입 문의하기",
  },

  /* ============ FAQ ============ */
  faq: {
    title: "FAQs",
    subtitle: "자주 묻는 질문들을 모았어요.",
    contactPrompt: "더 궁금한 점이 있으세요?",
    contactCta: "문의하기",
    categories: [
      {
        category: "도입 · 시작하기",
        items: [
          {
            q: "도입까지 얼마나 걸리나요?",
            a: `당일 시작 가능해요.
계정 만드시면 바로 상담 코치·후기·케어 노트 다 쓰실 수 있어요.
기존 환자 데이터를 옮겨오셔야 하는 경우엔, CSV·엑셀로 1~2일 안에 끝나요.`,
          },
          {
            q: "기존 데이터를 옮겨올 수 있나요?",
            a: `네, 옮겨오실 수 있어요.
CSV·엑셀 파일을 그대로 올리시면 일괄 등록돼요.
기존 CRM에서 내보낸 파일을 그 형식 그대로 받아요. 별도로 변환하실 일은 없으세요.`,
          },
          {
            q: "이미 쓰는 CRM이 있는데 같이 써도 되나요?",
            a: `네, 같이 쓰실 수 있어요.
이음은 환자 기록을 ‘저장’하는 시스템이 아니라,
실장님이 매일 상담·후기·케어를 ‘실행’하는 작업대예요.

기존 CRM의 환자 정보는 그대로 두시고,
실제 매일의 업무 흐름만 이음에서 편하게 처리하시면 돼요.`,
          },
        ],
      },
      {
        category: "보안 · 데이터",
        items: [
          {
            q: "환자 정보가 AI에게 그대로 전달되나요?",
            a: `아니요. 그대로 전달되지 않아요.
AI를 부르기 전에 환자분 성함·연락처·환자번호를 자동으로 가려서 보내요.
AI 답변이 돌아오면, 다시 실제 환자분 정보로 자동 복원해드려요.

실장님은 평소처럼 환자분 성함으로 작업하시면 되고,
AI 쪽으로는 식별 정보가 빠진 상태로만 전달됩니다.`,
          },
          {
            q: "우리 병원 데이터가 밖으로 나가지 않나요?",
            a: `나가지 않아요.
국내 클라우드에 암호화해서 보관하고, 병원별로 따로 분리해서 관리해요.
다른 병원이 우리 병원 데이터를 보는 일도, AI 학습에 쓰이는 일도 없어요.

AI에 전달되는 내용도 환자 식별 정보가 빠진 상태라,
환자분 개인을 알아볼 수 있는 정보가 외부로 나가지 않습니다.`,
          },
        ],
      },
      {
        category: "의료법",
        items: [
          {
            q: "후기 기능이 의료법에 걸리지 않나요?",
            a: `의료법 제27조 제3항(환자유인행위 금지)을 지키도록 설계했어요.

AI는 후기 초안만 만들어드리고,
실장님이 한 번 검토하신 뒤,
환자분이 본인 계정으로 직접 게시하는 구조예요.
대가성 금품도 일체 없습니다.`,
          },
        ],
      },
      {
        category: "이음에 대해",
        items: [
          {
            q: "이음은 어떤 도구인가요?",
            a: `성형·피부 클리닉 실장님의 상담 → 후기 → 케어가
끊기지 않도록 AI가 이어주는 작업대예요.

기존 CRM이 환자 기록을 ‘저장’만 했다면,
이음은 실장님이 매일 실제 업무를 ‘실행’하는 곳이에요.

원장님이 도입하시면, 실장님이 매일 쓰시고,
그 결과를 환자분이 체감하시는 도구예요.`,
          },
        ],
      },
    ],
  },

  /* ============ Final CTA ============ */
  finalCta: {
    /** 3줄. 가운데 줄(line2Highlight)만 BRAND_BLUE 강조 */
    headline: {
      line1: "실장님이 바뀌어도,",
      line2Highlight: "환자분 경험은 바뀌지 않는 병원으로",
      line3: "만들어드릴게요",
    },
    subDefault: "바로 보여드릴게요.",
    subBrochure: "상품 소개서와 데모를 준비해 드릴게요.",
    ctaPrimary: "데모 신청하기",
    ctaBrochure: "상품 소개서 받아보기",
  },

  /* ============ Footer ============ */
  footer: {
    description:
      "환자분의 상담부터 후기·케어까지, 병원의 모든 순간을 이어드려요.",
    org: "Noma OpenProject",
    productMenuLabel: "PRODUCT",
    productMenu: [
      { label: "기능", href: "#features" },
      { label: "도입 대상", href: "#audience" },
      { label: "FAQ", href: "#faq" },
    ],
    companyMenuLabel: "COMPANY",
    companyMenu: [
      { label: "이용약관", href: "#" },
      { label: "개인정보처리방침", href: "#" },
    ],
    contactCta: "문의하기",
    kakaoLabel: "카카오톡",
    copyright: "© 2026 Noma OpenProject. All rights reserved.",
  },

  /* ============ 공용 텍스트 (FeatureBlock 뱃지 등) ============ */
  shared: {
    /** 0.3 CARE NOTE 같은 "pilot" status bullet에 자동 부착 */
    pilotBadge: "초기 도입 병원과 함께 개발 중",
    /** 0.1 CONSULT COACH 같은 "beta" status bullet에 자동 부착 */
    betaBadge: "베타 운영 중",
  },

  /* ============ CTA mailto subject (이메일 제목) ============ */
  ctaSubject: {
    demo: "이음 데모 신청",
    brochure: "이음 상품 소개서 요청",
    pilotInquiry: "이음 도입 문의",
    generalInquiry: "이음 문의",
  },
} as const;
