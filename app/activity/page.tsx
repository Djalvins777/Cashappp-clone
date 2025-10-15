"use client"

import { BottomNav } from "@/components/bottom-nav"
import { User } from "lucide-react"

export default function ActivityPage() {
  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold">Activity</h1>
        <button className="p-2">
          <User className="w-6 h-6" />
        </button>
      </header>

      <div className="p-6">
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold mb-2">No Activity Yet</h3>
          <p className="text-muted-foreground">Your transactions will appear here</p>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
