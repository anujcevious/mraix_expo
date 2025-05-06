import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store/store";
import {
  toggleSidebar,
  collapseSidebar,
} from "../../../../store/silce/sidebarSlice";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Pin,
} from "lucide-react";
import Button from "@/components/ui/Button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import Icons from "../ui/Icons";

import { menuData } from "@/lib/menudata";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const isMobile = useIsMobile();
  const dispatch = useDispatch();
  const [location] = useLocation();
  const isExpanded = useSelector((state: RootState) => state.globalSetting.isExpanded);
  const { items: favorites } = useSelector(
    (state: RootState) => state.favorites,
  );
  const { user } = useSelector((state: RootState) => state.auth);
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["sales"]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Handle window resize for mobile/desktop transitions
  useEffect(() => {
    if (isMobile) {
      dispatch(collapseSidebar());
    } else {
      // If returning to desktop from mobile view, ensure sidebar is visible
      setIsMobileOpen(false);
    }
  }, [isMobile, dispatch]);

  const handleToggleSidebar = () => {
    if (!isMobile) {
      dispatch(toggleSidebar());
    }
  };

  const handleCloseMobileSidebar = () => {
    if (isMobile) {
      setIsMobileOpen(false);
    }
  };

  const toggleMenu = (menu: string) => {
    if (expandedMenus.includes(menu)) {
      setExpandedMenus(expandedMenus.filter((item) => item !== menu));
    } else {
      setExpandedMenus([...expandedMenus, menu]);
    }
  };

  const handlePinItem = (e: React.MouseEvent, item: MenuItem) => {
    e.preventDefault();
    e.stopPropagation();
    if (favorites.some((fav) => fav.id === item.id)) {
      dispatch(removeFavorite(item.id));
    } else {
      dispatch(addFavorite(item));
    }
  };

  const isActive = (path: string) => {
    return location === path;
  };

  // Determine which classes to use based on mobile vs desktop state
  const sidebarClasses = isMobile
    ? `fixed bg-white border-r border-gray-200 h-full shadow-md flex flex-col z-50 transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"} ${isExpanded ? "w-60" : "w-16"}`
    : `relative bg-white border-r border-gray-200 h-full transition-all duration-300 ease-in-out shadow-md flex flex-col ${isExpanded ? "w-60" : "w-16"}`;

  return (
    <>
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      <div className={sidebarClasses}>
        {/* Side Arrow for Quick Toggle (Fixed to the right side of sidebar) - Desktop only */}
        {!isMobile && (
          <div className="absolute -right-3.5 top-5 z-10 bg-white border border-gray-200 rounded-full shadow-md p-0.5 sidebar-toggle-btn">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-0 rounded-full hover:bg-primary/5 text-primary"
              onClick={handleToggleSidebar}
              aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isExpanded ? (
                <ChevronLeft className="h-2 w-2" />
              ) : (
                <ChevronRight className="h-2 w-2" />
              )}
            </Button>
          </div>
        )}

        {/* Favorites Section */}
        <div className="p-3 border-b">
          <div className="flex items-center justify-between mb-2">
            {isExpanded && (
              <h3 className="text-xxs font-semibold text-text-secondary uppercase">
                Favorites
              </h3>
            )}
            {/* <Star className="h-4 w-4 text-yellow-500" />
             */}
          </div>

          <div id="favorites-container" className="text-sm">
            {favorites.length > 0
              ? favorites.map((item) => (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>
                      <Link href={item.href}>
                        <a
                          className={`py-1 flex justify-between px-2 rounded-md ${isActive(item.href) ? "bg-primary text-white font-semibold" : "text-primarytext hover:bg-primary/5"} flex items-center space-x-2 mb-1`}
                        >
                          <div className="flex gap-2">
                            <Icons name={item.icon} />
                            {isExpanded && (
                              <span className="text-xs">{item.label}</span>
                            )}
                          </div>
                          {isExpanded && (
                            <div className="flex justify-end p-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="ml-auto p-0 h-4 w-4 text-primary"
                                onClick={(e) => handlePinItem(e, item)}
                              >
                                <Pin className="h-3 w-3 mr-auto bg-yellow" />
                              </Button>
                            </div>
                          )}
                        </a>
                      </Link>
                    </TooltipTrigger>
                    {!isExpanded && (
                      <TooltipContent side="right">{item.label}</TooltipContent>
                    )}
                  </Tooltip>
                ))
              : isExpanded && (
                  <div className="text-xs text-text-muted py-1 px-1">
                    Pin submenu pages for quick access
                  </div>
                )}
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-grow overflow-y-auto py-2">
          <ul>
            {menuData.map((item) => (
              <li key={item.id} className="mb-1 px-3">
                <Tooltip>
                  <TooltipTrigger asChild>
                    {item.subItems ? (
                      <div
                        className={`py-2 px-2 rounded-md text-primarytext hover:bg-primary/5 flex items-center justify-between cursor-pointer`}
                        onClick={() => toggleMenu(item.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Icons name={item.icon} />
                          {isExpanded && (
                            <span className="text-xs text-primarytext">
                              {item.label}
                            </span>
                          )}
                        </div>
                        {isExpanded &&
                          (expandedMenus.includes(item.id) ? (
                            <ChevronDown className="h-3 w-3" />
                          ) : (
                            <ChevronRight className="h-3 w-3" />
                          ))}
                      </div>
                    ) : (
                      <Link href={item.path || "/"}>
                        <a
                          className={`py-2 px-2 rounded-md ${isActive(item.path || "/") ? "bg-primary text-white font-semibold" : "text-primarytext hover:bg-primary/5"} flex items-center space-x-2`}
                        >
                          <Icons name={item.icon} className="" />
                          {isExpanded && (
                            <span className="text-xs ">{item.label}</span>
                          )}
                        </a>
                      </Link>
                    )}
                  </TooltipTrigger>
                  {!isExpanded && (
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  )}
                </Tooltip>

                {isExpanded &&
                  item.subItems &&
                  expandedMenus.includes(item.id) && (
                    <ul className="pl-7 mt-1 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <Link href={subItem.path}>
                            <a
                              className={`block py-2 px-2 rounded-md ${
                                isActive(subItem.path)
                                  ? "bg-primary text-white"
                                  : "text-secondarytext hover:bg-primary/5"
                              } text-sm flex items-center justify-between`}
                            >
                              <span className="text-xs">{subItem.label}</span>
                              {subItem.isNew && (
                                <div className="bg-primary text-white text-[10px] px-1 py-0.5 rounded">
                                  New
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 "
                                onClick={(e) =>
                                  handlePinItem(e, {
                                    id: subItem.id,
                                    path: subItem.path,
                                    label: subItem.label,
                                    icon: item.icon,
                                    parent: item.id,
                                  })
                                }
                              >
                                <Pin className="h-3 w-3" />
                              </Button>
                            </a>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
              </li>
            ))}
          </ul>
        </div>

        {/* User Profile & App Version */}
        {isExpanded && (
          <div className="p-2 border-t border-border">
            <div className="bg-background rounded-lg p-3">
              <div className="flex gap-2 items-start">
                <Icons name="HelpCircle" className="text-primary" />
                <div>
                  <h4 className="text-xs font-medium">Need help?</h4>
                  <p className="text-xxs text-gray-500 mt-1">
                    Check our documentation
                  </p>
                  <a
                    href="#"
                    className="text-xxs text-primary hover:underline mt-2 inline-block"
                  >
                    View Documentation
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
