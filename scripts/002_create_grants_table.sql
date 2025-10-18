-- Create grants table to store available grant opportunities
CREATE TABLE IF NOT EXISTS grants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  agency TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  amount_display TEXT NOT NULL,
  deadline DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'open',
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  requirements TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create applications table to track user grant applications
CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  grant_id UUID NOT NULL REFERENCES grants(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'draft',
  submitted_date TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, grant_id)
);

-- Enable RLS
ALTER TABLE grants ENABLE ROW LEVEL SECURITY;
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- Grants policies (everyone can view, only admins can modify)
CREATE POLICY "Anyone can view grants"
  ON grants FOR SELECT
  USING (true);

-- Applications policies
CREATE POLICY "Users can view their own applications"
  ON applications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own applications"
  ON applications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own applications"
  ON applications FOR UPDATE
  USING (auth.uid() = user_id);

-- Insert sample grant opportunities
INSERT INTO grants (title, agency, amount, amount_display, deadline, status, description, category, requirements) VALUES
('Community Health Initiative Grant', 'Department of Health & Human Services', 16000, '$16,000', '2025-04-30', 'open', 'Funding for community-based health programs and initiatives that improve public health outcomes.', 'Health', 'Must be a registered non-profit or community organization'),
('Small Business Development Fund', 'Small Business Administration', 25000, '$25,000', '2025-05-15', 'open', 'Support for small businesses to expand operations and create jobs in underserved communities.', 'Business', 'Must have been in business for at least 1 year'),
('Education Technology Grant', 'Department of Education', 50000, '$50,000', '2025-06-01', 'open', 'Funding for innovative educational technology solutions in K-12 schools.', 'Education', 'Must be an educational institution or EdTech company'),
('Rural Infrastructure Development', 'Department of Agriculture', 75000, '$75,000', '2025-06-15', 'open', 'Support for infrastructure improvements in rural communities including broadband and utilities.', 'Infrastructure', 'Must serve rural areas with population under 50,000'),
('Affordable Housing Initiative', 'Department of Housing and Urban Development', 100000, '$100,000', '2025-07-01', 'open', 'Funding for affordable housing development and renovation projects.', 'Housing', 'Must be a housing developer or non-profit'),
('Clean Energy Innovation Grant', 'Department of Energy', 150000, '$150,000', '2025-07-15', 'open', 'Support for renewable energy projects and clean technology innovation.', 'Energy', 'Must demonstrate environmental impact'),
('Workforce Development Program', 'Department of Labor', 200000, '$200,000', '2025-08-01', 'open', 'Funding for job training and workforce development programs in high-demand industries.', 'Workforce', 'Must partner with local employers'),
('Community Safety Enhancement', 'Department of Justice', 250000, '$250,000', '2025-08-15', 'open', 'Support for community policing and crime prevention initiatives.', 'Public Safety', 'Must be a law enforcement agency or community organization'),
('Healthcare Access Expansion', 'Department of Health & Human Services', 350000, '$350,000', '2025-09-01', 'open', 'Funding to expand healthcare access in underserved communities.', 'Health', 'Must be a healthcare provider or clinic'),
('Major Infrastructure Modernization', 'Department of Transportation', 500000, '$500,000', '2025-09-30', 'open', 'Large-scale funding for transportation infrastructure improvements and modernization.', 'Infrastructure', 'Must be a state or local government entity');

-- Create indexes for better performance
CREATE INDEX idx_grants_status ON grants(status);
CREATE INDEX idx_grants_deadline ON grants(deadline);
CREATE INDEX idx_applications_user_id ON applications(user_id);
CREATE INDEX idx_applications_grant_id ON applications(grant_id);
CREATE INDEX idx_applications_status ON applications(status);
