"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [saveCredentials, setSaveCredentials] = useState(false)
  const [error, setError] = useState("")
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    const success = login(username, password)
    if (success) {
      router.push("/")
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f3f0] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
              <path d="M 100 0 L 0 100 M 50 0 L 0 50 M 100 50 L 50 100" stroke="#1e3a8a" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 flex flex-col items-center pt-12 px-4">
        <div className="mb-12 flex items-center gap-4">
          <h1 className="text-[2.5rem] font-bold tracking-wide text-[#012169] leading-none">BANK OF AMERICA</h1>
          <Image src="/images/boa-logo.png" alt="Bank of America" width={56} height={56} className="w-14 h-14" />
        </div>

        <div className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username field */}
            <div>
              <Input
                id="username"
                type="text"
                placeholder="User ID"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full h-14 text-lg border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-[#012169] focus:ring-0 px-0 placeholder:text-gray-500"
                required
              />
            </div>

            {/* Password field with show/hide toggle */}
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-14 text-lg border-0 border-b-2 border-gray-300 rounded-none bg-transparent focus:border-[#012169] focus:ring-0 px-0 pr-12 placeholder:text-gray-500"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-600 hover:text-gray-900"
              >
                {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
              </button>
            </div>

            {/* Save credentials checkbox */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="save"
                checked={saveCredentials}
                onCheckedChange={(checked) => setSaveCredentials(checked as boolean)}
                className="w-6 h-6 rounded-full border-2 border-gray-400"
              />
              <label htmlFor="save" className="text-base text-gray-700 cursor-pointer select-none">
                Save User ID / Password
              </label>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg border border-red-200">{error}</div>
            )}

            {/* Login button */}
            <div className="flex flex-col items-center gap-4 pt-4">
              <Button
                type="submit"
                className="w-64 h-14 bg-[#4a5f7f] hover:bg-[#3d4f68] text-white text-lg font-medium rounded-full shadow-md"
              >
                LOG IN
              </Button>
              <button type="button" className="text-[#012169] hover:underline text-base font-medium">
                Forgot ID/Password
              </button>
            </div>
          </form>
        </div>

        <div className="mt-8 text-center">
          <button className="text-[#012169] hover:underline text-base font-medium">My Balance™ | Enroll</button>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl pb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#e31837] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#012169] text-lg mb-1">Alert</h3>
                <p className="text-gray-600 text-sm">Stay informed about your account activity</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#e31837] rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path
                    fillRule="evenodd"
                    d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-[#012169] text-lg mb-1">Open A Savings account</h3>
                <p className="text-gray-600 text-sm">Start saving for your future today</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
