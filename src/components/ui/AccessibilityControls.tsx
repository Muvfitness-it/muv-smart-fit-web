import React, { useState, useEffect } from 'react';
import { Settings, Type, Eye, MousePointer, Volume2, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';

interface AccessibilitySettings {
  fontSize: number;
  contrast: boolean;
  dyslexiaFont: boolean;
  reducedMotion: boolean;
  focusIndicators: boolean;
  screenReader: boolean;
  highContrast: boolean;
  largeClickTargets: boolean;
}

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>({
    fontSize: 100,
    contrast: false,
    dyslexiaFont: false,
    reducedMotion: false,
    focusIndicators: true,
    screenReader: false,
    highContrast: false,
    largeClickTargets: false
  });

  // Load settings from localStorage
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility-settings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }

    // Apply system preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setSettings(prev => ({ ...prev, reducedMotion: true }));
    }

    if (window.matchMedia('(prefers-contrast: high)').matches) {
      setSettings(prev => ({ ...prev, highContrast: true }));
    }
  }, []);

  // Apply settings to document
  useEffect(() => {
    const root = document.documentElement;

    // Font size
    root.style.setProperty('--accessibility-font-scale', `${settings.fontSize}%`);

    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }

    // Dyslexia-friendly font
    if (settings.dyslexiaFont) {
      root.classList.add('dyslexia-font');
    } else {
      root.classList.remove('dyslexia-font');
    }

    // Reduced motion
    if (settings.reducedMotion) {
      root.classList.add('reduce-motion');
    } else {
      root.classList.remove('reduce-motion');
    }

    // Enhanced focus indicators
    if (settings.focusIndicators) {
      root.classList.add('enhanced-focus');
    } else {
      root.classList.remove('enhanced-focus');
    }

    // Large click targets
    if (settings.largeClickTargets) {
      root.classList.add('large-targets');
    } else {
      root.classList.remove('large-targets');
    }

    // Save to localStorage
    localStorage.setItem('accessibility-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    const defaultSettings: AccessibilitySettings = {
      fontSize: 100,
      contrast: false,
      dyslexiaFont: false,
      reducedMotion: false,
      focusIndicators: true,
      screenReader: false,
      highContrast: false,
      largeClickTargets: false
    };
    setSettings(defaultSettings);
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 z-50 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
        size="lg"
        aria-label="Apri controlli accessibilità"
      >
        <Settings className="w-5 h-5" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Impostazioni Accessibilità
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                Personalizza l'esperienza del sito per le tue esigenze
              </p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  <label className="text-sm font-medium">
                    Dimensione Testo: {settings.fontSize}%
                  </label>
                </div>
                <Slider
                  value={[settings.fontSize]}
                  onValueChange={(value) => updateSetting('fontSize', value[0])}
                  min={75}
                  max={150}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Piccolo</span>
                  <span>Normale</span>
                  <span>Grande</span>
                </div>
              </div>

              {/* Visual Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <h4 className="font-medium">Visibilità</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <label className="text-sm">Alto Contrasto</label>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) => updateSetting('highContrast', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Font per Dislessia</label>
                    <Switch
                      checked={settings.dyslexiaFont}
                      onCheckedChange={(checked) => updateSetting('dyslexiaFont', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Indicatori Focus</label>
                    <Switch
                      checked={settings.focusIndicators}
                      onCheckedChange={(checked) => updateSetting('focusIndicators', checked)}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm">Movimento Ridotto</label>
                    <Switch
                      checked={settings.reducedMotion}
                      onCheckedChange={(checked) => updateSetting('reducedMotion', checked)}
                    />
                  </div>
                </div>
              </div>

              {/* Motor Settings */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MousePointer className="w-4 h-4" />
                  <h4 className="font-medium">Interazione</h4>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Pulsanti Grandi</label>
                    <p className="text-xs text-muted-foreground">
                      Aumenta la dimensione dei pulsanti per facilitare il clic
                    </p>
                  </div>
                  <Switch
                    checked={settings.largeClickTargets}
                    onCheckedChange={(checked) => updateSetting('largeClickTargets', checked)}
                  />
                </div>
              </div>

              {/* Screen Reader */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4" />
                  <h4 className="font-medium">Screen Reader</h4>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium">Modalità Screen Reader</label>
                    <p className="text-xs text-muted-foreground">
                      Ottimizza la navigazione per screen reader
                    </p>
                  </div>
                  <Switch
                    checked={settings.screenReader}
                    onCheckedChange={(checked) => updateSetting('screenReader', checked)}
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div className="space-y-4 pt-4 border-t">
                <h4 className="font-medium flex items-center gap-2">
                  <Palette className="w-4 h-4" />
                  Preset Rapidi
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateSetting('fontSize', 125);
                      updateSetting('highContrast', true);
                      updateSetting('focusIndicators', true);
                    }}
                  >
                    Ipovedenti
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateSetting('dyslexiaFont', true);
                      updateSetting('fontSize', 110);
                      updateSetting('reducedMotion', true);
                    }}
                  >
                    Dislessia
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateSetting('largeClickTargets', true);
                      updateSetting('reducedMotion', true);
                      updateSetting('fontSize', 125);
                    }}
                  >
                    Difficoltà Motorie
                  </Button>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      updateSetting('screenReader', true);
                      updateSetting('focusIndicators', true);
                      updateSetting('reducedMotion', true);
                    }}
                  >
                    Screen Reader
                  </Button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={resetSettings}
                >
                  Reset
                </Button>
                
                <Button onClick={() => setIsOpen(false)}>
                  Salva e Chiudi
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Inject accessibility styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        :root {
          --accessibility-font-scale: ${settings.fontSize}%;
        }

        .high-contrast {
          filter: contrast(150%);
        }

        .high-contrast .bg-primary {
          background-color: #000000 !important;
          color: #ffffff !important;
        }

        .dyslexia-font * {
          font-family: 'OpenDyslexic', 'Arial', sans-serif !important;
        }

        .reduce-motion * {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }

        .enhanced-focus *:focus {
          outline: 3px solid #fbbf24 !important;
          outline-offset: 2px !important;
        }

        .large-targets button,
        .large-targets a,
        .large-targets input,
        .large-targets select {
          min-height: 44px !important;
          min-width: 44px !important;
          padding: 12px 16px !important;
        }

        * {
          font-size: calc(1em * var(--accessibility-font-scale) / 100) !important;
        }
        `
      }} />
    </>
  );
};

export default AccessibilityControls;