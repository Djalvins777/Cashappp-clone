"use client"

import { BottomNav } from "@/components/bottom-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Mail, Phone, Smartphone, MapPin, ChevronRight, Shield, Bell, Lock } from "lucide-react"
import Image from "next/image"

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Profile</h1>
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
            />
          </svg>
        </button>
      </header>

      <div className="p-6 space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-20 h-20 rounded-full overflow-hidden bg-accent flex items-center justify-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bf722ceb-e7b9-4590-948e-681c5bcaffa1-FeibJU3GDM64dxZKS7x4iA2nPbSc9i.jpeg"
              alt="Profile"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">Teresa Miranda</h2>
            <p className="text-muted-foreground">$teresam</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              <div className="flex items-center gap-4 p-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Name</div>
                  <Input
                    value="Teresa Miranda"
                    readOnly
                    className="border-0 p-0 h-auto font-medium bg-transparent focus-visible:ring-0"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Email</div>
                  <Input
                    value="agentelizabethdugan220@gmail.com"
                    readOnly
                    className="border-0 p-0 h-auto font-medium bg-transparent focus-visible:ring-0 text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 p-4">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <Input
                    value="(412) 219-3107"
                    readOnly
                    className="border-0 p-0 h-auto font-medium bg-transparent focus-visible:ring-0"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div>
          <h3 className="text-lg font-semibold mb-3">Login Activities</h3>
          <Card>
            <CardContent className="p-0">
              <button className="w-full flex items-center gap-4 p-4 hover:bg-secondary/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">iPhone 17</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    New York
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-2">
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Privacy</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
          <button className="w-full flex items-center justify-between p-4 rounded-xl bg-card hover:bg-card/80 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
