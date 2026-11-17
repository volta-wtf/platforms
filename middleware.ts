import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");

  if (!hostname) {
    return NextResponse.next();
  }

  if (hostname.includes("app.")) {
    return NextResponse.rewrite(
      new URL(`/app${req.nextUrl.pathname}`, req.url),
    );
  }

  if (hostname === "localhost:3000") {
    return NextResponse.rewrite(
      new URL(`/home${req.nextUrl.pathname}`, req.url),
    );
  }

  return NextResponse.rewrite(
    new URL(`/${hostname}${req.nextUrl.pathname}`, req.url),
  );
}
