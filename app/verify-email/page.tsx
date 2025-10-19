"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { EmailVerificationForm } from "@/components/auth/email-verification-form"

function VerifyEmailContent() {
  const searchParams = useSearchParams()
  const userId = searchParams.get("userId")
  const email = searchParams.get("email")

  if (!userId || !email) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle className="text-red-600">Invalid Request</CardTitle>
            <CardDescription>Missing verification information. Please try signing up again.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Official Government Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600">
              <svg className="h-7 w-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">U.S. Department of Health & Human Services</h1>
              <p className="text-sm text-gray-600">Official Government Grant Portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-md">
          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900">Verify Your Email</CardTitle>
              <CardDescription className="text-gray-600">
                Enter the 6-digit code sent to <strong>{email}</strong>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EmailVerificationForm userId={userId} email={email} />
            </CardContent>
          </Card>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Need help?{" "}
              <a href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
                Back to signup
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
