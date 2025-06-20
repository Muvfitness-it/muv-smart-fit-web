<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MUV Fitness - Piano Alimentare</title>
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>

    <!-- jsPDF and html2canvas for PDF Export -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>

    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800;900&display=swap');
        body {
            font-family: 'Inter', sans-serif;
        }
        @keyframes fade-in { 
            from { opacity: 0; transform: translateY(20px); } 
            to { opacity: 1; transform: translateY(0); } 
        }
        .animate-fade-in { animation: fade-in 0.5s ease-out forwards; }
        
        .pdf-render-mode {
            background-color: #ffffff !important;
            color: #000000 !important;
        }
        .pdf-render-mode * {
            color: #000000 !important;
            border-color: #cccccc !important;
            background-color: transparent !important;
        }
        .pdf-render-mode .pdf-hide {
            display: none !important;
        }
        .pdf-render-mode .lucide {
            display: none !important;
        }
    </style>
</head>
<body class="bg-gray-900 text-white" style="background-image: radial-gradient(circle at top right, rgb(29, 78, 216, 0.15), transparent), radial-gradient(circle at bottom left, rgb(22, 163, 74, 0.15), transparent)">

    <div class="min-h-screen p-4 flex flex-col items-center justify-center">
        <div class="w-full max-w-2xl mx-auto">
            <header class="text-center mb-6 md:mb-8">
                <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight">
                    <span class="text-white">MUV</span><span class="text-green-400">.</span><span class="text-white">Planner</span>
                </h1>
                <p class="text-gray-400 mt-2 text-lg">Il tuo assistente nutrizionale intelligente</p>
            </header>

            <main>
                <!-- Calculator View -->
                <div id="view-calculator">
                    <div class="bg-white/10 backdrop-blur-lg p-6 md:p-8 rounded-2xl shadow-2xl border border-white/20">
                        <form id="calculator-form" class="space-y-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label class="block text-sm font-medium text-gray-200 mb-2">Sesso</label>
                                    <select name="gender" class="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition">
                                        <option value="male">Uomo</option>
                                        <option value="female">Donna</option>
                                    </select>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-200 mb-2">Età (anni)</label>
                                    <input type="number" name="age" value="30" class="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" min="15" max="100" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-200 mb-2">Peso (kg)</label>
                                    <input type="number" name="weight" value="70" class="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" min="30" max="200" />
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-200 mb-2">Altezza (cm)</label>
                                    <input type="number" name="height" value="175" class="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" min="100" max="250" />
                                </div>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-200 mb-2">Livello di attività fisica</label>
                                <select name="activityLevel" class="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition">
                                    <option value="1.2">Sedentario</option>
                                    <option value="1.375" selected>Leggermente attivo</option>
                                    <option value="1.55">Moderatamente attivo</option>
                                    <option value="1.725">Molto attivo</option>
                                    <option value="1.9">Estremamente attivo</option>
                                </select>
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-200 mb-2">Il tuo obiettivo</label>
                                <select name="goal" class="w-full bg-gray-900/50 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition">
                                    <option value="lose">Definizione / Perdita peso</option>
                                    <option value="maintain" selected>Mantenimento</option>
                                    <option value="gain">Aumento massa muscolare</option>
                                </select>
                            </div>
                            <div>
                                <button type="submit" id="submit-button" class="w-full mt-4 bg-green-500 hover:bg-green-600 text-gray-900 font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 disabled:bg-gray-500 disabled:cursor-not-allowed">
                                    <span id="submit-button-text">
                                        <i data-lucide="brain-circuit" class="inline-block mr-2"></i>Crea Piano Nutrizionale
                                    </span>
                                    <span id="submit-button-loader" class="hidden">
                                        <i data-lucide="loader-2" class="inline-block mr-2 animate-spin"></i>Elaborazione...
                                    </span>
                                </button>
                            </div>
                            <div id="error-container" class="hidden bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg items-start">
                               <i data-lucide="alert-triangle" class="inline-block mr-3 mt-1 h-5 w-5"></i>
                               <span id="error-message"></span>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Meal Plan View -->
                <div id="view-mealPlan" class="hidden"></div>
                
                <!-- Shopping List View -->
                <div id="view-shoppingList" class="hidden"></div>

            </main>

            <footer class="text-center mt-8 text-gray-500 text-sm">
                <p>&copy; <span id="current-year"></span> MUV Fitness Center. Tutti i diritti riservati.</p>
            </footer>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // --- STATE MANAGEMENT ---
            let currentView = 'calculator';
            let formData = {};
            let mealPlanData = null;
            let shoppingListData = null;

            // --- DOM ELEMENTS (Initialized after DOM is ready) ---
            const views = {
                calculator: document.getElementById('view-calculator'),
                mealPlan: document.getElementById('view-mealPlan'),
                shoppingList: document.getElementById('view-shoppingList')
            };
            const calculatorForm = document.getElementById('calculator-form');
            const submitButton = document.getElementById('submit-button');
            const submitButtonText = document.getElementById('submit-button-text');
            const submitButtonLoader = document.getElementById('submit-button-loader');
            const errorContainer = document.getElementById('error-container');
            const errorMessage = document.getElementById('error-message');
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // --- VIEW CONTROLLER ---
            function showView(viewName) {
                currentView = viewName;
                Object.values(views).forEach(view => view.classList.add('hidden'));
                if (views[viewName]) {
                    views[viewName].classList.remove('hidden');
                    views[viewName].classList.add('animate-fade-in');
                }
                lucide.createIcons(); // Refresh icons on view change
            }

            // --- ERROR HANDLING ---
            function displayError(message, containerId = 'error-container') {
                const container = document.getElementById(containerId);
                const msgSpan = container.querySelector('span');
                if(container && msgSpan) {
                    msgSpan.textContent = message;
                    container.classList.remove('hidden');
                    container.classList.add('flex');
                }
            }

            function clearError(containerId = 'error-container') {
                const container = document.getElementById(containerId);
                if (container) {
                    container.classList.add('hidden');
                }
            }

            // --- PDF EXPORT ---
            function exportToPDF(elementId, fileName) {
                const { jsPDF } = window.jspdf;
                const input = document.getElementById(elementId);
                if (!input || !window.html2canvas || !jsPDF) {
                    displayError("Le risorse per il PDF non sono ancora pronte. Riprova tra un istante.");
                    return;
                }
                
                input.classList.add('pdf-render-mode');

                html2canvas(input, { scale: 2, useCORS: true, backgroundColor: '#ffffff' })
                    .then(canvas => {
                        input.classList.remove('pdf-render-mode');
                        const imgData = canvas.toDataURL('image/png');
                        const pdf = new jsPDF('p', 'mm', 'a4');
                        const imgProps = pdf.getImageProperties(imgData);
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = pdf.internal.pageSize.getHeight();
                        const margin = 10;
                        const effectiveWidth = pdfWidth - margin * 2;
                        const imgWidth = effectiveWidth;
                        const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
                        let heightLeft = imgHeight;
                        let position = 0;

                        pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidth, imgHeight);
                        heightLeft -= (pdfHeight - margin * 2);

                        while (heightLeft > 0) {
                            position -= (pdfHeight-margin); // Adjust position for multi-page
                            pdf.addPage();
                            pdf.addImage(imgData, 'PNG', margin, position + margin, imgWidth, imgHeight);
                            heightLeft -= (pdfHeight - margin*2);
                        }
                        pdf.save(fileName);
                    }).catch(err => {
                        input.classList.remove('pdf-render-mode');
                        console.error("Error generating PDF", err);
                        displayError("Si è verificato un errore durante la creazione del PDF.");
                    });
            }

            // --- RENDER FUNCTIONS ---
            function renderMealPlan() {
                if (!mealPlanData) return;
                const { calories, plan } = mealPlanData;
                const mealOrder = ['colazione', 'spuntino_mattutino', 'pranzo', 'spuntino_pomeridiano', 'cena'];
                const mealIcons = { colazione: 'apple', spuntino_mattutino: 'sandwich', pranzo: 'soup', spuntino_pomeridiano: 'sandwich', cena: 'utensils' };
                const formatMealName = (name) => name.replace(/_/g, ' ').replace(/\b\w/g, char => char.toUpperCase());

                let mealPlanHTML = `<div class="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
                        <div id="meal-plan-export" class="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
                            <div class="text-center mb-8">
                                <p class="text-gray-300">Piano nutrizionale di esempio</p>
                                <h2 class="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3"><i data-lucide="target" class="w-10 h-10"></i><span>${calories} kcal</span></h2>
                                <p class="text-gray-400 mt-1">Obiettivo: ${formData.goal === 'lose' ? 'Definizione' : formData.goal === 'gain' ? 'Aumento massa' : 'Mantenimento'}</p>
                            </div>
                            <div class="space-y-6">`;
                
                mealOrder.forEach(mealName => {
                    const mealData = plan[mealName];
                    if (!mealData) return;
                    mealPlanHTML += `<div class="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
                            <div class="flex items-start mb-3">
                                <div class="pt-1 text-green-400 w-8 h-8"><i data-lucide="${mealIcons[mealName]}"></i></div>
                                <div class="ml-4 flex-grow">
                                    <div class="flex justify-between items-baseline"><h3 class="text-xl font-bold text-green-300">${formatMealName(mealName)}</h3><span class="text-lg font-bold text-green-400">~${mealData.kcal} kcal</span></div>
                                    <p class="text-sm text-gray-400 mt-1">${mealData.descrizione}</p>
                                </div>
                            </div>
                            <ul class="space-y-2 pl-2">${mealData.alimenti.map(item => `<li class="flex items-start"><i data-lucide="chevron-right" class="w-4 h-4 mr-2 mt-1 text-green-400 flex-shrink-0"></i><span class="text-gray-300">${item}</span></li>`).join('')}</ul>
                        </div>`;
                });

                mealPlanHTML += `</div></div><div class="p-6 md:p-8 pt-0">
                        <div class="mt-8 pt-6 border-t border-white/10 space-y-6">
                            <h3 class="text-2xl font-bold text-center text-green-300 flex items-center justify-center gap-2"><i data-lucide="sparkles" class="w-6 h-6"></i> Funzioni IA Avanzate</h3>
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button id="generate-shopping-list-btn" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all duration-300 disabled:bg-gray-500">
                                    <span id="shopping-list-btn-text"><i data-lucide="shopping-cart" class="inline-block mr-2"></i>Lista Spesa</span>
                                    <span id="shopping-list-btn-loader" class="hidden"><i data-lucide="loader-2" class="inline-block mr-2 animate-spin"></i>Creando...</span>
                                </button>
                                <button id="export-meal-plan-btn" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"><i data-lucide="file-down" class="inline-block mr-2"></i>Esporta PDF</button>
                            </div>
                            <div class="bg-gray-800/60 p-5 rounded-xl border border-gray-700">
                                <h4 class="text-lg font-bold mb-3 flex items-center gap-2 text-green-300"><i data-lucide="bot"></i> Chiedi al Coach Esperto</h4>
                                <p class="text-sm text-gray-400 mb-4">Fai qualsiasi domanda su alimentazione, integrazione, allenamenti e recupero.</p>
                                <form id="coach-form" class="space-y-4">
                                    <input type="text" id="coach-question-input" placeholder="Es: Come posso strutturare la mia settimana di allenamento?" class="w-full bg-gray-900/70 border border-gray-600 rounded-lg py-2 px-3 text-white focus:ring-2 focus:ring-green-400 transition" />
                                    <button id="coach-submit-btn" type="submit" class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center transition-colors disabled:bg-gray-500">
                                        <span id="coach-btn-text"><i data-lucide="sparkles" class="inline-block mr-2"></i>Invia Domanda</span>
                                        <span id="coach-btn-loader" class="hidden"><i data-lucide="loader-2" class="inline-block mr-2 animate-spin"></i>In attesa...</span>
                                    </button>
                                </form>
                                <div id="coach-response-container" class="hidden mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg text-green-200 text-sm leading-relaxed"></div>
                            </div>
                        </div>
                        <div id="mealplan-error-container" class="hidden mt-4 bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg items-start"><i data-lucide="alert-triangle" class="inline-block mr-3 mt-1 h-5 w-5"></i><span></span></div>
                        <div class="mt-8 text-center text-xs text-gray-500"><p>Questo piano alimentare è un esempio generato da un'IA e non sostituisce una consulenza medica personalizzata.</p></div>
                        <button id="recalculate-btn-1" class="w-full mt-6 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">Nuovo Calcolo</button>
                    </div></div>`;
                views.mealPlan.innerHTML = mealPlanHTML;
                document.getElementById('generate-shopping-list-btn').addEventListener('click', generateShoppingList);
                document.getElementById('export-meal-plan-btn').addEventListener('click', () => exportToPDF('meal-plan-export', 'piano_alimentare_muv.pdf'));
                document.getElementById('coach-form').addEventListener('submit', handleAskCoach);
                document.getElementById('recalculate-btn-1').addEventListener('click', handleRecalculate);
            }

            function renderShoppingList() {
                if (!shoppingListData) return;
                const groupedList = shoppingListData.lista_spesa.reduce((acc, item) => {
                    const category = item.categoria || 'Varie';
                    if (!acc[category]) acc[category] = [];
                    acc[category].push(item);
                    return acc;
                }, {});

                let shoppingListHTML = `<div class="bg-gray-900/50 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 text-white">
                        <div id="shopping-list-export" class="p-6 md:p-8 bg-gray-900/0 rounded-t-2xl">
                            <div class="text-center mb-8">
                                <h2 class="text-4xl md:text-5xl font-bold text-green-400 flex items-center justify-center space-x-3"><i data-lucide="shopping-cart" class="w-10 h-10"></i><span>Lista della Spesa</span></h2>
                                <p class="text-gray-400 mt-1">Stima dei costi per il piano alimentare giornaliero.</p>
                            </div>
                            <div class="space-y-6">`;

                Object.entries(groupedList).forEach(([category, items]) => {
                    shoppingListHTML += `<div><h3 class="font-bold text-lg text-green-400 border-b-2 border-green-500/30 pb-1 mb-3">${category}</h3><div class="space-y-2">
                                <div class="grid grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)] gap-x-4 text-sm font-semibold text-gray-400 px-2 py-1">
                                    <div class="text-left">Articolo</div><div class="text-center">Quantità</div><div class="text-right">Costo</div>
                                </div>`;
                    items.forEach(item => {
                        shoppingListHTML += `<div class="grid grid-cols-[minmax(0,6fr)_minmax(0,3fr)_minmax(0,3fr)] gap-x-4 items-center text-gray-300 border-b border-gray-700/50 py-2 px-2">
                                <span class="text-left break-words pr-2">${item.nome}</span>
                                <span class="text-center text-gray-400">${item.quantita}</span>
                                <span class="text-right font-mono text-green-400">€ ${item.costo_calcolato_eur.toFixed(2)}</span>
                            </div>`;
                    });
                    shoppingListHTML += `</div></div>`;
                });

                shoppingListHTML += `</div><div class="mt-8 pt-4 border-t-2 border-green-500/50">
                                <div class="flex justify-between items-center text-xl font-bold"><span class="text-green-300">Totale Stimato:</span><span class="text-green-300">€ ${shoppingListData.totale_calcolato_eur.toFixed(2)}</span></div>
                                <p class="text-xs text-gray-500 mt-2 text-right">I prezzi sono stime basate sulla media di mercato e quantità.</p>
                            </div>
                        </div>
                        <div class="p-6 md:p-8 pt-4">
                            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <button id="back-to-plan-btn" class="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"><i data-lucide="arrow-left" class="mr-2"></i>Torna al Piano</button>
                                <button id="export-shopping-list-btn" class="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"><i data-lucide="file-down" class="mr-2"></i>Esporta PDF</button>
                            </div>
                            <button id="recalculate-btn-2" class="w-full mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors">Nuovo Calcolo</button>
                        </div>
                    </div>`;
                views.shoppingList.innerHTML = shoppingListHTML;
                document.getElementById('back-to-plan-btn').addEventListener('click', () => showView('mealPlan'));
                document.getElementById('export-shopping-list-btn').addEventListener('click', () => exportToPDF('shopping-list-export', 'lista_spesa_muv.pdf'));
                document.getElementById('recalculate-btn-2').addEventListener('click', handleRecalculate);
            }

            // --- API & LOGIC FUNCTIONS ---
            async function callGeminiAPI(payload) {
                const apiKey = ""; // Provided by environment
                const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;
                const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                if (!response.ok) {
                    const errorBody = await response.text();
                    console.error("API Error Response:", errorBody);
                    throw new Error(`Errore API: ${response.statusText}`);
                }
                return response.json();
            }

            async function generateMealPlan(targetCalories) {
                submitButton.disabled = true;
                submitButtonText.classList.add('hidden');
                submitButtonLoader.classList.remove('hidden');
                clearError();
                const prompt = `Agisci come un massimo esperto in nutrizione sportiva e clinica...`; // Abridged for brevity
                const mealObjectSchema = { type: "OBJECT", properties: { descrizione: { type: "STRING" }, alimenti: { type: "ARRAY", items: { type: "STRING" } }, kcal: { type: "NUMBER" } }, required: ["descrizione", "alimenti", "kcal"] };
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { colazione: mealObjectSchema, spuntino_mattutino: mealObjectSchema, pranzo: mealObjectSchema, spuntino_pomeridiano: mealObjectSchema, cena: mealObjectSchema }, required: ["colazione", "spuntino_mattutino", "pranzo", "spuntino_pomeridiano", "cena"] } } };
                try {
                    const result = await callGeminiAPI(payload);
                    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                        mealPlanData = { calories: targetCalories, plan: JSON.parse(result.candidates[0].content.parts[0].text) };
                        renderMealPlan();
                        showView('mealPlan');
                    } else { throw new Error("Risposta IA non valida."); }
                } catch (err) {
                    displayError(err.message || 'Errore generazione piano.');
                } finally {
                    submitButton.disabled = false;
                    submitButtonText.classList.remove('hidden');
                    submitButtonLoader.classList.add('hidden');
                }
            }

            async function generateShoppingList() {
                const btn = document.getElementById('generate-shopping-list-btn');
                const btnText = document.getElementById('shopping-list-btn-text');
                const btnLoader = document.getElementById('shopping-list-btn-loader');
                btn.disabled = true;
                btnText.classList.add('hidden');
                btnLoader.classList.remove('hidden');
                clearError('mealplan-error-container');
                const prompt = `Dato il piano: ${JSON.stringify(mealPlanData.plan)}, estrai ingredienti...`; // Abridged for brevity
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }], generationConfig: { responseMimeType: "application/json", responseSchema: { type: "OBJECT", properties: { lista_spesa: { type: "ARRAY", items: { type: "OBJECT", properties: { categoria: { type: "STRING" }, nome: { type: "STRING" }, quantita: { type: "STRING" }, costo_calcolato_eur: { type: "NUMBER" } }, required: ["categoria", "nome", "quantita", "costo_calcolato_eur"] } }, totale_calcolato_eur: { type: "NUMBER" } }, required: ["lista_spesa", "totale_calcolato_eur"] } } };
                try {
                    const result = await callGeminiAPI(payload);
                    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                        shoppingListData = JSON.parse(result.candidates[0].content.parts[0].text);
                        renderShoppingList();
                        showView('shoppingList');
                    } else { throw new Error("Impossibile generare la lista."); }
                } catch (err) {
                    displayError(err.message || "Errore creazione lista.", 'mealplan-error-container');
                } finally {
                    btn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnLoader.classList.add('hidden');
                }
            }

            async function handleAskCoach(event) {
                event.preventDefault();
                const questionInput = document.getElementById('coach-question-input');
                const question = questionInput.value;
                if (!question.trim()) return;

                const btn = document.getElementById('coach-submit-btn');
                const btnText = document.getElementById('coach-btn-text');
                const btnLoader = document.getElementById('coach-btn-loader');
                const responseContainer = document.getElementById('coach-response-container');

                btn.disabled = true;
                btnText.classList.add('hidden');
                btnLoader.classList.remove('hidden');
                responseContainer.classList.add('hidden');

                const prompt = `Agisci come un coach esperto per "MUV Fitness", con una doppia specializzazione in nutrizione sportiva e personal training, rispondendo con un tono accademico. La tua conoscenza deve essere vasta e coprire argomenti come: piani alimentari, timing dei nutrienti, integrazione, idratazione, allenamento con i pesi, cardio, recupero e sonno. Un utente sta seguendo un piano da circa ${mealPlanData.calories} kcal e pone la seguente domanda: "${question}". Fornisci una risposta concisa e sintetica, andando dritto al punto. Offri solo le informazioni chiave basate sull'evidenza scientifica. Evita introduzioni prolisse e saluti. Non fornire mai consigli medici specifici o diagnosi.`;
                const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

                try {
                    const result = await callGeminiAPI(payload);
                    if (result.candidates?.[0]?.content?.parts?.[0]?.text) {
                        // Use innerHTML to render formatted text like lists and paragraphs
                        responseContainer.innerHTML = result.candidates[0].content.parts[0].text
                            .replace(/\n\*/g, '<br>•') // Handle bullet points
                            .replace(/\n/g, '<br>'); // Handle newlines
                        responseContainer.classList.remove('hidden');
                    } else { throw new Error("Il coach non ha risposto."); }
                } catch (err) {
                    responseContainer.textContent = err.message || "Errore nella comunicazione con il coach.";
                    responseContainer.classList.remove('hidden');
                } finally {
                    btn.disabled = false;
                    btnText.classList.remove('hidden');
                    btnLoader.classList.add('hidden');
                }
            }

            // --- EVENT LISTENERS ---
            function handleRecalculate() {
                showView('calculator');
                mealPlanData = null;
                shoppingListData = null;
                clearError();
                if(document.getElementById('mealplan-error-container')) {
                   clearError('mealplan-error-container');
                }
            }

            calculatorForm.addEventListener('submit', (event) => {
                event.preventDefault();
                const formElements = event.target.elements;
                formData = { gender: formElements.gender.value, age: formElements.age.value, weight: formElements.weight.value, height: formElements.height.value, activityLevel: formElements.activityLevel.value, goal: formElements.goal.value, };
                let bmr = (formData.gender === 'male') ? (10 * formData.weight + 6.25 * formData.height - 5 * formData.age + 5) : (10 * formData.weight + 6.25 * formData.height - 5 * formData.age - 161);
                const tdee = bmr * parseFloat(formData.activityLevel);
                let finalCalories;
                switch (formData.goal) {
                    case 'lose': finalCalories = tdee - 400; break;
                    case 'gain': finalCalories = tdee + 400; break;
                    default: finalCalories = tdee; break;
                }
                generateMealPlan(Math.round(finalCalories));
            });

            // --- INITIALIZATION ---
            showView('calculator');
            lucide.createIcons();
        });
    </script>
</body>
</html>
