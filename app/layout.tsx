import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import { CLIENT_ORIGIN } from "./lib/constant";
import Script from "next/dist/client/script";

const pretendard = localFont({
  src: "./fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
});

const title = "럭키비키: 온라인 행운 테스트";
const description = "오로지 터치로만 여러분의 행운을 시험해 보세요!";
const imageUrl =
  "https://diggingtoon.s3.ap-northeast-2.amazonaws.com/luckybicky-cover.webp";
const GA_TRACKING_ID = "G-01FMX7HFBS";

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
        url: imageUrl,
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
    images: imageUrl,
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
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `}
        </Script>
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
