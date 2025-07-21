import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Video, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface VideoUploaderProps {
  onVideoUploaded: (url: string) => void;
  currentVideo?: string;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUploaded, currentVideo }) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState(currentVideo || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('video/')) {
      toast({
        title: "Errore",
        description: "Per favore seleziona un file video",
        variant: "destructive"
      });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: "Errore",
        description: "Il video deve essere inferiore a 50MB",
        variant: "destructive"
      });
      return;
    }

    try {
      setUploading(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `blog-videos/${fileName}`;

      console.log('Uploading video file:', filePath);

      // Prova prima a creare il bucket se non esiste
      const { data: buckets } = await supabase.storage.listBuckets();
      const bucketExists = buckets?.some(bucket => bucket.name === 'immagini');
      
      if (!bucketExists) {
        console.log('Creating bucket...');
        const { error: bucketError } = await supabase.storage.createBucket('immagini', {
          public: true,
          allowedMimeTypes: ['video/*', 'image/*'],
          fileSizeLimit: 52428800 // 50MB
        });
        
        if (bucketError) {
          console.error('Bucket creation error:', bucketError);
        }
      }

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('immagini')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        // Se l'errore è di RLS, proviamo con upsert true
        if (uploadError.message.includes('row-level security')) {
          const { data: retryData, error: retryError } = await supabase.storage
            .from('immagini')
            .upload(filePath, file, {
              cacheControl: '3600',
              upsert: true
            });
          
          if (retryError) {
            throw retryError;
          }
        } else {
          throw uploadError;
        }
      }

      console.log('Upload successful:', uploadData);

      const { data: urlData } = supabase.storage
        .from('immagini')
        .getPublicUrl(filePath);

      console.log('Public URL:', urlData.publicUrl);

      onVideoUploaded(urlData.publicUrl);
      setUrlInput(urlData.publicUrl);
      
      toast({
        title: "Successo",
        description: "Video caricato con successo!"
      });

    } catch (error: any) {
      console.error('Error uploading video:', error);
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
      onVideoUploaded(urlInput.trim());
      toast({
        title: "Successo",
        description: "URL video aggiornato!"
      });
    }
  };

  const removeVideo = () => {
    setUrlInput('');
    onVideoUploaded('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isYouTubeUrl = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
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
                  Trascina un video qui o{' '}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-blue-400 hover:text-blue-300 underline"
                  >
                    seleziona file
                  </button>
                </p>
                <p className="text-sm text-gray-400">
                  Supportati: MP4, WebM, MOV (max 50MB)
                </p>
              </div>
            )}
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* URL Input */}
      <div className="space-y-2">
        <Label htmlFor="video-url" className="text-white">
          Oppure inserisci URL video (YouTube, Vimeo, ecc.)
        </Label>
        <div className="flex gap-2">
          <Input
            id="video-url"
            type="url"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://youtube.com/watch?v=..."
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
                  {isYouTubeUrl(urlInput) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(urlInput)}
                      className="w-full h-48 rounded-lg border border-gray-600"
                      frameBorder="0"
                      allowFullScreen
                      title="YouTube video preview"
                    />
                  ) : (
                    <video
                      src={urlInput}
                      className="max-w-full h-auto max-h-48 rounded-lg border border-gray-600"
                      controls
                      onError={(e) => {
                        console.error('Video load error:', urlInput);
                        toast({
                          title: "Errore",
                          description: "Impossibile caricare il video dall'URL",
                          variant: "destructive"
                        });
                      }}
                    />
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeVideo}
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

export default VideoUploader;