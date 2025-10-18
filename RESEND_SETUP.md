# Resend Email Service Setup

This application uses [Resend](https://resend.com) to send verification code emails with official HHS branding.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Go to **API Keys** section
3. Click **Create API Key**
4. Give it a name (e.g., "Government Grant App")
5. Copy the API key (starts with `re_`)

### 3. Add API Key to Environment Variables

Add the following environment variable to your project:

\`\`\`bash
RESEND_API_KEY=re_your_api_key_here
\`\`\`

**In v0:**
- Click the **Vars** section in the left sidebar
- Add a new environment variable:
  - Key: `RESEND_API_KEY`
  - Value: Your Resend API key

**In Vercel:**
- Go to your project settings
- Navigate to **Environment Variables**
- Add `RESEND_API_KEY` with your API key

### 4. Verify Your Domain (Production)

For production use, you should verify your domain:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records provided by Resend to your domain
5. Wait for verification (usually takes a few minutes)

Once verified, update the `from` address in `lib/auth-helpers.tsx`:

\`\`\`typescript
from: "Government Grant App <noreply@yourdomain.com>"
\`\`\`

### 5. Testing

**Development Mode:**
- Without `RESEND_API_KEY`: Codes are logged to the console
- With `RESEND_API_KEY`: Emails are sent via Resend

**Production Mode:**
- Emails are sent via Resend with proper HHS branding
- Verification codes expire in 10 minutes
- Users receive professionally formatted emails

## Email Features

✅ Official HHS branding and colors  
✅ Responsive HTML email template  
✅ Security warnings and best practices  
✅ 10-minute code expiration  
✅ Professional government styling  

## Troubleshooting

**Emails not sending:**
- Check that `RESEND_API_KEY` is set correctly
- Verify your API key is active in Resend dashboard
- Check server logs for error messages

**Emails going to spam:**
- Verify your domain in Resend
- Add SPF and DKIM records to your DNS
- Use a verified sender domain

**Rate limits:**
- Free tier: 100 emails/day
- Paid plans: Higher limits available

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
