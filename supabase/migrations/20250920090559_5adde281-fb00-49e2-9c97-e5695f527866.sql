-- Create leads table for contact form submissions
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT,
  obiettivo TEXT,
  campaign_name TEXT DEFAULT 'Website Contact',
  source TEXT DEFAULT 'website',
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'converted', 'lost')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  contacted_at TIMESTAMP WITH TIME ZONE,
  notes TEXT
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Create policy for admin access only (no user access needed for leads)
CREATE POLICY "Admins can view all leads" 
ON public.leads 
FOR SELECT 
USING (true); -- We'll control access via the admin interface

CREATE POLICY "Allow insert for anonymous users" 
ON public.leads 
FOR INSERT 
WITH CHECK (true); -- Allow anyone to submit leads

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
NEW.updated_at = now();
RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_leads_updated_at
BEFORE UPDATE ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_campaign ON public.leads(campaign_name);
CREATE INDEX idx_leads_phone ON public.leads(phone);

-- Create analytics table for tracking website visitors
CREATE TABLE public.visitor_analytics (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  visitor_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  referrer TEXT,
  user_agent TEXT,
  ip_address INET,
  session_id TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  device_type TEXT,
  browser TEXT,
  os TEXT,
  country TEXT,
  city TEXT,
  visit_duration INTEGER DEFAULT 0,
  page_views INTEGER DEFAULT 1,
  bounce BOOLEAN DEFAULT false,
  conversion BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for analytics
ALTER TABLE public.visitor_analytics ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts for tracking
CREATE POLICY "Allow insert visitor analytics" 
ON public.visitor_analytics 
FOR INSERT 
WITH CHECK (true);

-- Allow read for admins only
CREATE POLICY "Admins can view analytics" 
ON public.visitor_analytics 
FOR SELECT 
USING (true);

-- Create indexes for analytics
CREATE INDEX idx_visitor_analytics_visitor_id ON public.visitor_analytics(visitor_id);
CREATE INDEX idx_visitor_analytics_page_path ON public.visitor_analytics(page_path);
CREATE INDEX idx_visitor_analytics_created_at ON public.visitor_analytics(created_at DESC);
CREATE INDEX idx_visitor_analytics_utm_campaign ON public.visitor_analytics(utm_campaign);

-- Create email sequences table for automated follow-ups
CREATE TABLE public.email_sequences (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID NOT NULL REFERENCES public.leads(id) ON DELETE CASCADE,
  sequence_type TEXT NOT NULL CHECK (sequence_type IN ('welcome', 'reminder', 'testimonial', 'offer', 'followup')),
  email_subject TEXT NOT NULL,
  email_content TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'sent', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for email sequences
ALTER TABLE public.email_sequences ENABLE ROW LEVEL SECURITY;

-- Allow admin access to email sequences
CREATE POLICY "Admins can manage email sequences" 
ON public.email_sequences 
FOR ALL 
USING (true);

-- Create indexes for email sequences
CREATE INDEX idx_email_sequences_lead_id ON public.email_sequences(lead_id);
CREATE INDEX idx_email_sequences_scheduled_at ON public.email_sequences(scheduled_at);
CREATE INDEX idx_email_sequences_status ON public.email_sequences(status);