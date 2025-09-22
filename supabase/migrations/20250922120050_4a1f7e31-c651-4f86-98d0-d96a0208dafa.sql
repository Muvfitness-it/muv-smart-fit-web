-- Try to set security_invoker on the view (Postgres 15+)
ALTER VIEW public.blog_articles_public SET (security_invoker = true);

-- Also set security_barrier for safety
ALTER VIEW public.blog_articles_public SET (security_barrier = true);

COMMENT ON VIEW public.blog_articles_public IS 'Public view for published blog articles. security_invoker=true enforces caller RLS; security_barrier limits predicate pushdown.';