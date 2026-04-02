// =============================================================================
// DASHBOARD NAVBAR - SGME
// =============================================================================
// This component provides the top navigation bar for the dashboard.
// It displays:
// - Logo and brand name
// - User profile information
// - Logout button
// - Mobile menu toggle
//
// The navbar is fixed at the top and provides quick access to user actions.
// =============================================================================

"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Bell,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Session } from "next-auth"

// =============================================================================
// DASHBOARD NAVBAR PROPS
// =============================================================================
// Props for the DashboardNavbar component.
// session: The current user session containing user information.
// =============================================================================
interface DashboardNavbarProps {
  session: Session
}

// =============================================================================
// DASHBOARD NAVBAR COMPONENT
// =============================================================================
// Main navbar component that displays user info and navigation actions.
// =============================================================================
export function DashboardNavbar({ session }: DashboardNavbarProps) {
  const router = useRouter()
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  // =============================================================================
  // HANDLE SIGN OUT
  // =============================================================================
  // Signs out the user and redirects to the login page.
  // =============================================================================
  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" })
  }

  // =============================================================================
  // GET USER INITIALS
  // =============================================================================
  // Gets user initials from name for avatar display.
  // =============================================================================
  const getUserInitials = () => {
    if (session.user?.name) {
      const names = session.user.name.split(" ")
      return names.map(n => n[0]).join("").toUpperCase().slice(0, 2)
    }
    return session.user?.email?.[0]?.toUpperCase() || "U"
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SG</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">SGME</span>
            </Link>
          </div>

          {/* Search bar - hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Rechercher..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>

            {/* User profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-muted transition-colors"
              >
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt={session.user.name || "Profile"}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <span className="text-sm font-medium text-primary">
                      {getUserInitials()}
                    </span>
                  )}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium truncate max-w-[120px]">
                    {session.user?.name || session.user?.email}
                  </p>
                  <p className="text-xs text-muted-foreground truncate max-w-[120px]">
                    {session.user?.role}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </button>

              {/* Profile dropdown menu */}
              {profileDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                    <div className="px-4 py-3 border-b border-border">
                      <p className="text-sm font-medium truncate">
                        {session.user?.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {session.user?.email}
                      </p>
                      <p className="text-xs text-primary mt-1">
                        {session.user?.role}
                      </p>
                    </div>
                    <div className="py-1">
                      <Link
                        href="/dashboard/profile"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        Profil
                      </Link>
                      <Link
                        href="/dashboard/settings"
                        className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
                        onClick={() => setProfileDropdownOpen(false)}
                      >
                        <Settings className="w-4 h-4" />
                        Paramètres
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-destructive hover:bg-destructive/10 w-full transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Déconnexion
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
