import { SignupForm } from "@/components/auth/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { OfficialFooter } from "@/components/layout/official-footer"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Official Government Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf722ceb-e7b9-4590-948e-681c5bcaffa1-dgMfg1h5S5kjnl0vai88AXFuzuE0Jy.jpeg"
                alt="HHS Seal"
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">U.S. Department of Health & Human Services</h1>
              <p className="text-sm text-gray-600">Official Government Grant Portal</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 flex-1">
        <div className="mx-auto max-w-md">
          {/* Official Notice */}
          <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
            <div className="flex gap-3">
              <svg
                className="h-5 w-5 flex-shrink-0 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="text-sm text-blue-900">
                <p className="font-semibold">Official Government Website</p>
                <p className="mt-1">
                  This is a secure government portal. Your information is protected and will only be used for grant
                  application purposes.
                </p>
              </div>
            </div>
          </div>

          <Card className="border-gray-200 shadow-lg">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-gray-900">Create Your Account</CardTitle>
              <CardDescription className="text-gray-600">
                Register to access government grant applications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignupForm />
            </CardContent>
          </Card>

          {/* Footer Notice */}
          <div className="mt-6 text-center text-sm text-gray-600">
            <p>
              Already have an account?{" "}
              <a href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
                Sign in here
              </a>
            </p>
          </div>

          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-xs text-gray-600">
              By creating an account, you agree to comply with all federal regulations and certify that the information
              provided is accurate and truthful. Misrepresentation may result in legal consequences.
            </p>
          </div>
        </div>
      </div>

      <OfficialFooter />
    </div>
  )
}
