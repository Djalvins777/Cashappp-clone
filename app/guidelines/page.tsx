import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default async function GuidelinesPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Grant Application Guidelines</h1>
            <p className="mt-2 text-gray-600">
              Important information and requirements for applying to government grants
            </p>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Requirements</CardTitle>
                <CardDescription>Who can apply for government grants</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900">General Eligibility</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                    <li>Must be a U.S. citizen or legal resident</li>
                    <li>Must have a verified email address and account</li>
                    <li>Must meet specific grant program requirements</li>
                    <li>Must not have any outstanding federal debts</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Organization Requirements</h3>
                  <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-gray-700">
                    <li>Non-profits must have 501(c)(3) status</li>
                    <li>Businesses must be registered and in good standing</li>
                    <li>Educational institutions must be accredited</li>
                    <li>Government entities must provide authorization documentation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>Step-by-step guide to applying</CardDescription>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      1
                    </span>
                    <div>
                      <strong>Browse Available Grants:</strong> Review grant opportunities on your dashboard and select
                      one that matches your needs and qualifications.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      2
                    </span>
                    <div>
                      <strong>Review Requirements:</strong> Carefully read the grant description, requirements, and
                      deadline before applying.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      3
                    </span>
                    <div>
                      <strong>Complete Application:</strong> Fill out the application form with accurate and detailed
                      information about your project.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      4
                    </span>
                    <div>
                      <strong>Submit Application:</strong> Review your application carefully before submitting. Once
                      submitted, you cannot edit it.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
                      5
                    </span>
                    <div>
                      <strong>Track Status:</strong> Monitor your application status on your dashboard. You'll receive
                      email notifications for status changes.
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Grant Amounts & Categories</CardTitle>
                <CardDescription>Available funding levels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-700">
                  <p>
                    Our grant programs offer funding ranging from <strong>$16,000 to $500,000</strong> across various
                    categories:
                  </p>
                  <ul className="list-inside list-disc space-y-1">
                    <li>Health & Human Services</li>
                    <li>Small Business Development</li>
                    <li>Education & Technology</li>
                    <li>Infrastructure & Transportation</li>
                    <li>Housing & Community Development</li>
                    <li>Clean Energy & Environment</li>
                    <li>Workforce Development</li>
                    <li>Public Safety</li>
                  </ul>
                  <p className="mt-4 rounded-lg bg-blue-50 p-4 text-blue-900">
                    <strong>Note:</strong> Grant amounts are fixed for each program. Select the grant that best matches
                    your project needs and budget requirements.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Important Reminders</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Applications are reviewed on a rolling basis
                  </li>
                  <li className="flex gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    You can apply to multiple grants simultaneously
                  </li>
                  <li className="flex gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Review times vary by grant program (typically 2-6 weeks)
                  </li>
                  <li className="flex gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Approved grants require additional documentation before disbursement
                  </li>
                  <li className="flex gap-2">
                    <svg
                      className="h-5 w-5 flex-shrink-0 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    All grant funds must be used for the stated project purpose
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
