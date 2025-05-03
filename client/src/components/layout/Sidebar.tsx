import React, { useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { useSidebar } from '@/context/SidebarContext';
import { MENU_ITEMS } from '@/constants/menu';
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, ChevronUpIcon, HelpIcon } from '@/assets/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const { isExpanded, toggleSidebar, isMobileOpen, closeMobileSidebar, openSubmenu, toggleSubmenu } = useSidebar();
  const [location] = useLocation();

  // Close mobile sidebar when route changes
  useEffect(() => {
    closeMobileSidebar();
  }, [location, closeMobileSidebar]);

  // Backdrop for mobile sidebar
  const renderBackdrop = () => {
    if (!isMobileOpen) return null;
    
    return (
      <div 
        className="fixed inset-0 bg-black/30 z-30 lg:hidden" 
        onClick={closeMobileSidebar}
      />
    );
  };

  const isActiveRoute = (path?: string) => {
    if (!path) return false;
    return location === path;
  };

  const isActiveSubmenu = (submenuItems: any[]) => {
    return submenuItems.some(item => isActiveRoute(item.path));
  };

  return (
    <>
      {renderBackdrop()}
      <aside 
        className={cn(
          "bg-white border-r border-border fixed top-16 left-0 bottom-0 z-40 transition-all duration-300 transform",
          isExpanded ? "w-64" : "w-20",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Toggle */}
          <div className="lg:flex items-center justify-end p-4 hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-md hover:bg-background"
            >
              {isExpanded ? <ChevronLeftIcon className="h-5 w-5" /> : <ChevronRightIcon className="h-5 w-5" />}
            </Button>
          </div>
          
          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto py-2 px-3">
            {MENU_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = item.submenu 
                ? isActiveSubmenu(item.submenu)
                : isActiveRoute(item.path);
              
              // Single menu item without submenu
              if (!item.submenu) {
                return (
                  <Link 
                    key={item.name} 
                    href={item.path || '#'} 
                    className={cn(
                      "flex items-center space-x-3 px-3 py-2.5 mb-1 rounded-md",
                      isActive 
                        ? "text-primary bg-primary/10" 
                        : "text-gray-500 hover:bg-background"
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    {isExpanded && <span className="font-medium">{item.name}</span>}
                  </Link>
                );
              }
              
              // Item with submenu
              const isSubmenuOpen = openSubmenu === item.name;
              return (
                <div key={item.name} className="mb-1">
                  <div 
                    className={cn(
                      "flex items-center justify-between px-3 py-2 text-sm cursor-pointer rounded-md",
                      isActive ? "text-primary" : "text-gray-500 hover:bg-background"
                    )}
                    onClick={() => toggleSubmenu(item.name)}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      {isExpanded && <span>{item.name}</span>}
                    </div>
                    {isExpanded && (
                      isSubmenuOpen ? <ChevronUpIcon className="h-4 w-4" /> : <ChevronDownIcon className="h-4 w-4" />
                    )}
                  </div>
                  
                  {isSubmenuOpen && isExpanded && (
                    <div className="pl-10 py-1">
                      {item.submenu.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.path}
                          className={cn(
                            "block px-3 py-2 text-sm rounded-md",
                            isActiveRoute(subItem.path)
                              ? "text-primary bg-primary/10"
                              : "hover:bg-background"
                          )}
                        >
                          <span>{subItem.name}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
          
          {/* Sidebar Footer */}
          {isExpanded && (
            <div className="p-4 border-t border-border">
              <div className="bg-background rounded-lg p-3">
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
                    <HelpIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">Need help?</h4>
                    <p className="text-xs text-gray-500 mt-1">Check our documentation</p>
                    <a href="#" className="text-xs text-primary hover:underline mt-2 inline-block">
                      View Documentation
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
