import { useState } from "react";
import { Facebook, Instagram, Linkedin, MessageCircle, ExternalLink, Check } from "lucide-react";
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

const SocialShareModal = ({
  open,
  onOpenChange,
  articleTitle,
  articleUrl,
  articleImage,
  sharePreferences,
}: SocialShareModalProps) => {
  const [instagramCopied, setInstagramCopied] = useState(false);
  
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleInstagramShare = async () => {
    const instagramText = `${articleTitle} 🏋️\n\nLeggi l'articolo completo: ${articleUrl}\n\n#MUVFitness #Fitness #Legnago #PersonalTrainer`;
    try {
      await navigator.clipboard.writeText(instagramText);
      setInstagramCopied(true);
      toast.success("Testo copiato per Instagram!", {
        description: "Apri Instagram e incollalo nel tuo post",
      });
      setTimeout(() => setInstagramCopied(false), 3000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = instagramText;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setInstagramCopied(true);
      toast.success("Testo copiato per Instagram!");
      setTimeout(() => setInstagramCopied(false), 3000);
    }
  };

  const activePlatforms = Object.entries(sharePreferences)
    .filter(([_, enabled]) => enabled)
    .map(([platform]) => platform as keyof SharePreferences);

  const platformConfig = {
    facebook: {
      icon: Facebook,
      label: "Condividi su Facebook",
      bgClass: "bg-[#1877F2] hover:bg-[#1877F2]/90",
      onClick: () => handleShare("facebook"),
    },
    instagram: {
      icon: instagramCopied ? Check : Instagram,
      label: instagramCopied ? "Testo copiato!" : "Copia testo per Instagram",
      bgClass: instagramCopied ? "bg-green-600 hover:bg-green-600" : "bg-[#E4405F] hover:bg-[#E4405F]/90",
      onClick: handleInstagramShare,
    },
    linkedin: {
      icon: Linkedin,
      label: "Condividi su LinkedIn",
      bgClass: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
      onClick: () => handleShare("linkedin"),
    },
    whatsapp: {
      icon: MessageCircle,
      label: "Condividi su WhatsApp",
      bgClass: "bg-[#25D366] hover:bg-[#25D366]/90",
      onClick: () => handleShare("whatsapp"),
    },
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            🎉 Articolo Pubblicato!
          </DialogTitle>
          <DialogDescription>
            Condividi l'articolo sui social che hai selezionato
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

          {/* Share Buttons */}
          <div className="space-y-3">
            {activePlatforms.map((platform) => {
              const config = platformConfig[platform];
              const Icon = config.icon;
              return (
                <Button
                  key={platform}
                  onClick={config.onClick}
                  className={`w-full text-white ${config.bgClass}`}
                  size="lg"
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {config.label}
                  {platform !== "instagram" && <ExternalLink className="h-4 w-4 ml-auto" />}
                </Button>
              );
            })}
          </div>

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
