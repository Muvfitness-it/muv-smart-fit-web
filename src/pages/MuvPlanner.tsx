
import React, { useState, useEffect } from 'react';
import PageSEO from '../components/SEO/PageSEO';
import PlannerHeader from '../components/planner/PlannerHeader';
import ViewManager from '../components/planner/ViewManager';
import { useAnalytics } from '../hooks/useAnalytics';
import { usePlannerHandlers } from '../hooks/usePlannerHandlers';
import { FormData } from '../types/planner';

const MuvPlanner = () => {
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

  const { trackSiteVisit } = useAnalytics();
  const {
    currentView,
    mealPlanData,
    shoppingListData,
    isMealPlanLoading,
    isShoppingListLoading,
    isExporting,
    mealPlanError,
    shoppingListError,
    handleFormSubmit,
    handleGenerateShoppingList,
    handleAskCoach,
    handleExportPDF,
    handleRecalculate,
    handleViewTracking,
    handleBackToMealPlan
  } = usePlannerHandlers();

  // Track page visit
  useEffect(() => {
    trackSiteVisit('/muv-planner');
  }, [trackSiteVisit]);

  const onFormSubmit = (targetCalories: number) => {
    handleFormSubmit(targetCalories, formData);
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
          <PlannerHeader />

          <main>
            <ViewManager
              currentView={currentView}
              formData={formData}
              mealPlanData={mealPlanData}
              shoppingListData={shoppingListData}
              isMealPlanLoading={isMealPlanLoading}
              isShoppingListLoading={isShoppingListLoading}
              isExporting={isExporting}
              mealPlanError={mealPlanError}
              shoppingListError={shoppingListError}
              onFormDataChange={setFormData}
              onFormSubmit={onFormSubmit}
              onGenerateShoppingList={handleGenerateShoppingList}
              onExportPDF={handleExportPDF}
              onRecalculate={handleRecalculate}
              onAskCoach={handleAskCoach}
              onViewTracking={handleViewTracking}
              onBackToMealPlan={handleBackToMealPlan}
            />
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
