import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FileDown, Printer, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { AdminScheduleManager } from '@/components/small-group/AdminScheduleManager';
import { useSchedulePDFExport } from '@/hooks/useSchedulePDFExport';
import { AdminRoute } from '@/components/security/AdminRoute';

const AdminSmallGroupSchedule = () => {
  const { exportToPDF, printSchedule } = useSchedulePDFExport();

  const { data: stats } = useQuery({
    queryKey: ['schedule-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('small_group_schedule')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;

      const totalCourses = data.length;
      const totalHoursWeek = data.reduce((acc, course) => {
        const start = new Date(`2000-01-01T${course.start_time}`);
        const end = new Date(`2000-01-01T${course.end_time}`);
        const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
        return acc + hours;
      }, 0);

      const courseCounts = data.reduce((acc: any, course) => {
        acc[course.course_name] = (acc[course.course_name] || 0) + 1;
        return acc;
      }, {});

      const mostPopular = Object.entries(courseCounts).sort((a: any, b: any) => b[1] - a[1])[0];

      return {
        totalCourses,
        totalHoursWeek: totalHoursWeek.toFixed(1),
        mostPopularCourse: mostPopular ? mostPopular[0] : 'N/A',
        lastUpdate: new Date().toLocaleDateString('it-IT')
      };
    }
  });

  return (
    <AdminRoute>
      <div className="min-h-screen bg-background text-foreground p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-3">
              <Link to="/servizi/small-group">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Torna alla pagina
                </Button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold">Gestione Orari Small Group</h1>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button onClick={() => exportToPDF('schedule-planner', 'muv-orari-corsi.pdf')} variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Esporta PDF
              </Button>
              <Button onClick={printSchedule} variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Stampa
              </Button>
            </div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{stats?.totalCourses || 0}</div>
                    <div className="text-sm text-muted-foreground">Corsi Attivi</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-primary" />
                  <div>
                    <div className="text-2xl font-bold">{stats?.totalHoursWeek || 0}h</div>
                    <div className="text-sm text-muted-foreground">Ore Settimanali</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div>
                  <div className="text-lg font-bold truncate">{stats?.mostPopularCourse}</div>
                  <div className="text-sm text-muted-foreground">Corso Più Frequente</div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div>
                  <div className="text-lg font-bold">{stats?.lastUpdate}</div>
                  <div className="text-sm text-muted-foreground">Ultimo Aggiornamento</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Schedule Manager */}
          <AdminScheduleManager />
        </div>
      </div>
    </AdminRoute>
  );
};

export default AdminSmallGroupSchedule;
