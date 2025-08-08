import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import ArticleManager from '@/components/blog/ArticleManager';
import SimpleProtectedRoute from '@/components/blog/SimpleProtectedRoute';

const BlogManager = () => {
  const [seeding, setSeeding] = useState(false);
  const { toast } = useToast();

  const LOGO_URL = '/lovable-uploads/29b9c5b1-c958-454c-9d7f-5d1c1b4f38ff.png';

  const loadImage = (url: string) =>
    new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = url;
    });

  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    maxWidth: number,
    lineHeight: number
  ) => {
    const words = text.split(' ');
    let line = '';
    const lines: string[] = [];

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        lines.push(line.trim());
        line = words[n] + ' ';
      } else {
        line = testLine;
      }
    }
    lines.push(line.trim());

    lines.forEach((l, i) => {
      ctx.fillText(l, x, y + i * lineHeight);
    });

    return lines.length;
  };

  const generateFeaturedImage = async (title: string, logoUrl: string, width = 1200, height = 630) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas non supportato');

    // Background gradient brand
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, '#A21CAF'); // magenta brand
    gradient.addColorStop(1, '#1D4ED8'); // blue brand
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Subtle overlay
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    for (let i = 0; i < width; i += 60) {
      ctx.fillRect(i, 0, 30, height);
    }

    // Title
    const padding = 72;
    ctx.fillStyle = 'white';
    ctx.font = '700 58px Inter, Roboto, system-ui, Arial';
    ctx.textBaseline = 'top';
    const maxTextWidth = width - padding * 2;
    const startY = padding;
    const lineHeight = 68;
    const linesUsed = wrapText(ctx, title, padding, startY, maxTextWidth, lineHeight);

    // Logo in basso a destra
    const logo = await loadImage(logoUrl);
    const logoTargetWidth = 220;
    const aspect = logo.height / logo.width;
    const logoTargetHeight = Math.round(logoTargetWidth * aspect);
    ctx.drawImage(logo, width - padding - logoTargetWidth, height - padding - logoTargetHeight, logoTargetWidth, logoTargetHeight);

    // Footer bar
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.fillRect(0, height - 90, width, 90);
    ctx.fillStyle = 'white';
    ctx.font = '600 28px Inter, Roboto, system-ui, Arial';
    ctx.fillText('MUV Fitness • Legnago', padding, height - 65);

    const blob: Blob = await new Promise((resolve, reject) =>
      canvas.toBlob((b) => (b ? resolve(b) : reject(new Error('Impossibile creare immagine'))), 'image/png')
    );
    return blob;
  };

  const processPosts = async (slugs?: string[]) => {
    let posts: { id: string; title: string; slug: string }[] = [];

    if (slugs && slugs.length) {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug')
        .in('slug', slugs);
      if (error) throw error;
      posts = data || [];
    } else {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, slug, featured_image, status')
        .is('featured_image', null)
        .eq('status', 'draft');
      if (error) throw error;
      posts = (data || []).map((p: any) => ({ id: p.id, title: p.title, slug: p.slug }));
    }

    let success = 0;
    for (const post of posts) {
      try {
        const blob = await generateFeaturedImage(post.title, LOGO_URL);
        const path = `blog/featured/${post.slug}.png`;
        await supabase.storage.from('immagini').upload(path, blob, { upsert: true, contentType: 'image/png' });
        const { data: pub } = await supabase.storage.from('immagini').getPublicUrl(path);
        await supabase.from('blog_posts').update({ featured_image: pub.publicUrl }).eq('id', post.id);
        success++;
      } catch (err) {
        console.error('Errore generazione immagine per', post.slug, err);
      }
    }
    return success;
  };

  const handleSeedDrafts = async () => {
    try {
      setSeeding(true);
      const { data, error } = await supabase.functions.invoke('seed-blog-drafts', { body: { applyToExisting: true } });
      if (error) throw error;
      const created = data?.created || 0;
      const upgraded = data?.upgraded || 0;
      const imagesGenerated = data?.imagesGenerated || 0;
      toast({ title: 'Bozze aggiornate', description: `${created} nuove bozze, ${upgraded} bozze estese, ${imagesGenerated} immagini generate` });
    } catch (e: any) {
      toast({ title: 'Errore', description: e.message || 'Impossibile completare l’operazione', variant: 'destructive' });
    } finally {
      setSeeding(false);
    }
  };
  useEffect(() => {
    const key = 'muv_blog_seed_once';
    if (!localStorage.getItem(key)) {
      // Avvio automatico: crea/aggiorna bozze e immagini
      handleSeedDrafts();
      localStorage.setItem(key, '1');
    }
  }, []);
  return (
    <SimpleProtectedRoute>
      <div className="min-h-screen bg-background pt-[var(--header-height)]">
        <Helmet>
          <title>Gestione Articoli - MUV Fitness Blog</title>
          <meta name="description" content="Gestisci tutti i tuoi articoli del blog MUV Fitness" />
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>

        <div className="flex items-center justify-between mb-4">
          <h1 className="sr-only">Gestione Articoli</h1>
          <Button onClick={handleSeedDrafts} disabled={seeding} className="ml-auto">
            {seeding ? 'Creo/aggiorno bozze e immagini…' : 'Crea/aggiorna bozze (2000+ parole) + 2 immagini'}
          </Button>
        </div>

        <ArticleManager />
      </div>
    </SimpleProtectedRoute>
  );
};

export default BlogManager;