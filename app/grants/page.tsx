import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default async function GrantsPage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  // Fetch all available grants
  const { data: grants } = await supabase
    .from("grants")
    .select("*")
    .eq("status", "open")
    .order("amount", { ascending: true })

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader user={user} profile={profile} />

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Browse Grant Opportunities</h1>
            <p className="mt-2 text-gray-600">
              Explore government grants ranging from $16,000 to $500,000 across various categories
            </p>
          </div>

          {/* Summary Stats */}
          <div className="mb-8 grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Total Grants</p>
                  <p className="text-3xl font-bold text-blue-600">{grants?.length || 0}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Minimum Amount</p>
                  <p className="text-3xl font-bold text-green-600">$16K</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Maximum Amount</p>
                  <p className="text-3xl font-bold text-green-600">$500K</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-3xl font-bold text-purple-600">8</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Grant Listings */}
          <div className="space-y-4">
            {grants?.map((grant) => (
              <Card key={grant.id} className="transition hover:shadow-lg">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{grant.title}</CardTitle>
                        <Badge variant="secondary" className="bg-green-100 text-green-700">
                          OPEN
                        </Badge>
                      </div>
                      <CardDescription className="mt-2">{grant.agency}</CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Grant Amount</p>
                      <p className="text-2xl font-bold text-blue-600">{grant.amount_display}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 text-gray-700">{grant.description}</p>

                  {grant.requirements && (
                    <div className="mb-4 rounded-lg bg-gray-50 p-3">
                      <p className="text-sm font-semibold text-gray-900">Requirements:</p>
                      <p className="mt-1 text-sm text-gray-700">{grant.requirements}</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Deadline: {new Date(grant.deadline).toLocaleDateString()}</span>
                      </div>
                      <Badge variant="outline">{grant.category}</Badge>
                    </div>
                    <Link href={`/grants/${grant.id}/apply`}>
                      <Button className="bg-blue-600 hover:bg-blue-700">Apply Now</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
