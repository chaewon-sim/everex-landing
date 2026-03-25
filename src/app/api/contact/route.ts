import { NextRequest, NextResponse } from "next/server";
import { createInquiry } from "@/lib/contact-store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, email, phone, type, message, privacyAgreed } = body;

    if (!name || !company || !email || !type || !message) {
      return NextResponse.json(
        { error: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    if (!privacyAgreed) {
      return NextResponse.json(
        { error: "개인정보 수집 및 이용에 동의해주세요." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "올바른 이메일 주소를 입력해주세요." },
        { status: 400 }
      );
    }

    const inquiry = createInquiry({
      name,
      company,
      email,
      phone,
      type,
      message,
      privacyAgreed,
    });

    return NextResponse.json({
      success: true,
      id: inquiry.id,
      message: "문의가 성공적으로 접수되었습니다.",
    });
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요." },
      { status: 500 }
    );
  }
}
