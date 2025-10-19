import { NextResponse } from "next/server"
import { createVerificationCode, sendVerificationEmail } from "@/lib/auth-helpers"

export async function POST(request: Request) {
  try {
    const { userId, email } = await request.json()

    if (!userId || !email) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Generate and store verification code
    const { code } = await createVerificationCode(userId, "email_verification")

    // Send verification email
    await sendVerificationEmail(email, code, "email_verification")

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Send email verification error:", error)
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }
}
