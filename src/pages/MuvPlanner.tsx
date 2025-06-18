import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  BrainCircuit, 
  Loader2, 
  AlertTriangle, 
  Target, 
  Apple, 
  Sandwich, 
  Soup, 
  Utensils, 
  ChevronRight, 
  Sparkles, 
  ShoppingCart, 
  FileDown, 
  Bot, 
  ArrowLeft 
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

declare global {
  interface Window {
    jsPDF: any;
    html2canvas: any;
  }
}

interface FormData {
  gender: string;
  age: number;
  weight: number;
  height: number;
  activityLevel: number;
  goal: string;
}

interface MealData {
  descrizione: string;
  alimenti: string[];
  kcal: number;
}

interface MealPlan {
  colazione: MealData;
  spuntino_mattutino: MealData;
  pranzo: MealData;
  spuntino_pomeridiano: MealData;
  cena: MealData;
}

interface ShoppingItem {
  categoria: string;
  nome: string;
  quantita: string;
  costo_calcolato_eur: number;
}

interface ShoppingListData {
  lista_spesa: ShoppingItem[];
  totale_calcolato_eur: number;
}

const MuvPlanner = () => {
  const [currentView, setCurrentView] = useState<'calculator' | 'mealPlan' | 'shoppingList'>('calculator');
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    age: 30,
    weight: 70,
    height: 175,
    activityLevel: 1.375,
    goal: 'maintain'
  });
  const [mealPlanData, setMealPlanData] = useState<{ calories: number; plan: MealPlan } | null>(null);
  const [shoppingListData, setShoppingListData] = useState<ShoppingListData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShoppingLoading, setIsShoppingLoading] = useState(false);
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [coachQuestion, setCoachQuestion] = useState('');
  const [coachResponse, setCoachResponse] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Load PDF libraries
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  const callGeminiAPI = async (payload: any) => {
    const apiKey = ""; // API key would need to be provided
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error(`Errore API: ${response.statusText}`);
    }

    return response.json();
  };

  const generateMealPlan = async (targetCalories: number) => {
    setIsLoading(true);
    setError('');

    try {
      // Create varied meal plans based on user profile
      const mealVariations = generateMealVariations(targetCalories, formData);
      const randomPlan = selectRandomMealPlan(mealVariations);
      
      setMealPlanData({ calories: targetCalories, plan: randomPlan });
      setCurrentView('mealPlan');
      toast({ title: "Piano alimentare generato!", description: "Il tuo piano personalizzato è pronto." });
    } catch (err: any) {
      setError(err.message || 'Errore nella generazione del piano');
      toast({ title: "Errore", description: "Si è verificato un errore nella generazione del piano", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const generateMealVariations = (calories: number, userData: FormData) => {
    const { activityLevel, goal } = userData;
    
    // Base meal templates by activity level
    const lowActivityMeals = {
      colazione: [
        { descrizione: "Colazione leggera e bilanciata", alimenti: ["1 yogurt greco", "30g cereali integrali", "1 cucchiaino miele", "150ml latte"], kcal: 320 },
        { descrizione: "Colazione proteica semplice", alimenti: ["2 uova strapazzate", "1 fetta pane integrale", "1 arancia"], kcal: 350 },
        { descrizione: "Colazione vegetale", alimenti: ["1 smoothie verde", "30g avena", "1 banana", "200ml latte vegetale"], kcal: 340 }
      ],
      spuntino_mattutino: [
        { descrizione: "Spuntino energetico", alimenti: ["1 mela", "15g mandorle"], kcal: 150 },
        { descrizione: "Break proteico", alimenti: ["1 yogurt magro", "1 cucchiaino semi di chia"], kcal: 120 },
        { descrizione: "Snack bilanciato", alimenti: ["2 crackers integrali", "20g ricotta"], kcal: 140 }
      ],
      pranzo: [
        { descrizione: "Pranzo equilibrato", alimenti: ["100g petto di pollo", "60g riso integrale", "Verdure miste", "1 cucchiaio olio EVO"], kcal: 420 },
        { descrizione: "Pranzo mediterraneo", alimenti: ["120g pesce bianco", "50g quinoa", "Insalata mista", "1 cucchiaio olio EVO"], kcal: 400 },
        { descrizione: "Pranzo vegetariano", alimenti: ["80g legumi", "60g pasta integrale", "Verdure saltate", "1 cucchiaio olio EVO"], kcal: 450 }
      ],
      spuntino_pomeridiano: [
        { descrizione: "Merenda nutriente", alimenti: ["1 frutto di stagione", "10g noci"], kcal: 130 },
        { descrizione: "Snack proteico", alimenti: ["1 bicchiere latte", "5g cioccolato fondente"], kcal: 160 },
        { descrizione: "Break energetico", alimenti: ["1 fetta biscottata integrale", "1 cucchiaino marmellata"], kcal: 100 }
      ],
      cena: [
        { descrizione: "Cena leggera", alimenti: ["100g ricotta", "Verdure al vapore", "30g pane integrale"], kcal: 280 },
        { descrizione: "Cena proteica", alimenti: ["120g pesce", "Insalata verde", "1 cucchiaio olio EVO"], kcal: 300 },
        { descrizione: "Cena bilanciata", alimenti: ["2 uova", "Verdure grigliate", "20g parmigiano"], kcal: 320 }
      ]
    };

    const moderateActivityMeals = {
      colazione: [
        { descrizione: "Colazione energetica per l'allenamento", alimenti: ["2 uova strapazzate", "2 fette pane integrale", "1 avocado medio", "200ml latte"], kcal: 520 },
        { descrizione: "Power breakfast", alimenti: ["50g avena", "1 banana", "30g proteine in polvere", "250ml latte"], kcal: 480 },
        { descrizione: "Colazione del runner", alimenti: ["3 pancakes integrali", "2 cucchiai sciroppo acero", "150g frutti di bosco"], kcal: 450 }
      ],
      spuntino_mattutino: [
        { descrizione: "Pre-workout snack", alimenti: ["1 banana", "20g burro di arachidi"], kcal: 200 },
        { descrizione: "Energy boost", alimenti: ["1 barretta energetica", "10g mandorle"], kcal: 180 },
        { descrizione: "Shake proteico", alimenti: ["250ml latte", "20g proteine whey"], kcal: 220 }
      ],
      pranzo: [
        { descrizione: "Pranzo completo post-workout", alimenti: ["150g petto di pollo", "80g riso integrale", "Verdure miste", "1 cucchiaio olio EVO"], kcal: 500 },
        { descrizione: "Power lunch", alimenti: ["150g salmone", "70g quinoa", "Avocado", "Verdure fresche"], kcal: 520 },
        { descrizione: "Pranzo atleta", alimenti: ["120g manzo magro", "100g patate dolci", "Broccoli", "1 cucchiaio olio EVO"], kcal: 480 }
      ],
      spuntino_pomeridiano: [
        { descrizione: "Recovery snack", alimenti: ["1 yogurt greco", "30g granola", "Frutti di bosco"], kcal: 250 },
        { descrizione: "Post-workout", alimenti: ["1 shake proteico", "1 banana"], kcal: 280 },
        { descrizione: "Energia sostenuta", alimenti: ["2 fette biscottate", "30g hummus", "Verdure crude"], kcal: 200 }
      ],
      cena: [
        { descrizione: "Cena riparativa", alimenti: ["120g salmone", "Verdure al vapore", "50g quinoa"], kcal: 400 },
        { descrizione: "Dinner time", alimenti: ["150g tacchino", "Insalata mista", "40g pane integrale"], kcal: 380 },
        { descrizione: "Cena proteica", alimenti: ["100g tofu", "Verdure saltate", "60g riso basmati"], kcal: 420 }
      ]
    };

    const highActivityMeals = {
      colazione: [
        { descrizione: "Colazione da atleta", alimenti: ["3 uova strapazzate", "2 fette pane integrale", "1 avocado", "250ml latte", "1 banana"], kcal: 650 },
        { descrizione: "High energy breakfast", alimenti: ["80g avena", "2 banane", "40g proteine in polvere", "300ml latte", "30g noci"], kcal: 720 },
        { descrizione: "Champion breakfast", alimenti: ["4 pancakes proteici", "3 cucchiai sciroppo", "200g frutti di bosco", "200ml latte"], kcal: 680 }
      ],
      spuntino_mattutino: [
        { descrizione: "Power snack", alimenti: ["2 banane", "30g burro di arachidi", "250ml latte"], kcal: 350 },
        { descrizione: "Energy bomb", alimenti: ["2 barrette energetiche", "20g mandorle"], kcal: 320 },
        { descrizione: "Pre-training fuel", alimenti: ["300ml shake proteico", "1 mela", "15g miele"], kcal: 380 }
      ],
      pranzo: [
        { descrizione: "Pranzo da campione", alimenti: ["200g petto di pollo", "100g riso integrale", "Verdure miste", "2 cucchiai olio EVO"], kcal: 650 },
        { descrizione: "Athlete lunch", alimenti: ["180g salmone", "80g pasta integrale", "Avocado", "Verdure fresche", "Noci"], kcal: 700 },
        { descrizione: "High performance meal", alimenti: ["150g manzo magro", "120g patate dolci", "Verdure", "1 cucchiaio olio EVO"], kcal: 600 }
      ],
      spuntino_pomeridiano: [
        { descrizione: "Recovery power", alimenti: ["2 yogurt greci", "50g granola", "Frutti di bosco", "Miele"], kcal: 400 },
        { descrizione: "Post-workout max", alimenti: ["400ml shake proteico", "2 banane", "Avena"], kcal: 450 },
        { descrizione: "Sustained energy", alimenti: ["4 fette biscottate", "50g hummus", "Verdure", "20g noci"], kcal: 380 }
      ],
      cena: [
        { descrizione: "Cena ricostruttiva", alimenti: ["150g salmone", "Verdure al vapore", "80g quinoa", "Avocado"], kcal: 500 },
        { descrizione: "High protein dinner", alimenti: ["200g tacchino", "Insalata mista", "60g pane integrale", "Olive"], kcal: 480 },
        { descrizione: "Recovery dinner", alimenti: ["120g tofu", "Verdure saltate", "80g riso basmati", "Semi"], kcal: 520 }
      ]
    };

    // Select meal set based on activity level
    let baseMeals;
    if (activityLevel <= 1.375) baseMeals = lowActivityMeals;
    else if (activityLevel <= 1.55) baseMeals = moderateActivityMeals;
    else baseMeals = highActivityMeals;

    // Adjust calories based on goal
    const adjustMealsForGoal = (meals: any, goal: string) => {
      const adjustment = goal === 'lose' ? 0.9 : goal === 'gain' ? 1.1 : 1;
      
      return Object.keys(meals).reduce((acc, mealType) => {
        acc[mealType] = meals[mealType].map((meal: any) => ({
          ...meal,
          kcal: Math.round(meal.kcal * adjustment)
        }));
        return acc;
      }, {} as any);
    };

    return adjustMealsForGoal(baseMeals, goal);
  };

  const selectRandomMealPlan = (mealVariations: any): MealPlan => {
    const plan: any = {};
    
    Object.keys(mealVariations).forEach(mealType => {
      const options = mealVariations[mealType];
      const randomIndex = Math.floor(Math.random() * options.length);
      plan[mealType] = options[randomIndex];
    });
    
    return plan;
  };

  const generateShoppingList = async () => {
    if (!mealPlanData) return;
    
    setIsShoppingLoading(true);
    
    try {
      // Enhanced mock shopping list with proportional costs
      const mockShoppingList: ShoppingListData = {
        lista_spesa: [
          { categoria: "Proteine", nome: "Uova", quantita: "2 pz", costo_calcolato_eur: 0.58 },
          { categoria: "Proteine", nome: "Petto di pollo", quantita: "150g", costo_calcolato_eur: 4.00 },
          { categoria: "Proteine", nome: "Salmone fresco", quantita: "120g", costo_calcolato_eur: 5.76 },
          { categoria: "Proteine", nome: "Yogurt greco", quantita: "1 vasetto (170g)", costo_calcolato_eur: 1.35 },
          { categoria: "Carboidrati", nome: "Pane integrale", quantita: "2 fette (60g)", costo_calcolato_eur: 0.30 },
          { categoria: "Carboidrati", nome: "Riso integrale", quantita: "80g secco", costo_calcolato_eur: 0.32 },
          { categoria: "Carboidrati", nome: "Quinoa", quantita: "50g secco", costo_calcolato_eur: 0.75 },
          { categoria: "Frutta e Verdura", nome: "Avocado", quantita: "1 medio", costo_calcolato_eur: 2.00 },
          { categoria: "Frutta e Verdura", nome: "Banana", quantita: "1 pz", costo_calcolato_eur: 0.25 },
          { categoria: "Frutta e Verdura", nome: "Mela", quantita: "1 pz", costo_calcolato_eur: 0.30 },
          { categoria: "Frutta e Verdura", nome: "Verdure miste", quantita: "200g", costo_calcolato_eur: 1.20 },
          { categoria: "Frutta e Verdura", nome: "Verdure al vapore", quantita: "150g", costo_calcolato_eur: 0.90 },
          { categoria: "Latticini", nome: "Latte", quantita: "250ml", costo_calcolato_eur: 0.35 },
          { categoria: "Grassi e Condimenti", nome: "Olio EVO", quantita: "1 cucchiaio (10ml)", costo_calcolato_eur: 0.15 },
          { categoria: "Frutta Secca", nome: "Mandorle", quantita: "30g", costo_calcolato_eur: 1.20 },
          { categoria: "Frutta Secca", nome: "Burro di arachidi", quantita: "20g", costo_calcolato_eur: 0.40 }
        ],
        totale_calcolato_eur: 19.81
      };

      setShoppingListData(mockShoppingList);
      setCurrentView('shoppingList');
      toast({ title: "Lista spesa creata!", description: "Costi calcolati in quota parte per le quantità effettive." });
    } catch (err: any) {
      toast({ title: "Errore", description: "Errore nella creazione della lista spesa", variant: "destructive" });
    } finally {
      setIsShoppingLoading(false);
    }
  };

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachQuestion.trim()) return;

    setIsCoachLoading(true);
    
    try {
      // Mock coach response
      const mockResponse = "Ottima domanda! Il timing delle proteine è importante per massimizzare la sintesi proteica. Ti consiglio di assumere 20-30g di proteine entro 2 ore dall'allenamento per ottimizzare il recupero muscolare.";
      
      setTimeout(() => {
        setCoachResponse(mockResponse);
        setIsCoachLoading(false);
      }, 1500);
    } catch (err: any) {
      setCoachResponse("Si è verificato un errore nella comunicazione con il coach.");
      setIsCoachLoading(false);
    }
  };

  const exportToPDF = (elementId: string, fileName: string) => {
    if (!window.jsPDF || !window.html2canvas) {
      toast({ title: "Errore", description: "Le risorse per il PDF non sono ancora pronte", variant: "destructive" });
      return;
    }

    const element = document.getElementById(elementId);
    if (!element) return;

    window.html2canvas(element, { scale: 2, useCORS: true, backgroundColor: '#ffffff' })
      .then((canvas: any) => {
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jsPDF;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const margin = 10;
        const effectiveWidth = pdfWidth - margin * 2;
        const imgWidth = effectiveWidth;
        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
        pdf.save(fileName);
        toast({ title: "PDF esportato!", description: "Il file è stato scaricato con successo." });
      })
      .catch(() => {
        toast({ title: "Errore", description: "Si è verificato un errore durante la creazione del PDF", variant: "destructive" });
      });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formElements = e.currentTarget.elements as HTMLFormControlsCollection;
    const data = {
      gender: (formElements.namedItem('gender') as HTMLSelectElement).value,
      age: parseInt((formElements.namedItem('age') as HTMLInputElement).value),
      weight: parseInt((formElements.namedItem('weight') as HTMLInputElement).value),
      height: parseInt((formElements.namedItem('height') as HTMLInputElement).value),
      activityLevel: parseFloat((formElements.namedItem('activityLevel') as HTMLSelectElement).value),
      goal: (formElements.namedItem('goal') as HTMLSelectElement).value
    };

    setFormData(data);

    // Calculate BMR and TDEE
    let bmr = (data.gender === 'male') 
      ? (10 * data.weight + 6.25 * data.height - 5 * data.age + 5)
      : (10 * data.weight + 6.25 * data.height - 5 * data.age - 161);
    
    const tdee = bmr * data.activityLevel;
    
    let finalCalories;
    switch (data.goal) {
      case 'lose': finalCalories = tdee - 400; break;
      case 'gain': finalCalories = tdee + 400; break;
      default: finalCalories = tdee; break;
    }

    generateMealPlan(Math.round(finalCalories));
  };

  const mealIcons = {
    colazione: Apple,
    spuntino_mattutino: Sandwich,
    pranzo: Soup,
    spuntino_pomeridiano: Sandwich,
    cena: Utensils
  };

  const formatMealName = (name: string) => 
    name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

  return (
    <div className="min-h-screen bg-gray-900 text-white" style={{
      backgroundImage: 'radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)'
    }}>
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">MUV</span>
            <span className="text-green-400">.</span>
            <span className="text-white">Planner</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
        </header>

        {/* Calculator View */}
        {currentView === 'calculator' && (
          <div className="max-w-2xl mx-auto">
            <Card className="bg-white/10 backdrop-blur-lg border-white/20">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Sesso</label>
                      <select 
                        name="gender" 
                        defaultValue="male"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
                      >
                        <option value="male">Uomo</option>
                        <option value="female">Donna</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Età (anni)</label>
                      <input 
                        type="number" 
                        name="age" 
                        defaultValue="30"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" 
                        min="15" 
                        max="100" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Peso (kg)</label>
                      <input 
                        type="number" 
                        name="weight" 
                        defaultValue="70"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" 
                        min="30" 
                        max="200" 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">Altezza (cm)</label>
                      <input 
                        type="number" 
                        name="height" 
                        defaultValue="175"
                        className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" 
                        min="100" 
                        max="250" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Livello di attività fisica</label>
                    <select 
                      name="activityLevel"
                      defaultValue="1.375"
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
                    >
                      <option value="1.2">Sedentario</option>
                      <option value="1.375">Leggermente attivo</option>
                      <option value="1.55">Moderatamente attivo</option>
                      <option value="1.725">Molto attivo</option>
                      <option value="1.9">Estremamente attivo</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">Il tuo obiettivo</label>
                    <select 
                      name="goal"
                      defaultValue="maintain"
                      className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
                    >
                      <option value="lose">Definizione / Perdita peso</option>
                      <option value="maintain">Mantenimento</option>
                      <option value="gain">Aumento massa muscolare</option>
                    </select>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-4"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Elaborazione...
                      </>
                    ) : (
                      <>
                        <BrainCircuit className="mr-2 h-4 w-4" />
                        Crea Piano Nutrizionale
                      </>
                    )}
                  </Button>
                  {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start">
                      <AlertTriangle className="mr-3 mt-1 h-5 w-5" />
                      <span>{error}</span>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Meal Plan View */}
        {currentView === 'mealPlan' && mealPlanData && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 backdrop-blur-lg border-white/20">
              <div id="meal-plan-export" className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <p className="text-gray-300">Piano nutrizionale di esempio</p>
                  <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
                    <Target className="w-10 h-10" />
                    <span>{mealPlanData.calories} kcal</span>
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Obiettivo: {formData.goal === 'lose' ? 'Definizione' : formData.goal === 'gain' ? 'Aumento massa' : 'Mantenimento'}
                  </p>
                </div>
                <div className="space-y-6">
                  {Object.entries(mealPlanData.plan).map(([mealName, mealData]) => {
                    const IconComponent = mealIcons[mealName as keyof typeof mealIcons];
                    return (
                      <div key={mealName} className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
                        <div className="flex items-start mb-3">
                          <div className="pt-1 text-green-400 w-8 h-8">
                            <IconComponent className="w-6 h-6" />
                          </div>
                          <div className="ml-4 flex-grow">
                            <div className="flex justify-between items-baseline">
                              <h3 className="text-xl font-bold text-green-300">
                                {formatMealName(mealName)}
                              </h3>
                              <span className="text-lg font-bold text-green-400">
                                ~{mealData.kcal} kcal
                              </span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1">{mealData.descrizione}</p>
                          </div>
                        </div>
                        <ul className="space-y-2 pl-2">
                          {mealData.alimenti.map((item, index) => (
                            <li key={index} className="flex items-start">
                              <ChevronRight className="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="p-6 md:p-8 pt-0">
                <div className="mt-8 pt-6 border-t border-white/10 space-y-6">
                  <h3 className="text-2xl font-bold text-center text-green-300 flex items-center justify-center gap-2">
                    <Sparkles className="w-6 h-6" />
                    Funzioni IA Avanzate
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={generateShoppingList}
                      disabled={isShoppingLoading}
                      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4"
                    >
                      {isShoppingLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creando...
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Lista Spesa
                        </>
                      )}
                    </Button>
                    <Button 
                      onClick={() => exportToPDF('meal-plan-export', 'piano_alimentare_muv.pdf')}
                      className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4"
                    >
                      <FileDown className="mr-2 h-4 w-4" />
                      Esporta PDF
                    </Button>
                  </div>
                  <div className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
                    <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-300">
                      <Bot className="w-5 h-5" />
                      Chiedi al Coach Esperto
                    </h4>
                    <form onSubmit={handleAskCoach} className="space-y-4">
                      <input 
                        type="text" 
                        value={coachQuestion}
                        onChange={(e) => setCoachQuestion(e.target.value)}
                        placeholder="Es: Qual è il timing migliore per le proteine?" 
                        className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" 
                      />
                      <Button 
                        type="submit" 
                        disabled={isCoachLoading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4"
                      >
                        {isCoachLoading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            In attesa...
                          </>
                        ) : (
                          <>
                            <Sparkles className="mr-2 h-4 w-4" />
                            Invia Domanda
                          </>
                        )}
                      </Button>
                    </form>
                    {coachResponse && (
                      <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200 text-sm">
                        {coachResponse}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-8 text-center text-xs text-gray-500">
                  <p>Questo piano alimentare è un esempio generato da un'IA e non sostituisce una consulenza medica personalizzata.</p>
                </div>
                <Button 
                  onClick={() => {
                    setCurrentView('calculator');
                    setMealPlanData(null);
                    setShoppingListData(null);
                    setError('');
                    setCoachResponse('');
                  }}
                  className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4"
                >
                  Nuovo Calcolo
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Shopping List View */}
        {currentView === 'shoppingList' && shoppingListData && (
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-900/50 backdrop-blur-lg border-white/20">
              <div id="shopping-list-export" className="p-6 md:p-8">
                <div className="text-center mb-8">
                  <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
                    <ShoppingCart className="w-10 h-10" />
                    <span>Lista della Spesa</span>
                  </h2>
                  <p className="text-gray-400 mt-1">Costi calcolati in quota parte per le quantità effettive del piano giornaliero.</p>
                </div>
                <div className="space-y-6">
                  {Object.entries(
                    shoppingListData.lista_spesa.reduce((acc, item) => {
                      const category = item.categoria || 'Varie';
                      if (!acc[category]) acc[category] = [];
                      acc[category].push(item);
                      return acc;
                    }, {} as Record<string, ShoppingItem[]>)
                  ).map(([category, items]) => (
                    <div key={category}>
                      <h3 className="font-bold text-lg text-green-400 border-b-2 border-green-500/30 pb-1 mb-3">
                        {category}
                      </h3>
                      <div className="space-y-2">
                        <div className="grid grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)] gap-x-4 text-sm font-semibold text-gray-400 px-2 py-1">
                          <div className="text-left">Articolo</div>
                          <div className="text-center">Quantità</div>
                          <div className="text-right">Costo</div>
                        </div>
                        {items.map((item, index) => (
                          <div key={index} className="grid grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)] gap-x-4 items-center text-gray-300 border-b border-gray-700/50 py-2 px-2">
                            <span className="text-left break-words pr-2">{item.nome}</span>
                            <span className="text-center text-gray-400">{item.quantita}</span>
                            <span className="text-right font-mono text-green-400">€ {item.costo_calcolato_eur.toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t-2 border-green-500/50">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-green-300">Totale Giornaliero:</span>
                    <span className="text-green-300">€ {shoppingListData.totale_calcolato_eur.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2 text-right">
                    Costi calcolati in quota parte per le quantità effettive necessarie.
                  </p>
                </div>
              </div>
              <div className="p-6 md:p-8 pt-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button 
                    onClick={() => setCurrentView('mealPlan')}
                    className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Torna al Piano
                  </Button>
                  <Button 
                    onClick={() => exportToPDF('shopping-list-export', 'lista_spesa_muv.pdf')}
                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4"
                  >
                    <FileDown className="mr-2 h-4 w-4" />
                    Esporta PDF
                  </Button>
                </div>
                <Button 
                  onClick={() => {
                    setCurrentView('calculator');
                    setMealPlanData(null);
                    setShoppingListData(null);
                    setError('');
                    setCoachResponse('');
                  }}
                  className="w-full mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4"
                >
                  Nuovo Calcolo
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default MuvPlanner;
