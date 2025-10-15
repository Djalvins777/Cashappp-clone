import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AccountCardProps {
  type: string
  accountNumber: string
  balance: number
  change: number
}

export function AccountCard({ type, accountNumber, balance, change }: AccountCardProps) {
  const isPositive = change >= 0

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium text-muted-foreground">{type}</CardTitle>
          <span className="text-xs text-muted-foreground">{accountNumber}</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-3xl font-bold">${balance.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${isPositive ? "text-accent" : "text-destructive"}`}>
              {isPositive ? "+" : ""}
              {change}%
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
