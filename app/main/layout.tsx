import { Metadata } from "next";
import { CLIENT_ORIGIN } from "../lib/constant";

export function generateMetadata(): Metadata {
  const title = "클로버와 하이파이브";
  const description = "클로버와 행운의 하이파이브를 성공해보세요!";
  const imageUrl =
    "https://diggingtoon.s3.ap-northeast-2.amazonaws.com/cloverhifive.webp";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${CLIENT_ORIGIN}/main`,
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
}

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
