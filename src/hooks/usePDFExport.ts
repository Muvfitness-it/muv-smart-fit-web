
import { useState } from 'react';
import jsPDF from 'jspdf';
import { MealPlanData, MealPlanType, WeeklyMealPlan } from '@/types/planner';

export const usePDFExport = () => {
  const [isExporting, setIsExporting] = useState(false);

  const exportMealPlanToPDF = async (mealPlanData: MealPlanData, fileName: string) => {
    setIsExporting(true);
    
    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Colori
      const primaryColor = [34, 197, 94]; // green-500
      const textColor = [31, 41, 55]; // gray-800
      const lightGray = [243, 244, 246]; // gray-100
      
      let yPosition = 20;
      
      // Header con logo
      try {
        // Carica il logo
        const logoResponse = await fetch('/lovable-uploads/df526450-5eb6-4c2b-a603-0d3470cb0484.png');
        const logoBlob = await logoResponse.blob();
        const logoDataUrl = await new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(logoBlob);
        });
        
        // Aggiungi logo (dimensioni ridotte e meglio posizionato)
        pdf.addImage(logoDataUrl, 'PNG', pageWidth - 50, 10, 35, 15);
      } catch (logoError) {
        console.warn('Errore caricamento logo:', logoError);
      }
      
      // Titolo principale
      pdf.setFontSize(24);
      pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.text('Piano Nutrizionale Personalizzato', 20, yPosition);
      yPosition += 15;
      
      // Sottotitolo con calorie
      pdf.setFontSize(16);
      pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
      pdf.text(`${mealPlanData.calories} kcal - ${mealPlanData.planType === 'weekly' ? 'Piano Settimanale' : 'Piano Giornaliero'}`, 20, yPosition);
      yPosition += 15;
      
      // Linea separatrice
      pdf.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      pdf.setLineWidth(0.5);
      pdf.line(20, yPosition, pageWidth - 20, yPosition);
      yPosition += 10;

      if (mealPlanData.planType === 'weekly') {
        // Piano settimanale
        const weeklyPlan = mealPlanData.plan as WeeklyMealPlan;
        const days = ['lunedi', 'martedi', 'mercoledi', 'giovedi', 'venerdi', 'sabato', 'domenica'];
        const dayLabels = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
        
        days.forEach((day, dayIndex) => {
          // Controlla se serve una nuova pagina
          if (yPosition > pageHeight - 60) {
            pdf.addPage();
            yPosition = 20;
          }
          
          // Titolo del giorno
          pdf.setFontSize(18);
          pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          pdf.text(dayLabels[dayIndex], 20, yPosition);
          yPosition += 10;
          
          // Pasti del giorno
          const dayPlan = weeklyPlan[day as keyof WeeklyMealPlan];
          yPosition = addDayMealsToPDF(pdf, dayPlan, yPosition, pageWidth, pageHeight, primaryColor, textColor);
          
          yPosition += 5; // Spazio tra giorni
        });
      } else {
        // Piano giornaliero
        const dailyPlan = mealPlanData.plan as MealPlanType;
        yPosition = addDayMealsToPDF(pdf, dailyPlan, yPosition, pageWidth, pageHeight, primaryColor, textColor);
      }
      
      // Footer
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        pdf.setFontSize(8);
        pdf.setTextColor(128, 128, 128);
        pdf.text('Generato da MUV Planner - Non sostituisce una consulenza medica', 20, pageHeight - 10);
        pdf.text(`Pagina ${i} di ${totalPages}`, pageWidth - 40, pageHeight - 10);
      }
      
      // Salva il PDF
      pdf.save(fileName);
      
    } catch (error) {
      console.error('Errore export PDF:', error);
      throw error;
    } finally {
      setIsExporting(false);
    }
  };

  return {
    exportMealPlanToPDF,
    isExporting
  };
};

// Funzione helper per aggiungere i pasti di un giorno al PDF
const addDayMealsToPDF = (
  pdf: jsPDF, 
  dayPlan: MealPlanType, 
  startY: number, 
  pageWidth: number, 
  pageHeight: number,
  primaryColor: number[],
  textColor: number[]
): number => {
  let yPosition = startY;
  
  const mealOrder: (keyof MealPlanType)[] = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];
  const mealLabels = {
    colazione: '🍳 Colazione',
    spuntino_mattutino: '🍎 Spuntino Mattutino', 
    pranzo: '🍽️ Pranzo',
    spuntino_pomeridiano: '🥪 Spuntino Pomeridiano',
    cena: '🌙 Cena'
  };
  
  mealOrder.forEach(mealName => {
    const mealData = dayPlan[mealName];
    if (!mealData) return;
    
    // Controlla se serve una nuova pagina
    if (yPosition > pageHeight - 40) {
      pdf.addPage();
      yPosition = 20;
    }
    
    // Nome del pasto
    pdf.setFontSize(14);
    pdf.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    pdf.text(mealLabels[mealName], 20, yPosition);
    
    // Calorie del pasto
    pdf.setFontSize(12);
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    pdf.text(`~${mealData.kcal} kcal`, pageWidth - 50, yPosition);
    yPosition += 8;
    
    // Descrizione
    pdf.setFontSize(10);
    pdf.setTextColor(textColor[0], textColor[1], textColor[2]);
    const descriptionLines = pdf.splitTextToSize(mealData.descrizione, pageWidth - 50);
    pdf.text(descriptionLines, 25, yPosition);
    yPosition += descriptionLines.length * 4 + 3;
    
    // Alimenti
    pdf.setFontSize(9);
    pdf.setTextColor(100, 100, 100);
    mealData.alimenti.forEach(alimento => {
      if (yPosition > pageHeight - 15) {
        pdf.addPage();
        yPosition = 20;
      }
      pdf.text(`• ${alimento}`, 25, yPosition);
      yPosition += 4;
    });
    
    yPosition += 8; // Spazio tra pasti
  });
  
  return yPosition;
};
