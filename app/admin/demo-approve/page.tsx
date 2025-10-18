import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DemoApprovalForm } from "@/components/admin/demo-approval-form"

export default async function DemoApprovePage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch user's submitted applications
  const { data: applications } = await supabase
    .from("applications")
    .select(`
      id,
      status,
      submitted_date,
      grants (
        id,
        title,
        agency,
        amount_display,
        category
      )
    `)
    .eq("user_id", user.id)
    .in("status", ["submitted", "under_review"])
    .order("submitted_date", { ascending: false })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Demo: Approve Applications</h1>
            <p className="mt-2 text-gray-600">
              This is a demo feature to simulate application approval and certificate generation
            </p>
          </div>

          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app: any) => (
                <Card key={app.id}>
                  <CardHeader>
                    <CardTitle>{app.grants.title}</CardTitle>
                    <CardDescription>{app.grants.agency}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="mb-4 grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm text-gray-600">Grant Amount</p>
                        <p className="text-lg font-semibold text-blue-600">{app.grants.amount_display}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium text-gray-900">{app.grants.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Status</p>
                        <p className="font-medium text-gray-900 capitalize">{app.status.replace("_", " ")}</p>
                      </div>
                    </div>
                    <DemoApprovalForm applicationId={app.id} />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No Pending Applications</h3>
                <p className="mt-2 text-gray-600">
                  You don't have any pending applications to approve. Submit a grant application first.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
