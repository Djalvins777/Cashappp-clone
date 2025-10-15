"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { CashPinModal } from "@/components/cash-pin-modal"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, ArrowDownUp, BitcoinIcon, CreditCard, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export default function BankingPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [showAddCash, setShowAddCash] = useState(false)
  const [showCashOut, setShowCashOut] = useState(false)
  const [showAccountNumber, setShowAccountNumber] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [pendingTransfer, setPendingTransfer] = useState(false)

  const accountNumber = "8855671718"

  const handleAddCash = (amount: number) => {
    if (balance + amount <= 10000) {
      setBalance(balance + amount)
      setShowAddCash(false)
    }
  }

  const handleTransferClick = () => {
    setPendingTransfer(true)
    setShowPinModal(true)
  }

  const handlePinSuccess = () => {
    if (pendingTransfer) {
      router.push("/activity")
      setPendingTransfer(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Banking</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="p-2 relative" onClick={() => router.push("/profile")}>
            <User className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="text-center space-y-2">
          <div className="text-5xl font-bold">${balance.toFixed(2)}</div>
          <div className="text-muted-foreground">Cash Balance</div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowAddCash(true)}
            className="flex-1 h-12 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full"
          >
            Add Cash
          </Button>
          <Button
            onClick={() => setShowCashOut(true)}
            className="flex-1 h-12 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-full"
          >
            Cash Out
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Routing</div>
            <div className="font-mono font-semibold">041 215 663</div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground mb-1">Account</div>
            <div className="flex items-center justify-center gap-2">
              <div className="font-mono font-semibold">
                {showAccountNumber ? accountNumber : `${accountNumber.slice(0, 2)} •••• ••••`}
              </div>
              <button
                onClick={() => setShowAccountNumber(!showAccountNumber)}
                className="p-1 hover:bg-secondary rounded"
              >
                {showAccountNumber ? (
                  <EyeOff className="w-4 h-4 text-muted-foreground" />
                ) : (
                  <Eye className="w-4 h-4 text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-2 pt-4">
          <button
            onClick={handleTransferClick}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                <ArrowDownUp className="w-5 h-5 text-accent-foreground" />
              </div>
              <span className="font-semibold">Deposits & Transfers</span>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => router.push("/investing")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#00D9FF] flex items-center justify-center">
                <BitcoinIcon className="w-5 h-5 text-white" />
              </div>
              <span className="font-semibold">Bitcoin</span>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button
            onClick={() => router.push("/payment-methods")}
            className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="font-semibold">Payment Methods</span>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <BottomNav />

      <CashPinModal
        open={showPinModal}
        onOpenChange={setShowPinModal}
        onSuccess={handlePinSuccess}
        title="Verify Identity"
        description="Enter your Cash PIN to access transfers"
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
                  className="h-16 text-lg font-semibold hover:bg-accent hover:text-accent-foreground"
                  disabled={balance + amt > 10000}
                >
                  ${amt}
                </Button>
              ))}
            </div>
            <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground">Add</Button>
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
          <div className="space-y-4 text-center">
            <div className="text-muted-foreground">${balance.toFixed(2)} AVAILABLE</div>
            <div className="text-6xl font-bold text-accent">${balance.toFixed(2)}</div>
            <p className="text-sm text-muted-foreground">
              Cash Out is currently disabled. Funds cannot be sent at this time.
            </p>
            <Button onClick={() => setShowCashOut(false)} className="w-full h-12" disabled>
              Cash Out
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
