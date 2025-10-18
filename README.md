# Government Grant Application Portal

A secure, full-stack government grant application system built with Next.js, Supabase, and TypeScript.

## Features

### Authentication & Security
- **Email/Password Signup** with email verification
- **Two-Factor Authentication (2FA)** via email verification codes
- **Protected Routes** with middleware-based authentication
- **Row Level Security (RLS)** on all database tables
- **Session Management** with automatic token refresh

### Grant Management
- **Browse Grants**: View all available government grants from $16,000 to $500,000
- **Apply for Grants**: Submit detailed applications for specific grant programs
- **Track Applications**: Monitor application status in real-time
- **Official Certificates**: Download and print grant award certificates upon approval
- **Multiple Categories**: Health, Business, Education, Infrastructure, Housing, Energy, Workforce, Public Safety

### Certificate System
- **Automatic Generation**: Certificates generated when applications are approved
- **Unique Certificate Numbers**: Each certificate has a unique HHS certificate number
- **Official Design**: Professional government-style certificate with HHS branding
- **Download & Print**: Save certificates as PNG images or print directly
- **Personalized**: Certificates include recipient name, grant details, and approval date
- **Verification**: Certificate numbers can be used for verification purposes

## Getting Started

### Prerequisites
- Node.js 18+
- Supabase account and project

### Installation

1. Clone the repository
2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Set up environment variables in the Vars section of v0:
   \`\`\`
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL=http://localhost:3000/dashboard
   \`\`\`

4. Run the database setup scripts:
   - Navigate to the Scripts section in v0
   - Execute `001_setup_auth_tables.sql`
   - Execute `002_create_grants_table.sql`

5. Start the development server:
   \`\`\`bash
   npm run dev
   \`\`\`

## Project Structure

\`\`\`
├── app/
│   ├── api/
│   │   ├── auth/              # Authentication API routes
│   │   └── applications/      # Application submission routes
│   ├── dashboard/             # Protected dashboard
│   ├── grants/                # Grant browsing and application
│   ├── my-applications/       # User's application tracking
│   ├── guidelines/            # Application guidelines
│   ├── profile/               # User profile management
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   ├── certificate/           # Certificate viewing and downloading
│   └── admin/
│       └── demo-approve/      # Demo page for approving applications
├── components/
│   ├── auth/                  # Authentication components
│   ├── dashboard/             # Dashboard components
│   ├── grants/                # Grant application components
│   ├── certificates/          # Certificate components
│   └── ui/                    # shadcn/ui components
├── lib/
│   ├── supabase/              # Supabase client utilities
│   ├── auth-helpers.ts        # Authentication helper functions
│   ├── certificate-helpers.ts # Certificate helper functions
│   └── types.ts               # TypeScript type definitions
├── scripts/
│   ├── 001_setup_auth_tables.sql      # Auth database schema
│   ├── 002_create_grants_table.sql    # Grants database schema
│   └── 003_create_certificates_table.sql # Certificates database schema
└── middleware.ts              # Route protection middleware
\`\`\`

## Authentication Flow

### Signup Process
1. User fills out registration form with email and password
2. Account created in Supabase Auth
3. Verification email sent automatically
4. User clicks verification link in email
5. Email verified, account activated
6. User can now log in

### Login Process
1. User enters email and password
2. Credentials validated against Supabase Auth
3. 6-digit verification code generated and sent to email
4. User enters verification code
5. Code verified (expires after 10 minutes)
6. Session created and user redirected to dashboard

## Certificate Generation Flow

### How Certificates Work
1. User submits grant application
2. Application status changes to "under_review"
3. When approved, system automatically:
   - Generates unique certificate number (format: HHS-YYYY-XXXXXX)
   - Sets approval date
   - Updates application status to "approved"
4. User receives notification and can view certificate
5. Certificate displays:
   - Recipient's full name
   - Grant title and amount
   - Certificate number and approval date
   - Official HHS seal and signatures
6. User can download as PNG or print directly

### Demo Feature
For testing purposes, use the "Demo: Approve & Get Certificate" button in Quick Actions to:
- Simulate application approval
- Generate a certificate
- Test the download and print functionality

## Database Schema

### profiles
- User profile information
- Links to Supabase auth.users
- Stores full name, phone, email verification status

### verification_codes
- Stores 2FA verification codes
- Expires after 10 minutes
- Tracks usage status to prevent reuse

### grants
- Available grant opportunities
- Amounts from $16,000 to $500,000
- Categories, deadlines, requirements

### applications
- User grant applications
- Status tracking (submitted, under_review, approved, rejected)
- Links users to grants
- **certificate_number**: Unique certificate ID (generated on approval)
- **approval_date**: Timestamp when application was approved

### certificates
- Stores generated grant certificates
- Links to approved applications
- Includes certificate number, approval date, recipient details, and grant information

## Key Pages

- **/** - Landing page with grant information
- **/signup** - User registration with email verification
- **/login** - Login with 2FA
- **/dashboard** - Main dashboard with grant opportunities
- **/grants** - Browse all available grants
- **/grants/[id]/apply** - Apply for specific grant
- **/my-applications** - Track application status and view certificates
- **/certificate/[applicationId]** - View, download, and print grant certificates
- **/admin/demo-approve** - Demo page to approve applications and generate certificates
- **/profile** - Manage user profile
- **/guidelines** - Application guidelines and help

## Certificate Features

### Design Elements
- Official HHS header with department seal
- Large "GRANT AWARD CERTIFICATE" title
- Recipient name prominently displayed
- Grant details (title, category, amount)
- Certificate number and approval date
- Official signatures from HHS officials
- Gold seal with ribbon
- Professional government styling

### Technical Implementation
- Uses html2canvas for PNG generation
- Print-optimized CSS for direct printing
- Responsive design for all screen sizes
- High-resolution output (2x scale)
- Automatic filename with certificate number

### Usage
1. Navigate to "My Applications"
2. Find approved applications
3. Click "View Certificate" button
4. Use "Download" to save as PNG
5. Use "Print" to print directly
6. Certificate saved to device's downloads folder

## Deployment

Deploy to Vercel:
1. Push code to GitHub
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## Support

For issues or questions:
- Check the Guidelines page in the application
- Visit the official HHS grants website
- Contact support through the Help & Support button

## License

Official U.S. Government Project - Department of Health & Human Services
