
import React from 'react';
import CalculatorForm from './CalculatorForm';
import MealPlan from './MealPlan';
import ShoppingList from './ShoppingList';
import TrackingDashboard from './TrackingDashboard';
import { FormData, MealPlanData, ShoppingListData, ViewType } from '@/types/planner';

interface ViewManagerProps {
  currentView: ViewType;
  formData: FormData;
  mealPlanData: MealPlanData | null;
  shoppingListData: ShoppingListData | null;
  isMealPlanLoading: boolean;
  isShoppingListLoading: boolean;
  isExporting: boolean;
  mealPlanError: string;
  shoppingListError: string;
  onFormDataChange: (data: FormData) => void;
  onFormSubmit: (targetCalories: number) => void;
  onGenerateShoppingList: () => void;
  onExportPDF: (mealPlanData: MealPlanData, fileName: string) => Promise<void>;
  onRecalculate: () => void;
  onAskCoach: (question: string) => Promise<string>;
  onViewTracking: () => void;
  onBackToMealPlan: () => void;
}

const ViewManager: React.FC<ViewManagerProps> = ({
  currentView,
  formData,
  mealPlanData,
  shoppingListData,
  isMealPlanLoading,
  isShoppingListLoading,
  isExporting,
  mealPlanError,
  shoppingListError,
  onFormDataChange,
  onFormSubmit,
  onGenerateShoppingList,
  onExportPDF,
  onRecalculate,
  onAskCoach,
  onViewTracking,
  onBackToMealPlan
}) => {
  // Create a wrapper for ShoppingList export that matches the expected signature
  const handleShoppingListExport = (elementId: string, fileName: string) => {
    // For ShoppingList, we don't need the full meal plan data, just export the shopping list element
    console.log(`Exporting shopping list from element: ${elementId} as ${fileName}`);
    // This would be handled differently - perhaps by capturing the shopping list HTML element
    // For now, we'll create a minimal implementation
  };

  switch (currentView) {
    case 'calculator':
      return (
        <CalculatorForm
          formData={formData}
          isLoading={isMealPlanLoading}
          error={mealPlanError}
          onFormDataChange={onFormDataChange}
          onSubmit={onFormSubmit}
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
          isExporting={isExporting}
          onGenerateShoppingList={onGenerateShoppingList}
          onExportPDF={onExportPDF}
          onRecalculate={onRecalculate}
          onAskCoach={onAskCoach}
          onViewTracking={onViewTracking}
        />
      ) : null;
    case 'shoppingList':
      return shoppingListData ? (
        <ShoppingList
          shoppingListData={shoppingListData}
          onBackToMealPlan={onBackToMealPlan}
          onExportPDF={handleShoppingListExport}
          onRecalculate={onRecalculate}
        />
      ) : null;
    case 'tracking':
      return (
        <TrackingDashboard
          onBackToCalculator={onRecalculate}
        />
      );
    default:
      return null;
  }
};

export default ViewManager;
