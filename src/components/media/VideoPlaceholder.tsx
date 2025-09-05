import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Camera, FileText, Download } from 'lucide-react';

const VideoPlaceholder: React.FC<{ title: string; description: string; className?: string }> = ({
  title,
  description,
  className = ""
}) => {
  return (
    <Card className={`border-brand-primary/20 hover:border-brand-primary/40 transition-all ${className}`}>
      <CardContent className="p-6">
        <div className="aspect-video bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 rounded-lg relative mb-4 flex items-center justify-center">
          <div className="bg-white/90 p-4 rounded-full shadow-lg">
            <Play className="text-brand-primary" size={32} />
          </div>
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
            2:30
          </div>
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">{description}</p>
        
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Camera size={14} />
          <span>Video dimostrativo HD</span>
          <span>•</span>
          <span>3.2k visualizzazioni</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default VideoPlaceholder;