import React, { createContext, useState, useContext, useEffect } from 'react';
import { useMobile } from '@/hooks/use-mobile';

interface SidebarContextProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
  isMobileOpen: boolean;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
  openSubmenu: string | null;
  toggleSubmenu: (menuName: string) => void;
}

const SidebarContext = createContext<SidebarContextProps>({
  isExpanded: true,
  toggleSidebar: () => {},
  isMobileOpen: false,
  toggleMobileSidebar: () => {},
  closeMobileSidebar: () => {},
  openSubmenu: null,
  toggleSubmenu: () => {}
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>('Sales'); // Default open submenu
  const isMobile = useMobile();

  useEffect(() => {
    // Close mobile sidebar when transitioning from mobile to desktop
    if (!isMobile && isMobileOpen) {
      setIsMobileOpen(false);
    }
    
    // Auto-collapse sidebar on small screens that aren't mobile
    if (!isMobile && window.innerWidth < 1280 && isExpanded) {
      setIsExpanded(false);
    }
  }, [isMobile, isMobileOpen]);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileOpen(false);
  };

  const toggleSubmenu = (menuName: string) => {
    setOpenSubmenu(openSubmenu === menuName ? null : menuName);
  };

  return (
    <SidebarContext.Provider
      value={{
        isExpanded,
        toggleSidebar,
        isMobileOpen,
        toggleMobileSidebar,
        closeMobileSidebar,
        openSubmenu,
        toggleSubmenu
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
