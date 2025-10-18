import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { GrantCertificateView } from "@/components/certificate/grant-certificate-view"

export default async function CertificatePage({
  params,
}: {
  params: { applicationId: string }
}) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get application details
  const { data: application } = await supabase
    .from("applications")
    .select("*, grants(*)")
    .eq("id", params.applicationId)
    .eq("user_id", user.id)
    .single()

  if (!application || application.status !== "approved") {
    redirect("/dashboard")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-background">
      <GrantCertificateView application={application} profile={profile} grant={application.grants} />
    </div>
  )
}
