"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, CreditCard, Zap, Wifi, Phone, Home } from "lucide-react"

export default function BillPayPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [selectedBiller, setSelectedBiller] = useState("")
  const [amount, setAmount] = useState("")
  const [paymentDate, setPaymentDate] = useState("")

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const savedBillers = [
    { id: "electric", name: "Electric Company", icon: Zap, balance: 89.32 },
    { id: "internet", name: "Internet Provider", icon: Wifi, balance: 65.0 },
    { id: "phone", name: "Mobile Phone", icon: Phone, balance: 45.99 },
    { id: "rent", name: "Rent Payment", icon: Home, balance: 1500.0 },
  ]

  const handlePayment = () => {
    alert(`Payment of $${amount} to ${selectedBiller} scheduled!`)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-chart-2 flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Pay Bills</h1>
                <p className="text-muted-foreground">Manage and pay your bills</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="biller">Select Biller</Label>
                <Select value={selectedBiller} onValueChange={setSelectedBiller}>
                  <SelectTrigger id="biller">
                    <SelectValue placeholder="Choose a biller" />
                  </SelectTrigger>
                  <SelectContent>
                    {savedBillers.map((biller) => (
                      <SelectItem key={biller.id} value={biller.id}>
                        {biller.name} - ${biller.balance.toFixed(2)} due
                      </SelectItem>
                    ))}
                    <SelectItem value="new">+ Add New Biller</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="pl-7"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment-date">Payment Date</Label>
                <Input
                  id="payment-date"
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="from-account">From Account</Label>
                <Select defaultValue="checking">
                  <SelectTrigger id="from-account">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="checking">Checking Account (••••4892)</SelectItem>
                    <SelectItem value="savings">Savings Account (••••7231)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button onClick={handlePayment} className="flex-1" disabled={!selectedBiller || !amount}>
                  Schedule Payment
                </Button>
                <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </Card>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-foreground">Saved Billers</h2>
            {savedBillers.map((biller) => {
              const Icon = biller.icon
              return (
                <Card key={biller.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                        <Icon className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{biller.name}</p>
                        <p className="text-sm text-muted-foreground">Auto-pay enabled</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-foreground">${biller.balance.toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">Due soon</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </main>
    </div>
  )
}
