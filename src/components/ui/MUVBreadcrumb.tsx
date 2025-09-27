// Breadcrumb MUV - Specifiche: visibile sotto barra, font 14px, grigio #6B7280
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface MUVBreadcrumbProps {
  items: BreadcrumbItem[];
}

const MUVBreadcrumb = ({ items }: MUVBreadcrumbProps) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 bg-gray-50 border-b">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-400 mx-2" />
              )}
              {item.path ? (
                <Link
                  to={item.path}
                  className="text-gray-500 hover:text-primary transition-colors"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '14px',
                    color: '#6B7280'
                  }}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  className="text-gray-700 font-medium"
                  style={{ 
                    fontFamily: 'Poppins', 
                    fontSize: '14px',
                    color: '#6B7280'
                  }}
                >
                  {item.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default MUVBreadcrumb;