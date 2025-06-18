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
    
    // Expanded meal templates with more nutritious variety
    const lowActivityMeals = {
      colazione: [
        { descrizione: "Colazione proteica classica", alimenti: ["2 uova strapazzate", "1 fetta pane integrale", "1 avocado piccolo", "200ml latte parzialmente scremato"], kcal: 420 },
        { descrizione: "Bowl energetico mattutino", alimenti: ["150g yogurt greco 0%", "40g avena integrale", "1 banana media", "15g noci", "1 cucchiaino miele"], kcal: 380 },
        { descrizione: "Smoothie proteico verde", alimenti: ["200ml latte di mandorle", "30g proteine whey", "100g spinaci freschi", "1 mela", "1 cucchiaio burro di mandorle"], kcal: 350 },
        { descrizione: "Colazione mediterranea", alimenti: ["50g ricotta", "2 fette pane segale", "150g frutti di bosco", "10g mandorle a lamelle", "tè verde"], kcal: 320 },
        { descrizione: "Pancakes proteici", alimenti: ["2 uova", "1 banana", "30g farina d'avena", "1 cucchiaino olio cocco", "cannella"], kcal: 360 }
      ],
      spuntino_mattutino: [
        { descrizione: "Snack proteico", alimenti: ["1 mela media", "20g mandorle crude"], kcal: 180 },
        { descrizione: "Break energetico", alimenti: ["125g yogurt greco", "1 cucchiaino semi di chia"], kcal: 140 },
        { descrizione: "Frutta secca e semi", alimenti: ["15g noci", "10g semi di girasole", "1 kiwi"], kcal: 160 },
        { descrizione: "Verdure croccanti", alimenti: ["100g carote baby", "20g hummus"], kcal: 120 },
        { descrizione: "Snack equilibrato", alimenti: ["1 pera", "10g burro di arachidi naturale"], kcal: 150 }
      ],
      pranzo: [
        { descrizione: "Pranzo proteico bilanciato", alimenti: ["120g petto di pollo", "80g quinoa cotta", "150g broccoli al vapore", "1 cucchiaio olio EVO"], kcal: 480 },
        { descrizione: "Pesce e verdure", alimenti: ["150g salmone alla griglia", "100g patate dolci", "200g zucchine grigliate", "10g semi di lino"], kcal: 520 },
        { descrizione: "Pranzo vegetariano", alimenti: ["100g lenticchie rosse", "60g riso integrale", "150g peperoni", "50g feta", "olive nere 10g"], kcal: 450 },
        { descrizione: "Bowl mediterranea", alimenti: ["100g tonno naturale", "80g cous cous integrale", "100g cetrioli", "100g pomodorini", "15g olio EVO"], kcal: 470 },
        { descrizione: "Pasta proteica", alimenti: ["80g pasta legumi", "100g gamberetti", "150g spinaci", "20g parmigiano", "aglio e prezzemolo"], kcal: 440 }
      ],
      spuntino_pomeridiano: [
        { descrizione: "Recovery snack", alimenti: ["1 banana", "15g burro di mandorle"], kcal: 200 },
        { descrizione: "Protein break", alimenti: ["150ml latte", "20g proteine caseine"], kcal: 180 },
        { descrizione: "Frutta e cereali", alimenti: ["150g frutti di bosco", "20g granola integrale"], kcal: 160 },
        { descrizione: "Verdure nutrienti", alimenti: ["150g sedano", "25g tahini"], kcal: 170 },
        { descrizione: "Snack energetico", alimenti: ["2 quadretti cioccolato fondente 85%", "10g anacardi"], kcal: 140 }
      ],
      cena: [
        { descrizione: "Cena leggera proteica", alimenti: ["150g merluzzo", "200g verdure miste al vapore", "50g pane integrale"], kcal: 350 },
        { descrizione: "Cena vegetariana", alimenti: ["100g tofu grigliato", "150g cavolfiore", "30g quinoa", "1 cucchiaio olio EVO"], kcal: 320 },
        { descrizione: "Pesce e insalata", alimenti: ["120g orata", "200g insalata mista", "100g finocchi", "15g olio EVO", "limone"], kcal: 380 },
        { descrizione: "Cena ricca di fibre", alimenti: ["2 uova", "150g asparagi", "50g avocado", "30g pane segale"], kcal: 360 },
        { descrizione: "Proteine e verdure", alimenti: ["100g ricotta magra", "200g zucchine", "20g noci", "erbe aromatiche"], kcal: 340 }
      ]
    };

    const moderateActivityMeals = {
      colazione: [
        { descrizione: "Power breakfast atleta", alimenti: ["3 uova strapazzate", "2 fette pane integrale", "1/2 avocado", "250ml latte", "1 banana"], kcal: 650 },
        { descrizione: "Bowl proteico completo", alimenti: ["200g yogurt greco", "50g avena", "30g proteine whey", "200g frutti di bosco", "20g mandorle"], kcal: 580 },
        { descrizione: "Colazione energetica", alimenti: ["100g fiocchi d'avena", "300ml latte", "1 banana", "20g burro arachidi", "miele 10g"], kcal: 620 },
        { descrizione: "Smoothie potente", alimenti: ["300ml latte mandorle", "40g proteine", "1 mango", "30g avena", "1 cucchiaio olio cocco"], kcal: 560 },
        { descrizione: "Pancakes energetici", alimenti: ["3 uova", "50g farina avena", "1 banana", "20g sciroppo acero", "15g noci"], kcal: 590 }
      ],
      spuntino_mattutino: [
        { descrizione: "Pre-workout fuel", alimenti: ["1 banana grande", "25g burro mandorle", "250ml latte"], kcal: 350 },
        { descrizione: "Energy boost", alimenti: ["40g datteri", "20g mandorle", "1 mela"], kcal: 280 },
        { descrizione: "Protein snack", alimenti: ["200g yogurt greco", "30g granola", "miele 5g"], kcal: 320 },
        { descrizione: "Frutta energetica", alimenti: ["200g ananas", "15g cocco rapé", "10g semi zucca"], kcal: 260 },
        { descrizione: "Bar naturale", alimenti: ["30g mix frutta secca", "150ml latte riso"], kcal: 300 }
      ],
      pranzo: [
        { descrizione: "Pranzo atleta completo", alimenti: ["180g pollo", "100g riso basmati", "150g broccoli", "50g avocado", "1 cucchiaio olio EVO"], kcal: 680 },
        { descrizione: "Salmone e carboidrati", alimenti: ["200g salmone", "120g patate dolci", "200g spinaci", "20g semi di sesamo"], kcal: 720 },
        { descrizione: "Bowl proteico", alimenti: ["150g manzo magro", "80g quinoa", "100g peperoni", "100g zucchine", "olive 15g"], kcal: 650 },
        { descrizione: "Pesce e cereali", alimenti: ["150g tonno fresco", "100g farro", "150g pomodorini", "50g mozzarella", "basilico"], kcal: 640 },
        { descrizione: "Pasta completa", alimenti: ["100g pasta integrale", "120g gamberetti", "200g verdure miste", "30g parmigiano"], kcal: 600 }
      ],
      spuntino_pomeridiano: [
        { descrizione: "Post-workout recovery", alimenti: ["300ml latte cioccolato", "1 banana", "20g proteine"], kcal: 400 },
        { descrizione: "Snack riparativo", alimenti: ["200g yogurt greco", "50g granola", "150g frutti bosco"], kcal: 380 },
        { descrizione: "Mix energetico", alimenti: ["40g mix trail", "1 mela", "200ml latte mandorle"], kcal: 350 },
        { descrizione: "Frutta e proteine", alimenti: ["200g ananas", "30g ricotta", "15g noci pecan"], kcal: 320 },
        { descrizione: "Bar proteico", alimenti: ["1 barretta proteica", "15g mandorle", "1 pera"], kcal: 360 }
      ],
      cena: [
        { descrizione: "Cena ricostruttiva", alimenti: ["150g salmone", "100g quinoa", "200g verdure", "1 cucchiaio olio EVO"], kcal: 520 },
        { descrizione: "Proteine magre", alimenti: ["180g tacchino", "150g verdure grigliate", "60g pane integrale", "avocado 30g"], kcal: 480 },
        { descrizione: "Pesce completo", alimenti: ["150g branzino", "80g riso nero", "200g asparagi", "30g olive", "limone"], kcal: 450 },
        { descrizione: "Cena bilanciata", alimenti: ["120g tofu marinato", "200g verdure wok", "60g noodles soba"], kcal: 420 },
        { descrizione: "Proteine della sera", alimenti: ["150g ricotta", "200g verdure al forno", "30g noci", "erbe"], kcal: 460 }
      ]
    };

    const highActivityMeals = {
      colazione: [
        { descrizione: "Breakfast da campione", alimenti: ["4 uova strapazzate", "3 fette pane integrale", "1 avocado intero", "300ml latte", "2 banane"], kcal: 900 },
        { descrizione: "Super bowl energetico", alimenti: ["250g yogurt greco", "80g avena", "40g proteine", "250g frutti bosco", "30g mandorle", "miele 15g"], kcal: 850 },
        { descrizione: "Pancakes potenti", alimenti: ["4 uova", "80g farina avena", "2 banane", "30g burro arachidi", "sciroppo 20g"], kcal: 880 },
        { descrizione: "Smoothie gigante", alimenti: ["400ml latte", "50g proteine", "2 banane", "50g avena", "20g olio cocco", "spinaci 100g"], kcal: 820 },
        { descrizione: "Colazione completa", alimenti: ["3 uova", "100g salmone affumicato", "2 fette pane", "avocado", "200ml latte"], kcal: 780 }
      ],
      spuntino_mattutino: [
        { descrizione: "Mega snack", alimenti: ["2 banane", "40g burro mandorle", "300ml latte", "20g miele"], kcal: 550 },
        { descrizione: "Energy explosion", alimenti: ["60g datteri", "30g noci miste", "200g ananas"], kcal: 480 },
        { descrizione: "Protein power", alimenti: ["300g yogurt greco", "50g granola", "30g proteine"], kcal: 520 },
        { descrizione: "Pre-training mega", alimenti: ["2 mele", "30g burro arachidi", "250ml latte avena"], kcal: 450 },
        { descrizione: "Frutta energetica", alimenti: ["300g mix frutta tropicale", "25g cocco", "20g semi"], kcal: 420 }
      ],
      pranzo: [
        { descrizione: "Pranzo da atleta elite", alimenti: ["250g pollo", "150g riso basmati", "200g verdure", "1 avocado", "2 cucchiai olio EVO"], kcal: 950 },
        { descrizione: "Power lunch completo", alimenti: ["200g salmone", "150g patate dolci", "200g broccoli", "100g quinoa", "noci 20g"], kcal: 1000 },
        { descrizione: "Mega bowl proteico", alimenti: ["200g manzo magro", "120g riso integrale", "150g verdure miste", "50g avocado", "olive 20g"], kcal: 880 },
        { descrizione: "Pasta power", alimenti: ["150g pasta integrale", "150g gamberetti", "200g verdure", "50g parmigiano", "pinoli 15g"], kcal: 820 },
        { descrizione: "Fish & carbs", alimenti: ["200g tonno", "120g farro", "200g pomodorini", "mozzarella 80g", "basilico"], kcal: 860 }
      ],
      spuntino_pomeridiano: [
        { descrizione: "Recovery explosion", alimenti: ["400ml latte cioccolato", "2 banane", "30g proteine", "avena 20g"], kcal: 600 },
        { descrizione: "Mega snack proteico", alimenti: ["300g yogurt greco", "80g granola", "200g frutti bosco", "miele 10g"], kcal: 650 },
        { descrizione: "Energy restoration", alimenti: ["60g mix trail", "2 mele", "300ml latte mandorle"], kcal: 580 },
        { descrizione: "Post-workout max", alimenti: ["2 barrette proteiche", "300ml latte", "1 banana"], kcal: 620 },
        { descrizione: "Frutta e grassi buoni", alimenti: ["250g ananas", "50g mandorle", "200g yogurt"], kcal: 520 }
      ],
      cena: [
        { descrizione: "Cena da campione", alimenti: ["200g salmone", "120g quinoa", "250g verdure", "50g avocado", "1 cucchiaio olio EVO"], kcal: 700 },
        { descrizione: "High protein dinner", alimenti: ["250g tacchino", "200g verdure grigliate", "80g pane integrale", "40g noci"], kcal: 680 },
        { descrizione: "Recovery dinner", alimenti: ["180g branzino", "100g riso nero", "200g asparagi", "30g olive", "limone"], kcal: 620 },
        { descrizione: "Plant power", alimenti: ["150g tofu", "250g verdure saltate", "80g noodles", "30g semi misti"], kcal: 580 },
        { descrizione: "Proteine complete", alimenti: ["200g ricotta", "250g verdure forno", "40g noci", "erbe aromatiche"], kcal: 640 }
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
      // Extract all ingredients from the actual meal plan
      const allIngredients: string[] = [];
      Object.values(mealPlanData.plan).forEach((meal: MealData) => {
        allIngredients.push(...meal.alimenti);
      });

      // Calculate shopping list based on actual ingredients
      const shoppingList = calculateShoppingFromIngredients(allIngredients);
      
      setShoppingListData(shoppingList);
      setCurrentView('shoppingList');
      toast({ title: "Lista spesa creata!", description: "Costi calcolati in quota parte per le quantità effettive." });
    } catch (err: any) {
      toast({ title: "Errore", description: "Errore nella creazione della lista spesa", variant: "destructive" });
    } finally {
      setIsShoppingLoading(false);
    }
  };

  const calculateShoppingFromIngredients = (ingredients: string[]): ShoppingListData => {
    // Mapping ingredients to shopping items with precise portions and costs
    const ingredientMap: Record<string, {categoria: string, nome: string, quantita: string, costoUnitario: number}> = {
      // Proteine
      "uova": { categoria: "Proteine", nome: "Uova fresche", quantita: "1 pz", costoUnitario: 0.25 },
      "2 uova": { categoria: "Proteine", nome: "Uova fresche", quantita: "2 pz", costoUnitario: 0.50 },
      "3 uova": { categoria: "Proteine", nome: "Uova fresche", quantita: "3 pz", costoUnitario: 0.75 },
      "4 uova": { categoria: "Proteine", nome: "Uova fresche", quantita: "4 pz", costoUnitario: 1.00 },
      "petto di pollo": { categoria: "Proteine", nome: "Petto di pollo", quantita: "100g", costoUnitario: 2.80 },
      "120g petto di pollo": { categoria: "Proteine", nome: "Petto di pollo", quantita: "120g", costoUnitario: 3.36 },
      "150g petto di pollo": { categoria: "Proteine", nome: "Petto di pollo", quantita: "150g", costoUnitario: 4.20 },
      "180g pollo": { categoria: "Proteine", nome: "Petto di pollo", quantita: "180g", costoUnitario: 5.04 },
      "250g pollo": { categoria: "Proteine", nome: "Petto di pollo", quantita: "250g", costoUnitario: 7.00 },
      "salmone": { categoria: "Proteine", nome: "Salmone fresco", quantita: "100g", costoUnitario: 4.50 },
      "150g salmone": { categoria: "Proteine", nome: "Salmone fresco", quantita: "150g", costoUnitario: 6.75 },
      "200g salmone": { categoria: "Proteine", nome: "Salmone fresco", quantita: "200g", costoUnitario: 9.00 },
      "yogurt greco": { categoria: "Latticini", nome: "Yogurt greco 0%", quantita: "150g", costoUnitario: 1.20 },
      "150g yogurt greco": { categoria: "Latticini", nome: "Yogurt greco 0%", quantita: "150g", costoUnitario: 1.20 },
      "200g yogurt greco": { categoria: "Latticini", nome: "Yogurt greco 0%", quantita: "200g", costoUnitario: 1.60 },
      "250g yogurt greco": { categoria: "Latticini", nome: "Yogurt greco 0%", quantita: "250g", costoUnitario: 2.00 },
      "300g yogurt greco": { categoria: "Latticini", nome: "Yogurt greco 0%", quantita: "300g", costoUnitario: 2.40 },
      "tonno": { categoria: "Proteine", nome: "Tonno fresco", quantita: "100g", costoUnitario: 3.20 },
      "100g tonno naturale": { categoria: "Proteine", nome: "Tonno in scatola", quantita: "100g", costoUnitario: 2.80 },
      "150g tonno fresco": { categoria: "Proteine", nome: "Tonno fresco", quantita: "150g", costoUnitario: 4.80 },
      "200g tonno": { categoria: "Proteine", nome: "Tonno fresco", quantita: "200g", costoUnitario: 6.40 },
      "gamberetti": { categoria: "Proteine", nome: "Gamberetti", quantita: "100g", costoUnitario: 5.50 },
      "100g gamberetti": { categoria: "Proteine", nome: "Gamberetti", quantita: "100g", costoUnitario: 5.50 },
      "120g gamberetti": { categoria: "Proteine", nome: "Gamberetti", quantita: "120g", costoUnitario: 6.60 },
      "150g gamberetti": { categoria: "Proteine", nome: "Gamberetti", quantita: "150g", costoUnitario: 8.25 },
      "merluzzo": { categoria: "Proteine", nome: "Merluzzo", quantita: "100g", costoUnitario: 3.80 },
      "150g merluzzo": { categoria: "Proteine", nome: "Merluzzo", quantita: "150g", costoUnitario: 5.70 },
      "orata": { categoria: "Proteine", nome: "Orata", quantita: "100g", costoUnitario: 4.20 },
      "120g orata": { categoria: "Proteine", nome: "Orata", quantita: "120g", costoUnitario: 5.04 },
      "branzino": { categoria: "Proteine", nome: "Branzino", quantita: "100g", costoUnitario: 4.50 },
      "150g branzino": { categoria: "Proteine", nome: "Branzino", quantita: "150g", costoUnitario: 6.75 },
      "180g branzino": { categoria: "Proteine", nome: "Branzino", quantita: "180g", costoUnitario: 8.10 },
      "ricotta": { categoria: "Latticini", nome: "Ricotta fresca", quantita: "100g", costoUnitario: 1.80 },
      "100g ricotta": { categoria: "Latticini", nome: "Ricotta fresca", quantita: "100g", costoUnitario: 1.80 },
      "150g ricotta": { categoria: "Latticini", nome: "Ricotta fresca", quantita: "150g", costoUnitario: 2.70 },
      "200g ricotta": { categoria: "Latticini", nome: "Ricotta fresca", quantita: "200g", costoUnitario: 3.60 },
      "tofu": { categoria: "Proteine", nome: "Tofu biologico", quantita: "100g", costoUnitario: 2.20 },
      "100g tofu": { categoria: "Proteine", nome: "Tofu biologico", quantita: "100g", costoUnitario: 2.20 },
      "120g tofu": { categoria: "Proteine", nome: "Tofu biologico", quantita: "120g", costoUnitario: 2.64 },
      "150g tofu": { categoria: "Proteine", nome: "Tofu biologico", quantita: "150g", costoUnitario: 3.30 },
      "tacchino": { categoria: "Proteine", nome: "Tacchino", quantita: "100g", costoUnitario: 3.20 },
      "150g tacchino": { categoria: "Proteine", nome: "Tacchino", quantita: "150g", costoUnitario: 4.80 },
      "180g tacchino": { categoria: "Proteine", nome: "Tacchino", quantita: "180g", costoUnitario: 5.76 },
      "250g tacchino": { categoria: "Proteine", nome: "Tacchino", quantita: "250g", costoUnitario: 8.00 },
      "manzo magro": { categoria: "Proteine", nome: "Manzo magro", quantita: "100g", costoUnitario: 4.80 },
      "120g manzo magro": { categoria: "Proteine", nome: "Manzo magro", quantita: "120g", costoUnitario: 5.76 },
      "150g manzo magro": { categoria: "Proteine", nome: "Manzo magro", quantita: "150g", costoUnitario: 7.20 },
      "200g manzo magro": { categoria: "Proteine", nome: "Manzo magro", quantita: "200g", costoUnitario: 9.60 },

      // Carboidrati
      "pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "50g", costoUnitario: 0.25 },
      "1 fetta pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "30g", costoUnitario: 0.15 },
      "2 fette pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "60g", costoUnitario: 0.30 },
      "3 fette pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "90g", costoUnitario: 0.45 },
      "pane segale": { categoria: "Carboidrati", nome: "Pane di segale", quantita: "50g", costoUnitario: 0.35 },
      "2 fette pane segale": { categoria: "Carboidrati", nome: "Pane di segale", quantita: "60g", costoUnitario: 0.42 },
      "30g pane segale": { categoria: "Carboidrati", nome: "Pane di segale", quantita: "30g", costoUnitario: 0.21 },
      "50g pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "50g", costoUnitario: 0.25 },
      "60g pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "60g", costoUnitario: 0.30 },
      "80g pane integrale": { categoria: "Carboidrati", nome: "Pane integrale", quantita: "80g", costoUnitario: 0.40 },
      "riso integrale": { categoria: "Carboidrati", nome: "Riso integrale", quantita: "60g secco", costoUnitario: 0.24 },
      "60g riso integrale": { categoria: "Carboidrati", nome: "Riso integrale", quantita: "60g secco", costoUnitario: 0.24 },
      "80g riso integrale": { categoria: "Carboidrati", nome: "Riso integrale", quantita: "80g secco", costoUnitario: 0.32 },
      "100g riso integrale": { categoria: "Carboidrati", nome: "Riso integrale", quantita: "100g secco", costoUnitario: 0.40 },
      "120g riso integrale": { categoria: "Carboidrati", nome: "Riso integrale", quantita: "120g secco", costoUnitario: 0.48 },
      "150g riso integrale": { categoria: "Carboidrati", nome: "Riso integrale", quantita: "150g secco", costoUnitario: 0.60 },
      "riso basmati": { categoria: "Carboidrati", nome: "Riso basmati", quantita: "60g secco", costoUnitario: 0.36 },
      "100g riso basmati": { categoria: "Carboidrati", nome: "Riso basmati", quantita: "100g secco", costoUnitario: 0.60 },
      "120g riso basmati": { categoria: "Carboidrati", nome: "Riso basmati", quantita: "120g secco", costoUnitario: 0.72 },
      "150g riso basmati": { categoria: "Carboidrati", nome: "Riso basmati", quantita: "150g secco", costoUnitario: 0.90 },
      "riso nero": { categoria: "Carboidrati", nome: "Riso nero", quantita: "60g secco", costoUnitario: 0.48 },
      "80g riso nero": { categoria: "Carboidrati", nome: "Riso nero", quantita: "80g secco", costoUnitario: 0.64 },
      "100g riso nero": { categoria: "Carboidrati", nome: "Riso nero", quantita: "100g secco", costoUnitario: 0.80 },
      "quinoa": { categoria: "Carboidrati", nome: "Quinoa", quantita: "50g secco", costoUnitario: 0.60 },
      "50g quinoa": { categoria: "Carboidrati", nome: "Quinoa", quantita: "50g secco", costoUnitario: 0.60 },
      "60g quinoa": { categoria: "Carboidrati", nome: "Quinoa", quantita: "60g secco", costoUnitario: 0.72 },
      "80g quinoa": { categoria: "Carboidrati", nome: "Quinoa", quantita: "80g secco", costoUnitario: 0.96 },
      "100g quinoa": { categoria: "Carboidrati", nome: "Quinoa", quantita: "100g secco", costoUnitario: 1.20 },
      "120g quinoa": { categoria: "Carboidrati", nome: "Quinoa", quantita: "120g secco", costoUnitario: 1.44 },
      "avena": { categoria: "Carboidrati", nome: "Fiocchi d'avena", quantita: "40g", costoUnitario: 0.16 },
      "30g avena": { categoria: "Carboidrati", nome: "Fiocchi d'avena", quantita: "30g", costoUnitario: 0.12 },
      "40g avena": { categoria: "Carboidrati", nome: "Fiocchi d'avena", quantita: "40g", costoUnitario: 0.16 },
      "50g avena": { categoria: "Carboidrati", nome: "Fiocchi d'avena", quantita: "50g", costoUnitario: 0.20 },
      "80g avena": { categoria: "Carboidrati", nome: "Fiocchi d'avena", quantita: "80g", costoUnitario: 0.32 },
      "100g fiocchi d'avena": { categoria: "Carboidrati", nome: "Fiocchi d'avena", quantita: "100g", costoUnitario: 0.40 },
      "pasta integrale": { categoria: "Carboidrati", nome: "Pasta integrale", quantita: "80g secco", costoUnitario: 0.32 },
      "80g pasta integrale": { categoria: "Carboidrati", nome: "Pasta integrale", quantita: "80g secco", costoUnitario: 0.32 },
      "100g pasta integrale": { categoria: "Carboidrati", nome: "Pasta integrale", quantita: "100g secco", costoUnitario: 0.40 },
      "150g pasta integrale": { categoria: "Carboidrati", nome: "Pasta integrale", quantita: "150g secco", costoUnitario: 0.60 },
      "pasta legumi": { categoria: "Carboidrati", nome: "Pasta di legumi", quantita: "80g secco", costoUnitario: 1.20 },
      "80g pasta legumi": { categoria: "Carboidrati", nome: "Pasta di legumi", quantita: "80g secco", costoUnitario: 1.20 },
      "patate dolci": { categoria: "Carboidrati", nome: "Patate dolci", quantita: "100g", costoUnitario: 0.45 },
      "100g patate dolci": { categoria: "Carboidrati", nome: "Patate dolci", quantita: "100g", costoUnitario: 0.45 },
      "120g patate dolci": { categoria: "Carboidrati", nome: "Patate dolci", quantita: "120g", costoUnitario: 0.54 },
      "150g patate dolci": { categoria: "Carboidrati", nome: "Patate dolci", quantita: "150g", costoUnitario: 0.68 },
      "farro": { categoria: "Carboidrati", nome: "Farro perlato", quantita: "60g secco", costoUnitario: 0.42 },
      "100g farro": { categoria: "Carboidrati", nome: "Farro perlato", quantita: "100g secco", costoUnitario: 0.70 },
      "120g farro": { categoria: "Carboidrati", nome: "Farro perlato", quantita: "120g secco", costoUnitario: 0.84 },
      "cous cous integrale": { categoria: "Carboidrati", nome: "Cous cous integrale", quantita: "60g secco", costoUnitario: 0.36 },
      "80g cous cous integrale": { categoria: "Carboidrati", nome: "Cous cous integrale", quantita: "80g secco", costoUnitario: 0.48 },
      "noodles": { categoria: "Carboidrati", nome: "Noodles soba", quantita: "60g secco", costoUnitario: 0.90 },
      "60g noodles soba": { categoria: "Carboidrati", nome: "Noodles soba", quantita: "60g secco", costoUnitario: 0.90 },
      "80g noodles": { categoria: "Carboidrati", nome: "Noodles soba", quantita: "80g secco", costoUnitario: 1.20 },
      "cereali integrali": { categoria: "Carboidrati", nome: "Cereali integrali", quantita: "30g", costoUnitario: 0.45 },
      "30g cereali integrali": { categoria: "Carboidrati", nome: "Cereali integrali", quantita: "30g", costoUnitario: 0.45 },
      "granola": { categoria: "Carboidrati", nome: "Granola biologica", quantita: "30g", costoUnitario: 0.60 },
      "20g granola": { categoria: "Carboidrati", nome: "Granola biologica", quantita: "20g", costoUnitario: 0.40 },
      "30g granola": { categoria: "Carboidrati", nome: "Granola biologica", quantita: "30g", costoUnitario: 0.60 },
      "50g granola": { categoria: "Carboidrati", nome: "Granola biologica", quantita: "50g", costoUnitario: 1.00 },
      "80g granola": { categoria: "Carboidrati", nome: "Granola biologica", quantita: "80g", costoUnitario: 1.60 },

      // Legumi
      "lenticchie rosse": { categoria: "Legumi", nome: "Lenticchie rosse", quantita: "80g secco", costoUnitario: 0.32 },
      "100g lenticchie rosse": { categoria: "Legumi", nome: "Lenticchie rosse", quantita: "100g secco", costoUnitario: 0.40 },
      "legumi": { categoria: "Legumi", nome: "Legumi misti", quantita: "80g secco", costoUnitario: 0.36 },
      "80g legumi": { categoria: "Legumi", nome: "Legumi misti", quantita: "80g secco", costoUnitario: 0.36 },

      // Frutta
      "banana": { categoria: "Frutta", nome: "Banane", quantita: "1 pz (120g)", costoUnitario: 0.30 },
      "1 banana": { categoria: "Frutta", nome: "Banane", quantita: "1 pz (120g)", costoUnitario: 0.30 },
      "1 banana media": { categoria: "Frutta", nome: "Banane", quantita: "1 pz (120g)", costoUnitario: 0.30 },
      "1 banana grande": { categoria: "Frutta", nome: "Banane", quantita: "1 pz (150g)", costoUnitario: 0.38 },
      "2 banane": { categoria: "Frutta", nome: "Banane", quantita: "2 pz (240g)", costoUnitario: 0.60 },
      "mela": { categoria: "Frutta", nome: "Mele", quantita: "1 pz (150g)", costoUnitario: 0.35 },
      "1 mela": { categoria: "Frutta", nome: "Mele", quantita: "1 pz (150g)", costoUnitario: 0.35 },
      "1 mela media": { categoria: "Frutta", nome: "Mele", quantita: "1 pz (150g)", costoUnitario: 0.35 },
      "2 mele": { categoria: "Frutta", nome: "Mele", quantita: "2 pz (300g)", costoUnitario: 0.70 },
      "avocado": { categoria: "Frutta", nome: "Avocado", quantita: "1 pz medio (150g)", costoUnitario: 1.80 },
      "1 avocado": { categoria: "Frutta", nome: "Avocado", quantita: "1 pz medio (150g)", costoUnitario: 1.80 },
      "1 avocado piccolo": { categoria: "Frutta", nome: "Avocado", quantita: "1 pz piccolo (100g)", costoUnitario: 1.20 },
      "1 avocado medio": { categoria: "Frutta", nome: "Avocado", quantita: "1 pz medio (150g)", costoUnitario: 1.80 },
      "1 avocado intero": { categoria: "Frutta", nome: "Avocado", quantita: "1 pz grande (200g)", costoUnitario: 2.40 },
      "1/2 avocado": { categoria: "Frutta", nome: "Avocado", quantita: "1/2 pz (75g)", costoUnitario: 0.90 },
      "50g avocado": { categoria: "Frutta", nome: "Avocado", quantita: "50g", costoUnitario: 0.60 },
      "30g avocado": { categoria: "Frutta", nome: "Avocado", quantita: "30g", costoUnitario: 0.36 },
      "40g avocado": { categoria: "Frutta", nome: "Avocado", quantita: "40g", costoUnitario: 0.48 },
      "arancia": { categoria: "Frutta", nome: "Arance", quantita: "1 pz (200g)", costoUnitario: 0.40 },
      "1 arancia": { categoria: "Frutta", nome: "Arance", quantita: "1 pz (200g)", costoUnitario: 0.40 },
      "kiwi": { categoria: "Frutta", nome: "Kiwi", quantita: "1 pz (80g)", costoUnitario: 0.35 },
      "1 kiwi": { categoria: "Frutta", nome: "Kiwi", quantita: "1 pz (80g)", costoUnitario: 0.35 },
      "pera": { categoria: "Frutta", nome: "Pere", quantita: "1 pz (180g)", costoUnitario: 0.45 },
      "1 pera": { categoria: "Frutta", nome: "Pere", quantita: "1 pz (180g)", costoUnitario: 0.45 },
      "frutti di bosco": { categoria: "Frutta", nome: "Mix frutti di bosco", quantita: "150g", costoUnitario: 2.25 },
      "150g frutti di bosco": { categoria: "Frutta", nome: "Mix frutti di bosco", quantita: "150g", costoUnitario: 2.25 },
      "200g frutti di bosco": { categoria: "Frutta", nome: "Mix frutti di bosco", quantita: "200g", costoUnitario: 3.00 },
      "250g frutti bosco": { categoria: "Frutta", nome: "Mix frutti di bosco", quantita: "250g", costoUnitario: 3.75 },
      "200g frutti bosco": { categoria: "Frutta", nome: "Mix frutti di bosco", quantita: "200g", costoUnitario: 3.00 },
      "ananas": { categoria: "Frutta", nome: "Ananas", quantita: "200g", costoUnitario: 1.20 },
      "200g ananas": { categoria: "Frutta", nome: "Ananas", quantita: "200g", costoUnitario: 1.20 },
      "250g ananas": { categoria: "Frutta", nome: "Ananas", quantita: "250g", costoUnitario: 1.50 },
      "300g ananas": { categoria: "Frutta", nome: "Ananas", quantita: "300g", costoUnitario: 1.80 },
      "mango": { categoria: "Frutta", nome: "Mango", quantita: "1 pz (200g)", costoUnitario: 2.20 },
      "1 mango": { categoria: "Frutta", nome: "Mango", quantita: "1 pz (200g)", costoUnitario: 2.20 },

      // Verdure
      "verdure miste": { categoria: "Verdure", nome: "Mix verdure fresche", quantita: "200g", costoUnitario: 1.40 },
      "150g verdure miste": { categoria: "Verdure", nome: "Mix verdure fresche", quantita: "150g", costoUnitario: 1.05 },
      "200g verdure miste": { categoria: "Verdure", nome: "Mix verdure fresche", quantita: "200g", costoUnitario: 1.40 },
      "250g verdure miste": { categoria: "Verdure", nome: "Mix verdure fresche", quantita: "250g", costoUnitario: 1.75 },
      "verdure al vapore": { categoria: "Verdure", nome: "Verdure per vapore", quantita: "150g", costoUnitario: 1.05 },
      "200g verdure al vapore": { categoria: "Verdure", nome: "Verdure per vapore", quantita: "200g", costoUnitario: 1.40 },
      "250g verdure al vapore": { categoria: "Verdure", nome: "Verdure per vapore", quantita: "250g", costoUnitario: 1.75 },
      "verdure grigliate": { categoria: "Verdure", nome: "Verdure per griglia", quantita: "150g", costoUnitario: 1.20 },
      "150g verdure grigliate": { categoria: "Verdure", nome: "Verdure per griglia", quantita: "150g", costoUnitario: 1.20 },
      "200g verdure grigliate": { categoria: "Verdure", nome: "Verdure per griglia", quantita: "200g", costoUnitario: 1.60 },
      "verdure saltate": { categoria: "Verdure", nome: "Verdure per saltare", quantita: "200g", costoUnitario: 1.40 },
      "200g verdure saltate": { categoria: "Verdure", nome: "Verdure per saltare", quantita: "200g", costoUnitario: 1.40 },
      "250g verdure saltate": { categoria: "Verdure", nome: "Verdure per saltare", quantita: "250g", costoUnitario: 1.75 },
      "verdure wok": { categoria: "Verdure", nome: "Mix verdure per wok", quantita: "200g", costoUnitario: 1.80 },
      "200g verdure wok": { categoria: "Verdure", nome: "Mix verdure per wok", quantita: "200g", costoUnitario: 1.80 },
      "verdure al forno": { categoria: "Verdure", nome: "Verdure per forno", quantita: "200g", costoUnitario: 1.20 },
      "200g verdure al forno": { categoria: "Verdure", nome: "Verdure per forno", quantita: "200g", costoUnitario: 1.20 },
      "250g verdure al forno": { categoria: "Verdure", nome: "Verdure per forno", quantita: "250g", costoUnitario: 1.50 },
      "250g verdure forno": { categoria: "Verdure", nome: "Verdure per forno", quantita: "250g", costoUnitario: 1.50 },
      "broccoli": { categoria: "Verdure", nome: "Broccoli", quantita: "150g", costoUnitario: 1.20 },
      "150g broccoli": { categoria: "Verdure", nome: "Broccoli", quantita: "150g", costoUnitario: 1.20 },
      "200g broccoli": { categoria: "Verdure", nome: "Broccoli", quantita: "200g", costoUnitario: 1.60 },
      "spinaci": { categoria: "Verdure", nome: "Spinaci freschi", quantita: "100g", costoUnitario: 1.80 },
      "100g spinaci": { categoria: "Verdure", nome: "Spinaci freschi", quantita: "100g", costoUnitario: 1.80 },
      "200g spinaci": { categoria: "Verdure", nome: "Spinaci freschi", quantita: "200g", costoUnitario: 3.60 },
      "spinaci freschi": { categoria: "Verdure", nome: "Spinaci freschi", quantita: "100g", costoUnitario: 1.80 },
      "100g spinaci freschi": { categoria: "Verdure", nome: "Spinaci freschi", quantita: "100g", costoUnitario: 1.80 },
      "zucchine": { categoria: "Verdure", nome: "Zucchine", quantita: "200g", costoUnitario: 1.20 },
      "150g zucchine": { categoria: "Verdure", nome: "Zucchine", quantita: "150g", costoUnitario: 0.90 },
      "200g zucchine": { categoria: "Verdure", nome: "Zucchine", quantita: "200g", costoUnitario: 1.20 },
      "zucchine grigliate": { categoria: "Verdure", nome: "Zucchine", quantita: "200g", costoUnitario: 1.20 },
      "200g zucchine grigliate": { categoria: "Verdure", nome: "Zucchine", quantita: "200g", costoUnitario: 1.20 },
      "asparagi": { categoria: "Verdure", nome: "Asparagi", quantita: "150g", costoUnitario: 3.00 },
      "150g asparagi": { categoria: "Verdure", nome: "Asparagi", quantita: "150g", costoUnitario: 3.00 },
      "200g asparagi": { categoria: "Verdure", nome: "Asparagi", quantita: "200g", costoUnitario: 4.00 },
      "peperoni": { categoria: "Verdure", nome: "Peperoni misti", quantita: "150g", costoUnitario: 1.50 },
      "100g peperoni": { categoria: "Verdure", nome: "Peperoni misti", quantita: "100g", costoUnitario: 1.00 },
      "150g peperoni": { categoria: "Verdure", nome: "Peperoni misti", quantita: "150g", costoUnitario: 1.50 },
      "cavolfiore": { categoria: "Verdure", nome: "Cavolfiore", quantita: "150g", costoUnitario: 1.20 },
      "150g cavolfiore": { categoria: "Verdure", nome: "Cavolfiore", quantita: "150g", costoUnitario: 1.20 },
      "cavolfiori": { categoria: "Verdure", nome: "Cavolfiore", quantita: "150g", costoUnitario: 1.20 },
      "150g cavolfiori": { categoria: "Verdure", nome: "Cavolfiore", quantita: "150g", costoUnitario: 1.20 },
      "pomodorini": { categoria: "Verdure", nome: "Pomodorini", quantita: "150g", costoUnitario: 1.80 },
      "100g pomodorini": { categoria: "Verdure", nome: "Pomodorini", quantita: "100g", costoUnitario: 1.20 },
      "150g pomodorini": { categoria: "Verdure", nome: "Pomodorini", quantita: "150g", costoUnitario: 1.80 },
      "200g pomodorini": { categoria: "Verdure", nome: "Pomodorini", quantita: "200g", costoUnitario: 2.40 },
      "cetrioli": { categoria: "Verdure", nome: "Cetrioli", quantita: "100g", costoUnitario: 0.80 },
      "100g cetrioli": { categoria: "Verdure", nome: "Cetrioli", quantita: "100g", costoUnitario: 0.80 },
      "insalata mista": { categoria: "Verdure", nome: "Insalata mista", quantita: "200g", costoUnitario: 1.60 },
      "200g insalata mista": { categoria: "Verdure", nome: "Insalata mista", quantita: "200g", costoUnitario: 1.60 },
      "insalata verde": { categoria: "Verdure", nome: "Insalata verde", quantita: "150g", costoUnitario: 1.20 },
      "verdure fresche": { categoria: "Verdure", nome: "Verdure fresche miste", quantita: "150g", costoUnitario: 1.35 },
      "150g verdure fresche": { categoria: "Verdure", nome: "Verdure fresche miste", quantita: "150g", costoUnitario: 1.35 },
      "finocchi": { categoria: "Verdure", nome: "Finocchi", quantita: "100g", costoUnitario: 1.20 },
      "100g finocchi": { categoria: "Verdure", nome: "Finocchi", quantita: "100g", costoUnitario: 1.20 },
      "carote baby": { categoria: "Verdure", nome: "Carote baby", quantita: "100g", costoUnitario: 1.50 },
      "100g carote baby": { categoria: "Verdure", nome: "Carote baby", quantita: "100g", costoUnitario: 1.50 },
      "sedano": { categoria: "Verdure", nome: "Sedano", quantita: "150g", costoUnitario: 1.20 },
      "150g sedano": { categoria: "Verdure", nome: "Sedano", quantita: "150g", costoUnitario: 1.20 },
      "verdure crude": { categoria: "Verdure", nome: "Verdure per crudo", quantita: "100g", costoUnitario: 1.40 },

      // Latticini
      "latte": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "200ml", costoUnitario: 0.28 },
      "200ml latte": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "200ml", costoUnitario: 0.28 },
      "250ml latte": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "250ml", costoUnitario: 0.35 },
      "300ml latte": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "300ml", costoUnitario: 0.42 },
      "400ml latte": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "400ml", costoUnitario: 0.56 },
      "latte parzialmente scremato": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "200ml", costoUnitario: 0.28 },
      "200ml latte parzialmente scremato": { categoria: "Latticini", nome: "Latte parzialmente scremato", quantita: "200ml", costoUnitario: 0.28 },
      "latte di mandorle": { categoria: "Latticini", nome: "Latte di mandorle", quantita: "200ml", costoUnitario: 0.60 },
      "200ml latte di mandorle": { categoria: "Latticini", nome: "Latte di mandorle", quantita: "200ml", costoUnitario: 0.60 },
      "300ml latte mandorle": { categoria: "Latticini", nome: "Latte di mandorle", quantita: "300ml", costoUnitario: 0.90 },
      "latte mandorle": { categoria: "Latticini", nome: "Latte di mandorle", quantita: "200ml", costoUnitario: 0.60 },
      "200ml latte mandorle": { categoria: "Latticini", nome: "Latte di mandorle", quantita: "200ml", costoUnitario: 0.60 },
      "latte vegetale": { categoria: "Latticini", nome: "Bevanda vegetale", quantita: "200ml", costoUnitario: 0.50 },
      "200ml latte vegetale": { categoria: "Latticini", nome: "Bevanda vegetale", quantita: "200ml", costoUnitario: 0.50 },
      "latte avena": { categoria: "Latticini", nome: "Latte di avena", quantita: "200ml", costoUnitario: 0.55 },
      "250ml latte avena": { categoria: "Latticini", nome: "Latte di avena", quantita: "250ml", costoUnitario: 0.69 },
      "latte riso": { categoria: "Latticini", nome: "Latte di riso", quantita: "150ml", costoUnitario: 0.38 },
      "150ml latte riso": { categoria: "Latticini", nome: "Latte di riso", quantita: "150ml", costoUnitario: 0.38 },
      "latte cioccolato": { categoria: "Latticini", nome: "Latte al cioccolato", quantita: "300ml", costoUnitario: 1.20 },
      "300ml latte cioccolato": { categoria: "Latticini", nome: "Latte al cioccolato", quantita: "300ml", costoUnitario: 1.20 },
      "400ml latte cioccolato": { categoria: "Latticini", nome: "Latte al cioccolato", quantita: "400ml", costoUnitario: 1.60 },
      "parmigiano": { categoria: "Latticini", nome: "Parmigiano Reggiano", quantita: "20g", costoUnitario: 1.20 },
      "20g parmigiano": { categoria: "Latticini", nome: "Parmigiano Reggiano", quantita: "20g", costoUnitario: 1.20 },
      "30g parmigiano": { categoria: "Latticini", nome: "Parmigiano Reggiano", quantita: "30g", costoUnitario: 1.80 },
      "50g parmigiano": { categoria: "Latticini", nome: "Parmigiano Reggiano", quantita: "50g", costoUnitario: 3.00 },
      "feta": { categoria: "Latticini", nome: "Feta greca", quantita: "50g", costoUnitario: 1.50 },
      "50g feta": { categoria: "Latticini", nome: "Feta greca", quantita: "50g", costoUnitario: 1.50 },
      "mozzarella": { categoria: "Latticini", nome: "Mozzarella", quantita: "50g", costoUnitario: 1.25 },
      "50g mozzarella": { categoria: "Latticini", nome: "Mozzarella", quantita: "50g", costoUnitario: 1.25 },
      "80g mozzarella": { categoria: "Latticini", nome: "Mozzarella", quantita: "80g", costoUnitario: 2.00 },

      // Frutta secca e semi
      "mandorle": { categoria: "Frutta Secca", nome: "Mandorle", quantita: "15g", costoUnitario: 0.60 },
      "15g mandorle": { categoria: "Frutta Secca", nome: "Mandorle", quantita: "15g", costoUnitario: 0.60 },
      "20g mandorle": { categoria: "Frutta Secca", nome: "Mandorle", quantita: "20g", costoUnitario: 0.80 },
      "25g mandorle": { categoria: "Frutta Secca", nome: "Mandorle", quantita: "25g", costoUnitario: 1.00 },
      "30g mandorle": { categoria: "Frutta Secca", nome: "Mandorle", quantita: "30g", costoUnitario: 1.20 },
      "50g mandorle": { categoria: "Frutta Secca", nome: "Mandorle", quantita: "50g", costoUnitario: 2.00 },
      "mandorle crude": { categoria: "Frutta Secca", nome: "Mandorle crude", quantita: "20g", costoUnitario: 0.80 },
      "20g mandorle crude": { categoria: "Frutta Secca", nome: "Mandorle crude", quantita: "20g", costoUnitario: 0.80 },
      "mandorle a lamelle": { categoria: "Frutta Secca", nome: "Mandorle a lamelle", quantita: "10g", costoUnitario: 0.45 },
      "10g mandorle a lamelle": { categoria: "Frutta Secca", nome: "Mandorle a lamelle", quantita: "10g", costoUnitario: 0.45 },
      "noci": { categoria: "Frutta Secca", nome: "Noci", quantita: "15g", costoUnitario: 0.75 },
      "10g noci": { categoria: "Frutta Secca", nome: "Noci", quantita: "10g", costoUnitario: 0.50 },
      "15g noci": { categoria: "Frutta Secca", nome: "Noci", quantita: "15g", costoUnitario: 0.75 },
      "20g noci": { categoria: "Frutta Secca", nome: "Noci", quantita: "20g", costoUnitario: 1.00 },
      "30g noci": { categoria: "Frutta Secca", nome: "Noci", quantita: "30g", costoUnitario: 1.50 },
      "40g noci": { categoria: "Frutta Secca", nome: "Noci", quantita: "40g", costoUnitario: 2.00 },
      "noci pecan": { categoria: "Frutta Secca", nome: "Noci pecan", quantita: "15g", costoUnitario: 1.20 },
      "15g noci pecan": { categoria: "Frutta Secca", nome: "Noci pecan", quantita: "15g", costoUnitario: 1.20 },
      "anacardi": { categoria: "Frutta Secca", nome: "Anacardi", quantita: "10g", costoUnitario: 0.80 },
      "10g anacardi": { categoria: "Frutta Secca", nome: "Anacardi", quantita: "10g", costoUnitario: 0.80 },
      "semi di chia": { categoria: "Semi", nome: "Semi di chia", quantita: "1 cucchiaino (5g)", costoUnitario: 0.25 },
      "1 cucchiaino semi di chia": { categoria: "Semi", nome: "Semi di chia", quantita: "1 cucchiaino (5g)", costoUnitario: 0.25 },
      "semi di lino": { categoria: "Semi", nome: "Semi di lino", quantita: "10g", costoUnitario: 0.15 },
      "10g semi di lino": { categoria: "Semi", nome: "Semi di lino", quantita: "10g", costoUnitario: 0.15 },
      "semi di girasole": { categoria: "Semi", nome: "Semi di girasole", quantita: "10g", costoUnitario: 0.12 },
      "10g semi di girasole": { categoria: "Semi", nome: "Semi di girasole", quantita: "10g", costoUnitario: 0.12 },
      "semi di sesamo": { categoria: "Semi", nome: "Semi di sesamo", quantita: "20g", costoUnitario: 0.30 },
      "20g semi di sesamo": { categoria: "Semi", nome: "Semi di sesamo", quantita: "20g", costoUnitario: 0.30 },
      "semi zucca": { categoria: "Semi", nome: "Semi di zucca", quantita: "10g", costoUnitario: 0.25 },
      "10g semi zucca": { categoria: "Semi", nome: "Semi di zucca", quantita: "10g", costoUnitario: 0.25 },
      "semi": { categoria: "Semi", nome: "Mix semi", quantita: "20g", costoUnitario: 0.40 },
      "20g semi": { categoria: "Semi", nome: "Mix semi", quantita: "20g", costoUnitario: 0.40 },
      "30g semi misti": { categoria: "Semi", nome: "Mix semi", quantita: "30g", costoUnitario: 0.60 },
      "mix frutta secca": { categoria: "Frutta Secca", nome: "Mix frutta secca", quantita: "30g", costoUnitario: 1.50 },
      "30g mix frutta secca": { categoria: "Frutta Secca", nome: "Mix frutta secca", quantita: "30g", costoUnitario: 1.50 },
      "mix trail": { categoria: "Frutta Secca", nome: "Mix trail energetico", quantita: "40g", costoUnitario: 2.00 },
      "40g mix trail": { categoria: "Frutta Secca", nome: "Mix trail energetico", quantita: "40g", costoUnitario: 2.00 },
      "60g mix trail energetico": { categoria: "Frutta Secca", nome: "Mix trail energetico", quantita: "60g", costoUnitario: 3.00 },
      "noci miste": { categoria: "Frutta Secca", nome: "Mix noci", quantita: "30g", costoUnitario: 1.80 },
      "30g noci miste": { categoria: "Frutta Secca", nome: "Mix noci", quantita: "30g", costoUnitario: 1.80 },

      // Grassi e condimenti
      "olio EVO": { categoria: "Condimenti", nome: "Olio extravergine oliva", quantita: "1 cucchiaio (10ml)", costoUnitario: 0.15 },
      "1 cucchiaio olio EVO": { categoria: "Condimenti", nome: "Olio extravergine oliva", quantita: "1 cucchiaio (10ml)", costoUnitario: 0.15 },
      "2 cucchiai olio EVO": { categoria: "Condimenti", nome: "Olio extravergine oliva", quantita: "2 cucchiai (20ml)", costoUnitario: 0.30 },
      "15g olio EVO": { categoria: "Condimenti", nome: "Olio extravergine oliva", quantita: "15ml", costoUnitario: 0.23 },
      "olive": { categoria: "Condimenti", nome: "Olive miste", quantita: "10g", costoUnitario: 0.35 },
      "10g olive": { categoria: "Condimenti", nome: "Olive miste", quantita: "10g", costoUnitario: 0.35 },
      "15g olive": { categoria: "Condimenti", nome: "Olive miste", quantita: "15g", costoUnitario: 0.53 },
      "20g olive": { categoria: "Condimenti", nome: "Olive miste", quantita: "20g", costoUnitario: 0.70 },
      "olive nere": { categoria: "Condimenti", nome: "Olive nere", quantita: "10g", costoUnitario: 0.40 },
      "olive nere 10g": { categoria: "Condimenti", nome: "Olive nere", quantita: "10g", costoUnitario: 0.40 },
      "burro di arachidi": { categoria: "Condimenti", nome: "Burro di arachidi naturale", quantita: "20g", costoUnitario: 0.50 },
      "20g burro di arachidi": { categoria: "Condimenti", nome: "Burro di arachidi naturale", quantita: "20g", costoUnitario: 0.50 },
      "25g burro mandorle": { categoria: "Condimenti", nome: "Burro di mandorle", quantita: "25g", costoUnitario: 0.75 },
      "30g burro arachidi": { categoria: "Condimenti", nome: "Burro di arachidi naturale", quantita: "30g", costoUnitario: 0.75 },
      "40g burro mandorle": { categoria: "Condimenti", nome: "Burro di mandorle", quantita: "40g", costoUnitario: 1.20 },
      "1 cucchiaio burro di mandorle": { categoria: "Condimenti", nome: "Burro di mandorle", quantita: "15g", costoUnitario: 0.45 },
      "burro di mandorle": { categoria: "Condimenti", nome: "Burro di mandorle", quantita: "15g", costoUnitario: 0.45 },
      "1 cucchiaio burro di arachidi": { categoria: "Condimenti", nome: "Burro di arachidi naturale", quantita: "15g", costoUnitario: 0.38 },
      "10g burro di arachidi naturale": { categoria: "Condimenti", nome: "Burro di arachidi naturale", quantita: "10g", costoUnitario: 0.25 },
      "burro arachidi naturale": { categoria: "Condimenti", nome: "Burro di arachidi naturale", quantita: "15g", costoUnitario: 0.38 },
      "olio cocco": { categoria: "Condimenti", nome: "Olio di cocco", quantita: "1 cucchiaino (5ml)", costoUnitario: 0.15 },
      "1 cucchiaino olio cocco": { categoria: "Condimenti", nome: "Olio di cocco", quantita: "1 cucchiaino (5ml)", costoUnitario: 0.15 },
      "1 cucchiaio olio cocco": { categoria: "Condimenti", nome: "Olio di cocco", quantita: "1 cucchiaio (15ml)", costoUnitario: 0.45 },
      "20g olio cocco": { categoria: "Condimenti", nome: "Olio di cocco", quantita: "20ml", costoUnitario: 0.60 },
      "tahini": { categoria: "Condimenti", nome: "Tahini", quantita: "25g", costoUnitario: 0.75 },
      "25g tahini": { categoria: "Condimenti", nome: "Tahini", quantita: "25g", costoUnitario: 0.75 },
      "hummus": { categoria: "Condimenti", nome: "Hummus", quantita: "20g", costoUnitario: 0.60 },
      "20g hummus": { categoria: "Condimenti", nome: "Hummus", quantita: "20g", costoUnitario: 0.60 },
      "30g hummus": { categoria: "Condimenti", nome: "Hummus", quantita: "30g", costoUnitario: 0.90 },
      "50g hummus": { categoria: "Condimenti", nome: "Hummus", quantita: "50g", costoUnitario: 1.50 },

      // Dolcificanti e extra
      "miele": { categoria: "Dolcificanti", nome: "Miele biologico", quantita: "1 cucchiaino (5g)", costoUnitario: 0.08 },
      "1 cucchiaino miele": { categoria: "Dolcificanti", nome: "Miele biologico", quantita: "1 cucchiaino (5g)", costoUnitario: 0.08 },
      "5g miele": { categoria: "Dolcificanti", nome: "Miele biologico", quantita: "5g", costoUnitario: 0.08 },
      "10g miele": { categoria: "Dolcificanti", nome: "Miele biologico", quantita: "10g", costoUnitario: 0.16 },
      "15g miele": { categoria: "Dolcificanti", nome: "Miele biologico", quantita: "15g", costoUnitario: 0.24 },
      "20g miele": { categoria: "Dolcificanti", nome: "Miele biologico", quantita: "20g", costoUnitario: 0.32 },
      "sciroppo": { categoria: "Dolcificanti", nome: "Sciroppo d'acero", quantita: "20g", costoUnitario: 0.60 },
      "sciroppo acero": { categoria: "Dolcificanti", nome: "Sciroppo d'acero", quantita: "20g", costoUnitario: 0.60 },
      "20g sciroppo acero": { categoria: "Dolcificanti", nome: "Sciroppo d'acero", quantita: "20g", costoUnitario: 0.60 },
      "30g sciroppo acero": { categoria: "Dolcificanti", nome: "Sciroppo d'acero", quantita: "30g", costoUnitario: 0.90 },
      "2 cucchiai sciroppo acero": { categoria: "Dolcificanti", nome: "Sciroppo d'acero", quantita: "30g", costoUnitario: 0.90 },
      "3 cucchiai sciroppo": { categoria: "Dolcificanti", nome: "Sciroppo d'acero", quantita: "45g", costoUnitario: 1.35 },
      "cioccolato fondente": { categoria: "Extra", nome: "Cioccolato fondente 85%", quantita: "5g", costoUnitario: 0.25 },
      "5g cioccolato fondente": { categoria: "Extra", nome: "Cioccolato fondente 85%", quantita: "5g", costoUnitario: 0.25 },
      "2 quadretti cioccolato fondente 85%": { categoria: "Extra", nome: "Cioccolato fondente 85%", quantita: "10g", costoUnitario: 0.50 },
      "cocco": { categoria: "Extra", nome: "Cocco rapé", quantita: "15g", costoUnitario: 0.45 },
      "15g cocco": { categoria: "Extra", nome: "Cocco rapé", quantita: "15g", costoUnitario: 0.45 },
      "cocco rapé": { categoria: "Extra", nome: "Cocco rapé", quantita: "15g", costoUnitario: 0.45 },
      "15g cocco rapé": { categoria: "Extra", nome: "Cocco rapé", quantita: "15g", costoUnitario: 0.45 },
      "25g cocco": { categoria: "Extra", nome: "Cocco rapé", quantita: "25g", costoUnitario: 0.75 },
      "datteri": { categoria: "Extra", nome: "Datteri", quantita: "40g", costoUnitario: 1.20 },
      "40g datteri": { categoria: "Extra", nome: "Datteri", quantita: "40g", costoUnitario: 1.20 },
      "60g datteri": { categoria: "Extra", nome: "Datteri", quantita: "60g", costoUnitario: 1.80 },

      // Proteine in polvere e integratori
      "proteine whey": { categoria: "Integratori", nome: "Proteine whey", quantita: "30g", costoUnitario: 1.20 },
      "20g proteine whey": { categoria: "Integratori", nome: "Proteine whey", quantita: "20g", costoUnitario: 0.80 },
      "30g proteine whey": { categoria: "Integratori", nome: "Proteine whey", quantita: "30g", costoUnitario: 1.20 },
      "40g proteine whey": { categoria: "Integratori", nome: "Proteine whey", quantita: "40g", costoUnitario: 1.60 },
      "50g proteine": { categoria: "Integratori", nome: "Proteine whey", quantita: "50g", costoUnitario: 2.00 },
      "proteine": { categoria: "Integratori", nome: "Proteine whey", quantita: "30g", costoUnitario: 1.20 },
      "30g proteine": { categoria: "Integratori", nome: "Proteine whey", quantita: "30g", costoUnitario: 1.20 },
      "20g proteine": { categoria: "Integratori", nome: "Proteine whey", quantita: "20g", costoUnitario: 0.80 },
      "proteine in polvere": { categoria: "Integratori", nome: "Proteine whey", quantita: "30g", costoUnitario: 1.20 },
      "30g proteine in polvere": { categoria: "Integratori", nome: "Proteine whey", quantita: "30g", costoUnitario: 1.20 },
      "proteine caseine": { categoria: "Integratori", nome: "Proteine caseine", quantita: "20g", costoUnitario: 1.00 },
      "20g proteine caseine": { categoria: "Integratori", nome: "Proteine caseine", quantita: "20g", costoUnitario: 1.00 },

      // Bevande e liquidi
      "tè verde": { categoria: "Bevande", nome: "Tè verde", quantita: "1 tazza", costoUnitario: 0.05 },
      "limone": { categoria: "Condimenti", nome: "Limone", quantita: "1/2 pz", costoUnitario: 0.15 },
      "smoothie verde": { categoria: "Bevande", nome: "Base smoothie verde", quantita: "1 porzione", costoUnitario: 0.50 },
      "1 smoothie verde": { categoria: "Bevande", nome: "Base smoothie verde", quantita: "1 porzione", costoUnitario: 0.50 },

      // Preparazioni
      "shake proteico": { categoria: "Bevande", nome: "Shake proteico base", quantita: "1 porzione", costoUnitario: 1.50 },
      "1 shake proteico": { categoria: "Bevande", nome: "Shake proteico base", quantita: "1 porzione", costoUnitario: 1.50 },
      "250ml shake proteico": { categoria: "Bevande", nome: "Shake proteico base", quantita: "250ml", costoUnitario: 1.50 },
      "300ml shake proteico": { categoria: "Bevande", nome: "Shake proteico base", quantita: "300ml", costoUnitario: 1.80 },
      "400ml shake proteico": { categoria: "Bevande", nome: "Shake proteico base", quantita: "400ml", costoUnitario: 2.40 },
      "barretta energetica": { categoria: "Snack", nome: "Barretta energetica", quantita: "1 pz", costoUnitario: 1.50 },
      "1 barretta energetica": { categoria: "Snack", nome: "Barretta energetica", quantita: "1 pz", costoUnitario: 1.50 },
      "2 barrette energetiche": { categoria: "Snack", nome: "Barretta energetica", quantita: "2 pz", costoUnitario: 3.00 },
      "barretta proteica": { categoria: "Snack", nome: "Barretta proteica", quantita: "1 pz", costoUnitario: 2.00 },
      "1 barretta proteica": { categoria: "Snack", nome: "Barretta proteica", quantita: "1 pz", costoUnitario: 2.00 },
      "2 barrette proteiche": { categoria: "Snack", nome: "Barretta proteica", quantita: "2 pz", costoUnitario: 4.00 },

      // Spezie e aromi
      "cannella": { categoria: "Spezie", nome: "Cannella", quantita: "1 pizzico", costoUnitario: 0.02 },
      "aglio e prezzemolo": { categoria: "Spezie", nome: "Aglio e prezzemolo", quantita: "q.b.", costoUnitario: 0.05 },
      "erbe aromatiche": { categoria: "Spezie", nome: "Erbe aromatiche", quantita: "q.b.", costoUnitario: 0.10 },
      "erbe": { categoria: "Spezie", nome: "Erbe aromatiche", quantita: "q.b.", costoUnitario: 0.10 },
      "basilico": { categoria: "Spezie", nome: "Basilico fresco", quantita: "qualche foglia", costoUnitario: 0.15 },

      // Alimenti specifici per frutta
      "300g mix frutta tropicale": { categoria: "Frutta", nome: "Mix frutta tropicale", quantita: "300g", costoUnitario: 3.60 },
      "mix frutta tropicale": { categoria: "Frutta", nome: "Mix frutta tropicale", quantita: "200g", costoUnitario: 2.40 },

      // Specifiche per salmone affumicato
      "salmone affumicato": { categoria: "Proteine", nome: "Salmone affumicato", quantita: "100g", costoUnitario: 8.50 },
      "100g salmone affumicato": { categoria: "Proteine", nome: "Salmone affumicato", quantita: "100g", costoUnitario: 8.50 },

      // Paste e farine alternative
      "farina d'avena": { categoria: "Carboidrati", nome: "Farina d'avena", quantita: "30g", costoUnitario: 0.18 },
      "30g farina d'avena": { categoria: "Carboidrati", nome: "Farina d'avena", quantita: "30g", costoUnitario: 0.18 },
      "50g farina d'avena": { categoria: "Carboidrati", nome: "Farina d'avena", quantita: "50g", costoUnitario: 0.30 },
      "80g farina avena": { categoria: "Carboidrati", nome: "Farina d'avena", quantita: "80g", costoUnitario: 0.48 },
      "farina avena": { categoria: "Carboidrati", nome: "Farina d'avena", quantita: "50g", costoUnitario: 0.30 },

      // Piatti composti specifici
      "pancakes": { categoria: "Preparazioni", nome: "Base pancakes", quantita: "per 2 pz", costoUnitario: 0.60 },
      "pancakes proteici": { categoria: "Preparazioni", nome: "Base pancakes proteici", quantita: "per 2 pz", costoUnitario: 1.20 },
      "3 pancakes integrali": { categoria: "Preparazioni", nome: "Base pancakes integrali", quantita: "per 3 pz", costoUnitario: 0.90 },
      "4 pancakes proteici": { categoria: "Preparazioni", nome: "Base pancakes proteici", quantita: "per 4 pz", costoUnitario: 2.40 },
      "pancakes energetici": { categoria: "Preparazioni", nome: "Base pancakes energetici", quantita: "per 3 pz", costoUnitario: 1.80 },
      "pancakes potenti": { categoria: "Preparazioni", nome: "Base pancakes proteici", quantita: "per 4 pz", costoUnitario: 2.40 },

      // Biscotti e crackers
      "crackers integrali": { categoria: "Snack", nome: "Crackers integrali", quantita: "2 pz", costoUnitario: 0.20 },
      "2 crackers integrali": { categoria: "Snack", nome: "Crackers integrali", quantita: "2 pz", costoUnitario: 0.20 },
      "fetta biscottata integrale": { categoria: "Snack", nome: "Fette biscottate integrali", quantita: "1 pz", costoUnitario: 0.15 },
      "1 fetta biscottata integrale": { categoria: "Snack", nome: "Fette biscottate integrali", quantita: "1 pz", costoUnitario: 0.15 },
      "2 fette biscottate": { categoria: "Snack", nome: "Fette biscottate integrali", quantita: "2 pz", costoUnitario: 0.30 },
      "4 fette biscottate": { categoria: "Snack", nome: "Fette biscottate integrali", quantita: "4 pz", costoUnitario: 0.60 },

      // Conserve
      "marmellata": { categoria: "Conserve", nome: "Marmellata senza zuccheri aggiunti", quantita: "1 cucchiaino", costoUnitario: 0.08 },
      "1 cucchiaino marmellata": { categoria: "Conserve", nome: "Marmellata senza zuccheri aggiunti", quantita: "1 cucchiaino", costoUnitario: 0.08 },

      // Pinoli
      "pinoli": { categoria: "Frutta Secca", nome: "Pinoli", quantita: "15g", costoUnitario: 1.80 },
      "15g pinoli": { categoria: "Frutta Secca", nome: "Pinoli", quantita: "15g", costoUnitario: 1.80 }
    };

    // Process ingredients and group by shopping items
    const shoppingMap = new Map<string, {categoria: string, nome: string, quantitaTotale: number, quantitaUnita: string, costoTotale: number}>();

    ingredients.forEach(ingredient => {
      const cleanIngredient = ingredient.toLowerCase().trim();
      
      // Try exact match first
      if (ingredientMap[cleanIngredient]) {
        const item = ingredientMap[cleanIngredient];
        const key = `${item.categoria}-${item.nome}`;
        
        if (shoppingMap.has(key)) {
          const existing = shoppingMap.get(key)!;
          existing.costoTotale += item.costoUnitario;
          existing.quantitaTotale += 1;
        } else {
          shoppingMap.set(key, {
            categoria: item.categoria,
            nome: item.nome,
            quantitaTotale: 1,
            quantitaUnita: item.quantita,
            costoTotale: item.costoUnitario
          });
        }
      } else {
        // Try partial matches for ingredients without quantities
        const partialMatches = Object.keys(ingredientMap).filter(key => 
          key.includes(cleanIngredient) || cleanIngredient.includes(key.split(' ').pop() || '')
        );
        
        if (partialMatches.length > 0) {
          const bestMatch = partialMatches[0];
          const item = ingredientMap[bestMatch];
          const key = `${item.categoria}-${item.nome}`;
          
          if (shoppingMap.has(key)) {
            const existing = shoppingMap.get(key)!;
            existing.costoTotale += item.costoUnitario;
            existing.quantitaTotale += 1;
          } else {
            shoppingMap.set(key, {
              categoria: item.categoria,
              nome: item.nome,
              quantitaTotale: 1,
              quantitaUnita: item.quantita,
              costoTotale: item.costoUnitario
            });
          }
        }
      }
    });

    // Convert to final shopping list format
    const finalShoppingList: ShoppingItem[] = Array.from(shoppingMap.values()).map(item => ({
      categoria: item.categoria,
      nome: item.nome,
      quantita: item.quantitaTotale > 1 ? `${item.quantitaUnita} x${item.quantitaTotale}` : item.quantitaUnita,
      costo_calcolato_eur: Number(item.costoTotale.toFixed(2))
    }));

    const totalCost = finalShoppingList.reduce((sum, item) => sum + item.costo_calcolato_eur, 0);

    return {
      lista_spesa: finalShoppingList,
      totale_calcolato_eur: Number(totalCost.toFixed(2))
    };
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
