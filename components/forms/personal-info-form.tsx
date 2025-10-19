"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface PersonalInfoFormData {
  city: string
  state: string
  home_address: string
  gender: string
  date_of_birth: string
  next_of_kin: string
  mother_name: string
  marital_status: string
  phone_number: string
  email: string
  monthly_income: string
  hearing_status: string
  nationality: string
  housing_status: string
  selfie_url?: string
}

export function PersonalInfoForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [selfieFile, setSelfieFile] = useState<File | null>(null)
  const [formData, setFormData] = useState<PersonalInfoFormData>({
    city: "",
    state: "",
    home_address: "",
    gender: "",
    date_of_birth: "",
    next_of_kin: "",
    mother_name: "",
    marital_status: "",
    phone_number: "",
    email: "",
    monthly_income: "",
    hearing_status: "",
    nationality: "",
    housing_status: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelfieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Error",
          description: "Selfie must be less than 5MB",
          variant: "destructive",
        })
        return
      }
      setSelfieFile(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate required fields
      if (
        !formData.city ||
        !formData.state ||
        !formData.home_address ||
        !formData.gender ||
        !formData.date_of_birth ||
        !formData.phone_number ||
        !formData.email ||
        !formData.nationality
      ) {
        toast({
          title: "Error",
          description: "Please fill in all required fields",
          variant: "destructive",
        })
        setLoading(false)
        return
      }

      // Upload selfie if provided
      let selfieUrl = ""
      if (selfieFile) {
        const formDataWithFile = new FormData()
        formDataWithFile.append("file", selfieFile)

        const uploadResponse = await fetch("/api/upload-selfie", {
          method: "POST",
          body: formDataWithFile,
        })

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload selfie")
        }

        const uploadData = await uploadResponse.json()
        selfieUrl = uploadData.url
      }

      // Submit form data
      const response = await fetch("/api/personal-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          selfie_url: selfieUrl,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || "Failed to save personal information")
      }

      toast({
        title: "Success",
        description: "Personal information saved successfully",
      })

      router.push("/dashboard")
    } catch (error) {
      console.error("[v0] Error submitting form:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save personal information",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-full border-blue-600 bg-[#2d3748]">
      <CardHeader>
        <CardTitle className="text-white">Personal Information</CardTitle>
        <CardDescription className="text-blue-200">Please provide your complete personal information</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Location Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="city" className="text-white">
                  City *
                </Label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state" className="text-white">
                  State *
                </Label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="Enter your state"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="home_address" className="text-white">
                Home Address *
              </Label>
              <Textarea
                id="home_address"
                name="home_address"
                value={formData.home_address}
                onChange={handleInputChange}
                placeholder="Enter your complete home address"
                className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                required
              />
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Personal Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-white">
                  Gender *
                </Label>
                <Select value={formData.gender} onValueChange={(value) => handleSelectChange("gender", value)}>
                  <SelectTrigger className="border-blue-500 bg-[#1a365d] text-white">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a365d] border-blue-500">
                    <SelectItem value="male" className="text-white">
                      Male
                    </SelectItem>
                    <SelectItem value="female" className="text-white">
                      Female
                    </SelectItem>
                    <SelectItem value="other" className="text-white">
                      Other
                    </SelectItem>
                    <SelectItem value="prefer_not_to_say" className="text-white">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date_of_birth" className="text-white">
                  Date of Birth *
                </Label>
                <Input
                  id="date_of_birth"
                  name="date_of_birth"
                  type="date"
                  value={formData.date_of_birth}
                  onChange={handleInputChange}
                  className="border-blue-500 bg-[#1a365d] text-white"
                  required
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="marital_status" className="text-white">
                  Marital Status *
                </Label>
                <Select
                  value={formData.marital_status}
                  onValueChange={(value) => handleSelectChange("marital_status", value)}
                >
                  <SelectTrigger className="border-blue-500 bg-[#1a365d] text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a365d] border-blue-500">
                    <SelectItem value="single" className="text-white">
                      Single
                    </SelectItem>
                    <SelectItem value="married" className="text-white">
                      Married
                    </SelectItem>
                    <SelectItem value="divorced" className="text-white">
                      Divorced
                    </SelectItem>
                    <SelectItem value="widowed" className="text-white">
                      Widowed
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="nationality" className="text-white">
                  Nationality *
                </Label>
                <Input
                  id="nationality"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleInputChange}
                  placeholder="Enter your nationality"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Family Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Family Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="mother_name" className="text-white">
                  Mother's Name
                </Label>
                <Input
                  id="mother_name"
                  name="mother_name"
                  value={formData.mother_name}
                  onChange={handleInputChange}
                  placeholder="Enter your mother's name"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="next_of_kin" className="text-white">
                  Next of Kin
                </Label>
                <Input
                  id="next_of_kin"
                  name="next_of_kin"
                  value={formData.next_of_kin}
                  onChange={handleInputChange}
                  placeholder="Enter next of kin name"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Contact Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone_number" className="text-white">
                  Phone Number *
                </Label>
                <Input
                  id="phone_number"
                  name="phone_number"
                  type="tel"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                  required
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Financial Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="monthly_income" className="text-white">
                  Monthly Income
                </Label>
                <Input
                  id="monthly_income"
                  name="monthly_income"
                  type="number"
                  step="0.01"
                  value={formData.monthly_income}
                  onChange={handleInputChange}
                  placeholder="Enter your monthly income"
                  className="border-blue-500 bg-[#1a365d] text-white placeholder:text-blue-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="housing_status" className="text-white">
                  Housing Status
                </Label>
                <Select
                  value={formData.housing_status}
                  onValueChange={(value) => handleSelectChange("housing_status", value)}
                >
                  <SelectTrigger className="border-blue-500 bg-[#1a365d] text-white">
                    <SelectValue placeholder="Select housing status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a365d] border-blue-500">
                    <SelectItem value="own" className="text-white">
                      Own a House
                    </SelectItem>
                    <SelectItem value="rent" className="text-white">
                      Rent Apartment
                    </SelectItem>
                    <SelectItem value="other" className="text-white">
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Health Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Health Information</h3>
            <div className="space-y-2">
              <Label htmlFor="hearing_status" className="text-white">
                Hearing Status
              </Label>
              <Select
                value={formData.hearing_status}
                onValueChange={(value) => handleSelectChange("hearing_status", value)}
              >
                <SelectTrigger className="border-blue-500 bg-[#1a365d] text-white">
                  <SelectValue placeholder="Select hearing status" />
                </SelectTrigger>
                <SelectContent className="bg-[#1a365d] border-blue-500">
                  <SelectItem value="hearing" className="text-white">
                    Hearing
                  </SelectItem>
                  <SelectItem value="deaf" className="text-white">
                    Deaf
                  </SelectItem>
                  <SelectItem value="hard_of_hearing" className="text-white">
                    Hard of Hearing
                  </SelectItem>
                  <SelectItem value="prefer_not_to_say" className="text-white">
                    Prefer not to say
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Selfie Upload */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">Photo Verification</h3>
            <div className="space-y-2">
              <Label htmlFor="selfie" className="text-white">
                Clear Selfie Photo
              </Label>
              <Input
                id="selfie"
                type="file"
                accept="image/*"
                onChange={handleSelfieChange}
                className="border-blue-500 bg-[#1a365d] text-white file:bg-blue-600 file:text-white file:border-0"
              />
              <p className="text-sm text-blue-300">
                {selfieFile ? `Selected: ${selfieFile.name}` : "Upload a clear selfie photo (max 5MB)"}
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            {loading ? "Saving..." : "Save Personal Information"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
