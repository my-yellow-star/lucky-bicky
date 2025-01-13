"use client";

import Image from "next/image";

import Character from "@/public/clova/character.webp";
import Logo from "@/public/lucky-bicky-logo.webp";
import Link from "next/link";
import { RankerList } from "./components/ranker-list";
import { IntroSectionItem } from "./components/intro-section-item";
import { ChevronRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
  return (
    <div className="px-4 h-full flex flex-col">
      <header className="py-4">
        <Image
          onClick={() => location.reload()}
          src={Logo}
          alt="럭키비키 로고"
          title="럭키비키 - Lucky bicky"
          width={200}
          height={50}
          className="w-[100px] md:w-[150px] h-auto cursor-pointer"
        />
        <div className="flex gap-4 mt-2 px-1 text-gray-700">
          <nav>
            <Link href={`/main`}>행운 테스트</Link>
          </nav>
          <nav>
            <Link href={`/event`}>이벤트</Link>
          </nav>
          <nav>
            <Link href={`/ranking`}>명예의 전당</Link>
          </nav>
        </div>
      </header>
      <main className="flex w-full flex-1 flex-col items-center py-10 text-center">
        <Image
          src={Character}
          alt="clova-character"
          title="클로버 캐릭터"
          width={100}
          height={100}
          className="w-[80px] h-auto"
        />
        <h1 className="text-xl mt-6 font-bold text-[#141414]">
          럭키비키 온라인 <span className="text-green-primary-text">행운</span>{" "}
          테스트
        </h1>
        <p className="mt-1 text-gray-700">
          오로지 터치로만 여러분의 행운을 시험해 보세요!
        </p>
        <section className="w-full flex flex-col gap-2 mt-6 text-start">
          <IntroSectionItem emoji="🔢">
            <p>
              버튼을 터치하면 <span className="font-semibold">행운 숫자</span>가
              올라가요
              <br />
              숫자가 높아질수록 올라갈 확률은{" "}
              <span className="font-semibold">줄어들어요</span>
            </p>
          </IntroSectionItem>
          <IntroSectionItem emoji="🍀">
            <p>
              나는 어떤 숫자까지 올라갈 수 있을까요?
              <br />
              높은 숫자에서는{" "}
              <span className="font-semibold">희귀한 클로버</span>가 나타나요!
            </p>
          </IntroSectionItem>
          <IntroSectionItem emoji="💝">
            <p>
              특정 숫자를 달성하면{" "}
              <span className="font-semibold">이벤트 입장권</span>이 주어져요
              <br />
              이벤트에서는 기프티콘 같은{" "}
              <span className="font-semibold">경품</span>을 얻을 수 있어요
            </p>
          </IntroSectionItem>
        </section>
        <section className="mt-12 w-full flex flex-col gap-2">
          <Link href="/main">
            <div className="flex px-4 gap-2 items-center rounded-lg py-3 justify-center bg-gradient-to-r from-[#a4ec47] to-green-primary text-[#141414]">
              <p className="font-semibold">행운 테스트 하러 가기</p>
            </div>
          </Link>
          <Link href="/event">
            <div className="flex px-4 gap-2 items-center rounded-lg py-3 justify-center bg-gradient-to-r from-[#b16fff] to-[#e531fa] text-[#f1f1f1]">
              <p className="font-semibold">이벤트 참여하기</p>
            </div>
          </Link>
        </section>
        <section className="w-full mt-12">
          <div className="text-start px-2 pt-2">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">🏆 행운 랭킹</h1>
              <Link href="/ranking">
                <ChevronRightIcon className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              가장 높은 행운 숫자를 기록한 사람들이에요
            </p>
          </div>
          <RankerList className="w-full" />
        </section>
      </main>
      <footer className="py-4">
        <p>copyright 2024. 럭키비키</p>
      </footer>
    </div>
  );
}
