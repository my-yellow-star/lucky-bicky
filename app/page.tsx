"use client";

import Image from "next/image";
import { useState } from "react";
import {
  getPercentage,
  formatProbability,
  getLevelProbability,
  seededRandom,
} from "./function";
import LevelUpAnimation from "./level-up-animation";
import { API_ORIGIN, CLIENT_ORIGIN } from "./constant";

export default function Home() {
  const [level, setLevel] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [nickname, setNickname] = useState("");
  const [recordStatus, setRecordStatus] = useState<
    "PENDING" | "ONGOING" | "COMPLETE"
  >("PENDING");

  function levelUp() {
    if (seededRandom(Date.now()) < getPercentage(level)) {
      handleLevelUp();
    } else {
      setShowResult(true);
    }
  }

  function handleLevelUp() {
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1500);
    setLevel((prev) => prev + 1);
  }

  async function record() {
    setRecordStatus("ONGOING");
    try {
      const res = await fetch(`${API_ORIGIN}/api/v1/luck`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ level, nickname }),
      });
      if (res.ok) {
        alert("행운 박제에 성공했어요");
        setRecordStatus("COMPLETE");
      } else {
        const parsed = await res.json();
        alert(
          `서버 오류가 발생했어요: ${
            parsed.error ?? parsed.message ?? res.statusText
          }`
        );
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
    } catch {}
  }

  return (
    <div className="px-4 h-full flex flex-col">
      <header className="py-4">
        <Image
          onClick={() => location.reload()}
          src="/luck-logo.png"
          alt="luck-logo"
          title="럭키비키 - Lucky bicky"
          width={200}
          height={50}
          className="w-[200px] h-auto cursor-pointer"
        />
      </header>
      <main className="flex flex-1 flex-col items-center py-10 text-center">
        {!showResult ? (
          <section className="mt-6">
            <h1 className="text-2xl font-bold">오늘의 운 시험하기</h1>
            <p className="mt-8">
              레벨업 확률:{" "}
              <span>{(getPercentage(level) * 100).toFixed(2)}%</span>
            </p>
            <p>
              누적 확률:{" "}
              <span>{formatProbability(getLevelProbability(level))}%</span>
            </p>
            <div className="relative">
              <p className="text-[120px]">{level}</p>
              {showAnimation && (
                <LevelUpAnimation className="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute z-50" />
              )}
            </div>
            <button
              onClick={levelUp}
              className="bg-green-600 text-white px-6 py-4 rounded-lg mt-4 hover:bg-green-500"
            >
              클릭으로 레벨업
            </button>
          </section>
        ) : (
          <section className="mt-10 w-full flex flex-col items-center">
            <h1 className="text-2xl font-bold">
              {nickname.length > 0 ? `${nickname}님의` : "나의"} 운 결과
            </h1>
            <p className="text-[120px]">
              <span className="text-[48px] font-semibold">LV.</span>
              {level}
            </p>
            <p className="text-lg">
              나의 운은 상위{" "}
              <span className="text-[#f00]">
                {formatProbability(getLevelProbability(level - 1))}%
              </span>
              에요!
            </p>
            <div className="mt-8 w-full max-w-[480px]">
              {recordStatus === "COMPLETE" ? (
                <div className="text-blue-500">
                  <p>박제 완료!</p>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    onChange={(e) => setNickname(e.target.value)}
                    className="bg-gray-200 w-full px-4 py-2 rounded focus:outline-none"
                    placeholder="닉네임 입력하고 기록하기"
                  />
                  <button
                    disabled={recordStatus !== "PENDING"}
                    onClick={record}
                    className="rounded bg-black text-white px-4 shrink-0 disabled:bg-gray-400"
                  >
                    행운 박제
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={share}
              className="w-full max-w-[480px] bg-blue-500 rounded py-2.5 mt-4 text-white hover:bg-blue-600"
            >
              친구에게 공유하기
            </button>
          </section>
        )}
      </main>
      <footer className="py-4">
        <p>copyright 2024. 럭키비키</p>
      </footer>
    </div>
  );
}
