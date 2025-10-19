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

    const formData = await request.formData()
    const file = formData.get("file") as File

    if (!file) {
      return NextResponse.json({ message: "No file provided" }, { status: 400 })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const filename = `selfies/${user.id}/${timestamp}-${file.name}`

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from("applicant-documents").upload(filename, file, {
      cacheControl: "3600",
      upsert: false,
    })

    if (error) {
      console.error("[v0] Error uploading selfie:", error)
      return NextResponse.json({ message: "Failed to upload selfie" }, { status: 500 })
    }

    // Get public URL
    const {
      data: { publicUrl },
    } = supabase.storage.from("applicant-documents").getPublicUrl(data.path)

    return NextResponse.json({ url: publicUrl }, { status: 200 })
  } catch (error) {
    console.error("[v0] Error in upload-selfie route:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
