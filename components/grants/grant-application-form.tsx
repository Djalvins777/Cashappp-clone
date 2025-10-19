"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createBrowserClient } from "@/lib/supabase/client"

interface Grant {
  id: string
  title: string
  amount_display: string
}

interface GrantApplicationFormProps {
  grant: Grant
  userId: string
}

export function GrantApplicationForm({ grant, userId }: GrantApplicationFormProps) {
  const router = useRouter()
  const supabase = createBrowserClient()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    organizationName: "",
    projectTitle: "",
    projectDescription: "",
    requestedAmount: grant.amount_display,
    timeline: "",
    expectedOutcomes: "",
    additionalNotes: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Create application record
      const { error: applicationError } = await supabase.from("applications").insert({
        user_id: userId,
        grant_id: grant.id,
        status: "submitted",
        submitted_date: new Date().toISOString(),
        notes: JSON.stringify(formData),
      })

      if (applicationError) throw applicationError

      // Show success and redirect
      router.push("/dashboard?application=success")
    } catch (err: any) {
      console.error("[v0] Error submitting application:", err)
      setError(err.message || "Failed to submit application. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grant Application Form</CardTitle>
        <CardDescription>
          Please provide detailed information about your project and how you plan to use the grant funds
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">{error}</div>}

          <div className="space-y-2">
            <Label htmlFor="organizationName">Organization/Individual Name *</Label>
            <Input
              id="organizationName"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleChange}
              required
              placeholder="Enter your organization or full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectTitle">Project Title *</Label>
            <Input
              id="projectTitle"
              name="projectTitle"
              value={formData.projectTitle}
              onChange={handleChange}
              required
              placeholder="Brief title for your project"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="projectDescription">Project Description *</Label>
            <Textarea
              id="projectDescription"
              name="projectDescription"
              value={formData.projectDescription}
              onChange={handleChange}
              required
              rows={6}
              placeholder="Describe your project, its goals, and how it aligns with the grant objectives"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="requestedAmount">Requested Grant Amount</Label>
            <Input id="requestedAmount" name="requestedAmount" value={formData.requestedAmount} disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="timeline">Project Timeline *</Label>
            <Input
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
              placeholder="e.g., 6 months, 1 year"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expectedOutcomes">Expected Outcomes *</Label>
            <Textarea
              id="expectedOutcomes"
              name="expectedOutcomes"
              value={formData.expectedOutcomes}
              onChange={handleChange}
              required
              rows={4}
              placeholder="What results do you expect to achieve with this grant?"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalNotes">Additional Notes (Optional)</Label>
            <Textarea
              id="additionalNotes"
              name="additionalNotes"
              value={formData.additionalNotes}
              onChange={handleChange}
              rows={3}
              placeholder="Any additional information you'd like to provide"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading} className="flex-1 bg-blue-600 hover:bg-blue-700">
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.push("/dashboard")} disabled={loading}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
