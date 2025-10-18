import { NextResponse } from "next/server"
import { verifyCode } from "@/lib/auth-helpers"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { userId, code } = await request.json()

    if (!userId || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Verify the code
    const isValid = await verifyCode(userId, code, "email_verification")

    if (!isValid) {
      return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 400 })
    }

    // Update user's email verification status in Supabase
    const supabase = await getSupabaseServerClient()

    // Mark email as verified in the auth.users table
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      email_confirmed_at: new Date().toISOString(),
    })

    if (updateError) {
      console.error("[v0] Error updating email verification:", updateError)
    }

    // Also update the profile
    await supabase.from("profiles").update({ email_verified: true }).eq("id", userId)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Verify email code error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
