import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { PersonalInfoForm } from "@/components/forms/personal-info-form"
import { OfficialFooter } from "@/components/layout/official-footer"

export default async function PersonalInfoPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect to login if not authenticated
  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a365d] to-[#2c5282] flex flex-col">
      {/* Header */}
      <div className="border-b border-blue-700 bg-[#1e3a5f]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf722ceb-e7b9-4590-948e-681c5bcaffa1-dgMfg1h5S5kjnl0vai88AXFuzuE0Jy.jpeg"
                  alt="Department of Health & Human Services USA Seal"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">U.S. Department of Health & Human Services</h1>
                <p className="text-sm text-blue-200">MAKE AMERICA HEALTHY AGAIN</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">Complete Your Profile</h2>
            <p className="text-blue-200">Please provide your personal information to complete your grant application</p>
          </div>

          <PersonalInfoForm />
        </div>
      </div>

      {/* Footer */}
      <OfficialFooter />
    </div>
  )
}
