// components/Breadcrumbs.tsx
import Link from "next/link";
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {    
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-slate-500 overflow-x-auto whitespace-nowrap">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center space-x-2">
              {index > 0 && <span className="text-slate-300">/</span>}

              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="hover:text-amber-700 transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-amber-300" aria-current="page">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}