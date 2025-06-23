
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { AlertTriangle, Wheat, Milk, Fish, Egg, TreePine, Shell, Peanut } from 'lucide-react';

interface AllergySelectorProps {
  allergies: string[];
  intolerances: string[];
  onAllergiesChange: (allergies: string[]) => void;
  onIntolerancesChange: (intolerances: string[]) => void;
}

const AllergySelector: React.FC<AllergySelectorProps> = ({
  allergies,
  intolerances,
  onAllergiesChange,
  onIntolerancesChange
}) => {
  const commonAllergies = [
    { id: 'glutine', label: 'Glutine', icon: Wheat },
    { id: 'lattosio', label: 'Lattosio', icon: Milk },
    { id: 'pesce', label: 'Pesce', icon: Fish },
    { id: 'uova', label: 'Uova', icon: Egg },
    { id: 'frutta_secca', label: 'Frutta secca', icon: TreePine },
    { id: 'crostacei', label: 'Crostacei', icon: Shell },
    { id: 'arachidi', label: 'Arachidi', icon: Peanut },
    { id: 'soia', label: 'Soia', icon: AlertTriangle },
  ];

  const commonIntolerances = [
    { id: 'lattosio', label: 'Lattosio', icon: Milk },
    { id: 'glutine', label: 'Glutine', icon: Wheat },
    { id: 'nichel', label: 'Nichel', icon: AlertTriangle },
    { id: 'istamina', label: 'Istamina', icon: AlertTriangle },
    { id: 'fruttosio', label: 'Fruttosio', icon: AlertTriangle },
  ];

  const handleAllergyChange = (allergyId: string, checked: boolean) => {
    if (checked) {
      onAllergiesChange([...allergies, allergyId]);
    } else {
      onAllergiesChange(allergies.filter(a => a !== allergyId));
    }
  };

  const handleIntoleranceChange = (intoleranceId: string, checked: boolean) => {
    if (checked) {
      onIntolerancesChange([...intolerances, intoleranceId]);
    } else {
      onIntolerancesChange(intolerances.filter(i => i !== intoleranceId));
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">
          <AlertTriangle className="inline-block w-4 h-4 mr-2 text-red-400" />
          Allergie alimentari
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {commonAllergies.map(allergy => {
            const IconComponent = allergy.icon;
            return (
              <div key={allergy.id} className="flex items-center space-x-2 bg-gray-800/30 p-2 rounded-lg">
                <Checkbox
                  id={`allergy-${allergy.id}`}
                  checked={allergies.includes(allergy.id)}
                  onCheckedChange={(checked) => handleAllergyChange(allergy.id, checked as boolean)}
                  className="border-gray-600"
                />
                <label 
                  htmlFor={`allergy-${allergy.id}`} 
                  className="text-xs text-gray-300 cursor-pointer flex items-center"
                >
                  <IconComponent className="w-3 h-3 mr-1 text-red-400" />
                  {allergy.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-200 mb-3">
          <AlertTriangle className="inline-block w-4 h-4 mr-2 text-orange-400" />
          Intolleranze alimentari
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {commonIntolerances.map(intolerance => {
            const IconComponent = intolerance.icon;
            return (
              <div key={intolerance.id} className="flex items-center space-x-2 bg-gray-800/30 p-2 rounded-lg">
                <Checkbox
                  id={`intolerance-${intolerance.id}`}
                  checked={intolerances.includes(intolerance.id)}
                  onCheckedChange={(checked) => handleIntoleranceChange(intolerance.id, checked as boolean)}
                  className="border-gray-600"
                />
                <label 
                  htmlFor={`intolerance-${intolerance.id}`} 
                  className="text-xs text-gray-300 cursor-pointer flex items-center"
                >
                  <IconComponent className="w-3 h-3 mr-1 text-orange-400" />
                  {intolerance.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {(allergies.length > 0 || intolerances.length > 0) && (
        <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
          <p className="text-xs text-blue-300">
            ℹ️ Il piano alimentare sarà personalizzato escludendo gli alimenti che hai selezionato.
          </p>
        </div>
      )}
    </div>
  );
};

export default AllergySelector;
