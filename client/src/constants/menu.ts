import {
  DashboardIcon,
  SalesIcon,
  PurchaseIcon,
  InventoryIcon,
  ReportsIcon,
  CommunicationIcon,
  CollaborationIcon,
  AccountIcon
} from '../assets/icons';

export interface SubMenuItem {
  name: string;
  path: string;
}

export interface MenuItem {
  name: string;
  icon: any;
  path?: string;
  submenu?: SubMenuItem[];
}

export const MENU_ITEMS: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: DashboardIcon,
    path: '/'
  },
  {
    name: 'Sales',
    icon: SalesIcon,
    submenu: [
      { name: 'Customers', path: '/sales/customers' },
      { name: 'Invoices', path: '/sales/invoices' }
    ]
  },
  {
    name: 'Purchase',
    icon: PurchaseIcon,
    submenu: [
      { name: 'Suppliers', path: '/purchase/suppliers' },
      { name: 'Bills', path: '/purchase/bills' }
    ]
  },
  {
    name: 'Inventory',
    icon: InventoryIcon,
    submenu: [
      { name: 'Products', path: '/inventory/products' },
      { name: 'Stock', path: '/inventory/stock' }
    ]
  },
  {
    name: 'Reports',
    icon: ReportsIcon,
    path: '/reports'
  },
  {
    name: 'Communication',
    icon: CommunicationIcon,
    path: '/communication'
  },
  {
    name: 'Collaboration',
    icon: CollaborationIcon,
    path: '/collaboration'
  },
  {
    name: 'Account',
    icon: AccountIcon,
    path: '/account'
  }
];

export const COMPANIES = [
  { name: 'MrAix Expo', id: 1 },
  { name: 'MrAix Solutions', id: 2 },
  { name: 'MrAix Technologies', id: 3 }
];

export const TIME_PERIODS = [
  { name: 'Today', id: 1 },
  { name: 'Yesterday', id: 2 },
  { name: 'Last 7 days', id: 3 },
  { name: 'Last 30 days', id: 4, default: true },
  { name: 'This month', id: 5 },
  { name: 'Last month', id: 6 },
  { name: 'Custom range', id: 7 }
];
