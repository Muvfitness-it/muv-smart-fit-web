import { Facebook, Twitter, Linkedin, MessageCircle, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface SharePreferences {
  facebook?: boolean;
  twitter?: boolean;
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
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(articleTitle);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    window.open(shareUrls[platform], "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const activePlatforms = Object.entries(sharePreferences)
    .filter(([_, enabled]) => enabled)
    .map(([platform]) => platform as keyof SharePreferences);

  const platformConfig = {
    facebook: {
      icon: Facebook,
      label: "Condividi su Facebook",
      bgClass: "bg-[#1877F2] hover:bg-[#1877F2]/90",
    },
    twitter: {
      icon: Twitter,
      label: "Condividi su Twitter/X",
      bgClass: "bg-foreground hover:bg-foreground/90",
    },
    linkedin: {
      icon: Linkedin,
      label: "Condividi su LinkedIn",
      bgClass: "bg-[#0A66C2] hover:bg-[#0A66C2]/90",
    },
    whatsapp: {
      icon: MessageCircle,
      label: "Condividi su WhatsApp",
      bgClass: "bg-[#25D366] hover:bg-[#25D366]/90",
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
                  onClick={() => handleShare(platform)}
                  className={`w-full text-white ${config.bgClass}`}
                  size="lg"
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {config.label}
                  <ExternalLink className="h-4 w-4 ml-auto" />
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
