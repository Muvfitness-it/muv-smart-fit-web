-- Tabella per storico metriche GSC giornaliere
CREATE TABLE IF NOT EXISTS gsc_metrics_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  check_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  metric_type TEXT NOT NULL CHECK (metric_type IN ('site', 'page')),
  url TEXT,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  ctr NUMERIC(5,2) NOT NULL DEFAULT 0,
  position NUMERIC(5,2) NOT NULL DEFAULT 0,
  period_days INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indici per query veloci
CREATE INDEX idx_gsc_metrics_check_date ON gsc_metrics_history(check_date DESC);
CREATE INDEX idx_gsc_metrics_url ON gsc_metrics_history(url) WHERE url IS NOT NULL;
CREATE INDEX idx_gsc_metrics_type ON gsc_metrics_history(metric_type);

-- RLS Policy (solo admin)
ALTER TABLE gsc_metrics_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view GSC metrics" ON gsc_metrics_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Tabella per storico alert
CREATE TABLE IF NOT EXISTS gsc_alert_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('warning', 'critical')),
  metric_name TEXT NOT NULL,
  current_value NUMERIC NOT NULL,
  previous_value NUMERIC NOT NULL,
  change_percentage NUMERIC(5,2) NOT NULL,
  alert_message TEXT NOT NULL,
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Indici
CREATE INDEX idx_gsc_alert_date ON gsc_alert_history(alert_date DESC);
CREATE INDEX idx_gsc_alert_type ON gsc_alert_history(alert_type);

-- RLS Policy
ALTER TABLE gsc_alert_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view alerts" ON gsc_alert_history
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.raw_app_meta_data->>'role' = 'admin'
    )
  );

-- Cron job: Traccia metriche GSC ogni giorno alle 2:00 AM
SELECT cron.schedule(
  'gsc-metrics-daily-tracker',
  '0 2 * * *',
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/gsc-metrics-tracker',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);

-- Cron job: Verifica alert ogni giorno alle 3:00 AM
SELECT cron.schedule(
  'gsc-metrics-daily-alert',
  '0 3 * * *',
  $$
  SELECT net.http_post(
    url := 'https://baujoowgqeyraqnukkmw.supabase.co/functions/v1/gsc-metrics-alert',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || current_setting('app.settings.service_role_key')
    ),
    body := '{}'::jsonb
  ) AS request_id;
  $$
);