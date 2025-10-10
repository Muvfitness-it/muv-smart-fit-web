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
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          
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
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-primary">
                  <th className="text-left p-4 font-semibold text-foreground">Caratteristica</th>
                  <th className="text-center p-4 font-semibold text-muted-foreground">Palestra Tradizionale</th>
                  <th className="text-center p-4 font-semibold bg-gradient-to-br from-primary/10 to-accent/10 text-primary">
                    MUV Fitness
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-border transition-colors hover:bg-muted/20 ${
                      row.highlight ? 'bg-accent/5' : ''
                    }`}
                  >
                    <td className={`p-4 font-medium ${row.highlight ? 'text-accent font-semibold' : 'text-foreground'}`}>
                      {row.feature}
                    </td>
                    <td className="text-center p-4">
                      {typeof row.traditional === 'boolean' ? (
                        row.traditional ? (
                          <Check className="w-5 h-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-body-sm text-muted-foreground">{row.traditional}</span>
                      )}
                    </td>
                    <td className="text-center p-4 bg-gradient-to-br from-primary/5 to-accent/5">
                      {typeof row.muv === 'boolean' ? (
                        row.muv ? (
                          <Check className="w-6 h-6 text-primary mx-auto" strokeWidth={2.5} />
                        ) : (
                          <X className="w-5 h-5 text-muted-foreground mx-auto" />
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
          <div className="md:hidden space-y-4">
            {rows.map((row, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  row.highlight 
                    ? 'border-accent bg-accent/5' 
                    : 'border-primary/20 bg-background'
                }`}
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
                        <Check className="w-6 h-6 text-primary" strokeWidth={2.5} />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground" />
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
