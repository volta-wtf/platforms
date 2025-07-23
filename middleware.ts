import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: [
    "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
  ],
};

export default function middleware(req: NextRequest) {
  // Middleware temporal ultra-básico para debugging
  console.log("Middleware called for:", req.url);
  
  // Por ahora, solo pasar todo sin procesar
  return NextResponse.next();
}
