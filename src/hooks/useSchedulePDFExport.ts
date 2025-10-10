import { toast } from 'sonner';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const useSchedulePDFExport = () => {
  const exportToPDF = async (elementId: string, filename: string = 'muv-orari-corsi.pdf') => {
    try {
      const element = document.getElementById(elementId);
      if (!element) {
        toast.error('Elemento non trovato');
        return;
      }

      toast.loading('Generazione PDF in corso...');

      // Aumenta risoluzione per qualità stampa
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        logging: false
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Header
      pdf.setFontSize(20);
      pdf.setTextColor(40, 40, 40);
      pdf.text('MUV Fitness - Orari Corsi Small Group', 15, 15);
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Aggiornato al: ${new Date().toLocaleDateString('it-IT', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      })}`, 15, 22);
      
      // Schedule Image
      const imgWidth = 267; // A4 landscape width - margins
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 15, 30, imgWidth, Math.min(imgHeight, 160));
      
      // Footer
      pdf.setFontSize(8);
      pdf.setTextColor(80, 80, 80);
      pdf.text('Piazzetta Don Walter Soave, 2 - Legnago (VR) | Tel: 329 107 0374 | www.muvfitness.it', 15, 195);
      
      pdf.save(filename);
      
      toast.dismiss();
      toast.success('PDF scaricato con successo');
    } catch (error) {
      console.error('Errore durante export PDF:', error);
      toast.dismiss();
      toast.error('Errore durante la generazione del PDF');
    }
  };
  
  const printSchedule = () => {
    window.print();
  };
  
  return { exportToPDF, printSchedule };
};
