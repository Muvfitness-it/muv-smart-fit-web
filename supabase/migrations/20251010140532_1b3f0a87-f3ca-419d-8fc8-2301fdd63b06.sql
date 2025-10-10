-- Create small_group_schedule table for visual course planner
CREATE TABLE IF NOT EXISTS public.small_group_schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_name TEXT NOT NULL,
  course_type TEXT NOT NULL,
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6),
  start_time TIME NOT NULL,
  end_time TIME NOT NULL,
  instructor TEXT,
  room TEXT,
  color TEXT DEFAULT '#FF6B35',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.small_group_schedule ENABLE ROW LEVEL SECURITY;

-- Public can view active schedules
CREATE POLICY "Anyone can view active schedules"
ON public.small_group_schedule
FOR SELECT
USING (is_active = true);

-- Only admins can manage schedules
CREATE POLICY "Admins can manage schedules"
ON public.small_group_schedule
FOR ALL
USING (public.current_user_has_role('admin'::app_role))
WITH CHECK (public.current_user_has_role('admin'::app_role));

-- Create indexes for performance
CREATE INDEX idx_schedule_day_active ON public.small_group_schedule(day_of_week, is_active);
CREATE INDEX idx_schedule_time ON public.small_group_schedule(start_time, end_time);

-- Trigger to update updated_at
CREATE TRIGGER update_schedule_updated_at
BEFORE UPDATE ON public.small_group_schedule
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for 8 courses
INSERT INTO public.small_group_schedule (course_name, course_type, day_of_week, start_time, end_time, instructor, room, color) VALUES
-- Lunedì
('Postural Pilates', 'postural-pilates', 1, '09:00', '10:00', 'Sara M.', 'Sala 1', '#8B5CF6'),
('GAG', 'gag', 1, '18:00', '19:00', 'Marco R.', 'Sala 2', '#EF4444'),
('Tabata', 'tabata', 1, '19:30', '20:30', 'Luca T.', 'Sala 1', '#F59E0B'),

-- Martedì
('Ginnastica Dolce', 'ginnastica-dolce', 2, '10:00', '11:00', 'Elena V.', 'Sala 1', '#10B981'),
('Music Pump', 'music-pump', 2, '18:30', '19:30', 'Marco R.', 'Sala 2', '#EC4899'),

-- Mercoledì
('Pancafit', 'pancafit', 3, '09:00', '10:00', 'Sara M.', 'Sala 1', '#3B82F6'),
('Funzionale', 'funzionale', 3, '19:00', '20:00', 'Luca T.', 'Sala 2', '#F97316'),

-- Giovedì
('Total Body', 'total-body', 4, '09:30', '10:30', 'Marco R.', 'Sala 1', '#14B8A6'),
('Postural Pilates', 'postural-pilates', 4, '18:00', '19:00', 'Sara M.', 'Sala 1', '#8B5CF6'),

-- Venerdì
('GAG', 'gag', 5, '09:00', '10:00', 'Elena V.', 'Sala 2', '#EF4444'),
('Tabata', 'tabata', 5, '19:30', '20:30', 'Luca T.', 'Sala 1', '#F59E0B'),

-- Sabato
('Funzionale', 'funzionale', 6, '10:00', '11:00', 'Marco R.', 'Sala 1', '#F97316'),
('Music Pump', 'music-pump', 6, '11:30', '12:30', 'Luca T.', 'Sala 2', '#EC4899');