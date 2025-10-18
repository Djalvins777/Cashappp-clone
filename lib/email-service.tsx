interface EmailOptions {
  to: string
  subject: string
  html: string
  from?: string
}

/**
 * Send email using Supabase or external email service
 * In production, configure with Resend, SendGrid, or AWS SES
 */
export async function sendEmail({ to, subject, html, from = "Government Grant App" }: EmailOptions) {
  // For production, use an email service like Resend
  // Example implementation:

  /*
  import { Resend } from 'resend'
  const resend = new Resend(process.env.RESEND_API_KEY)
  
  await resend.emails.send({
    from: `${from} <noreply@yourdomain.com>`,
    to,
    subject,
    html,
  })
  */

  // For development, log the email
  console.log(`[v0] Email Service - Sending email`)
  console.log(`[v0] From: ${from}`)
  console.log(`[v0] To: ${to}`)
  console.log(`[v0] Subject: ${subject}`)
  console.log(`[v0] HTML length: ${html.length} characters`)

  return true
}

/**
 * Send verification code email with Government Grant App branding
 */
export async function sendVerificationCodeEmail(email: string, code: string, type: "login" | "email_verification") {
  const subject =
    type === "login"
      ? "Government Grant App - Login Verification Code"
      : "Government Grant App - Email Verification Code"

  const html = generateVerificationEmailHTML(code, type)

  return sendEmail({
    to: email,
    subject,
    html,
    from: "Government Grant App",
  })
}

/**
 * Generate HTML for verification code email
 */
function generateVerificationEmailHTML(code: string, type: "login" | "email_verification"): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
        <table role="presentation" style="width: 100%; border-collapse: collapse;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table role="presentation" style="width: 600px; max-width: 100%; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
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
                <tr>
                  <td style="padding: 40px;">
                    <h2 style="margin: 0 0 20px 0; color: #1e293b; font-size: 20px; font-weight: 600;">
                      ${type === "login" ? "Login Verification Code" : "Email Verification Code"}
                    </h2>
                    <p style="margin: 0 0 20px 0; color: #475569; font-size: 16px; line-height: 1.5;">
                      ${
                        type === "login"
                          ? "You are attempting to log in to your Government Grant App account. Use the code below:"
                          : "Thank you for registering. Please use the code below to verify your email:"
                      }
                    </p>
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
                      This code expires in <strong>10 minutes</strong>. Never share this code with anyone.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 30px 40px; background-color: #f8fafc; border-radius: 0 0 8px 8px; border-top: 1px solid #e2e8f0;">
                    <p style="margin: 0; color: #64748b; font-size: 12px; text-align: center;">
                      © ${new Date().getFullYear()} U.S. Department of Health & Human Services
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
}
