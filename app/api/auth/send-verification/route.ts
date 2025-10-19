import { NextResponse } from "next/server"
import { createVerificationCode, sendVerificationEmail } from "@/lib/auth-helpers"

export async function POST(request: Request) {
  try {
    const { userId, email, type } = await request.json()

    if (!userId || !email || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create verification code
    const { code } = await createVerificationCode(userId, type)

    // Send email with code
    await sendVerificationEmail(email, code, type)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Send verification error:", error)
    return NextResponse.json({ error: "Failed to send verification code" }, { status: 500 })
  }
}
