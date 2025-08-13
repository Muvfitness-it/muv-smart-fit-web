import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "@/hooks/use-toast";
import { CheckCircle2, CalendarClock, Image as ImageIcon } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const AdminBlogCreateManual: React.FC = () => {
  const navigate = useNavigate();
  const quillRef = useRef<ReactQuill | null>(null);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  const [publishMode, setPublishMode] = useState<"now" | "schedule" | "draft">("draft");
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (title) setSlug(slugify(title));
  }, [title]);

  const metaTitle = useMemo(() => (title?.length > 57 ? `${title.substring(0, 57)}…` : title), [title]);
  const metaDescription = useMemo(() => {
    const base = description || content.replace(/<[^>]+>/g, " ").slice(0, 180);
    return base.length > 157 ? `${base.substring(0, 157)}…` : base;
  }, [description, content]);

  const handleImageUpload = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = (input.files && input.files[0]) || null;
      if (!file) return;
      try {
        const path = `blog/${Date.now()}-${file.name}`;
        const { error } = await supabase.storage.from("immagini").upload(path, file, { upsert: false });
        if (error) throw error;
        const { data } = supabase.storage.from("immagini").getPublicUrl(path);
        const url = data.publicUrl;
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);
        if (range) {
          editor!.insertEmbed(range.index, "image", url, "user");
          editor!.setSelection(range.index + 1, 0);
        } else {
          editor?.insertEmbed(0, "image", url, "user");
        }
        toast({ title: "Immagine caricata", description: "L'immagine è stata inserita nell'articolo." });
      } catch (e: any) {
        toast({ title: "Upload fallito", description: e.message, variant: "destructive" });
      }
    };
    input.click();
  };

  const modules = {
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        ["blockquote", "link", "clean"],
        ["image"],
      ],
      handlers: {
        image: handleImageUpload,
      },
    },
  } as const;

  const handleSave = async (mode: "now" | "schedule" | "draft") => {
    if (!title.trim() || !content.trim()) {
      toast({ title: "Dati insufficienti", description: "Titolo e contenuto sono obbligatori.", variant: "destructive" });
      return;
    }

    const payload: any = {
      title,
      slug: slug || slugify(title),
      excerpt: description || null,
      content,
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
        <title>Crea Articolo Manuale - MUV Fitness</title>
        <meta name="description" content="Editor avanzato per creare articoli ottimizzati SEO" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="/admin/blog/create/manual" />
      </Helmet>

      <div className="border-b border-border bg-card/50">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl md:text-3xl font-bold">Creazione Articolo Manuale</h1>
          <p className="text-muted-foreground">Titolo, slug automatico, descrizione e editor ricco con immagini e link.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dettagli</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo</Label>
                <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Titolo dell'articolo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (automatico)</Label>
                <Input id="slug" value={slug} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" value={description} onChange={(e) => setDescription(e.target.value)} rows={4} placeholder="Breve descrizione/estratto" />
              </div>

              <div className="space-y-2">
                <Label>Meta Title</Label>
                <Input value={metaTitle} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Meta Description</Label>
                <Input value={metaDescription} readOnly />
              </div>

              <div className="space-y-2">
                <Label>Pubblicazione</Label>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant={publishMode === "draft" ? "default" : "outline"} onClick={() => setPublishMode("draft")}>Bozza</Button>
                  <Button variant={publishMode === "now" ? "default" : "outline"} onClick={() => setPublishMode("now")}>Subito</Button>
                  <Button variant={publishMode === "schedule" ? "default" : "outline"} onClick={() => setPublishMode("schedule")}>Programma</Button>
                </div>
                {publishMode === "schedule" && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center gap-2">
                      <CalendarClock className="w-4 h-4 text-muted-foreground" />
                      <Calendar selected={scheduleDate} onSelect={setScheduleDate} mode="single" className="rounded-md border" />
                    </div>
                  </div>
                )}
              </div>

              <Button className="w-full" onClick={() => handleSave(publishMode)}>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Salva
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle>Editor Contenuto</CardTitle>
              <Button type="button" variant="outline" onClick={handleImageUpload}>
                <ImageIcon className="w-4 h-4 mr-2" /> Carica immagine
              </Button>
            </CardHeader>
            <CardContent>
              <div className="prose prose-invert max-w-none">
                <ReactQuill
                  ref={quillRef}
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminBlogCreateManual;
