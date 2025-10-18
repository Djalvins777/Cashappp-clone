-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table to extend Supabase auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  email_verified BOOLEAN DEFAULT FALSE,
  last_login TIMESTAMP WITH TIME ZONE
);

-- Create verification codes table for 2FA
CREATE TABLE IF NOT EXISTS public.verification_codes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  code TEXT NOT NULL,
  code_type TEXT NOT NULL CHECK (code_type IN ('login', 'email_verification')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_verification_codes_user_id ON public.verification_codes(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_codes_code ON public.verification_codes(code);
CREATE INDEX IF NOT EXISTS idx_verification_codes_expires_at ON public.verification_codes(expires_at);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_codes ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- Verification codes policies
CREATE POLICY "Users can view own verification codes"
  ON public.verification_codes FOR SELECT
  USING (auth.uid() = user_id);

-- Function to automatically create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, email_verified)
  VALUES (NEW.id, NEW.email, NEW.email_confirmed_at IS NOT NULL);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on new user
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to clean up expired verification codes
CREATE OR REPLACE FUNCTION public.cleanup_expired_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM public.verification_codes
  WHERE expires_at < NOW() OR used = TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
