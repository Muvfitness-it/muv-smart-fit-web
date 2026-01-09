import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useSiteConfig, useUpdateSiteConfig } from '@/hooks/useSiteConfig';
import { Save, Palette, Home, Phone, Sparkles, RefreshCw } from 'lucide-react';
import { useAdminAuth } from '@/hooks/useAdminAuth';
import { useNavigate } from 'react-router-dom';

/**
 * Pannello Admin per gestire contenuti e tema senza toccare codice
 * 
 * Permette di modificare:
 * - Colori tema (testo, pulsanti, form)
 * - Contenuti homepage (hero, CTA)
 * - Contenuti landing pages
 * - Info contatto visibili
 */
const ContentManagement = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAdminAuth();
  const { config, isLoading, refetch } = useSiteConfig();
  const updateConfig = useUpdateSiteConfig();

  // State locale per form
  const [colors, setColors] = useState(config.colors);
  const [homepage, setHomepage] = useState(config.homepage);
  const [landing, setLanding] = useState(config.landing);
  const [contact, setContact] = useState(config.contact);

  // Aggiorna state quando config cambia
  useState(() => {
    setColors(config.colors);
    setHomepage(config.homepage);
    setLanding(config.landing);
    setContact(config.contact);
  });

  const handleSaveColors = async () => {
    try {
      await updateConfig.mutateAsync({
        configKey: 'theme_colors',
        configValue: colors,
      });
      toast({
        title: 'Colori salvati',
        description: 'I colori del tema sono stati aggiornati con successo.',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile salvare i colori. Riprova.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveHomepage = async () => {
    try {
      await updateConfig.mutateAsync({
        configKey: 'homepage_content',
        configValue: homepage,
      });
      toast({
        title: 'Homepage salvata',
        description: 'I contenuti della homepage sono stati aggiornati.',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile salvare la homepage. Riprova.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveLanding = async () => {
    try {
      await updateConfig.mutateAsync({
        configKey: 'landing_defaults',
        configValue: landing,
      });
      toast({
        title: 'Landing salvate',
        description: 'I contenuti di default delle landing sono stati aggiornati.',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile salvare le landing. Riprova.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveContact = async () => {
    try {
      await updateConfig.mutateAsync({
        configKey: 'contact_info',
        configValue: contact,
      });
      toast({
        title: 'Contatti salvati',
        description: 'Le informazioni di contatto sono state aggiornate.',
      });
    } catch (error) {
      toast({
        title: 'Errore',
        description: 'Impossibile salvare i contatti. Riprova.',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    navigate('/admin-auth');
    return null;
  }

  return (
    <>
      <Helmet>
        <title>Gestione Contenuti - Admin MUV Fitness</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-card">
          <div className="container mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gestione Contenuti & Tema</h1>
                <p className="text-muted-foreground">Modifica colori, testi e contenuti senza toccare codice</p>
              </div>
              <Button
                variant="outline"
                onClick={() => navigate('/admin-control')}
              >
                Torna alla Dashboard
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-6 h-6 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Caricamento configurazione...</span>
            </div>
          ) : (
            <Tabs defaultValue="colors" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="colors">
                  <Palette className="w-4 h-4 mr-2" />
                  Colori
                </TabsTrigger>
                <TabsTrigger value="homepage">
                  <Home className="w-4 h-4 mr-2" />
                  Homepage
                </TabsTrigger>
                <TabsTrigger value="landing">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Landing
                </TabsTrigger>
                <TabsTrigger value="contact">
                  <Phone className="w-4 h-4 mr-2" />
                  Contatti
                </TabsTrigger>
              </TabsList>

              {/* TAB COLORI */}
              <TabsContent value="colors">
                <Card>
                  <CardHeader>
                    <CardTitle>Colori Tema</CardTitle>
                    <CardDescription>
                      Modifica i colori principali del sito. Usa formato HSL (es: hsl(320 85% 45%))
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="textOnDark">Testo su sfondo scuro</Label>
                        <Input
                          id="textOnDark"
                          value={colors.textOnDark}
                          onChange={(e) => setColors({ ...colors, textOnDark: e.target.value })}
                          placeholder="hsl(0 0% 100%)"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="formText">Testo form</Label>
                        <Input
                          id="formText"
                          value={colors.formText}
                          onChange={(e) => setColors({ ...colors, formText: e.target.value })}
                          placeholder="hsl(220 15% 15%)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="buttonPrimary">Pulsante Principale</Label>
                        <Input
                          id="buttonPrimary"
                          value={colors.buttonPrimary}
                          onChange={(e) => setColors({ ...colors, buttonPrimary: e.target.value })}
                          placeholder="hsl(320 85% 45%)"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="buttonSecondary">Pulsante Secondario</Label>
                        <Input
                          id="buttonSecondary"
                          value={colors.buttonSecondary}
                          onChange={(e) => setColors({ ...colors, buttonSecondary: e.target.value })}
                          placeholder="hsl(280 70% 50%)"
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveColors} disabled={updateConfig.isPending}>
                      <Save className="w-4 h-4 mr-2" />
                      {updateConfig.isPending ? 'Salvataggio...' : 'Salva Colori'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB HOMEPAGE */}
              <TabsContent value="homepage">
                <Card>
                  <CardHeader>
                    <CardTitle>Contenuti Homepage</CardTitle>
                    <CardDescription>
                      Modifica i testi principali della homepage
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Titolo Hero</Label>
                      <Textarea
                        id="heroTitle"
                        value={homepage.heroTitle}
                        onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })}
                        rows={2}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="heroDescription">Descrizione Hero</Label>
                      <Textarea
                        id="heroDescription"
                        value={homepage.heroDescription}
                        onChange={(e) => setHomepage({ ...homepage, heroDescription: e.target.value })}
                        rows={4}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="heroPrimaryCTA">CTA Primario</Label>
                        <Input
                          id="heroPrimaryCTA"
                          value={homepage.heroPrimaryCTA}
                          onChange={(e) => setHomepage({ ...homepage, heroPrimaryCTA: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="heroSecondaryCTA">CTA Secondario</Label>
                        <Input
                          id="heroSecondaryCTA"
                          value={homepage.heroSecondaryCTA}
                          onChange={(e) => setHomepage({ ...homepage, heroSecondaryCTA: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="finalCTATitle">Titolo CTA Finale</Label>
                      <Input
                        id="finalCTATitle"
                        value={homepage.finalCTATitle}
                        onChange={(e) => setHomepage({ ...homepage, finalCTATitle: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="finalCTADescription">Descrizione CTA Finale</Label>
                      <Textarea
                        id="finalCTADescription"
                        value={homepage.finalCTADescription}
                        onChange={(e) => setHomepage({ ...homepage, finalCTADescription: e.target.value })}
                        rows={3}
                      />
                    </div>

                    <Button onClick={handleSaveHomepage} disabled={updateConfig.isPending}>
                      <Save className="w-4 h-4 mr-2" />
                      {updateConfig.isPending ? 'Salvataggio...' : 'Salva Homepage'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB LANDING */}
              <TabsContent value="landing">
                <Card>
                  <CardHeader>
                    <CardTitle>Landing Pages Default</CardTitle>
                    <CardDescription>
                      Configurazione di default per le landing pages
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="defaultClaim">Claim Principale</Label>
                      <Input
                        id="defaultClaim"
                        value={landing.defaultClaim}
                        onChange={(e) => setLanding({ ...landing, defaultClaim: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="defaultIncentive">Incentivo Default</Label>
                      <Input
                        id="defaultIncentive"
                        value={landing.defaultIncentive}
                        onChange={(e) => setLanding({ ...landing, defaultIncentive: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="countdownDefault">Countdown Ore (default)</Label>
                      <Input
                        id="countdownDefault"
                        type="number"
                        value={landing.countdownDefault}
                        onChange={(e) => setLanding({ ...landing, countdownDefault: parseInt(e.target.value) || 48 })}
                      />
                    </div>

                    <Button onClick={handleSaveLanding} disabled={updateConfig.isPending}>
                      <Save className="w-4 h-4 mr-2" />
                      {updateConfig.isPending ? 'Salvataggio...' : 'Salva Landing'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* TAB CONTATTI */}
              <TabsContent value="contact">
                <Card>
                  <CardHeader>
                    <CardTitle>Informazioni Contatto</CardTitle>
                    <CardDescription>
                      Info contatto visibili su tutto il sito
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefono</Label>
                        <Input
                          id="phone"
                          value={contact.phone}
                          onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contact.email}
                          onChange={(e) => setContact({ ...contact, email: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatsappNumber">WhatsApp (solo numeri)</Label>
                        <Input
                          id="whatsappNumber"
                          value={contact.whatsappNumber}
                          onChange={(e) => setContact({ ...contact, whatsappNumber: e.target.value.replace(/\D/g, '') })}
                        />
                      </div>
                    </div>

                    <Button onClick={handleSaveContact} disabled={updateConfig.isPending}>
                      <Save className="w-4 h-4 mr-2" />
                      {updateConfig.isPending ? 'Salvataggio...' : 'Salva Contatti'}
                    </Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentManagement;
