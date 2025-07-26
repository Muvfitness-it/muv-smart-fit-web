import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAdminAuth } from '@/hooks/useAdminAuth';

interface BlogHeaderProps {
  showBackButton?: boolean;
  backUrl?: string;
  title?: string;
  canEdit?: boolean;
  editUrl?: string;
  onShare?: () => void;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({
  showBackButton = true,
  backUrl = '/blog',
  title,
  canEdit = false,
  editUrl,
  onShare
}) => {
  const navigate = useNavigate();
  const { isAdmin } = useAdminAuth();

  return (
    <header className="sticky top-[var(--header-height)] bg-gray-900/95 backdrop-blur-sm border-b border-border z-40">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(backUrl)}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Torna al Blog
              </Button>
            )}
            {title && (
              <h1 className="text-lg font-semibold text-foreground truncate max-w-md">
                {title}
              </h1>
            )}
          </div>

          <div className="flex items-center space-x-2">
            {onShare && (
              <Button
                variant="outline"
                size="sm"
                onClick={onShare}
                className="hidden sm:flex"
              >
                <Share2 className="h-4 w-4 mr-2" />
                Condividi
              </Button>
            )}
            
            {canEdit && editUrl && isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate(editUrl)}
                className="hidden sm:flex"
              >
                <Edit className="h-4 w-4 mr-2" />
                Modifica
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default BlogHeader;