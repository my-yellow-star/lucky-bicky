"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { RankerList } from "../components/ranker-list";
import { useState } from "react";
import { classNames } from "../lib/function";

export default function Page() {
  const [daysBefore, setDaysBefore] = useState<number | undefined>(7);

  return (
    <div className="px-4 h-full flex w-full flex-col">
      <header className="py-4">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeftIcon className="w-4 h-4" />
          <p>메인으로</p>
        </Link>
      </header>
      <main className="w-full pb-20">
        <h1 className="font-semibold">명예의 전당</h1>
        <div className="mt-2 flex gap-2">
          <button
            onClick={() => setDaysBefore(7)}
            className={classNames(
              "text-sm px-3 py-1.5 rounded-full",
              daysBefore === 7
                ? "text-white bg-[#141414]"
                : "bg-gray-200 text-gray-700"
            )}
          >
            금주 랭킹
          </button>
          <button
            onClick={() => setDaysBefore(undefined)}
            className={classNames(
              "text-sm px-3 py-1.5 rounded-full",
              daysBefore === undefined
                ? "text-white bg-[#141414]"
                : "bg-gray-200 text-gray-700"
            )}
          >
            전체 랭킹
          </button>
        </div>
        <RankerList
          size={30}
          fromDayBefore={daysBefore}
          className="w-full mt-2"
        />
      </main>
    </div>
  );
}
