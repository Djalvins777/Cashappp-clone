"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  CreditCard,
  Send,
  Gift,
  HelpCircle,
  Phone,
  MapPin,
  Settings,
  Star,
  Scale,
  ChevronRight,
  AlertCircle,
  Lock,
  Info,
  Check,
} from "lucide-react"

export default function BankingApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [userId, setUserId] = useState("")
  const [password, setPassword] = useState("")
  const [showBalance, setShowBalance] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [saveUserId, setSaveUserId] = useState(false)
  const [activeTab, setActiveTab] = useState("accounts")
  const [showBankingDetail, setShowBankingDetail] = useState(false)
  const [showAccountDetail, setShowAccountDetail] = useState(false)
  const [selectedAccount, setSelectedAccount] = useState<string | null>(null)
  const [showAccountDetailsView, setShowAccountDetailsView] = useState(false)
  const [showCardManagement, setShowCardManagement] = useState(false)
  const [showCardSettings, setShowCardSettings] = useState(false)
  const [isCardLocked, setIsCardLocked] = useState(true)
  const [showActivityView, setShowActivityView] = useState(false)
  const [showAdvPlusBankingDetail, setShowAdvPlusBankingDetail] = useState(false)

  const [showTransferOptions, setShowTransferOptions] = useState(false)
  const [showTransferForm, setShowTransferForm] = useState(false)
  const [showFromAccountSelection, setShowFromAccountSelection] = useState(false)
  const [showToAccountSelection, setShowToAccountSelection] = useState(false)
  const [showTransferReview, setShowTransferReview] = useState(false)
  const [showTransferConfirmation, setShowTransferConfirmation] = useState(false)
  const [transferFromAccount, setTransferFromAccount] = useState("")
  const [transferToAccount, setTransferToAccount] = useState("")
  const [transferAmount, setTransferAmount] = useState("")
  const [transferDate, setTransferDate] = useState("Aug 26")

  const [showWireTransfer, setShowWireTransfer] = useState(false)
  const [showWireForm, setShowWireForm] = useState(false)
  const [showWireReview, setShowWireReview] = useState(false)
  const [showWireConfirmation, setShowWireConfirmation] = useState(false)
  const [wireFromAccount, setWireFromAccount] = useState("")
  const [wireRecipientName, setWireRecipientName] = useState("")
  const [wireRecipientBank, setWireRecipientBank] = useState("")
  const [wireRoutingNumber, setWireRoutingNumber] = useState("")
  const [wireAccountNumber, setWireAccountNumber] = useState("")
  const [wireAmount, setWireAmount] = useState("")
  const [wireReference, setWireReference] = useState("")

  const handleLogin = async () => {
    setIsLoading(true)
    setLoginError("")

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (userId === "Biglauren220" && password === "Godislove6#") {
      setIsLoggedIn(true)
      setLoginError("")
    } else {
      setLoginError("Invalid User ID or Password. Please try again.")
    }

    setIsLoading(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setUserId("")
    setPassword("")
    setLoginError("")
    setShowBankingDetail(false)
    setShowAccountDetail(false)
    setSelectedAccount(null)
    setShowAccountDetailsView(false) // Reset account details view on logout
    setShowCardManagement(false) // Reset card management view on logout
    setShowAdvPlusBankingDetail(false)
    setShowTransferOptions(false)
    setShowTransferForm(false)
    setShowFromAccountSelection(false)
    setShowToAccountSelection(false)
    setShowTransferReview(false)
    setShowTransferConfirmation(false)
    // Reset wire transfer states on logout
    setShowWireTransfer(false)
    setShowWireForm(false)
    setShowWireReview(false)
    setShowWireConfirmation(false)
    setWireFromAccount("")
    setWireRecipientName("")
    setWireRecipientBank("")
    setWireRoutingNumber("")
    setWireAccountNumber("")
    setWireAmount("")
    setWireReference("")
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isLoading && userId && password) {
      handleLogin()
    }
  }

  const handleBankingClick = () => {
    setShowBankingDetail(true)
  }

  const handleBackToAccounts = () => {
    setShowBankingDetail(false)
  }

  const handleAccountClick = (accountType: string) => {
    if (accountType === "visa") {
      setShowCardManagement(true)
    } else {
      setSelectedAccount(accountType)
      setShowAccountDetail(true)
    }
  }

  const handleBackToBanking = () => {
    setShowAccountDetail(false)
    setSelectedAccount(null)
  }

  const handleAccountDetailsClick = () => {
    setShowAccountDetailsView(true)
  }

  const handleBackToAccountDetail = () => {
    setShowAccountDetailsView(false)
  }

  const handleBackFromCardManagement = () => {
    setShowCardManagement(false)
  }

  const handleCardSettingsClick = () => {
    setShowCardSettings(true)
  }

  const handleBackFromCardSettings = () => {
    setShowCardSettings(false)
  }

  const handleLockToggle = () => {
    setIsCardLocked(!isCardLocked)
  }

  const handleActivityClick = () => {
    setShowActivityView(true)
  }

  const handleBackFromActivity = () => {
    setShowActivityView(false)
  }

  const handleAdvPlusBankingClick = () => {
    setShowAdvPlusBankingDetail(true)
  }

  const handleBackFromAdvPlusBanking = () => {
    setShowAdvPlusBankingDetail(false)
  }

  const handleTransferClick = () => {
    setShowTransferOptions(true)
  }

  const handleBackFromTransferOptions = () => {
    setShowTransferOptions(false)
  }

  const handleTransferBetweenAccounts = () => {
    setShowTransferOptions(false)
    setShowTransferForm(true)
  }

  const handleBackFromTransferForm = () => {
    setShowTransferForm(false)
    setShowTransferOptions(true)
  }

  const handleFromAccountClick = () => {
    setShowFromAccountSelection(true)
  }

  const handleToAccountClick = () => {
    setShowToAccountSelection(true)
  }

  const handleBackFromFromAccountSelection = () => {
    setShowFromAccountSelection(false)
  }

  const handleBackFromToAccountSelection = () => {
    setShowToAccountSelection(false)
  }

  const handleSelectFromAccount = (account: string) => {
    setTransferFromAccount(account)
    setShowFromAccountSelection(false)
  }

  const handleSelectToAccount = (account: string) => {
    setTransferToAccount(account)
    setShowToAccountSelection(false)
  }

  const handleTransferNext = () => {
    if (transferFromAccount && transferToAccount && transferAmount) {
      setShowTransferForm(false)
      setShowTransferReview(true)
    }
  }

  const handleBackFromTransferReview = () => {
    setShowTransferReview(false)
    setShowTransferForm(true)
  }

  const handleTransferSubmit = () => {
    setShowTransferReview(false)
    setShowTransferConfirmation(true)
  }

  const handleTransferDone = () => {
    setShowTransferConfirmation(false)
    // Reset transfer data
    setTransferFromAccount("")
    setTransferToAccount("")
    setTransferAmount("")
  }

  const handleWireTransferClick = () => {
    setShowTransferOptions(false)
    setShowWireTransfer(true)
  }

  const handleBackFromWireTransfer = () => {
    setShowWireTransfer(false)
    setShowTransferOptions(true)
  }

  const handleWireFromAccountClick = () => {
    setShowFromAccountSelection(true)
  }

  const handleWireNext = () => {
    if (
      wireFromAccount &&
      wireRecipientName &&
      wireRecipientBank &&
      wireRoutingNumber &&
      wireAccountNumber &&
      wireAmount
    ) {
      setShowWireTransfer(false)
      setShowWireReview(true)
    }
  }

  const handleBackFromWireReview = () => {
    setShowWireReview(false)
    setShowWireTransfer(true)
  }

  const handleWireSubmit = () => {
    setShowWireReview(false)
    setShowWireConfirmation(true)
  }

  const handleWireDone = () => {
    setShowWireConfirmation(false)
    // Reset wire data
    setWireFromAccount("")
    setWireRecipientName("")
    setWireRecipientBank("")
    setWireRoutingNumber("")
    setWireAccountNumber("")
    setWireAmount("")
    setWireReference("")
  }

  const handleSelectWireFromAccount = (account: string) => {
    setWireFromAccount(account)
    setShowFromAccountSelection(false)
  }

  const menuItems = [
    { icon: User, label: "Accounts", href: "#" },
    { icon: "bill-pay", label: "Bill Pay", href: "#" },
    { icon: CreditCard, label: "Payments & Invoicing", href: "#" },
    { icon: Send, label: "Pay & Transfer", href: "#" },
    { icon: Send, label: "Transfer | Send", href: "#" },
    { icon: Gift, label: "Special Offers & Deals", href: "#", highlight: true },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
    { icon: Phone, label: "Contact Us", href: "#" },
    { icon: MapPin, label: "Locations", href: "#" },
    { icon: Settings, label: "Profile & Settings", href: "#" },
    { icon: Star, label: "Share Your Feedback", href: "#" },
    { icon: Scale, label: "Legal Info & Disclosures", href: "#" },
  ]

  const creditCards = [
    {
      id: 1,
      name: "Signature Rewards",
      color: "from-red-600 to-red-700",
      offer: "$200 online bonus",
      badge: "NEW OFFER",
      description: "Earn unlimited 1.5% cash back on every purchase",
    },
    {
      id: 2,
      name: "Premium Cash",
      color: "from-gray-600 to-gray-700",
      offer: "$200 online bonus",
      badge: "NEW OFFER",
      description: "Get 3% cash back in your choice category",
    },
    {
      id: 3,
      name: "Travel Rewards",
      color: "from-blue-600 to-blue-700",
      offer: "25,000 online bonus points offer",
      badge: "POPULAR",
      description: "Earn 2x points on travel and dining purchases",
    },
  ]

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f5f5f5" }}>
      {!isLoggedIn ? (
        <div className="min-h-screen">
          {/* Header with BoA logo and FDIC */}
          <header className="bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <img src="/images/boa-logo.jpeg" alt="Bank of America Logo" className="w-10 h-10 object-contain" />
                  <span className="text-2xl font-bold" style={{ color: "#012169" }}>
                    BANK OF AMERICA
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-600 text-lg">Log In</span>
                <div className="text-sm text-gray-600">
                  <span className="font-bold" style={{ color: "#012169" }}>
                    FDIC
                  </span>
                  <span className="ml-1 italic">FDIC-Insured - Bank of America, N.A.</span>
                </div>
              </div>
            </div>
          </header>

          {/* Red banner */}
          <div className="bg-red-600 text-white py-6">
            <div className="max-w-7xl mx-auto px-4">
              <h1 className="text-3xl font-normal">Log In to Online Banking</h1>
            </div>
          </div>

          {/* Login form */}
          <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="max-w-md">
              {loginError && (
                <div className="mb-6 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <span className="text-sm text-red-600">{loginError}</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="userId" className="text-lg font-normal text-gray-700">
                    User ID
                  </label>
                  <Input
                    id="userId"
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full h-12 text-lg border-2 border-blue-400 focus:border-blue-600 focus:ring-0 rounded"
                    disabled={isLoading}
                    required
                  />

                  <div className="flex items-center gap-2 mt-3">
                    <Checkbox
                      id="saveUserId"
                      checked={saveUserId}
                      onCheckedChange={setSaveUserId}
                      className="border-gray-400"
                    />
                    <label htmlFor="saveUserId" className="text-sm text-gray-700 flex items-center gap-1">
                      Save this User ID
                      <Info className="h-4 w-4 text-blue-600" />
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <label htmlFor="password" className="text-lg font-normal text-gray-700">
                    Password
                  </label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-12 text-lg border-2 border-gray-300 focus:border-blue-600 focus:ring-0 rounded"
                    disabled={isLoading}
                    required
                  />
                </div>

                <div className="space-y-4">
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 hover:text-blue-800 text-base"
                    type="button"
                  >
                    Forgot your Password?
                  </Button>

                  <Button
                    type="submit"
                    className="flex items-center gap-2 px-6 py-3 text-white font-medium rounded"
                    style={{ backgroundColor: "#0066cc" }}
                    disabled={isLoading || !userId || !password}
                  >
                    <Lock className="h-4 w-4" />
                    {isLoading ? "Logging In..." : "Log In"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-md mx-auto bg-white min-h-screen">
            {showWireConfirmation ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-600">Wire Transfer Details</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Wire Success Content */}
                <div className="p-6 bg-white">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-6">Your wire transfer is scheduled</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">From</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{wireFromAccount}</div>
                        <div className="text-sm text-gray-500">Available balance $500,000.00</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">To</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{wireRecipientName}</div>
                        <div className="text-sm text-gray-500">{wireRecipientBank}</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-black">${wireAmount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Wire Fee</span>
                      <span className="font-semibold text-black">$30.00</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Reference</span>
                      <span className="font-semibold text-gray-600">{wireReference || "N/A"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Confirmation #</span>
                      <span className="font-semibold text-gray-600">WR{Math.random().toString().slice(2, 8)}</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                    <p className="mb-4">
                      Your wire transfer will be processed within 1-2 business days. International wires may take 3-5
                      business days.
                    </p>
                    <p className="mb-4">
                      Wire transfers are final and cannot be reversed. Please verify all recipient information
                      carefully.
                    </p>
                    <p>For questions about your wire transfer, please contact customer service at 1-800-432-1000.</p>
                  </div>

                  <button
                    onClick={handleWireDone}
                    className="w-full bg-blue-800 text-white py-3 rounded-full font-semibold"
                  >
                    DONE
                  </button>
                </div>
              </>
            ) : showWireReview ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={handleBackFromWireReview} className="p-1">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-gray-600 transform rotate-45"></div>
                      </div>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-600">Review Wire Transfer</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Wire Review Content */}
                <div className="p-6 bg-white">
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">From Account</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{wireFromAccount}</div>
                        <div className="text-sm text-gray-500">Available balance $500,000.00</div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-semibold text-black mb-4">Recipient Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name</span>
                          <span className="font-semibold text-black">{wireRecipientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Bank</span>
                          <span className="font-semibold text-black">{wireRecipientBank}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Routing Number</span>
                          <span className="font-semibold text-black">{wireRoutingNumber}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Number</span>
                          <span className="font-semibold text-black">****{wireAccountNumber.slice(-4)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Amount</span>
                        <span className="font-semibold text-black text-lg">${wireAmount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Wire Fee</span>
                        <span className="font-semibold text-black">$30.00</span>
                      </div>
                      <div className="border-t mt-2 pt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 font-semibold">Total</span>
                          <span className="font-bold text-black text-lg">
                            ${(Number.parseFloat(wireAmount) + 30).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {wireReference && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Reference</span>
                        <span className="font-semibold text-black">{wireReference}</span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 mb-8 leading-relaxed">
                    <p className="mb-4">
                      <strong>Important:</strong> Wire transfers are final and cannot be reversed. Please verify all
                      recipient information is correct.
                    </p>
                    <p className="mb-4">
                      Domestic wires are typically processed within 1-2 business days. International wires may take 3-5
                      business days.
                    </p>
                    <p>A $30.00 wire transfer fee will be charged to your account.</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBackFromWireReview}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleWireSubmit}
                      className="flex-1 bg-blue-800 text-white py-3 rounded-full font-semibold"
                    >
                      SEND WIRE
                    </button>
                  </div>
                </div>
              </>
            ) : showWireTransfer ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={handleBackFromWireTransfer} className="p-1">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-gray-600 transform rotate-45"></div>
                      </div>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-600">Wire Transfer</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Wire Transfer Form */}
                <div className="bg-gray-100 p-4">
                  <div className="space-y-6 mb-6">
                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-black mb-4">From Account</h3>
                      <button
                        onClick={handleWireFromAccountClick}
                        className="w-full flex justify-between items-center p-3 border border-gray-300 rounded"
                      >
                        <span className="text-gray-600">{wireFromAccount || "Choose account"}</span>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-black mb-4">Recipient Information</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Recipient Name</label>
                          <input
                            type="text"
                            placeholder="Enter recipient name"
                            value={wireRecipientName}
                            onChange={(e) => setWireRecipientName(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Recipient Bank</label>
                          <input
                            type="text"
                            placeholder="Enter bank name"
                            value={wireRecipientBank}
                            onChange={(e) => setWireRecipientBank(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Routing Number</label>
                          <input
                            type="text"
                            placeholder="9-digit routing number"
                            value={wireRoutingNumber}
                            onChange={(e) => setWireRoutingNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                            maxLength={9}
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Account Number</label>
                          <input
                            type="text"
                            placeholder="Enter account number"
                            value={wireAccountNumber}
                            onChange={(e) => setWireAccountNumber(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg">
                      <h3 className="font-semibold text-black mb-4">Transfer Details</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Amount</label>
                          <input
                            type="text"
                            placeholder="$0.00"
                            value={wireAmount}
                            onChange={(e) => setWireAmount(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-600 mb-1">Reference (Optional)</label>
                          <input
                            type="text"
                            placeholder="Enter reference or memo"
                            value={wireReference}
                            onChange={(e) => setWireReference(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-8 leading-relaxed">
                    <p className="mb-4">
                      <strong>Wire Transfer Fee:</strong> $30.00 will be charged to your account.
                    </p>
                    <p className="mb-4">
                      Wire transfers are final and cannot be reversed. Please verify all recipient information
                      carefully.
                    </p>
                    <p>
                      Domestic wires typically process within 1-2 business days. International wires may take 3-5
                      business days.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBackFromWireTransfer}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleWireNext}
                      className="flex-1 bg-blue-800 text-white py-3 rounded-full font-semibold"
                      disabled={
                        !wireFromAccount ||
                        !wireRecipientName ||
                        !wireRecipientBank ||
                        !wireRoutingNumber ||
                        !wireAccountNumber ||
                        !wireAmount
                      }
                    >
                      REVIEW
                    </button>
                  </div>
                </div>
              </>
            ) : showTransferConfirmation ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-600">Transfer Details</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Success Content */}
                <div className="p-6 bg-white">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-6">Your transfer is scheduled</h2>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">From</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{transferFromAccount}</div>
                        <div className="text-sm text-gray-500">Available balance $4,000.00</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">To</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{transferToAccount}</div>
                        <div className="text-sm text-gray-500">Available balance $7,680.90</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-black">${transferAmount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Date</span>
                      <span className="font-semibold text-gray-600">{transferDate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Confirmation #</span>
                      <span className="font-semibold text-gray-600">XX000XXXX</span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600 mb-6 leading-relaxed">
                    <p className="mb-4">
                      Please make sure there are sufficient funds in the account from which you are transferring money
                      in order to avoid a possible fee. For details, refer to your account agreement and applicable fee
                      schedule.
                    </p>
                    <p className="mb-4">
                      A note to our credit card customers: To avoid late fees and additional interest charges, please
                      make sure your payment covers at least your Total Minimum Payment Due and is made by the due date.
                      Payments made after your due date, but before the receipt of your next bill, will be applied to
                      the current bill.
                    </p>
                    <p>
                      You can edit or cancel this transfer by 11:59 PM ET the day before this transaction is scheduled.
                    </p>
                  </div>

                  <button
                    onClick={handleTransferDone}
                    className="w-full bg-blue-800 text-white py-3 rounded-full font-semibold"
                  >
                    DONE
                  </button>
                </div>
              </>
            ) : /* Added transfer review screen */
            showTransferReview ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-600">Review Your Transfer</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Review Content */}
                <div className="p-6 bg-white">
                  <div className="space-y-6 mb-8">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">From</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{transferFromAccount}</div>
                        <div className="text-sm text-gray-500">Available balance $4,000.00</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">To</span>
                      <div className="text-right">
                        <div className="font-semibold text-black">{transferToAccount}</div>
                        <div className="text-sm text-gray-500">Available balance $7,680.90</div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Amount</span>
                      <span className="font-semibold text-black">${transferAmount}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Date</span>
                      <span className="font-semibold text-gray-600">{transferDate}</span>
                    </div>
                  </div>

                  <div className="text-center mb-8">
                    <button className="text-blue-600 font-semibold">EDIT</button>
                  </div>

                  <div className="text-sm text-gray-600 mb-8 leading-relaxed">
                    <p className="mb-4">
                      Please make sure there are sufficient funds in the account from which you are transferring money
                      in order to avoid a possible fee. For details, refer to your account agreement and applicable fee
                      schedule.
                    </p>
                    <p className="mb-4">
                      A note to our credit card customers: To avoid late fees and additional interest charges, please
                      make sure your payment covers at least your Total Minimum Payment Due and is made by the due date.
                      Payments made after your due date, but before the receipt of your next bill, will be applied to
                      the current bill.
                    </p>
                    <p className="mb-4">
                      You authorize us to adjust a scheduled payment to an account in order to avoid a payment of
                      disputed transactions on that account.
                    </p>
                    <p>Transaction posting dates are based on Eastern Time.</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBackFromTransferReview}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleTransferSubmit}
                      className="flex-1 bg-blue-800 text-white py-3 rounded-full font-semibold"
                    >
                      TRANSFER
                    </button>
                  </div>
                </div>
              </>
            ) : /* Added "To" account selection screen */
            showToAccountSelection ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-600">Transfer</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Transfer Form Header */}
                <div className="bg-gray-100 p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-gray-600">From</span>
                      <div className="text-blue-600 font-medium">{transferFromAccount}</div>
                      <div className="text-sm text-gray-500">Available balance $4,000.00</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">To</span>
                    <div className="text-blue-600 font-medium">{transferToAccount || "My Savings"}</div>
                    <div className="text-sm text-gray-500">Available balance $7,680.90</div>
                  </div>
                </div>

                <div className="bg-gray-100 p-4">
                  <div className="flex justify-end">
                    <button onClick={handleBackFromToAccountSelection} className="text-blue-600 font-medium">
                      Close
                    </button>
                  </div>
                </div>

                {/* Account Selection */}
                <div className="bg-white p-4">
                  <h2 className="text-lg font-semibold text-black mb-4">To</h2>

                  <div className="mb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">B</span>
                      </div>
                      <span className="font-semibold text-black">BoA Accounts</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() => handleSelectToAccount("My Checking")}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded"
                    >
                      <div className="w-6 h-6 border-2 border-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-black">My Checking</div>
                        <div className="text-sm text-gray-500">Available balance $4,000.00</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectToAccount("My Savings")}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded"
                    >
                      <div className="w-6 h-6 border-2 border-blue-600 rounded-full flex items-center justify-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-black">My Savings</div>
                        <div className="text-sm text-gray-500">Available balance $7,680.90</div>
                      </div>
                    </button>

                    <button
                      onClick={() => handleSelectToAccount("My Cash Rewards Card")}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded"
                    >
                      <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-black">My Cash Rewards Card</div>
                        <div className="text-sm text-gray-500">Available balance $2,500.23</div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : /* Added "From" account selection screen */
            showFromAccountSelection ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={showWireTransfer ? handleBackFromWireTransfer : handleBackFromFromAccountSelection}
                      className="p-1"
                    >
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-gray-600 transform rotate-45"></div>
                      </div>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-600">From</h1>
                    <button className="text-blue-600 font-medium">Close</button>
                  </div>
                </div>

                {/* Account Selection */}
                <div className="p-6 bg-white">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                        <div className="w-4 h-0.5 bg-white"></div>
                        <div className="w-4 h-0.5 bg-white ml-1"></div>
                        <div className="w-4 h-0.5 bg-white ml-1"></div>
                      </div>
                      <span className="font-semibold text-black">BoA Accounts</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() =>
                        showWireTransfer
                          ? handleSelectWireFromAccount("My Checking")
                          : handleSelectFromAccount("My Checking")
                      }
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-black">My Checking</div>
                          <div className="text-sm text-gray-500">Available balance $500,000.00</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        showWireTransfer
                          ? handleSelectWireFromAccount("My Savings")
                          : handleSelectFromAccount("My Savings")
                      }
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-black">My Savings</div>
                          <div className="text-sm text-gray-500">Available balance $7,680.90</div>
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() =>
                        showWireTransfer
                          ? handleSelectWireFromAccount("My Cash Rewards Card")
                          : handleSelectFromAccount("My Cash Rewards Card")
                      }
                      className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 border-2 border-gray-400 rounded-full"></div>
                        <div>
                          <div className="font-semibold text-black">My Cash Rewards Card</div>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </>
            ) : /* Added transfer form screen */
            showTransferForm ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold text-gray-600">Transfer</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Transfer Form */}
                <div className="bg-gray-100 p-4">
                  <div className="space-y-4 mb-6">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">From:</span>
                        <button onClick={handleFromAccountClick} className="text-blue-600 font-medium">
                          {transferFromAccount || "Choose account"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">To:</span>
                        <button onClick={handleToAccountClick} className="text-blue-600 font-medium">
                          {transferToAccount || "Choose account"}
                        </button>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Amount:</span>
                        <input
                          type="text"
                          placeholder="Enter amount"
                          value={transferAmount}
                          onChange={(e) => setTransferAmount(e.target.value)}
                          className="text-blue-600 font-medium bg-transparent border-none outline-none text-right"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Date:</span>
                        <span className="text-blue-600 font-medium">Choose date</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-5 h-5 border border-gray-400 rounded flex items-center justify-center">
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600">Sending a wire? Tap here.</span>
                  </div>

                  <div className="text-sm text-gray-600 mb-8 leading-relaxed">
                    <p className="mb-4">
                      Please make sure there are sufficient funds in the account from which you are transferring money
                      in order to avoid a possible fee. For details, refer to your account agreement and applicable fee
                      schedule.
                    </p>
                    <p className="mb-4">
                      A note to our credit card customers: To avoid late fees and additional interest charges, please
                      make sure your payment covers at least your Total Minimum Payment Due and is made by the due date.
                      Payments made after your due date, but before the receipt of your next bill, will be applied to
                      the current bill.
                    </p>
                    <p className="mb-4">
                      You authorize us to adjust a scheduled payment to an account in order to avoid a payment of
                      disputed transactions on that account.
                    </p>
                    <p>Transaction posting dates are based on Eastern Time.</p>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={handleBackFromTransferForm}
                      className="flex-1 bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold"
                    >
                      CANCEL
                    </button>
                    <button
                      onClick={handleTransferNext}
                      className="flex-1 bg-blue-800 text-white py-3 rounded-full font-semibold"
                      disabled={!transferFromAccount || !transferToAccount || !transferAmount}
                    >
                      NEXT
                    </button>
                  </div>
                </div>
              </>
            ) : /* Added transfer options screen */
            showTransferOptions ? (
              <>
                {/* Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={handleBackFromTransferOptions} className="p-1">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-gray-600 transform rotate-45"></div>
                      </div>
                    </button>
                    <h1 className="text-xl font-semibold text-gray-600">Transfer</h1>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Transfer Options */}
                <div className="p-6 bg-white">
                  <div className="grid grid-cols-2 gap-6">
                    <button
                      onClick={handleTransferBetweenAccounts}
                      className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-12 h-12 border-2 border-blue-600 rounded flex items-center justify-center mb-3">
                        <div className="relative flex items-center">
                          <div className="w-3 h-3 border-l-2 border-t-2 border-blue-600 transform -rotate-45"></div>
                          <div className="w-3 h-3 border-r-2 border-t-2 border-blue-600 transform rotate-45 ml-1"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-600 mb-2">Transfer</h3>
                      <p className="text-sm text-gray-600 text-center">between my accounts</p>
                    </button>

                    <button className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 border-2 border-purple-600 rounded flex items-center justify-center mb-3">
                        <span className="text-purple-600 font-bold text-lg">Z</span>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-600 mb-2">Zelle®</h3>
                      <p className="text-sm text-gray-600 text-center">send or receive</p>
                    </button>

                    <button className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50">
                      <div className="w-12 h-12 border-2 border-blue-600 rounded-full flex items-center justify-center mb-3">
                        <div className="relative flex items-center">
                          <span className="text-blue-600 font-bold text-lg">$</span>
                          <div className="w-2 h-2 border-r-2 border-t-2 border-blue-600 transform rotate-45 ml-1"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-600 mb-2">Pay Bills</h3>
                    </button>

                    <button
                      onClick={handleWireTransferClick}
                      className="flex flex-col items-center p-6 border border-gray-200 rounded-lg hover:bg-gray-50"
                    >
                      <div className="w-12 h-12 border-2 border-blue-600 rounded-full flex items-center justify-center mb-3">
                        <div className="w-6 h-6 border border-blue-600 rounded flex items-center justify-center">
                          <div className="w-3 h-2 border border-blue-600"></div>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-blue-600 mb-2">Wire</h3>
                      <p className="text-sm text-gray-600 text-center">to another bank</p>
                    </button>
                  </div>
                </div>
              </>
            ) : showAdvPlusBankingDetail ? (
              <>
                {/* Header with navigation icons */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm font-medium">9:37</div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="text-sm">5G</div>
                      <div className="w-6 h-3 bg-black rounded-sm"></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <button onClick={handleBackFromAdvPlusBanking} className="p-1">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="w-4 h-4 border-l-2 border-b-2 border-red-600 transform rotate-45"></div>
                      </div>
                    </button>

                    <div className="flex items-center gap-4">
                      <div className="w-6 h-6 border-2 border-red-600 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-xs font-bold">?</span>
                      </div>
                      <div className="w-6 h-6 border border-red-600 rounded flex items-center justify-center">
                        <div className="w-3 h-2 border border-red-600"></div>
                      </div>
                      <div className="w-6 h-6 border border-red-600 rounded flex items-center justify-center">
                        <div className="w-3 h-2 border border-red-600"></div>
                      </div>
                      <div className="w-6 h-6 border border-red-600 rounded flex items-center justify-center">
                        <div className="w-2 h-2 border-r-2 border-t-2 border-red-600 transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Header */}
                <div className="px-4 py-6 bg-white">
                  <div className="flex items-center justify-between mb-6">
                    <h1 className="text-3xl font-bold text-black">ADV PLUS BANKING</h1>
                    <span className="text-blue-600 font-medium">EDIT</span>
                  </div>

                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-black mb-2">$520,223.08</div>
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-gray-600">Available Balance</span>
                      <div className="w-5 h-5 border-2 border-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-bold">i</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions */}
                <div className="px-4 pb-6 bg-gray-100">
                  <h2 className="text-lg font-medium text-gray-600 mb-4">RECENT TRANSACTIONS</h2>

                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Processing</div>
                          <div className="text-lg font-semibold text-black mb-2">Large Deposit</div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            Business revenue deposit - quarterly earnings
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-green-600 font-semibold mb-1">+$500,000.00</div>
                          <div className="text-gray-500 text-sm">$520,223.08</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Jun 15</div>
                          <div className="text-lg font-semibold text-black mb-2">Business Deposit</div>
                          <div className="text-sm text-gray-600 leading-relaxed">ACH CREDIT - BUSINESS REVENUE</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-green-600 font-semibold mb-1">+$125,000.00</div>
                          <div className="text-gray-500 text-sm">-$19,154.11</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Aug 22</div>
                          <div className="text-lg font-semibold text-black mb-2">Investment Transfer</div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            Transfer to Merrill Lynch Investment
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-red-600 font-semibold mb-1">-$75,000.00</div>
                          <div className="text-gray-500 text-sm">-$144,154.11</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Sep 10</div>
                          <div className="text-lg font-semibold text-black mb-2">Corporate Payment</div>
                          <div className="text-sm text-gray-600 leading-relaxed">PAYROLL PROCESSING - QUARTERLY</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-red-600 font-semibold mb-1">-$45,000.00</div>
                          <div className="text-gray-500 text-sm">-$69,154.11</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Oct 5</div>
                          <div className="text-lg font-semibold text-black mb-2">Large Deposit</div>
                          <div className="text-sm text-gray-600 leading-relaxed">CHECK DEPOSIT - BUSINESS CONTRACT</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-green-600 font-semibold mb-1">+$200,000.00</div>
                          <div className="text-gray-500 text-sm">-$24,154.11</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Nov 18</div>
                          <div className="text-lg font-semibold text-black mb-2">Equipment Purchase</div>
                          <div className="text-sm text-gray-600 leading-relaxed">BUSINESS EQUIPMENT - TECHNOLOGY</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-red-600 font-semibold mb-1">-$15,500.00</div>
                          <div className="text-gray-500 text-sm">-$224,154.11</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : showActivityView ? (
              <>
                <div className="bg-gray-100 p-4">
                  <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm mb-4">
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 flex-1">How can we help?</span>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center relative">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        4
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-sm text-gray-600 mb-6">Provided by Bank of America</div>

                  <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-3xl font-bold text-black">ACTIVITY</h1>
                      <button onClick={handleBackFromActivity} className="text-blue-600 font-medium">
                        BACK
                      </button>
                    </div>

                    <div className="text-center mb-6">
                      <div className="text-lg font-semibold text-gray-600 mb-2">Regular Checking - 0873</div>
                      <div className="text-2xl font-bold text-black">$500,000.00</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-600">RECENT TRANSACTIONS</h2>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Float</div>
                          <div className="text-lg font-semibold text-black mb-2">Pending Float</div>
                          <div className="text-sm text-gray-600 leading-relaxed">
                            $323,363.00 total amount assigned 1 or more days float, availability may vary
                          </div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-blue-600 font-semibold mb-1">$323,363.00</div>
                          <div className="text-gray-500 text-sm">-$239,534.73</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Mar 15</div>
                          <div className="text-lg font-semibold text-black mb-2">Direct Deposit</div>
                          <div className="text-sm text-gray-600 leading-relaxed">PAYROLL DEPOSIT - COMPANY ABC</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-green-600 font-semibold mb-1">+$5,250.00</div>
                          <div className="text-gray-500 text-sm">$495,250.00</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Feb 28</div>
                          <div className="text-lg font-semibold text-black mb-2">ATM Withdrawal</div>
                          <div className="text-sm text-gray-600 leading-relaxed">ATM #12345 - MAIN STREET</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-red-600 font-semibold mb-1">-$200.00</div>
                          <div className="text-gray-500 text-sm">$490,000.00</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Jan 20</div>
                          <div className="text-lg font-semibold text-black mb-2">Online Transfer</div>
                          <div className="text-sm text-gray-600 leading-relaxed">Transfer to Savings Account</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-red-600 font-semibold mb-1">-$1,000.00</div>
                          <div className="text-gray-500 text-sm">$490,200.00</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">Apr 10</div>
                          <div className="text-lg font-semibold text-black mb-2">Purchase</div>
                          <div className="text-sm text-gray-600 leading-relaxed">AMAZON.COM - Online Purchase</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-red-600 font-semibold mb-1">-$89.99</div>
                          <div className="text-gray-500 text-sm">$491,200.00</div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="text-sm text-gray-600 mb-1">May 5</div>
                          <div className="text-lg font-semibold text-black mb-2">Check Deposit</div>
                          <div className="text-sm text-gray-600 leading-relaxed">Mobile Check Deposit</div>
                        </div>
                        <div className="text-right ml-4">
                          <div className="text-green-600 font-semibold mb-1">+$1,500.00</div>
                          <div className="text-gray-500 text-sm">$491,289.99</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : showCardSettings ? (
              <>
                {/* Card Settings Header */}
                <div className="bg-red-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={handleBackFromCardSettings} className="p-1">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="w-4 h-4 border-l-2 border-b-2 border-white transform rotate-45"></div>
                        </div>
                      </button>
                      <h1 className="text-xl font-semibold">Card Settings</h1>
                    </div>
                  </div>
                </div>

                {/* Card Settings Content */}
                <div className="p-4 bg-gray-100 min-h-screen">
                  {/* Card pagination dots */}
                  <div className="flex justify-center mb-6 space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-black rounded-full"></div>
                  </div>

                  {/* Primary linked account */}
                  <div className="text-center mb-6">
                    <p className="text-gray-600 mb-2">Primary linked account</p>
                    <p className="text-blue-600 font-medium">Checking</p>
                  </div>

                  {/* Card Display */}
                  <div className="mb-8">
                    <div className="bg-red-600 rounded-lg p-6 text-white shadow-lg relative">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium">Bank of America</span>
                        <span className="text-xs text-gray-300">6113</span>
                      </div>

                      <div className="mb-4">
                        <div className="w-8 h-8 bg-gray-300 rounded mb-4"></div>
                        <span className="text-lg tracking-wider">•••• •••• •••• 9123</span>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-sm font-medium">LAUREN SMITH</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
                          <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-80 -ml-2"></div>
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-4">
                        <span className="text-xs">Debit</span>
                      </div>

                      {/* Lock overlay when card is locked */}
                      {isCardLocked && (
                        <div className="absolute inset-0 bg-black bg-opacity-30 rounded-lg flex items-center justify-center">
                          <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                            <Lock className="w-8 h-8 text-white" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Lock Toggle */}
                  <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-medium text-black">Lock your card</p>
                        {isCardLocked && (
                          <p className="text-sm text-gray-600 mt-1">This card is locked and cannot be used</p>
                        )}
                      </div>
                      <button
                        onClick={handleLockToggle}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          isCardLocked ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            isCardLocked ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Card Options */}
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-blue-600 font-medium text-center">Replace ATM/Debit Card</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-blue-600 font-medium text-center">Report a Lost or Stolen Card</p>
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <p className="text-blue-600 font-medium text-center">Add or Change a Travel Notice</p>
                    </div>
                  </div>
                </div>
              </>
            ) : showCardManagement ? (
              <>
                {/* Card Management Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={handleBackFromCardManagement} className="p-1">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="w-4 h-4 border-l-2 border-b-2 border-gray-600 transform rotate-45"></div>
                        </div>
                      </button>
                      <h1 className="text-xl font-semibold text-black">Manage Cards</h1>
                    </div>
                    <div className="w-6 h-6 border border-gray-400 rounded flex items-center justify-center">
                      <div className="w-3 h-2 border border-gray-400"></div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-right mt-1">Provided by Bank of America</p>
                </div>

                {/* Search Bar */}
                <div className="p-4 bg-gray-100">
                  <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm">
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 flex-1">Hi, I'm Erica. How can I help?</span>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                    </div>
                  </div>
                </div>

                {/* Account Section */}
                <div className="px-4 pb-4 bg-gray-100">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-600 font-medium">Adv Relationship Banking 0210</span>
                    <span className="text-blue-600 font-medium">ALL CARDS</span>
                  </div>
                </div>

                {/* Card Display */}
                <div className="px-4 pb-6 bg-gray-100">
                  <div className="relative">
                    <div className="bg-red-600 rounded-lg p-6 text-white shadow-lg">
                      <div className="flex justify-between items-start mb-4">
                        <span className="text-sm font-medium">BANK OF AMERICA</span>
                        <span className="text-sm font-medium">DEBIT CARD</span>
                      </div>

                      <div className="mb-4">
                        <span className="text-lg tracking-wider">•••• •••• •••• 6113</span>
                      </div>

                      <div className="flex justify-between items-end">
                        <div>
                          <span className="text-sm font-medium">LAUREN SMITH</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
                          <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-80 -ml-2"></div>
                        </div>
                      </div>

                      <div className="absolute bottom-4 right-4">
                        <span className="text-xs">debit</span>
                      </div>
                    </div>

                    {/* Card pagination dots */}
                    <div className="flex justify-center mt-4 space-x-2">
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* Card Management Options */}
                <div className="px-4 pb-6 bg-gray-100">
                  <div className="flex justify-center space-x-8">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={handleCardSettingsClick}
                        className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2"
                      >
                        <Lock className="w-6 h-6 text-white" />
                      </button>
                      <span className="text-sm text-gray-700">Lock</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                        <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center">
                          <div className="w-3 h-2 border border-white"></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">Replace</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                        <div className="w-6 h-6 border-2 border-white rounded flex items-center justify-center">
                          <div className="w-2 h-2 border-b-2 border-white transform rotate-45"></div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-700">Set Limits</span>
                    </div>
                  </div>
                </div>

                {/* All Card Options */}
                <div className="px-4 pb-4 bg-gray-100">
                  <div className="text-center">
                    <span className="text-blue-600 font-medium">ALL CARD OPTIONS</span>
                  </div>
                </div>

                {/* Digital Wallets Section */}
                <div className="px-4 pb-6 bg-gray-100">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-gray-700 mb-2">Add your card and manage where it's stored</p>
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                              <div className="w-3 h-2 bg-white"></div>
                            </div>
                          </div>
                          <div className="flex space-x-2">
                            <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                            <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                            <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 text-center">
                      <span className="text-blue-600 font-medium">DIGITAL WALLETS</span>
                    </div>
                  </div>
                </div>
              </>
            ) : showAccountDetailsView ? (
              <>
                {/* Account Details Header */}
                <div className="bg-white p-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button onClick={handleBackToAccountDetail} className="p-1">
                        <div className="w-6 h-6 flex items-center justify-center">
                          <div className="w-4 h-4 border-l-2 border-b-2 border-gray-600 transform rotate-45"></div>
                        </div>
                      </button>
                      <h1 className="text-xl font-semibold text-black">Account Details</h1>
                    </div>
                    <span className="text-blue-600 font-medium">EDIT</span>
                  </div>
                </div>

                {/* Account Details Content */}
                <div className="p-4 bg-gray-50">
                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-black mb-6">Regular Checking</h2>

                    <div className="space-y-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">Account number</p>
                        <p className="text-lg font-semibold text-black">626162610873</p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-600 mb-1">Routing number</p>
                        <p className="text-lg font-semibold text-black">026009593</p>
                      </div>

                      <div className="pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-1">Account opened</p>
                        <p className="text-lg font-semibold text-black">March 2019</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : showAccountDetail ? (
              <>
                {/* Account detail header */}
                <div className="bg-gray-100 p-4">
                  <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm mb-4">
                    <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                      <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
                    </div>
                    <span className="text-gray-500 flex-1">How can we help?</span>
                    <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center relative">
                      <div className="w-4 h-0.5 bg-white"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="w-4 h-0.5 bg-white ml-1"></div>
                      <div className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        4
                      </div>
                    </div>
                  </div>

                  <div className="text-right text-sm text-gray-600 mb-6">Provided by Bank of America</div>

                  <div className="bg-white rounded-lg p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                      <h1 className="text-3xl font-bold text-black">CHECKING</h1>
                      <span className="text-blue-600 font-medium">EDIT</span>
                    </div>

                    <div className="text-center mb-6">
                      {/* Updated checking account balance to $500,000.00 */}
                      <div className="text-4xl font-bold text-black mb-2">$500,000.00</div>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-gray-600">Available balance</span>
                        <div className="w-5 h-5 border-2 border-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">i</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <button
                        className="w-full flex items-center justify-between hover:bg-gray-50 p-2 rounded"
                        onClick={handleAccountDetailsClick}
                      >
                        <span className="text-lg font-medium text-gray-700">Account & Routing #</span>
                        <div className="w-4 h-4 border-l-2 border-b-2 border-gray-400 transform rotate-45"></div>
                      </button>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h2 className="text-lg font-medium text-gray-600 mb-4">RECENT TRANSACTIONS</h2>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Float</div>
                            <div className="text-lg font-semibold text-black mb-2">Pending Float</div>
                            <div className="text-sm text-gray-600 leading-relaxed">
                              $323,363.00 total amount assigned 1 or more days float, availability may vary
                            </div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-blue-600 font-semibold mb-1">$323,363.00</div>
                            <div className="text-gray-500 text-sm">-$239,534.73</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Mar 15</div>
                            <div className="text-lg font-semibold text-black mb-2">Direct Deposit</div>
                            <div className="text-sm text-gray-600 leading-relaxed">PAYROLL DEPOSIT - COMPANY ABC</div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-green-600 font-semibold mb-1">+$5,250.00</div>
                            <div className="text-gray-500 text-sm">$495,250.00</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Feb 28</div>
                            <div className="text-lg font-semibold text-black mb-2">ATM Withdrawal</div>
                            <div className="text-sm text-gray-600 leading-relaxed">ATM #12345 - MAIN STREET</div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-red-600 font-semibold mb-1">-$200.00</div>
                            <div className="text-gray-500 text-sm">$490,000.00</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Jan 20</div>
                            <div className="text-lg font-semibold text-black mb-2">Online Transfer</div>
                            <div className="text-sm text-gray-600 leading-relaxed">Transfer to Savings Account</div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-red-600 font-semibold mb-1">-$1,000.00</div>
                            <div className="text-gray-500 text-sm">$490,200.00</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">Apr 10</div>
                            <div className="text-lg font-semibold text-black mb-2">Purchase</div>
                            <div className="text-sm text-gray-600 leading-relaxed">AMAZON.COM - Online Purchase</div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-red-600 font-semibold mb-1">-$89.99</div>
                            <div className="text-gray-500 text-sm">$491,200.00</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 shadow-sm">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="text-sm text-gray-600 mb-1">May 5</div>
                            <div className="text-lg font-semibold text-black mb-2">Check Deposit</div>
                            <div className="text-sm text-gray-600 leading-relaxed">Mobile Check Deposit</div>
                          </div>
                          <div className="text-right ml-4">
                            <div className="text-green-600 font-semibold mb-1">+$1,500.00</div>
                            <div className="text-gray-500 text-sm">$491,289.99</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back button */}
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={handleBackToBanking}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium"
                  >
                    Back to Banking
                  </button>
                </div>
              </>
            ) : showBankingDetail ? (
              <>
                {/* Red header for banking detail */}
                <div className="bg-red-600 text-white p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                        <div className="w-full h-0.5 bg-white"></div>
                        <div className="w-full h-0.5 bg-white"></div>
                        <div className="w-full h-0.5 bg-white"></div>
                      </div>
                    </div>

                    <h1 className="text-xl font-medium">Accounts</h1>

                    <div className="flex items-center gap-2" onClick={handleLogout}>
                      <Lock className="w-4 h-4" />
                      <span className="font-medium">Sign Out</span>
                    </div>
                  </div>
                </div>

                {/* Secondary navigation */}
                <div className="bg-amber-800 text-white">
                  <div className="flex">
                    <button className="flex-1 flex flex-col items-center py-3 bg-amber-700">
                      <div className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center mb-1">
                        <span className="text-white text-xs font-bold">$</span>
                      </div>
                      <span className="text-xs">Accounts</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center py-3">
                      <div className="w-6 h-6 flex items-center justify-center mb-1">
                        <img src="/images/bill-pay-icon.jpeg" alt="Bill Pay" className="w-5 h-5 object-contain" />
                      </div>
                      <span className="text-xs">Bill Pay</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center py-3" onClick={handleTransferClick}>
                      <div className="w-6 h-6 flex items-center justify-center mb-1">
                        <div className="relative flex items-center">
                          <div className="w-2 h-2 border-l-2 border-t-2 border-white transform -rotate-45"></div>
                          <div className="mx-1 text-white font-bold text-xs">$</div>
                          <div className="w-2 h-2 border-r-2 border-t-2 border-white transform rotate-45"></div>
                        </div>
                      </div>
                      <span className="text-xs">Transfers</span>
                    </button>
                    <button className="flex-1 flex flex-col items-center py-3">
                      <div className="w-6 h-6 flex items-center justify-center mb-1">
                        <div className="w-4 h-4 border-2 border-white rounded flex items-center justify-center">
                          <div className="w-2 h-2 border-b-2 border-white transform rotate-45"></div>
                        </div>
                      </div>
                      <span className="text-xs">Deposits</span>
                    </button>
                  </div>
                </div>

                {/* Banking detail content */}
                <div className="p-4 bg-gray-100">
                  <h1 className="text-2xl font-semibold text-gray-800 mb-6">Hello, Lauren</h1>

                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img src="/images/boa-logo.jpeg" alt="Bank of America Logo" className="w-8 h-8 object-contain" />
                      <h2 className="text-lg font-semibold text-gray-700">Bank Accounts</h2>
                    </div>

                    <div className="space-y-4">
                      <div
                        className="bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleAccountClick("checking")}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm">Regular Checking - 0873</p>
                            {/* Updated Regular Checking balance to $500,000.00 */}
                            <p className="text-2xl font-bold text-black">$500,000.00</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div
                        className="bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleAccountClick("savings")}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm">Savings - 2543</p>
                            <p className="text-2xl font-bold text-black">$20,123.08</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div
                        className="bg-white border border-gray-300 rounded p-4 cursor-pointer hover:bg-gray-50"
                        onClick={() => handleAccountClick("visa")}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-gray-600 text-sm">Platinum Visa - 9999</p>
                            <p className="text-2xl font-bold text-black">$100.00</p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="bg-white border border-gray-300 rounded p-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-lg font-bold">+</span>
                          </div>
                          <span className="text-blue-600 font-medium">Open a New Account</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* SafeBalance Banking™ Accounts */}
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <img src="/images/boa-logo.jpeg" alt="Bank of America Logo" className="w-8 h-8 object-contain" />
                      <h2 className="text-lg font-semibold text-gray-700">SafeBalance Banking™ Accounts</h2>
                    </div>
                  </div>
                </div>

                {/* Back button */}
                <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2">
                  <button
                    onClick={handleBackToAccounts}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium"
                  >
                    Back to Accounts
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Existing accounts/dashboard view */}
                {activeTab === "dashboard" ? (
                  <div className="bg-red-600 text-white p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                          <div className="w-3 h-3 border border-red-600 rounded-full"></div>
                        </div>
                        <span className="font-medium">Alerts</span>
                      </div>

                      <button className="bg-white bg-opacity-20 text-white px-4 py-1 rounded-full text-sm">Help</button>

                      <div className="flex items-center gap-2" onClick={handleLogout}>
                        <Lock className="w-4 h-4" />
                        <span className="font-medium">Sign Out</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
                    <div className="flex flex-col items-center">
                      <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                        <div className="w-full h-0.5 bg-gray-600"></div>
                        <div className="w-full h-0.5 bg-gray-600"></div>
                        <div className="w-full h-0.5 bg-gray-600"></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Menu</span>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="w-6 h-6 border border-gray-400 rounded"></div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-1">Inbox</span>
                      </div>

                      <div className="flex flex-col items-center">
                        <div className="relative">
                          <div className="w-6 h-6 border border-gray-400 rounded flex items-center justify-center">
                            <div className="w-3 h-2 border border-gray-400"></div>
                          </div>
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                        </div>
                        <span className="text-xs text-gray-600 mt-1">Products</span>
                      </div>

                      <div className="flex flex-col items-center" onClick={handleLogout}>
                        <ChevronRight className="w-6 h-6 text-gray-600" />
                        <span className="text-xs text-gray-600 mt-1">Log out</span>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex border-b border-gray-200 bg-white">
                  <button
                    className={`flex-1 text-center py-3 border-b-2 ${
                      activeTab === "accounts" ? "border-red-600" : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("accounts")}
                  >
                    <span className={activeTab === "accounts" ? "text-red-600 font-medium" : "text-gray-600"}>
                      Accounts
                    </span>
                  </button>
                  <button
                    className={`flex-1 text-center py-3 border-b-2 ${
                      activeTab === "dashboard" ? "border-blue-600" : "border-transparent"
                    }`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <span
                      className={
                        activeTab === "dashboard"
                          ? "text-white bg-blue-600 px-4 py-1 rounded font-medium"
                          : "text-gray-600"
                      }
                    >
                      My Dashboard
                    </span>
                  </button>
                </div>

                {activeTab === "accounts" ? (
                  <>
                    <div className="p-4 bg-gray-100">
                      <div className="flex items-center bg-white rounded-lg px-4 py-3 shadow-sm">
                        <div className="w-5 h-5 rounded-full border border-gray-400 flex items-center justify-center mr-3">
                          <div className="w-2 h-2 border border-gray-400 rounded-full"></div>
                        </div>
                        <span className="text-gray-500 flex-1">How can we help?</span>
                        <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                          <div className="w-4 h-0.5 bg-white"></div>
                          <div className="w-4 h-0.5 bg-white ml-1"></div>
                          <div className="w-4 h-0.5 bg-white ml-1"></div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-white border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div>
                          <h1 className="text-xl font-semibold text-black">Hello, Lauren</h1>
                          <p className="text-sm text-gray-600">Preferred Rewards Platinum</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="p-4 bg-white border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-black">My Rewards</h2>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="p-4 bg-white border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <div className="w-5 h-4 bg-white rounded-sm"></div>
                          </div>
                          <div>
                            <h2 className="text-lg font-semibold text-black">John Greenfield</h2>
                            <p className="text-sm text-gray-600">Merrill Advisor</p>
                          </div>
                        </div>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>

                    <div className="p-4 space-y-4 bg-gray-50">
                      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"></div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-black">Net Worth¹</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-black">$1,949,210.00</span>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>

                      <div
                        className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
                        onClick={handleBankingClick}
                      >
                        <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"></div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-black">Banking</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            {/* Updated Banking total to $520,223.08 (sum of all accounts) */}
                            <span className="text-xl font-bold text-black">$520,223.08</span>
                            <div className="w-4 h-4 border-l-2 border-b-2 border-gray-400 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"></div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-black">Credit Cards</h3>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-black">$16,531.00</span>
                            <div className="w-4 h-4 border-l-2 border-b-2 border-gray-400 transform rotate-45"></div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-red-600 via-red-500 to-blue-600"></div>
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h3 className="text-lg font-semibold text-black">Investments</h3>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                <div className="w-4 h-3 bg-white rounded-sm"></div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blue-600">MERRILL</p>
                                <p className="text-lg font-bold text-blue-600">$1,922,350.00</p>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                <div className="w-4 h-3 bg-white rounded-sm"></div>
                              </div>
                              <div>
                                <p className="text-sm font-medium text-blue-600">MERRILL</p>
                                <p className="text-lg font-bold text-blue-600">$1,922,350.00</p>
                              </div>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="bg-gray-50 min-h-screen">
                    <div className="p-4 grid grid-cols-2 gap-4">
                      <div
                        className="bg-white rounded-lg shadow-sm p-4 cursor-pointer hover:bg-gray-50"
                        onClick={handleAdvPlusBankingClick}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">$</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Adv Plus Banking...7022</p>
                        <p className="text-2xl font-bold text-black">-$869,154.11</p>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                            <span className="text-white text-xs font-bold">FICO</span>
                          </div>
                          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">My FICO® Score</p>
                        <p className="text-sm text-blue-600 font-medium">Score Unavailable</p>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">$</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">BankAmericard Cash...6268</p>
                        <p className="text-2xl font-bold text-black">$16,531.00</p>
                        <p className="text-xs text-gray-500">Available Rewards</p>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 rounded-full border-4 border-green-500 relative">
                            <div className="absolute inset-1 bg-orange-400 rounded-full"></div>
                            <div className="absolute inset-2 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Spending & Budgeting</p>
                        <p className="text-sm text-blue-600 font-medium">Set Your Budget</p>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-green-700 rounded-full flex items-center justify-center">
                            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                              <div className="w-4 h-4 bg-green-700 rounded-full"></div>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">BankAmeriDeals®</p>
                        <p className="text-2xl font-bold text-black">5%</p>
                        <p className="text-sm text-gray-600">Cash Back</p>
                        <p className="text-xs text-gray-500">9 Days Left</p>
                        <div className="mt-2">
                          <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-lg font-bold">+</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg shadow-sm p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center relative">
                            <div className="w-4 h-4 bg-white rounded-full"></div>
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-1">Alerts</p>
                        <p className="text-sm text-blue-600 font-medium">Enroll now</p>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!showBankingDetail &&
              !showActivityView &&
              !showTransferOptions &&
              !showTransferForm &&
              !showFromAccountSelection &&
              !showToAccountSelection &&
              !showTransferReview &&
              !showTransferConfirmation &&
              !showWireTransfer &&
              !showWireForm &&
              !showWireReview &&
              !showWireConfirmation && (
                <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200">
                  <div className="flex items-center justify-around py-2">
                    <div className="flex flex-col items-center py-2">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center">
                        <span className="text-blue-600 text-xs font-bold">$</span>
                      </div>
                      <span className="text-xs text-blue-600 font-medium mt-1">Accounts</span>
                    </div>

                    <button className="flex flex-col items-center py-2" onClick={handleTransferClick}>
                      <div className="w-6 h-6 flex items-center justify-center">
                        <div className="relative flex items-center">
                          <div className="w-2 h-2 border-l-2 border-t-2 border-gray-400 transform -rotate-45"></div>
                          <div className="mx-1 text-gray-400 font-bold text-sm">$</div>
                          <div className="w-2 h-2 border-r-2 border-t-2 border-gray-400 transform rotate-45"></div>
                        </div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Transfer | Send</span>
                    </button>

                    <div className="flex flex-col items-center py-2">
                      <div className="w-6 h-6 border border-gray-400 rounded flex items-center justify-center">
                        <div className="w-3 h-2 border border-gray-400"></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Bill Pay</span>
                    </div>

                    <div className="flex flex-col items-center py-2">
                      <div className="w-6 h-6 flex items-center justify-center">
                        <img
                          src="/images/deposit-checks-icon.jpeg"
                          alt="Deposit Checks"
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Deposit Checks</span>
                    </div>

                    <button className="flex flex-col items-center py-2" onClick={handleActivityClick}>
                      <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center">
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1">Activity</span>
                    </button>
                  </div>
                </div>
              )}

            <div className="h-20"></div>
          </div>
        </div>
      )}
    </div>
  )
}
