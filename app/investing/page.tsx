"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { CashPinModal } from "@/components/cash-pin-modal"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { User, Send } from "lucide-react"
import { useRouter } from "next/navigation"

export default function InvestingPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<"stocks" | "bitcoin">("bitcoin")
  const [showBuyBitcoin, setShowBuyBitcoin] = useState(false)
  const [showSendBitcoin, setShowSendBitcoin] = useState(false)
  const [showPinModal, setShowPinModal] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(10)
  const [timeframe, setTimeframe] = useState("1D")

  const bitcoinBalance = 604.29
  const bitcoinPrice = 51436.29
  const priceChange = -0.1
  const bitcoinOwned = 0.06595523

  const handleSendBitcoin = () => {
    setShowSendBitcoin(false)
    setShowPinModal(true)
  }

  const handlePinSuccess = () => {
    // Handle successful send
    alert("Bitcoin sent successfully!")
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-3xl font-bold">Investing</h1>
        <button className="p-2 relative" onClick={() => router.push("/profile")}>
          <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
            <User className="w-6 h-6" />
          </div>
        </button>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("stocks")}
            className={`flex-1 pb-3 px-4 text-center font-semibold transition-colors ${
              activeTab === "stocks"
                ? "text-[#00D9FF] border-b-2 border-[#00D9FF]"
                : "text-muted-foreground bg-muted rounded-full"
            }`}
          >
            Stocks
          </button>
          <button
            onClick={() => setActiveTab("bitcoin")}
            className={`flex-1 pb-3 px-4 text-center font-semibold transition-colors ${
              activeTab === "bitcoin"
                ? "text-[#00D9FF] border-b-2 border-[#00D9FF]"
                : "text-muted-foreground bg-muted rounded-full"
            }`}
          >
            Bitcoin
          </button>
        </div>

        <div className="text-center space-y-2">
          <div className="text-6xl font-bold">${bitcoinBalance.toFixed(2)}</div>
          <div className="flex items-center justify-center gap-3 text-sm">
            <span className="text-[#00D9FF] font-semibold">${bitcoinPrice.toFixed(2)}</span>
            <span className="text-destructive flex items-center">↓ {Math.abs(priceChange)}%</span>
            <span className="text-muted-foreground">Today</span>
          </div>
        </div>

        <div className="space-y-4">
          <svg viewBox="0 0 400 150" className="w-full h-32">
            <path
              d="M 0 100 Q 50 20 100 40 T 200 60 T 300 100 T 400 50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className="text-[#00D9FF]"
            />
          </svg>

          <div className="flex justify-center gap-6">
            {["1D", "1W", "1M", "1Y", "ALL"].map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1 text-sm font-semibold ${
                  timeframe === tf ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {tf}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            onClick={() => setShowBuyBitcoin(true)}
            className="flex-1 h-14 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-white rounded-full text-lg font-semibold"
          >
            Buy
          </Button>
          <Button
            variant="outline"
            className="flex-1 h-14 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-white border-[#00D9FF] rounded-full text-lg font-semibold"
          >
            Sell
          </Button>
          <Button
            onClick={() => setShowSendBitcoin(true)}
            className="h-14 w-14 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-white rounded-full flex items-center justify-center"
          >
            <Send className="w-6 h-6" />
          </Button>
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="text-muted-foreground">Bitcoin Owned</span>
          <span className="font-mono font-semibold">{bitcoinOwned.toFixed(8)}</span>
        </div>
      </div>

      <BottomNav />

      {/* Buy Bitcoin Modal */}
      <Dialog open={showBuyBitcoin} onOpenChange={setShowBuyBitcoin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Buy Bitcoin</DialogTitle>
            <p className="text-sm text-muted-foreground">Up to $9,800</p>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[1, 10, 20, 50, 100].map((amt) => (
                <Button
                  key={amt}
                  onClick={() => setSelectedAmount(amt)}
                  variant={selectedAmount === amt ? "default" : "outline"}
                  className={`h-16 text-lg font-semibold ${
                    selectedAmount === amt ? "bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-white" : ""
                  }`}
                >
                  ${amt}
                </Button>
              ))}
              <Button variant="outline" className="h-16 text-lg font-semibold bg-transparent">
                ...
              </Button>
            </div>
            <Button className="w-full h-12 bg-[#00D9FF] hover:bg-[#00D9FF]/90 text-white rounded-full">Next</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Send Bitcoin Modal */}
      <Dialog open={showSendBitcoin} onOpenChange={setShowSendBitcoin}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Bitcoin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">Sending Bitcoin requires PIN verification for security.</p>
            <Button onClick={handleSendBitcoin} className="w-full bg-[#00D9FF] hover:bg-[#00D9FF]/90">
              Continue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <CashPinModal
        open={showPinModal}
        onOpenChange={setShowPinModal}
        onSuccess={handlePinSuccess}
        title="Confirm Send Bitcoin"
        description="Enter your Cash PIN to send Bitcoin"
      />
    </div>
  )
}
