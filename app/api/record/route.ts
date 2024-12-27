import { encrypt, generateHmac } from "@/app/function";
import { NextResponse } from "next/server";

const SIGN_KEY = process.env.SIGN || "";

// HMAC 서명 검증
function verifyHmac(data: string, signature: string, secret: string): boolean {
  const expectedSignature = generateHmac(data, secret);
  return expectedSignature === signature;
}

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: { level: number; nickname: string; timestamp: number } =
      await request.json();

    const fingerprintHeader = request.headers.get("x-fingerprint");
    if (!fingerprintHeader) {
      return NextResponse.json(
        { success: false, error: "Missing fingerprint" },
        { status: 403 }
      );
    }

    const [fingerprint, signature] = fingerprintHeader.split(".");
    if (!fingerprint || !signature) {
      return NextResponse.json(
        { success: false, error: "Invalid fingerprint format" },
        { status: 403 }
      );
    }

    // 핑거프린트 검증
    if (!verifyHmac(fingerprint, signature, SIGN_KEY)) {
      return NextResponse.json(
        { success: false, error: "Invalid fingerprint signature" },
        { status: 403 }
      );
    }

    const secret = encrypt(JSON.stringify(body));
    return NextResponse.json({ secret });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
