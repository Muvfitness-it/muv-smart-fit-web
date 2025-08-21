import React, { createContext, useContext, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface StorageSecurityContextType {
  uploadSecurely: (
    bucket: string,
    path: string,
    file: File,
    options?: { 
      maxSize?: number;
      allowedTypes?: string[];
      requireAuth?: boolean;
    }
  ) => Promise<{ data?: any; error?: any }>;
}

const StorageSecurityContext = createContext<StorageSecurityContextType | null>(null);

export const useStorageSecurity = () => {
  const context = useContext(StorageSecurityContext);
  if (!context) {
    throw new Error('useStorageSecurity must be used within StorageSecurityProvider');
  }
  return context;
};

interface StorageSecurityProviderProps {
  children: React.ReactNode;
}

export const StorageSecurityProvider: React.FC<StorageSecurityProviderProps> = ({ children }) => {
  const uploadSecurely = useCallback(async (
    bucket: string,
    path: string,
    file: File,
    options: { 
      maxSize?: number;
      allowedTypes?: string[];
      requireAuth?: boolean;
    } = {}
  ) => {
    const {
      maxSize = 5 * 1024 * 1024, // 5MB default
      allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
      requireAuth = true
    } = options;

    try {
      // Check authentication if required
      if (requireAuth) {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          throw new Error('Autenticazione richiesta per il caricamento');
        }
      }

      // Validate file size
      if (file.size > maxSize) {
        throw new Error(`File troppo grande. Dimensione massima: ${Math.round(maxSize / 1024 / 1024)}MB`);
      }

      // Validate file type
      if (!allowedTypes.includes(file.type)) {
        throw new Error(`Tipo di file non supportato. Tipi consentiti: ${allowedTypes.join(', ')}`);
      }

      // Validate file name to prevent path traversal
      const sanitizedPath = path.replace(/[^a-zA-Z0-9._/-]/g, '').replace(/\.{2,}/g, '.');
      if (sanitizedPath !== path || sanitizedPath.includes('..')) {
        throw new Error('Nome file non valido');
      }

      // Upload file
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(sanitizedPath, file, {
          upsert: false // Prevent overwriting
        });

      if (error) {
        console.error('Storage upload error:', error);
        throw new Error('Errore durante il caricamento del file');
      }

      return { data, error: null };

    } catch (error: any) {
      console.error('Secure upload error:', error);
      
      toast({
        title: "Errore caricamento",
        description: error.message || "Errore durante il caricamento del file",
        variant: "destructive"
      });

      return { data: null, error: error.message };
    }
  }, []);

  const value = {
    uploadSecurely
  };

  return (
    <StorageSecurityContext.Provider value={value}>
      {children}
    </StorageSecurityContext.Provider>
  );
};