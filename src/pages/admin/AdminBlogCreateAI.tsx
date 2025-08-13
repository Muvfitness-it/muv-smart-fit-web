import React, { useMemo, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useGeminiAPI } from "@/hooks/useGeminiAPI";
import { supabase } from "@/integrations/supabase/client";
import { SecureHTMLRenderer } from "@/components/security/SecureHTMLRenderer";
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
];

const wordOptions = [600, 1000, 1500, 2000];

const AdminBlogCreateAI: React.FC = () => {
  const navigate = useNavigate();
  const { callGeminiAPI } = useGeminiAPI();

  // Form state
  const [topic, setTopic] = useState("");
  const [words, setWords] = useState<number>(1000);
  const [tone, setTone] = useState<string>("professionale");
  const [isGenerating, setIsGenerating] = useState(false);

  // Generated preview
  const [title, setTitle] = useState("");
  const [contentHTML, setContentHTML] = useState("");
  const [excerpt, setExcerpt] = useState("");

  // Publish options
  const [publishMode, setPublishMode] = useState<"now" | "schedule" | "draft">("draft");
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);

  const metaTitle = useMemo(() => (title?.length > 57 ? `${title.substring(0, 57)}…` : title), [title]);
  const metaDescription = useMemo(() => {
    const base = excerpt || (contentHTML ? contentHTML.replace(/<[^>]+>/g, " ").slice(0, 180) : "");
    return base.length > 157 ? `${base.substring(0, 157)}…` : base;
  }, [excerpt, contentHTML]);

  // Removed DOMPurify usage - using SecureHTMLRenderer instead

  const handleGenerate = async () => {
    if (!topic.trim()) {
      toast({ title: "Argomento mancante", description: "Inserisci un argomento prima di generare.", variant: "destructive" });
      return;
    }
    try {
      setIsGenerating(true);
      const prompt = `Scrivi un articolo in italiano, altamente umanizzato, naturale e coinvolgente, su: "${topic.trim()}". \n\nRequisiti: \n- Lunghezza: ~${words} parole. \n- Tono: ${tone}. \n- Ottimizzazione SEO completa (H2/H3, paragrafi brevi, bullet dove utili, call-to-action finale). \n- Evita toni robotici, usa esempi pratici e frasi variabili. \n- Non inserire affermazioni mediche senza disclaimer. \n- Includi: \n  1) Titolo H1 proposto, \n  2) Meta description (<=160 caratteri), \n  3) Estratto (2-3 frasi), \n  4) Contenuto HTML pulito (solo tag semantici: h2, h3, p, ul, li, strong, em, blockquote, a).`;

      const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
      const data = await callGeminiAPI(payload);
      // Prova a estrarre testo
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || data?.content || "";

      // Strategy: try to split blocks by markers if present, fallback to heuristic
      const tTitle = (/Titolo H1\s*:?\s*(.*)/i.exec(text)?.[1] || topic).trim();
      const tMeta = (/Meta description\s*:?\s*([\s\S]*?)(\n|$)/i.exec(text)?.[1] || "").trim();
      const tExcerpt = (/Estratto\s*:?\s*([\s\S]*?)(\n\n|$)/i.exec(text)?.[1] || "").trim();
      // Heuristic to find HTML content
      const htmlMatch = text.match(/<h2[\s\S]*$/i);
      const tContent = htmlMatch ? htmlMatch[0] : `<p>${text.replace(/\n/g, "<br />")}</p>`;

      setTitle(tTitle);
      setExcerpt(tExcerpt || tMeta);
      setContentHTML(tContent);

      toast({ title: "Bozza generata", description: "Controlla titolo, estratto e contenuto." });
    } catch (e: any) {
      toast({ title: "Errore generazione", description: e.message || "Impossibile generare l'articolo.", variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async (mode: "now" | "schedule" | "draft") => {
    if (!title.trim() || !contentHTML.trim()) {
      toast({ title: "Dati insufficienti", description: "Titolo e contenuto sono obbligatori.", variant: "destructive" });
      return;
    }

    const slug = slugify(title);

    const payload: any = {
      title,
      slug,
      content: contentHTML,
      excerpt: excerpt || null,
      meta_title: metaTitle || null,
      meta_description: metaDescription || null,
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
    navigate("/admin/blog");
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
                <Input id="topic" placeholder="Es. Allenamento EMS per principianti" value={topic} onChange={(e) => setTopic(e.target.value)} />
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

              <Button onClick={handleGenerate} disabled={isGenerating} className="w-full">
                {isGenerating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Wand2 className="w-4 h-4 mr-2" />}
                Genera bozza
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

              <Button className="w-full" onClick={() => handleSave(publishMode)} disabled={!contentHTML || !title}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Salva
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Anteprima e Meta</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Titolo</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titolo dell'articolo" />
              </div>
              <div className="space-y-2">
                <Label>Estratto</Label>
                <Textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} rows={3} placeholder="Breve riassunto (2-3 frasi)" />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Meta Title</Label>
                  <Input value={metaTitle} readOnly />
                </div>
                <div className="space-y-2">
                  <Label>Meta Description</Label>
                  <Input value={metaDescription} readOnly />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contenuto Generato</CardTitle>
            </CardHeader>
            <CardContent>
              {contentHTML ? (
                <SecureHTMLRenderer
                  html={contentHTML}
                  className="prose prose-invert max-w-none"
                />
              ) : (
                <p className="text-muted-foreground">Genera l'articolo per vedere l'anteprima qui.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCreateAI;
