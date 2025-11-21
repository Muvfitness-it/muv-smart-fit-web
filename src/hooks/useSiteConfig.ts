import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { DEFAULT_THEME_CONFIG, ThemeConfig } from '@/config/themeConfig';

/**
 * Hook per gestire la configurazione del sito da Supabase
 * 
 * Legge la configurazione dalla tabella site_config e fa fallback
 * ai valori di default definiti in themeConfig.ts se non ci sono override.
 * 
 * NOTA: Usa React Query per caching automatico e invalidazione.
 */

type SiteConfigKey = 'theme_colors' | 'homepage_content' | 'landing_defaults' | 'contact_info';

interface SiteConfigRow {
  id: string;
  config_key: string;
  config_value: any;
  config_type: string;
  description: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Hook per leggere la configurazione completa del sito
 */
export const useSiteConfig = () => {
  const query = useQuery({
    queryKey: ['site-config'],
    queryFn: async (): Promise<ThemeConfig> => {
      const { data, error } = await supabase
        .from('site_config')
        .select('*')
        .in('config_key', ['theme_colors', 'homepage_content', 'landing_defaults', 'contact_info']);

      if (error) {
        console.error('Error fetching site config:', error);
        return DEFAULT_THEME_CONFIG;
      }

      if (!data || data.length === 0) {
        return DEFAULT_THEME_CONFIG;
      }

      // Mappa i dati da Supabase alla struttura ThemeConfig
      const config: ThemeConfig = {
        colors: DEFAULT_THEME_CONFIG.colors,
        homepage: DEFAULT_THEME_CONFIG.homepage,
        landing: DEFAULT_THEME_CONFIG.landing,
        contact: DEFAULT_THEME_CONFIG.contact,
      };

      data.forEach((row: SiteConfigRow) => {
        switch (row.config_key) {
          case 'theme_colors':
            config.colors = { ...DEFAULT_THEME_CONFIG.colors, ...row.config_value };
            break;
          case 'homepage_content':
            config.homepage = { ...DEFAULT_THEME_CONFIG.homepage, ...row.config_value };
            break;
          case 'landing_defaults':
            config.landing = { ...DEFAULT_THEME_CONFIG.landing, ...row.config_value };
            break;
          case 'contact_info':
            config.contact = { ...DEFAULT_THEME_CONFIG.contact, ...row.config_value };
            break;
        }
      });

      return config;
    },
    staleTime: 1000 * 60 * 5, // Cache per 5 minuti
    gcTime: 1000 * 60 * 30, // Mantiene in cache per 30 minuti
  });

  return {
    config: query.data || DEFAULT_THEME_CONFIG,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};

/**
 * Hook per aggiornare una specifica sezione della configurazione
 */
export const useUpdateSiteConfig = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ 
      configKey, 
      configValue 
    }: { 
      configKey: SiteConfigKey; 
      configValue: any 
    }) => {
      // Verifica se esiste già
      const { data: existing } = await supabase
        .from('site_config')
        .select('id')
        .eq('config_key', configKey)
        .maybeSingle();

      if (existing) {
        // Update
        const { error } = await supabase
          .from('site_config')
          .update({ 
            config_value: configValue,
            updated_at: new Date().toISOString()
          })
          .eq('config_key', configKey);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase
          .from('site_config')
          .insert({
            config_key: configKey,
            config_value: configValue,
            config_type: getConfigType(configKey),
          });

        if (error) throw error;
      }

      return { success: true };
    },
    onSuccess: () => {
      // Invalida la cache per ricaricare i dati
      queryClient.invalidateQueries({ queryKey: ['site-config'] });
    },
  });
};

/**
 * Helper per determinare il tipo di configurazione
 */
function getConfigType(configKey: SiteConfigKey): string {
  switch (configKey) {
    case 'theme_colors':
      return 'theme';
    case 'homepage_content':
    case 'landing_defaults':
      return 'content';
    case 'contact_info':
      return 'contact';
    default:
      return 'general';
  }
}

/**
 * Hook semplificato per accedere solo ai colori tema
 */
export const useThemeColors = () => {
  const { config, isLoading } = useSiteConfig();
  return {
    colors: config.colors,
    isLoading,
  };
};

/**
 * Hook semplificato per accedere solo ai contenuti homepage
 */
export const useHomepageContent = () => {
  const { config, isLoading } = useSiteConfig();
  return {
    content: config.homepage,
    isLoading,
  };
};

/**
 * Hook semplificato per accedere solo ai contenuti landing
 */
export const useLandingContent = () => {
  const { config, isLoading } = useSiteConfig();
  return {
    content: config.landing,
    isLoading,
  };
};

/**
 * Hook semplificato per accedere solo alle info contatto
 */
export const useContactInfo = () => {
  const { config, isLoading } = useSiteConfig();
  return {
    contact: config.contact,
    isLoading,
  };
};
