# Phase J-2: 랜딩 페이지 업데이트 — 2026-04-26

## 범위

- hero 영역 메인 헤드라인 변경 (911 새 표현)
- hero 부제 정리 (헤드라인과 중복되던 첫 줄 제거)
- hero 이미지 자산을 thebeauty-crm Phase L+M+통합 결과로 교체
- 배지 "데모 사용 병원 모집 중"은 이미 적용 상태 (변경 없음)
- 다른 섹션 (Problem Intro / ConsultCoach / ReviewBuilder / CareNote / Audience / FAQ / Footer 등) 변경 없음

## 변경 사항

### 1) 메인 헤드라인 (lib/copy.ts + copy.txt)

이전:
```
실장님이 바뀌어도
흔들리지 않는 병원으로
```

변경 후:
```
베테랑 실장님이 떠나도,
그 노하우는 병원에 남아 있어요!
```

`h1HighlightLineIndex: 1` 유지 — 두 번째 줄 "그 노하우는 병원에 남아 있어요!" 가 BRAND_BLUE 강조.

### 2) 부제 정리

이전 sub:
```
베테랑 실장님이 떠나도, 그 노하우는 병원에 남아 있어요!
환자분이 다시 찾아오는 병원, 친구에게 소개하는 병원으로.
```

이전 부제 첫 줄이 새 헤드라인 표현과 정확히 일치 → 중복 → 첫 줄 제거.

변경 후 sub:
```
환자분이 다시 찾아오는 병원, 친구에게 소개하는 병원으로.
```

(템플릿 리터럴에서 단일 문자열로 변경 — 줄바꿈 불필요)

### 3) Hero 이미지 자산

| 자산 | 변경 |
| --- | --- |
| `public/screenshots/consult-coach.png` | thebeauty-crm Phase L+M+통합 결과의 expanded 캡처로 **덮어쓰기** (234,994 bytes로) |
| `public/screenshots/consult-coach-with-sidebar-expanded.png` | 신규 (동일 자산 별칭) |
| `public/screenshots/consult-coach-with-sidebar-collapsed.png` | 신규 (M-1 미니멀 접힘 캡처) |

`SCREENSHOTS.consultCoach`(constants 상수)는 `/screenshots/consult-coach.png` 그대로 — Hero.tsx JSX 미변경. 파일 자체만 교체로 hero 이미지 자동 갱신.

캡처 출처: `~/Documents/projects/thebeauty-crm/docs/screenshots/phase-l/`
- expanded.png — Phase M-2 탭 UI + 통합 결과 BRAND_BLUE 통일 후 캡처 (1차 탭 기본, 안내문 닫힌 상태)
- collapsed.png — Phase M-1 미니멀 모드 (LEUM 로고 + 하단 ▶ 화살표만)

## 변경 파일

| 파일 | 변경 내용 |
| --- | --- |
| `lib/copy.ts` | `COPY.hero.h1Lines` 2개 문자열 변경 + `COPY.hero.sub` 단일 문자열로 정리. 변경 사유 주석 추가. 다른 hero 필드(badge, h1HighlightLineIndex, productName, ctaPrimary, ctaSecondary, mockAlt) 미수정. 다른 섹션 객체 미수정. |
| `copy.txt` | 사람용 카피 스냅샷 동기화 — 메인 카피 2줄 + 서브 카피 단락 1 변경. (lib/copy.ts 머리에 명시된 동기화 정책 따름) |
| `public/screenshots/consult-coach.png` | thebeauty-crm 통합 결과 expanded 캡처로 덮어쓰기 |
| `public/screenshots/consult-coach-with-sidebar-expanded.png` | 신규 (별칭) |
| `public/screenshots/consult-coach-with-sidebar-collapsed.png` | 신규 |
| `docs/phase-j-2-landing-update-2026-04-26.md` | 신규 (이 보고서, docs/ 디렉토리 신규 생성) |

`Hero.tsx` / `constants.ts` / 다른 컴포넌트 / Tailwind 설정 미수정.

## 검증

| 단계 | 결과 |
| --- | --- |
| `corepack pnpm exec tsc --noEmit` | ✅ pass (출력 0줄) |
| `corepack pnpm build` (Next.js production build) | ✅ exit 0 |
| 자산 파일 존재 + 크기 | ✅ consult-coach.png 234,994 bytes로 갱신 |

수동 brower smoke (다음 단계 권장):
- `corepack pnpm dev` → localhost:3000
- 배지 "데모 사용 병원 모집 중" 확인
- 새 헤드라인 두 줄 + BRAND_BLUE 두 번째 줄 강조 확인
- 부제 한 줄 표시 (이전 두 줄에서 정리됨)
- Hero 이미지: 사이드바(LEUM + 메뉴) + 상담 코치 페이지 + 1/2/3차 탭 + 입력 폼 모두 보임
- 다른 섹션 (Problem / Feature 3개 / Audience / FAQ / FinalCTA / Footer) 회귀 없음
- 모바일 시뮬레이션: 헤드라인 줄바꿈 정상

## thebeauty-crm 변경 동기화 시점

| thebeauty-crm 페이즈 | 결과 | ieum-landing 활용 |
| --- | --- | --- |
| Phase L (2026-04-25) | 1/2/3차 헤더 + 안내문 추가, 1차 BRAND_BLUE | hero 이미지에 1차 헤더 가시 |
| Phase M-1 (2026-04-25) | 사이드바 미니멀 접기 (LEUM + 하단 ▶) | collapsed 자산 추가 |
| Phase M-2 (2026-04-25) | 1/2/3차 탭 UI + 인라인 토글 안내문 | hero 이미지에 탭 UI 가시 |
| Phase 통합 (2026-04-26) | 1/2/3차 헤더 모두 BRAND_BLUE 통일 | hero 이미지 최종 캡처 (이 보고서 시점) |

기준 thebeauty-crm 커밋: `f6c2163` (codex/postcare-body-location-tag, 2026-04-26 push). 그 이후 thebeauty-crm 추가 변경이 hero 이미지에 영향 줄 가능성 있음 → 다음 페이즈에서 동기화 검토.

## 회귀 체크

| 영역 | 상태 |
| --- | --- |
| 배지 "데모 사용 병원 모집 중" | ✅ 변경 없음 (이미 적용된 상태) |
| Hero CTA 버튼 (데모 신청하기 / 상품 소개서 받아보기) | ✅ 변경 없음 |
| 다른 섹션 카피 (COPY.problem / .consultCoach / .reviewBuilder / .careNote / .audience / .faq / .footer 등) | ✅ 변경 없음 |
| `SCREENSHOTS` 상수 + `SmartMock` 컴포넌트 + Tailwind 설정 | ✅ 변경 없음 |
| 다른 hero 자산 (`/screenshots/consult-coach-stage1~3.png`, `care-note.png`, `review-builder.png`) | ✅ 변경 없음 |

## 알려진 한계

- **데스크톱 1440 only 검증**: 모바일/태블릿 viewport 직접 검증은 build로만 확인 (수동 brower smoke 미진행). 헤드라인이 두 줄 그대로 들어가는지 디바이스 QA 권장.
- **Hero.tsx mockAlt 변경 없음**: `mockAlt: "이음 상담 코치 화면"` 그대로. 새 캡처가 사이드바 + 탭 UI 포함하지만 alt는 일반적 표현이라 적합. 필요 시 별도 페이즈로 정교화 가능.

## 커밋 분할

원래 911 계획 (4커밋):
1. `feat(landing): hero 영역 헤드라인 + 배지 텍스트 업데이트`
2. `chore(assets): thebeauty-crm Phase L+M 새 스크린샷 자산 추가`
3. `feat(landing): hero 이미지 새 스크린샷으로 교체`
4. `docs(record): Phase J-2 랜딩 페이지 업데이트 보고서`

실제 커밋 (3개):
- 커밋 1 — `feat(landing): hero 헤드라인 + 부제 (911 표현 적용)` (lib/copy.ts + copy.txt 통합. 배지는 이미 적용 상태라 작업 불필요)
- 커밋 2 — `chore(assets): hero 스크린샷 thebeauty-crm Phase 통합 결과로 교체` (911 #2 + #3 통합 — Hero.tsx 변경 없이 SCREENSHOTS.consultCoach가 가리키는 파일만 덮어쓰기로 효과 발생)
- 커밋 3 — `docs(record): Phase J-2 랜딩 페이지 업데이트 보고서`

통합 사유: #2(자산 추가)와 #3(이미지 교체)는 동일 파일 작업(consult-coach.png 덮어쓰기)이라 분리 불가능. Phase L/M-1/M-2와 동일한 통합 결정.

## 다음 단계

- 모바일 디바이스 QA (헤드라인 줄바꿈 + Hero 이미지 비례 + 배지 위치)
- thebeauty-crm 추가 변경 시 hero 이미지 동기화 페이즈 (자산 갱신만 별도 페이즈로 운영)
- 디자이너 SVG 로고 받으면 양쪽 저장소(thebeauty-crm + ieum-landing) 통일 별도 페이즈

## 결과 요약

- 코드 변경: 1개 파일(copy.ts), +6 / -3 라인
- 텍스트 스냅샷: 1개 파일(copy.txt), +6 / -7 라인
- 자산: 3개 (1개 덮어쓰기 + 2개 신규 별칭)
- tsc / Next.js build / 자산 검증 모두 통과
- 다른 섹션 / 컴포넌트 / 자산 회귀 0건
