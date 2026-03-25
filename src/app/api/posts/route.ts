import { NextRequest, NextResponse } from "next/server";
import { getPosts, createPost } from "@/lib/store";

export async function GET() {
  return NextResponse.json(getPosts());
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, author, content } = body;
  if (!title || !author || !content) {
    return NextResponse.json({ error: "필수 항목을 입력해주세요." }, { status: 400 });
  }
  const post = createPost({ title, author, content });
  return NextResponse.json(post, { status: 201 });
}
