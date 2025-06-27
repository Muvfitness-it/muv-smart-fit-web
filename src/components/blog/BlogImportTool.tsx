
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { useBlogImport } from '@/hooks/useBlogImport';
import { toast } from 'sonner';

const BlogImportTool = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewPosts, setPreviewPosts] = useState<any[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { isImporting, importStats, parseXMLFile, importPosts } = useBlogImport();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.toLowerCase().endsWith('.xml')) {
        toast.error('⚠️ Seleziona un file XML valido');
        return;
      }
      setSelectedFile(file);
      setShowPreview(false);
      setPreviewPosts([]);
    }
  };

  const handlePreview = async () => {
    if (!selectedFile) return;

    try {
      toast.info('🔍 Analizzando il file XML...');
      const posts = await parseXMLFile(selectedFile);
      setPreviewPosts(posts);
      setShowPreview(true);
      toast.success(`✅ File analizzato: ${posts.length} articoli trovati`);
    } catch (error) {
      console.error('Error previewing XML:', error);
      toast.error('❌ Errore nell\'analisi del file XML');
    }
  };

  const handleImport = async () => {
    if (previewPosts.length === 0) return;

    try {
      await importPosts(previewPosts);
      setSelectedFile(null);
      setPreviewPosts([]);
      setShowPreview(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('Import error:', error);
      toast.error('❌ Errore durante l\'importazione');
    }
  };

  const progressPercentage = importStats.total > 0 
    ? ((importStats.imported + importStats.skipped + importStats.errors) / importStats.total) * 100 
    : 0;

  return (
    <div className="space-y-6">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Upload className="h-5 w-5" />
            Importazione Articoli XML
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">
              Seleziona file XML del blog
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xml"
              onChange={handleFileSelect}
              className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              onClick={handlePreview}
              disabled={!selectedFile || isImporting}
              variant="outline"
              className="border-gray-600 text-gray-300 hover:bg-gray-700"
            >
              <FileText className="h-4 w-4 mr-2" />
              Anteprima
            </Button>
            
            <Button
              onClick={handleImport}
              disabled={previewPosts.length === 0 || isImporting}
              className="bg-green-600 hover:bg-green-700"
            >
              <Upload className="h-4 w-4 mr-2" />
              Importa Articoli
            </Button>
          </div>

          {/* Import Progress */}
          {isImporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Importazione in corso...</span>
                <span>{Math.round(progressPercentage)}%</span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
              
              <div className="grid grid-cols-4 gap-2 text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-blue-500 rounded"></div>
                  Totale: {importStats.total}
                </div>
                <div className="flex items-center gap-1">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  Importati: {importStats.imported}
                </div>
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-yellow-500" />
                  Saltati: {importStats.skipped}
                </div>
                <div className="flex items-center gap-1">
                  <XCircle className="w-3 h-3 text-red-500" />
                  Errori: {importStats.errors}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && previewPosts.length > 0 && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">
              Anteprima Articoli ({previewPosts.length} trovati)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {previewPosts.slice(0, 10).map((post, index) => (
                <div key={index} className="p-3 bg-gray-700 rounded border border-gray-600">
                  <h4 className="font-semibold text-white truncate">{post.title}</h4>
                  <p className="text-sm text-gray-400 mt-1">Slug: {post.slug}</p>
                  <p className="text-sm text-gray-400">Autore: {post.author_name}</p>
                  {post.published_at && (
                    <p className="text-sm text-gray-400">
                      Data: {new Date(post.published_at).toLocaleDateString('it-IT')}
                    </p>
                  )}
                </div>
              ))}
              {previewPosts.length > 10 && (
                <p className="text-center text-gray-400 text-sm">
                  ... e altri {previewPosts.length - 10} articoli
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instructions */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">📋 Istruzioni</CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-2 text-sm">
          <p><strong>1.</strong> Esporta il tuo blog in formato XML (WordPress Export, RSS, etc.)</p>
          <p><strong>2.</strong> Seleziona il file XML e clicca "Anteprima" per vedere gli articoli</p>
          <p><strong>3.</strong> Clicca "Importa Articoli" per caricarli nel database</p>
          <p><strong>Note:</strong></p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Gli articoli vengono importati come "bozza" per sicurezza</li>
            <li>Gli articoli con lo stesso slug vengono saltati</li>
            <li>Il sistema supporta XML di WordPress e feed RSS standard</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogImportTool;
