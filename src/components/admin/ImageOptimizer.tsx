import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, Image as ImageIcon, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageOptimizerProps {
  onImageInserted?: (markup: string) => void;
  className?: string;
}

interface OptimizedImage {
  original: string;
  webp: string;
  variants: {
    small: string;
    medium: string;
    large: string;
  };
  alt: string;
  width: number;
  height: number;
}

export const ImageOptimizer: React.FC<ImageOptimizerProps> = ({
  onImageInserted,
  className = ''
}) => {
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [altText, setAltText] = useState('');
  const [optimizedImage, setOptimizedImage] = useState<OptimizedImage | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Utility function to resize and convert image
  const processImage = async (
    file: File, 
    maxWidth: number, 
    quality: number = 0.85, 
    format: 'webp' | 'jpeg' = 'webp'
  ): Promise<{ blob: Blob; width: number; height: number }> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) {
          reject(new Error('Canvas not available'));
          return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Canvas context not available'));
          return;
        }

        // Calculate new dimensions maintaining aspect ratio
        let { width, height } = img;
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve({ blob, width, height });
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          format === 'webp' ? 'image/webp' : 'image/jpeg',
          quality
        );
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  // Upload blob to Supabase Storage
  const uploadBlob = async (blob: Blob, fileName: string): Promise<string> => {
    const { data, error } = await supabase.storage
      .from('immagini')
      .upload(`blog/${fileName}`, blob, {
        contentType: blob.type,
        cacheControl: '31536000', // 1 year
        upsert: false
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('immagini')
      .getPublicUrl(`blog/${fileName}`);

    return publicUrl;
  };

  // Main processing function
  const processAndUploadImage = async () => {
    if (!uploadFile) {
      toast({
        title: 'Seleziona un file',
        description: 'Scegli un\'immagine da ottimizzare',
        variant: 'destructive'
      });
      return;
    }

    if (!altText.trim()) {
      toast({
        title: 'Testo alternativo richiesto',
        description: 'Inserisci una descrizione per l\'accessibilità',
        variant: 'destructive'
      });
      return;
    }

    setIsProcessing(true);

    try {
      const timestamp = Date.now();
      const baseName = uploadFile.name.replace(/\.[^/.]+$/, '').replace(/[^a-zA-Z0-9-]/g, '-');
      const isLogo = uploadFile.name.toLowerCase().includes('logo') || 
                     uploadFile.name.toLowerCase().includes('transparent');

      // Process variants
      const variants = {
        small: await processImage(uploadFile, 800, isLogo ? 1.0 : 0.85, 'webp'),
        medium: await processImage(uploadFile, 1200, isLogo ? 1.0 : 0.85, 'webp'),
        large: await processImage(uploadFile, 1600, isLogo ? 1.0 : 0.85, 'webp')
      };

      // Keep original as fallback (convert to JPEG if needed)
      const original = uploadFile.type.includes('webp') 
        ? await processImage(uploadFile, 1600, 0.9, 'jpeg')
        : { blob: uploadFile, width: variants.large.width, height: variants.large.height };

      // Upload all variants
      const [originalUrl, smallUrl, mediumUrl, largeUrl] = await Promise.all([
        uploadBlob(original.blob, `${baseName}-${timestamp}.jpg`),
        uploadBlob(variants.small.blob, `${baseName}-${timestamp}-800w.webp`),
        uploadBlob(variants.medium.blob, `${baseName}-${timestamp}-1200w.webp`),
        uploadBlob(variants.large.blob, `${baseName}-${timestamp}-1600w.webp`)
      ]);

      const optimized: OptimizedImage = {
        original: originalUrl,
        webp: largeUrl,
        variants: {
          small: smallUrl,
          medium: mediumUrl,
          large: largeUrl
        },
        alt: altText,
        width: variants.large.width,
        height: variants.large.height
      };

      setOptimizedImage(optimized);

      toast({
        title: 'Immagine ottimizzata',
        description: 'Immagine convertita in WebP con varianti responsive',
        duration: 3000
      });

    } catch (error: any) {
      console.error('Error processing image:', error);
      toast({
        title: 'Errore ottimizzazione',
        description: error.message || 'Impossibile processare l\'immagine',
        variant: 'destructive'
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Generate optimized HTML markup
  const generateOptimizedMarkup = (img: OptimizedImage): string => {
    const srcset = `${img.variants.small} 800w, ${img.variants.medium} 1200w, ${img.variants.large} 1600w`;
    const sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px";

    return `<picture>
  <source 
    srcset="${srcset}" 
    sizes="${sizes}" 
    type="image/webp"
  />
  <img 
    src="${img.original}" 
    alt="${img.alt}" 
    width="${img.width}" 
    height="${img.height}" 
    loading="lazy" 
    decoding="async"
    class="w-full h-auto rounded-lg shadow-md my-4"
  />
</picture>`;
  };

  const insertOptimizedImage = () => {
    if (!optimizedImage) return;

    const markup = generateOptimizedMarkup(optimizedImage);
    onImageInserted?.(markup);

    toast({
      title: 'Immagine inserita',
      description: 'Markup ottimizzato aggiunto al contenuto'
    });
  };

  return (
    <div className={`space-y-4 p-4 border rounded-lg ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <ImageIcon className="w-5 h-5 text-primary" />
        <h3 className="font-semibold">Ottimizzatore Immagini</h3>
      </div>

      <div className="space-y-3">
        <div>
          <Label htmlFor="image-file">Seleziona immagine</Label>
          <Input
            id="image-file"
            type="file"
            accept="image/jpeg,image/jpg,image/png,image/webp"
            onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Formati supportati: JPEG, PNG, WebP. Raccomandato: max 5MB
          </p>
        </div>

        <div>
          <Label htmlFor="alt-text">Testo alternativo (Alt)</Label>
          <Input
            id="alt-text"
            placeholder="Descrivi l'immagine per l'accessibilità..."
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
            className="mt-1"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Importante per SEO e accessibilità
          </p>
        </div>

        <Button 
          onClick={processAndUploadImage} 
          disabled={!uploadFile || !altText.trim() || isProcessing}
          className="w-full"
        >
          {isProcessing ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              Ottimizzazione in corso...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Ottimizza e carica
            </>
          )}
        </Button>

        {optimizedImage && (
          <div className="border rounded-lg p-3 bg-green-50/50 space-y-3">
            <div className="flex items-center gap-2 text-green-700">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm font-medium">Ottimizzazione completata</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="font-medium">Formati:</span> WebP + JPEG fallback
              </div>
              <div>
                <span className="font-medium">Varianti:</span> 800w, 1200w, 1600w
              </div>
              <div>
                <span className="font-medium">Dimensioni:</span> {optimizedImage.width}×{optimizedImage.height}
              </div>
              <div>
                <span className="font-medium">Lazy loading:</span> ✓
              </div>
            </div>

            <img 
              src={optimizedImage.webp} 
              alt={optimizedImage.alt}
              className="w-full h-auto rounded-lg max-h-48 object-cover"
            />

            <Button 
              onClick={insertOptimizedImage}
              variant="secondary"
              className="w-full"
            >
              Inserisci nel contenuto
            </Button>
          </div>
        )}

        <div className="bg-blue-50/50 p-3 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-800">
              <p className="font-medium mb-1">Ottimizzazioni applicate:</p>
              <ul className="space-y-0.5 list-disc list-inside">
                <li>Conversione automatica in WebP (compressione superiore)</li>
                <li>Generazione di 3 varianti responsive (800w, 1200w, 1600w)</li>
                <li>JPEG fallback per compatibilità browser</li>
                <li>Lazy loading e decoding asincrono</li>
                <li>Markup semantico con tag &lt;picture&gt;</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};
