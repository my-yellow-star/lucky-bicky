export function getPercentage(lv: number) {
  return Math.pow(0.9, lv);
}

export function getLevelProbability(lv: number) {
  let probability = 1;
  for (let i = 0; i <= lv; i++) {
    probability = probability * getPercentage(i);
  }
  return probability;
}

export function formatProbability(value: number) {
  if (value <= 0 || value >= 1) {
    return value * 100;
  }

  if (value >= 0.001) {
    return (value * 100).toFixed(2);
  }

  const strValue = value.toString(); // 문자열로 변환
  const digits = strValue.split(""); // 각 자리 숫자로 분리
  let significantDigits = 0; // 의미 있는 숫자 위치 추적

  for (let i = 2; i < digits.length; i++) {
    // 소수점 이후 탐색
    if (digits[i] !== "0") {
      significantDigits = i;
      break;
    }
  }

  // 의미 있는 숫자 이후 한 자리에서 반올림
  const roundedValue = parseFloat(value.toFixed(significantDigits)) * 100;
  return roundedValue.toString();
}

export function seededRandom(seed: number) {
  const a = 1664525;
  const c = 1013904223;
  const m = 2 ** 32;

  seed = (a * seed + c) % m; // LCG 공식
  return seed / m; // 0과 1 사이의 값 반환
}

const colors = [
  "#000000", // 검은색
  "#000080", // 남색
  "#0000FF", // 파란색
  "#800080", // 보라색
  "#FF3399", // 핑크색
  "#FF0000", // 빨강색
  "#FFA500", // 주황색
];

function interpolateColor(color1: string, color2: string, ratio: number) {
  const hex = (color: string) => parseInt(color.substring(1), 16);
  const r = (color: string) => (hex(color) >> 16) & 0xff;
  const g = (color: string) => (hex(color) >> 8) & 0xff;
  const b = (color: string) => hex(color) & 0xff;

  const r1 = r(color1),
    g1 = g(color1),
    b1 = b(color1);
  const r2 = r(color2),
    g2 = g(color2),
    b2 = b(color2);

  const rNew = Math.round(r1 + (r2 - r1) * ratio);
  const gNew = Math.round(g1 + (g2 - g1) * ratio);
  const bNew = Math.round(b1 + (b2 - b1) * ratio);

  return `rgb(${rNew}, ${gNew}, ${bNew})`;
}

export function getLevelTextColor(level: number, maxLevel: number = 15) {
  const numColors = colors.length;
  const segment = maxLevel / (numColors - 1); // 색상 간 레벨 범위
  const index = Math.floor(level / segment); // 현재 색상 배열의 인덱스
  const ratio = (level % segment) / segment; // 두 색상 사이의 비율

  if (index >= numColors - 1) return colors[numColors - 1]; // 최대 색상
  return interpolateColor(colors[index], colors[index + 1], ratio);
}

import crypto from "crypto";

const SECRET_KEY = process.env.SECRET_KEY;
const IV = process.env.IV;

export function encrypt(data: string) {
  if (!SECRET_KEY || !IV)
    throw Error("secret key, iv 환경 변수가 존재하지 않습니다");

  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(SECRET_KEY),
    Buffer.from(IV)
  );
  let encrypted = cipher.update(data, "utf-8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}
