"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { signOut, useSession } from "next-auth/react"
import { 
  Menu, 
  X, 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  LayoutDashboard,
  Wrench,
  ClipboardList,
  FileText
} from "lucide-react"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "/dashboard", label: "Tableau de bord", icon: LayoutDashboard },
  { href: "/equipment", label: "Équipements", icon: Wrench },
  { href: "/maintenance", label: "Maintenance", icon: ClipboardList },
  { href: "/reports", label: "Rapports", icon: FileText },
]

export function Navbar() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut({ redirect: true, callbackUrl: "/" })
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-2">
            {status === "loading" ? (
              <div className="h-8 w-20 bg-muted animate-pulse rounded-lg" />
            ) : session ? (
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
                      <User className="w-4 h-4 text-primary" />
                    )}
                  </div>
                  <span className="text-sm font-medium max-w-[120px] truncate">
                    {session.user?.name || session.user?.email}
                  </span>
                  <ChevronDown className="w-4 h-4 text-muted-foreground" />
                </button>

                {/* Profile Dropdown */}
                {profileDropdownOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setProfileDropdownOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                      <div className="px-4 py-3 border-b border-border">
                        <p className="text-sm font-medium truncate">{session.user?.name}</p>
                        <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                      </div>
                      <div className="py-1">
                        <Link
                          href="/profile"
                          className="flex items-center gap-3 px-4 py-2 text-sm hover:bg-muted transition-colors"
                          onClick={() => setProfileDropdownOpen(false)}
                        >
                          <User className="w-4 h-4" />
                          Profil
                        </Link>
                        <Link
                          href="/settings"
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
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register">
                  <Button size="sm">
                    Inscription
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md hover:bg-muted transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border">
          <div className="px-4 py-3 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Auth Section */}
          <div className="border-t border-border px-4 py-4 space-y-2">
            {status === "loading" ? (
              <div className="h-10 bg-muted animate-pulse rounded-lg" />
            ) : session ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    {session.user?.image ? (
                      <img
                        src={session.user.image}
                        alt={session.user.name || "Profile"}
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{session.user?.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{session.user?.email}</p>
                  </div>
                </div>
                <div className="space-y-1 mt-3">
                  <Link
                    href="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    <User className="w-4 h-4" />
                    Profil
                  </Link>
                  <Link
                    href="/settings"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    Paramètres
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-destructive hover:bg-destructive/10 w-full transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              </>
            ) : (
              <div className="flex gap-2 mt-3">
                <Link href="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link href="/register" className="flex-1">
                  <Button className="w-full">
                    Inscription
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
