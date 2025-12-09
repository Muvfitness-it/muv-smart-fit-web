import { useState } from "react";
import { Facebook, Instagram, Linkedin, MessageCircle, ExternalLink, Check, Download, Copy, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

interface SharePreferences {
  facebook?: boolean;
  instagram?: boolean;
  linkedin?: boolean;
  whatsapp?: boolean;
}

interface SocialShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  articleTitle: string;
  articleUrl: string;
  articleImage?: string;
  sharePreferences: SharePreferences;
}

const SOCIAL_LINKS = {
  facebookPage: "https://www.facebook.com/MuvLegnago/",
  instagramProfile: "https://www.instagram.com/muvlegnago/",
};

const generateFacebookText = (title: string, url: string) => {
  return `${title} 💪

Leggi l'articolo completo sul nostro blog:
👉 ${url}

#MUVFitness #Legnago #PersonalTrainer #Fitness`;
};

const generateInstagramText = (title: string) => {
  return `${title} 💪

🏋️ Scopri tutti i dettagli sul nostro blog!
🔗 Link in bio: muvfitness.it

📍 MUV Fitness Legnago
Il fitness intelligente è arrivato.

#MUVFitness #MUVLegnago #FitnessLegnago #PersonalTrainerLegnago #Dimagrimento #Tonificazione #EMSTraining #PilatesReformer #VacuumTherapy #Pressoterapia #Pancafit #CentroFitness #Wellness #Benessere #Allenamento #Trasformazione #FitLife #HealthyLifestyle #WorkoutMotivation`;
};

const SocialShareModal = ({
  open,
  onOpenChange,
  articleTitle,
  articleUrl,
  articleImage,
  sharePreferences,
}: SocialShareModalProps) => {
  const [facebookCopied, setFacebookCopied] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);
  const [showFacebookInstructions, setShowFacebookInstructions] = useState(false);
  const [showInstagramInstructions, setShowInstagramInstructions] = useState(false);
  const [downloading, setDownloading] = useState(false);
  
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);

  const shareUrls = {
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleFacebookProfileShare = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
    window.open(url, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleCopyFacebookText = async () => {
    const text = generateFacebookText(articleTitle, articleUrl);
    try {
      await navigator.clipboard.writeText(text);
      setFacebookCopied(true);
      setShowFacebookInstructions(true);
      toast.success("Testo copiato per Facebook!", {
        description: "Ora incollalo sulla pagina MuvLegnago",
      });
      setTimeout(() => setFacebookCopied(false), 3000);
    } catch {
      fallbackCopyText(text);
      setFacebookCopied(true);
      setShowFacebookInstructions(true);
      toast.success("Testo copiato per Facebook!");
      setTimeout(() => setFacebookCopied(false), 3000);
    }
  };

  const handleInstagramShare = async () => {
    const text = generateInstagramText(articleTitle);
    try {
      await navigator.clipboard.writeText(text);
      setInstagramCopied(true);
      setShowInstagramInstructions(true);
      toast.success("Testo copiato per Instagram!", {
        description: "Segui le istruzioni per postare su @muvlegnago",
      });
      setTimeout(() => setInstagramCopied(false), 3000);
    } catch {
      fallbackCopyText(text);
      setInstagramCopied(true);
      setShowInstagramInstructions(true);
      toast.success("Testo copiato per Instagram!");
      setTimeout(() => setInstagramCopied(false), 3000);
    }
  };

  const fallbackCopyText = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  const handleDownloadImage = async () => {
    if (!articleImage) {
      toast.error("Nessuna immagine disponibile");
      return;
    }
    
    setDownloading(true);
    try {
      const response = await fetch(articleImage);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const fileName = articleTitle.replace(/[^a-zA-Z0-9]/g, "-").toLowerCase();
      a.download = `${fileName}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Immagine scaricata!");
    } catch (error) {
      console.error("Error downloading image:", error);
      toast.error("Errore nel download dell'immagine");
    } finally {
      setDownloading(false);
    }
  };

  const openExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const activePlatforms = Object.entries(sharePreferences)
    .filter(([_, enabled]) => enabled)
    .map(([platform]) => platform as keyof SharePreferences);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            🎉 Articolo Pubblicato!
          </DialogTitle>
          <DialogDescription>
            Condividi l'articolo sulle pagine social aziendali
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Article Preview */}
          <div className="flex gap-4 p-4 bg-muted/50 rounded-lg border">
            {articleImage && (
              <img
                src={articleImage}
                alt=""
                className="w-20 h-20 object-cover rounded-lg shrink-0"
              />
            )}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm line-clamp-2 mb-1">
                {articleTitle}
              </h4>
              <p className="text-xs text-muted-foreground truncate">
                {articleUrl}
              </p>
            </div>
          </div>

          {/* Facebook Section */}
          {activePlatforms.includes("facebook") && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-[#1877F2]">
                <Facebook className="h-5 w-5" />
                <span>Facebook</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <Button
                  onClick={handleFacebookProfileShare}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Profilo personale
                </Button>
                <Button
                  onClick={handleCopyFacebookText}
                  size="sm"
                  className={`text-xs ${facebookCopied ? "bg-green-600 hover:bg-green-600" : "bg-[#1877F2] hover:bg-[#1877F2]/90"} text-white`}
                >
                  {facebookCopied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                  {facebookCopied ? "Copiato!" : "Copia per pagina MUV"}
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFacebookInstructions(!showFacebookInstructions)}
                className="w-full justify-between text-xs text-muted-foreground"
              >
                <span>💡 Come postare su MuvLegnago</span>
                {showFacebookInstructions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {showFacebookInstructions && (
                <div className="bg-blue-50 dark:bg-blue-950/30 rounded-lg p-3 text-xs space-y-2">
                  <p className="font-medium">Per postare sulla pagina MuvLegnago:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Clicca "Copia per pagina MUV" qui sopra</li>
                    <li>Apri la pagina Facebook MuvLegnago</li>
                    <li>Clicca su "Scrivi qualcosa..."</li>
                    <li>Incolla il testo (Ctrl+V / Cmd+V)</li>
                    <li>Pubblica il post</li>
                  </ol>
                  <Button
                    onClick={() => openExternalLink(SOCIAL_LINKS.facebookPage)}
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Apri facebook.com/MuvLegnago
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* Instagram Section */}
          {activePlatforms.includes("instagram") && (
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-2 font-semibold text-[#E4405F]">
                <Instagram className="h-5 w-5" />
                <span>Instagram</span>
              </div>

              <Button
                onClick={handleInstagramShare}
                className={`w-full text-xs ${instagramCopied ? "bg-green-600 hover:bg-green-600" : "bg-[#E4405F] hover:bg-[#E4405F]/90"} text-white`}
                size="sm"
              >
                {instagramCopied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {instagramCopied ? "Testo copiato con hashtag!" : "Copia testo + hashtag per Instagram"}
              </Button>

              {articleImage && (
                <Button
                  onClick={handleDownloadImage}
                  variant="outline"
                  size="sm"
                  className="w-full text-xs"
                  disabled={downloading}
                >
                  <Download className="h-3 w-3 mr-1" />
                  {downloading ? "Scaricando..." : "Scarica immagine articolo"}
                </Button>
              )}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowInstagramInstructions(!showInstagramInstructions)}
                className="w-full justify-between text-xs text-muted-foreground"
              >
                <span>📸 Istruzioni per @muvlegnago</span>
                {showInstagramInstructions ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>

              {showInstagramInstructions && (
                <div className="bg-pink-50 dark:bg-pink-950/30 rounded-lg p-3 text-xs space-y-2">
                  <p className="font-medium">Per postare su @muvlegnago:</p>
                  <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
                    <li>Clicca "Copia testo + hashtag" qui sopra</li>
                    <li>Scarica l'immagine dell'articolo</li>
                    <li>Apri Instagram e vai su @muvlegnago</li>
                    <li>Crea un nuovo post o storia</li>
                    <li>Carica l'immagine scaricata</li>
                    <li>Incolla il testo nella didascalia</li>
                    <li>Pubblica!</li>
                  </ol>
                  <Button
                    onClick={() => openExternalLink(SOCIAL_LINKS.instagramProfile)}
                    size="sm"
                    variant="outline"
                    className="w-full mt-2 text-xs"
                  >
                    <ExternalLink className="h-3 w-3 mr-1" />
                    Apri instagram.com/muvlegnago
                  </Button>
                </div>
              )}
            </div>
          )}

          {/* LinkedIn Section */}
          {activePlatforms.includes("linkedin") && (
            <Button
              onClick={() => handleShare("linkedin")}
              className="w-full bg-[#0A66C2] hover:bg-[#0A66C2]/90 text-white"
              size="lg"
            >
              <Linkedin className="h-5 w-5 mr-2" />
              Condividi su LinkedIn
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          )}

          {/* WhatsApp Section */}
          {activePlatforms.includes("whatsapp") && (
            <Button
              onClick={() => handleShare("whatsapp")}
              className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white"
              size="lg"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Condividi su WhatsApp
              <ExternalLink className="h-4 w-4 ml-auto" />
            </Button>
          )}

          {activePlatforms.length === 0 && (
            <p className="text-center text-muted-foreground text-sm py-4">
              Nessun social selezionato per la condivisione
            </p>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Chiudi
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShareModal;
