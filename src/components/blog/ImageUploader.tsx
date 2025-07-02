
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ImageUploaderProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUploaded, currentImage }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState(currentImage || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Errore",
        description: "Per favore seleziona un file immagine",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Errore",
        description: "L'immagine deve essere inferiore a 5MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      console.log('Uploading file:', filePath);

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('immagini')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('Upload successful:', uploadData);

      const { data: urlData } = supabase.storage
        .from('immagini')
        .getPublicUrl(filePath);

      console.log('Public URL:', urlData.publicUrl);

      onImageUploaded(urlData.publicUrl);
      setUrlInput(urlData.publicUrl);
      
      toast({
        title: "Successo",
        description: "Immagine caricata con successo!"
      });

    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast({
        title: "Errore",
        description: `Errore nel caricamento: ${error.message || 'Errore sconosciuto'}`,
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onImageUploaded(urlInput.trim());
      toast({
        title: "Successo",
        description: "URL immagine aggiornato!"
      });
    }
  };

  const removeImage = () => {
    setUrlInput('');
    onImageUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <Card className="bg-gray-700 border-gray-600">
        <CardContent className="p-4">
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragOver 
                ? 'border-blue-400 bg-blue-50 bg-opacity-10' 
                : 'border-gray-500 hover:border-gray-400'
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {uploading ? (
              <div className="flex flex-col items-center">
                <Loader2 className="h-8 w-8 animate-spin text-blue-400 mb-2" />
                <p className="text-white">Caricamento in corso...</p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-white mb-2">
                  Trascina un'immagine qui o{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    seleziona file
                  </button>
                </p>
                <p className="text-sm text-gray-400">
                  Supportati: JPG, PNG, GIF, WebP (max 5MB)
                </p>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="image-url" className="text-white">
          Oppure inserisci URL immagine
        </Label>
        <div className="flex gap-2">
          <Input
            id="image-url"
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://esempio.com/immagine.jpg"
            className="bg-gray-700 border-gray-600 text-white"
          />
          <Button
            type="button"
            onClick={handleUrlSubmit}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Usa URL
          </Button>
        </div>
      </div>

      {/* Preview */}
      {urlInput && (
        <Card className="bg-gray-700 border-gray-600">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <Label className="text-white block mb-2">Anteprima</Label>
                <div className="relative">
                  <img
                    src={urlInput}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded-lg border border-gray-600"
                    onError={(e) => {
                      console.error('Image load error:', urlInput);
                      toast({
                        title: "Errore",
                        description: "Impossibile caricare l'immagine dall'URL",
                        variant: "destructive"
                      });
                    }}
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeImage}
                className="ml-2 border-red-600 text-red-400 hover:bg-red-700"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ImageUploader;
