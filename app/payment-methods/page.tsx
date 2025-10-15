"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Plus } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PaymentMethodsPage() {
  const router = useRouter()
  const [showAddCash, setShowAddCash] = useState(false)
  const [selectedCard, setSelectedCard] = useState<string | null>(null)
  const [boaBalance, setBoaBalance] = useState(0)
  const [capitalOneBalance, setCapitalOneBalance] = useState(0)

  const handleAddCash = (amount: number) => {
    if (selectedCard === "boa" && boaBalance + amount <= 20000) {
      setBoaBalance(boaBalance + amount)
      setShowAddCash(false)
      setSelectedCard(null)
    } else if (selectedCard === "capital-one" && capitalOneBalance + amount <= 20000) {
      setCapitalOneBalance(capitalOneBalance + amount)
      setShowAddCash(false)
      setSelectedCard(null)
    }
  }

  const openAddCash = (cardType: string) => {
    setSelectedCard(cardType)
    setShowAddCash(true)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center gap-4 p-4 border-b border-border">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Payment Methods</h1>
      </header>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Linked Bank Cards</h2>
          <Button size="sm" variant="outline" className="gap-2 bg-transparent">
            <Plus className="w-4 h-4" />
            Add Card
          </Button>
        </div>

        {/* Bank of America Debit Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center p-2 shadow-sm">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_4345-ycaymUFbh0Ei9qExgOOTlEsXZPFDLJ.jpeg"
                  alt="Bank of America"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Bank of America</div>
                <div className="text-sm text-muted-foreground">Debit •••• 4521</div>
                <div className="text-sm text-accent font-semibold mt-1">
                  Available: ${boaBalance.toFixed(2)} / $20,000.00
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => openAddCash("boa")}
                size="sm"
                className="flex-1 bg-accent hover:bg-accent/90"
                disabled={boaBalance >= 20000}
              >
                Add Cash
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Capital One Credit Card */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-lg bg-white flex items-center justify-center p-2 shadow-sm">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_1978-RDwRUPMZBqzDarTVaqO4tCcp4sJT8s.jpeg"
                  alt="Capital One"
                  width={64}
                  height={64}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex-1">
                <div className="font-semibold">Capital One</div>
                <div className="text-sm text-muted-foreground">Credit •••• 8392</div>
                <div className="text-sm text-accent font-semibold mt-1">
                  Available: ${capitalOneBalance.toFixed(2)} / $20,000.00
                </div>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={() => openAddCash("capital-one")}
                size="sm"
                className="flex-1 bg-accent hover:bg-accent/90"
                disabled={capitalOneBalance >= 20000}
              >
                Add Cash
              </Button>
              <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                Details
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="pt-4">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">ABOUT LINKED CARDS</h3>
          <p className="text-sm text-muted-foreground">
            Link your bank cards to easily add cash to your Cash App balance. Each card can add up to $20,000.
          </p>
        </div>
      </div>

      <BottomNav />

      {/* Add Cash Modal */}
      <Dialog open={showAddCash} onOpenChange={setShowAddCash}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Cash from {selectedCard === "boa" ? "Bank of America" : "Capital One"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              {[100, 250, 500, 1000, 2500, 5000].map((amt) => {
                const currentBalance = selectedCard === "boa" ? boaBalance : capitalOneBalance
                return (
                  <Button
                    key={amt}
                    onClick={() => handleAddCash(amt)}
                    variant="outline"
                    className="h-16 text-lg font-semibold hover:bg-accent hover:text-accent-foreground"
                    disabled={currentBalance + amt > 20000}
                  >
                    ${amt}
                  </Button>
                )
              })}
            </div>
            <Button className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground">
              Add Custom Amount
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Maximum per card: $20,000.00
              <br />
              Current balance: ${selectedCard === "boa" ? boaBalance.toFixed(2) : capitalOneBalance.toFixed(2)}
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
