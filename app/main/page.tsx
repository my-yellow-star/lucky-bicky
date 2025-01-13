"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { API_ORIGIN, CLIENT_ORIGIN } from "../lib/constant";
import {
  getRandomValue,
  getPercentage,
  generateSignedFingerprint,
  formatProbability,
  getLevelProbability,
  getLevelTextColor,
  classNames,
} from "../lib/function";
import Character from "@/public/clova/character.webp";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { clovaList } from "../lib/clova";

export default function Page() {
  const [level, setLevel] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [nickname, setNickname] = useState("");
  const [recordStatus, setRecordStatus] = useState<
    "PENDING" | "ONGOING" | "COMPLETE"
  >("PENDING");
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);
  const clova = useMemo(
    () => clovaList[Math.min(11, level === 0 ? 0 : level - 1)],
    [level]
  );

  function reset() {
    inputRef.current?.blur();
    setLevel(0);
    setShowAnimation(false);
    setShowResult(false);
    setRecordStatus("PENDING");
  }

  function levelUp() {
    if (getRandomValue() < getPercentage(level)) {
      handleLevelUp();
    } else {
      setShowResult(true);
    }
  }

  function handleLevelUp() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setShowAnimation(true);
    timeoutRef.current = setTimeout(() => setShowAnimation(false), 1500);
    setLevel((prev) => prev + 1);
  }

  async function record() {
    setRecordStatus("ONGOING");
    try {
      const timestamp = Date.now();
      const prepare = await fetch("/api/record", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Fingerprint": generateSignedFingerprint(),
        },
        body: JSON.stringify({ level, nickname, timestamp }),
      });

      const { secret } = await prepare.json();

      const res = await fetch(`${API_ORIGIN}/api/v1/luck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          level,
          nickname,
          timestamp,
          secret,
        }),
      });
      if (res.ok) {
        alert("행운 박제에 성공했어요");
        setRecordStatus("COMPLETE");
      } else {
        const parsed = await res.json();
        alert(`서버 오류가 발생했어요: ${parsed.error}`);
        setRecordStatus("PENDING");
      }
    } catch (e) {
      alert(e);
      setRecordStatus("PENDING");
    }
  }

  async function share() {
    try {
      await navigator.share({
        title: "나의 운은 몇레벨일까요?",
        text: "오로지 클릭만으로 나의 운을 테스트해보세요!",
        url: CLIENT_ORIGIN,
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="px-4 h-full flex flex-col">
      <header className="py-4">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeftIcon className="w-4 h-4" />
          <p>메인으로</p>
        </Link>
      </header>
      <main className="flex w-full flex-1 flex-col items-center pb-20 text-center">
        {!showResult ? (
          <section className="mt-6 flex flex-col items-center">
            <h1 className="text-lg font-bold mt-8 text-center">
              클로버와 하이파이브
            </h1>
            <p className="text-gray-500 text-sm">
              클로버와 행운의 하이파이브를 성공해보세요!
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6 justify-center">
              <div className="shadow-lg border rounded-full aspect-square px-6 py-2 grid place-items-center text-center">
                <div>
                  <p className="text-sm text-gray-700">하이파이브 수</p>
                  <p className="text-2xl font-semibold text-green-primary-text ml-2">
                    {level}
                    <span className="text-sm text-gray-700">번</span>
                  </p>
                </div>
              </div>
              <div className="shadow-lg border rounded-full aspect-square px-6 py-2 grid place-items-center text-center">
                <div>
                  <p className="text-sm text-gray-700">성공 확률</p>
                  <p
                    className="text-xl font-semibold ml-2"
                    style={{ color: getLevelTextColor(level) }}
                  >
                    {Math.round(getPercentage(level) * 100)}
                    <span className="text-sm">%</span>
                  </p>
                </div>
              </div>
            </div>
            <Image
              onClick={levelUp}
              src={Character}
              alt="clova-character"
              title="클로버 캐릭터"
              width={100}
              height={100}
              className={classNames(
                "cursor-pointer w-[120px] mt-10 h-auto",
                showAnimation ? "animate-bounce" : "animate-pulse"
              )}
            />
            {showAnimation ? (
              <p className="text-green-primary-text mt-10 text-sm">
                🙌 클로버가 하이파이브를 허락했어요!
              </p>
            ) : (
              <p className="text-gray-500 mt-10 text-sm">
                <span className="text-green-primary-text">클로버</span>를 눌러
                하이파이브를 시도해보세요!
              </p>
            )}
          </section>
        ) : (
          <div className="mt-10 w-full flex flex-col items-center">
            <h1 className="mt-1 font-semibold">
              나는 클로버와{" "}
              <span className="text-xl text-green-primary-text font-bold">
                {level}
              </span>
              번 하이파이브했어요!
            </h1>
            <p className="text-gray-500 text-sm">
              {formatProbability(getLevelProbability(level - 1))}%의 사람들이
              성공했어요.
            </p>
            <Image
              src={clova.image}
              alt="clova"
              width={200}
              height={200}
              className="h-auto w-[160px] mt-8 rounded-lg"
            />
            <p className="mt-4">{clova.title}</p>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {clova.description}
            </p>
            <div className="mt-8 w-full max-w-[480px] px-4">
              {recordStatus === "COMPLETE" ? (
                <div className="text-blue-500">
                  <p>박제 완료!</p>
                </div>
              ) : recordStatus === "ONGOING" ? (
                <div className="text-green-600">
                  <p>행운 박제중...</p>
                </div>
              ) : (
                <div className="flex bg-white py-3 rounded-lg">
                  <input
                    type="text"
                    ref={inputRef}
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="w-full px-4 focus:outline-none bg-transparent"
                    placeholder="행운의 이름을 입력해주세요"
                  />
                  <button
                    disabled={recordStatus !== "PENDING" || nickname.length < 1}
                    onClick={record}
                    className="text-[#141414] px-4 shrink-0 disabled:text-gray-400"
                  >
                    행운 기록
                  </button>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  onClick={reset}
                  className="border rounded-lg border-green-primary-text text-green-primary-text bg-white"
                >
                  다시하기
                </button>
                <button
                  onClick={share}
                  className="bg-green-primary-text rounded-lg py-2.5 text-white hover:bg-green-primary"
                >
                  공유하기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <footer className="py-4">
        <p>copyright 2024. 럭키비키</p>
      </footer>
    </div>
  );
}
