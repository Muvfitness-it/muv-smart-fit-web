-- Ensure unique constraint required by upsert(onConflict: 'session_id')
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint 
    WHERE conname = 'lead_tracking_session_id_key'
  ) THEN
    ALTER TABLE public.lead_tracking
    ADD CONSTRAINT lead_tracking_session_id_key UNIQUE (session_id);
  END IF;
END $$;

-- Allow anonymous updates so upsert can perform DO UPDATE
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' AND tablename = 'lead_tracking' AND policyname = 'Anonymous can update lead tracking'
  ) THEN
    CREATE POLICY "Anonymous can update lead tracking"
    ON public.lead_tracking
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);
  END IF;
END $$;