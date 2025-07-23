import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  // Versión ultra-simple para debugging
  console.log("Middleware called for:", req.url);
  
  try {
    const hostname = req.headers.get("host");
    
    if (!hostname) {
      return NextResponse.next();
    }

    // Solo manejar casos básicos
    if (hostname.includes("app.")) {
      return NextResponse.rewrite(new URL(`/app${req.nextUrl.pathname}`, req.url));
    }

    if (hostname === "localhost:3000") {
      return NextResponse.rewrite(new URL(`/home${req.nextUrl.pathname}`, req.url));
    }

    // Default: rewrite to domain route
    return NextResponse.rewrite(new URL(`/${hostname}${req.nextUrl.pathname}`, req.url));
    
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}
