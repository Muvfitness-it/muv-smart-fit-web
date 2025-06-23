
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { BodyMeasurement } from '@/types/planner';

export const useBodyMeasurements = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const addMeasurement = async (
    weight?: number,
    height?: number,
    bodyFatPercentage?: number,
    muscleMass?: number,
    notes?: string,
    measuredAt?: string
  ): Promise<BodyMeasurement | null> => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Devi essere autenticato');
      }

      const { data, error } = await supabase
        .from('body_measurements')
        .insert({
          user_id: user.id,
          weight,
          height,
          body_fat_percentage: bodyFatPercentage,
          muscle_mass: muscleMass,
          notes,
          measured_at: measuredAt || new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) throw error;
      
      return data as BodyMeasurement;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const getMeasurements = async (): Promise<BodyMeasurement[]> => {
    setIsLoading(true);
    setError('');
    
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        throw new Error('Devi essere autenticato');
      }

      const { data, error } = await supabase
        .from('body_measurements')
        .select('*')
        .eq('user_id', user.id)
        .order('measured_at', { ascending: false });

      if (error) throw error;
      
      return data as BodyMeasurement[];
    } catch (err: any) {
      setError(err.message);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return {
    addMeasurement,
    getMeasurements,
    isLoading,
    error
  };
};
