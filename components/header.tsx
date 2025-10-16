"use client"

import { Bell, Search, Settings, User, LogOut, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/lib/auth"
import { useRouter } from "next/navigation"
import { useState } from "react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  const { logout, fullName } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNavigation = (tab: string, path: string) => {
    setActiveTab(tab)
    router.push(path)
  }

  return (
    <header className="border-b border-border bg-card sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button onClick={() => handleNavigation("dashboard", "/")} className="flex items-center gap-2">
              <Image src="/images/boa-logo.png" alt="Bank of America" width={48} height={48} className="w-12 h-12" />
            </button>

            <nav className="hidden md:flex items-center gap-6">
              <button
                onClick={() => handleNavigation("dashboard", "/")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "dashboard" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavigation("accounts", "/accounts")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "accounts" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Accounts
              </button>
              <button
                onClick={() => handleNavigation("cards", "/cards")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "cards" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => handleNavigation("transfers", "/transfers")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "transfers" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Transfers
              </button>
              <button
                onClick={() => handleNavigation("billpay", "/bill-pay")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "billpay" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Bill Pay
              </button>
              <button
                onClick={() => handleNavigation("investments", "/investments")}
                className={`text-sm font-medium transition-colors ${
                  activeTab === "investments" ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Investments
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." className="pl-9 w-64 bg-secondary border-border" />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Payment Received</p>
                    <p className="text-xs text-muted-foreground">$4,250.00 deposited to checking</p>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">Bill Due Soon</p>
                    <p className="text-xs text-muted-foreground">Electric bill due in 3 days</p>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={() => router.push("/settings")}
            >
              <Settings className="w-5 h-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
                  <User className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{fullName}</p>
                    <p className="text-xs text-muted-foreground">Account Holder</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>Profile Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/security")}>Security</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/preferences")}>Preferences</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => handleNavigation("dashboard", "/")}>Dashboard</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("accounts", "/accounts")}>Accounts</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("cards", "/cards")}>Cards</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("transfers", "/transfers")}>
                  Transfers
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("billpay", "/bill-pay")}>Bill Pay</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleNavigation("investments", "/investments")}>
                  Investments
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
