import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GrantOpportunities } from "@/components/dashboard/grant-opportunities"
import { ApplicationStatus } from "@/components/dashboard/application-status"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { AnnouncementBanner } from "@/components/dashboard/announcement-banner"
import { OfficialFooter } from "@/components/layout/official-footer"

export default async function DashboardPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a365d] to-[#2c5282] flex flex-col">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8 flex-1">
        <AnnouncementBanner />

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Welcome back, {profile?.full_name || "User"}</h1>
          <p className="mt-2 text-blue-200">Manage your grant applications and explore new opportunities</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3" id="grants">
          <div className="lg:col-span-2">
            <GrantOpportunities />
          </div>
          <div className="space-y-6">
            <QuickActions />
            <ApplicationStatus />
          </div>
        </div>
      </main>

      <OfficialFooter />
    </div>
  )
}
