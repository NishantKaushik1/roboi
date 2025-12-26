/**
 * Next.js Middleware
 * Runs before every request to perform authentication, redirects, and security checks
 * 
 * Docs: https://nextjs.org/docs/app/building-your-application/routing/middleware
 */

import { NextResponse } from 'next/server';

/**
 * Middleware function
 * @param {Request} request - The incoming request
 * @returns {NextResponse} The response
 */
export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Get authentication token from cookies
  // const token = request.cookies.get('auth_token')?.value;

  // Define public routes (no auth required)
  const publicRoutes = ['/login', '/forgot-password'];
  // const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));

  // Define protected routes (auth required)
  const protectedRoutes = ['/hq-overview', '/state-wise', '/city-wise', '/anpr-vehicles', '/vehicle-profile'];
  // const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // TODO: Uncomment these lines when authentication is implemented
  // Redirect to login if accessing protected route without token
  // if (isProtectedRoute && !token) {
  //   const loginUrl = new URL('/login', request.url);
  //   loginUrl.searchParams.set('redirect', pathname);
  //   return NextResponse.redirect(loginUrl);
  // }

  // Redirect to dashboard if accessing public route with token
  // if (isPublicRoute && token) {
  //   return NextResponse.redirect(new URL('/hq-overview', request.url));
  // }

  // Add security headers
  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  response.headers.set('X-Frame-Options', 'SAMEORIGIN');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  // CORS headers (if needed for API routes)
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', process.env.NEXT_PUBLIC_APP_URL || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
  }

  return response;
}

/**
 * Matcher configuration
 * Specifies which routes this middleware should run on
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - /api/v1/ws (WebSocket endpoint to avoid upgrade handling issues)
     */
    '/((?!_next/static|_next/image|favicon.ico|api/v1/ws|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
