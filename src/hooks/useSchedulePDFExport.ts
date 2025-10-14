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

      // Forza scroll a inizio elemento per cattura completa
      element.scrollIntoView({ block: 'start' });
      
      // Aspetta rendering completo
      await new Promise(resolve => setTimeout(resolve, 500));

      // Cattura con opzioni ottimizzate per qualità e completezza
      const canvas = await html2canvas(element, { 
        scale: 3,
        useCORS: true,
        logging: false,
        windowWidth: element.scrollWidth,
        windowHeight: element.scrollHeight,
        scrollY: -window.scrollY,
        scrollX: -window.scrollX
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4'
      });
      
      // Header compatto
      pdf.setFontSize(16);
      pdf.setTextColor(40, 40, 40);
      pdf.text('MUV Fitness - Orari Corsi Small Group', 12, 12);
      
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text(`Aggiornato al: ${new Date().toLocaleDateString('it-IT', { 
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
      })}`, 12, 18);
      
      // Calcolo dinamico dimensioni per fit A4
      const pdfWidth = 277; // A4 landscape width (297mm - 2*10mm margin)
      const pdfHeight = 190; // A4 landscape height (210mm - 20mm header/footer)
      
      const imgWidth = pdfWidth;
      const imgHeight = (canvas.height * pdfWidth) / canvas.width;
      
      // Scala se supera altezza disponibile
      let finalWidth = imgWidth;
      let finalHeight = imgHeight;
      
      if (imgHeight > pdfHeight) {
        finalHeight = pdfHeight;
        finalWidth = (canvas.width * pdfHeight) / canvas.height;
      }
      
      // Centra orizzontalmente se necessario
      const xOffset = (pdfWidth - finalWidth) / 2 + 10;
      
      pdf.addImage(imgData, 'PNG', xOffset, 22, finalWidth, finalHeight);
      
      // Footer
      pdf.setFontSize(7);
      pdf.setTextColor(80, 80, 80);
      pdf.text('Piazzetta Don Walter Soave, 2 - Legnago (VR) | Tel: 329 107 0374 | www.muvfitness.it', 12, 205);
      
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
