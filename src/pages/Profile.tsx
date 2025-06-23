
import React, { useState } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { User, Save, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { profile, isLoading, error, updateProfile } = useUserProfile();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone: '',
    date_of_birth: '',
    gender: 'male' as 'male' | 'female' | 'other',
    weight: '',
    height: '',
    activity_level: '1.375' as '1.2' | '1.375' | '1.55' | '1.725' | '1.9',
    fitness_goal: 'maintain' as 'lose' | 'maintain' | 'gain'
  });

  React.useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name || '',
        last_name: profile.last_name || '',
        phone: profile.phone || '',
        date_of_birth: profile.date_of_birth || '',
        gender: profile.gender || 'male',
        weight: profile.weight?.toString() || '',
        height: profile.height?.toString() || '',
        activity_level: profile.activity_level || '1.375',
        fitness_goal: profile.fitness_goal || 'maintain'
      });
    }
  }, [profile]);

  const handleSave = async () => {
    setIsSaving(true);
    const updates = {
      ...formData,
      weight: formData.weight ? parseFloat(formData.weight) : undefined,
      height: formData.height ? parseFloat(formData.height) : undefined
    };
    
    const result = await updateProfile(updates);
    if (result) {
      setIsEditing(false);
    }
    setIsSaving(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/auth');
  };

  const getInitials = () => {
    const first = profile?.first_name?.[0] || '';
    const last = profile?.last_name?.[0] || '';
    return (first + last).toUpperCase() || 'U';
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white">Caricamento profilo...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4"
         style={{
           backgroundImage: 'radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)'
         }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">Profilo Utente</h1>
          <p className="text-gray-400">Gestisci le tue informazioni personali</p>
        </div>

        <Card className="bg-gray-900/50 backdrop-blur-lg border border-white/20 p-8">
          <div className="flex flex-col items-center mb-8">
            <Avatar className="w-24 h-24 mb-4">
              <AvatarImage src={profile?.avatar_url} />
              <AvatarFallback className="bg-green-600 text-white text-xl">
                {getInitials()}
              </AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">
              {profile?.first_name} {profile?.last_name}
            </h2>
            <p className="text-gray-400">{profile?.email}</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label className="text-gray-200">Nome</Label>
              <Input
                value={formData.first_name}
                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-800/60 border-gray-600 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label className="text-gray-200">Cognome</Label>
              <Input
                value={formData.last_name}
                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-800/60 border-gray-600 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label className="text-gray-200">Telefono</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-800/60 border-gray-600 text-white disabled:opacity-70"
                placeholder="3XX XXXXXXX"
              />
            </div>

            <div>
              <Label className="text-gray-200">Data di Nascita</Label>
              <Input
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-800/60 border-gray-600 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label className="text-gray-200">Sesso</Label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                disabled={!isEditing}
                className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-3 py-2 text-white disabled:opacity-70"
              >
                <option value="male">Maschio</option>
                <option value="female">Femmina</option>
                <option value="other">Altro</option>
              </select>
            </div>

            <div>
              <Label className="text-gray-200">Peso (kg)</Label>
              <Input
                type="number"
                step="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-800/60 border-gray-600 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label className="text-gray-200">Altezza (cm)</Label>
              <Input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                disabled={!isEditing}
                className="bg-gray-800/60 border-gray-600 text-white disabled:opacity-70"
              />
            </div>

            <div>
              <Label className="text-gray-200">Livello di Attività</Label>
              <select
                value={formData.activity_level}
                onChange={(e) => setFormData({ ...formData, activity_level: e.target.value as any })}
                disabled={!isEditing}
                className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-3 py-2 text-white disabled:opacity-70"
              >
                <option value="1.2">Sedentario</option>
                <option value="1.375">Leggermente attivo</option>
                <option value="1.55">Moderatamente attivo</option>
                <option value="1.725">Molto attivo</option>
                <option value="1.9">Estremamente attivo</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <Label className="text-gray-200">Obiettivo Fitness</Label>
              <select
                value={formData.fitness_goal}
                onChange={(e) => setFormData({ ...formData, fitness_goal: e.target.value as any })}
                disabled={!isEditing}
                className="w-full bg-gray-800/60 border border-gray-600 rounded-lg px-3 py-2 text-white disabled:opacity-70"
              >
                <option value="lose">Perdere peso</option>
                <option value="maintain">Mantenere peso</option>
                <option value="gain">Aumentare peso</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            {isEditing ? (
              <>
                <Button
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? 'Salvando...' : 'Salva'}
                </Button>
                <Button
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700"
                >
                  Annulla
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                <User className="w-4 h-4 mr-2" />
                Modifica Profilo
              </Button>
            )}
            
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-red-500 text-red-400 hover:bg-red-500/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Esci
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
