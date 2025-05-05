
import { IconName } from "@/components/ui/Icons";

export interface SubMenuItem {
  id: string;
  label: string;
  path: string;
  icon?: IconName;
  isNew?: boolean;
}

export interface MenuItem {
  id: string;
  label: string;
  icon: IconName;
  path?: string;
  subItems?: SubMenuItem[];
}

export const menuData: MenuItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "home",
    path: "/"
  },
  {
    id: "sales",
    label: "Sales",
    icon: "shoppingCart",
    subItems: [
      { id: "customer", label: "Customer", path: "/sales/customer" },
      { id: "invoice", label: "Invoice", path: "/sales/invoice" },
      { id: "credit-note", label: "Credit Note", path: "/sales/credit-note" },
      { id: "receipt", label: "Receipt", path: "/sales/receipt" }
    ]
  },
  {
    id: "purchase",
    label: "Purchase",
    icon: "shoppingBag",
    subItems: [
      { id: "vendor", label: "Vendor", path: "/purchase/vendor" },
      { id: "purchase", label: "Purchase", path: "/purchase/purchase" },
      { id: "debit-note", label: "Debit Note", path: "/purchase/debit-note" },
      { id: "payment", label: "Payment", path: "/purchase/payment" }
    ]
  },
  {
    id: "reports",
    label: "Reports",
    icon: "pieChart",
    subItems: [
      { id: "sales-report", label: "Sales Report", path: "/report/sales" },
      { id: "purchase-report", label: "Purchase Report", path: "/report/purchase" },
      { id: "tax-report", label: "Tax Report", path: "/report/tax" },
      { 
        id: "profit-loss", 
        label: "Profit & Loss", 
        path: "/report/profit-loss",
        isNew: true 
      }
    ]
  },
  {
    id: "settings",
    label: "Settings",
    icon: "users",
    path: "/settings"
  },
  {
    id: "communication",
    label: "Communication",
    icon: "messageSquare",
    path: "/communication"
  },
  {
    id: "help",
    label: "Help & Support",
    icon: "helpCircle",
    path: "/help"
  }
];
