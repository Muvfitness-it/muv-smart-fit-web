import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BUSINESS_DATA } from '@/config/businessData';
import { CheckCircle2, XCircle, AlertTriangle, MapPin, Phone, Mail, Globe, Clock, ExternalLink } from 'lucide-react';

interface CitationPlatform {
  name: string;
  url: string;
  status: 'verified' | 'pending' | 'missing';
  napConsistent?: boolean;
  lastChecked?: string;
}

export default function LocalSEODashboard() {
  const [citations, setCitations] = useState<CitationPlatform[]>([
    { 
      name: 'Google My Business', 
      url: 'https://www.google.com/business/', 
      status: 'verified',
      napConsistent: true,
      lastChecked: new Date().toISOString()
    },
    { 
      name: 'PagineGialle', 
      url: 'https://www.paginegialle.it', 
      status: 'pending',
      napConsistent: undefined
    },
    { 
      name: 'TuttoCittà', 
      url: 'https://www.tuttocitta.it', 
      status: 'pending',
      napConsistent: undefined
    },
    { 
      name: 'Yelp Italia', 
      url: 'https://www.yelp.it', 
      status: 'missing'
    },
    { 
      name: 'Pagine Bianche', 
      url: 'https://www.paginebianche.it', 
      status: 'pending'
    },
    { 
      name: 'Facebook Business', 
      url: BUSINESS_DATA.social.facebook || '', 
      status: BUSINESS_DATA.social.facebook ? 'verified' : 'missing',
      napConsistent: true
    },
    { 
      name: 'Instagram Business', 
      url: BUSINESS_DATA.social.instagram || '', 
      status: BUSINESS_DATA.social.instagram ? 'verified' : 'missing',
      napConsistent: true
    }
  ]);

  const getStatusIcon = (status: CitationPlatform['status']) => {
    switch (status) {
      case 'verified':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'missing':
        return <XCircle className="h-5 w-5 text-red-600" />;
    }
  };

  const getStatusBadge = (status: CitationPlatform['status']) => {
    switch (status) {
      case 'verified':
        return <Badge variant="default" className="bg-green-100 text-green-800">Verificato</Badge>;
      case 'pending':
        return <Badge variant="default" className="bg-yellow-100 text-yellow-800">In Attesa</Badge>;
      case 'missing':
        return <Badge variant="destructive">Mancante</Badge>;
    }
  };

  const verifiedCount = citations.filter(c => c.status === 'verified').length;
  const pendingCount = citations.filter(c => c.status === 'pending').length;
  const missingCount = citations.filter(c => c.status === 'missing').length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Local SEO</h1>
          <p className="text-muted-foreground">Monitoraggio NAP e Citations</p>
        </div>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Aggiorna Dati
        </Button>
      </div>

      {/* NAP Consistency Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Business Name</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{BUSINESS_DATA.name}</div>
            <p className="text-xs text-muted-foreground mt-1">Unica fonte di verità</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Indirizzo</CardTitle>
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-medium">{BUSINESS_DATA.address.street}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {BUSINESS_DATA.address.postalCode} {BUSINESS_DATA.address.city} ({BUSINESS_DATA.address.provinceCode})
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Telefono</CardTitle>
            <Phone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{BUSINESS_DATA.contact.phoneDisplay}</div>
            <p className="text-xs text-muted-foreground mt-1">Formato: {BUSINESS_DATA.contact.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coordinate GPS</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-sm font-mono">
              {BUSINESS_DATA.geo.latitude}, {BUSINESS_DATA.geo.longitude}
            </div>
            <a 
              href={BUSINESS_DATA.geo.googleMapsUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline mt-1 inline-flex items-center gap-1"
            >
              Vedi su Maps <ExternalLink className="h-3 w-3" />
            </a>
          </CardContent>
        </Card>
      </div>

      {/* Citations Status */}
      <Card>
        <CardHeader>
          <CardTitle>Status Citations</CardTitle>
          <CardDescription>
            Verifica presenza su directory locali e consistenza NAP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-semibold">{verifiedCount} Verificate</p>
                  <p className="text-xs text-muted-foreground">NAP consistente</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <div>
                  <p className="font-semibold">{pendingCount} In Attesa</p>
                  <p className="text-xs text-muted-foreground">Da verificare</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-semibold">{missingCount} Mancanti</p>
                  <p className="text-xs text-muted-foreground">Da creare</p>
                </div>
              </div>
            </div>

            <div className="border rounded-lg divide-y">
              {citations.map((citation, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(citation.status)}
                    <div>
                      <p className="font-medium">{citation.name}</p>
                      {citation.napConsistent !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          NAP: {citation.napConsistent ? '✓ Consistente' : '✗ Inconsistente'}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {getStatusBadge(citation.status)}
                    {citation.url && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => window.open(citation.url, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Opening Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Orari di Apertura
          </CardTitle>
          <CardDescription>Verifica consistenza formato Schema.org</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <p className="text-sm font-medium mb-2">Formato Schema.org:</p>
              <div className="bg-muted p-3 rounded-md font-mono text-sm space-y-1">
                {BUSINESS_DATA.openingHours.schemaFormat.map((hours, idx) => (
                  <div key={idx}>{hours}</div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Formato Leggibile:</p>
              <div className="space-y-2">
                {BUSINESS_DATA.openingHours.structured.map((hours, idx) => (
                  <div key={idx} className="flex justify-between items-center p-2 bg-muted/50 rounded">
                    <span className="font-medium">{hours.displayDays}</span>
                    <span className="text-muted-foreground">{hours.displayHours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* GMB Integration Status */}
      <Alert>
        <AlertDescription className="flex items-start gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <p className="font-semibold mb-1">Integrazione Google My Business</p>
            <p className="text-sm">
              L'edge function <code className="bg-muted px-1 py-0.5 rounded">gmb-post-publisher</code> è pronta.
              Per completare l'integrazione:
            </p>
            <ol className="text-sm list-decimal list-inside mt-2 space-y-1">
              <li>Configura Google My Business API credentials</li>
              <li>Crea tabella <code className="bg-muted px-1 py-0.5 rounded">gmb_posts_queue</code> nel database</li>
              <li>Collega trigger automatico alla pubblicazione blog posts</li>
            </ol>
          </div>
        </AlertDescription>
      </Alert>

      {/* SEO Keywords Monitor */}
      <Card>
        <CardHeader>
          <CardTitle>Keywords Geo-localizzate</CardTitle>
          <CardDescription>Monitora manualmente il ranking per queste query</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm font-medium mb-2">Keywords Primarie:</p>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_DATA.geoKeywords.primary.map((keyword, idx) => (
                  <Badge key={idx} variant="default">{keyword}</Badge>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Keywords Secondarie:</p>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_DATA.geoKeywords.secondary.map((keyword, idx) => (
                  <Badge key={idx} variant="secondary">{keyword}</Badge>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-sm font-medium mb-2">Long-Tail Keywords:</p>
            <div className="flex flex-wrap gap-2">
              {BUSINESS_DATA.geoKeywords.longTail.map((keyword, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">{keyword}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
