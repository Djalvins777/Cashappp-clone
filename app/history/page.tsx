"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { ArrowLeft, Search, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function HistoryPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  const transactions = [
    { date: "Today", merchant: "Amazon.com", amount: -156.78, category: "Shopping" },
    { date: "Today", merchant: "Starbucks", amount: -8.45, category: "Food & Drink" },
    { date: "Yesterday", merchant: "Shell Gas Station", amount: -65.0, category: "Gas" },
    { date: "Yesterday", merchant: "Whole Foods", amount: -234.56, category: "Groceries" },
    { date: "Dec 15", merchant: "Netflix", amount: -15.99, category: "Entertainment" },
    { date: "Dec 15", merchant: "Salary Deposit", amount: 4250.0, category: "Income" },
    { date: "Dec 14", merchant: "Apple Store", amount: -1299.0, category: "Shopping" },
    { date: "Dec 13", merchant: "Uber", amount: -32.5, category: "Transportation" },
  ]

  return (
    <div className="min-h-screen bg-[#f5f3f0] flex flex-col">
      <header className="bg-[#e31837] text-white px-4 py-4">
        <div className="max-w-md mx-auto flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-medium">Transaction History</h1>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto px-4 py-6 space-y-4">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search transactions..." className="pl-9 bg-white border-gray-300" />
            </div>
            <Button variant="outline" size="icon" className="border-gray-300 bg-transparent">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {transactions.map((transaction, index) => (
              <Card key={index} className="p-4 bg-white border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-base font-medium text-gray-800">{transaction.merchant}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {transaction.date} • {transaction.category}
                    </p>
                  </div>
                  <p className={`text-lg font-bold ${transaction.amount > 0 ? "text-green-600" : "text-gray-800"}`}>
                    {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
