import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const transactions = [
  {
    id: 1,
    name: "Amazon Purchase",
    date: "Oct 12, 2025",
    amount: -89.99,
    category: "Shopping",
  },
  {
    id: 2,
    name: "Salary Deposit",
    date: "Oct 10, 2025",
    amount: 5420.0,
    category: "Income",
  },
  {
    id: 3,
    name: "Electric Bill",
    date: "Oct 8, 2025",
    amount: -124.5,
    category: "Utilities",
  },
  {
    id: 4,
    name: "Coffee Shop",
    date: "Oct 7, 2025",
    amount: -12.5,
    category: "Food & Drink",
  },
  {
    id: 5,
    name: "Transfer from Savings",
    date: "Oct 5, 2025",
    amount: 500.0,
    category: "Transfer",
  },
]

export function RecentTransactions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Recent Transactions</CardTitle>
          <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">View All</button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.amount > 0 ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {transaction.amount > 0 ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium">{transaction.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {transaction.category} • {transaction.date}
                  </p>
                </div>
              </div>
              <p className={`font-semibold ${transaction.amount > 0 ? "text-accent" : "text-foreground"}`}>
                {transaction.amount > 0 ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
