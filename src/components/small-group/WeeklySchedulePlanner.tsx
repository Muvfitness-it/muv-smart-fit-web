import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Clock, User, MapPin } from 'lucide-react';
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
}

const DAYS = ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'];
const TIME_SLOTS = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

export const WeeklySchedulePlanner = () => {
  const { data: schedule, isLoading } = useQuery({
    queryKey: ['small-group-schedule'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('small_group_schedule')
        .select('*')
        .eq('is_active', true)
        .order('day_of_week, start_time');
      
      if (error) throw error;
      return data as ScheduleItem[];
    }
  });

  const getCourseForSlot = (day: number, time: string) => {
    if (!schedule) return null;
    return schedule.find(item => {
      const itemStartTime = item.start_time.substring(0, 5);
      return item.day_of_week === day && itemStartTime === time;
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-7 gap-2">
        {DAYS.map((_, idx) => (
          <div key={idx} className="space-y-2">
            <Skeleton className="h-8 w-full" />
            {TIME_SLOTS.map((_, slotIdx) => (
              <Skeleton key={slotIdx} className="h-20 w-full" />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="w-full" id="schedule-planner">
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

      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto schedule-grid">
        <div className="min-w-max print:min-w-full">
          <div className="grid grid-cols-8 gap-2 mb-4 print:mb-1 print:gap-1">
            <div className="font-bold text-center"></div>
            {DAYS.slice(1).map(day => (
              <div key={day} className="font-bold text-center text-sm bg-primary/10 p-2 rounded print:text-xs print:p-1">
                {day}
              </div>
            ))}
          </div>
          
          {TIME_SLOTS.map(time => (
            <div key={time} className="grid grid-cols-8 gap-2 mb-2 print:mb-1 print:gap-1">
              <div className="flex items-center justify-center font-medium text-sm text-muted-foreground print:text-xs">
                {time}
              </div>
              {[1, 2, 3, 4, 5, 6].map(day => {
                const course = getCourseForSlot(day, time);
                return (
                  <div key={`${day}-${time}`} className="min-h-[50px] print:min-h-[35px]">
                    {course ? (
                      <Card 
                        className="h-full border-2 hover:shadow-lg transition-shadow cursor-pointer print:border print:shadow-none"
                        style={{ 
                          borderColor: course.color || '#FF6B35',
                          backgroundColor: `${course.color || '#FF6B35'}15`
                        }}
                      >
                        <CardContent className="p-2 h-full flex items-center justify-center print:p-1">
                          <Badge 
                            className="text-xs whitespace-nowrap print:text-[9px]"
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

      {/* Mobile View */}
      <div className="md:hidden space-y-4">
        {DAYS.slice(1).map(day => {
          const dayIndex = DAYS.indexOf(day);
          const dayCourses = schedule?.filter(c => c.day_of_week === dayIndex) || [];
          
          return (
            <div key={day} className="space-y-2">
              <h3 className="font-bold text-lg bg-primary/10 p-2 rounded">{day}</h3>
              {dayCourses.length > 0 ? (
                <div className="space-y-2">
                  {dayCourses.map(course => (
                    <Card 
                      key={course.id}
                      className="border-2"
                      style={{ 
                        borderColor: course.color || '#FF6B35',
                        backgroundColor: `${course.color || '#FF6B35'}10`
                      }}
                    >
                      <CardContent className="p-4">
                        <Badge 
                          className="mb-2"
                          style={{ backgroundColor: course.color || '#FF6B35' }}
                        >
                          {course.course_name}
                        </Badge>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{course.start_time.substring(0, 5)} - {course.end_time.substring(0, 5)}</span>
                          </div>
                          {course.instructor && (
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span>{course.instructor}</span>
                            </div>
                          )}
                          {course.room && (
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              <span>{course.room}</span>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground p-4 text-center border border-dashed rounded">
                  Nessun corso programmato
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
