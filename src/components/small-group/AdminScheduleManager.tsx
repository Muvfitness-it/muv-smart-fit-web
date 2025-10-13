import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Plus, Edit, Trash2, Clock, User, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import '@/styles/print-schedule.css';

interface ScheduleItem {
  id: string;
  course_name: string;
  course_type: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  instructor: string | null;
  room: string | null;
  color: string | null;
  is_active: boolean | null;
}

const DAYS = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

const COURSE_TYPES = [
  { value: 'postural-pilates', label: 'Postural Pilates', color: '#8B5CF6' },
  { value: 'pancafit', label: 'Pancafit', color: '#3B82F6' },
  { value: 'ginnastica-dolce', label: 'Ginnastica Dolce', color: '#10B981' },
  { value: 'total-body', label: 'Total Body', color: '#14B8A6' },
  { value: 'music-pump', label: 'Music Pump', color: '#EC4899' },
  { value: 'gag', label: 'GAG', color: '#EF4444' },
  { value: 'funzionale', label: 'Funzionale', color: '#F97316' },
  { value: 'tabata', label: 'Tabata', color: '#F59E0B' }
];

export const AdminScheduleManager = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [formData, setFormData] = useState({
    course_type: '',
    course_name: '',
    day_of_week: 1,
    start_time: '09:00',
    end_time: '10:00',
    instructor: '',
    room: '',
    color: '#FF6B35'
  });

  const queryClient = useQueryClient();

  const { data: schedule } = useQuery({
    queryKey: ['admin-schedule'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('small_group_schedule')
        .select('*')
        .order('day_of_week, start_time');
      
      if (error) throw error;
      return data as ScheduleItem[];
    }
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      const { error } = await supabase
        .from('small_group_schedule')
        .insert([data]);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['small-group-schedule'] });
      toast.success('Corso aggiunto con successo');
      resetForm();
    },
    onError: (error) => {
      toast.error('Errore durante l\'aggiunta del corso');
      console.error(error);
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      const { error } = await supabase
        .from('small_group_schedule')
        .update(data)
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['small-group-schedule'] });
      toast.success('Corso aggiornato con successo');
      resetForm();
    },
    onError: (error) => {
      toast.error('Errore durante l\'aggiornamento');
      console.error(error);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('small_group_schedule')
        .update({ is_active: false })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-schedule'] });
      queryClient.invalidateQueries({ queryKey: ['small-group-schedule'] });
      toast.success('Corso eliminato');
    },
    onError: (error) => {
      toast.error('Errore durante l\'eliminazione');
      console.error(error);
    }
  });

  const resetForm = () => {
    setFormData({
      course_type: '',
      course_name: '',
      day_of_week: 1,
      start_time: '09:00',
      end_time: '10:00',
      instructor: '',
      room: '',
      color: '#FF6B35'
    });
    setEditingItem(null);
    setIsDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!formData.course_type || !formData.course_name) {
      toast.error('Compila tutti i campi obbligatori');
      return;
    }

    if (editingItem) {
      updateMutation.mutate({
        id: editingItem.id,
        data: formData
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleEdit = (item: ScheduleItem) => {
    setEditingItem(item);
    setFormData({
      course_type: item.course_type,
      course_name: item.course_name,
      day_of_week: item.day_of_week,
      start_time: item.start_time.substring(0, 5),
      end_time: item.end_time.substring(0, 5),
      instructor: item.instructor || '',
      room: item.room || '',
      color: item.color || '#FF6B35'
    });
    setIsDialogOpen(true);
  };

  const handleCourseTypeChange = (value: string) => {
    const courseType = COURSE_TYPES.find(c => c.value === value);
    setFormData(prev => ({
      ...prev,
      course_type: value,
      course_name: courseType?.label || '',
      color: courseType?.color || '#FF6B35'
    }));
  };

  const getCourseForSlot = (day: number, time: string) => {
    if (!schedule) return null;
    return schedule.find(item => {
      const itemStartTime = item.start_time.substring(0, 5);
      return item.day_of_week === day && itemStartTime === time && item.is_active;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestione Planner Corsi</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Aggiungi Corso
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingItem ? 'Modifica Corso' : 'Aggiungi Nuovo Corso'}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4">
              <div>
                <Label>Tipo Corso *</Label>
                <Select value={formData.course_type} onValueChange={handleCourseTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleziona corso" />
                  </SelectTrigger>
                  <SelectContent>
                    {COURSE_TYPES.map(course => (
                      <SelectItem key={course.value} value={course.value}>
                        {course.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Nome Corso *</Label>
                <Input 
                  value={formData.course_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, course_name: e.target.value }))}
                  placeholder="Es. Postural Pilates"
                />
              </div>

              <div>
                <Label>Giorno *</Label>
                <Select 
                  value={formData.day_of_week.toString()} 
                  onValueChange={(v) => setFormData(prev => ({ ...prev, day_of_week: parseInt(v) }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DAYS.slice(1).map((day, idx) => (
                      <SelectItem key={idx + 1} value={(idx + 1).toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Ora Inizio *</Label>
                  <Input 
                    type="time"
                    value={formData.start_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, start_time: e.target.value }))}
                  />
                </div>
                <div>
                  <Label>Ora Fine *</Label>
                  <Input 
                    type="time"
                    value={formData.end_time}
                    onChange={(e) => setFormData(prev => ({ ...prev, end_time: e.target.value }))}
                  />
                </div>
              </div>

              <div>
                <Label>Istruttore</Label>
                <Input 
                  value={formData.instructor}
                  onChange={(e) => setFormData(prev => ({ ...prev, instructor: e.target.value }))}
                  placeholder="Es. Sara M."
                />
              </div>

              <div>
                <Label>Sala</Label>
                <Input 
                  value={formData.room}
                  onChange={(e) => setFormData(prev => ({ ...prev, room: e.target.value }))}
                  placeholder="Es. Sala 1"
                />
              </div>

              <div>
                <Label>Colore</Label>
                <div className="flex gap-2">
                  <Input 
                    type="color"
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    className="w-20"
                  />
                  <Input 
                    value={formData.color}
                    onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                    placeholder="#FF6B35"
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={resetForm}>Annulla</Button>
              <Button onClick={handleSubmit}>
                {editingItem ? 'Aggiorna' : 'Aggiungi'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid View */}
      <div className="overflow-x-auto" id="schedule-planner">
        {/* Logo e Header per stampa */}
        <div className="hidden print:block mb-6 no-print-hide">
          <img 
            src="/lovable-uploads/muv-logo-transparent.png" 
            alt="MUV Fitness Logo" 
            className="h-20 w-auto mb-3"
          />
          <h1 className="text-3xl font-bold text-gray-900">MUV Fitness - Orari Corsi Small Group</h1>
          <p className="text-sm text-gray-600 mt-2">
            Aggiornato al {new Date().toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="min-w-max schedule-grid">
          <div className="grid grid-cols-8 gap-2 mb-4">
            <div className="font-bold text-center"></div>
            {DAYS.slice(1).map(day => (
              <div key={day} className="font-bold text-center text-sm bg-primary/10 p-2 rounded">
                {day}
              </div>
            ))}
          </div>
          
          {TIME_SLOTS.map(time => (
            <div key={time} className="grid grid-cols-8 gap-2 mb-2">
              <div className="flex items-center justify-center font-medium text-sm text-muted-foreground">
                {time}
              </div>
              {[1, 2, 3, 4, 5, 6].map(day => {
                const course = getCourseForSlot(day, time);
                return (
                  <div key={`${day}-${time}`} className="min-h-[60px]">
                    {course ? (
                      <Card 
                        className="h-full border-2 relative group"
                        style={{ 
                          borderColor: course.color || '#FF6B35',
                          backgroundColor: `${course.color || '#FF6B35'}15`
                        }}
                      >
                        <CardContent className="p-2 h-full flex items-center justify-center">
                          <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <Button 
                              size="sm" 
                              variant="secondary"
                              className="h-6 w-6 p-0"
                              onClick={() => handleEdit(course)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="destructive"
                              className="h-6 w-6 p-0"
                              onClick={() => {
                                if (confirm('Eliminare questo corso?')) {
                                  deleteMutation.mutate(course.id);
                                }
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Badge 
                            className="text-xs whitespace-nowrap"
                            style={{ backgroundColor: course.color || '#FF6B35' }}
                          >
                            {course.course_name}
                          </Badge>
                        </CardContent>
                      </Card>
                    ) : (
                      <div className="h-full border border-dashed border-muted-foreground/20 rounded bg-muted/5"></div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
