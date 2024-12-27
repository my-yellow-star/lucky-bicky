import { API_ORIGIN } from "@/app/constant";
import { encrypt } from "@/app/function";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const body: { level: number; nickname: string } = await request.json();

    const timestamp = Date.now();
    const payload = JSON.stringify({
      level: body.level,
      nickname: body.nickname,
      timestamp,
    });
    const secret = encrypt(payload);

    const res = await fetch(`${API_ORIGIN}/api/v1/luck`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        level: body.level,
        nickname: body.nickname,
        timestamp,
        secret,
      }),
    });

    if (res.ok) {
      return NextResponse.json({ success: true });
    }
    const parsed = await res.json();
    console.log(parsed);
    return NextResponse.json(
      {
        success: false,
        error: parsed.error ?? parsed.message ?? res.statusText,
      },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
