-- ================================================
-- Lead Scoring, Newsletter & Chat Tables
-- ================================================

-- Lead Scores Table for automatic lead scoring
CREATE TABLE public.lead_scores (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  score INTEGER NOT NULL DEFAULT 0,
  score_breakdown JSONB DEFAULT '{}'::jsonb,
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT now(),
  score_level TEXT NOT NULL DEFAULT 'cold' CHECK (score_level IN ('cold', 'warm', 'hot', 'qualified')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_lead_score UNIQUE (lead_id)
);

-- Newsletter Subscribers Table
CREATE TABLE public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Chat Conversations Table
CREATE TABLE public.chat_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id TEXT NOT NULL,
  visitor_id TEXT,
  messages JSONB DEFAULT '[]'::jsonb,
  lead_captured BOOLEAN DEFAULT false,
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  lead_data JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.lead_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chat_conversations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lead_scores
CREATE POLICY "Admins can manage lead scores" ON public.lead_scores
  FOR ALL USING (current_user_has_role('admin'::app_role))
  WITH CHECK (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can manage lead scores" ON public.lead_scores
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- RLS Policies for newsletter_subscribers
CREATE POLICY "Admins can manage newsletter subscribers" ON public.newsletter_subscribers
  FOR ALL USING (current_user_has_role('admin'::app_role))
  WITH CHECK (current_user_has_role('admin'::app_role));

CREATE POLICY "Service role can insert newsletter subscribers" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anyone can subscribe to newsletter" ON public.newsletter_subscribers
  FOR INSERT WITH CHECK (true);

-- RLS Policies for chat_conversations
CREATE POLICY "Service role can manage chat conversations" ON public.chat_conversations
  FOR ALL USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

CREATE POLICY "Anyone can insert chat conversations" ON public.chat_conversations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can update their own chat session" ON public.chat_conversations
  FOR UPDATE USING (true);

CREATE POLICY "Admins can view all chat conversations" ON public.chat_conversations
  FOR SELECT USING (current_user_has_role('admin'::app_role));

-- Update trigger for lead_scores
CREATE OR REPLACE FUNCTION update_lead_score_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER update_lead_scores_updated_at
  BEFORE UPDATE ON public.lead_scores
  FOR EACH ROW EXECUTE FUNCTION update_lead_score_updated_at();

CREATE TRIGGER update_chat_conversations_updated_at
  BEFORE UPDATE ON public.chat_conversations
  FOR EACH ROW EXECUTE FUNCTION update_lead_score_updated_at();

-- Function to calculate and update lead score
CREATE OR REPLACE FUNCTION public.update_lead_score(
  p_lead_id UUID,
  p_score_change INTEGER,
  p_activity_type TEXT
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  current_score INTEGER;
  new_score INTEGER;
  new_level TEXT;
  current_breakdown JSONB;
BEGIN
  SELECT score, score_breakdown INTO current_score, current_breakdown
  FROM public.lead_scores
  WHERE lead_id = p_lead_id;
  
  IF current_score IS NULL THEN
    current_score := 0;
    current_breakdown := '{}'::jsonb;
    INSERT INTO public.lead_scores (lead_id, score, score_breakdown)
    VALUES (p_lead_id, 0, '{}'::jsonb);
  END IF;
  
  new_score := current_score + p_score_change;
  IF new_score < 0 THEN new_score := 0; END IF;
  
  new_level := CASE
    WHEN new_score >= 90 THEN 'qualified'
    WHEN new_score >= 60 THEN 'hot'
    WHEN new_score >= 30 THEN 'warm'
    ELSE 'cold'
  END;
  
  current_breakdown := current_breakdown || jsonb_build_object(
    p_activity_type, COALESCE((current_breakdown->>p_activity_type)::integer, 0) + p_score_change
  );
  
  UPDATE public.lead_scores
  SET 
    score = new_score,
    score_level = new_level,
    score_breakdown = current_breakdown,
    last_activity = now(),
    updated_at = now()
  WHERE lead_id = p_lead_id;
END;
$$;

-- Indexes for performance
CREATE INDEX idx_lead_scores_lead_id ON public.lead_scores(lead_id);
CREATE INDEX idx_lead_scores_score_level ON public.lead_scores(score_level);
CREATE INDEX idx_newsletter_subscribers_email ON public.newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_status ON public.newsletter_subscribers(status);
CREATE INDEX idx_chat_conversations_session_id ON public.chat_conversations(session_id);
CREATE INDEX idx_chat_conversations_lead_captured ON public.chat_conversations(lead_captured);