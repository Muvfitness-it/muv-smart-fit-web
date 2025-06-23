
import React from 'react';
import { ShoppingCart, FileDown, Save, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MealPlanActionsProps {
  onSavePlan: () => void;
  onGenerateShoppingList: () => void;
  onExportPDF: () => void;
  onViewTracking: () => void;
  isSaving: boolean;
  isShoppingListLoading: boolean;
}

const MealPlanActions: React.FC<MealPlanActionsProps> = ({
  onSavePlan,
  onGenerateShoppingList,
  onExportPDF,
  onViewTracking,
  isSaving,
  isShoppingListLoading
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Button
        onClick={onSavePlan}
        disabled={isSaving}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
      >
        <Save className="inline-block mr-2" />
        {isSaving ? 'Salvando...' : 'Salva Piano'}
      </Button>
      
      <Button
        onClick={onGenerateShoppingList}
        disabled={isShoppingListLoading}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300"
      >
        <ShoppingCart className="inline-block mr-2" />
        {isShoppingListLoading ? 'Creando...' : 'Lista Spesa'}
      </Button>
      
      <Button
        onClick={onExportPDF}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
      >
        <FileDown className="inline-block mr-2" />
        Esporta PDF
      </Button>
      
      <Button
        onClick={onViewTracking}
        className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
      >
        <BarChart3 className="inline-block mr-2" />
        Tracking
      </Button>
    </div>
  );
};

export default MealPlanActions;
