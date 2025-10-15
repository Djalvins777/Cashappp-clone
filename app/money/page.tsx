"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { CashPinModal } from "@/components/cash-pin-modal"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, ChevronRight, Zap, Gift, CreditCard, Users } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function MoneyPage() {
  const router = useRouter()
  const [balance, setBalance] = useState(0)
  const [showAddCash, setShowAddCash] = useState(false)
  const [showCashOut, setShowCashOut] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [pendingAmount, setPendingAmount] = useState(0)
  const [showBoosts, setShowBoosts] = useState(false)
  const [showReferral, setShowReferral] = useState(false)

  const handleAddCashClick = (amount: number) => {
    setPendingAmount(amount)
    setShowPinModal(true)
  }

  const handlePinSuccess = () => {
    setBalance(balance + pendingAmount)
    setShowAddCash(false)
    setPendingAmount(0)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-4xl font-bold">Money</h1>
        <button className="p-2 relative" onClick={() => router.push("/profile")}>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
      </header>

      <div className="p-4 space-y-4">
        {/* Cash Balance Card */}
        <div className="bg-card rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-muted-foreground">Cash Balance</h2>
            <button
              onClick={() => router.push("/banking")}
              className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
            >
              Account & Routing
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="text-5xl font-bold mb-6">${balance.toFixed(2)}</div>
          <div className="flex gap-3">
            <Button
              onClick={() => setShowAddCash(true)}
              className="flex-1 h-12 bg-muted hover:bg-muted/80 text-foreground rounded-full"
            >
              Add Cash
            </Button>
            <Button
              onClick={() => setShowCashOut(true)}
              className="flex-1 h-12 bg-muted hover:bg-muted/80 text-foreground rounded-full"
            >
              Cash Out
            </Button>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          {/* Savings - Updated with actual image */}
          <button
            onClick={() => router.push("/savings")}
            className="bg-card rounded-3xl p-6 text-left hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Savings</h3>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="relative w-full h-32 mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4898-yFNk3pS0ovujTV4fmKetRluIC3bM2p.jpeg"
                alt="Savings"
                fill
                className="object-contain"
              />
            </div>
          </button>

          {/* Buy Bitcoin - Updated with actual image */}
          <button
            onClick={() => router.push("/investing")}
            className="bg-card rounded-3xl p-6 text-left hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Buy bitcoin</h3>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="relative w-full h-32 mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4899-KOQr5l8uxXDkwbUwD0iC9loiuAvm2e.jpeg"
                alt="Bitcoin"
                fill
                className="object-contain"
              />
            </div>
          </button>

          {/* Invest in Stocks - Updated with actual image */}
          <button
            onClick={() => router.push("/investing")}
            className="bg-card rounded-3xl p-6 text-left hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Invest in stocks</h3>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="relative w-full h-32 mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4901-nLmjYU61FjjPTWKJ6ord6U0HWTn6pi.jpeg"
                alt="Stocks"
                fill
                className="object-contain"
              />
            </div>
          </button>

          {/* Free Tax Filing - Updated with actual image */}
          <button className="bg-card rounded-3xl p-6 text-left hover:bg-card/80 transition-colors shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Free tax filing</h3>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="relative w-full h-32 mb-2">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4900-00aPMhj4WF8OYnWA9GXqvg0kuv4tCA.jpeg"
                alt="Tax Filing"
                fill
                className="object-contain"
              />
            </div>
          </button>
        </div>

        <div className="space-y-3 mt-6">
          <h2 className="text-lg font-semibold px-2">More Features</h2>

          {/* Boosts */}
          <button
            onClick={() => setShowBoosts(true)}
            className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Zap className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Boosts</h3>
              <p className="text-sm text-muted-foreground">Get instant discounts</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Cash Card */}
          <button
            onClick={() => router.push("/card")}
            className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Cash Card</h3>
              <p className="text-sm text-muted-foreground">Manage your card</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Refer Friends */}
          <button
            onClick={() => setShowReferral(true)}
            className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Refer Friends</h3>
              <p className="text-sm text-muted-foreground">Earn $5 for each referral</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>

          {/* Direct Deposit */}
          <button
            onClick={() => router.push("/banking")}
            className="w-full bg-card rounded-2xl p-4 flex items-center gap-4 hover:bg-card/80 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Gift className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold">Direct Deposit</h3>
              <p className="text-sm text-muted-foreground">Get paid up to 2 days early</p>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <BottomNav />

      {/* Add Cash Modal */}
      <Dialog open={showAddCash} onOpenChange={setShowAddCash}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Cash</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Select amount to add from your linked bank account</p>
            <div className="grid grid-cols-3 gap-3">
              {[10, 25, 50, 75, 100, 200].map((amt) => (
                <Button
                  key={amt}
                  onClick={() => handleAddCashClick(amt)}
                  variant="outline"
                  className="h-16 text-lg font-semibold"
                >
                  ${amt}
                </Button>
              ))}
            </div>
            <Button onClick={() => router.push("/payment-methods")} variant="outline" className="w-full">
              Manage Payment Methods
            </Button>
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
            <p className="text-center text-muted-foreground">
              {balance === 0
                ? "You don't have any cash to cash out."
                : "Cash Out is not available. Funds cannot be sent at this time."}
            </p>
            <Button onClick={() => setShowCashOut(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showBoosts} onOpenChange={setShowBoosts}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cash Boosts</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Get instant discounts at your favorite places when you use your Cash Card.
            </p>
            <div className="space-y-3">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">10% Off Coffee</h4>
                    <p className="text-xs text-muted-foreground">At participating locations</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold">$1 Off Gas</h4>
                    <p className="text-xs text-muted-foreground">Save on every gallon</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-muted-foreground">Order your Cash Card to unlock Boosts</p>
            <Button onClick={() => setShowBoosts(false)} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showReferral} onOpenChange={setShowReferral}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Refer Friends</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share Cash App with friends and you'll both get $5 when they send their first $5.
            </p>
            <div className="p-4 bg-accent/10 rounded-lg text-center">
              <p className="text-xs text-muted-foreground mb-2">Your referral code</p>
              <p className="text-2xl font-bold text-accent">TMIRANDA</p>
            </div>
            <Button className="w-full bg-accent hover:bg-accent/90">Share Referral Code</Button>
            <Button onClick={() => setShowReferral(false)} variant="outline" className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CashPinModal
        open={showPinModal}
        onOpenChange={setShowPinModal}
        onSuccess={handlePinSuccess}
        title="Confirm Add Cash"
        description="Enter your Cash PIN to add cash to your account"
      />
    </div>
  )
}
