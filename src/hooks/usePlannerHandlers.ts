
import { useState } from 'react';
import { FormData, MealPlanData, ShoppingListData, ViewType } from '@/types/planner';
import { useMealPlanGeneration } from './useMealPlanGeneration';
import { useShoppingListGeneration } from './useShoppingListGeneration';
import { useCoachChat } from './useCoachChat';
import { useAnalytics } from './useAnalytics';
import { usePDFExport } from './usePDFExport';
import { useToast } from './use-toast';

export const usePlannerHandlers = () => {
  const [currentView, setCurrentView] = useState<ViewType>('calculator');
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [shoppingListData, setShoppingListData] = useState<ShoppingListData | null>(null);

  const { generateMealPlan, isLoading: isMealPlanLoading, error: mealPlanError } = useMealPlanGeneration();
  const { generateShoppingList, isLoading: isShoppingListLoading, error: shoppingListError } = useShoppingListGeneration();
  const { askCoach } = useCoachChat();
  const { trackPlannerUsage } = useAnalytics();
  const { exportMealPlanToPDF, isExporting } = usePDFExport();
  const { toast } = useToast();

  const handleFormSubmit = async (targetCalories: number, formData: FormData) => {
    console.log('Starting meal plan generation...', { targetCalories, formData });
    
    const result = await generateMealPlan(
      targetCalories, 
      formData.allergies, 
      formData.intolerances,
      formData.planType
    );
    
    if (result) {
      setMealPlanData(result);
      setCurrentView('mealPlan');
      
      console.log('Tracking meal plan generation...');
      await trackPlannerUsage('meal_plan_generated', targetCalories, formData.planType);
      console.log('Meal plan generation tracked successfully');
    } else {
      console.error('Failed to generate meal plan');
    }
  };

  const handleGenerateShoppingList = async () => {
    if (!mealPlanData) {
      console.error('No meal plan data available for shopping list generation');
      return;
    }
    
    console.log('Starting shopping list generation...');
    const result = await generateShoppingList(mealPlanData);
    if (result) {
      setShoppingListData(result);
      setCurrentView('shoppingList');
      
      console.log('Tracking shopping list generation...');
      await trackPlannerUsage('shopping_list_generated');
    }
  };

  const handleAskCoach = async (question: string) => {
    console.log('Starting coach chat...');
    const result = await askCoach(question);
    
    await trackPlannerUsage('coach_question_asked');
    
    return result;
  };

  const handleExportPDF = async (mealPlanData: MealPlanData, fileName: string) => {
    try {
      console.log(`Exporting meal plan as ${fileName}`);
      await exportMealPlanToPDF(mealPlanData, fileName);
      
      await trackPlannerUsage('pdf_exported');
      
      toast({
        title: "PDF Esportato!",
        description: "Il file PDF è stato scaricato con successo.",
      });
    } catch (error) {
      console.error('Errore export PDF:', error);
      toast({
        title: "Errore Export",
        description: "Si è verificato un errore durante l'esportazione del PDF.",
        variant: "destructive",
      });
    }
  };

  const handleRecalculate = () => {
    setCurrentView('calculator');
    setMealPlanData(null);
    setShoppingListData(null);
  };

  const handleViewTracking = () => {
    setCurrentView('tracking');
  };

  const handleBackToMealPlan = () => {
    setCurrentView('mealPlan');
  };

  return {
    // State
    currentView,
    mealPlanData,
    shoppingListData,
    
    // Loading states
    isMealPlanLoading,
    isShoppingListLoading,
    isExporting,
    
    // Error states
    mealPlanError,
    shoppingListError,
    
    // Handlers
    handleFormSubmit,
    handleGenerateShoppingList,
    handleAskCoach,
    handleExportPDF,
    handleRecalculate,
    handleViewTracking,
    handleBackToMealPlan
  };
};
