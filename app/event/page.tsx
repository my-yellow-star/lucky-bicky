"use client";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    alert("이벤트는 현재 준비중이에요.\n멋진 이벤트를 가지고 찾아올게요!");
    router.replace("/");
  }, [router]);

  return (
    <div className="px-4">
      <header className="py-4">
        <Link href="/" className="flex items-center gap-2">
          <ChevronLeftIcon className="w-4 h-4" />
          <p>메인으로</p>
        </Link>
      </header>
    </div>
  );
}
