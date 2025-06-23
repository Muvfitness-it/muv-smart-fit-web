
import React from 'react';
import { Target, AlertTriangle, Calendar, CalendarDays } from 'lucide-react';

interface PlannerFormData {
  goal: string;
  allergies: string[];
  intolerances: string[];
  planType: 'daily' | 'weekly';
}

interface MealPlanHeaderProps {
  calories: number;
  formData: PlannerFormData;
}

const MealPlanHeader: React.FC<MealPlanHeaderProps> = ({ calories, formData }) => {
  const formatAllergyLabel = (allergy: string) => {
    const labels: Record<string, string> = {
      glutine: 'Glutine',
      lattosio: 'Lattosio',
      pesce: 'Pesce',
      uova: 'Uova',
      frutta_secca: 'Frutta secca',
      crostacei: 'Crostacei',
      arachidi: 'Arachidi',
      soia: 'Soia',
      nichel: 'Nichel',
      istamina: 'Istamina',
      fruttosio: 'Fruttosio'
    };
    return labels[allergy] || allergy;
  };

  const planTypeIcon = formData.planType === 'weekly' ? CalendarDays : Calendar;
  const PlanIcon = planTypeIcon;

  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center space-x-2 mb-2">
        <PlanIcon className="w-6 h-6 text-green-400" />
        <p className="text-gray-300">
          Piano nutrizionale {formData.planType === 'weekly' ? 'settimanale' : 'giornaliero'} personalizzato
        </p>
      </div>
      
      <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
        <Target className="w-10 h-10" />
        <span>{calories} kcal{formData.planType === 'weekly' ? '/giorno' : ''}</span>
      </h2>
      
      <p className="text-gray-400 mt-1">
        Obiettivo: {formData.goal === 'lose' ? 'Definizione' : formData.goal === 'gain' ? 'Aumento massa' : 'Mantenimento'}
      </p>
      
      {(formData.allergies.length > 0 || formData.intolerances.length > 0) && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3">
          <div className="flex items-center justify-center mb-2">
            <AlertTriangle className="w-4 h-4 text-red-400 mr-2" />
            <span className="text-sm font-medium text-red-300">Restrizioni Alimentari</span>
          </div>
          <div className="space-y-1 text-xs">
            {formData.allergies.length > 0 && (
              <div>
                <span className="text-red-300 font-medium">Allergie: </span>
                <span className="text-red-200">{formData.allergies.map(formatAllergyLabel).join(', ')}</span>
              </div>
            )}
            {formData.intolerances.length > 0 && (
              <div>
                <span className="text-orange-300 font-medium">Intolleranze: </span>
                <span className="text-orange-200">{formData.intolerances.map(formatAllergyLabel).join(', ')}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanHeader;
