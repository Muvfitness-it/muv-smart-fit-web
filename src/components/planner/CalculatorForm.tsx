
import React from 'react';
import { BrainCircuit, Loader2, AlertTriangle } from 'lucide-react';
import AllergySelector from './AllergySelector';

interface FormData {
  gender: string;
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
  goal: string;
  allergies: string[];
  intolerances: string[];
}

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
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const bmr = formData.gender === 'male' ? 10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseFloat(formData.age) + 5 : 10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseFloat(formData.age) - 161;
    const tdee = bmr * parseFloat(formData.activityLevel);
    let finalCalories;
    switch (formData.goal) {
      case 'lose':
        finalCalories = tdee - 400;
        break;
      case 'gain':
        finalCalories = tdee + 400;
        break;
      default:
        finalCalories = tdee;
        break;
    }
    onSubmit(Math.round(finalCalories));
  };

  const handleInputChange = (field: keyof FormData, value: string | string[]) => {
    onFormDataChange({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Sesso</label>
            <select value={formData.gender} onChange={e => handleInputChange('gender', e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition">
              <option value="male">Uomo</option>
              <option value="female">Donna</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Età (anni)</label>
            <input type="number" value={formData.age} onChange={e => handleInputChange('age', e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" min="15" max="100" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Peso (kg)</label>
            <input type="number" value={formData.weight} onChange={e => handleInputChange('weight', e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" min="30" max="200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Altezza (cm)</label>
            <input type="number" value={formData.height} onChange={e => handleInputChange('height', e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" min="100" max="250" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Livello di attività fisica</label>
          <select value={formData.activityLevel} onChange={e => handleInputChange('activityLevel', e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition">
            <option value="1.2">Sedentario</option>
            <option value="1.375">Leggermente attivo</option>
            <option value="1.55">Moderatamente attivo</option>
            <option value="1.725">Molto attivo</option>
            <option value="1.9">Estremamente attivo</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Il tuo obiettivo</label>
          <select value={formData.goal} onChange={e => handleInputChange('goal', e.target.value)} className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition">
            <option value="lose">Definizione / Perdita peso</option>
            <option value="maintain">Mantenimento</option>
            <option value="gain">Aumento massa muscolare</option>
          </select>
        </div>

        <AllergySelector
          allergies={formData.allergies}
          intolerances={formData.intolerances}
          onAllergiesChange={(allergies) => handleInputChange('allergies', allergies)}
          onIntolerancesChange={(intolerances) => handleInputChange('intolerances', intolerances)}
        />

        <div>
          <button type="submit" disabled={isLoading} className="w-full mt-4 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
            {isLoading ? <>
                <Loader2 className="inline-block mr-2 animate-spin" />
                Elaborazione...
              </> : <>
                <BrainCircuit className="inline-block mr-2" />
                Crea Piano Nutrizionale
              </>}
          </button>
        </div>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start">
            <AlertTriangle className="inline-block mr-3 mt-1 h-5 w-5" />
            <span>{error}</span>
          </div>}
      </form>
    </div>
  );
};

export default CalculatorForm;
