import type { NextRequest } from "next/server";
// Avoid loading next/server's user-agent parser into this edge bundle.
import { NextResponse } from "next/dist/server/web/spec-extension/response";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get("host");
  const pathname = new URL(req.url).pathname;

  if (!hostname) {
    return NextResponse.next();
  }

  if (hostname.includes("app.")) {
    return NextResponse.rewrite(
      new URL(`/app${pathname}`, req.url),
    );
  }

  if (hostname === "localhost:3000") {
    return NextResponse.rewrite(
      new URL(`/home${pathname}`, req.url),
    );
  }

  return NextResponse.rewrite(
    new URL(`/${hostname}${pathname}`, req.url),
  );
}
