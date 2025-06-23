
import React, { useState, useEffect } from 'react';
import { Calendar, CheckCircle, Circle, Plus, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useFoodDiary } from '@/hooks/useFoodDiary';
import { SavedMealPlan, FoodDiaryEntry, MealPlanType } from '@/types/planner';

interface FoodDiaryProps {
  mealPlans: SavedMealPlan[];
  selectedDate: string;
  onDateChange: (date: string) => void;
  onDataUpdate: () => void;
}

const FoodDiary: React.FC<FoodDiaryProps> = ({
  mealPlans,
  selectedDate,
  onDateChange,
  onDataUpdate
}) => {
  const [selectedMealPlan, setSelectedMealPlan] = useState<SavedMealPlan | null>(null);
  const [todayEntries, setTodayEntries] = useState<FoodDiaryEntry[]>([]);
  const [notes, setNotes] = useState('');
  const { addDiaryEntry, getDiaryEntries, isLoading } = useFoodDiary();

  const mealTypes: { key: keyof MealPlanType; label: string; icon: string }[] = [
    { key: 'colazione', label: 'Colazione', icon: '🍎' },
    { key: 'spuntino_mattutino', label: 'Spuntino Mattutino', icon: '🥪' },
    { key: 'pranzo', label: 'Pranzo', icon: '🍲' },
    { key: 'spuntino_pomeridiano', label: 'Spuntino Pomeridiano', icon: '🥪' },
    { key: 'cena', label: 'Cena', icon: '🍽️' }
  ];

  useEffect(() => {
    loadTodayEntries();
    if (mealPlans.length > 0 && !selectedMealPlan) {
      setSelectedMealPlan(mealPlans[0]);
    }
  }, [selectedDate, mealPlans]);

  const loadTodayEntries = async () => {
    const entries = await getDiaryEntries(selectedDate);
    setTodayEntries(entries);
  };

  const handleMealToggle = async (mealType: keyof MealPlanType, consumed: boolean) => {
    if (!selectedMealPlan) return;

    await addDiaryEntry(
      selectedMealPlan.id,
      selectedDate,
      mealType,
      consumed,
      notes
    );
    
    loadTodayEntries();
    onDataUpdate();
    setNotes('');
  };

  const getMealEntry = (mealType: keyof MealPlanType): FoodDiaryEntry | undefined => {
    return todayEntries.find(entry => 
      entry.meal_type === mealType && 
      entry.meal_plan_id === selectedMealPlan?.id
    );
  };

  return (
    <div className="space-y-6">
      {/* Date and Meal Plan Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            Data
          </label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full bg-gray-800/60 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Piano Alimentare</label>
          <Select
            value={selectedMealPlan?.id || ''}
            onValueChange={(value) => {
              const plan = mealPlans.find(p => p.id === value);
              setSelectedMealPlan(plan || null);
            }}
          >
            <SelectTrigger className="bg-gray-800/60 border-gray-600 text-white">
              <SelectValue placeholder="Seleziona un piano" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-600">
              {mealPlans.map(plan => (
                <SelectItem key={plan.id} value={plan.id} className="text-white">
                  {plan.calories} kcal - {new Date(plan.created_at).toLocaleDateString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Meal Tracking */}
      {selectedMealPlan && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-green-400">Pasti di oggi</h3>
          
          {mealTypes.map(meal => {
            const mealData = selectedMealPlan.plan_data[meal.key];
            const entry = getMealEntry(meal.key);
            const isConsumed = entry?.consumed || false;
            
            return (
              <Card key={meal.key} className="bg-gray-800/60 border-gray-700 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{meal.icon}</div>
                    <div className="flex-grow">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="text-lg font-semibold text-green-300">{meal.label}</h4>
                        <span className="text-sm text-green-400">~{mealData.kcal} kcal</span>
                      </div>
                      <p className="text-sm text-gray-400 mb-2">{mealData.descrizione}</p>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {mealData.alimenti.slice(0, 3).map((item, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-green-400 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                        {mealData.alimenti.length > 3 && (
                          <li className="text-gray-500">... e altri {mealData.alimenti.length - 3} alimenti</li>
                        )}
                      </ul>
                      {entry?.notes && (
                        <div className="mt-2 p-2 bg-gray-700/50 rounded text-sm text-gray-300">
                          <Clock className="inline-block w-3 h-3 mr-1" />
                          {entry.notes}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    onClick={() => handleMealToggle(meal.key, !isConsumed)}
                    disabled={isLoading}
                    variant={isConsumed ? "default" : "outline"}
                    size="sm"
                    className={isConsumed 
                      ? "bg-green-600 hover:bg-green-700 text-white" 
                      : "border-gray-600 text-gray-300 hover:bg-gray-700"
                    }
                  >
                    {isConsumed ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Consumato
                      </>
                    ) : (
                      <>
                        <Circle className="w-4 h-4 mr-1" />
                        Segna come consumato
                      </>
                    )}
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {!selectedMealPlan && mealPlans.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 mb-4">Non hai ancora piani alimentari salvati.</p>
          <p className="text-sm text-gray-500">Crea un piano alimentare per iniziare il tracking.</p>
        </div>
      )}
    </div>
  );
};

export default FoodDiary;
