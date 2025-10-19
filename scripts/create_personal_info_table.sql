-- Create personal_information table to store applicant details
CREATE TABLE IF NOT EXISTS public.personal_information (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- Basic Information
  city VARCHAR(100),
  state VARCHAR(100),
  home_address TEXT,
  gender VARCHAR(20),
  date_of_birth DATE,
  
  -- Family Information
  next_of_kin VARCHAR(255),
  mother_name VARCHAR(255),
  marital_status VARCHAR(20),
  
  -- Contact Information
  phone_number VARCHAR(20),
  email VARCHAR(255),
  
  -- Financial Information
  monthly_income NUMERIC(12, 2),
  
  -- Health Information
  hearing_status VARCHAR(50),
  
  -- Additional Information
  nationality VARCHAR(100),
  housing_status VARCHAR(50),
  selfie_url TEXT,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  UNIQUE(user_id)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_personal_information_user_id ON public.personal_information(user_id);

-- Enable RLS
ALTER TABLE public.personal_information ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Users can view their own personal information"
  ON public.personal_information
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own personal information"
  ON public.personal_information
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own personal information"
  ON public.personal_information
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
