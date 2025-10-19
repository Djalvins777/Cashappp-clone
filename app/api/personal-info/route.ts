import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await getSupabaseServerClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Insert or update personal information
    const { error } = await supabase.from("personal_information").upsert(
      {
        user_id: user.id,
        city: body.city,
        state: body.state,
        home_address: body.home_address,
        gender: body.gender,
        date_of_birth: body.date_of_birth,
        next_of_kin: body.next_of_kin,
        mother_name: body.mother_name,
        marital_status: body.marital_status,
        phone_number: body.phone_number,
        email: body.email,
        monthly_income: body.monthly_income ? Number.parseFloat(body.monthly_income) : null,
        hearing_status: body.hearing_status,
        nationality: body.nationality,
        housing_status: body.housing_status,
        selfie_url: body.selfie_url,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )

    if (error) {
      console.error("[v0] Error saving personal information:", error)
      return NextResponse.json({ message: "Failed to save personal information" }, { status: 500 })
    }

    return NextResponse.json({ message: "Personal information saved successfully" }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in personal-info route:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
