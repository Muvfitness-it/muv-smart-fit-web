
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
    
    // Expanded exercise database with images
    const allExercises = [
      {
        name: "Squat",
        details: "3 serie da 12 ripetizioni",
        description: "Posiziona i piedi alla larghezza delle spalle e scendi come se ti stessi sedendo su una sedia.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      },
      {
        name: "Push-up",
        details: "3 serie da 10 ripetizioni",
        description: "Mantieni il corpo dritto, scendi fino a toccare il pavimento con il petto.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      },
      {
        name: "Plank",
        details: "3 serie da 30 secondi",
        description: "Mantieni il corpo dritto come una tavola, contraendo addominali e glutei.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      },
      {
        name: "Burpees",
        details: "3 serie da 8 ripetizioni",
        description: "Movimento completo: squat, plank, push-up, salto. Esercizio total body ad alta intensità.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      },
      {
        name: "Mountain Climbers",
        details: "3 serie da 20 ripetizioni",
        description: "In posizione plank, porta alternativamente le ginocchia al petto rapidamente.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      },
      {
        name: "Jumping Jacks",
        details: "3 serie da 30 secondi",
        description: "Saltelli aprendo e chiudendo gambe e braccia simultaneamente.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      },
      {
        name: "Lunges",
        details: "3 serie da 10 per gamba",
        description: "Affondo alternato in avanti, mantenendo il busto eretto e scendendo con il ginocchio.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      },
      {
        name: "Crunch",
        details: "3 serie da 15 ripetizioni",
        description: "Sdraiato supino, solleva le spalle contraendo gli addominali.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      },
      {
        name: "Russian Twists",
        details: "3 serie da 20 ripetizioni",
        description: "Seduto con gambe sollevate, ruota il busto a destra e sinistra.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      },
      {
        name: "High Knees",
        details: "3 serie da 30 secondi",
        description: "Corsa sul posto portando le ginocchia verso l'alto il più possibile.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      },
      {
        name: "Wall Sit",
        details: "3 serie da 45 secondi",
        description: "Schiena contro il muro, scivola fino a formare un angolo di 90° con le gambe.",
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop"
      },
      {
        name: "Dead Bug",
        details: "3 serie da 8 per lato",
        description: "Sdraiato supino, estendi alternativamente braccio e gamba opposti.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=300&fit=crop"
      }
    ];

    // Select exercises based on objective and time
    let selectedExercises = [];
    const exerciseCount = tempo === "20" ? 4 : tempo === "40" ? 6 : 8;
    
    if (obiettivo === "Dimagrimento") {
      const cardioExercises = allExercises.filter(ex => 
        ["Burpees", "Mountain Climbers", "Jumping Jacks", "High Knees"].includes(ex.name)
      );
      const strengthExercises = allExercises.filter(ex => 
        ["Squat", "Push-up", "Lunges"].includes(ex.name)
      );
      selectedExercises = [...cardioExercises.slice(0, Math.ceil(exerciseCount/2)), ...strengthExercises.slice(0, Math.floor(exerciseCount/2))];
    } else if (obiettivo === "Tonificazione") {
      const toneExercises = allExercises.filter(ex => 
        ["Squat", "Push-up", "Lunges", "Plank", "Crunch", "Russian Twists", "Wall Sit"].includes(ex.name)
      );
      selectedExercises = toneExercises.slice(0, exerciseCount);
    } else if (obiettivo === "Benessere") {
      const wellnessExercises = allExercises.filter(ex => 
        ["Plank", "Wall Sit", "Dead Bug", "Lunges", "Crunch"].includes(ex.name)
      );
      selectedExercises = wellnessExercises.slice(0, exerciseCount);
    }

    // Fallback to random selection if not enough exercises
    if (selectedExercises.length < exerciseCount) {
      const remaining = allExercises.filter(ex => !selectedExercises.includes(ex));
      selectedExercises = [...selectedExercises, ...remaining.slice(0, exerciseCount - selectedExercises.length)];
    }

    setTimeout(() => {
      const mockWorkout = {
        title: `Allenamento ${obiettivo} - ${tempo} minuti`,
        description: `Un programma intensivo di ${tempo} minuti specificamente progettato per il ${obiettivo.toLowerCase()}.`,
        exercises: selectedExercises.slice(0, exerciseCount)
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
                          
                          {/* Exercise Image */}
                          <div className="flex justify-center">
                            <div className="w-full max-w-sm">
                              <img
                                src={exercise.imageUrl}
                                alt={`Dimostrazione esercizio ${exercise.name}`}
                                className="w-full h-48 object-cover rounded-lg border-2 border-pink-600"
                                onError={(e) => {
                                  // Fix: Cast e.currentTarget as HTMLImageElement to access src property
                                  const imgElement = e.currentTarget as HTMLImageElement;
                                  imgElement.src = "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop";
                                }}
                              />
                              <p className="text-xs text-gray-400 mt-2 text-center">
                                Immagine dimostrativa dell'esercizio
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
