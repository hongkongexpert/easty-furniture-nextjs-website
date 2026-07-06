import { NextRequest, NextResponse } from "next/server";
import { isLocale } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const locale = isLocale(first) ? first : "en";
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-locale", locale);

  if (locale !== "en") {
    const rewritten = request.nextUrl.clone();
    rewritten.pathname = `/${segments.slice(1).join("/")}`;
    if (rewritten.pathname === "/") rewritten.pathname = "/";
    return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
  }

  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next|images|pdfs|favicon.ico|robots.txt|sitemap.xml).*)"]
};
