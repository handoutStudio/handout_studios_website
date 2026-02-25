import { auth } from "@/auth";
import { NextResponse } from "next/server";

/**
 * Routes that require authentication (page routes only)
 */
const protectedRoutes = ["/admin", "/dashboard", "/profile", "/handout-studios"];

/**
 * API routes that should stay public
 */
const unprotectedApiRoutes = [ "/admin/earthline-made/api/getAllProducts", ];

export default auth((req) => {
    const { pathname } = req.nextUrl;
    // ✅ Skip public API routes
    if (unprotectedApiRoutes.some((route) => pathname.startsWith(route))) return NextResponse.next();
    const isProtected = protectedRoutes.some((route) => pathname.startsWith(route) );
    if (isProtected && !req.auth) return NextResponse.redirect(new URL("/earthline-made", req.url));
    return NextResponse.next();
});

/**
 * Exclude Next internals and static files
 */
export const config = { matcher: [ "/((?!_next/static|_next/image|favicon.ico).*)", ], };