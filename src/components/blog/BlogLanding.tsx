
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Sparkles, TrendingUp, FileText, Clock, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface BlogLandingProps {
  recentArticles?: Array<{
    id: string;
    title: string;
    excerpt?: string;
    slug: string;
    published_at?: string;
    views_count?: number;
    reading_time?: number;
  }>;
}

const BlogLanding: React.FC<BlogLandingProps> = ({ recentArticles = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-magenta-400 via-viola-400 to-blu-400 bg-clip-text text-transparent">
            Blog MUV Fitness
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
            Crea contenuti di qualità professionale con l'aiuto dell'intelligenza artificiale
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => navigate('/blog/scrivi')}
            className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105"
          >
            <Sparkles className="w-6 h-6 mr-2" />
            Scrivi Articolo con IA
          </Button>
          
          <Button 
            onClick={() => navigate('/blog/gestisci')}
            variant="outline"
            className="border-magenta-500 text-magenta-400 hover:bg-magenta-500 hover:text-white px-8 py-4 rounded-full text-lg font-bold"
          >
            <FileText className="w-6 h-6 mr-2" />
            Gestisci Articoli
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-6">
        <Card className="bg-gray-800 border-gray-700 hover:border-magenta-500 transition-colors">
          <CardHeader>
            <PenTool className="w-12 h-12 text-magenta-400 mb-2" />
            <CardTitle className="text-white">Scrittura AI</CardTitle>
            <CardDescription className="text-gray-400">
              Genera articoli ottimizzati SEO in pochi minuti
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm">
              Descrivi l'argomento e l'IA creerà un articolo completo, ottimizzato per i motori di ricerca.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:border-viola-500 transition-colors">
          <CardHeader>
            <TrendingUp className="w-12 h-12 text-viola-400 mb-2" />
            <CardTitle className="text-white">SEO Automatico</CardTitle>
            <CardDescription className="text-gray-400">
              Ottimizzazione automatica per i motori di ricerca
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm">
              Meta title, description, keywords e struttura ottimizzata vengono generati automaticamente.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700 hover:border-blu-500 transition-colors">
          <CardHeader>
            <Sparkles className="w-12 h-12 text-blu-400 mb-2" />
            <CardTitle className="text-white">Editor Avanzato</CardTitle>
            <CardDescription className="text-gray-400">
              Modifica e personalizza i contenuti generati
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm">
              Editor completo con anteprima in tempo reale e gestione delle immagini.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Articoli Recenti</h2>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/blog/gestisci')}
              className="text-magenta-400 hover:text-magenta-300"
            >
              Vedi tutti
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentArticles.slice(0, 6).map((article) => (
              <Card 
                key={article.id}
                className="bg-gray-800 border-gray-700 hover:border-magenta-500 transition-all duration-300 cursor-pointer transform hover:scale-105"
                onClick={() => navigate(`/blog/${article.slug}`)}
              >
                <CardHeader>
                  <CardTitle className="text-white text-lg line-clamp-2">
                    {article.title}
                  </CardTitle>
                  {article.excerpt && (
                    <CardDescription className="text-gray-400 line-clamp-3">
                      {article.excerpt}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      {article.reading_time && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{article.reading_time} min</span>
                        </div>
                      )}
                      {article.views_count && (
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{article.views_count}</span>
                        </div>
                      )}
                    </div>
                    {article.published_at && (
                      <span>
                        {new Date(article.published_at).toLocaleDateString('it-IT')}
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="text-center bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8">
        <h3 className="text-3xl font-bold text-white mb-4">
          Pronto a creare contenuti di qualità?
        </h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Utilizza l'intelligenza artificiale per creare articoli ottimizzati che posizionano il tuo brand come leader nel settore fitness.
        </p>
        <Button 
          onClick={() => navigate('/blog/scrivi')}
          className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white px-10 py-4 rounded-full text-xl font-bold"
        >
          <Sparkles className="w-6 h-6 mr-2" />
          Inizia Ora
        </Button>
      </section>
    </div>
  );
};

export default BlogLanding;
