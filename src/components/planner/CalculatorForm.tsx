
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calculator } from 'lucide-react';
import AllergySelector from './AllergySelector';
import PlanTypeSelector from './PlanTypeSelector';
import { FormData } from '@/types/planner';

interface CalculatorFormProps {
  formData: FormData;
  isLoading: boolean;
  error: string;
  onFormDataChange: (data: FormData) => void;
  onSubmit: (targetCalories: number) => void;
}

const CalculatorForm: React.FC<CalculatorFormProps> = ({
  formData,
  isLoading,
  error,
  onFormDataChange,
  onSubmit
}) => {
  const [targetCalories, setTargetCalories] = useState<number>(0);

  const calculateCalories = (e: React.FormEvent) => {
    e.preventDefault();
    
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height);
    const age = parseFloat(formData.age);
    const activityLevel = parseFloat(formData.activityLevel);
    
    let bmr: number;
    if (formData.gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    
    let tdee = bmr * activityLevel;
    
    if (formData.goal === 'lose') {
      tdee -= 500;
    } else if (formData.goal === 'gain') {
      tdee += 500;
    }
    
    const calories = Math.round(tdee);
    setTargetCalories(calories);
    onSubmit(calories);
  };

  const updateFormData = (updates: Partial<FormData>) => {
    onFormDataChange({ ...formData, ...updates });
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-6 md:p-8 text-white">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
          <Calculator className="w-10 h-10" />
          <span>Calcolatore Nutrizionale</span>
        </h2>
        <p className="text-gray-400 mt-2">Crea il tuo piano alimentare personalizzato</p>
      </div>

      <form onSubmit={calculateCalories} className="space-y-6">
        <PlanTypeSelector
          planType={formData.planType}
          onPlanTypeChange={(type) => updateFormData({ planType: type })}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Sesso
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateFormData({ gender: e.target.value })}
              className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="male">Maschio</option>
              <option value="female">Femmina</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Età (anni)
            </label>
            <input
              type="number"
              value={formData.age}
              onChange={(e) => updateFormData({ age: e.target.value })}
              className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Es. 30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Peso (kg)
            </label>
            <input
              type="number"
              step="0.1"
              value={formData.weight}
              onChange={(e) => updateFormData({ weight: e.target.value })}
              className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Es. 70"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Altezza (cm)
            </label>
            <input
              type="number"
              value={formData.height}
              onChange={(e) => updateFormData({ height: e.target.value })}
              className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Es. 175"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Livello di Attività
          </label>
          <select
            value={formData.activityLevel}
            onChange={(e) => updateFormData({ activityLevel: e.target.value })}
            className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="1.2">Sedentario (poco o nessun esercizio)</option>
            <option value="1.375">Leggermente attivo (esercizio leggero 1-3 giorni/settimana)</option>
            <option value="1.55">Moderatamente attivo (esercizio moderato 3-5 giorni/settimana)</option>
            <option value="1.725">Molto attivo (esercizio intenso 6-7 giorni/settimana)</option>
            <option value="1.9">Estremamente attivo (esercizio molto intenso, lavoro fisico)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            Obiettivo
          </label>
          <select
            value={formData.goal}
            onChange={(e) => updateFormData({ goal: e.target.value })}
            className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="lose">Perdere peso (Definizione)</option>
            <option value="maintain">Mantenere peso</option>
            <option value="gain">Aumentare peso (Massa)</option>
          </select>
        </div>

        <AllergySelector
          allergies={formData.allergies}
          intolerances={formData.intolerances}
          onAllergiesChange={(allergies) => updateFormData({ allergies })}
          onIntolerancesChange={(intolerances) => updateFormData({ intolerances })}
        />

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Generazione in corso...' : `Genera Piano ${formData.planType === 'weekly' ? 'Settimanale' : 'Giornaliero'}`}
        </Button>
      </form>
    </Card>
  );
};

export default CalculatorForm;
