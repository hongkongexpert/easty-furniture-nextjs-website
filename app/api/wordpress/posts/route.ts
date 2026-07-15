import { NextRequest, NextResponse } from "next/server";
import { createPost } from "@/lib/wordpress";

function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export async function POST(request: NextRequest) {
  const expectedToken = process.env.WORDPRESS_PUBLISH_TOKEN;
  const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!expectedToken || token !== expectedToken) return unauthorized();

  const body = await request.json();
  if (!body?.title || !body?.content) {
    return NextResponse.json({ error: "title and content are required" }, { status: 400 });
  }

  try {
    const post = await createPost({
      title: String(body.title),
      content: String(body.content),
      excerpt: body.excerpt ? String(body.excerpt) : undefined,
      slug: body.slug ? String(body.slug) : undefined,
      status: body.status === "publish" ? "publish" : "draft"
    });

    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "WordPress post creation failed" }, { status: 502 });
  }
}
