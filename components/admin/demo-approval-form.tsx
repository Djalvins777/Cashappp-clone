"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle, Loader2 } from "lucide-react"

interface DemoApprovalFormProps {
  applicationId: string
}

export function DemoApprovalForm({ applicationId }: DemoApprovalFormProps) {
  const [loading, setLoading] = useState(false)
  const [approved, setApproved] = useState(false)
  const router = useRouter()

  const handleApprove = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/applications/approve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ applicationId }),
      })

      const data = await response.json()

      if (response.ok) {
        setApproved(true)
        setTimeout(() => {
          router.push("/my-applications")
          router.refresh()
        }, 2000)
      } else {
        alert(data.error || "Failed to approve application")
      }
    } catch (error) {
      console.error("[v0] Error approving application:", error)
      alert("An error occurred while approving the application")
    } finally {
      setLoading(false)
    }
  }

  if (approved) {
    return (
      <div className="rounded-lg border border-green-200 bg-green-50 p-4">
        <div className="flex items-center gap-2 text-green-800">
          <CheckCircle className="h-5 w-5" />
          <p className="font-semibold">Application Approved!</p>
        </div>
        <p className="mt-1 text-sm text-green-700">Redirecting to view your certificate...</p>
      </div>
    )
  }

  return (
    <Button onClick={handleApprove} disabled={loading} className="w-full bg-green-600 hover:bg-green-700">
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Approving...
        </>
      ) : (
        <>
          <CheckCircle className="mr-2 h-4 w-4" />
          Approve Application (Demo)
        </>
      )}
    </Button>
  )
}
