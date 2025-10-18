"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Download, Send, ArrowLeftRight, CreditCard, TrendingUp, PiggyBank } from "lucide-react"

export default function AccountDetailPage() {
  const { isAuthenticated, fullName } = useAuth()
  const router = useRouter()
  const params = useParams()
  const accountType = params.type as string

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const accountData: Record<string, any> = {
    checking: {
      name: "Regular Checking Account",
      number: "****-****-0261-62626",
      accountNumber: "026162626",
      routingNumber: "00012727",
      balance: 1356091,
      available: 1356091,
      icon: CreditCard,
      color: "bg-primary",
      transactions: [
        { id: 1, name: "Wire Transfer Received", amount: 125000.0, date: "Today, 9:24 AM", status: "Completed" },
        { id: 2, name: "Business Payment", amount: 85000.0, date: "Yesterday, 8:00 AM", status: "Completed" },
        { id: 3, name: "Investment Return", amount: 42500.0, date: "Dec 8, 2:15 PM", status: "Completed" },
        { id: 4, name: "Property Rental Income", amount: 15000.0, date: "Dec 7, 10:30 AM", status: "Completed" },
        { id: 5, name: "Consulting Fee", amount: 28000.0, date: "Dec 6, 3:45 PM", status: "Completed" },
        { id: 6, name: "Transfer to Savings", amount: -50000.0, date: "Dec 5, 11:20 AM", status: "Completed" },
        { id: 7, name: "Luxury Purchase", amount: -12750.0, date: "Dec 4, 2:30 PM", status: "Completed" },
        { id: 8, name: "Monthly Expenses", amount: -8500.0, date: "Dec 3, 9:15 AM", status: "Completed" },
      ],
    },
    savings: {
      name: "Regular Savings Account",
      number: "****-****-****-7231",
      accountNumber: "026162627",
      routingNumber: "00012727",
      balance: 3887265,
      available: 3887265,
      icon: PiggyBank,
      color: "bg-accent",
      interestRate: 4.25,
      transactions: [
        { id: 1, name: "Monthly Interest Payment", amount: 13724.23, date: "Dec 1, 12:00 AM", status: "Completed" },
        { id: 2, name: "Transfer from Checking", amount: 50000.0, date: "Nov 28, 3:15 PM", status: "Completed" },
        { id: 3, name: "Investment Dividend", amount: 25000.0, date: "Nov 20, 10:30 AM", status: "Completed" },
        { id: 4, name: "Bonus Deposit", amount: 75000.0, date: "Nov 15, 9:00 AM", status: "Completed" },
      ],
    },
    investment: {
      name: "Investment Account",
      number: "****-****-****-9104",
      accountNumber: "026162628",
      routingNumber: "00012727",
      balance: 89342.67,
      available: 89342.67,
      icon: TrendingUp,
      color: "bg-chart-2",
      returnRate: 8.3,
      transactions: [
        { id: 1, name: "Stock Purchase - AAPL", amount: -5000.0, date: "Dec 5, 9:30 AM", status: "Completed" },
        { id: 2, name: "Dividend Payment", amount: 234.56, date: "Dec 1, 12:00 AM", status: "Completed" },
        { id: 3, name: "Stock Sale - GOOGL", amount: 3500.0, date: "Nov 20, 2:45 PM", status: "Completed" },
      ],
    },
  }

  const account = accountData[accountType]

  if (!isAuthenticated || !account) {
    return null
  }

  const Icon = account.icon

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="space-y-6">
          <Card className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-16 h-16 rounded-full ${account.color} flex items-center justify-center`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{account.name}</h1>
                  <p className="text-muted-foreground">{account.number}</p>
                  <p className="text-sm text-muted-foreground mt-1">Account Holder: {fullName}</p>
                </div>
              </div>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Statement
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6 p-4 bg-secondary/30 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Account Number</p>
                <p className="text-lg font-mono font-semibold text-foreground">{account.accountNumber}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Routing Number</p>
                <p className="text-lg font-mono font-semibold text-foreground">{account.routingNumber}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Current Balance</p>
                <p className="text-3xl font-bold text-foreground">
                  ${account.balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">Available Balance</p>
                <p className="text-3xl font-bold text-foreground">
                  ${account.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </p>
              </div>
              {account.interestRate && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Interest Rate</p>
                  <p className="text-3xl font-bold text-accent">{account.interestRate}% APY</p>
                </div>
              )}
              {account.returnRate && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Annual Return</p>
                  <p className="text-3xl font-bold text-accent">+{account.returnRate}%</p>
                </div>
              )}
            </div>

            <div className="flex gap-3 mt-6">
              <Button onClick={() => router.push("/transfers?type=send")}>
                <Send className="w-4 h-4 mr-2" />
                Send Money
              </Button>
              <Button variant="outline" onClick={() => router.push("/transfers")}>
                <ArrowLeftRight className="w-4 h-4 mr-2" />
                Transfer
              </Button>
              <Button variant="outline" onClick={() => router.push("/bill-pay")}>
                <CreditCard className="w-4 h-4 mr-2" />
                Pay Bills
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Transaction History</h2>
            <div className="space-y-3">
              {account.transactions.map((transaction: any) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 hover:bg-secondary/50 rounded-lg transition-colors cursor-pointer"
                >
                  <div>
                    <p className="font-medium text-foreground">{transaction.name}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.amount >= 0 ? "text-accent" : "text-foreground"}`}>
                      {transaction.amount >= 0 ? "+" : ""}$
                      {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                    </p>
                    <p className="text-xs text-muted-foreground">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
