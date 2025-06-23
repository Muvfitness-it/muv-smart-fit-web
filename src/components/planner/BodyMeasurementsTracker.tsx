
import React, { useState } from 'react';
import { Scale, Plus, Calendar, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useBodyMeasurements } from '@/hooks/useBodyMeasurements';
import { BodyMeasurement } from '@/types/planner';

interface BodyMeasurementsTrackerProps {
  measurements: BodyMeasurement[];
  onDataUpdate: () => void;
}

const BodyMeasurementsTracker: React.FC<BodyMeasurementsTrackerProps> = ({
  measurements,
  onDataUpdate
}) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    weight: '',
    height: '',
    bodyFatPercentage: '',
    muscleMass: '',
    notes: '',
    measuredAt: new Date().toISOString().split('T')[0]
  });

  const { addMeasurement, isLoading } = useBodyMeasurements();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await addMeasurement(
      formData.weight ? parseFloat(formData.weight) : undefined,
      formData.height ? parseFloat(formData.height) : undefined,
      formData.bodyFatPercentage ? parseFloat(formData.bodyFatPercentage) : undefined,
      formData.muscleMass ? parseFloat(formData.muscleMass) : undefined,
      formData.notes || undefined,
      formData.measuredAt
    );

    if (result) {
      setFormData({
        weight: '',
        height: '',
        bodyFatPercentage: '',
        muscleMass: '',
        notes: '',
        measuredAt: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
      onDataUpdate();
    }
  };

  const getLatestMeasurement = (field: keyof BodyMeasurement) => {
    const latest = measurements.find(m => m[field] !== null);
    return latest?.[field];
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-green-400">Misurazioni Corporee</h3>
        <Button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          Nuova Misurazione
        </Button>
      </div>

      {/* Latest Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gray-800/60 border-gray-700 p-4 text-center">
          <Scale className="w-6 h-6 text-blue-400 mx-auto mb-2" />
          <p className="text-xs text-gray-400">Peso</p>
          <p className="text-lg font-bold text-white">
            {getLatestMeasurement('weight') ? `${getLatestMeasurement('weight')} kg` : '-'}
          </p>
        </Card>
        
        <Card className="bg-gray-800/60 border-gray-700 p-4 text-center">
          <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
          <p className="text-xs text-gray-400">Massa Grassa</p>
          <p className="text-lg font-bold text-white">
            {getLatestMeasurement('body_fat_percentage') ? `${getLatestMeasurement('body_fat_percentage')}%` : '-'}
          </p>
        </Card>
        
        <Card className="bg-gray-800/60 border-gray-700 p-4 text-center">
          <TrendingUp className="w-6 h-6 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-gray-400">Massa Muscolare</p>
          <p className="text-lg font-bold text-white">
            {getLatestMeasurement('muscle_mass') ? `${getLatestMeasurement('muscle_mass')} kg` : '-'}
          </p>
        </Card>
        
        <Card className="bg-gray-800/60 border-gray-700 p-4 text-center">
          <Calendar className="w-6 h-6 text-orange-400 mx-auto mb-2" />
          <p className="text-xs text-gray-400">Ultima Misurazione</p>
          <p className="text-sm font-bold text-white">
            {measurements.length > 0 ? new Date(measurements[0].measured_at).toLocaleDateString() : '-'}
          </p>
        </Card>
      </div>

      {/* Add Measurement Form */}
      {showForm && (
        <Card className="bg-gray-800/60 border-gray-700 p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Nuova Misurazione</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Data</label>
                <Input
                  type="date"
                  value={formData.measuredAt}
                  onChange={(e) => setFormData(prev => ({ ...prev, measuredAt: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Peso (kg)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.weight}
                  onChange={(e) => setFormData(prev => ({ ...prev, weight: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="70.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Altezza (cm)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.height}
                  onChange={(e) => setFormData(prev => ({ ...prev, height: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="175"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Massa Grassa (%)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.bodyFatPercentage}
                  onChange={(e) => setFormData(prev => ({ ...prev, bodyFatPercentage: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="15.5"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">Massa Muscolare (kg)</label>
                <Input
                  type="number"
                  step="0.1"
                  value={formData.muscleMass}
                  onChange={(e) => setFormData(prev => ({ ...prev, muscleMass: e.target.value }))}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="55.2"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-200 mb-2">Note</label>
              <Textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                className="bg-gray-700 border-gray-600 text-white"
                placeholder="Note aggiuntive..."
                rows={3}
              />
            </div>
            
            <div className="flex space-x-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-green-600 hover:bg-green-700"
              >
                {isLoading ? 'Salvando...' : 'Salva Misurazione'}
              </Button>
              <Button
                type="button"
                onClick={() => setShowForm(false)}
                variant="outline"
                className="border-gray-600 text-gray-300"
              >
                Annulla
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Measurements History */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold text-white">Storico Misurazioni</h4>
        {measurements.length > 0 ? (
          <div className="space-y-3">
            {measurements.map(measurement => (
              <Card key={measurement.id} className="bg-gray-800/60 border-gray-700 p-4">
                <div className="flex justify-between items-start">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-grow">
                    <div>
                      <p className="text-xs text-gray-400">Data</p>
                      <p className="text-sm font-medium text-white">
                        {new Date(measurement.measured_at).toLocaleDateString()}
                      </p>
                    </div>
                    {measurement.weight && (
                      <div>
                        <p className="text-xs text-gray-400">Peso</p>
                        <p className="text-sm font-medium text-white">{measurement.weight} kg</p>
                      </div>
                    )}
                    {measurement.body_fat_percentage && (
                      <div>
                        <p className="text-xs text-gray-400">Massa Grassa</p>
                        <p className="text-sm font-medium text-white">{measurement.body_fat_percentage}%</p>
                      </div>
                    )}
                    {measurement.muscle_mass && (
                      <div>
                        <p className="text-xs text-gray-400">Massa Muscolare</p>
                        <p className="text-sm font-medium text-white">{measurement.muscle_mass} kg</p>
                      </div>
                    )}
                  </div>
                </div>
                {measurement.notes && (
                  <div className="mt-3 p-2 bg-gray-700/50 rounded text-sm text-gray-300">
                    {measurement.notes}
                  </div>
                )}
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-400">Nessuna misurazione registrata.</p>
            <p className="text-sm text-gray-500">Aggiungi la tua prima misurazione per iniziare il tracking.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyMeasurementsTracker;
