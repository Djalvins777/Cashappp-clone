import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get("token")
  const type = searchParams.get("type")

  if (!token) {
    return NextResponse.redirect(new URL("/signup?error=invalid_token", request.url))
  }

  try {
    const supabase = await getSupabaseServerClient()

    // Verify the email token
    const { error } = await supabase.auth.verifyOtp({
      token_hash: token,
      type: type === "signup" ? "signup" : "email",
    })

    if (error) {
      console.error("[v0] Email verification error:", error)
      return NextResponse.redirect(new URL("/signup?error=verification_failed", request.url))
    }

    // Update profile to mark email as verified
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      await supabase.from("profiles").update({ email_verified: true }).eq("id", user.id)
    }

    return NextResponse.redirect(new URL("/login?verified=true", request.url))
  } catch (error) {
    console.error("[v0] Verification error:", error)
    return NextResponse.redirect(new URL("/signup?error=server_error", request.url))
  }
}
