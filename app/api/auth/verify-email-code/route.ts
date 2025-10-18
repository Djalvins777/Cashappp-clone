import { NextResponse } from "next/server"
import { verifyCode } from "@/lib/auth-helpers"
import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const { userId, code } = await request.json()

    if (!userId || !code) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log("[v0] Verifying email code for user:", userId)

    // Verify the code
    const isValid = await verifyCode(userId, code, "email_verification")

    if (!isValid) {
      console.log("[v0] Invalid or expired verification code")
      return NextResponse.json({ error: "Invalid or expired verification code" }, { status: 400 })
    }

    console.log("[v0] Verification code is valid, updating user...")

    // Create admin client with service role key for admin operations
    const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Mark email as verified in the auth.users table
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      email_confirm: true,
    })

    if (updateError) {
      console.error("[v0] Error updating email verification:", updateError)
      return NextResponse.json({ error: "Failed to verify email" }, { status: 500 })
    }

    console.log("[v0] Email verified successfully in auth.users")

    // Also update the profile
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .update({ email_verified: true })
      .eq("id", userId)

    if (profileError) {
      console.error("[v0] Error updating profile:", profileError)
    } else {
      console.log("[v0] Profile updated successfully")
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Verify email code error:", error)
    return NextResponse.json({ error: "Verification failed" }, { status: 500 })
  }
}
