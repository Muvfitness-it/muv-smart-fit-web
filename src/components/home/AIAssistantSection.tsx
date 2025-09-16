import React, { useState } from 'react';
import { MessageCircle, Sparkles, Zap, Heart, Target } from 'lucide-react';
import AIAssistantModal from "../ai/AIAssistantModal";

const AIAssistantSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleQuickQuestion = (question: string) => {
    setIsModalOpen(true);
  };

  const quickQuestions = [
    {
      icon: <Heart className="w-5 h-5" />,
      question: "Ho il mal di schiena, come posso risolvere?",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: <Target className="w-5 h-5" />,
      question: "Voglio dimagrire, che servizi hai?",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="w-5 h-5" />,
      question: "Ho poco tempo, cosa consigli?",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <>
      <section className="py-20 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-brand-primary/10 to-brand-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-gradient-to-l from-brand-accent/10 to-brand-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-primary/20 to-brand-secondary/20 border border-brand-primary/30 rounded-full px-6 py-3 mb-6">
              <Sparkles className="w-5 h-5 text-brand-accent animate-pulse" />
              <span className="text-brand-accent font-bold text-sm uppercase tracking-wider">
                Assistente Virtuale MUV
              </span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 text-white leading-tight">
              Scopri cosa possiamo 
              <span className="block bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent bg-clip-text text-transparent">
                fare per te
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Il nostro Assistente Virtuale ti aiuta a trovare la soluzione perfetta per i tuoi obiettivi fitness
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Interactive */}
            <div className="space-y-8">
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-full flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Assistente Intelligente</h3>
                    <p className="text-gray-400">Risposte immediate e personalizzate</p>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  {quickQuestions.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(item.question)}
                      className={`w-full text-left p-4 rounded-2xl bg-gradient-to-r ${item.color} hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl group`}
                    >
                      <div className="flex items-center gap-3 text-white">
                        <div className="bg-white/20 rounded-lg p-2 group-hover:bg-white/30 transition-colors">
                          {item.icon}
                        </div>
                        <span className="font-medium">{item.question}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent hover:from-brand-primary/90 hover:via-brand-secondary/90 hover:to-brand-accent/90 text-black font-black py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                  💬 Inizia Chat Personalizzata
                </button>
              </div>
            </div>

            {/* Right side - Benefits */}
            <div className="space-y-6">
              <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Soluzioni Personalizzate</h4>
                    <p className="text-gray-300">Analizza i tuoi problemi specifici e ti suggerisce i servizi MUV più adatti</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Consigli Immediati</h4>
                    <p className="text-gray-300">Risposte istantanee su EMS, Pilates, Personal Training e tutti i nostri servizi</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/30 border border-gray-700/30 rounded-2xl p-6 hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Heart className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">Ti Guida al Contatto</h4>
                    <p className="text-gray-300">Quando è il momento giusto, ti accompagna al modulo contatti per una consulenza gratuita</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AIAssistantModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default AIAssistantSection;