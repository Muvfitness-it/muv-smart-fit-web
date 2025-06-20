
import React, { useState, useEffect } from 'react';
import { BrainCircuit, Loader2, Target, ShoppingCart, FileDown, Sparkles, ArrowLeft } from 'lucide-react';

interface FormData {
  gender: string;
  age: string;
  weight: string;
  height: string;
  activityLevel: string;
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

interface MealPlanData {
  calories: number;
  plan: MealPlan;
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

type ViewType = 'calculator' | 'mealPlan' | 'shoppingList';

const MuvPlanner = () => {
  const [currentView, setCurrentView] = useState<ViewType>('calculator');
  const [formData, setFormData] = useState<FormData>({
    gender: 'male',
    age: '30',
    weight: '70',
    height: '175',
    activityLevel: '1.375',
    goal: 'maintain'
  });
  const [mealPlanData, setMealPlanData] = useState<MealPlanData | null>(null);
  const [shoppingListData, setShoppingListData] = useState<ShoppingListData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isShoppingListLoading, setIsShoppingListLoading] = useState(false);
  const [isCoachLoading, setIsCoachLoading] = useState(false);
  const [error, setError] = useState('');
  const [mealPlanError, setMealPlanError] = useState('');
  const [coachQuestion, setCoachQuestion] = useState('');
  const [coachResponse, setCoachResponse] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const callGeminiAPI = async (payload: any) => {
    const apiKey = ""; // Provided by environment
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      const errorBody = await response.text();
      console.error("API Error Response:", errorBody);
      throw new Error(`Errore API: ${response.statusText}`);
    }
    return response.json();
  };

  const generateMealPlan = async (targetCalories: number) => {
    setIsLoading(true);
    setError('');
    
    const prompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica. Crea un piano alimentare giornaliero per ${targetCalories} kcal. Include 5 pasti: colazione, spuntino_mattutino, pranzo, spuntino_pomeridiano, cena. Per ogni pasto fornisci: descrizione breve, lista alimenti con quantità, kcal approssimative.`;
    
    const mealObjectSchema = {
      type: "OBJECT",
      properties: {
        descrizione: { type: "STRING" },
        alimenti: { type: "ARRAY", items: { type: "STRING" } },
        kcal: { type: "NUMBER" }
      },
      required: ["descrizione", "alimenti", "kcal"]
    };
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            colazione: mealObjectSchema,
            spuntino_mattutino: mealObjectSchema,
            pranzo: mealObjectSchema,
            spuntino_pomeridiano: mealObjectSchema,
            cena: mealObjectSchema
          },
          required: ["colazione", "spuntino_mattutino", "pranzo", "spuntino_pomeridiano", "cena"]
        }
      }
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const plan = JSON.parse(result.candidates[0].content.parts[0].text);
        setMealPlanData({ calories: targetCalories, plan });
        setCurrentView('mealPlan');
      } else {
        throw new Error("Risposta IA non valida.");
      }
    } catch (err: any) {
      setError(err.message || 'Errore generazione piano.');
    } finally {
      setIsLoading(false);
    }
  };

  const generateShoppingList = async () => {
    if (!mealPlanData) return;
    
    setIsShoppingListLoading(true);
    setMealPlanError('');
    
    const prompt = `Dato il piano alimentare: ${JSON.stringify(mealPlanData.plan)}, estrai tutti gli ingredienti necessari e crea una lista della spesa organizzata per categoria con quantità e costi stimati in EUR.`;
    
    const payload = {
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            lista_spesa: {
              type: "ARRAY",
              items: {
                type: "OBJECT",
                properties: {
                  categoria: { type: "STRING" },
                  nome: { type: "STRING" },
                  quantita: { type: "STRING" },
                  costo_calcolato_eur: { type: "NUMBER" }
                },
                required: ["categoria", "nome", "quantita", "costo_calcolato_eur"]
              }
            },
            totale_calcolato_eur: { type: "NUMBER" }
          },
          required: ["lista_spesa", "totale_calcolato_eur"]
        }
      }
    };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const shoppingData = JSON.parse(result.candidates[0].content.parts[0].text);
        setShoppingListData(shoppingData);
        setCurrentView('shoppingList');
      } else {
        throw new Error("Impossibile generare la lista.");
      }
    } catch (err: any) {
      setMealPlanError(err.message || "Errore creazione lista.");
    } finally {
      setIsShoppingListLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bmr = formData.gender === 'male'
      ? (10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseFloat(formData.age) + 5)
      : (10 * parseFloat(formData.weight) + 6.25 * parseFloat(formData.height) - 5 * parseFloat(formData.age) - 161);
    
    const tdee = bmr * parseFloat(formData.activityLevel);
    
    let finalCalories;
    switch (formData.goal) {
      case 'lose':
        finalCalories = tdee - 400;
        break;
      case 'gain':
        finalCalories = tdee + 400;
        break;
      default:
        finalCalories = tdee;
        break;
    }
    
    generateMealPlan(Math.round(finalCalories));
  };

  const handleAskCoach = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!coachQuestion.trim() || !mealPlanData) return;
    
    setIsCoachLoading(true);
    setCoachResponse('');
    
    const prompt = `Agisci come un coach esperto per "MUV Fitness", con una doppia specializzazione in nutrizione sportiva e personal training, rispondendo con un tono accademico. La tua conoscenza deve essere vasta e coprire argomenti come: piani alimentari, timing dei nutrienti, integrazione, idratazione, allenamento con i pesi, cardio, recupero e sonno. Un utente sta seguendo un piano da circa ${mealPlanData.calories} kcal e pone la seguente domanda: "${coachQuestion}". Fornisci una risposta concisa e sintetica, andando dritto al punto. Offri solo le informazioni chiave basate sull'evidenza scientifica. Evita introduzioni prolisse e saluti. Non fornire mai consigli medici specifici o diagnosi.`;
    
    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
    
    try {
      const result = await callGeminiAPI(payload);
      if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
        const response = result.candidates[0].content.parts[0].text
          .replace(/\n\*/g, '<br>•')
          .replace(/\n/g, '<br>');
        setCoachResponse(response);
      } else {
        throw new Error("Il coach non ha risposto.");
      }
    } catch (err: any) {
      setCoachResponse(err.message || "Errore nella comunicazione con il coach.");
    } finally {
      setIsCoachLoading(false);
    }
  };

  const exportToPDF = (elementId: string, fileName: string) => {
    // PDF export functionality would need to be implemented here
    console.log(`Exporting ${elementId} as ${fileName}`);
  };

  const handleRecalculate = () => {
    setCurrentView('calculator');
    setMealPlanData(null);
    setShoppingListData(null);
    setError('');
    setMealPlanError('');
    setCoachResponse('');
  };

  const formatMealName = (name: string) => {
    return name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  };

  const mealIcons = {
    colazione: '🍎',
    spuntino_mattutino: '🥪',
    pranzo: '🍲',
    spuntino_pomeridiano: '🥪',
    cena: '🍽️'
  };

  const renderCalculatorView = () => (
    <div className="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-200 mb-2">Sesso</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
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
              value={formData.age}
              onChange={handleInputChange}
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
              value={formData.weight}
              onChange={handleInputChange}
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
              value={formData.height}
              onChange={handleInputChange}
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
            value={formData.activityLevel}
            onChange={handleInputChange}
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
            value={formData.goal}
            onChange={handleInputChange}
            className="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
          >
            <option value="lose">Definizione / Perdita peso</option>
            <option value="maintain">Mantenimento</option>
            <option value="gain">Aumento massa muscolare</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-4 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="inline-block mr-2 animate-spin" />
                Elaborazione...
              </>
            ) : (
              <>
                <BrainCircuit className="inline-block mr-2" />
                Crea Piano Nutrizionale
              </>
            )}
          </button>
        </div>
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start">
            <span className="ml-3">{error}</span>
          </div>
        )}
      </form>
    </div>
  );

  const renderMealPlan = () => {
    if (!mealPlanData) return null;
    
    const { calories, plan } = mealPlanData;
    const mealOrder: (keyof MealPlan)[] = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];
    
    return (
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
        <div id="meal-plan-export" className="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
          <div className="text-center mb-8">
            <p className="text-gray-300">Piano nutrizionale di esempio</p>
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
              <Target className="w-10 h-10" />
              <span>{calories} kcal</span>
            </h2>
            <p className="text-gray-400 mt-1">
              Obiettivo: {formData.goal === 'lose' ? 'Definizione' : formData.goal === 'gain' ? 'Aumento massa' : 'Mantenimento'}
            </p>
          </div>
          <div className="space-y-6">
            {mealOrder.map(mealName => {
              const mealData = plan[mealName];
              if (!mealData) return null;
              
              return (
                <div key={mealName} className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
                  <div className="flex items-start mb-3">
                    <div className="pt-1 text-green-400 w-8 h-8 text-2xl">
                      {mealIcons[mealName]}
                    </div>
                    <div className="ml-4 flex-grow">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xl font-bold text-green-300">{formatMealName(mealName)}</h3>
                        <span className="text-lg font-bold text-green-400">~{mealData.kcal} kcal</span>
                      </div>
                      <p className="text-sm text-gray-400 mt-1">{mealData.descrizione}</p>
                    </div>
                  </div>
                  <ul className="space-y-2 pl-2">
                    {mealData.alimenti.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-400 mr-2">•</span>
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
              <button
                onClick={generateShoppingList}
                disabled={isShoppingListLoading}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:bg-gray-500"
              >
                {isShoppingListLoading ? (
                  <>
                    <Loader2 className="inline-block mr-2 animate-spin" />
                    Creando...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="inline-block mr-2" />
                    Lista Spesa
                  </>
                )}
              </button>
              <button
                onClick={() => exportToPDF('meal-plan-export', 'piano_alimentare_muv.pdf')}
                className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
              >
                <FileDown className="inline-block mr-2" />
                Esporta PDF
              </button>
            </div>
            <div className="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
              <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-green-300">
                🤖 Chiedi al Coach Esperto
              </h4>
              <p className="text-sm text-gray-400 mb-4">
                Fai qualsiasi domanda su alimentazione, integrazione, allenamenti e recupero.
              </p>
              <form onSubmit={handleAskCoach} className="space-y-4">
                <input
                  type="text"
                  value={coachQuestion}
                  onChange={(e) => setCoachQuestion(e.target.value)}
                  placeholder="Es: Come posso strutturare la mia settimana di allenamento?"
                  className="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition"
                />
                <button
                  type="submit"
                  disabled={isCoachLoading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-gray-500"
                >
                  {isCoachLoading ? (
                    <>
                      <Loader2 className="inline-block mr-2 animate-spin" />
                      In attesa...
                    </>
                  ) : (
                    <>
                      <Sparkles className="inline-block mr-2" />
                      Invia Domanda
                    </>
                  )}
                </button>
              </form>
              {coachResponse && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200 text-sm leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: coachResponse }} />
                </div>
              )}
            </div>
          </div>
          {mealPlanError && (
            <div className="mt-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg flex items-start">
              <span>{mealPlanError}</span>
            </div>
          )}
          <div className="mt-8 text-center text-xs text-gray-500">
            <p>Questo piano alimentare è un esempio generato da un'IA e non sostituisce una consulenza medica personalizzata.</p>
          </div>
          <button
            onClick={handleRecalculate}
            className="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
          >
            Nuovo Calcolo
          </button>
        </div>
      </div>
    );
  };

  const renderShoppingList = () => {
    if (!shoppingListData) return null;
    
    const groupedList = shoppingListData.lista_spesa.reduce((acc, item) => {
      const category = item.categoria || 'Varie';
      if (!acc[category]) acc[category] = [];
      acc[category].push(item);
      return acc;
    }, {} as Record<string, ShoppingItem[]>);

    return (
      <div className="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
        <div id="shopping-list-export" className="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
          <div className="text-center mb-8">
            <h2 className="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3">
              <ShoppingCart className="w-10 h-10" />
              <span>Lista della Spesa</span>
            </h2>
            <p className="text-gray-400 mt-1">Stima dei costi per il piano alimentare giornaliero.</p>
          </div>
          <div className="space-y-6">
            {Object.entries(groupedList).map(([category, items]) => (
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
              <span className="text-green-300">Totale Stimato:</span>
              <span className="text-green-300">€ {shoppingListData.totale_calcolato_eur.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-right">
              I prezzi sono stime basate sulla media di mercato e quantità.
            </p>
          </div>
        </div>
        <div className="p-6 md:p-8 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={() => setCurrentView('mealPlan')}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
            >
              <ArrowLeft className="mr-2" />
              Torna al Piano
            </button>
            <button
              onClick={() => exportToPDF('shopping-list-export', 'lista_spesa_muv.pdf')}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
            >
              <FileDown className="mr-2" />
              Esporta PDF
            </button>
          </div>
          <button
            onClick={handleRecalculate}
            className="w-full mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
          >
            Nuovo Calcolo
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 flex flex-col items-center justify-center" 
         style={{
           backgroundImage: 'radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)'
         }}>
      <div className="w-full max-w-2xl mx-auto">
        <header className="text-center mb-6 md:mb-8">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            <span className="text-white">MUV</span>
            <span className="text-green-400">.</span>
            <span className="text-white">Planner</span>
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
        </header>

        <main>
          {currentView === 'calculator' && renderCalculatorView()}
          {currentView === 'mealPlan' && renderMealPlan()}
          {currentView === 'shoppingList' && renderShoppingList()}
        </main>

        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} MUV Fitness Center. Tutti i diritti riservati.</p>
        </footer>
      </div>
    </div>
  );
};

export default MuvPlanner;
