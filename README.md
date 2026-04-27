# 이음 (ieum) 랜딩 페이지

Next.js + Tailwind CSS 기반 랜딩 사이트. **카피 수정은 코드 한 파일만** 만지면 됩니다.

---

## 📝 카피(문구) 수정 가이드 — 비개발자용

### 1. 어디서 수정하나요?

**`lib/copy.ts`** 한 파일에 모든 텍스트가 모여있습니다.
사이트에 보이는 모든 문구가 여기에 있고, 컴포넌트 파일(`.tsx`)은 안 만지셔도 됩니다.

```
lib/copy.ts          ← 여기서 수정 (개발자용 단일 진실 원천)
copy.txt             ← 사람이 읽기 편한 스냅샷 (수정 후 함께 업데이트)
```

### 2. 수정 절차 (3단계)

1. **`lib/copy.ts` 열기** → 바꾸고 싶은 문구를 `Cmd+F`(Mac) / `Ctrl+F`(Win)로 검색
2. **큰따옴표(`"..."`) 또는 백틱(`` `...` ``) 안의 텍스트만** 수정
   - 필드 이름·콤마·중괄호는 건드리지 마세요
3. **저장** → 개발 서버가 켜져 있으면 자동 반영
   - 안 켜져 있으면 `npm run dev` 실행
4. **`copy.txt`도 같이** 업데이트 (사람이 읽는 스냅샷용)

### 3. 자주 쓰는 패턴

#### 줄바꿈
```ts
// 큰따옴표 안에서: \n 입력
title: "광고 보고 와도,\n후기는 안 써주시는 환자분들"
// → 화면에 두 줄로 표시

// 백틱 안에서: 그냥 엔터
body: `첫 줄
두 번째 줄`

// 단락 분리: 백틱 안 빈 줄
body: `첫 단락

두 번째 단락`
```

#### 따옴표 안 따옴표
```ts
// ❌ 깨짐
"안녕 "환자분""

// ✅ 백슬래시로 처리
"안녕 \"환자분\""

// ✅ 백틱으로 감싸면 그냥 됨
`안녕 "환자분"`
```

#### 강조(파란 굵은 글씨)
- 카피만 바꿔서는 안 됩니다 — 필드 이름이 정해져 있어요
- `h1HighlightLineIndex: 2` → 헤드라인 3번째 줄 강조 (0부터 시작)
- `line2Highlight`, `line3Highlight` 같이 이름에 `Highlight` 붙은 줄이 자동 강조
- 강조 위치를 바꾸려면 인덱스 숫자만 변경

### 4. 자주 수정하는 영역 빠른 찾기

| 무엇을 바꾸고 싶은가 | `lib/copy.ts` 안의 위치 |
|---|---|
| 메뉴/CTA 버튼 글자 | `nav` |
| Hero(첫 화면) 큰 글씨·배지 | `hero` |
| "원장님 이런 장면" 카드 3장 | `problem.cards` |
| 0.1 상담 코치 1차/2차/3차 본문 | `consultCoach.stages[0/1/2]` |
| 0.2 후기 만들기 본문 | `reviewBuilder` |
| 0.3 케어 노트 본문 | `careNote` |
| WHO IT'S FOR 카드 3장 | `audience.cards` |
| FAQ 질문/답변 | `faq.categories[].items` |
| 페이지 마지막 CTA | `finalCta` |
| 푸터 회사명·메뉴 | `footer` |
| 메일 제목 (mailto) | `ctaSubject` |

### 5. 수정 후 변경이 안 보일 때

1. 브라우저 새로고침(Cmd/Ctrl+R)
2. 그래도 안 되면 터미널에서 `Ctrl+C`로 dev 서버 종료 후
   ```bash
   rm -rf .next && npm run dev
   ```
3. `npm run check:copy-sync` 로 `lib/copy.ts` ↔ `copy.txt` 동기화 누락 확인

---

## 🚀 개발자용 — 시작하기

```bash
npm install
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기.

### 주요 스크립트

```bash
npm run dev               # 개발 서버
npm run build             # 프로덕션 빌드 (lib/copy.ts ↔ copy.txt 동기화 자동 검증)
npm run start             # 빌드 결과 실행
npm run lint              # ESLint
npm run check:copy-sync   # lib/copy.ts ↔ copy.txt 동기화 검증 (단독 실행)
```

### 디렉토리 구조

```
app/
  globals.css          ← 전역 CSS (word-break, carousel 키프레임 등)
  layout.tsx
  page.tsx             ← 진입점 (IeumLanding 렌더)
components/
  IeumLanding.tsx      ← 페이지 전체 조립
  constants.ts         ← BRAND_BLUE, CONTACT 등 디자인 토큰·연락처
  sections/            ← 섹션별 컴포넌트 (Hero, ProblemIntro, ...)
  mocks/               ← 합성 mockup (Hero composite, 후기 만들기 등)
  primitives/          ← 작은 UI atom (Button, WindowFrame, Reveal)
lib/
  copy.ts              ← 카피 단일 진실 원천 ★ 비개발자도 여기만 만지면 됨
copy.txt               ← 사람용 카피 스냅샷
scripts/
  check-copy-sync.mjs  ← copy.txt 동기화 검증 (prebuild에서 자동 실행)
```

### 디자인 토큰 / 연락처 변경

`components/constants.ts`:
- `BRAND_BLUE`, `BRAND_BLUE_FAINT` — 브랜드 색상
- `CONTACT.email` — 데모/문의 메일 받을 주소
- `CONTACT.demoFormUrl` — 외부 폼 URL (있으면 mailto 대신 사용)
- `CONTACT.kakaoChannelUrl` — 카카오톡 채널 URL

---

## 📦 배포

`main` 브랜치에 push하면 Vercel이 자동으로 빌드·배포합니다.

```bash
git push origin main
```

Vercel 배포 상태 확인:
```bash
vercel ls
```

---

## 기술 스택

- [Next.js 16](https://nextjs.org) (App Router, Turbopack)
- [React 19](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com)
- TypeScript
- [lucide-react](https://lucide.dev) 아이콘

상세 문서: [Next.js Docs](https://nextjs.org/docs) · [Tailwind Docs](https://tailwindcss.com/docs)
