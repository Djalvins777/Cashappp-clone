"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Lock, Unlock, CreditCard, Settings, DollarSign, Eye, EyeOff } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function CardPage() {
  const [isLocked, setIsLocked] = useState(false)
  const [showCardNumber, setShowCardNumber] = useState(false)
  const fullCardNumber = "8855 6717 1800 0000"
  const maskedCardNumber = "•••• •••• •••• 1718"

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Cash Card</h1>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button className="p-2">
            <Settings className="w-6 h-6" />
          </button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        <div className="relative">
          <div className="aspect-[1.586/1] rounded-2xl bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6 shadow-2xl border border-gray-700">
            <div className="flex flex-col justify-between h-full">
              <div className="flex justify-between items-start">
                <div className="text-white/60 text-xs font-medium">CASH</div>
                {isLocked ? <Lock className="w-5 h-5 text-white/60" /> : <Unlock className="w-5 h-5 text-white/60" />}
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-white text-xl tracking-[0.3em]">
                    {showCardNumber ? fullCardNumber : maskedCardNumber}
                  </div>
                  <button
                    onClick={() => setShowCardNumber(!showCardNumber)}
                    className="ml-2 p-1 hover:bg-white/10 rounded transition-colors"
                  >
                    {showCardNumber ? (
                      <EyeOff className="w-5 h-5 text-white/60" />
                    ) : (
                      <Eye className="w-5 h-5 text-white/60" />
                    )}
                  </button>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <div className="text-white font-semibold text-lg">TERESA MIRANDA</div>
                  </div>
                  <div className="text-white font-bold text-2xl">VISA</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-3 text-sm text-muted-foreground">CARD SHIPPING SOON</div>
        </div>

        {/* Lock/Unlock Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isLocked ? <Lock className="w-5 h-5 text-destructive" /> : <Unlock className="w-5 h-5 text-accent" />}
                <div>
                  <div className="font-semibold">{isLocked ? "Card Locked" : "Card Active"}</div>
                  <div className="text-sm text-muted-foreground">
                    {isLocked ? "Unlock to use your card" : "Lock to prevent transactions"}
                  </div>
                </div>
              </div>
              <Button onClick={() => setIsLocked(!isLocked)} variant={isLocked ? "default" : "outline"} size="sm">
                {isLocked ? "Unlock" : "Lock"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Card Features */}
        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Card Details</div>
                <div className="text-sm text-muted-foreground">View full card number and CVV</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Cash Boost</div>
                <div className="text-sm text-muted-foreground">Get instant discounts at your favorite places</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <Settings className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <div className="font-semibold">Card Settings</div>
                <div className="text-sm text-muted-foreground">Manage PIN, limits, and notifications</div>
              </div>
            </div>
            <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Order Physical Card */}
        <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground">Order Physical Card</Button>
      </div>

      <BottomNav />
    </div>
  )
}
