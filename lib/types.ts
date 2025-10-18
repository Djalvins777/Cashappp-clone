export interface Profile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  created_at: string
  updated_at: string
  email_verified: boolean
  last_login: string | null
}

export interface VerificationCode {
  id: string
  user_id: string
  code: string
  code_type: "login" | "email_verification"
  expires_at: string
  used: boolean
  created_at: string
}

export interface GrantOpportunity {
  id: string
  title: string
  agency: string
  amount: string
  deadline: string
  status: string
  description: string
  category: string
}

export interface Application {
  id: string
  user_id: string
  grant_id: string
  status: "draft" | "submitted" | "under_review" | "approved" | "rejected"
  submitted_date: string | null
  created_at: string
  updated_at: string
  certificate_number?: string
  approval_date?: string | null
}

export interface GrantCertificate {
  recipientName: string
  recipientAddress: string
  grantTitle: string
  grantAmount: string
  certificateNumber: string
  approvalDate: string
  grantCategory: string
}
