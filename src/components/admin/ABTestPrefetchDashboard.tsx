import { useABTestResults } from '@/hooks/useABTestPrefetch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Trophy, FlaskConical, Clock, MousePointer, Activity } from 'lucide-react';

/**
 * Admin dashboard component for A/B test results
 * Shows performance metrics for each prefetch threshold variant
 */
export function ABTestPrefetchDashboard() {
  const { results, winner, loading } = useABTestResults();

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FlaskConical className="w-5 h-5" />
            A/B Test: Soglie Prefetch
          </CardTitle>
          <CardDescription>
            Test in corso per determinare la soglia ottimale di scroll
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    );
  }

  const variantNames: Record<string, string> = {
    'A': '30% Scroll',
    'B': '50% Scroll',
    'C': '70% Scroll'
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5" />
          A/B Test: Soglie Prefetch
        </CardTitle>
        <CardDescription>
          Test automatico per ottimizzare engagement articoli correlati
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Winner Banner */}
        {winner && winner.confidence_level === 'HIGH' && (
          <div className="bg-primary/10 border-2 border-primary rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="w-6 h-6 text-primary" />
              <h3 className="text-lg font-bold">Variante Vincente Determinata!</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Variante</p>
                <p className="font-bold text-xl">
                  {variantNames[winner.winning_variant]} 
                  <Badge variant="secondary" className="ml-2">
                    {winner.winning_variant}
                  </Badge>
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">CTR</p>
                <p className="font-bold text-xl text-green-600">
                  {winner.ctr_percentage?.toFixed(2)}%
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Tempo Pagina</p>
                <p className="font-bold text-xl">
                  {winner.avg_time_on_page_ms 
                    ? `${(winner.avg_time_on_page_ms / 1000).toFixed(1)}s`
                    : 'N/A'
                  }
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">Bounce Rate</p>
                <p className="font-bold text-xl text-orange-600">
                  {winner.bounce_rate_percentage?.toFixed(2)}%
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              <strong>{winner.total_sessions}</strong> sessioni analizzate • 
              Confidenza: <Badge variant="default">{winner.confidence_level}</Badge>
            </p>
          </div>
        )}

        {/* Variants Comparison */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold">Confronto Varianti</h3>
          {results.map((variant) => (
            <Card 
              key={variant.variant} 
              className={variant.variant === winner?.winning_variant 
                ? 'border-2 border-primary bg-primary/5' 
                : ''
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Badge variant={variant.variant === winner?.winning_variant ? 'default' : 'outline'}>
                      Variante {variant.variant}
                    </Badge>
                    {variantNames[variant.variant]}
                    {variant.variant === winner?.winning_variant && (
                      <Trophy className="w-4 h-4 text-primary" />
                    )}
                  </CardTitle>
                  <span className="text-sm text-muted-foreground">
                    {variant.total_sessions} sessioni
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* CTR */}
                  <MetricCard
                    icon={<MousePointer className="w-4 h-4" />}
                    label="CTR"
                    value={`${variant.ctr_percentage?.toFixed(2) || 0}%`}
                    detail={`${variant.clicks_count} click`}
                    trend={
                      winner && variant.variant === winner.winning_variant
                        ? 'up'
                        : undefined
                    }
                  />

                  {/* Time to Click */}
                  <MetricCard
                    icon={<Clock className="w-4 h-4" />}
                    label="Tempo al Click"
                    value={
                      variant.avg_time_to_click_ms
                        ? `${(variant.avg_time_to_click_ms / 1000).toFixed(1)}s`
                        : 'N/A'
                    }
                    detail="Media"
                  />

                  {/* Time on Page */}
                  <MetricCard
                    icon={<Clock className="w-4 h-4" />}
                    label="Tempo su Pagina"
                    value={
                      variant.avg_time_on_page_ms
                        ? `${(variant.avg_time_on_page_ms / 1000).toFixed(1)}s`
                        : 'N/A'
                    }
                    detail="Media"
                    trend={
                      winner && 
                      variant.variant === winner.winning_variant &&
                      (variant.avg_time_on_page_ms || 0) > 60000
                        ? 'up'
                        : undefined
                    }
                  />

                  {/* Bounce Rate */}
                  <MetricCard
                    icon={<Activity className="w-4 h-4" />}
                    label="Bounce Rate"
                    value={`${variant.bounce_rate_percentage?.toFixed(2) || 0}%`}
                    detail={`${variant.bounce_count} bounce`}
                    trend={
                      winner &&
                      variant.variant === winner.winning_variant &&
                      (variant.bounce_rate_percentage || 100) < 40
                        ? 'down'
                        : undefined
                    }
                    isNegative
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Test Status */}
        <div className="text-sm text-muted-foreground space-y-2">
          <p>
            <strong>Stato Test:</strong>{' '}
            {winner?.confidence_level === 'HIGH'
              ? '✅ Completato - 90% traffico su variante vincente, 10% continua test'
              : winner?.confidence_level === 'MEDIUM'
              ? '🔄 In corso - Raccolta dati in fase avanzata'
              : '🔄 In corso - Necessarie almeno 1000 sessioni totali'}
          </p>
          <p>
            <strong>Algoritmo:</strong> Composite Score = (CTR × 50%) + (Tempo su Pagina × 30%) - (Bounce Rate × 20%)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  detail?: string;
  trend?: 'up' | 'down';
  isNegative?: boolean; // If true, 'down' is good
}

function MetricCard({ icon, label, value, detail, trend, isNegative = false }: MetricCardProps) {
  const trendIcon = trend === 'up' 
    ? <TrendingUp className="w-3 h-3" />
    : trend === 'down'
    ? <TrendingDown className="w-3 h-3" />
    : null;

  const trendColor = trend
    ? (trend === 'up' && !isNegative) || (trend === 'down' && isNegative)
      ? 'text-green-600'
      : 'text-red-600'
    : '';

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-1.5 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="flex items-baseline gap-2">
        <span className={`text-lg font-bold ${trendColor}`}>
          {value}
        </span>
        {trendIcon && <span className={trendColor}>{trendIcon}</span>}
      </div>
      {detail && (
        <span className="text-xs text-muted-foreground">{detail}</span>
      )}
    </div>
  );
}
