import { Check, X } from 'lucide-react';

export interface ComparisonRow {
  feature: string;
  traditional: boolean | string;
  muv: boolean | string;
  highlight?: boolean;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  title?: string;
  description?: string;
}

const ComparisonTable = ({ 
  rows,
  title = "MUV vs Palestra Tradizionale",
  description = "Scopri cosa ci rende unici"
}: ComparisonTableProps) => {
  return (
    <section className="section-padding bg-muted/30" aria-label="Confronto MUV vs Palestra Tradizionale">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto animate-fade-in">
          
          <h2 className="text-heading-lg text-center mb-4">
            {title}
          </h2>
          
          {description && (
            <p className="text-body-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              {description}
            </p>
          )}
          
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border-collapse" role="table" aria-label="Tabella comparativa servizi">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th scope="col" className="text-left p-4 font-semibold text-foreground">Caratteristica</th>
                  <th scope="col" className="text-center p-4 font-semibold text-muted-foreground">Palestra Tradizionale</th>
                  <th scope="col" className="text-center p-4 font-semibold bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                    MUV Fitness
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border transition-all duration-300 hover:bg-muted/20 animate-fade-in ${
                      row.highlight ? 'bg-accent/5' : ''
                    }`}
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className={`p-4 font-medium ${row.highlight ? 'text-accent font-semibold' : 'text-foreground'}`}>
                      {row.feature}
                    </td>
                    <td className="text-center p-4">
                      {typeof row.traditional === 'boolean' ? (
                        row.traditional ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" aria-label="Disponibile" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" aria-label="Non disponibile" />
                        )
                      ) : (
                        <span className="text-body-sm text-muted-foreground">{row.traditional}</span>
                      )}
                    </td>
                    <td className="text-center p-4 bg-gradient-to-br from-primary/5 to-accent/5">
                      {typeof row.muv === 'boolean' ? (
                        row.muv ? (
                          <Check className="w-6 h-6 text-primary mx-auto transition-transform hover:scale-110" strokeWidth={2.5} aria-label="Incluso" />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" aria-label="Non incluso" />
                        )
                      ) : (
                        <span className="text-body-sm font-semibold text-primary">{row.muv}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile View - Only MUV Column */}
          <div className="md:hidden space-y-4" role="list" aria-label="Lista servizi MUV">
            {rows.map((row, index) => (
              <div 
                key={index}
                role="listitem"
                className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-lg animate-fade-in ${
                  row.highlight 
                    ? 'border-accent bg-accent/5' 
                    : 'border-primary/20 bg-background'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`font-medium flex-1 ${
                    row.highlight ? 'text-accent' : 'text-foreground'
                  }`}>
                    {row.feature}
                  </span>
                  <div className="flex-shrink-0">
                    {typeof row.muv === 'boolean' ? (
                      row.muv ? (
                        <Check className="w-6 h-6 text-primary transition-transform hover:scale-110" strokeWidth={2.5} aria-label="Incluso" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" aria-label="Non incluso" />
                      )
                    ) : (
                      <span className="text-sm font-semibold text-primary">{row.muv}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;
