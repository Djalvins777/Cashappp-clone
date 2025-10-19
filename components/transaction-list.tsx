"use client"

import { Card } from "@/components/ui/card"
import { ArrowDownLeft, ShoppingBag, Zap, Home, Building2, TrendingUp } from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export function TransactionList() {
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)

  const transactions = [
    {
      id: 1,
      name: "Wire Transfer Received",
      category: "Income",
      amount: 125000.0,
      date: "Today, 9:24 AM",
      icon: ArrowDownLeft,
      type: "credit",
      location: "International Wire",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 2,
      name: "Business Payment",
      category: "Income",
      amount: 85000.0,
      date: "Yesterday, 8:00 AM",
      icon: Building2,
      type: "credit",
      location: "Direct Deposit",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 3,
      name: "Investment Return",
      category: "Income",
      amount: 42500.0,
      date: "Dec 8, 2:15 PM",
      icon: TrendingUp,
      type: "credit",
      location: "Portfolio Distribution",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 4,
      name: "Transfer to Savings",
      category: "Transfer",
      amount: -50000.0,
      date: "Dec 7, 10:30 AM",
      icon: ArrowDownLeft,
      type: "debit",
      location: "Internal Transfer",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 5,
      name: "Luxury Purchase",
      category: "Shopping",
      amount: -12750.0,
      date: "Dec 5, 3:45 PM",
      icon: ShoppingBag,
      type: "debit",
      location: "Luxury Retailer",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 6,
      name: "Property Management",
      category: "Real Estate",
      amount: -8500.0,
      date: "Dec 4, 7:30 PM",
      icon: Home,
      type: "debit",
      location: "Monthly Fee",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 7,
      name: "Consulting Fee",
      category: "Income",
      amount: 28000.0,
      date: "Dec 3, 5:15 PM",
      icon: Building2,
      type: "credit",
      location: "Professional Services",
      account: "Checking ••••2626",
      status: "Completed",
    },
    {
      id: 8,
      name: "Monthly Expenses",
      category: "Bills & Utilities",
      amount: -5200.0,
      date: "Dec 1, 9:00 AM",
      icon: Zap,
      type: "debit",
      location: "Auto Payment",
      account: "Checking ••••2626",
      status: "Completed",
    },
  ]

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-foreground">Recent Transactions</h2>
          <button className="text-sm text-primary hover:underline font-medium">View all</button>
        </div>

        <div className="space-y-4 max-h-[500px] overflow-y-auto">
          {transactions.map((transaction) => {
            const Icon = transaction.icon
            return (
              <button
                key={transaction.id}
                onClick={() => setSelectedTransaction(transaction)}
                className="flex items-center gap-4 w-full hover:bg-secondary/50 p-2 rounded-lg transition-colors"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    transaction.type === "credit" ? "bg-accent/10" : "bg-secondary"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${transaction.type === "credit" ? "text-accent" : "text-muted-foreground"}`}
                  />
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-medium text-foreground truncate">{transaction.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>

                <div
                  className={`text-sm font-semibold flex-shrink-0 ${transaction.amount >= 0 ? "text-accent" : "text-foreground"}`}
                >
                  {transaction.amount >= 0 ? "+" : ""}$
                  {Math.abs(transaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
              </button>
            )
          })}
        </div>
      </Card>

      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Transaction Details</DialogTitle>
            <DialogDescription>Complete information about this transaction</DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b">
                {(() => {
                  const Icon = selectedTransaction.icon
                  return (
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedTransaction.type === "credit" ? "bg-accent/10" : "bg-secondary"
                      }`}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          selectedTransaction.type === "credit" ? "text-accent" : "text-muted-foreground"
                        }`}
                      />
                    </div>
                  )
                })()}
                <div>
                  <h3 className="font-semibold text-lg">{selectedTransaction.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedTransaction.category}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Amount</span>
                  <span
                    className={`font-semibold ${selectedTransaction.amount >= 0 ? "text-accent" : "text-foreground"}`}
                  >
                    {selectedTransaction.amount >= 0 ? "+" : ""}$
                    {Math.abs(selectedTransaction.amount).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Date</span>
                  <span className="font-medium">{selectedTransaction.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Account</span>
                  <span className="font-medium">{selectedTransaction.account}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">{selectedTransaction.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-medium text-accent">{selectedTransaction.status}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1 bg-transparent">
                  Download Receipt
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Report Issue
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
