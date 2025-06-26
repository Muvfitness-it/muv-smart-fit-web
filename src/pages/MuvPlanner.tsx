import React, { useState, useEffect } from 'react';
import CalculatorForm from '../components/planner/CalculatorForm';
import MealPlan from '../components/planner/MealPlan';
import ShoppingList from '../components/planner/ShoppingList';
import TrackingDashboard from '../components/planner/TrackingDashboard';
import UsageCounter from '../components/planner/UsageCounter';
import PageSEO from '../components/SEO/PageSEO';
import { useMealPlanGeneration } from '../hooks/useMealPlanGeneration';
import { useShoppingListGeneration } from '../hooks/useShoppingListGeneration';
import { useCoachChat } from '../hooks/useCoachChat';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePDFExport } from '../hooks/usePDFExport';
import { useToast } from '../hooks/use-toast';
import { FormData, MealPlanData, ShoppingListData, ViewType } from '../types/planner';

const MuvPlanner = () => {
  const [currentView, setCurrentView] = useState<ViewType>('calculator');
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    age: '30',
    weight: '70',
    height: '175',
    activityLevel: '1.375',
    goal: 'maintain',
    allergies: [],
    intolerances: [],
    planType: 'daily'
  });
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [shoppingListData, setShoppingListData] = useState<ShoppingListData | null>(null);

  const { generateMealPlan, isLoading: isMealPlanLoading, error: mealPlanError } = useMealPlanGeneration();
  const { generateShoppingList, isLoading: isShoppingListLoading, error: shoppingListError } = useShoppingListGeneration();
  const { askCoach } = useCoachChat();
  const { trackPlannerUsage, trackSiteVisit } = useAnalytics();
  const { exportMealPlanToPDF, isExporting } = usePDFExport();
  const { toast } = useToast();

  // Track page visit
  useEffect(() => {
    trackSiteVisit('/muv-planner');
  }, [trackSiteVisit]);

  const handleFormSubmit = async (targetCalories: number) => {
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
      
      // Track planner usage with better logging
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
      
      // Track planner usage
      console.log('Tracking shopping list generation...');
      await trackPlannerUsage('shopping_list_generated');
    }
  };

  const handleAskCoach = async (question: string) => {
    console.log('Starting coach chat...');
    const result = await askCoach(question);
    
    // Track planner usage
    await trackPlannerUsage('coach_question_asked');
    
    return result;
  };

  const handleExportPDF = async (mealPlanData: MealPlanData, fileName: string) => {
    try {
      console.log(`Exporting meal plan as ${fileName}`);
      await exportMealPlanToPDF(mealPlanData, fileName);
      
      // Track PDF export
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

  const renderCurrentView = () => {
    switch (currentView) {
      case 'calculator':
        return (
          <CalculatorForm
            formData={formData}
            isLoading={isMealPlanLoading}
            error={mealPlanError}
            onFormDataChange={setFormData}
            onSubmit={handleFormSubmit}
          />
        );
      case 'mealPlan':
        return mealPlanData ? (
          <MealPlan
            mealPlanData={mealPlanData}
            formData={{
              goal: formData.goal,
              allergies: formData.allergies,
              intolerances: formData.intolerances,
              planType: formData.planType
            }}
            isShoppingListLoading={isShoppingListLoading}
            mealPlanError={shoppingListError}
            onGenerateShoppingList={handleGenerateShoppingList}
            onExportPDF={handleExportPDF}
            onRecalculate={handleRecalculate}
            onAskCoach={handleAskCoach}
            onViewTracking={handleViewTracking}
          />
        ) : null;
      case 'shoppingList':
        return shoppingListData ? (
          <ShoppingList
            shoppingListData={shoppingListData}
            onBackToMealPlan={() => setCurrentView('mealPlan')}
            onExportPDF={handleExportPDF}
            onRecalculate={handleRecalculate}
          />
        ) : null;
      case 'tracking':
        return (
          <TrackingDashboard
            onBackToCalculator={handleRecalculate}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <PageSEO
        title="MUV Planner - Assistente Nutrizionale AI | Piano Alimentare Personalizzato Gratis"
        description="Crea il tuo piano alimentare personalizzato con l'intelligenza artificiale. Calcolo calorie, piani settimanali, lista spesa automatica. Gratis e senza registrazione."
        keywords="piano alimentare personalizzato, calcolo calorie, dieta personalizzata, nutrizionista AI, lista spesa automatica, MUV planner, assistente nutrizionale intelligente"
        canonicalUrl="https://muvfitness.it/muv-planner"
      />
      
      <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center pt-[var(--header-height)]" 
           style={{
             backgroundImage: 'radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)'
           }}>
        <div className="w-full max-w-2xl mx-auto">
          <header className="text-center mb-6 md:mb-8">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              <span className="text-white">MUV</span>
              <span className="text-green-400">.</span>
              <span className="text-white">Planner</span>
            </h1>
            <p className="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
            
            {/* Contatore di utilizzo */}
            <div className="mt-4">
              <UsageCounter />
            </div>
          </header>

          <main>
            {renderCurrentView()}
          </main>

          <footer className="text-center mt-8 text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MUV Fitness Center. Tutti i diritti riservati.</p>
          </footer>
        </div>
      </div>
    </>
  );
};

export default MuvPlanner;
