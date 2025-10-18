"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Lock } from "lucide-react"

interface PinVerificationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onVerify: (pin: string) => void
  title?: string
  description?: string
}

export function PinVerificationDialog({
  open,
  onOpenChange,
  onVerify,
  title = "Verify Your PIN",
  description = "Please enter your 4-digit PIN to authorize this transfer",
}: PinVerificationDialogProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (pin.length !== 4) {
      setError("PIN must be 4 digits")
      return
    }

    if (!/^\d{4}$/.test(pin)) {
      setError("PIN must contain only numbers")
      return
    }

    onVerify(pin)
    setPin("")
    setError("")
  }

  const handlePinChange = (value: string) => {
    // Only allow numbers and max 4 digits
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setPin(value)
      setError("")
    }
  }

  const handleClose = () => {
    setPin("")
    setError("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-6 h-6 text-primary" />
            </div>
            <DialogTitle className="text-xl">{title}</DialogTitle>
          </div>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="pin">4-Digit PIN</Label>
            <Input
              id="pin"
              type="password"
              inputMode="numeric"
              placeholder="••••"
              value={pin}
              onChange={(e) => handlePinChange(e.target.value)}
              className="text-center text-2xl tracking-widest"
              maxLength={4}
              autoFocus
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="flex gap-3">
            <Button type="submit" className="flex-1" disabled={pin.length !== 4}>
              Verify PIN
            </Button>
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>

          <p className="text-xs text-center text-muted-foreground">
            For security purposes, all transfers require PIN verification
          </p>
        </form>
      </DialogContent>
    </Dialog>
  )
}
