"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import { createBrowserClient } from "@/lib/supabase/client"

interface Application {
  id: string
  grant_id: string
  status: string
  submitted_date: string
  grants: {
    title: string
    amount_display: string
  }
}

export function ApplicationStatus() {
  const router = useRouter()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createBrowserClient()

  useEffect(() => {
    async function fetchApplications() {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from("applications")
        .select(`
          id,
          grant_id,
          status,
          submitted_date,
          grants (
            title,
            amount_display
          )
        `)
        .eq("user_id", user.id)
        .order("submitted_date", { ascending: false })

      if (error) {
        console.error("[v0] Error fetching applications:", error)
      } else {
        setApplications(data || [])
      }
      setLoading(false)
    }

    fetchApplications()
  }, [])

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

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>My Applications</CardTitle>
          <CardDescription>Loading your applications...</CardDescription>
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
        <CardTitle>My Applications</CardTitle>
        <CardDescription>Track your grant application status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {applications.length > 0 ? (
          applications.map((app) => (
            <div key={app.id} className="rounded-lg border border-gray-200 bg-white p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-gray-900">{app.grants.title}</h4>
                  <p className="mt-1 text-xs font-medium text-blue-600">{app.grants.amount_display}</p>
                  <p className="mt-1 text-xs text-gray-600">
                    Submitted: {new Date(app.submitted_date).toLocaleDateString()}
                  </p>
                </div>
                <Badge variant="secondary" className={getStatusBadge(app.status)}>
                  {getStatusLabel(app.status)}
                </Badge>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-lg border border-dashed border-gray-300 p-6 text-center">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <p className="mt-2 text-sm text-gray-600">No applications yet</p>
            <p className="mt-1 text-xs text-gray-500">Start by browsing available grants</p>
            <Button
              size="sm"
              className="mt-4 bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push("/dashboard#grants")}
            >
              Browse Grants
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
