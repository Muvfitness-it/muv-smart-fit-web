import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, User, MessageSquare, Calendar, Shield } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { sendContactViaWeb3Forms } from "@/utils/mailAdapter";

interface LandingFormProps {
  campaignName: string;
  formTitle?: string;
  incentive?: string;
  onSuccess?: () => void;
}

const LandingForm: React.FC<LandingFormProps> = ({
  campaignName,
  formTitle = "Prenota la tua consulenza gratuita",
  incentive = "Valutazione completa inclusa",
  onSuccess,
}) => {
  const [formData, setFormData] = useState({
    nome: "",
    telefono: "",
    email: "",
    messaggio: "",
    botcheck: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await sendContactViaWeb3Forms({
        name: formData.nome.trim(),
        email: formData.email.toLowerCase().trim(),
        message: formData.messaggio.trim() || `Richiesta campagna ${campaignName}`,
        phone: formData.telefono.trim(),
        campaign: campaignName,
        source: "landing_page",
        botcheck: formData.botcheck,
        subject: `Nuovo lead landing: ${campaignName} - ${formData.nome}`,
      });

      if (!res.success) throw new Error(res.message || "Invio fallito");

      // Non-blocking logging to edge function (ignore failures)
      supabase.functions
        .invoke("secure-contact", {
          body: {
            name: formData.nome.trim(),
            email: formData.email.toLowerCase().trim(),
            message: formData.messaggio.trim(),
            telefono: formData.telefono.trim(),
            city: "",
            goal: "",
            campaign: campaignName,
            transport: "web3forms",
          },
        })
        .catch(() => {});

      toast({
        title: "Richiesta inviata",
        description: "Ti ricontatteremo entro 24 ore per confermare il tuo appuntamento.",
      });

      // Reset form
      setFormData({ nome: "", telefono: "", email: "", messaggio: "", botcheck: "" });

      if (onSuccess) onSuccess();

      // Track conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("event", "conversion", {
          send_to: "AW-CONVERSION_ID/CONVERSION_LABEL",
          campaign_name: campaignName,
        });
      }
    } catch (error) {
      toast({
        title: "Si è verificato un errore",
        description: "Riprova o contattaci direttamente via WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="border border-border shadow-lg">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Calendar className="w-12 h-12 text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-foreground">
                {formTitle}
              </h2>
              <p className="text-lg text-muted-foreground mb-2">{incentive}</p>
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>Zero impegno • Consulenza personalizzata</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot anti-spam field */}
              <input
                type="text"
                name="botcheck"
                value={formData.botcheck}
                onChange={handleChange}
                className="hidden"
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
              />
              
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nome e Cognome
                  </label>
                  <Input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="bg-background border-input placeholder:text-muted-foreground"
                    placeholder="Il tuo nome completo"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefono
                  </label>
                  <Input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="bg-background border-input placeholder:text-muted-foreground"
                    placeholder="Il tuo numero"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-background border-input placeholder:text-muted-foreground"
                  placeholder="La tua email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-2" />
                  Il tuo obiettivo (opzionale)
                </label>
                <Textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  className="bg-background border-input placeholder:text-muted-foreground"
                  placeholder="Raccontaci brevemente cosa vorresti ottenere..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-6 text-lg font-semibold"
                size="lg"
              >
                {isSubmitting ? "Invio in corso..." : "Prenota la tua consulenza"}
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Ti ricontatteremo entro 24 ore per confermare l'appuntamento
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LandingForm;
