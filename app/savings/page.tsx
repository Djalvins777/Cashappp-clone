"use client"

import { useState } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ChevronLeft, Target, TrendingUp } from "lucide-react"
import { useRouter } from "next/navigation"

export default function SavingsPage() {
  const router = useRouter()
  const [saved, setSaved] = useState(75)
  const [goal, setGoal] = useState(100)
  const [showUpdateGoal, setShowUpdateGoal] = useState(false)
  const [newGoal, setNewGoal] = useState(goal.toString())

  const progress = (saved / goal) * 100

  const handleUpdateGoal = () => {
    const goalAmount = Number.parseFloat(newGoal)
    if (!isNaN(goalAmount) && goalAmount > 0) {
      setGoal(goalAmount)
      setShowUpdateGoal(false)
    }
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="flex items-center justify-between p-4 border-b border-border">
        <button onClick={() => router.back()} className="p-2">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-semibold">Savings</h1>
        <div className="w-10" />
      </header>

      <div className="p-6 space-y-8">
        {/* Circular Progress */}
        <div className="flex flex-col items-center justify-center py-8">
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-muted"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 88}`}
                strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                className="text-accent transition-all duration-500"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-sm text-muted-foreground mb-1">💰</div>
              <div className="text-4xl font-bold">${saved.toFixed(2)}</div>
              <div className="text-sm text-muted-foreground mt-1">${goal.toFixed(2)}</div>
              <div className="text-xs text-muted-foreground">To goal</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button className="flex-1 h-12 bg-accent hover:bg-accent/90 text-white rounded-full">Transfer in</Button>
          <Button variant="outline" className="flex-1 h-12 rounded-full bg-transparent">
            Transfer out
          </Button>
        </div>

        {/* Options */}
        <div className="space-y-3">
          <button
            onClick={() => setShowUpdateGoal(true)}
            className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-card/80 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">Update goal</div>
              <div className="text-sm text-muted-foreground">Change your savings amount</div>
            </div>
          </button>

          <button className="w-full flex items-center gap-4 p-4 bg-card rounded-2xl hover:bg-card/80 transition-colors">
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">Round Ups</div>
              <div className="text-sm text-muted-foreground">Save with your Cash Card</div>
            </div>
          </button>
        </div>
      </div>

      <BottomNav />

      {/* Update Goal Modal */}
      <Dialog open={showUpdateGoal} onOpenChange={setShowUpdateGoal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Update Goal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-2 block">Goal Amount</label>
              <Input
                type="number"
                value={newGoal}
                onChange={(e) => setNewGoal(e.target.value)}
                placeholder="Enter goal amount"
                className="text-lg"
              />
            </div>
            <Button onClick={handleUpdateGoal} className="w-full bg-accent hover:bg-accent/90">
              Update Goal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
