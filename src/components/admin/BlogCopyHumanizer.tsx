import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { humanizeText, humanizeTitle, humanizeExcerpt } from '@/utils/copyHumanizer';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  status: string;
  slug: string;
}

const BlogCopyHumanizer: React.FC = () => {
  const { isAdmin } = useAdminAuth();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [applied, setApplied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isAdmin) {
      loadPosts();
    }
  }, [isAdmin]);

  const loadPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('id, title, content, excerpt, status, slug')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const applyHumanization = async () => {
    setLoading(true);
    try {
      let updated = 0;
      
      for (const post of posts) {
        const humanizedTitle = humanizeTitle(post.title);
        const humanizedContent = humanizeText(post.content);
        const humanizedExcerpt = humanizeExcerpt(post.excerpt);

        // Applica solo se ci sono cambiamenti
        if (humanizedTitle !== post.title || 
            humanizedContent !== post.content || 
            humanizedExcerpt !== post.excerpt) {
          
          const { error } = await supabase
            .from('blog_posts')
            .update({
              title: humanizedTitle,
              content: humanizedContent,
              excerpt: humanizedExcerpt
            })
            .eq('id', post.id);

          if (!error) {
            updated++;
          }
        }
      }
      
      toast({
        title: 'Umanizzazione completata',
        description: `${updated} articoli aggiornati con linguaggio più naturale`
      });

      setApplied(true);
      await loadPosts(); // Ricarica i post aggiornati
      
    } catch (error: any) {
      toast({
        title: 'Errore',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">Accesso negato</h2>
        <p className="text-muted-foreground">Solo gli amministratori possono accedere a questa funzione.</p>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>✨ Umanizzazione Copy Blog</CardTitle>
        <p className="text-sm text-muted-foreground">
          Trasforma automaticamente il copy di tutti gli articoli in linguaggio più naturale e conversazionale.
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="font-medium mb-2">Cosa fa questa funzione:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Sostituisce frasi commerciali con linguaggio naturale</li>
            <li>• Rimuove emoji eccessivi e linguaggio troppo "venditoriale"</li>
            <li>• Rende i titoli più conversazionali</li>
            <li>• Aggiusta le introduzioni per sembrare più umane</li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">{posts.length} articoli trovati</p>
            <p className="text-sm text-muted-foreground">
              {applied ? 'Umanizzazione già applicata' : 'Pronti per l\'umanizzazione'}
            </p>
          </div>
          <div className="flex gap-2">
            <Badge variant={applied ? 'default' : 'secondary'}>
              {applied ? 'Applicato' : 'Da applicare'}
            </Badge>
          </div>
        </div>

        <Button 
          onClick={applyHumanization}
          disabled={loading || applied}
          className="w-full"
        >
          {loading ? 'Applicando umanizzazione...' : applied ? 'Umanizzazione già applicata' : 'Applica umanizzazione a tutti gli articoli'}
        </Button>

        {applied && (
          <div className="text-center text-sm text-muted-foreground">
            L'umanizzazione è stata applicata. I lettori ora vedranno un copy più naturale e conversazionale.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BlogCopyHumanizer;