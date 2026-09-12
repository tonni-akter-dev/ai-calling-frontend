/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that don't require subscription
// const publicRoutes = ['/login', '/signup', '/forgot-password', '/'];
// const subscriptionRoutes = ['/dashboard/subscription'];

export async function middleware(request: NextRequest) {
//   const token = request.cookies.get('accessToken')?.value;
//   const pathname = request.nextUrl.pathname;

  // If no token and trying to access protected route, redirect to login
//   if (!token && !publicRoutes.includes(pathname)) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   // If token exists and trying to access login page, redirect to dashboard
//   if (token && pathname === '/login') {
//     return NextResponse.redirect(new URL('/dashboard', request.url));
//   }

  // Check subscription status for protected dashboard routes
//   if (token && pathname.startsWith('/dashboard') && !publicRoutes.includes(pathname) && !subscriptionRoutes.includes(pathname)) {
//     try {
//       // Fetch subscription status from API
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/subscriptions/me`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await response.json();
      
//       // If no active subscription, redirect to subscription page
//       if (!data || data.status !== 'active' || new Date(data.current_period_end) <= new Date()) {
//         return NextResponse.redirect(new URL('/dashboard/subscription', request.url));
//       }
//     } catch (error) {
//       // If API call fails, still allow access (or redirect to subscription)
//       console.error('Subscription check failed:', error);
//       // Uncomment below to redirect on error
//       // return NextResponse.redirect(new URL('/dashboard/subscription', request.url));
//     }
//   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes (handled by backend)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
};