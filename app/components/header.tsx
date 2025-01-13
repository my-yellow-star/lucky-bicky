import Link from "next/link";
import Image from "next/image";
import Logo from "@/public/lucky-bicky-logo.webp";

export function Header() {
  return (
    <header className="py-4">
      <Link href="/">
        <Image
          src={Logo}
          alt="럭키비키 로고"
          title="럭키비키 - Lucky bicky"
          width={200}
          height={50}
          className="w-[100px] md:w-[150px] h-auto cursor-pointer"
        />
      </Link>
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
  );
}
