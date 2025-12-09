import { useState } from "react";
import { Facebook, Instagram, Linkedin, MessageCircle, Copy, Check, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface SocialShareButtonsProps {
  url: string;
  title: string;
  description?: string;
  variant?: "inline" | "expanded";
  className?: string;
}

const SocialShareButtons = ({
  url,
  title,
  description,
  variant = "inline",
  className,
}: SocialShareButtonsProps) => {
  const [copied, setCopied] = useState(false);
  const [instagramCopied, setInstagramCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    const shareUrl = shareUrls[platform];
    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleInstagramShare = async () => {
    const instagramText = `${title} 🏋️\n\nLeggi l'articolo completo: ${url}\n\n#MUVFitness #Fitness #Legnago #PersonalTrainer`;
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const buttonBaseClass = variant === "expanded" 
    ? "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium"
    : "p-2 rounded-full transition-all duration-200";

  const platforms = [
    {
      key: "facebook" as const,
      icon: Facebook,
      label: "Facebook",
      bgClass: "bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2]",
      onClick: () => handleShare("facebook"),
    },
    {
      key: "instagram" as const,
      icon: Instagram,
      label: instagramCopied ? "Copiato!" : "Instagram",
      bgClass: instagramCopied 
        ? "bg-green-500/10 text-green-600"
        : "bg-[#E4405F]/10 hover:bg-[#E4405F]/20 text-[#E4405F]",
      onClick: handleInstagramShare,
    },
    {
      key: "linkedin" as const,
      icon: Linkedin,
      label: "LinkedIn",
      bgClass: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]",
      onClick: () => handleShare("linkedin"),
    },
    {
      key: "whatsapp" as const,
      icon: MessageCircle,
      label: "WhatsApp",
      bgClass: "bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]",
      onClick: () => handleShare("whatsapp"),
    },
  ];

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      {variant === "expanded" && (
        <span className="flex items-center gap-2 text-sm text-muted-foreground mr-2">
          <Share2 className="h-4 w-4" />
          Condividi:
        </span>
      )}
      
      {platforms.map(({ key, icon: Icon, label, bgClass, onClick }) => (
        <button
          key={key}
          onClick={onClick}
          className={cn(buttonBaseClass, bgClass)}
          title={key === "instagram" ? "Copia testo per Instagram" : `Condividi su ${label}`}
          aria-label={key === "instagram" ? "Copia testo per Instagram" : `Condividi su ${label}`}
        >
          <Icon className={variant === "expanded" ? "h-4 w-4" : "h-5 w-5"} />
          {variant === "expanded" && <span>{label}</span>}
        </button>
      ))}

      <button
        onClick={handleCopyLink}
        className={cn(
          buttonBaseClass,
          copied
            ? "bg-green-500/10 text-green-600"
            : "bg-muted hover:bg-muted/80 text-muted-foreground"
        )}
        title={copied ? "Link copiato!" : "Copia link"}
        aria-label={copied ? "Link copiato!" : "Copia link"}
      >
        {copied ? (
          <>
            <Check className={variant === "expanded" ? "h-4 w-4" : "h-5 w-5"} />
            {variant === "expanded" && <span>Copiato!</span>}
          </>
        ) : (
          <>
            <Copy className={variant === "expanded" ? "h-4 w-4" : "h-5 w-5"} />
            {variant === "expanded" && <span>Copia link</span>}
          </>
        )}
      </button>
    </div>
  );
};

export default SocialShareButtons;
