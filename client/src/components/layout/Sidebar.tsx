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
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
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
                          {isExpanded && <span>{item.label}</span>}
                          {isExpanded && (
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto p-0 h-4 w-4 text-primary"
                              onClick={(e) => handlePinItem(e, item)}
                            >
                              <Pin className="h-3 w-3" />
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
            {/* Dashboard */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/">
                    <a
                      className={`py-2 px-2 rounded-md ${isActive("/") ? "bg-light-bg-color text-primary" : "text-primarytext hover:bg-gray-100"} flex items-center space-x-2 font-medium`}
                    >
                      <Home className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Dashboard</span>}
                    </a>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Dashboard</TooltipContent>
                )}
              </Tooltip>
            </li>

            {/* Sales */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`py-2 px-2 rounded-md text-primarytext hover:bg-gray-100 flex items-center justify-between cursor-pointer`}
                    onClick={() => toggleMenu("sales")}
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Sales</span>}
                    </div>
                    {isExpanded &&
                      (expandedMenus.includes("sales") ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </div>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Sales</TooltipContent>
                )}
              </Tooltip>

              {isExpanded && expandedMenus.includes("sales") && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <Link href="/sales/customer">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/sales/customer") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Customer
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sales/invoice">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/sales/invoice") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm flex items-center justify-between`}
                      >
                        <span>Invoice</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 text-gray-400 hover:text-primary"
                          onClick={(e) =>
                            handlePinItem(e, {
                              id: "invoice",
                              path: "/sales/invoice",
                              label: "Invoices",
                              icon: "shopping-cart",
                              parent: "sales",
                            })
                          }
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sales/credit-note">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/sales/credit-note") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm flex items-center justify-between`}
                      >
                        <span>Credit Note</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 text-gray-400 hover:text-primary"
                          onClick={(e) =>
                            handlePinItem(e, {
                              id: "credit-note",
                              path: "/sales/credit-note",
                              label: "Credit Note",
                              icon: "shopping-cart",
                              parent: "sales",
                            })
                          }
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/sales/receipt">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/sales/receipt") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Receipt
                      </a>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Purchase */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`py-2 px-2 rounded-md text-primarytext hover:bg-gray-100 flex items-center justify-between cursor-pointer`}
                    onClick={() => toggleMenu("purchase")}
                  >
                    <div className="flex items-center space-x-2">
                      <ShoppingBag className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Purchase</span>}
                    </div>
                    {isExpanded &&
                      (expandedMenus.includes("purchase") ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </div>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Purchase</TooltipContent>
                )}
              </Tooltip>

              {isExpanded && expandedMenus.includes("purchase") && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <Link href="/purchase/vendor">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/purchase/vendor") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Vendor
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/purchase/purchase">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/purchase/purchase") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Purchase
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/purchase/debit-note">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/purchase/debit-note") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm flex items-center justify-between`}
                      >
                        <span>Debit Note</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 text-gray-400 hover:text-primary"
                          onClick={(e) =>
                            handlePinItem(e, {
                              id: "debit-note",
                              path: "/purchase/debit-note",
                              label: "Debit Note",
                              icon: "shopping-bag",
                              parent: "purchase",
                            })
                          }
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/purchase/payment">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/purchase/payment") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Payment
                      </a>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Reports */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className={`py-2 px-2 rounded-md text-primarytext hover:bg-gray-100 flex items-center justify-between cursor-pointer`}
                    onClick={() => toggleMenu("reports")}
                  >
                    <div className="flex items-center space-x-2">
                      <PieChart className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Reports</span>}
                    </div>
                    {isExpanded &&
                      (expandedMenus.includes("reports") ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      ))}
                  </div>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Reports</TooltipContent>
                )}
              </Tooltip>

              {isExpanded && expandedMenus.includes("reports") && (
                <ul className="pl-7 mt-1 space-y-1">
                  <li>
                    <Link href="/report/sales">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/report/sales") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Sales Report
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/report/purchase">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/report/purchase") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm`}
                      >
                        Purchase Report
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/report/tax">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/report/tax") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm flex items-center justify-between`}
                      >
                        <span>Tax Report</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-4 w-4 p-0 text-gray-400 hover:text-primary"
                          onClick={(e) =>
                            handlePinItem(e, {
                              id: "tax-report",
                              path: "/report/tax",
                              label: "Tax Report",
                              icon: "pie-chart",
                              parent: "reports",
                            })
                          }
                        >
                          <Pin className="h-3 w-3" />
                        </Button>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href="/report/profit-loss">
                      <a
                        className={`block py-1 px-2 rounded-md ${isActive("/report/profit-loss") ? "bg-light-bg-color text-primary" : "text-secondarytext hover:bg-gray-100"} text-sm relative`}
                      >
                        <div className="flex justify-between items-center">
                          <span>Profit & Loss</span>
                          <div className="bg-primary text-white text-[10px] px-1 py-0.5 rounded">
                            New
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/settings">
                    <a
                      className={`py-2 px-2 rounded-md ${isActive("/settings") ? "bg-light-bg-color text-primary" : "text-primarytext hover:bg-gray-100"} flex items-center space-x-2`}
                    >
                      <Users className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Settings</span>}
                    </a>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Settings</TooltipContent>
                )}
              </Tooltip>
            </li>

            {/* Communication */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/communication">
                    <a
                      className={`py-2 px-2 rounded-md ${isActive("/communication") ? "bg-light-bg-color text-primary" : "text-primarytext hover:bg-gray-100"} flex items-center space-x-2`}
                    >
                      <MessageSquare className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Communication</span>}
                    </a>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Communication</TooltipContent>
                )}
              </Tooltip>
            </li>

            {/* Help */}
            <li className="mb-1 px-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/help">
                    <a
                      className={`py-2 px-2 rounded-md ${isActive("/help") ? "bg-light-bg-color text-primary" : "text-primarytext hover:bg-gray-100"} flex items-center space-x-2`}
                    >
                      <HelpCircle className="h-5 w-5 min-w-5" />
                      {isExpanded && <span>Help & Support</span>}
                    </a>
                  </Link>
                </TooltipTrigger>
                {!isExpanded && (
                  <TooltipContent side="right">Help & Support</TooltipContent>
                )}
              </Tooltip>
            </li>
          </ul>
        </div>

        {/* User Profile & App Version */}
        {isExpanded && (
          <div className="p-4 border-t border-border">
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-start">
                <Icons name="HelpCircle" className="h-5 w-5 text-primary" />
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
