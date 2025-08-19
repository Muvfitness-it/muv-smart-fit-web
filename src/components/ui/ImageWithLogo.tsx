import React, { useRef, useEffect, useState } from 'react';
import { Button } from './button';
import { Upload, Wand2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import logoSrc from '@/assets/muv-logo-original-transparent.png';

interface ImageWithLogoProps {
  onImageGenerated?: (imageUrl: string) => void;
  prompt?: string;
  className?: string;
}

export const ImageWithLogo: React.FC<ImageWithLogoProps> = ({
  onImageGenerated,
  prompt = '',
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>('');

  const generateImageWithLogo = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt mancante",
        description: "Fornisci un prompt per generare l'immagine",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    try {
      // 1. Generate base image using existing function
      const { data: imageData, error: imageError } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: `${prompt}, professional fitness center image, high quality, modern, clean lighting`,
          size: '1024x1024',
          quality: 'high'
        }
      });

      if (imageError || !imageData?.image) {
        throw new Error('Failed to generate base image');
      }

      // 2. Load the generated image
      const baseImage = new Image();
      baseImage.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        baseImage.onload = resolve;
        baseImage.onerror = reject;
        baseImage.src = imageData.image;
      });

      // 3. Load the MUV logo
      const logoImage = new Image();
      logoImage.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        logoImage.onload = resolve;
        logoImage.onerror = reject;
        logoImage.src = logoSrc;
      });

      // 4. Composite images on canvas
      const canvas = canvasRef.current;
      if (!canvas) throw new Error('Canvas not available');

      canvas.width = baseImage.width;
      canvas.height = baseImage.height;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      // Draw base image
      ctx.drawImage(baseImage, 0, 0);

      // Calculate logo position (bottom-right with padding)
      const logoMaxWidth = canvas.width * 0.15; // 15% of canvas width
      const logoMaxHeight = canvas.height * 0.15; // 15% of canvas height
      
      // Maintain aspect ratio
      const logoAspectRatio = logoImage.width / logoImage.height;
      let logoWidth = logoMaxWidth;
      let logoHeight = logoMaxWidth / logoAspectRatio;
      
      if (logoHeight > logoMaxHeight) {
        logoHeight = logoMaxHeight;
        logoWidth = logoMaxHeight * logoAspectRatio;
      }

      // Position in bottom-right with 5% padding
      const logoX = canvas.width - logoWidth - (canvas.width * 0.05);
      const logoY = canvas.height - logoHeight - (canvas.height * 0.05);

      // Add subtle shadow/background for logo visibility
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 10;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;

      // Draw semi-transparent background for logo
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      ctx.fillRect(logoX - 10, logoY - 10, logoWidth + 20, logoHeight + 20);

      // Reset shadow
      ctx.shadowColor = 'transparent';
      
      // Draw logo
      ctx.drawImage(logoImage, logoX, logoY, logoWidth, logoHeight);

      // 5. Convert to blob and upload to Supabase Storage
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/jpeg', 0.9);
      });

      const fileName = `article-image-${Date.now()}.jpg`;
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('immagini')
        .upload(fileName, blob, {
          contentType: 'image/jpeg',
          cacheControl: '3600'
        });

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}`);
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('immagini')
        .getPublicUrl(fileName);

      setGeneratedImageUrl(publicUrl);
      onImageGenerated?.(publicUrl);

      toast({
        title: "Immagine generata con successo!",
        description: "L'immagine con il logo MUV è stata creata e caricata."
      });

    } catch (error: any) {
      console.error('Error generating image with logo:', error);
      toast({
        title: "Errore nella generazione",
        description: error.message || "Impossibile generare l'immagine con logo",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Button 
        onClick={generateImageWithLogo} 
        disabled={isGenerating || !prompt.trim()}
        className="w-full"
        variant="outline"
      >
        {isGenerating ? (
          <>
            <Wand2 className="w-4 h-4 mr-2 animate-spin" />
            Generazione immagine...
          </>
        ) : (
          <>
            <Upload className="w-4 h-4 mr-2" />
            Genera immagine con logo MUV
          </>
        )}
      </Button>

      {generatedImageUrl && (
        <div className="border rounded-lg p-4 bg-card">
          <img 
            src={generatedImageUrl} 
            alt="Generated image with MUV logo" 
            className="w-full h-auto rounded-lg"
          />
          <p className="text-sm text-muted-foreground mt-2">
            Immagine generata con logo MUV incorporato
          </p>
        </div>
      )}

      {/* Hidden canvas for image composition */}
      <canvas 
        ref={canvasRef} 
        style={{ display: 'none' }}
      />
    </div>
  );
};