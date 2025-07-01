
-- Inserisci il ruolo di admin per l'utente attualmente loggato
-- Sostituisci 'bcb145b6-7682-4c10-9b03-ed3af445178b' con il tuo user ID se diverso
INSERT INTO public.user_roles (user_id, role)
VALUES ('bcb145b6-7682-4c10-9b03-ed3af445178b', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;
