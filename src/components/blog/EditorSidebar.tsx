
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Zap, Clock, ImageIcon, AlertCircle, CheckCircle } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface Article {
  status: string;
  author_name: string;
  featured_image?: string;
}

interface EditorSidebarProps {
  article: Article;
  validationErrors: any;
  onUpdateField: (field: string, value: string) => void;
  onImageUpload: (url: string) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  article,
  validationErrors,
  onUpdateField,
  onImageUpload
}) => {
  return (
    <div className="space-y-4">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            Stato
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Status:</span>
            <Badge variant={article.status === 'published' ? 'default' : 'secondary'}>
              {article.status === 'published' ? 'Pubblicato' : 'Bozza'}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-300">Auto-save:</span>
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">30s</span>
            </div>
          </div>

          <Separator className="bg-gray-600" />
          
          <div className="space-y-2">
            <Label htmlFor="author" className="text-white">Autore</Label>
            <Input
              id="author"
              value={article.author_name}
              onChange={(e) => onUpdateField('author_name', e.target.value)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <ImageIcon className="mr-2 h-4 w-4" />
            Immagine in Evidenza
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader
            onImageUploaded={onImageUpload}
            currentImage={article.featured_image}
          />
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Controllo Qualità</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Titolo</span>
              {validationErrors.title ? (
                <AlertCircle className="h-4 w-4 text-red-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Contenuto</span>
              {validationErrors.content ? (
                <AlertCircle className="h-4 w-4 text-red-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-400" />
              )}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-300">SEO</span>
              {validationErrors.meta_title || validationErrors.meta_description ? (
                <AlertCircle className="h-4 w-4 text-yellow-400" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-400" />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorSidebar;
