import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface BlogPostFooterProps {
  onShare: () => void;
}

const BlogPostFooter: React.FC<BlogPostFooterProps> = ({ onShare }) => {
  const navigate = useNavigate();

  return (
    <footer className="pb-12 pt-8 border-t border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button 
          onClick={onShare} 
          className="bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all bg-slate-950 hover:bg-slate-800 text-slate-50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Condividi questo articolo
        </Button>
        
        <Button 
          onClick={() => navigate('/blog')} 
          variant="outline" 
          className="border-gray-600 text-gray-300 hover:text-white px-6 py-3 rounded-xl font-medium transition-all bg-slate-950 hover:bg-slate-800"
        >
          Altri articoli
        </Button>
      </div>
    </footer>
  );
};

export default BlogPostFooter;