-- Aggiungi colonna per tracciare la variante A/B del subject
ALTER TABLE public.email_sequences 
ADD COLUMN IF NOT EXISTS subject_variant text DEFAULT 'A';

-- Aggiungi indice per analisi A/B
CREATE INDEX IF NOT EXISTS idx_email_sequences_subject_variant 
ON public.email_sequences(sequence_type, subject_variant);

-- Commento per documentazione
COMMENT ON COLUMN public.email_sequences.subject_variant IS 'A/B test variant for email subject line (A or B)';