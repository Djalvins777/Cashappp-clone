"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, ArrowLeftRight, CreditCard, PiggyBank } from "lucide-react"
import { useRouter } from "next/navigation"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      icon: Send,
      label: "Send Money",
      color: "bg-primary text-primary-foreground",
      path: "/transfers?type=send",
    },
    {
      icon: ArrowLeftRight,
      label: "Transfer",
      color: "bg-accent text-accent-foreground",
      path: "/transfers",
    },
    {
      icon: CreditCard,
      label: "Pay Bills",
      color: "bg-chart-2 text-white",
      path: "/bill-pay",
    },
    {
      icon: PiggyBank,
      label: "Save",
      color: "bg-chart-3 text-white",
      path: "/savings",
    },
  ]

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              onClick={() => router.push(action.path)}
              variant="outline"
              className="h-auto flex-col gap-3 py-6 hover:shadow-md transition-all bg-transparent hover:scale-[1.02] active:scale-[0.98]"
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${action.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-sm font-medium text-foreground">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
