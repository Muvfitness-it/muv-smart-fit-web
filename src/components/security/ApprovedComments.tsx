import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';
import { it } from 'date-fns/locale';

interface ApprovedComment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  created_at: string;
}

interface ApprovedCommentsProps {
  postId: string;
}

export const ApprovedComments: React.FC<ApprovedCommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<ApprovedComment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_comments')
          .select('id, post_id, author_name, content, created_at')
          .eq('post_id', postId)
          .eq('status', 'approved')
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error loading comments:', error);
          return;
        }

        setComments(data || []);
      } catch (error) {
        console.error('Unexpected error loading comments:', error);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="h-8 w-48 bg-muted animate-pulse rounded mb-4" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-4 w-32 bg-muted animate-pulse rounded mb-2" />
                <div className="h-16 w-full bg-muted animate-pulse rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Commenti</h3>
        <p className="text-muted-foreground">
          Nessun commento ancora. Sii il primo a lasciare un commento!
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">
        Commenti ({comments.length})
      </h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <Card key={comment.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{comment.author_name}</h4>
                <time 
                  className="text-sm text-muted-foreground"
                  dateTime={comment.created_at}
                >
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                    locale: it
                  })}
                </time>
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p className="whitespace-pre-wrap text-foreground">
                  {comment.content}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};