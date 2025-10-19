"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

type LoginStep = "credentials" | "verification"

export function LoginForm() {
  const router = useRouter()
  const [step, setStep] = useState<LoginStep>("credentials")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [userId, setUserId] = useState<string | null>(null)

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const supabase = getSupabaseBrowserClient()

      // Sign in with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      if (data.user) {
        setUserId(data.user.id)

        // Request verification code to be sent
        const response = await fetch("/api/auth/send-verification", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: data.user.id,
            email: data.user.email,
            type: "login",
          }),
        })

        if (!response.ok) {
          throw new Error("Failed to send verification code")
        }

        // Sign out temporarily until 2FA is verified
        await supabase.auth.signOut()

        // Move to verification step
        setStep("verification")
      }
    } catch (err: any) {
      console.error("[v0] Login error:", err)
      setError(err.message || "Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!userId) {
        throw new Error("Session expired. Please try again.")
      }

      // Verify the code
      const response = await fetch("/api/auth/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          code: verificationCode,
          type: "login",
        }),
      })

      const result = await response.json()

      if (!response.ok || !result.valid) {
        throw new Error("Invalid or expired verification code")
      }

      // Sign in again after successful verification
      const supabase = getSupabaseBrowserClient()
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (signInError) {
        throw signInError
      }

      // Update last login time
      await supabase.from("profiles").update({ last_login: new Date().toISOString() }).eq("id", userId)

      // Redirect to dashboard
      router.push("/dashboard")
      router.refresh()
    } catch (err: any) {
      console.error("[v0] Verification error:", err)
      setError(err.message || "Verification failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    if (!userId) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/auth/send-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          email,
          type: "login",
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to resend code")
      }

      setError("New verification code sent to your email")
    } catch (err: any) {
      setError(err.message || "Failed to resend code")
    } finally {
      setIsLoading(false)
    }
  }

  if (step === "verification") {
    return (
      <form onSubmit={handleVerificationSubmit} className="space-y-4">
        {error && (
          <Alert variant={error.includes("sent") ? "default" : "destructive"}>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border border-green-200 bg-green-50 p-4">
          <div className="flex gap-3">
            <svg className="h-5 w-5 flex-shrink-0 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <div className="text-sm text-green-900">
              <p className="font-semibold">Verification Code Sent</p>
              <p className="mt-1">
                We've sent a 6-digit verification code to <strong>{email}</strong>. Please check your inbox and enter
                the code below.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="verificationCode">Verification Code</Label>
          <Input
            id="verificationCode"
            type="text"
            placeholder="Enter 6-digit code"
            required
            maxLength={6}
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ""))}
            disabled={isLoading}
            className="text-center text-2xl tracking-widest"
          />
          <p className="text-xs text-gray-500">Code expires in 10 minutes</p>
        </div>

        <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </>
          ) : (
            "Verify & Sign In"
          )}
        </Button>

        <div className="text-center">
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isLoading}
            className="text-sm text-blue-600 hover:text-blue-700 disabled:opacity-50"
          >
            Didn't receive the code? Resend
          </button>
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full bg-transparent"
          onClick={() => {
            setStep("credentials")
            setVerificationCode("")
            setError(null)
          }}
        >
          Back to Login
        </Button>
      </form>
    )
  }

  return (
    <form onSubmit={handleCredentialsSubmit} className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          placeholder="john.doe@example.com"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </div>

      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Signing In...
          </>
        ) : (
          "Continue"
        )}
      </Button>

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs text-amber-900">
          <strong>Next Step:</strong> After entering your credentials, a verification code will be sent to your email
          for two-factor authentication.
        </p>
      </div>
    </form>
  )
}
