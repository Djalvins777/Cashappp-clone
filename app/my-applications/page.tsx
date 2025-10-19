import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Award } from "lucide-react"

export default async function MyApplicationsPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch user's applications with grant details
  const { data: applications } = await supabase
    .from("applications")
    .select(`
      id,
      status,
      submitted_date,
      notes,
      certificate_number,
      approval_date,
      grants (
        id,
        title,
        agency,
        amount_display,
        category,
        deadline
      )
    `)
    .eq("user_id", user.id)
    .order("submitted_date", { ascending: false })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "submitted":
        return "bg-blue-100 text-blue-700"
      case "under_review":
        return "bg-yellow-100 text-yellow-700"
      case "approved":
        return "bg-green-100 text-green-700"
      case "rejected":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getStatusLabel = (status: string) => {
    return status
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Applications</h1>
            <p className="mt-2 text-gray-600">View and track all your grant applications</p>
          </div>

          {applications && applications.length > 0 ? (
            <div className="space-y-4">
              {applications.map((app: any) => (
                <Card key={app.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle>{app.grants.title}</CardTitle>
                        <CardDescription className="mt-1">{app.grants.agency}</CardDescription>
                      </div>
                      <Badge className={getStatusBadge(app.status)}>{getStatusLabel(app.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div>
                        <p className="text-sm text-gray-600">Grant Amount</p>
                        <p className="text-lg font-semibold text-blue-600">{app.grants.amount_display}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Category</p>
                        <p className="font-medium text-gray-900">{app.grants.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Submitted Date</p>
                        <p className="font-medium text-gray-900">{new Date(app.submitted_date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Grant Deadline</p>
                        <p className="font-medium text-gray-900">
                          {new Date(app.grants.deadline).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    {app.status === "approved" && (
                      <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="font-semibold text-green-900">🎉 Congratulations!</p>
                            <p className="mt-1 text-sm text-green-800">
                              Your application has been approved. Download your official grant award certificate below.
                            </p>
                            {app.certificate_number && (
                              <p className="mt-2 text-xs font-mono text-green-700">
                                Certificate: {app.certificate_number}
                              </p>
                            )}
                          </div>
                          <Link href={`/certificate/${app.id}`}>
                            <Button size="sm" className="bg-green-600 hover:bg-green-700">
                              <Award className="mr-2 h-4 w-4" />
                              View Certificate
                            </Button>
                          </Link>
                        </div>
                      </div>
                    )}

                    {app.status === "under_review" && (
                      <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
                        <p className="text-sm text-yellow-800">
                          Your application is currently under review. This process typically takes 2-6 weeks. You will
                          be notified via email once a decision has been made.
                        </p>
                      </div>
                    )}

                    {app.status === "rejected" && (
                      <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                        <p className="text-sm text-red-800">
                          Unfortunately, your application was not approved at this time. You may apply to other grant
                          opportunities that better match your qualifications.
                        </p>
                      </div>
                    )}
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
                <h3 className="mt-4 text-lg font-semibold text-gray-900">No Applications Yet</h3>
                <p className="mt-2 text-gray-600">
                  You haven't submitted any grant applications. Browse available grants to get started.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
