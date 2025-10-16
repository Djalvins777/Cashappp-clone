"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Mail, LogOut, DollarSign, ArrowRightLeft, CreditCard, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function DashboardPage() {
  const { isAuthenticated, fullName, logout } = useAuth()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("accounts")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const totalBalance = 1356091 + 3887265 + 0

  const accounts = [
    {
      name: "Personal Checking",
      number: "3340",
      balance: 1356091.0,
      type: "checking",
    },
    {
      name: "Personal Saving",
      number: "5125",
      balance: 3887265.0,
      type: "savings",
    },
    {
      name: "Home Providing",
      number: "9314",
      balance: 0.0,
      type: "providing",
    },
  ]

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleTabClick = (tab: string, path: string) => {
    setActiveTab(tab)
    router.push(path)
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col">
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <div className="flex items-center gap-2">
            <span className="text-[#012169] font-bold text-lg tracking-tight">BANK OF AMERICA</span>
            <div className="flex flex-col gap-0.5">
              <div className="w-6 h-0.5 bg-[#e31837]"></div>
              <div className="w-6 h-0.5 bg-[#e31837]"></div>
              <div className="w-6 h-0.5 bg-[#e31837]"></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Mail className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#e31837] rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 py-6 space-y-6">
          <div>
            <h1 className="text-2xl font-normal text-gray-800">Hello, {fullName}</h1>
            <p className="text-sm text-gray-600 mt-1">Preferred Rewards Platinum</p>
          </div>

          <div>
            <h2 className="text-base font-normal text-gray-800 mb-3">My Rewards</h2>
            <Card className="p-4 bg-white border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#e31837] rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">R</span>
                </div>
                <div>
                  <p className="text-base font-medium text-gray-800">Your Rewards</p>
                  <p className="text-sm text-gray-600">Boa rewards</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-gradient-to-r from-[#8b2332] to-[#c84c4c] rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <span className="text-base font-medium">Bank of America</span>
              <span className="text-2xl font-bold">
                ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {accounts.map((account) => (
              <Card
                key={account.number}
                onClick={() => router.push(`/accounts/${account.type}`)}
                className="p-4 bg-white border-gray-200 cursor-pointer hover:shadow-md transition-shadow"
              >
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">
                    {account.name} - {account.number}
                  </p>
                  <p className="text-2xl font-bold text-gray-800">
                    ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            <Card className="p-4 bg-gradient-to-r from-[#8b2332] to-[#012169] text-white border-0">
              <div className="flex items-center justify-between">
                <span className="text-base font-medium">Credit Card</span>
                <span className="text-xl font-bold">$0.00</span>
              </div>
            </Card>

            <Card className="p-4 bg-white border-gray-200">
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-800">Investment</span>
                <span className="text-xl font-bold text-gray-800">$0.00</span>
              </div>
            </Card>
          </div>
        </div>
      </main>

      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-inset-bottom">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            onClick={() => handleTabClick("accounts", "/")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "accounts" ? "text-[#012169]" : "text-gray-600"
            }`}
          >
            <DollarSign className="w-6 h-6" />
            <span className="text-xs font-medium">Accounts</span>
          </button>

          <button
            onClick={() => handleTabClick("transfer", "/transfers")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "transfer" ? "text-[#012169]" : "text-gray-600"
            }`}
          >
            <ArrowRightLeft className="w-6 h-6" />
            <span className="text-xs font-medium">Pay & Transfer</span>
          </button>

          <button
            onClick={() => handleTabClick("cards", "/cards")}
            className={`flex flex-col items-center gap-1 ${activeTab === "cards" ? "text-[#012169]" : "text-gray-600"}`}
          >
            <CreditCard className="w-6 h-6" />
            <span className="text-xs font-medium">My Cards</span>
          </button>

          <button
            onClick={() => handleTabClick("history", "/history")}
            className={`flex flex-col items-center gap-1 ${
              activeTab === "history" ? "text-[#012169]" : "text-gray-600"
            }`}
          >
            <Clock className="w-6 h-6" />
            <span className="text-xs font-medium">History</span>
          </button>
        </div>
      </nav>
    </div>
  )
}
