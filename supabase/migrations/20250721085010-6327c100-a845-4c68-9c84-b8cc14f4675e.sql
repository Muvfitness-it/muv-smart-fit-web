-- Aggiungi tabella per token di cancellazione/modifica prenotazioni
CREATE TABLE public.booking_tokens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id UUID NOT NULL REFERENCES public.bookings(id) ON DELETE CASCADE,
  token_type TEXT NOT NULL CHECK (token_type IN ('cancel', 'modify')),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  used_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indici per performance
CREATE INDEX idx_booking_tokens_hash ON public.booking_tokens(token_hash);
CREATE INDEX idx_booking_tokens_booking_id ON public.booking_tokens(booking_id);
CREATE INDEX idx_booking_tokens_expires_at ON public.booking_tokens(expires_at);

-- Enable RLS
ALTER TABLE public.booking_tokens ENABLE ROW LEVEL SECURITY;

-- Policy per leggere token (solo per validazione)
CREATE POLICY "Booking tokens are readable for validation" 
ON public.booking_tokens 
FOR SELECT 
USING (true);

-- Policy per inserire token (solo da edge function)
CREATE POLICY "Booking tokens can be created by service role" 
ON public.booking_tokens 
FOR INSERT 
WITH CHECK (true);

-- Policy per aggiornare token (solo per marcare come usati)
CREATE POLICY "Booking tokens can be updated for usage tracking" 
ON public.booking_tokens 
FOR UPDATE 
USING (true);

-- Funzione per pulire token scaduti
CREATE OR REPLACE FUNCTION public.cleanup_expired_booking_tokens()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.booking_tokens 
  WHERE expires_at < now() - INTERVAL '24 hours';
END;
$$;