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
