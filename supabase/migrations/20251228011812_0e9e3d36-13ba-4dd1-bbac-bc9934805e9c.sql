-- Add email tracking columns to email_sequences
ALTER TABLE public.email_sequences 
ADD COLUMN IF NOT EXISTS opened_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS clicked_at TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS open_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS click_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS tracking_id UUID DEFAULT gen_random_uuid();

-- Create index for tracking lookups
CREATE INDEX IF NOT EXISTS idx_email_sequences_tracking_id ON public.email_sequences(tracking_id);

-- Create email_tracking_events table for detailed analytics
CREATE TABLE IF NOT EXISTS public.email_tracking_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email_sequence_id UUID REFERENCES public.email_sequences(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (event_type IN ('open', 'click')),
  link_url TEXT,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.email_tracking_events ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Admins can view email tracking events" 
ON public.email_tracking_events 
FOR SELECT 
USING (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert tracking events" 
ON public.email_tracking_events 
FOR INSERT 
WITH CHECK (auth.role() = 'service_role');

-- Create index for analytics queries
CREATE INDEX IF NOT EXISTS idx_email_tracking_events_sequence ON public.email_tracking_events(email_sequence_id);
CREATE INDEX IF NOT EXISTS idx_email_tracking_events_type ON public.email_tracking_events(event_type);