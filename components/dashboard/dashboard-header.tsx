"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createBrowserClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface DashboardHeaderProps {
  user: User
  profile: any
}

export function DashboardHeader({ user, profile }: DashboardHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createBrowserClient()
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf722ceb-e7b9-4590-948e-681c5bcaffa1-dgMfg1h5S5kjnl0vai88AXFuzuE0Jy.jpeg"
                alt="HHS Seal"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-sm font-bold text-gray-900">HHS Grant Portal</h1>
              <p className="text-xs text-gray-600">Official Government System</p>
            </div>
          </div>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard")}>
              Dashboard
            </Button>
            <Button variant="ghost" size="sm" onClick={() => router.push("/my-applications")}>
              My Applications
            </Button>
            <Button variant="ghost" size="sm" onClick={() => router.push("/dashboard#grants")}>
              Browse Grants
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {profile?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="hidden md:inline">{profile?.full_name || user.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/my-applications")}>My Applications</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/guidelines")}>Guidelines</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}
