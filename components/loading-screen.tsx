"use client"

import { useEffect, useState } from "react"

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      onComplete()
    }, 2000) // Show for 2 seconds

    return () => clearTimeout(timer)
  }, [onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-3xl bg-accent flex items-center justify-center shadow-lg">
          <span className="text-7xl font-bold text-white">$</span>
        </div>
        <h1 className="text-3xl font-bold">Cash App</h1>
      </div>
    </div>
  )
}
