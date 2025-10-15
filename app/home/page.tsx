"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { CashPinModal } from "@/components/cash-pin-modal"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, QrCode } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter()
  const [amount, setAmount] = useState("0")
  const [balance, setBalance] = useState(0)
  const [showAddCash, setShowAddCash] = useState(false)
  const [showCashOut, setShowCashOut] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [pendingAction, setPendingAction] = useState<"pay" | "request" | null>(null)

  const handleNumberClick = (num: string) => {
    if (amount === "0") {
      setAmount(num)
    } else if (amount.length < 8) {
      setAmount(amount + num)
    }
  }

  const handleDecimal = () => {
    if (!amount.includes(".")) {
      setAmount(amount + ".")
    }
  }

  const handleBackspace = () => {
    if (amount.length === 1) {
      setAmount("0")
    } else {
      setAmount(amount.slice(0, -1))
    }
  }

  const handlePayClick = () => {
    if (Number.parseFloat(amount) > 0) {
      setPendingAction("pay")
      setShowPinModal(true)
    }
  }

  const handleRequestClick = () => {
    if (Number.parseFloat(amount) > 0) {
      setPendingAction("request")
      setShowPinModal(true)
    }
  }

  const handlePinSuccess = () => {
    if (pendingAction === "pay") {
      // Process payment
      alert(`Payment of $${amount} initiated`)
      setAmount("0")
    } else if (pendingAction === "request") {
      // Process request
      alert(`Request for $${amount} sent`)
      setAmount("0")
    }
    setPendingAction(null)
  }

  const handleAddCash = (addAmount: number) => {
    if (balance + addAmount <= 10000) {
      setBalance(balance + addAmount)
      setShowAddCash(false)
    }
  }

  return (
    <div className="min-h-screen bg-accent flex flex-col">
      <header className="flex items-center justify-between p-4">
        <button className="p-2">
          <QrCode className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 relative" onClick={() => router.push("/profile")}>
          <User className="w-6 h-6 text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="text-white text-7xl font-bold mb-8">${amount}</div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs mb-8">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num.toString())}
              className="aspect-square rounded-full text-white text-2xl font-medium hover:bg-white/10 transition-colors"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleDecimal}
            className="aspect-square rounded-full text-white text-2xl font-medium hover:bg-white/10 transition-colors"
          >
            .
          </button>
          <button
            onClick={() => handleNumberClick("0")}
            className="aspect-square rounded-full text-white text-2xl font-medium hover:bg-white/10 transition-colors"
          >
            0
          </button>
          <button
            onClick={handleBackspace}
            className="aspect-square rounded-full text-white text-2xl font-medium hover:bg-white/10 transition-colors"
          >
            ←
          </button>
        </div>

        <div className="flex gap-4 w-full max-w-xs">
          <Button
            onClick={handleRequestClick}
            className="flex-1 h-14 bg-white/20 hover:bg-white/30 text-white text-lg font-semibold rounded-full"
          >
            Request
          </Button>
          <Button
            onClick={handlePayClick}
            className="flex-1 h-14 bg-white/20 hover:bg-white/30 text-white text-lg font-semibold rounded-full"
          >
            Pay
          </Button>
        </div>
      </div>

      <BottomNav />

      <CashPinModal
        open={showPinModal}
        onOpenChange={setShowPinModal}
        onSuccess={handlePinSuccess}
        title="Confirm Payment"
        description="Enter your Cash PIN to authorize this transaction"
      />

      {/* Add Cash Modal */}
      <Dialog open={showAddCash} onOpenChange={setShowAddCash}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Cash</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[10, 25, 50, 75, 100, 200].map((amt) => (
                <Button
                  key={amt}
                  onClick={() => handleAddCash(amt)}
                  variant="outline"
                  className="h-16 text-lg font-semibold"
                  disabled={balance + amt > 10000}
                >
                  ${amt}
                </Button>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Maximum balance: $10,000.00
              <br />
              Current balance: ${balance.toFixed(2)}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Cash Out Modal */}
      <Dialog open={showCashOut} onOpenChange={setShowCashOut}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cash Out</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">Cash Out is not available at this time.</p>
            <Button onClick={() => setShowCashOut(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
