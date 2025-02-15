export function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

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
  const percentage = value * 100;

  if (value <= 0 || value >= 1) {
    return percentage;
  }

  if (value >= 0.001) {
    return percentage.toFixed(2);
  }

  const strValue = percentage.toString(); // 문자열로 변환
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
  const roundedValue = percentage.toFixed(significantDigits);
  return roundedValue.toString();
}

export function getRandomValue() {
  return Math.random();
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

export function generateFingerprint() {
  const userAgent = navigator.userAgent;
  const screenSize = `${window.screen.width}x${window.screen.height}`;
  const language = navigator.language;
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return btoa(`${userAgent}|${screenSize}|${language}|${timeZone}`);
}

import crypto from "crypto";

export function generateHmac(data: string, secret: string) {
  return crypto.createHmac("sha256", secret).update(data).digest("hex");
}

export function generateSignedFingerprint() {
  const fingerprint = generateFingerprint();
  const secret = "ENviwh#OD304Ne8cld";
  const signature = generateHmac(fingerprint, secret);
  return `${fingerprint}.${signature}`;
}

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
