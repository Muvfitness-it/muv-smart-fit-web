
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Dumbbell, Heart, Zap, Users, Target } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Servizi = () => {
  const [obiettivo, setObiettivo] = useState("");
  const [tempo, setTempo] = useState("");
  const [generatedWorkout, setGeneratedWorkout] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const servizi = [
    {
      icon: <Dumbbell className="w-12 h-12 text-pink-600 mb-4" />,
      title: "Personal Training",
      description: "Allenamenti personalizzati one-to-one con i nostri trainer qualificati per raggiungere i tuoi obiettivi specifici."
    },
    {
      icon: <Zap className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Allenamento EMS",
      description: "Tecnologia di elettrostimolazione muscolare per massimizzare i risultati in tempi ridotti."
    },
    {
      icon: <Heart className="w-12 h-12 text-blue-500 mb-4" />,
      title: "Pancafit",
      description: "Metodologia specifica per il trattamento del mal di schiena e il riequilibrio posturale."
    },
    {
      icon: <Users className="w-12 h-12 text-pink-600 mb-4" />,
      title: "Small Group Training",
      description: "Allenamenti in piccoli gruppi per unire motivazione sociale ed attenzione personalizzata."
    },
    {
      icon: <Target className="w-12 h-12 text-purple-500 mb-4" />,
      title: "Consulenza Nutrizionale",
      description: "Piani alimentari personalizzati studiati in base ai tuoi obiettivi e stile di vita."
    }
  ];

  const generateWorkout = async () => {
    if (!obiettivo || !tempo) {
      toast({
        title: "Attenzione",
        description: "Seleziona sia l'obiettivo che il tempo per generare il tuo allenamento.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI generation with mock data including video demonstrations
    setTimeout(() => {
      const mockWorkout = {
        title: `Allenamento ${obiettivo} - ${tempo} minuti`,
        description: `Un programma intensivo di ${tempo} minuti specificamente progettato per il ${obiettivo.toLowerCase()}.`,
        exercises: [
          {
            name: "Squat",
            details: "3 serie da 12 ripetizioni",
            description: "Posiziona i piedi alla larghezza delle spalle e scendi come se ti stessi sedendo su una sedia.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          },
          {
            name: "Push-up",
            details: "3 serie da 10 ripetizioni",
            description: "Mantieni il corpo dritto, scendi fino a toccare il pavimento con il petto.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          },
          {
            name: "Plank",
            details: "3 serie da 30 secondi",
            description: "Mantieni il corpo dritto come una tavola, contraendo addominali e glutei.",
            videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          }
        ]
      };
      
      setGeneratedWorkout(mockWorkout);
      setIsGenerating(false);
      
      toast({
        title: "Successo!",
        description: "Il tuo allenamento personalizzato è stato generato.",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              UN SERVIZIO PER OGNI{" "}
              <span className="text-pink-600">ESIGENZA</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Scopri tutti i nostri percorsi, studiati per garantirti la massima efficacia e un supporto costante.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {servizi.map((servizio, index) => (
              <Card key={index} className="bg-gray-800 border-gray-700 hover:border-pink-600 transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center">{servizio.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-4">{servizio.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{servizio.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* AI Workout Generator */}
      <section className="py-20 px-4 bg-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-pink-600 mr-3" />
              <h2 className="text-4xl font-bold">Generatore di Idee per il Tuo Allenamento</h2>
            </div>
            <p className="text-lg text-gray-300">
              Lascia che l'intelligenza artificiale crei un allenamento personalizzato per te!
            </p>
          </div>

          <Card className="bg-gray-700 border-gray-600">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Obiettivo</label>
                  <Select value={obiettivo} onValueChange={setObiettivo}>
                    <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                      <SelectValue placeholder="Seleziona il tuo obiettivo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-600 border-gray-500">
                      <SelectItem value="Dimagrimento">Dimagrimento</SelectItem>
                      <SelectItem value="Tonificazione">Tonificazione</SelectItem>
                      <SelectItem value="Benessere">Benessere</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Tempo disponibile</label>
                  <Select value={tempo} onValueChange={setTempo}>
                    <SelectTrigger className="bg-gray-600 border-gray-500 text-white">
                      <SelectValue placeholder="Seleziona la durata" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-600 border-gray-500">
                      <SelectItem value="20">20 minuti</SelectItem>
                      <SelectItem value="40">40 minuti</SelectItem>
                      <SelectItem value="60">60 minuti</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="text-center">
                <Button 
                  onClick={generateWorkout}
                  disabled={isGenerating}
                  className="bg-gradient-to-r from-pink-600 via-purple-500 to-blue-500 hover:from-pink-700 hover:via-purple-600 hover:to-blue-600 text-white px-8 py-4 text-lg rounded-full transition-all duration-300 transform hover:scale-105"
                >
                  {isGenerating ? "Generando..." : "Genera Idea"}
                </Button>
              </div>

              {generatedWorkout && (
                <div className="mt-8 p-6 bg-gray-600 rounded-lg">
                  <h3 className="text-2xl font-bold text-pink-600 mb-4">{generatedWorkout.title}</h3>
                  <p className="text-gray-300 mb-6">{generatedWorkout.description}</p>
                  
                  <div className="space-y-6">
                    <h4 className="text-xl font-semibold text-white">Esercizi:</h4>
                    {generatedWorkout.exercises.map((exercise, index) => (
                      <div key={index} className="bg-gray-700 p-6 rounded-lg">
                        <div className="grid md:grid-cols-2 gap-6">
                          {/* Exercise Details */}
                          <div>
                            <h5 className="text-lg font-bold text-white mb-2">{exercise.name}</h5>
                            <p className="text-pink-400 font-semibold mb-3">{exercise.details}</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{exercise.description}</p>
                          </div>
                          
                          {/* Video Demonstration */}
                          <div className="flex justify-center">
                            <div className="w-full max-w-sm">
                              <video
                                className="w-full h-48 object-cover rounded-lg border-2 border-pink-600"
                                autoPlay
                                loop
                                muted
                                playsInline
                                controls
                              >
                                <source src={exercise.videoUrl} type="video/mp4" />
                                <div className="flex items-center justify-center h-48 bg-gray-800 rounded-lg">
                                  <p className="text-gray-400">Video non disponibile</p>
                                </div>
                              </video>
                              <p className="text-xs text-gray-400 mt-2 text-center">
                                Video dimostrativo dell'esecuzione corretta
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Servizi;
