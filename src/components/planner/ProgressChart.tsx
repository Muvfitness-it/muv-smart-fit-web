
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, TrendingUp, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { BodyMeasurement, FoodDiaryEntry } from '@/types/planner';

interface ProgressChartProps {
  measurements: BodyMeasurement[];
  diaryEntries: FoodDiaryEntry[];
}

const ProgressChart: React.FC<ProgressChartProps> = ({
  measurements,
  diaryEntries
}) => {
  // Prepare weight data for chart
  const weightData = measurements
    .filter(m => m.weight)
    .map(m => ({
      date: new Date(m.measured_at).toLocaleDateString(),
      weight: m.weight,
      bodyFat: m.body_fat_percentage,
      muscle: m.muscle_mass
    }))
    .reverse();

  // Prepare adherence data (last 7 days)
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const adherenceData = last7Days.map(date => {
    const dayEntries = diaryEntries.filter(entry => entry.date === date);
    const completedMeals = dayEntries.filter(entry => entry.consumed).length;
    const totalMeals = Math.max(dayEntries.length, 5); // Assume 5 meals per day
    
    return {
      date: new Date(date).toLocaleDateString('it-IT', { month: 'short', day: 'numeric' }),
      adherence: totalMeals > 0 ? Math.round((completedMeals / totalMeals) * 100) : 0,
      completed: completedMeals,
      total: totalMeals
    };
  });

  const calculateStats = () => {
    if (measurements.length < 2) return null;
    
    const latest = measurements[0];
    const previous = measurements[1];
    
    const weightChange = latest.weight && previous.weight 
      ? latest.weight - previous.weight 
      : null;
    
    const bodyFatChange = latest.body_fat_percentage && previous.body_fat_percentage
      ? latest.body_fat_percentage - previous.body_fat_percentage
      : null;

    return { weightChange, bodyFatChange };
  };

  const stats = calculateStats();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-green-400">Andamento Progressi</h3>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-gray-800/60 border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className={`w-6 h-6 ${stats.weightChange && stats.weightChange < 0 ? 'text-green-400' : 'text-red-400'}`} />
              <div>
                <p className="text-sm text-gray-400">Variazione Peso</p>
                <p className="text-lg font-bold text-white">
                  {stats.weightChange 
                    ? `${stats.weightChange > 0 ? '+' : ''}${stats.weightChange.toFixed(1)} kg`
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-gray-800/60 border-gray-700 p-4">
            <div className="flex items-center space-x-3">
              <Target className={`w-6 h-6 ${stats.bodyFatChange && stats.bodyFatChange < 0 ? 'text-green-400' : 'text-orange-400'}`} />
              <div>
                <p className="text-sm text-gray-400">Variazione Massa Grassa</p>
                <p className="text-lg font-bold text-white">
                  {stats.bodyFatChange 
                    ? `${stats.bodyFatChange > 0 ? '+' : ''}${stats.bodyFatChange.toFixed(1)}%`
                    : 'N/A'
                  }
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Weight Progress Chart */}
      {weightData.length > 1 && (
        <Card className="bg-gray-800/60 border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Andamento Peso</h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weightData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1F2937', 
                  border: '1px solid #374151', 
                  borderRadius: '8px',
                  color: '#fff'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="weight" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                name="Peso (kg)"
              />
              {weightData.some(d => d.bodyFat) && (
                <Line 
                  type="monotone" 
                  dataKey="bodyFat" 
                  stroke="#F59E0B" 
                  strokeWidth={2}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 3 }}
                  name="Massa Grassa (%)"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </Card>
      )}

      {/* Adherence Chart */}
      <Card className="bg-gray-800/60 border-gray-700 p-6">
        <h4 className="text-lg font-semibold text-white mb-4">Aderenza Piano Alimentare (Ultimi 7 giorni)</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={adherenceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="date" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" domain={[0, 100]} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1F2937', 
                border: '1px solid #374151', 
                borderRadius: '8px',
                color: '#fff'
              }}
              formatter={(value, name) => [
                `${value}%`,
                'Aderenza'
              ]}
              labelFormatter={(label) => `Data: ${label}`}
            />
            <Bar 
              dataKey="adherence" 
              fill="#10B981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 text-sm text-gray-400 text-center">
          Percentuale di pasti completati rispetto al piano alimentare
        </div>
      </Card>

      {/* No Data Messages */}
      {measurements.length === 0 && (
        <Card className="bg-gray-800/60 border-gray-700 p-8 text-center">
          <Calendar className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Nessun dato di misurazione disponibile</p>
          <p className="text-sm text-gray-500">Aggiungi le tue misurazioni per visualizzare i progressi</p>
        </Card>
      )}

      {diaryEntries.length === 0 && (
        <Card className="bg-gray-800/60 border-gray-700 p-8 text-center">
          <Target className="w-12 h-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">Nessun dato del diario alimentare</p>
          <p className="text-sm text-gray-500">Inizia a tracciare i tuoi pasti per vedere l'aderenza al piano</p>
        </Card>
      )}
    </div>
  );
};

export default ProgressChart;
