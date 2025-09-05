import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Star, Users } from 'lucide-react';
import LeadMagnetModal from './LeadMagnetModal';

interface LeadMagnetCardProps {
  title: string;
  description: string;
  benefits: string[];
  downloadUrl: string;
  preview?: string;
  downloads?: number;
  rating?: number;
  className?: string;
}

const LeadMagnetCard: React.FC<LeadMagnetCardProps> = ({
  title,
  description,
  benefits,
  downloadUrl,
  preview,
  downloads = 1247,
  rating = 4.9,
  className = ""
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const magnet = {
    title,
    description,
    benefits,
    downloadUrl,
    preview
  };

  return (
    <>
      <Card className={`border-brand-primary/20 hover:border-brand-primary/40 transition-all hover:shadow-lg ${className}`}>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="bg-brand-primary/10 p-3 rounded-full flex-shrink-0">
              <Download className="text-brand-primary" size={24} />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm mb-4">{description}</p>
              
              <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Users size={14} />
                  <span>{downloads.toLocaleString()} download</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="fill-yellow-400 text-yellow-400" size={14} />
                  <span>{rating}/5</span>
                </div>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  GRATIS
                </span>
              </div>
              
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-brand-accent hover:bg-brand-accent/90 text-white"
              >
                <Download className="mr-2" size={16} />
                Scarica Gratis
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <LeadMagnetModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        magnet={magnet}
      />
    </>
  );
};

export default LeadMagnetCard;