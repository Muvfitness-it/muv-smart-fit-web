import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Phone, Mail, User, MessageSquare, Gift, Shield } from "lucide-react";
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
  formTitle = "🎁 PRENOTA LA TUA CONSULENZA GRATUITA",
  incentive = "Check-up gratuito - OGGI per i primi 10",
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
        title: "🎉 Perfetto!",
        description: "Ti ricontatteremo entro 2 ore per confermare il tuo appuntamento gratuito!",
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
        title: "Errore",
        description: "Si è verificato un errore. Riprova o chiamaci direttamente.",
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
    <section className="py-20 bg-gradient-to-br from-magenta-900/30 via-viola-900/30 to-blu-900/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-magenta-600/50 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="text-center mb-8">
              <Gift className="w-16 h-16 text-magenta-400 mx-auto mb-4 animate-bounce" />
              <h2 className="text-3xl md:text-4xl font-White mb-4">
                <span className="text-magenta-400">{formTitle}</span>
              </h2>
              <p className="text-xl text-viola-400 font-bold mb-2">{incentive}</p>
              <p className="text-gray-300 font-semibold">
                <Shield className="w-5 h-5 inline mr-2 text-green-400" />✅ ZERO IMPEGNO • ✅ RISULTATI GARANTITI • ✅
                CONSULENZA 1-to-1
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
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
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold mb-2">
                    <User className="w-5 h-5 inline mr-2" />
                    Nome e Cognome *
                  </label>
                  <Input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-300 text-lg p-4"
                    placeholder="Il tuo nome completo"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold mb-2">
                    <Phone className="w-5 h-5 inline mr-2" />
                    Numero di Telefono *
                  </label>
                  <Input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-300 text-lg p-4"
                    placeholder="Il tuo numero di telefono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  <Mail className="w-5 h-5 inline mr-2" />
                  Email *
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-300 text-lg p-4"
                  placeholder="La tua email"
                />
              </div>

              <div>
                <label className="block text-white font-bold mb-2">
                  <MessageSquare className="w-5 h-5 inline mr-2" />
                  Il tuo obiettivo (opzionale)
                </label>
                <Textarea
                  name="messaggio"
                  value={formData.messaggio}
                  onChange={handleChange}
                  className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-300 text-lg p-4"
                  placeholder="Raccontaci brevemente il tuo obiettivo..."
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-magenta-600 via-viola-600 to-blu-600 hover:from-magenta-700 hover:via-viola-700 hover:to-blu-700 text-white py-6 text-xl md:text-2xl font-black rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl border-4 border-white/30"
              >
                {isSubmitting ? "⏳ INVIO IN CORSO..." : "🚀 PRENOTA ORA LA TUA TRASFORMAZIONE GRATUITA"}
              </Button>

              <p className="text-center text-sm text-gray-400 font-semibold">
                Ti ricontatteremo entro <span className="text-magenta-400 font-bold">2 ORE</span> per confermare il tuo
                appuntamento
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LandingForm;
