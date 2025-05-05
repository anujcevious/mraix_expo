
import { MenuItem } from "@/lib/slices/favoritesSlice";

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  isNew?: boolean;
}

export interface MainMenuItem {
  id: string;
  label: string;
  icon: string;
  path?: string;
  subItems?: SubMenuItem[];
}

export const menuData: MainMenuItem[] = [
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
      { id: "purchase-report", label: "Purchase Report", path: "/report/purchase" },
      { id: "tax-report", label: "Tax Report", path: "/report/tax" },
      { id: "profit-loss", label: "Profit & Loss", path: "/report/profit-loss", isNew: true },
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

export const getMenuItemById = (id: string): MenuItem | undefined => {
  // Search through main items
  const mainItem = menuData.find(item => item.id === id);
  if (mainItem) {
    return {
      id: mainItem.id,
      label: mainItem.label,
      path: mainItem.path || '',
      icon: mainItem.icon,
    };
  }

  // Search through sub items
  for (const item of menuData) {
    if (item.subItems) {
      const subItem = item.subItems.find(sub => sub.id === id);
      if (subItem) {
        return {
          id: subItem.id,
          label: subItem.label,
          path: subItem.path,
          icon: item.icon,
          parent: item.id,
        };
      }
    }
  }

  return undefined;
};
