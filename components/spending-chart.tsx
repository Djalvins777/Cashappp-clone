"use client"

import { Card } from "@/components/ui/card"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export function SpendingChart() {
  const data = [
    { month: "Jan", spending: 2400, income: 4000 },
    { month: "Feb", spending: 1398, income: 3800 },
    { month: "Mar", spending: 3200, income: 4200 },
    { month: "Apr", spending: 2780, income: 4100 },
    { month: "May", spending: 1890, income: 3900 },
    { month: "Jun", spending: 2390, income: 4300 },
    { month: "Jul", spending: 3490, income: 4500 },
  ]

  const chartConfig = {
    spending: {
      label: "Spending",
      color: "hsl(var(--chart-4))",
    },
    income: {
      label: "Income",
      color: "hsl(var(--chart-1))",
    },
  }

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">Income vs Spending</h2>
        <p className="text-sm text-muted-foreground">Your financial activity over the last 7 months</p>
      </div>

      <ChartContainer config={chartConfig} className="h-[300px] w-full">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis dataKey="month" className="text-xs" tickLine={false} axisLine={false} />
          <YAxis className="text-xs" tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area
            type="monotone"
            dataKey="income"
            stackId="1"
            stroke="hsl(var(--chart-1))"
            fill="hsl(var(--chart-1))"
            fillOpacity={0.2}
          />
          <Area
            type="monotone"
            dataKey="spending"
            stackId="2"
            stroke="hsl(var(--chart-4))"
            fill="hsl(var(--chart-4))"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ChartContainer>
    </Card>
  )
}
