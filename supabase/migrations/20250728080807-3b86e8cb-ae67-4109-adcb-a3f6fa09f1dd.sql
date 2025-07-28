-- Pulizia completa del database per ripartire da zero
-- Elimina tutti i dati dalle tabelle degli utenti

DELETE FROM public.admin_users;
DELETE FROM public.profiles; 
DELETE FROM public.ai_tokens;
DELETE FROM public.meal_plans;
DELETE FROM public.body_measurements;
DELETE FROM public.food_diary;