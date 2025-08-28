import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface IndexNowSubmitterProps {
  postSlug: string;
  onSubmit?: () => void;
}

export const IndexNowSubmitter = ({ postSlug, onSubmit }: IndexNowSubmitterProps) => {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const postUrl = `https://www.muvfitness.it/${postSlug}`;
      
      const { data, error } = await supabase.functions.invoke('indexnow-submitter', {
        body: { urls: [postUrl] }
      });

      if (error) throw error;

      toast({
        title: "Successo!",
        description: `Articolo inviato ai motori di ricerca: ${postUrl}`,
      });

      onSubmit?.();
    } catch (error: any) {
      console.error('IndexNow submission error:', error);
      toast({
        title: "Errore",
        description: error.message || "Errore durante l'invio ai motori di ricerca",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Button 
      onClick={handleSubmit} 
      disabled={submitting}
      variant="secondary"
      size="sm"
    >
      {submitting ? "Inviando..." : "📡 Invia ai motori di ricerca"}
    </Button>
  );
};