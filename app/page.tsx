"use client";

import Image from "next/image";

import Character from "@/public/clova/character.webp";
import Link from "next/link";
import { RankerList } from "./components/ranker-list";
import { IntroSectionItem } from "./components/intro-section-item";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export default function Home() {
  return (
    <div className="px-4 h-full flex flex-col">
      <Header />
      <main className="flex w-full flex-1 flex-col items-center py-12 text-center">
        <Image
          src={Character}
          alt="clova-character"
          title="클로버 캐릭터"
          width={100}
          height={100}
          className="w-[80px] h-auto"
        />
        <h1 className="text-xl mt-8 font-bold text-[#141414]">
          럭키비키: 온라인 <span className="text-green-primary-text">행운</span>{" "}
          테스트
        </h1>
        <p className="mt-1 text-gray-700">
          오로지 터치로만 여러분의 행운을 시험해 보세요!
        </p>
        <section className="w-full flex flex-col gap-2 mt-10 text-start">
          <IntroSectionItem emoji="🙌">
            <p>
              클로버를 터치하면{" "}
              <span className="font-semibold">하이파이브</span>
              를 할 수 있어요
              <br />
              클로버는 <span className="font-semibold">선택받은 사람</span>만
              하이파이브를 허락해줘요
            </p>
          </IntroSectionItem>
          <IntroSectionItem emoji="🍀">
            <p>
              나는 몇 번까지 하이파이브를 할 수 있을까요?
              <br />
              하이파이브를 많이 하면{" "}
              <span className="font-semibold">희귀한 클로버</span>가 나타나요!
            </p>
          </IntroSectionItem>
          <IntroSectionItem emoji="💝">
            <p>
              특정 횟수를 달성하면{" "}
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
              <p className="font-semibold">하이파이브 하러 가기</p>
            </div>
          </Link>
          <Link href="/event">
            <div className="flex px-4 gap-2 items-center rounded-lg py-3 justify-center bg-gradient-to-r from-[#b16fff] to-[#e531fa] text-[#f1f1f1]">
              <p className="font-semibold">이벤트 참여하기</p>
            </div>
          </Link>
        </section>
        <section className="w-full mt-20">
          <div className="text-start px-2 pt-2">
            <div className="flex items-center justify-between">
              <h1 className="font-bold">🏆 행운 랭킹</h1>
              <Link href="/ranking">
                <ChevronRightIcon className="w-6 h-6" />
              </Link>
            </div>
            <p className="text-gray-500 mt-1 text-sm">
              가장 많은 하이파이브 횟수를 기록한 사람들이에요
            </p>
          </div>
          <RankerList className="w-full" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
