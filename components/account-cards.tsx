"use client"

import { Card } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, Eye, EyeOff, CreditCard, PiggyBank, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function AccountCards() {
  const [showBalance, setShowBalance] = useState(true)
  const router = useRouter()

  const accounts = [
    {
      name: "Checking Account",
      number: "••••2626",
      fullNumber: "****-****-0261-62626",
      balance: 1356091,
      change: 45324.5,
      changePercent: 3.45,
      type: "checking",
      icon: CreditCard,
      color: "bg-primary",
    },
    {
      name: "Savings Account",
      number: "••••7231",
      fullNumber: "****-****-****-7231",
      balance: 3887265,
      change: 82105.0,
      changePercent: 2.16,
      type: "savings",
      icon: PiggyBank,
      color: "bg-accent",
    },
    {
      name: "Investment Account",
      number: "••••9104",
      fullNumber: "****-****-****-9104",
      balance: 89342.67,
      change: -432.15,
      changePercent: -0.48,
      type: "investment",
      icon: TrendingUp,
      color: "bg-chart-2",
    },
  ]

  const handleAccountClick = (accountType: string) => {
    router.push(`/accounts/${accountType}`)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Your Accounts</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowBalance(!showBalance)}
          className="text-muted-foreground hover:text-foreground"
        >
          {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.map((account) => {
          const Icon = account.icon
          return (
            <Card
              key={account.number}
              onClick={() => handleAccountClick(account.type)}
              className="p-6 hover:shadow-lg transition-all cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{account.name}</p>
                    <p className="text-xs text-muted-foreground mt-1">{account.number}</p>
                  </div>
                  <div className={`w-10 h-10 rounded-full ${account.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>

                <div>
                  <p className="text-3xl font-bold text-foreground">
                    {showBalance
                      ? `$${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}`
                      : "••••••"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {account.change >= 0 ? (
                    <div className="flex items-center gap-1 text-accent">
                      <ArrowUpRight className="w-4 h-4" />
                      <span className="text-sm font-medium">${Math.abs(account.change).toFixed(2)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-destructive">
                      <ArrowDownRight className="w-4 h-4" />
                      <span className="text-sm font-medium">${Math.abs(account.change).toFixed(2)}</span>
                    </div>
                  )}
                  <span className={`text-sm ${account.change >= 0 ? "text-accent" : "text-destructive"}`}>
                    {account.changePercent > 0 ? "+" : ""}
                    {account.changePercent}%
                  </span>
                  <span className="text-xs text-muted-foreground">this month</span>
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
