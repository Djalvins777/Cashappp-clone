import { NextResponse } from "next/server"
import { verifyCode } from "@/lib/auth-helpers"

export async function POST(request: Request) {
  try {
    const { userId, code, type } = await request.json()

    if (!userId || !code || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const isValid = await verifyCode(userId, code, type)

    return NextResponse.json({ valid: isValid })
  } catch (error) {
    console.error("[v0] Verify code error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
