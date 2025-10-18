import { redirect } from "next/navigation"
import { getSupabaseServerClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { OfficialFooter } from "@/components/layout/official-footer"

export default async function HomePage() {
  const supabase = await getSupabaseServerClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Redirect authenticated users to dashboard
  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a365d] to-[#2c5282] flex flex-col">
      {/* Official Government Header */}
      <div className="border-b border-blue-700 bg-[#1e3a5f]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf722ceb-e7b9-4590-948e-681c5bcaffa1-dgMfg1h5S5kjnl0vai88AXFuzuE0Jy.jpeg"
                  alt="Department of Health & Human Services USA Seal"
                  className="h-full w-full object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">U.S. Department of Health & Human Services</h1>
                <p className="text-sm text-blue-200">MAKE AMERICA HEALTHY AGAIN</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Link href="/login">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-blue-500 hover:bg-blue-600">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 flex-1">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-block rounded-full bg-blue-500/20 px-4 py-2 text-sm font-semibold text-blue-200 border border-blue-400">
            Official U.S. Government Website
          </div>
          <h1 className="mb-6 text-balance text-5xl font-bold text-white">Access Government Grant Opportunities</h1>
          <p className="mb-8 text-pretty text-xl text-blue-100">
            Apply for federal grants and funding opportunities. Secure, verified, and accessible to all eligible
            applicants.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                Create Account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 bg-transparent">
                Sign In
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mx-auto mt-20 grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-blue-600 bg-[#2d3748] p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white">Secure & Verified</h3>
            <p className="text-sm text-blue-200">
              Two-factor authentication and email verification ensure your account security
            </p>
          </div>

          <div className="rounded-lg border border-blue-600 bg-[#2d3748] p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white">Easy Application</h3>
            <p className="text-sm text-blue-200">Streamlined application process with step-by-step guidance</p>
          </div>

          <div className="rounded-lg border border-blue-600 bg-[#2d3748] p-6 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
              <svg className="h-6 w-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 font-semibold text-white">Track Progress</h3>
            <p className="text-sm text-blue-200">Monitor your application status and receive real-time updates</p>
          </div>
        </div>

        {/* Current Opportunities Banner */}
        <div className="mx-auto mt-16 max-w-4xl rounded-lg border border-blue-500 bg-blue-600/20 p-8">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <svg className="h-8 w-8 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">WE CAN DO THIS!!! APPLY NOW STILL AVAILABLE</h3>
              <p className="mt-2 text-blue-100">
                The Department of Health & Human Services has announced $16,000 in new grant funding for community
                health initiatives. Applications are being accepted now through April 30, 2025.
              </p>
              <Link href="/signup">
                <Button className="mt-4 bg-blue-500 hover:bg-blue-600">Apply Today</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Official Government Seals Footer */}
      <OfficialFooter />
    </div>
  )
}
