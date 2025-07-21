import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Sparkles, TrendingUp, FileText, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import BlogPostCard from './BlogPostCard';
interface BlogLandingProps {
  recentArticles?: Array<{
    id: string;
    title: string;
    excerpt?: string;
    slug: string;
    published_at?: string;
    views_count?: number;
    reading_time?: number;
    featured_image?: string;
  }>;
  showAllArticles?: boolean;
  onShowAllArticles?: () => void;
}
const BlogLanding: React.FC<BlogLandingProps> = ({
  recentArticles = [],
  showAllArticles = false,
  onShowAllArticles
}) => {
  const navigate = useNavigate();
  const {
    user,
    isAdmin
  } = useAuth();
  return <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-magenta-400 via-viola-400 to-blu-400 bg-clip-text text-transparent">
            Blog MUV Fitness
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Scopri i nostri articoli su fitness, allenamento e benessere
          </p>
        </div>
        
        {/* Admin Controls */}
        {user && isAdmin && <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => navigate('/blog/scrivi-con-ia')} className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105">
              <Sparkles className="w-6 h-6 mr-2" />
              Scrivi Articolo con IA
            </Button>
            
            <Button onClick={() => navigate('/blog/gestisci')} variant="outline" className="border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-white px-8 py-4 rounded-full text-lg font-bold">
              <FileText className="w-6 h-6 mr-2" />
              Gestisci Articoli
            </Button>
          </div>}

        {/* Login for non-admin users */}
        {!user && <Button onClick={() => navigate('/auth')} variant="outline" className="border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-white px-8 py-4 rounded-full text-lg font-bold">
            <LogIn className="w-6 h-6 mr-2" />
            Accesso Amministratori
          </Button>}
      </section>

      {/* Features Section */}
      

      {/* Recent Articles */}
      {recentArticles.length > 0 && <section className="space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Articoli Recenti
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Scopri gli ultimi articoli del nostro blog, con consigli pratici e informazioni utili per il tuo benessere
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(showAllArticles ? recentArticles : recentArticles.slice(0, 6)).map(article => <BlogPostCard key={article.id} post={article} />)}
          </div>

          {recentArticles.length > 6 && !showAllArticles && <div className="text-center">
              <Button onClick={onShowAllArticles} variant="outline" className="border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-white">
                Vedi tutti gli articoli
              </Button>
            </div>}
        </section>}

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-white mb-4">
          Inizia il tuo percorso fitness
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Scopri tutti i nostri servizi personalizzati per raggiungere i tuoi obiettivi di forma fisica e benessere.
        </p>
        <Button onClick={() => navigate('/contatti')} className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-10 py-4 rounded-full text-xl font-bold">
          Contattaci
        </Button>
      </section>
    </div>;
};
export default BlogLanding;