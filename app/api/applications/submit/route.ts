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
    const { grantId, applicationData } = body

    // Check if user already applied
    const { data: existingApp } = await supabase
      .from("applications")
      .select("id")
      .eq("user_id", user.id)
      .eq("grant_id", grantId)
      .single()

    if (existingApp) {
      return NextResponse.json({ error: "You have already applied to this grant" }, { status: 400 })
    }

    // Create application
    const { data: application, error: appError } = await supabase
      .from("applications")
      .insert({
        user_id: user.id,
        grant_id: grantId,
        status: "submitted",
        submitted_date: new Date().toISOString(),
        notes: JSON.stringify(applicationData),
      })
      .select()
      .single()

    if (appError) {
      console.error("[v0] Error creating application:", appError)
      return NextResponse.json({ error: "Failed to submit application" }, { status: 500 })
    }

    // Get grant details for email
    const { data: grant } = await supabase.from("grants").select("*").eq("id", grantId).single()

    // Send confirmation email (using Supabase auth email)
    // Note: In production, you'd use a proper email service
    console.log("[v0] Application submitted:", {
      userId: user.id,
      grantId,
      grantTitle: grant?.title,
      amount: grant?.amount_display,
    })

    return NextResponse.json({
      success: true,
      application,
      message: "Application submitted successfully",
    })
  } catch (error: any) {
    console.error("[v0] Error in application submission:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
