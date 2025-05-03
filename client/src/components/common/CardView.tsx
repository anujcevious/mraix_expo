import React from 'react';
import { cn } from '@/lib/utils';

interface CardViewProps {
  children: React.ReactNode;
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}

const CardView: React.FC<CardViewProps> = ({
  children,
  className,
  header,
  footer
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg border border-border shadow-sm overflow-hidden",
      className
    )}>
      {header && (
        <div className="p-4 border-b border-border bg-gray-50">
          {header}
        </div>
      )}
      
      <div className="p-4">
        {children}
      </div>
      
      {footer && (
        <div className="p-4 border-t border-border bg-gray-50">
          {footer}
        </div>
      )}
    </div>
  );
};

export default CardView;
