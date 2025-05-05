import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import {
  toggleSidebar,
  expandSidebar,
  collapseSidebar,
} from "@/lib/slices/sidebarSlice";
import {
  addFavorite,
  removeFavorite,
  MenuItem,
} from "@/lib/slices/favoritesSlice";
import {
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  Menu,
  Star,
  Home,
  ShoppingCart,
  ShoppingBag,
  PieChart,
  Users,
  MessageSquare,
  Pin,
  X,
  FileText,
  CreditCard,
  RefreshCw,
  HelpCircle,
  DollarSign,
  MoreVertical,
  Printer,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from "@/hooks/use-mobile";
import Icons from "../ui/Icons";

const menuData = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "Home",
    path: "/",
  },
  {
    id: "sales",
    label: "Sales",
    icon: "ShoppingCart",
    subItems: [
      { id: "customer", label: "Customer", path: "/sales/customer" },
      { id: "invoice", label: "Invoice", path: "/sales/invoice" },
      { id: "credit-note", label: "Credit Note", path: "/sales/credit-note" },
      { id: "receipt", label: "Receipt", path: "/sales/receipt" },
    ],
  },
  {
    id: "purchase",
    label: "Purchase",
    icon: "ShoppingBag",
    subItems: [
      { id: "vendor", label: "Vendor", path: "/purchase/vendor" },
      { id: "purchase", label: "Purchase", path: "/purchase/purchase" },
      { id: "debit-note", label: "Debit Note", path: "/purchase/debit-note" },
      { id: "payment", label: "Payment", path: "/purchase/payment" },
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: "PieChart",
    subItems: [
      { id: "sales-report", label: "Sales Report", path: "/report/sales" },
      {
        id: "purchase-report",
        label: "Purchase Report",
        path: "/report/purchase",
      },
      { id: "tax-report", label: "Tax Report", path: "/report/tax" },
      {
        id: "profit-loss",
        label: "Profit & Loss",
        path: "/report/profit-loss",
        isNew: true,
      },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: "Users",
    path: "/settings",
  },
  {
    id: "communication",
    label: "Communication",
    icon: "MessageSquare",
    path: "/communication",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: "HelpCircle",
    path: "/help",
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const [location] = useLocation();
  const { isExpanded } = useSelector((state: RootState) => state.sidebar);
  const { favorites } = useSelector((state: RootState) => state.favorites);
  const { user } = useSelector((state: RootState) => state.auth);

  const isMobile = useIsMobile();
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
    if (isMobile) {
      setIsMobileOpen(!isMobileOpen);
    } else {
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

  const renderMenuIcon = (icon: string) => {
    switch (icon) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "shopping-cart":
        return <ShoppingCart className="h-5 w-5" />;
      case "shopping-bag":
        return <ShoppingBag className="h-5 w-5" />;
      case "pie-chart":
        return <PieChart className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "message-square":
        return <MessageSquare className="h-5 w-5" />;
      default:
        return <Home className="h-5 w-5" />;
    }
  };

  // Determine which classes to use based on mobile vs desktop state
  const sidebarClasses = isMobile
    ? `bg-white border-r border-gray-200 h-full shadow-md flex flex-col ${isMobileOpen ? "sidebar-mobile-open sidebar-expanded" : "sidebar-mobile-closed"}`
    : `relative bg-white border-r border-gray-200 h-full transition-all duration-300 ease-in-out shadow-md flex flex-col ${isExpanded ? "sidebar-expanded" : "sidebar-collapsed"}`;

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isMobile && isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={handleCloseMobileSidebar}
        />
      )}

      <div className={sidebarClasses}>
        {/* Side Arrow for Quick Toggle (Fixed to the right side of sidebar) - Desktop only */}
        {!isMobile && (
          <div className="absolute -right-3.5 top-5 z-10 bg-white border border-gray-200 rounded-full shadow-md p-0.5 sidebar-toggle-btn">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 p-0 rounded-full hover:bg-gray-100 text-primary"
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
              <h3 className="text-xs font-semibold text-text-secondary uppercase">
                Favorites
              </h3>
            )}
            {/* <Star className="h-4 w-4 text-yellow-500" />
             */}
          </div>

          <div id="favorites-container" className="text-sm">
            {favorites.length > 0
              ? favorites.map((item) => (
                  <Tooltip key={item.id}>
                    <TooltipTrigger asChild>
                      <Link href={item.path}>
                        <a
                          className={`py-1 px-2 rounded-md ${isActive(item.path) ? "bg-light-bg-color text-primary" : "text-primarytext hover:bg-light-bg-color"} flex items-center space-x-2 mb-1`}
                        >
                          {renderMenuIcon(item.icon)}
                          {isExpanded && (
                            <span className="text-sm">{item.label}</span>
                          )}
                          {isExpanded && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto p-0 h-4 w-4 text-primary"
                              onClick={(e) => handlePinItem(e, item)}
                            >
                              <Pin className="h-3 w-3 mr-auto bg-yellow" />
                            </Button>
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
                  <div className="text-xs text-text-muted italic py-1 px-1">
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
                        className={`py-2 px-2 rounded-md text-primarytext hover:bg-gray-100 flex items-center justify-between cursor-pointer`}
                        onClick={() => toggleMenu(item.id)}
                      >
                        <div className="flex items-center space-x-2">
                          <Icons name={item.icon} />
                          {isExpanded && (
                            <span className="text-sm text-primarytext">
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
                          className={`py-2 px-2 rounded-md ${isActive(item.path || "/") ? "bg-light-bg-color text-primary" : "text-primarytext hover:bg-gray-100"} flex items-center space-x-2`}
                        >
                          <Icons name={item.icon} />
                          {isExpanded && (
                            <span className="text-sm">{item.label}</span>
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
                              className={`block py-1 px-2 rounded-md ${
                                isActive(subItem.path)
                                  ? "bg-light-bg-color text-primary"
                                  : "text-secondarytext hover:bg-gray-100"
                              } text-sm flex items-center justify-between`}
                            >
                              <span>{subItem.label}</span>
                              {subItem.isNew && (
                                <div className="bg-primary text-white text-[10px] px-1 py-0.5 rounded">
                                  New
                                </div>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-4 w-4 p-0 text-gray-400 hover:text-primary"
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
                  <h4 className="text-sm font-medium">Need help?</h4>
                  <p className="text-xs text-gray-500 mt-1">
                    Check our documentation
                  </p>
                  <a
                    href="#"
                    className="text-xs text-primary hover:underline mt-2 inline-block"
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
