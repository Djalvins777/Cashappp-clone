"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Lock, CreditCard, AlertTriangle, MapPin } from "lucide-react"

export default function CardsPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [isCardLocked, setIsCardLocked] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleLockToggle = () => {
    setIsCardLocked(!isCardLocked)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-[#e31837] text-white py-4 px-4">
        <div className="container mx-auto max-w-3xl flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.push("/")} className="text-white hover:bg-white/20">
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-xl font-semibold">Card Settings</h1>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-3xl">
        <div className="text-center mb-6">
          <p className="text-sm text-muted-foreground mb-1">Primary linked account:</p>
          <p className="text-lg font-semibold text-[#0066cc]">Checking</p>
        </div>

        <div className="mb-8">
          <div className="relative w-full max-w-md mx-auto aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl">
            {/* Card background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#c8102e] via-[#e31837] to-[#a01020]">
              {/* Decorative geometric pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-full h-full">
                  <div className="absolute top-1/4 left-0 w-0 h-0 border-l-[200px] border-l-transparent border-b-[200px] border-b-white/30"></div>
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-r-[250px] border-r-transparent border-t-[250px] border-t-black/20"></div>
                </div>
              </div>
            </div>

            {/* Card content */}
            <div className="relative h-full p-6 flex flex-col justify-between text-white">
              {/* Top section */}
              <div className="flex justify-between items-start">
                {/* EMV chip */}
                <div className="w-12 h-10 bg-gradient-to-br from-yellow-200 to-yellow-400 rounded-md shadow-md">
                  <div className="w-full h-full grid grid-cols-3 gap-[2px] p-1">
                    {[...Array(9)].map((_, i) => (
                      <div key={i} className="bg-yellow-600/30 rounded-sm"></div>
                    ))}
                  </div>
                </div>

                {/* Bank logo */}
                <div className="text-right">
                  <div className="font-bold text-lg tracking-wide mb-1">Bank of America</div>
                  <div className="flex items-center justify-end gap-1">
                    <div className="w-6 h-4 bg-white/90 transform -skew-x-12"></div>
                    <div className="w-6 h-4 bg-white/90 transform -skew-x-12"></div>
                    <div className="w-6 h-4 bg-white/90 transform -skew-x-12"></div>
                  </div>
                </div>
              </div>

              {/* Lock icon overlay when card is locked */}
              {isCardLocked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <div className="w-24 h-24 rounded-full bg-white/90 flex items-center justify-center">
                    <Lock className="w-12 h-12 text-[#e31837]" />
                  </div>
                </div>
              )}

              {/* Card number */}
              <div className="text-xl tracking-[0.3em] font-light">•••• •••• •••• 9123</div>

              {/* Bottom section */}
              <div className="flex justify-between items-end">
                {/* Cardholder name */}
                <div>
                  <div className="text-[10px] uppercase tracking-wide opacity-80 mb-1">Cardholder</div>
                  <div className="text-sm font-medium tracking-wide">MEVINS L THOMPSON</div>
                </div>

                {/* Card type and logo */}
                <div className="text-right">
                  <div className="text-xs uppercase tracking-wide mb-1">Debit</div>
                  <div className="flex items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-[#eb001b] opacity-90"></div>
                    <div className="w-8 h-8 rounded-full bg-[#f79e1b] opacity-90 -ml-3"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card number on side */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 -rotate-90 origin-right">
              <div className="text-xs text-white/60 tracking-wider pr-4">DEBIT CARD</div>
            </div>
          </div>
        </div>

        <Card className="p-6 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1">Lock your card</h3>
              {isCardLocked && <p className="text-sm text-muted-foreground">This card is locked and cannot be used.</p>}
            </div>
            <Switch
              checked={isCardLocked}
              onCheckedChange={handleLockToggle}
              className="data-[state=checked]:bg-accent"
            />
          </div>
        </Card>

        <div className="space-y-3">
          <Button
            variant="outline"
            className="w-full justify-center text-[#0066cc] border-[#0066cc] hover:bg-[#0066cc]/10 bg-transparent"
            onClick={() => alert("Replace card feature coming soon")}
          >
            <CreditCard className="w-5 h-5 mr-2" />
            Replace ATM/Debit Card
          </Button>

          <Button
            variant="outline"
            className="w-full justify-center text-[#0066cc] border-[#0066cc] hover:bg-[#0066cc]/10 bg-transparent"
            onClick={() => alert("Report lost/stolen card feature coming soon")}
          >
            <AlertTriangle className="w-5 h-5 mr-2" />
            Report a Lost or Stolen Card
          </Button>

          <Button
            variant="outline"
            className="w-full justify-center text-[#0066cc] border-[#0066cc] hover:bg-[#0066cc]/10 bg-transparent"
            onClick={() => alert("Travel notice feature coming soon")}
          >
            <MapPin className="w-5 h-5 mr-2" />
            Add or Change a Travel Notice
          </Button>
        </div>
      </main>
    </div>
  )
}
