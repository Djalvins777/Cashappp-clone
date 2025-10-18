-- Add certificate fields to applications table
ALTER TABLE applications 
ADD COLUMN IF NOT EXISTS certificate_number TEXT,
ADD COLUMN IF NOT EXISTS approval_date TIMESTAMPTZ;

-- Create index for certificate lookups
CREATE INDEX IF NOT EXISTS idx_applications_certificate_number ON applications(certificate_number);

-- Function to generate certificate number
CREATE OR REPLACE FUNCTION generate_certificate_number()
RETURNS TEXT AS $$
DECLARE
  cert_num TEXT;
BEGIN
  cert_num := 'HHS-' || TO_CHAR(NOW(), 'YYYY') || '-' || LPAD(FLOOR(RANDOM() * 999999)::TEXT, 6, '0');
  RETURN cert_num;
END;
$$ LANGUAGE plpgsql;
