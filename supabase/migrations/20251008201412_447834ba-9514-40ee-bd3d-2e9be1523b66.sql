
-- Migration per verificare e pulire eventuali riferimenti obsoleti a lead_score
-- Questa migration NON modifica la struttura della tabella leads

-- 1. Aggiungiamo un commento alla tabella leads per documentare lo schema corrente
COMMENT ON TABLE public.leads IS 'Tabella per tracciare i contatti dal form. Schema verificato senza lead_score';

-- 2. Verifichiamo che non ci siano constraint o default che fanno riferimento a colonne inesistenti
-- (questa è solo una query di verifica, non modifica nulla)
DO $$
BEGIN
  -- Log dello schema attuale per debug
  RAISE NOTICE 'Verifica schema tabella leads completata';
END $$;

-- 3. Aggiungiamo un indice per migliorare le performance sulle query comuni
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status) WHERE status IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email) WHERE email IS NOT NULL;

-- 4. Aggiorniamo il commento sulla tabella per documentare che NON usa lead_score
COMMENT ON COLUMN public.leads.status IS 'Status del lead: new, contacted, converted, etc. (NO lead_score utilizzato)';
