-- Tabella per configurazione tema e contenuti del sito
CREATE TABLE IF NOT EXISTS public.site_config (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  config_key text UNIQUE NOT NULL,
  config_value jsonb NOT NULL DEFAULT '{}'::jsonb,
  config_type text NOT NULL DEFAULT 'general',
  description text,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.site_config ENABLE ROW LEVEL SECURITY;

-- Policy: Solo admin possono leggere la configurazione
CREATE POLICY "Admins can read site config"
  ON public.site_config
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Solo admin possono modificare la configurazione
CREATE POLICY "Admins can update site config"
  ON public.site_config
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Solo admin possono inserire configurazioni
CREATE POLICY "Admins can insert site config"
  ON public.site_config
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_roles.user_id = auth.uid()
      AND user_roles.role = 'admin'
    )
  );

-- Policy: Service role può leggere per uso pubblico
CREATE POLICY "Service role can read site config"
  ON public.site_config
  FOR SELECT
  USING (auth.role() = 'service_role');

-- Funzione per aggiornare updated_at automaticamente
CREATE OR REPLACE FUNCTION public.update_site_config_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger per aggiornare updated_at
CREATE TRIGGER update_site_config_updated_at_trigger
  BEFORE UPDATE ON public.site_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_site_config_updated_at();

-- Inserimento configurazioni di default
INSERT INTO public.site_config (config_key, config_value, config_type, description) VALUES
  ('theme_colors', '{
    "textOnDark": "hsl(0 0% 100%)",
    "textOnLight": "hsl(220 15% 15%)",
    "buttonPrimary": "hsl(320 85% 45%)",
    "buttonSecondary": "hsl(280 70% 50%)",
    "buttonAccent": "hsl(220 85% 45%)",
    "formBackground": "hsl(0 0% 100%)",
    "formText": "hsl(220 15% 15%)",
    "formBorder": "hsl(220 15% 90%)"
  }'::jsonb, 'theme', 'Colori tema principale del sito'),
  
  ('homepage_content', '{
    "heroTitle": "MUV Fitness Legnago | Centro Fitness Intelligente con EMS, Pilates Reformer e Tecnologie Avanzate",
    "heroDescription": "Il centro fitness più innovativo di Legnago. Tecnologie avanzate per dimagrire velocemente e correggere la postura: EMS Training, Pilates Reformer, Vacuum Therapy. Allenamenti personalizzati basati su scienza e risultati. Prova gratuita senza impegno.",
    "heroPrimaryCTA": "Prenota la tua Prova Gratuita",
    "heroSecondaryCTA": "Scopri il Metodo MUV",
    "finalCTATitle": "Prenota la Tua Prova Gratuita",
    "finalCTADescription": "90 minuti di valutazione completa, presentazione del protocollo personalizzato e sessione trial. Zero impegno, massima trasparenza."
  }'::jsonb, 'content', 'Contenuti homepage principale'),
  
  ('contact_info', '{
    "phone": "329 107 0374",
    "email": "info@muvfitness.it",
    "whatsappNumber": "3291070374",
    "showPhone": true,
    "showEmail": true,
    "showWhatsApp": true
  }'::jsonb, 'contact', 'Informazioni di contatto visibili sul sito'),
  
  ('landing_defaults', '{
    "defaultClaim": "Trasforma il tuo corpo in 8 settimane",
    "defaultIncentive": "Prova GRATUITA senza impegno",
    "countdownDefault": 48
  }'::jsonb, 'content', 'Configurazioni di default per landing pages')
ON CONFLICT (config_key) DO NOTHING;

-- Commento sulla tabella
COMMENT ON TABLE public.site_config IS 'Configurazione centralizzata per tema, colori e contenuti del sito. Modificabile tramite pannello admin.';

-- Index per performance
CREATE INDEX IF NOT EXISTS idx_site_config_key ON public.site_config(config_key);
CREATE INDEX IF NOT EXISTS idx_site_config_type ON public.site_config(config_type);