
import React, { useState, useEffect } from 'react';
import { Calendar, Scale, TrendingUp, CheckCircle, Circle, Plus, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useFoodDiary } from '@/hooks/useFoodDiary';
import { useMealPlanStorage } from '@/hooks/useMealPlanStorage';
import { useBodyMeasurements } from '@/hooks/useBodyMeasurements';
import { SavedMealPlan, FoodDiaryEntry, BodyMeasurement } from '@/types/planner';
import FoodDiary from './FoodDiary';
import BodyMeasurementsTracker from './BodyMeasurementsTracker';
import ProgressChart from './ProgressChart';

interface TrackingDashboardProps {
  onBackToCalculator: () => void;
}

const TrackingDashboard: React.FC<TrackingDashboardProps> = ({ onBackToCalculator }) => {
  const [activeTab, setActiveTab] = useState<'diary' | 'measurements' | 'progress'>('diary');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [mealPlans, setMealPlans] = useState<SavedMealPlan[]>([]);
  const [diaryEntries, setDiaryEntries] = useState<FoodDiaryEntry[]>([]);
  const [measurements, setMeasurements] = useState<BodyMeasurement[]>([]);

  const { getMealPlans } = useMealPlanStorage();
  const { getDiaryEntries } = useFoodDiary();
  const { getMeasurements } = useBodyMeasurements();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [mealPlansData, diaryData, measurementsData] = await Promise.all([
      getMealPlans(),
      getDiaryEntries(),
      getMeasurements()
    ]);
    
    setMealPlans(mealPlansData);
    setDiaryEntries(diaryData);
    setMeasurements(measurementsData);
  };

  const todayEntries = diaryEntries.filter(entry => entry.date === selectedDate);
  const completedMeals = todayEntries.filter(entry => entry.consumed).length;
  const totalMeals = 5; // colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena

  return (
    <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
          <BarChart3 className="w-10 h-10" />
          <span>Tracking & Monitoraggio</span>
        </h2>
        <p className="text-gray-400 mt-2">Monitora i tuoi progressi e tieni traccia della tua alimentazione</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="bg-gray-800/60 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-sm text-gray-400">Pasti di oggi</p>
              <p className="text-2xl font-bold text-white">{completedMeals}/{totalMeals}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-800/60 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <Scale className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-sm text-gray-400">Piani salvati</p>
              <p className="text-2xl font-bold text-white">{mealPlans.length}</p>
            </div>
          </div>
        </Card>
        
        <Card className="bg-gray-800/60 border-gray-700 p-4">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-sm text-gray-400">Misurazioni</p>
              <p className="text-2xl font-bold text-white">{measurements.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 mb-6 bg-gray-800/60 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('diary')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'diary'
              ? 'bg-green-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Diario Alimentare
        </button>
        <button
          onClick={() => setActiveTab('measurements')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'measurements'
              ? 'bg-green-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Misurazioni
        </button>
        <button
          onClick={() => setActiveTab('progress')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            activeTab === 'progress'
              ? 'bg-green-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Progressi
        </button>
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === 'diary' && (
          <FoodDiary
            mealPlans={mealPlans}
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            onDataUpdate={loadData}
          />
        )}
        
        {activeTab === 'measurements' && (
          <BodyMeasurementsTracker
            measurements={measurements}
            onDataUpdate={loadData}
          />
        )}
        
        {activeTab === 'progress' && (
          <ProgressChart
            measurements={measurements}
            diaryEntries={diaryEntries}
          />
        )}
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={onBackToCalculator}
          variant="outline"
          className="bg-gray-600 hover:bg-gray-700 text-white border-gray-500"
        >
          Torna al Calcolatore
        </Button>
      </div>
    </div>
  );
};

export default TrackingDashboard;
