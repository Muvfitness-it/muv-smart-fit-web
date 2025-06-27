
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface BlogPost {
  title: string;
  content: string;
  excerpt?: string;
  slug: string;
  author_name?: string;
  author_email?: string;
  status: 'draft' | 'published';
  published_at?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  category?: string;
  tags?: string[];
}

interface ImportStats {
  total: number;
  imported: number;
  skipped: number;
  errors: number;
}

export const useBlogImport = () => {
  const [isImporting, setIsImporting] = useState(false);
  const [importStats, setImportStats] = useState<ImportStats>({
    total: 0,
    imported: 0,
    skipped: 0,
    errors: 0
  });

  const parseXMLFile = async (file: File): Promise<BlogPost[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const xmlContent = e.target?.result as string;
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');
          
          const posts: BlogPost[] = [];
          
          // Parse WordPress/generic XML export
          const items = xmlDoc.querySelectorAll('item');
          
          items.forEach((item) => {
            const title = item.querySelector('title')?.textContent || '';
            const content = item.querySelector('content\\:encoded, encoded')?.textContent || 
                           item.querySelector('description')?.textContent || '';
            const link = item.querySelector('link')?.textContent || '';
            const pubDate = item.querySelector('pubDate')?.textContent || '';
            const creator = item.querySelector('dc\\:creator, creator')?.textContent || 'MUV Team';
            
            // Create slug from title if not present in link
            let slug = '';
            if (link) {
              const urlParts = link.split('/');
              slug = urlParts[urlParts.length - 1] || urlParts[urlParts.length - 2];
            } else {
              slug = title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .trim();
            }

            // Extract excerpt from content (first 200 chars)
            const excerpt = content.replace(/<[^>]*>/g, '').substring(0, 200) + '...';

            const post: BlogPost = {
              title: title.trim(),
              content: content.trim(),
              excerpt: excerpt,
              slug: slug,
              author_name: creator,
              status: 'draft', // Import as draft initially
              published_at: pubDate ? new Date(pubDate).toISOString() : undefined,
              meta_title: title.substring(0, 60),
              meta_description: excerpt.substring(0, 160)
            };

            if (post.title && post.content) {
              posts.push(post);
            }
          });

          resolve(posts);
        } catch (error) {
          console.error('Error parsing XML:', error);
          reject(error);
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  };

  const importPosts = async (posts: BlogPost[]) => {
    setIsImporting(true);
    setImportStats({ total: posts.length, imported: 0, skipped: 0, errors: 0 });

    let imported = 0;
    let skipped = 0;
    let errors = 0;

    for (const post of posts) {
      try {
        // Check if post already exists
        const { data: existingPost } = await supabase
          .from('blog_posts')
          .select('id')
          .eq('slug', post.slug)
          .maybeSingle();

        if (existingPost) {
          console.log(`Post with slug "${post.slug}" already exists, skipping`);
          skipped++;
          continue;
        }

        // Insert the post
        const { error } = await supabase
          .from('blog_posts')
          .insert({
            title: post.title,
            content: post.content,
            excerpt: post.excerpt,
            slug: post.slug,
            author_name: post.author_name || 'MUV Team',
            author_email: post.author_email,
            status: post.status,
            published_at: post.published_at,
            meta_title: post.meta_title,
            meta_description: post.meta_description,
            meta_keywords: post.meta_keywords
          });

        if (error) {
          console.error(`Error importing post "${post.title}":`, error);
          errors++;
        } else {
          imported++;
          console.log(`Successfully imported: ${post.title}`);
        }

        // Update stats in real-time
        setImportStats({
          total: posts.length,
          imported,
          skipped,
          errors
        });

      } catch (error) {
        console.error(`Error processing post "${post.title}":`, error);
        errors++;
      }
    }

    setIsImporting(false);
    
    // Final toast notification
    if (imported > 0) {
      toast.success(`✅ Importazione completata: ${imported} articoli importati, ${skipped} saltati, ${errors} errori`);
    } else {
      toast.error(`❌ Importazione fallita: ${errors} errori`);
    }

    return { imported, skipped, errors };
  };

  return {
    isImporting,
    importStats,
    parseXMLFile,
    importPosts
  };
};
