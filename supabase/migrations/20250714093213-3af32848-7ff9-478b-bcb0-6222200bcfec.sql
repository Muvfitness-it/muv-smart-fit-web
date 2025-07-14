-- Create bookings table for appointment system
CREATE TABLE public.bookings (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    service_type TEXT NOT NULL,
    preferred_date DATE NOT NULL,
    preferred_time TIME NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    confirmed_at TIMESTAMP WITH TIME ZONE,
    cancelled_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Enable RLS
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Anyone can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Users can update their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all bookings" 
ON public.bookings 
FOR ALL 
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles 
        WHERE user_id = auth.uid() 
        AND role = 'admin'
    )
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.update_bookings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.update_bookings_updated_at();

-- Create lead tracking table
CREATE TABLE public.lead_tracking (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT,
    ip_address TEXT,
    user_agent TEXT,
    referrer TEXT,
    utm_source TEXT,
    utm_medium TEXT,
    utm_campaign TEXT,
    landing_page TEXT,
    pages_visited INTEGER DEFAULT 1,
    time_on_site INTEGER, -- seconds
    form_submissions INTEGER DEFAULT 0,
    booking_completed BOOLEAN DEFAULT false,
    conversion_value DECIMAL(10,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for lead tracking
ALTER TABLE public.lead_tracking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service can manage lead tracking" 
ON public.lead_tracking 
FOR ALL 
USING (true);

-- Create index for performance
CREATE INDEX idx_bookings_date_time ON public.bookings(preferred_date, preferred_time);
CREATE INDEX idx_bookings_status ON public.bookings(status);
CREATE INDEX idx_bookings_service_type ON public.bookings(service_type);
CREATE INDEX idx_lead_tracking_session ON public.lead_tracking(session_id);
CREATE INDEX idx_lead_tracking_created_at ON public.lead_tracking(created_at);