"use client"

import { Button } from "@/components/ui/button"
import { Download, Printer, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRef } from "react"

interface GrantCertificateViewProps {
  application: any
  profile: any
  grant: any
}

export function GrantCertificateView({ application, profile, grant }: GrantCertificateViewProps) {
  const certificateRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!certificateRef.current) return

    // Use html2canvas to convert the certificate to an image
    const html2canvas = (await import("html2canvas")).default
    const canvas = await html2canvas(certificateRef.current, {
      scale: 2,
      backgroundColor: "#ffffff",
    })

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `grant-certificate-${application.certificate_number}.png`
        link.click()
        URL.revokeObjectURL(url)
      }
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link href="/my-applications">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
          </Button>
        </Link>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline" size="sm">
            <Printer className="mr-2 h-4 w-4" />
            Print
          </Button>
          <Button onClick={handleDownload} size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>

      <div
        ref={certificateRef}
        className="mx-auto max-w-4xl bg-white p-12 shadow-2xl"
        style={{
          background: "linear-gradient(to bottom, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        {/* Header with official seal */}
        <div className="mb-8 flex items-start justify-between border-b-4 border-[#1e40af] pb-6">
          <div className="flex-1">
            <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1e40af]">
              United States Government
            </div>
            <h1 className="text-4xl font-bold text-[#1e3a8a]">Department of Health & Human Services</h1>
            <p className="mt-2 text-sm text-gray-600">Office of Grant Management</p>
          </div>
          <div className="ml-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[#1e40af] to-[#3b82f6] shadow-lg">
            <div className="text-center">
              <div className="text-xs font-bold text-white">OFFICIAL</div>
              <div className="text-2xl font-bold text-white">HHS</div>
              <div className="text-xs text-white">USA</div>
            </div>
          </div>
        </div>

        {/* Certificate Title */}
        <div className="mb-8 text-center">
          <h2 className="mb-2 text-5xl font-bold tracking-wide text-[#dc2626]">GRANT AWARD CERTIFICATE</h2>
          <div className="mx-auto mt-4 h-1 w-32 bg-gradient-to-r from-transparent via-[#dc2626] to-transparent" />
        </div>

        {/* Certificate Body */}
        <div className="mb-8 space-y-6 text-center">
          <p className="text-lg leading-relaxed text-gray-700">This is to certify that</p>

          <div className="my-6">
            <h3 className="text-4xl font-bold uppercase tracking-wide text-[#1e3a8a]">
              {profile?.full_name || "Grant Recipient"}
            </h3>
            <div className="mx-auto mt-2 h-0.5 w-96 bg-gray-300" />
          </div>

          <p className="text-lg leading-relaxed text-gray-700">has been awarded a grant under the</p>

          <div className="my-4">
            <p className="text-2xl font-semibold text-[#1e40af]">{grant?.title}</p>
            <p className="mt-1 text-sm uppercase tracking-wider text-gray-600">{grant?.category} Program</p>
          </div>

          <div className="my-8 rounded-lg border-2 border-[#1e40af] bg-blue-50 p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#1e40af]">Award Amount</p>
            <p className="text-5xl font-bold text-[#1e3a8a]">{grant?.amount_display}</p>
          </div>

          <p className="text-lg leading-relaxed text-gray-700">
            This certificate serves as official proof of grant approval and authorization to receive the awarded funds
            in accordance with federal grant regulations and guidelines.
          </p>
        </div>

        {/* Certificate Details */}
        <div className="mb-8 grid grid-cols-2 gap-6 border-t-2 border-gray-200 pt-6">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-600">Certificate Number</p>
            <p className="font-mono text-lg font-bold text-[#1e3a8a]">{application.certificate_number}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-600">Approval Date</p>
            <p className="text-lg font-semibold text-gray-800">
              {formatDate(application.approval_date || application.updated_at)}
            </p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-600">Recipient ID</p>
            <p className="font-mono text-sm text-gray-700">{application.user_id.substring(0, 16).toUpperCase()}</p>
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-gray-600">Grant Category</p>
            <p className="text-sm font-semibold text-gray-700">{grant?.category}</p>
          </div>
        </div>

        {/* Signatures */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t-2 border-gray-200 pt-8">
          <div className="text-center">
            <div className="mb-4 h-16 border-b-2 border-gray-400" />
            <p className="font-semibold text-gray-800">Dr. Sarah Mitchell</p>
            <p className="text-sm text-gray-600">Director, Grant Operations</p>
            <p className="text-xs text-gray-500">U.S. Department of HHS</p>
          </div>
          <div className="text-center">
            <div className="mb-4 h-16 border-b-2 border-gray-400" />
            <p className="font-semibold text-gray-800">James R. Thompson</p>
            <p className="text-sm text-gray-600">Assistant Secretary for Financial Resources</p>
            <p className="text-xs text-gray-500">U.S. Department of HHS</p>
          </div>
        </div>

        {/* Official Seal */}
        <div className="mt-8 flex justify-center">
          <div className="relative h-32 w-32">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 shadow-xl" />
            <div className="absolute inset-2 flex items-center justify-center rounded-full border-4 border-yellow-300">
              <div className="text-center">
                <div className="text-xs font-bold text-yellow-900">OFFICIAL</div>
                <div className="text-sm font-bold text-yellow-900">SEAL</div>
                <div className="text-xs text-yellow-900">2025</div>
              </div>
            </div>
            {/* Ribbon tails */}
            <div className="absolute -bottom-8 left-1/2 h-16 w-8 -translate-x-1/2">
              <div className="absolute left-0 h-full w-3 bg-gradient-to-b from-yellow-500 to-yellow-600 shadow-md" />
              <div className="absolute right-0 h-full w-3 bg-gradient-to-b from-yellow-500 to-yellow-600 shadow-md" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 border-t border-gray-300 pt-4 text-center">
          <p className="text-xs text-gray-500">
            This certificate is issued by the U.S. Department of Health and Human Services
          </p>
          <p className="text-xs text-gray-500">200 Independence Avenue, S.W., Washington, D.C. 20201</p>
          <p className="mt-2 text-xs font-semibold text-gray-600">
            Certificate ID: {application.certificate_number} | Issued:{" "}
            {formatDate(application.approval_date || application.updated_at)}
          </p>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  )
}
