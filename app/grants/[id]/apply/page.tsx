import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { GrantApplicationForm } from "@/components/grants/grant-application-form"

export default async function GrantApplicationPage({ params }: { params: { id: string } }) {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Get grant details
  const { data: grant } = await supabase.from("grants").select("*").eq("id", params.id).single()

  if (!grant) {
    redirect("/dashboard")
  }

  // Check if user already applied
  const { data: existingApplication } = await supabase
    .from("applications")
    .select("*")
    .eq("user_id", user.id)
    .eq("grant_id", params.id)
    .single()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Apply for Grant</h1>
            <p className="mt-2 text-gray-600">Complete the application form to apply for this grant opportunity</p>
          </div>

          {/* Grant Details Card */}
          <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-6">
            <h2 className="text-2xl font-bold text-blue-900">{grant.title}</h2>
            <p className="mt-2 text-blue-800">{grant.agency}</p>
            <div className="mt-4 flex items-center gap-6">
              <div>
                <p className="text-sm text-blue-700">Grant Amount</p>
                <p className="text-2xl font-bold text-blue-900">{grant.amount_display}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Deadline</p>
                <p className="text-lg font-semibold text-blue-900">{new Date(grant.deadline).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Category</p>
                <p className="text-lg font-semibold text-blue-900">{grant.category}</p>
              </div>
            </div>
            <p className="mt-4 text-blue-800">{grant.description}</p>
            {grant.requirements && (
              <div className="mt-4 rounded-lg bg-white p-4">
                <p className="font-semibold text-blue-900">Requirements:</p>
                <p className="mt-1 text-blue-800">{grant.requirements}</p>
              </div>
            )}
          </div>

          {existingApplication ? (
            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-6 text-center">
              <h3 className="text-xl font-semibold text-yellow-900">Application Already Submitted</h3>
              <p className="mt-2 text-yellow-800">
                You have already submitted an application for this grant. Check your dashboard for status updates.
              </p>
            </div>
          ) : (
            <GrantApplicationForm grant={grant} userId={user.id} />
          )}
        </div>
      </main>
    </div>
  )
}
