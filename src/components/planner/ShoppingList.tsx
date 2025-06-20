
import React from 'react';
import { ShoppingCart, ArrowLeft, FileDown } from 'lucide-react';

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

interface ShoppingListProps {
  shoppingListData: ShoppingListData;
  onBackToMealPlan: () => void;
  onExportPDF: (elementId: string, fileName: string) => void;
  onRecalculate: () => void;
}

const ShoppingList: React.FC<ShoppingListProps> = ({
  shoppingListData,
  onBackToMealPlan,
  onExportPDF,
  onRecalculate
}) => {
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
            onClick={onBackToMealPlan}
            className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
          >
            <ArrowLeft className="mr-2" />
            Torna al Piano
          </button>
          <button
            onClick={() => onExportPDF('shopping-list-export', 'lista_spesa_muv.pdf')}
            className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-all"
          >
            <FileDown className="mr-2" />
            Esporta PDF
          </button>
        </div>
        <button
          onClick={onRecalculate}
          className="w-full mt-4 bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
        >
          Nuovo Calcolo
        </button>
      </div>
    </div>
  );
};

export default ShoppingList;
