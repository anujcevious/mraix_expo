import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Table from '@/components/common/Table';
import MobileTableCard from '@/components/common/MobileTableCard';
import CardView from '@/components/common/CardView';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { EyeIcon, EditIcon } from '@/assets/icons';
import { formatCurrency } from '@/lib/utils';
import { STATUS_COLORS } from '@/constants/colors';

interface StockItem {
  id: string;
  product: {
    name: string;
    sku: string;
    category: string;
  };
  quantity: number;
  minQuantity: number;
  location: string;
  lastUpdated: string;
  value: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const stockItems: StockItem[] = [
  {
    id: 'STK-001',
    product: {
      name: 'Premium Laptop Pro',
      sku: 'EL-LAP-001',
      category: 'Electronics',
    },
    quantity: 24,
    minQuantity: 10,
    location: 'Warehouse A - Shelf 3',
    lastUpdated: '2023-07-15',
    value: 31176.00,
    status: 'in_stock'
  },
  {
    id: 'STK-002',
    product: {
      name: 'Wireless Headphones',
      sku: 'AU-WH-002',
      category: 'Audio',
    },
    quantity: 42,
    minQuantity: 15,
    location: 'Warehouse A - Shelf 5',
    lastUpdated: '2023-07-16',
    value: 10499.58,
    status: 'in_stock'
  },
  {
    id: 'STK-003',
    product: {
      name: 'Smartphone X',
      sku: 'EL-SP-003',
      category: 'Electronics',
    },
    quantity: 5,
    minQuantity: 8,
    location: 'Warehouse B - Secure Cabinet 2',
    lastUpdated: '2023-07-10',
    value: 4495.00,
    status: 'low_stock'
  },
  {
    id: 'STK-004',
    product: {
      name: 'Smartwatch Pro',
      sku: 'WE-SW-004',
      category: 'Wearables',
    },
    quantity: 0,
    minQuantity: 5,
    location: 'Warehouse A - Shelf 2',
    lastUpdated: '2023-07-05',
    value: 0.00,
    status: 'out_of_stock'
  },
  {
    id: 'STK-005',
    product: {
      name: '4K Smart TV',
      sku: 'EL-TV-005',
      category: 'Electronics',
    },
    quantity: 12,
    minQuantity: 5,
    location: 'Warehouse C - Section TV',
    lastUpdated: '2023-07-12',
    value: 9594.00,
    status: 'in_stock'
  }
];

const stockColumns = [
  {
    header: 'Product',
    accessor: (item: StockItem) => (
      <div>
        <div className="font-medium">{item.product.name}</div>
        <div className="text-xs text-gray-500">{item.product.sku}</div>
      </div>
    ),
  },
  {
    header: 'Category',
    accessor: (item: StockItem) => item.product.category,
  },
  {
    header: 'Quantity',
    accessor: (item: StockItem) => (
      <div className="font-medium">{item.quantity}</div>
    ),
  },
  {
    header: 'Min. Quantity',
    accessor: 'minQuantity',
  },
  {
    header: 'Location',
    accessor: 'location',
  },
  {
    header: 'Last Updated',
    accessor: (item: StockItem) => {
      const date = new Date(item.lastUpdated);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  {
    header: 'Value',
    accessor: (item: StockItem) => (
      <span className="font-medium">{formatCurrency(item.value)}</span>
    ),
  },
  {
    header: 'Status',
    accessor: (item: StockItem) => {
      let statusColor;
      let label;
      
      if (item.status === 'in_stock') {
        statusColor = STATUS_COLORS.completed;
        label = 'In Stock';
      } else if (item.status === 'low_stock') {
        statusColor = STATUS_COLORS.pending;
        label = 'Low Stock';
      } else {
        statusColor = STATUS_COLORS.failed;
        label = 'Out of Stock';
      }

      return (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor.bg} ${statusColor.text}`}>
          {label}
        </span>
      );
    },
  },
  {
    header: 'Actions',
    accessor: (item: StockItem) => (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="p-1 text-gray-500 hover:text-primary">
          <EyeIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="p-1 text-gray-500 hover:text-primary">
          <EditIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

const Stock: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Inventory', path: '/inventory' },
        { label: 'Stock' }
      ]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Stock Management</h1>
        <p className="text-gray-500">Track inventory levels and manage stock</p>
      </div>
      
      {/* Stock Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-primary/10 text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M4 19V6c0-1.1.9-2 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 0-2 2H6a2 2 0 0 0-2-2Z" />
                <path d="M8 2v4" />
                <path d="M16 2v4" />
                <path d="M2 10h20" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Stock Value</p>
              <h3 className="text-xl font-semibold">{formatCurrency(1258432.75)}</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-green-100 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Healthy Stock Items</p>
              <h3 className="text-xl font-semibold">98</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-yellow-100 text-yellow-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <path d="M12 9v4" />
                <path d="M12 17h.01" />
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <h3 className="text-xl font-semibold">24</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-red-100 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
              >
                <line x1="18" x2="6" y1="6" y2="18" />
                <line x1="6" x2="18" y1="6" y2="18" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Out of Stock Items</p>
              <h3 className="text-xl font-semibold">14</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Stock List */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-medium">Stock Items</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput 
              placeholder="Search stock..." 
              className="w-full sm:w-64 text-sm"
            />
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
              + Adjust Stock
            </Button>
          </div>
        </div>
        
        {/* Desktop Table */}
        <Table 
          data={stockItems} 
          columns={stockColumns} 
          onRowClick={(item) => console.log('Clicked on stock item:', item.id)}
        />
        
        {/* Mobile Card View */}
        <MobileTableCard
          data={stockItems}
          renderItem={(item, index) => (
            <CardView
              key={item.id}
              header={
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-xs text-gray-500">{item.product.sku}</p>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'in_stock'
                      ? STATUS_COLORS.completed.bg + ' ' + STATUS_COLORS.completed.text
                      : item.status === 'low_stock'
                      ? STATUS_COLORS.pending.bg + ' ' + STATUS_COLORS.pending.text
                      : STATUS_COLORS.failed.bg + ' ' + STATUS_COLORS.failed.text
                  }`}>
                    {item.status === 'in_stock' 
                      ? 'In Stock' 
                      : item.status === 'low_stock' 
                      ? 'Low Stock' 
                      : 'Out of Stock'}
                  </span>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Quantity:</span>
                  <span className="text-sm font-medium">{item.quantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Min. Quantity:</span>
                  <span className="text-sm">{item.minQuantity}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Location:</span>
                  <span className="text-sm">{item.location}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Value:</span>
                  <span className="text-sm font-medium">{formatCurrency(item.value)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Updated:</span>
                  <span className="text-sm">{new Date(item.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="secondary" size="icon" className="p-1.5 h-8 w-8">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="p-1.5 h-8 w-8">
                  <EditIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardView>
          )}
          onLoadMore={() => console.log('Loading more stock items...')}
          hasMore={false}
        />
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 136 stock items
          </div>
          <div className="flex items-center space-x-1">
            <Button variant="outline" size="sm" disabled className="text-sm">
              Previous
            </Button>
            <Button variant="outline" size="sm" className="bg-primary text-white border-primary text-sm">
              1
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              2
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              3
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              ...
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              14
            </Button>
            <Button variant="outline" size="sm" className="text-sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Stock;
