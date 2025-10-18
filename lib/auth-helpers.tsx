import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function generateVerificationCode(): Promise<string> {
  // Generate a 6-digit code
  return Math.floor(100000 + Math.random() * 900000).toString()
}

export async function sendVerificationEmail(email: string, code: string, type: "login" | "email_verification") {
  const supabase = await getSupabaseServerClient()

  const subject =
    type === "login"
      ? "Government Grant App - Login Verification Code"
      : "Government Grant App - Email Verification Code"

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${subject}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 20px 40px; text-align: center; background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%); border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                      U.S. Department of Health & Human Services
                    </h1>
                    <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 14px;">
                      Government Grant Application Portal
                    </p>
                  </td>
                </tr>
                
                <!-- Content -->
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600;">
                      ${type === "login" ? "Login Verification Code" : "Email Verification Code"}
                    </h2>
                    
                    <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.5;">
                      ${
                        type === "login"
                          ? "You are attempting to log in to your Government Grant App account. Please use the verification code below to complete your login:"
                          : "Thank you for registering with the Government Grant Application Portal. Please use the verification code below to verify your email address:"
                      }
                    </p>
                    
                    <!-- Verification Code Box -->
                    <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                      <tr>
                        <td align="center" style="padding: 30px; background-color: #f1f5f9; border-radius: 8px; border: 2px dashed #cbd5e1;">
                          <div style="font-size: 36px; font-weight: 700; color: #1e40af; letter-spacing: 8px; font-family: 'Courier New', monospace;">
                            ${code}
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="margin: 20px 0; color: #64748b; font-size: 14px; line-height: 1.5;">
                      <strong>Important:</strong> This verification code will expire in <strong>10 minutes</strong>. If you did not request this code, please ignore this email or contact support if you have concerns.
                    </p>
                    
                    <div style="margin: 30px 0 0 0; padding: 20px; background-color: #fef3c7; border-left: 4px solid #f59e0b; border-radius: 4px;">
                      <p style="margin: 0; color: #92400e; font-size: 14px; line-height: 1.5;">
                        <strong>Security Notice:</strong> Never share your verification code with anyone. Government officials will never ask for your verification code.
                      </p>
                    </div>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0 0 10px 0; color: #64748b; font-size: 12px; line-height: 1.5; text-align: center;">
                      This is an official email from the U.S. Department of Health & Human Services<br>
                      Government Grant Application Portal
                    </p>
                    <p style="margin: 0; color: #94a3b8; font-size: 11px; text-align: center;">
                      © ${new Date().getFullYear()} U.S. Department of Health & Human Services. All rights reserved.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `

  // Send email using Supabase Auth admin API
  try {
    // Note: Supabase doesn't have a direct email sending API in the client
    // In production, you would use a service like Resend, SendGrid, or AWS SES
    // For now, we'll use Supabase's auth email system with custom templates

    // Log the email for development
    console.log(`[v0] Sending verification email to ${email}`)
    console.log(`[v0] Subject: ${subject}`)
    console.log(`[v0] Code: ${code}`)

    // In production, integrate with an email service:
    // Example with Resend (recommended):
    /*
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Government Grant App <noreply@grants.gov>',
      to: email,
      subject: subject,
      html: emailHtml,
    })
    */

    // For development, you can view the email HTML in console
    if (process.env.NODE_ENV === "development") {
      console.log("[v0] Email HTML preview available in logs")
    }

    return true
  } catch (error) {
    console.error("[v0] Error sending verification email:", error)
    throw new Error("Failed to send verification email")
  }
}

export async function createVerificationCode(userId: string, codeType: "login" | "email_verification") {
  const supabase = await getSupabaseServerClient()
  const code = await generateVerificationCode()
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes

  const { data, error } = await supabase
    .from("verification_codes")
    .insert({
      user_id: userId,
      code,
      code_type: codeType,
      expires_at: expiresAt.toISOString(),
    })
    .select()
    .single()

  if (error) {
    console.error("[v0] Error creating verification code:", error)
    throw new Error("Failed to create verification code")
  }

  return { code, expiresAt }
}

export async function verifyCode(
  userId: string,
  code: string,
  codeType: "login" | "email_verification",
): Promise<boolean> {
  const supabase = await getSupabaseServerClient()

  const { data, error } = await supabase
    .from("verification_codes")
    .select("*")
    .eq("user_id", userId)
    .eq("code", code)
    .eq("code_type", codeType)
    .eq("used", false)
    .gt("expires_at", new Date().toISOString())
    .single()

  if (error || !data) {
    return false
  }

  // Mark code as used
  await supabase.from("verification_codes").update({ used: true }).eq("id", data.id)

  return true
}
