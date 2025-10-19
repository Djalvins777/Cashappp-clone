# Email Configuration Guide

## Setting Up Email Service for Government Grant App

The Government Grant App sends verification codes via email. To enable email sending in production, you need to configure an email service provider.

### Recommended: Resend (Easiest Setup)

1. **Sign up for Resend**
   - Go to [resend.com](https://resend.com)
   - Create a free account (100 emails/day free tier)

2. **Get your API key**
   - Navigate to API Keys in your Resend dashboard
   - Create a new API key
   - Copy the key

3. **Add to Vercel Environment Variables**
   - Go to your Vercel project settings
   - Add environment variable: `RESEND_API_KEY=your_api_key_here`

4. **Install Resend package**
   \`\`\`bash
   npm install resend
   \`\`\`

5. **Update the code**
   - Uncomment the Resend implementation in `lib/auth-helpers.tsx`
   - The email sender will show as "Government Grant App"

### Alternative: SendGrid

1. **Sign up for SendGrid**
   - Go to [sendgrid.com](https://sendgrid.com)
   - Free tier: 100 emails/day

2. **Get API key**
   - Create API key in SendGrid dashboard
   - Add to Vercel: `SENDGRID_API_KEY=your_key`

3. **Install package**
   \`\`\`bash
   npm install @sendgrid/mail
   \`\`\`

### Alternative: AWS SES

1. **Set up AWS SES**
   - Configure in AWS Console
   - Verify your domain
   - Get credentials

2. **Add environment variables**
   \`\`\`
   AWS_SES_ACCESS_KEY_ID=your_key
   AWS_SES_SECRET_ACCESS_KEY=your_secret
   AWS_SES_REGION=us-east-1
   \`\`\`

### Email Branding

All emails sent from the app will display:
- **From Name**: "Government Grant App"
- **Subject Line**: Includes "Government Grant App" prefix
- **Email Design**: Official HHS branding with blue gradient header
- **Content**: Professional government-style formatting

### Testing Emails in Development

During development, emails are logged to the console. Check your terminal/logs to see:
- Email recipient
- Subject line
- Verification code
- Full HTML content

### Production Checklist

- [ ] Email service provider configured (Resend/SendGrid/SES)
- [ ] API key added to Vercel environment variables
- [ ] Domain verified (if required by provider)
- [ ] Sender email configured (e.g., noreply@yourdomain.com)
- [ ] Test email sending in production environment
- [ ] Monitor email delivery rates in provider dashboard

### Email Content

The verification emails include:
- Official HHS header with blue gradient
- Clear verification code in large, monospace font
- 10-minute expiration notice
- Security warnings
- Professional footer with copyright

### Troubleshooting

**Emails not sending?**
- Check API key is correctly set in environment variables
- Verify email service account is active
- Check console logs for error messages
- Ensure sender domain is verified (if required)

**Emails going to spam?**
- Configure SPF/DKIM records for your domain
- Use a verified sender domain
- Avoid spam trigger words in content
- Monitor sender reputation in email service dashboard
