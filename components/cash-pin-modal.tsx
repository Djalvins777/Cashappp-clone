"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CashPinModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
  title?: string
  description?: string
}

export function CashPinModal({
  open,
  onOpenChange,
  onSuccess,
  title = "Enter Cash PIN",
  description = "Enter your 4-digit Cash PIN to continue",
}: CashPinModalProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")
  const correctPin = "2020" // In a real app, this would be securely stored

  useEffect(() => {
    if (!open) {
      setPin("")
      setError("")
    }
  }, [open])

  const handleNumberClick = (num: string) => {
    if (pin.length < 4) {
      const newPin = pin + num
      setPin(newPin)

      if (newPin.length === 4) {
        // Auto-verify when 4 digits entered
        setTimeout(() => {
          if (newPin === correctPin) {
            onSuccess()
            onOpenChange(false)
          } else {
            setError("Incorrect PIN. Please try again.")
            setPin("")
          }
        }, 100)
      }
    }
  }

  const handleBackspace = () => {
    setPin(pin.slice(0, -1))
    setError("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-center gap-3">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 rounded-full border-2 transition-colors ${
                  i < pin.length ? "bg-accent border-accent" : "border-muted-foreground"
                }`}
              />
            ))}
          </div>

          {error && <p className="text-sm text-destructive text-center">{error}</p>}

          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <Button
                key={num}
                onClick={() => handleNumberClick(num.toString())}
                variant="outline"
                className="h-16 text-xl font-semibold"
              >
                {num}
              </Button>
            ))}
            <div />
            <Button onClick={() => handleNumberClick("0")} variant="outline" className="h-16 text-xl font-semibold">
              0
            </Button>
            <Button onClick={handleBackspace} variant="outline" className="h-16 text-xl font-semibold bg-transparent">
              ←
            </Button>
          </div>

          <p className="text-xs text-muted-foreground text-center">Default PIN: 2020</p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
