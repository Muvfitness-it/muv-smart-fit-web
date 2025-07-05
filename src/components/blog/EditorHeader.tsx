
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Save, Globe, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EditorHeaderProps {
  isEdit: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  saving: boolean;
  publishing: boolean;
  validationErrors: any;
  onSaveAsDraft: () => void;
  onPublish: () => void;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  isEdit,
  lastSaved,
  hasUnsavedChanges,
  saving,
  publishing,
  validationErrors,
  onSaveAsDraft,
  onPublish
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/blog/admin')}
          className="text-gray-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Torna all'Admin
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-white">
            {isEdit ? 'Modifica Articolo' : 'Nuovo Articolo'}  
          </h1>
          <div className="flex items-center space-x-4 mt-1">
            {lastSaved && (
              <p className="text-sm text-gray-400 flex items-center">
                <CheckCircle className="h-3 w-3 mr-1" />
                Salvato: {lastSaved.toLocaleTimeString()}
              </p>
            )}
            {hasUnsavedChanges && (
              <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                <AlertCircle className="h-3 w-3 mr-1" />
                Modifiche non salvate
              </Badge>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center space-x-3">
        <Button
          onClick={onSaveAsDraft}
          disabled={saving}
          className="bg-gray-600 hover:bg-gray-700"
        >
          {saving ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Save className="mr-2 h-4 w-4" />
          )}
          Salva Bozza
        </Button>
        
        <Button
          onClick={onPublish}
          disabled={publishing || Object.keys(validationErrors).length > 0}
          className="bg-green-600 hover:bg-green-700"
        >
          {publishing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Globe className="mr-2 h-4 w-4" />
          )}
          Pubblica
        </Button>
      </div>
    </div>
  );
};

export default EditorHeader;
