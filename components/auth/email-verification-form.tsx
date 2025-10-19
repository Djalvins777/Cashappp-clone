"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface EmailVerificationFormProps {
  userId: string
  email: string
}

export function EmailVerificationForm({ userId, email }: EmailVerificationFormProps) {
  const router = useRouter()
  const [code, setCode] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/verify-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, code }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Verification failed")
      }

      setSuccess("Email verified successfully! Redirecting to login...")
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err: any) {
      console.error("[v0] Verification error:", err)
      setError(err.message || "Invalid or expired verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setError(null)
    setSuccess(null)
    setIsResending(true)

    try {
      const response = await fetch("/api/auth/send-email-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email }),
      })

      if (!response.ok) {
        throw new Error("Failed to resend code")
      }

      setSuccess("A new verification code has been sent to your email")
    } catch (err: any) {
      console.error("[v0] Resend error:", err)
      setError(err.message || "Failed to resend verification code")
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="border-green-200 bg-green-50">
          <AlertDescription className="text-green-900">{success}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="code">Verification Code</Label>
          <Input
            id="code"
            type="text"
            placeholder="Enter 6-digit code"
            maxLength={6}
            pattern="[0-9]{6}"
            required
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            disabled={isLoading}
            className="text-center text-2xl tracking-widest"
          />
          <p className="text-xs text-gray-500">Check your email for the verification code</p>
        </div>

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading || code.length !== 6}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify Email"
          )}
        </Button>
      </form>

      <div className="text-center">
        <Button
          type="button"
          variant="link"
          onClick={handleResend}
          disabled={isResending}
          className="text-blue-600 hover:text-blue-700"
        >
          {isResending ? "Sending..." : "Resend verification code"}
        </Button>
      </div>

      <div className="rounded-lg border border-blue-200 bg-blue-50 p-3">
        <p className="text-xs text-blue-900">
          <strong>Security Notice:</strong> The verification code expires in 10 minutes. If you don't receive it, check
          your spam folder or request a new code.
        </p>
      </div>
    </div>
  )
}
