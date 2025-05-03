import React from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { cn } from '@/lib/utils';

interface ContentWrapperProps {
  children: React.ReactNode;
}

const ContentWrapper: React.FC<ContentWrapperProps> = ({ children }) => {
  const { isExpanded } = useSidebar();
  
  return (
    <main 
      className={cn(
        "flex-1 pt-16 lg:pl-64 transition-all duration-300",
        isExpanded ? "lg:pl-64" : "lg:pl-20"
      )}
    >
      <div className="p-4 md:p-6 max-w-full overflow-hidden">
        {children}
      </div>
    </main>
  );
};

export default ContentWrapper;
