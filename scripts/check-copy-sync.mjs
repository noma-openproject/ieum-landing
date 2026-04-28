#!/usr/bin/env node
/**
 * lib/copy.ts ↔ copy.txt 동기화 검증
 * ─────────────────────────────────────────────────────────────────
 * lib/copy.ts에 있는 카피 문구가 copy.txt 사람용 스냅샷에도 있는지
 * substring 매칭으로 검사. 누락 발견 시 경고 후 exit 1로 빌드 차단.
 *
 * 실행: npm run check:copy-sync
 *       또는 npm run build (prebuild 훅으로 자동 실행)
 *
 * 검증 방식:
 *   1) lib/copy.ts 에서 주석을 제거한 뒤 한국어 포함 string literal 추출
 *   2) `\n` 이스케이프와 공백·→ 마커 정규화 후 앞부분 substring 매칭
 *   3) 누락된 카피 목록을 stderr 로 출력 + exit 1
 *
 * 100% 정확하지 않은 best-effort 검증. 본질적인 카피 누락은 잘 잡지만
 * 알트 텍스트 같은 메타 문자열 등은 SKIP_KEYS 로 제외.
 *
 * 거짓 양성(false positive)을 발견하면 SKIP_KEYS에 키워드 추가 가능. */

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = resolve(import.meta.dirname, "..");
const SRC_PATH = resolve(ROOT, "lib/copy.ts");
const TXT_PATH = resolve(ROOT, "copy.txt");

const src = readFileSync(SRC_PATH, "utf-8");
const txt = readFileSync(TXT_PATH, "utf-8");

/* ─── 1. 주석 제거 — 코멘트 안의 예시 코드를 카피로 오인하지 않도록 ─── */

// 블록 주석 제거 + 라인 앞부분의 라인 주석 제거
const stripped = src
  .replace(/\/\*[\s\S]*?\*\//g, "")
  .replace(/^\s*\/\/.*$/gm, "");

/* ─── 2. string literal 후보 추출 (한국어 포함만) ─── */

const QUOTED = /(["'])((?:(?!\1)[^\\\n]|\\.)*)\1/g;     /* 단일 라인 따옴표 */
const BACKTICK = /`((?:[^`\\]|\\.)*)`/gs;                /* 백틱 멀티라인 */
const HANGUL = /[가-힣]/;
/* URL · 앵커 · 경로 패턴은 카피 아니라 메타데이터이므로 검사 제외 */
const URL_PATTERN = /^(mailto:|https?:\/\/|tel:|\/[a-z]|#)/i;

const candidates = [];
let m;
while ((m = QUOTED.exec(stripped)) !== null) {
  const s = m[2];
  if (URL_PATTERN.test(s)) continue;
  if (s.length >= 8 && HANGUL.test(s)) candidates.push(s);
}
while ((m = BACKTICK.exec(stripped)) !== null) {
  const s = m[1];
  if (URL_PATTERN.test(s)) continue;
  if (s.length >= 8 && HANGUL.test(s)) candidates.push(s);
}

/* ─── 3. 정규화 — escape, 공백, copy.txt 마커(→/⏎⏎) 처리 ─── */

const normalize = (s) =>
  s
    .replace(/\\n/g, " ")    /* "\n" 이스케이프 → 공백 */
    .replace(/\\"/g, '"')    /* 이스케이프된 따옴표 */
    .replace(/[→]/g, " ")    /* copy.txt 줄바꿈 마커 → 공백 */
    .replace(/⏎+/g, " ")     /* copy.txt 단락 마커 → 공백 */
    .replace(/\s+/g, " ")    /* 공백·줄바꿈 통합 */
    .trim();

const txtNorm = normalize(txt);

/* ─── 4. SKIP — 메타 텍스트(alt 등)와 가이드/주석성 키워드 ─── */

const SKIP_KEYS = [
  "이음 상담 코치 화면",        /* hero/feature mockAlt 메타 텍스트 */
  "이음 후기 만들기 화면",
  "이음 케어 노트 화면",
];

/* ─── 5. 매칭 검사 ─── */

const PROBE_LEN = 18;          /* 앞 18자가 일치하면 동일 카피로 간주 */
const MIN_PROBE = 10;          /* probe가 10자 이상일 때만 검사 */

const missing = [];
const seen = new Set();        /* 중복 제거 */

for (const raw of candidates) {
  const norm = normalize(raw);
  if (SKIP_KEYS.some((skip) => norm.includes(skip))) continue;

  const probe = norm.slice(0, PROBE_LEN);
  if (probe.length < MIN_PROBE) continue;
  if (seen.has(probe)) continue;
  seen.add(probe);

  if (!txtNorm.includes(probe)) {
    const display = norm.length > 60 ? norm.slice(0, 60) + "…" : norm;
    missing.push(display);
  }
}

if (missing.length === 0) {
  console.log("✓ copy.txt 동기화 OK — lib/copy.ts의 모든 카피가 copy.txt 에 반영됨");
  process.exit(0);
}

/* ─── 6. 누락 발견 시 비개발자 친화 메시지 ─── */

console.error("");
console.error("⚠️  copy.txt 동기화 누락 감지");
console.error("───────────────────────────────────────────────────────────");
console.error(`lib/copy.ts 에 있지만 copy.txt 에는 없는 카피 ${missing.length}개:`);
console.error("");
missing.forEach((s, i) => {
  console.error(`  ${i + 1}. "${s}"`);
});
console.error("");
console.error("📝 해결 방법:");
console.error("   1) copy.txt 를 열어서 위 카피들이 잘 들어가 있는지 확인");
console.error("   2) 누락된 부분을 lib/copy.ts 와 같은 내용으로 추가");
console.error("   3) 다시 npm run build 또는 npm run check:copy-sync 실행");
console.error("");
console.error("(이 검증은 사람용 스냅샷을 최신으로 유지하기 위한 것입니다.");
console.error(" 코드 동작에는 영향 없으나 팀 운영을 위해 동기화 권장)");
console.error("");

process.exit(1);
