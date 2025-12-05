import { useState } from "react";
import { Facebook, Twitter, Linkedin, MessageCircle, Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareUrls) => {
    const shareUrl = shareUrls[platform];
    window.open(shareUrl, "_blank", "width=600,height=400,noopener,noreferrer");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
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
    },
    {
      key: "twitter" as const,
      icon: Twitter,
      label: "Twitter/X",
      bgClass: "bg-foreground/10 hover:bg-foreground/20 text-foreground",
    },
    {
      key: "linkedin" as const,
      icon: Linkedin,
      label: "LinkedIn",
      bgClass: "bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 text-[#0A66C2]",
    },
    {
      key: "whatsapp" as const,
      icon: MessageCircle,
      label: "WhatsApp",
      bgClass: "bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]",
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
      
      {platforms.map(({ key, icon: Icon, label, bgClass }) => (
        <button
          key={key}
          onClick={() => handleShare(key)}
          className={cn(buttonBaseClass, bgClass)}
          title={`Condividi su ${label}`}
          aria-label={`Condividi su ${label}`}
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
