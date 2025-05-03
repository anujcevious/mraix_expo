import React from 'react';
import { Link } from 'wouter';
import { ChevronRightIcon } from '@/assets/icons';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  if (!items.length) return null;

  return (
    <div className="mb-4">
      <div className="flex items-center text-sm text-gray-500">
        <Link href="/" className="hover:text-primary">
          Home
        </Link>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <React.Fragment key={`${item.label}-${index}`}>
              <ChevronRightIcon className="h-4 w-4 mx-1" />
              
              {isLast ? (
                <span className="text-foreground font-medium">{item.label}</span>
              ) : (
                <Link href={item.path || '#'} className="hover:text-primary">
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs;
