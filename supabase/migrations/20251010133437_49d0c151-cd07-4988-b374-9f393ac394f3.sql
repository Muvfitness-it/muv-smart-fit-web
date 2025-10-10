-- FASE 5: Tabella FAQ dinamiche per pagina contatti
CREATE TABLE IF NOT EXISTS public.contact_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.contact_faqs ENABLE ROW LEVEL SECURITY;

-- Policy: tutti possono leggere le FAQ attive
CREATE POLICY "Chiunque può vedere le FAQ attive"
  ON public.contact_faqs
  FOR SELECT
  USING (is_active = true);

-- Policy: solo admin possono gestire le FAQ
CREATE POLICY "Solo admin possono gestire le FAQ"
  ON public.contact_faqs
  FOR ALL
  USING (public.current_user_has_role('admin'::app_role))
  WITH CHECK (public.current_user_has_role('admin'::app_role));

-- Inserisci FAQ iniziali
INSERT INTO public.contact_faqs (question, answer, order_index, is_active) VALUES
('Dove si trova MUV Fitness?', 'MUV Fitness si trova in Piazzetta Don Walter Soave, 2 a Legnago (VR). Siamo facilmente raggiungibili dal centro città e disponiamo di parcheggio.', 1, true),
('Quali sono gli orari di apertura?', 'Siamo aperti dal lunedì al venerdì dalle 08:00 alle 21:00, il sabato dalle 8:00 alle 12:00. La domenica su appuntamento per servizi specifici.', 2, true),
('Come posso prenotare una consulenza gratuita?', 'Puoi prenotare chiamando il 329 107 0374, inviando una email a info@muvfitness.it o compilando il form di contatto sul sito.', 3, true),
('Dove parcheggio?', 'Posti auto gratuiti disponibili davanti al centro e nelle vie limitrofe.', 4, true),
('Posso venire in pausa pranzo?', 'Sì, siamo aperti anche durante l''orario di pranzo su appuntamento.', 5, true),
('Tempi per la prima prova?', 'Solitamente riusciamo a programmare la prima consulenza entro 2-3 giorni.', 6, true),
('Quanto costa la consulenza?', 'La consulenza iniziale è completamente gratuita e senza impegno.', 7, true),
('Cosa devo portare?', 'Niente! Forniamo tutto noi con il nostro Kit Zero Pensieri.', 8, true),
('Posso venire anche la sera?', 'Sì, siamo aperti fino alle 21:00 dal lunedì al venerdì.', 9, true);

-- Trigger per aggiornare updated_at
CREATE TRIGGER update_contact_faqs_updated_at
  BEFORE UPDATE ON public.contact_faqs
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();