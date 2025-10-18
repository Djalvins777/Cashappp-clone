import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { applicationId } = body

    // Generate certificate number
    const { data: certData } = await supabase.rpc("generate_certificate_number")
    const certificateNumber =
      certData ||
      `HHS-${new Date().getFullYear()}-${Math.floor(Math.random() * 999999)
        .toString()
        .padStart(6, "0")}`

    // Update application status to approved and add certificate info
    const { data: application, error: updateError } = await supabase
      .from("applications")
      .update({
        status: "approved",
        approval_date: new Date().toISOString(),
        certificate_number: certificateNumber,
        updated_at: new Date().toISOString(),
      })
      .eq("id", applicationId)
      .eq("user_id", user.id)
      .select()
      .single()

    if (updateError) {
      console.error("[v0] Error approving application:", updateError)
      return NextResponse.json({ error: "Failed to approve application" }, { status: 500 })
    }

    // Get user profile for email
    const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

    // Get grant details
    const { data: grant } = await supabase.from("grants").select("*").eq("id", application.grant_id).single()

    console.log("[v0] Application approved:", {
      applicationId,
      certificateNumber,
      grantTitle: grant?.title,
      recipientName: profile?.full_name,
    })

    return NextResponse.json({
      success: true,
      application,
      certificateNumber,
      message: "Application approved successfully",
    })
  } catch (error: any) {
    console.error("[v0] Error in application approval:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
