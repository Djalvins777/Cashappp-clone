"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth"
import { Header } from "@/components/header"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ArrowLeftRight, Send, Building2 } from "lucide-react"
import { PinVerificationDialog } from "@/components/pin-verification-dialog"

export default function TransfersPage() {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const [fromAccount, setFromAccount] = useState("")
  const [toAccount, setToAccount] = useState("")
  const [amount, setAmount] = useState("")
  const [memo, setMemo] = useState("")

  const [zelleEmail, setZelleEmail] = useState("")
  const [zellePhone, setZellePhone] = useState("")
  const [zelleAmount, setZelleAmount] = useState("")
  const [zelleMemo, setZelleMemo] = useState("")

  const [wireRecipientName, setWireRecipientName] = useState("")
  const [wireAccountNumber, setWireAccountNumber] = useState("")
  const [wireRoutingNumber, setWireRoutingNumber] = useState("")
  const [wireBankName, setWireBankName] = useState("")
  const [wireAmount, setWireAmount] = useState("")
  const [wireReference, setWireReference] = useState("")

  const [showPinDialog, setShowPinDialog] = useState(false)
  const [pendingTransfer, setPendingTransfer] = useState<{
    type: "internal" | "zelle" | "wire"
    data: any
  } | null>(null)

  const CORRECT_PIN = "1234"

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  const handleTransfer = () => {
    setPendingTransfer({
      type: "internal",
      data: { fromAccount, toAccount, amount, memo },
    })
    setShowPinDialog(true)
  }

  const handleZelleTransfer = () => {
    const recipient = zelleEmail || zellePhone
    setPendingTransfer({
      type: "zelle",
      data: { recipient, amount: zelleAmount, memo: zelleMemo },
    })
    setShowPinDialog(true)
  }

  const handleWireTransfer = () => {
    setPendingTransfer({
      type: "wire",
      data: {
        recipientName: wireRecipientName,
        bankName: wireBankName,
        routingNumber: wireRoutingNumber,
        accountNumber: wireAccountNumber,
        amount: wireAmount,
        reference: wireReference,
      },
    })
    setShowPinDialog(true)
  }

  const handlePinVerify = (pin: string) => {
    if (pin === CORRECT_PIN) {
      setShowPinDialog(false)

      if (pendingTransfer) {
        switch (pendingTransfer.type) {
          case "internal":
            alert(
              `Transfer of $${pendingTransfer.data.amount} from ${pendingTransfer.data.fromAccount} to ${pendingTransfer.data.toAccount} completed successfully!`,
            )
            setFromAccount("")
            setToAccount("")
            setAmount("")
            setMemo("")
            break

          case "zelle":
            alert(
              `Zelle transfer of $${pendingTransfer.data.amount} to ${pendingTransfer.data.recipient} completed successfully!`,
            )
            setZelleEmail("")
            setZellePhone("")
            setZelleAmount("")
            setZelleMemo("")
            break

          case "wire":
            alert(
              `Wire transfer of $${pendingTransfer.data.amount} to ${pendingTransfer.data.recipientName} at ${pendingTransfer.data.bankName} completed successfully!`,
            )
            setWireRecipientName("")
            setWireBankName("")
            setWireRoutingNumber("")
            setWireAccountNumber("")
            setWireAmount("")
            setWireReference("")
            break
        }

        setPendingTransfer(null)
      }
    } else {
      alert("Incorrect PIN. Please try again.")
    }
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Tabs defaultValue="internal" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="internal">Internal Transfer</TabsTrigger>
            <TabsTrigger value="zelle">Zelle</TabsTrigger>
            <TabsTrigger value="wire">Wire Transfer</TabsTrigger>
          </TabsList>

          {/* Internal Transfer */}
          <TabsContent value="internal">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <ArrowLeftRight className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Transfer Money</h1>
                  <p className="text-muted-foreground">Move funds between your accounts</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="from-account">From Account</Label>
                  <Select value={fromAccount} onValueChange={setFromAccount}>
                    <SelectTrigger id="from-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Regular Checking (••••2626) - $1,356,091.00</SelectItem>
                      <SelectItem value="savings">Regular Savings (••••7231) - $3,887,265.00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="to-account">To Account</Label>
                  <Select value={toAccount} onValueChange={setToAccount}>
                    <SelectTrigger id="to-account">
                      <SelectValue placeholder="Select account" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Regular Checking (••••2626)</SelectItem>
                      <SelectItem value="savings">Regular Savings (••••7231)</SelectItem>
                      <SelectItem value="external">External Account</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="memo">Memo (Optional)</Label>
                  <Input
                    id="memo"
                    placeholder="What's this transfer for?"
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button onClick={handleTransfer} className="flex-1" disabled={!fromAccount || !toAccount || !amount}>
                    Transfer Now
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="zelle">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-[#6d1ed4] flex items-center justify-center">
                  <Send className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Send Money with Zelle</h1>
                  <p className="text-muted-foreground">Fast, safe, and easy way to send money</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="zelle-from">From Account</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger id="zelle-from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Regular Checking (••••2626) - $1,356,091.00</SelectItem>
                      <SelectItem value="savings">Regular Savings (••••7231) - $3,887,265.00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zelle-email">Recipient Email</Label>
                  <Input
                    id="zelle-email"
                    type="email"
                    placeholder="recipient@example.com"
                    value={zelleEmail}
                    onChange={(e) => setZelleEmail(e.target.value)}
                  />
                </div>

                <div className="text-center text-sm text-muted-foreground">or</div>

                <div className="space-y-2">
                  <Label htmlFor="zelle-phone">Recipient Phone Number</Label>
                  <Input
                    id="zelle-phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={zellePhone}
                    onChange={(e) => setZellePhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zelle-amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="zelle-amount"
                      type="number"
                      placeholder="0.00"
                      value={zelleAmount}
                      onChange={(e) => setZelleAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="zelle-memo">Message (Optional)</Label>
                  <Input
                    id="zelle-memo"
                    placeholder="What's this for?"
                    value={zelleMemo}
                    onChange={(e) => setZelleMemo(e.target.value)}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleZelleTransfer}
                    className="flex-1 bg-[#6d1ed4] hover:bg-[#5a18b0]"
                    disabled={(!zelleEmail && !zellePhone) || !zelleAmount}
                  >
                    Send with Zelle
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="wire">
            <Card className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Wire Transfer</h1>
                  <p className="text-muted-foreground">Send money domestically or internationally</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="wire-from">From Account</Label>
                  <Select defaultValue="checking">
                    <SelectTrigger id="wire-from">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checking">Regular Checking (••••2626) - $1,356,091.00</SelectItem>
                      <SelectItem value="savings">Regular Savings (••••7231) - $3,887,265.00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wire-recipient">Recipient Name</Label>
                  <Input
                    id="wire-recipient"
                    placeholder="Full name of recipient"
                    value={wireRecipientName}
                    onChange={(e) => setWireRecipientName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wire-bank">Bank Name</Label>
                  <Input
                    id="wire-bank"
                    placeholder="Recipient's bank name"
                    value={wireBankName}
                    onChange={(e) => setWireBankName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="wire-routing">Routing Number</Label>
                    <Input
                      id="wire-routing"
                      placeholder="9 digits"
                      value={wireRoutingNumber}
                      onChange={(e) => setWireRoutingNumber(e.target.value)}
                      maxLength={9}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="wire-account">Account Number</Label>
                    <Input
                      id="wire-account"
                      placeholder="Recipient's account"
                      value={wireAccountNumber}
                      onChange={(e) => setWireAccountNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wire-amount">Amount</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input
                      id="wire-amount"
                      type="number"
                      placeholder="0.00"
                      value={wireAmount}
                      onChange={(e) => setWireAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wire-reference">Reference/Memo (Optional)</Label>
                  <Input
                    id="wire-reference"
                    placeholder="Payment reference"
                    value={wireReference}
                    onChange={(e) => setWireReference(e.target.value)}
                  />
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> Wire transfers typically have a $25-$30 fee and may take 1-2 business days to
                    process.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleWireTransfer}
                    className="flex-1"
                    disabled={
                      !wireRecipientName || !wireBankName || !wireRoutingNumber || !wireAccountNumber || !wireAmount
                    }
                  >
                    Send Wire Transfer
                  </Button>
                  <Button variant="outline" onClick={() => router.push("/")} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <PinVerificationDialog
        open={showPinDialog}
        onOpenChange={setShowPinDialog}
        onVerify={handlePinVerify}
        title="Verify Your PIN"
        description="Please enter your 4-digit PIN to authorize this transfer"
      />
    </div>
  )
}
