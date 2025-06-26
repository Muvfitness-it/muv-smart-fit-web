
import { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async (elementId: string, fileName: string) => {
    setIsExporting(true);
    
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        throw new Error('Elemento non trovato per l\'export PDF');
      }

      // Crea canvas dell'elemento
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#111827', // bg-gray-900
        logging: false
      });

      // Crea PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Calcola dimensioni
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = Math.min(pdfWidth / canvasWidth, pdfHeight / canvasHeight);
      const imgWidth = canvasWidth * ratio;
      const imgHeight = canvasHeight * ratio;

      // Aggiungi logo MUV in alto a destra
      try {
        const logoImg = new Image();
        logoImg.onload = () => {
          // Converti logo in canvas per ottenere dataURL
          const logoCanvas = document.createElement('canvas');
          const logoCtx = logoCanvas.getContext('2d');
          logoCanvas.width = 100;
          logoCanvas.height = 100;
          logoCtx?.drawImage(logoImg, 0, 0, 100, 100);
          const logoData = logoCanvas.toDataURL('image/png');
          
          // Aggiungi logo al PDF (20mm dal bordo destro, 10mm dall'alto)
          pdf.addImage(logoData, 'PNG', pdfWidth - 30, 10, 20, 20);
          
          // Aggiungi contenuto principale (spostato un po' in basso per lasciare spazio al logo)
          pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, 35, imgWidth, imgHeight - 35);
          
          // Salva PDF
          pdf.save(fileName);
        };
        logoImg.src = '/lovable-uploads/1a388b9f-8982-4cd3-abd5-2fa541cbc8ac.png';
      } catch (logoError) {
        console.warn('Errore caricamento logo, continuo senza:', logoError);
        // Fallback senza logo
        pdf.addImage(imgData, 'PNG', (pdfWidth - imgWidth) / 2, 10, imgWidth, imgHeight);
        pdf.save(fileName);
      }

    } catch (error) {
      console.error('Errore export PDF:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportToPDF,
    isExporting
  };
};
