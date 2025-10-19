"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Grant {
  id: string
  title: string
  agency: string
  amount: number
  amount_display: string
  deadline: string
  status: string
  description: string
  category: string
  requirements: string | null
}

export function GrantOpportunities() {
  const router = useRouter()
  const [grants, setGrants] = useState<Grant[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchGrants() {
      const { data, error } = await supabase
        .from("grants")
        .select("*")
        .eq("status", "open")
        .order("amount", { ascending: true })

      if (error) {
        console.error("[v0] Error fetching grants:", error)
      } else {
        setGrants(data || [])
      }
      setLoading(false)
    }

    fetchGrants()
  }, [])

  const handleApply = (grantId: string) => {
    router.push(`/grants/${grantId}/apply`)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Available Grant Opportunities</CardTitle>
          <CardDescription>Loading grant opportunities...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Available Grant Opportunities</CardTitle>
        <CardDescription>Browse and apply for government grants ranging from $16,000 to $500,000</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {grants.map((grant) => (
          <div key={grant.id} className="rounded-lg border border-gray-200 bg-white p-4 transition hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900">{grant.title}</h3>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    {grant.status.toUpperCase()}
                  </Badge>
                </div>
                <p className="mt-1 text-sm text-gray-600">{grant.agency}</p>
                <p className="mt-2 text-sm text-gray-700">{grant.description}</p>
                {grant.requirements && (
                  <p className="mt-2 text-sm italic text-gray-600">Requirements: {grant.requirements}</p>
                )}
                <div className="mt-3 flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1 text-gray-600">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-blue-600">{grant.amount_display}</span>
                  </div>
                  <div className="flex items-center gap-1 text-gray-600">
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
              </div>
              <Button onClick={() => handleApply(grant.id)} className="ml-4 bg-blue-600 hover:bg-blue-700">
                Apply Now
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
