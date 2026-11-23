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
    const appPath =
      pathname === "/admin"
        ? "/app"
        : pathname.startsWith("/admin/")
          ? `/app${pathname.slice("/admin".length)}`
          : `/app${pathname}`;

    return NextResponse.rewrite(
      new URL(appPath, req.url),
    );
  }

  const isRootDomain =
    hostname === "localhost:3000" ||
    hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN;

  if (isRootDomain) {
    if (pathname === "/app" || pathname.startsWith("/app/")) {
      return NextResponse.next();
    }

    if (pathname === "/admin" || pathname.startsWith("/admin/")) {
      const appPath =
        pathname === "/admin"
          ? "/app"
          : `/app${pathname.slice("/admin".length)}`;
      return NextResponse.rewrite(new URL(appPath, req.url));
    }

    const appRoutes = new Set([
      "login",
      "sites",
      "settings",
      "site",
      "post",
    ]);
    const firstPathSegment = pathname.split("/")[1];
    if (appRoutes.has(firstPathSegment)) {
      return NextResponse.rewrite(new URL(`/app${pathname}`, req.url));
    }
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
