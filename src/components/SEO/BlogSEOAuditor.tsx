import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface BlogSEOIssue {
  id: string;
  title: string;
  issue: string;
  severity: 'high' | 'medium' | 'low';
}

const BlogSEOAuditor: React.FC = () => {
  const [issues, setIssues] = useState<BlogSEOIssue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auditBlogSEO();
  }, []);

  const auditBlogSEO = async () => {
    try {
      const { data: posts, error } = await supabase
        .from('blog_posts')
        .select('id, title, meta_description, slug, content')
        .eq('status', 'published');

      if (error) {
        console.error('Error fetching blog posts:', error);
        return;
      }

      const blogIssues: BlogSEOIssue[] = [];

      posts?.forEach(post => {
        // Check title length
        if (post.title && post.title.length > 60) {
          blogIssues.push({
            id: post.id,
            title: post.title,
            issue: `Title too long (${post.title.length} characters, should be ≤60)`,
            severity: 'high'
          });
        }

        // Check missing meta description
        if (!post.meta_description || post.meta_description.trim() === '') {
          blogIssues.push({
            id: post.id,
            title: post.title,
            issue: 'Missing meta description',
            severity: 'high' 
          });
        }

        // Check meta description length
        if (post.meta_description && post.meta_description.length > 160) {
          blogIssues.push({
            id: post.id,
            title: post.title,
            issue: `Meta description too long (${post.meta_description.length} characters, should be ≤160)`,
            severity: 'medium'
          });
        }

        // Check slug length and structure
        if (post.slug && post.slug.length > 50) {
          blogIssues.push({
            id: post.id,
            title: post.title,
            issue: `Slug too long (${post.slug.length} characters, should be ≤50)`,
            severity: 'medium'
          });
        }

        // Check content length
        if (post.content && post.content.length < 300) {
          blogIssues.push({
            id: post.id,
            title: post.title,
            issue: `Content too short (${post.content.length} characters, should be ≥300)`,
            severity: 'low'
          });
        }
      });

      setIssues(blogIssues);
    } catch (error) {
      console.error('Blog SEO audit error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Auditing blog SEO...</div>;

  if (issues.length === 0) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
        <h3 className="text-green-800 font-semibold mb-2">✅ Blog SEO Health: Excellent</h3>
        <p className="text-green-700">All blog posts pass basic SEO checks!</p>
      </div>
    );
  }

  const highPriorityIssues = issues.filter(issue => issue.severity === 'high');
  const mediumPriorityIssues = issues.filter(issue => issue.severity === 'medium');
  const lowPriorityIssues = issues.filter(issue => issue.severity === 'low');

  return (
    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
      <h3 className="text-yellow-800 font-semibold mb-4">⚠️ Blog SEO Issues Found</h3>
      
      {highPriorityIssues.length > 0 && (
        <div className="mb-4">
          <h4 className="text-red-700 font-medium mb-2">🔴 High Priority ({highPriorityIssues.length})</h4>
          <ul className="space-y-1 text-sm">
            {highPriorityIssues.slice(0, 5).map((issue, index) => (
              <li key={index} className="text-red-600">
                <strong>{issue.title.substring(0, 50)}...</strong> - {issue.issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {mediumPriorityIssues.length > 0 && (
        <div className="mb-4">
          <h4 className="text-orange-700 font-medium mb-2">🟡 Medium Priority ({mediumPriorityIssues.length})</h4>
          <ul className="space-y-1 text-sm">
            {mediumPriorityIssues.slice(0, 3).map((issue, index) => (
              <li key={index} className="text-orange-600">
                <strong>{issue.title.substring(0, 50)}...</strong> - {issue.issue}
              </li>
            ))}
          </ul>
        </div>
      )}

      {lowPriorityIssues.length > 0 && (
        <div>
          <h4 className="text-yellow-700 font-medium mb-2">🟢 Low Priority ({lowPriorityIssues.length})</h4>
          <p className="text-sm text-yellow-600">Minor content length issues found.</p>
        </div>
      )}

      <div className="mt-4 pt-3 border-t border-yellow-200">
        <p className="text-xs text-yellow-700">
          This audit runs automatically and shows only development environment issues.
        </p>
      </div>
    </div>
  );
};

export default BlogSEOAuditor;