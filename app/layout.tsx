import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { CLIENT_ORIGIN } from "./constant";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

const title = "럭키비키 - 내 운 시험하기";
const description = "나의 운은 상위 몇퍼센트일까요? 지금 확인해보세요!";

export const metadata: Metadata = {
  metadataBase: new URL(CLIENT_ORIGIN),
  title,
  description,
  openGraph: {
    title,
    description,
    url: CLIENT_ORIGIN,
    images: [
      {
        url: "https://diggingtoon.s3.ap-northeast-2.amazonaws.com/lucky-bicky.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
    locale: "ko_KR",
    siteName: "럭키비키",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images:
      "https://diggingtoon.s3.ap-northeast-2.amazonaws.com/lucky-bicky.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Language" content="ko" />
        <meta name="apple-mobile-web-app-title" content="럭키비키" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${pretendard.className} bg-[#f1f1f1]`}>
        <div className="flex justify-center">
          <div className="min-h-screen w-full max-w-screen-md bg-[#fafafa] text-[#111111]">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
