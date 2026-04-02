// =============================================================================
// MIDDLEWARE - SGME
// =============================================================================
// This middleware handles route protection and role-based access control.
// It runs on every request to protected routes and:
// 1. Checks if user is authenticated
// 2. Redirects to change-password page if mustChangePassword is true
// 3. Verifies user has the correct role for the requested route
// 4. Redirects unauthorized users to their appropriate dashboard
//
// Protected routes:
// - /dashboard/* - Requires authentication
// - /dashboard/admin/* - Requires ADMIN role
// - /dashboard/employe/* - Requires EMPLOYE role
// - /dashboard/technicien/* - Requires TECHNICIEN role
// - /profile - Requires authentication
// - /change-password - Requires authentication
// =============================================================================

import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

// Use Node.js runtime to support crypto module used by NextAuth
export const runtime = "nodejs"

// =============================================================================
// MIDDLEWARE FUNCTION
// =============================================================================
// Main middleware function that runs on every request.
// Uses NextAuth to get the current session and validate access.
// =============================================================================
export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // =============================================================================
  // PUBLIC ROUTES
  // =============================================================================
  // These routes are accessible to everyone, including non-authenticated users.
  // =============================================================================
  const isPublicRoute = nextUrl.pathname === "/" || 
                        nextUrl.pathname === "/login" || 
                        nextUrl.pathname === "/register"
  
  // =============================================================================
  // API ROUTES
  // =============================================================================
  // API routes are handled separately and don't need middleware protection.
  // =============================================================================
  const isApiRoute = nextUrl.pathname.startsWith("/api")

  // =============================================================================
  // AUTH ROUTES
  // =============================================================================
  // Auth routes (login, register) should redirect to dashboard if already logged in.
  // =============================================================================
  const isAuthRoute = nextUrl.pathname === "/login" || 
                      nextUrl.pathname === "/register"

  // =============================================================================
  // SKIP MIDDLEWARE FOR API AND PUBLIC ROUTES
  // =============================================================================
  // Don't run middleware on API routes or public routes.
  // =============================================================================
  if (isApiRoute || isPublicRoute) {
    return NextResponse.next()
  }

  // =============================================================================
  // REDIRECT LOGGED-IN USERS FROM AUTH ROUTES
  // =============================================================================
  // If user is already logged in and tries to access login/register,
  // redirect them to their appropriate dashboard.
  // =============================================================================
  if (isAuthRoute && isLoggedIn) {
    const userRole = req.auth?.user?.role
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), nextUrl))
  }

  // =============================================================================
  // REQUIRE AUTHENTICATION FOR PROTECTED ROUTES
  // =============================================================================
  // If user is not logged in, redirect to login page.
  // =============================================================================
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  // =============================================================================
  // CHECK FIRST-LOGIN PASSWORD CHANGE
  // =============================================================================
  // If user must change password, redirect to change-password page.
  // This is enforced before any other route access.
  // =============================================================================
  const mustChangePassword = req.auth?.user?.mustChangePassword
  const isChangePasswordRoute = nextUrl.pathname === "/change-password"

  if (mustChangePassword && !isChangePasswordRoute) {
    return NextResponse.redirect(new URL("/change-password", nextUrl))
  }

  // =============================================================================
  // ROLE-BASED ACCESS CONTROL
  // =============================================================================
  // Check if user has the correct role for the requested route.
  // =============================================================================
  const userRole = req.auth?.user?.role

  // Admin routes - only ADMIN role can access
  if (nextUrl.pathname.startsWith("/dashboard/admin") && userRole !== "ADMIN") {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), nextUrl))
  }

  // Employé routes - only EMPLOYE role can access
  if (nextUrl.pathname.startsWith("/dashboard/employe") && userRole !== "EMPLOYE") {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), nextUrl))
  }

  // Technicien routes - only TECHNICIEN role can access
  if (nextUrl.pathname.startsWith("/dashboard/technicien") && userRole !== "TECHNICIEN") {
    return NextResponse.redirect(new URL(getDashboardUrl(userRole), nextUrl))
  }

  // =============================================================================
  // ALLOW ACCESS
  // =============================================================================
  // If all checks pass, allow the request to continue.
  // =============================================================================
  return NextResponse.next()
})

// =============================================================================
// GET DASHBOARD URL HELPER
// =============================================================================
// Returns the appropriate dashboard URL based on user role.
// This ensures users are always redirected to their correct dashboard.
// =============================================================================
function getDashboardUrl(role: string | undefined): string {
  switch (role) {
    case "ADMIN":
      return "/dashboard/admin"
    case "EMPLOYE":
      return "/dashboard/employe"
    case "TECHNICIEN":
      return "/dashboard/technicien"
    default:
      return "/login"
  }
}

// =============================================================================
// MIDDLEWARE CONFIG
// =============================================================================
// Specifies which routes the middleware should run on.
// This excludes static files and images for performance.
// =============================================================================
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}
