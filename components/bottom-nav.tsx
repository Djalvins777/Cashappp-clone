"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, CreditCard, DollarSign, TrendingUp, Clock } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { href: "/money", icon: Home, label: "Money" },
    { href: "/card", icon: CreditCard, label: "Card" },
    { href: "/pay", icon: DollarSign, label: "Pay" },
    { href: "/investing", icon: TrendingUp, label: "Investing" },
    { href: "/activity", icon: Clock, label: "Activity" },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                isActive ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1 sr-only">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
