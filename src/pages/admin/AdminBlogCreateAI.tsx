import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useAdvancedArticleGenerator, ArticleResponse } from "@/hooks/useAdvancedArticleGenerator";
import { supabase } from "@/integrations/supabase/client";
import { SecureHTMLRenderer } from "@/components/security/SecureHTMLRenderer";
import { ImageWithLogo } from "@/components/ui/ImageWithLogo";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";

import { Loader2, Wand2, CheckCircle2, CalendarClock } from "lucide-react";

// Simple slugify
const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const tones = [
  { value: "professionale", label: "Professionale" },
  { value: "amichevole", label: "Amichevole" },
  { value: "motivazionale", label: "Motivazionale" },
  { value: "educativo", label: "Educativo" },
  { value: "coinvolgente", label: "Coinvolgente" },
  { value: "tecnico", label: "Tecnico" },
  { value: "narrativo", label: "Narrativo" },
];

const wordOptions = [1000, 2000, 3000];
const qualityOptions = [
  { value: "openai", label: "ChatGPT (OpenAI)" },
  { value: "pro", label: "Gemini Pro (Qualità)" },
  { value: "flash", label: "Gemini Flash (Veloce)" },
];

const AdminBlogCreateAI: React.FC = () => {
  const navigate = useNavigate();
  const { generateArticle } = useAdvancedArticleGenerator();

  // Form state
  const [topic, setTopic] = useState("");
  const [words, setWords] = useState<number>(2000);
  const [tone, setTone] = useState<string>("coinvolgente");
  const [additionalContext, setAdditionalContext] = useState("");
  const [qualityModel, setQualityModel] = useState<'openai' | 'pro' | 'flash'>('openai');
  const [createImage, setCreateImage] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generated content
  const [generatedArticle, setGeneratedArticle] = useState<ArticleResponse | null>(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  // Publish options
  const [publishMode, setPublishMode] = useState<"now" | "schedule" | "draft">("draft");
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);

  // Computed values from generated article
  const title = generatedArticle?.title || "";
  const slug = generatedArticle?.slug || "";
  const hook = generatedArticle?.hook || "";
  const contentHTML = generatedArticle?.content || "";
  const excerpt = generatedArticle?.excerpt || "";
  const metaTitle = generatedArticle?.metaTitle || title;
  const metaDescription = generatedArticle?.metaDescription || excerpt;

  // Removed DOMPurify usage - using SecureHTMLRenderer instead

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({ 
        title: "Argomento mancante", 
        description: "Inserisci un argomento prima di generare l'articolo.", 
        variant: "destructive" 
      });
      return;
    }

    try {
      setIsGenerating(true);
      
      const article = await generateArticle({
        topic: topic.trim(),
        wordCount: words,
        tone,
        additionalContext: additionalContext.trim() || undefined,
        qualityModel,
        createImage
      });

      setGeneratedArticle(article);
      
      toast({ 
        title: "Articolo generato con successo!", 
        description: "Controlla il contenuto e personalizzalo se necessario." 
      });
      
    } catch (error: any) {
      console.error('Generation error:', error);
      toast({ 
        title: "Errore nella generazione", 
        description: error.message || "Impossibile generare l'articolo. Riprova.", 
        variant: "destructive" 
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (mode: "now" | "schedule" | "draft") => {
    if (!title.trim() || !contentHTML.trim()) {
      toast({ title: "Dati insufficienti", description: "Titolo e contenuto sono obbligatori.", variant: "destructive" });
      return;
    }

    const finalSlug = slug || slugify(title);

    const payload: any = {
      title,
      slug: finalSlug,
      content: contentHTML,
      excerpt: excerpt || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
      featured_image_url: generatedImageUrl || null,
      status: mode === "now" ? "published" : mode === "schedule" ? "scheduled" : "draft",
      published_at: mode === "now" ? new Date().toISOString() : null,
      scheduled_publish_at: mode === "schedule" && scheduleDate ? new Date(scheduleDate).toISOString() : null,
      author_name: "MUV Team",
    };

    const { error } = await supabase.from("blog_posts").insert([payload]);
    if (error) {
      toast({ title: "Errore salvataggio", description: error.message, variant: "destructive" });
      return;
    }

    toast({ title: "Articolo salvato", description: mode === "now" ? "Pubblicato con successo" : mode === "schedule" ? "Programmato" : "Salvato in bozza" });
    navigate("/admin-control");
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Crea Articolo con IA - MUV Fitness</title>
        <meta name="description" content="Genera e pubblica articoli ottimizzati SEO con IA" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="/admin/blog/create/ai" />
      </Helmet>

      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">Creazione Articolo con IA</h1>
          <p className="text-muted-foreground">Imposta argomento, lunghezza e tono. Visualizza l'anteprima e pubblica o programma.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Impostazioni IA</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Argomento</Label>
                <Input 
                  id="topic" 
                  placeholder="Es. Benefici dell'allenamento EMS per il recupero muscolare" 
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                  className="text-foreground"
                />
              </div>

              <div className="space-y-2">
                <Label>Numero parole</Label>
                <Select value={String(words)} onValueChange={(v) => setWords(Number(v))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona" />
                  </SelectTrigger>
                  <SelectContent>
                    {wordOptions.map((w) => (
                      <SelectItem key={w} value={String(w)}>{w} parole</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tono</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona il tono" />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Modello IA</Label>
                <Select value={qualityModel} onValueChange={(v: 'openai' | 'pro' | 'flash') => setQualityModel(v)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona modello" />
                  </SelectTrigger>
                  <SelectContent>
                    {qualityOptions.map((q) => (
                      <SelectItem key={q.value} value={q.value}>{q.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="createImage"
                  checked={createImage}
                  onChange={(e) => setCreateImage(e.target.checked)}
                  className="rounded border border-border"
                />
                <Label htmlFor="createImage" className="text-sm font-medium">
                  Crea immagine con logo MUV
                </Label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="context">Contesto aggiuntivo (opzionale)</Label>
                <Textarea 
                  id="context"
                  placeholder="Aggiungi dettagli specifici, target audience, obiettivi particolari..."
                  value={additionalContext}
                  onChange={(e) => setAdditionalContext(e.target.value)}
                  rows={3}
                  className="text-foreground"
                />
              </div>

              <Button onClick={handleGenerate} disabled={isGenerating || !topic.trim()} className="w-full">
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                {isGenerating ? "Generazione in corso..." : "Genera articolo"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pubblicazione</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2">
                <Button variant={publishMode === "draft" ? "default" : "outline"} onClick={() => setPublishMode("draft")}>
                  Bozza
                </Button>
                <Button variant={publishMode === "now" ? "default" : "outline"} onClick={() => setPublishMode("now")}>
                  Subito
                </Button>
                <Button variant={publishMode === "schedule" ? "default" : "outline"} onClick={() => setPublishMode("schedule")}>
                  Programma
                </Button>
              </div>

              {publishMode === "schedule" && (
                <div className="space-y-2">
                  <Label>Data pubblicazione</Label>
                  <div className="flex items-center gap-2">
                    <CalendarClock className="w-4 h-4 text-muted-foreground" />
                    <Calendar selected={scheduleDate} onSelect={setScheduleDate} mode="single" className="rounded-md border" />
                  </div>
                </div>
              )}

              <Button className="w-full" onClick={() => handleSave(publishMode)} disabled={!generatedArticle}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Salva
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          {createImage && (
            <Card>
              <CardHeader>
                <CardTitle>Immagine con Logo MUV</CardTitle>
              </CardHeader>
              <CardContent>
                <ImageWithLogo 
                  prompt={generatedArticle?.image_prompt || ''}
                  onImageGenerated={setGeneratedImageUrl}
                />
                {!generatedArticle?.image_prompt && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Genera prima l'articolo per ottenere il prompt dell'immagine
                  </p>
                )}
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Anteprima e Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedArticle ? (
                <>
                  <div className="space-y-2">
                    <Label>Titolo</Label>
                    <Input 
                      value={title} 
                      onChange={(e) => setGeneratedArticle(prev => prev ? {...prev, title: e.target.value} : null)} 
                      placeholder="Titolo dell'articolo" 
                      className="text-foreground font-medium"
                    />
                  </div>
                  {hook && (
                    <div className="space-y-2">
                      <Label>Hook di apertura</Label>
                      <Textarea 
                        value={hook} 
                        onChange={(e) => setGeneratedArticle(prev => prev ? {...prev, hook: e.target.value} : null)} 
                        rows={2} 
                        placeholder="Frase di apertura coinvolgente" 
                        className="text-foreground font-medium bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label>Estratto</Label>
                    <Textarea 
                      value={excerpt} 
                      onChange={(e) => setGeneratedArticle(prev => prev ? {...prev, excerpt: e.target.value} : null)} 
                      rows={3} 
                      placeholder="Breve riassunto (2-3 frasi)" 
                      className="text-foreground"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Slug URL</Label>
                      <Input value={slug} readOnly className="bg-muted text-muted-foreground text-xs" />
                    </div>
                    <div className="space-y-2">
                      <Label>Parole generate</Label>
                      <Input value={`${generatedArticle.word_count_target || words} parole target`} readOnly className="bg-muted text-muted-foreground text-xs" />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Meta Title</Label>
                      <div className="flex items-center gap-2">
                        <Input value={metaTitle} readOnly className="bg-muted text-muted-foreground text-xs" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(metaTitle)}
                          className="shrink-0"
                        >
                          Copia
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Meta Description</Label>
                      <div className="flex items-center gap-2">
                        <Input value={metaDescription} readOnly className="bg-muted text-muted-foreground text-xs" />
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(metaDescription)}
                          className="shrink-0"
                        >
                          Copia
                        </Button>
                      </div>
                    </div>
                  </div>
                  {generatedArticle.keywords && generatedArticle.keywords.length > 0 && (
                    <div className="space-y-2">
                      <Label>Keywords SEO</Label>
                      <div className="flex flex-wrap gap-2">
                        {generatedArticle.keywords.map((keyword, index) => (
                          <span key={index} className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {generatedArticle.headings && (
                    <div className="space-y-2">
                      <Label>Struttura contenuto</Label>
                      <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md text-sm">
                        <div className="font-semibold text-blue-700 dark:text-blue-300">H1: {generatedArticle.headings.h1}</div>
                        <div className="text-muted-foreground text-xs mb-2">
                          H2: {generatedArticle.headings.h2.length} sezioni • H3: {generatedArticle.headings.h3.length} sottosezioni
                          {generatedArticle.provider_used && ` • Provider: ${generatedArticle.provider_used}`}
                        </div>
                        {generatedArticle.headings.h2.map((h2, i) => (
                          <div key={i} className="ml-2 text-green-700 dark:text-green-300">H2: {h2}</div>
                        ))}
                        {generatedArticle.headings.h3.map((h3, i) => (
                          <div key={i} className="ml-4 text-orange-700 dark:text-orange-300">H3: {h3}</div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">Genera un articolo per vedere l'anteprima qui</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contenuto Generato</CardTitle>
            </CardHeader>
            <CardContent>
              {contentHTML ? (
                <div className="border rounded-lg p-6 bg-card">
                  {hook && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
                      <p className="text-lg font-medium text-blue-900 dark:text-blue-100 italic">
                        "{hook}"
                      </p>
                    </div>
                  )}
                  <SecureHTMLRenderer
                    html={contentHTML}
                    className="prose prose-lg max-w-none prose-headings:text-foreground prose-p:text-foreground prose-strong:text-foreground prose-em:text-foreground prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-table:text-foreground prose-th:bg-slate-900 prose-th:text-white prose-td:border prose-td:border-slate-300"
                  />
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-muted rounded-lg">
                  <Wand2 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">Genera l'articolo per vedere l'anteprima qui</p>
                  <p className="text-muted-foreground/60 text-sm mt-2">Il contenuto apparirà qui una volta generato</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCreateAI;
