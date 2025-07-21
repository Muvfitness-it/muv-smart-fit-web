-- Create ai_tokens table for AI authentication
CREATE TABLE public.ai_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_for TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.ai_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies for ai_tokens
CREATE POLICY "AI tokens can be created by service role" 
ON public.ai_tokens 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "AI tokens can be read for verification" 
ON public.ai_tokens 
FOR SELECT 
USING (true);

CREATE POLICY "AI tokens can be updated for cleanup" 
ON public.ai_tokens 
FOR UPDATE 
USING (true);

CREATE POLICY "AI tokens can be deleted for cleanup" 
ON public.ai_tokens 
FOR DELETE 
USING (true);

-- Create index for faster token lookups
CREATE INDEX idx_ai_tokens_token ON public.ai_tokens(token);
CREATE INDEX idx_ai_tokens_expires_at ON public.ai_tokens(expires_at);