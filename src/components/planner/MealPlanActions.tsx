
import React from 'react';
import { ShoppingCart, FileDown, Save, BarChart3, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MealPlanActionsProps {
  onSavePlan: () => void;
  onGenerateShoppingList: () => void;
  onExportPDF: () => void;
  onViewTracking: () => void;
  isSaving: boolean;
  isShoppingListLoading: boolean;
  isExporting?: boolean;
}

const MealPlanActions: React.FC<MealPlanActionsProps> = ({
  onSavePlan,
  onGenerateShoppingList,
  onExportPDF,
  onViewTracking,
  isSaving,
  isShoppingListLoading,
  isExporting = false
}) => {
  return (
    <div className="flex justify-center items-center w-full px-6 py-4">
      <div className="flex flex-col sm:flex-row gap-6 w-full max-w-md">
        <Button 
          onClick={onGenerateShoppingList} 
          disabled={isShoppingListLoading} 
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all duration-300 text-lg min-h-[60px] w-full"
        >
          {isShoppingListLoading ? (
            <>
              <Loader2 className="mr-3 w-6 h-6 animate-spin" />
              Creando...
            </>
          ) : (
            <>
              <ShoppingCart className="mr-3 w-6 h-6" />
              Lista Spesa
            </>
          )}
        </Button>
        
        <Button 
          onClick={onExportPDF} 
          disabled={isExporting}
          className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded-lg flex items-center justify-center transition-all text-lg min-h-[60px] w-full"
        >
          {isExporting ? (
            <>
              <Loader2 className="mr-3 w-6 h-6 animate-spin" />
              Esportando...
            </>
          ) : (
            <>
              <FileDown className="mr-3 w-6 h-6" />
              Esporta PDF
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default MealPlanActions;
