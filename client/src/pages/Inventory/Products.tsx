import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Table from '@/components/common/Table';
import MobileTableCard from '@/components/common/MobileTableCard';
import CardView from '@/components/common/CardView';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { EyeIcon, EditIcon, DeleteIcon } from '@/assets/icons';
import { formatCurrency } from '@/lib/utils';
import { STATUS_COLORS } from '@/constants/colors';

interface Product {
  id: string;
  name: string;
  category: string;
  sku: string;
  price: number;
  stock: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

const products: Product[] = [
  {
    id: 'PRD-001',
    name: 'Premium Laptop Pro',
    category: 'Electronics',
    sku: 'EL-LAP-001',
    price: 1299.00,
    stock: 24,
    status: 'in_stock'
  },
  {
    id: 'PRD-002',
    name: 'Wireless Headphones',
    category: 'Audio',
    sku: 'AU-WH-002',
    price: 249.99,
    stock: 42,
    status: 'in_stock'
  },
  {
    id: 'PRD-003',
    name: 'Smartphone X',
    category: 'Electronics',
    sku: 'EL-SP-003',
    price: 899.00,
    stock: 5,
    status: 'low_stock'
  },
  {
    id: 'PRD-004',
    name: 'Smartwatch Pro',
    category: 'Wearables',
    sku: 'WE-SW-004',
    price: 349.95,
    stock: 0,
    status: 'out_of_stock'
  },
  {
    id: 'PRD-005',
    name: '4K Smart TV',
    category: 'Electronics',
    sku: 'EL-TV-005',
    price: 799.50,
    stock: 12,
    status: 'in_stock'
  }
];

const productColumns = [
  {
    header: 'Product',
    accessor: (product: Product) => (
      <div className="flex items-center">
        <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
          {product.category === 'Electronics' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-500"
            >
              <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
              <line x1="2" y1="20" x2="22" y2="20" />
            </svg>
          )}
          {product.category === 'Audio' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-500"
            >
              <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
            </svg>
          )}
          {product.category === 'Wearables' && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5 text-gray-500"
            >
              <circle cx="12" cy="12" r="7" />
              <polyline points="12 9 12 12 13.5 13.5" />
              <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
            </svg>
          )}
        </div>
        <div>
          <span className="font-medium">{product.name}</span>
          <div className="text-xs text-gray-500">#{product.id}</div>
        </div>
      </div>
    ),
  },
  {
    header: 'Category',
    accessor: 'category'
  },
  {
    header: 'SKU',
    accessor: 'sku'
  },
  {
    header: 'Price',
    accessor: (product: Product) => (
      <span className="font-medium">{formatCurrency(product.price)}</span>
    ),
  },
  {
    header: 'Stock',
    accessor: (product: Product) => (
      <span className="font-medium">{product.stock}</span>
    ),
  },
  {
    header: 'Status',
    accessor: (product: Product) => {
      let statusColor;
      let label;
      
      if (product.status === 'in_stock') {
        statusColor = STATUS_COLORS.completed;
        label = 'In Stock';
      } else if (product.status === 'low_stock') {
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
    accessor: (product: Product) => (
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="p-1 text-gray-500 hover:text-primary">
          <EyeIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="p-1 text-gray-500 hover:text-primary">
          <EditIcon className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="p-1 text-gray-500 hover:text-red-500">
          <DeleteIcon className="h-4 w-4" />
        </Button>
      </div>
    ),
  },
];

const Products: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Inventory', path: '/inventory' },
        { label: 'Products' }
      ]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Products</h1>
        <p className="text-gray-500">Manage your product catalog</p>
      </div>
      
      {/* Product Stats */}
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
                <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7" />
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4" />
                <path d="M2 7h20" />
                <path d="M22 7v3a2 2 0 0 1-2 2v0a2 2 0 0 1-2-2V7" />
                <path d="M2 7v3a2 2 0 0 0 2 2v0a2 2 0 0 0 2-2V7" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-xl font-semibold">136</h3>
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
              <p className="text-sm text-gray-500">In Stock</p>
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
              <p className="text-sm text-gray-500">Low Stock</p>
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
              <p className="text-sm text-gray-500">Out of Stock</p>
              <h3 className="text-xl font-semibold">14</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Products List */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-medium">Product List</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput 
              placeholder="Search products..." 
              className="w-full sm:w-64 text-sm"
            />
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
              + Add Product
            </Button>
          </div>
        </div>
        
        {/* Desktop Table */}
        <Table 
          data={products} 
          columns={productColumns} 
          onRowClick={(product) => console.log('Clicked on product:', product.id)}
        />
        
        {/* Mobile Card View */}
        <MobileTableCard
          data={products}
          renderItem={(product, index) => (
            <CardView
              key={product.id}
              header={
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                      {product.category === 'Electronics' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-500"
                        >
                          <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
                          <line x1="2" y1="20" x2="22" y2="20" />
                        </svg>
                      )}
                      {product.category === 'Audio' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-500"
                        >
                          <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />
                        </svg>
                      )}
                      {product.category === 'Wearables' && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-5 w-5 text-gray-500"
                        >
                          <circle cx="12" cy="12" r="7" />
                          <polyline points="12 9 12 12 13.5 13.5" />
                          <path d="M16.51 17.35l-.35 3.83a2 2 0 0 1-2 1.82H9.83a2 2 0 0 1-2-1.82l-.35-3.83m.01-10.7.35-3.83A2 2 0 0 1 9.83 1h4.35a2 2 0 0 1 2 1.82l.35 3.83" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{product.name}</h4>
                      <p className="text-xs text-gray-500">{product.sku}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    product.status === 'in_stock'
                      ? STATUS_COLORS.completed.bg + ' ' + STATUS_COLORS.completed.text
                      : product.status === 'low_stock'
                      ? STATUS_COLORS.pending.bg + ' ' + STATUS_COLORS.pending.text
                      : STATUS_COLORS.failed.bg + ' ' + STATUS_COLORS.failed.text
                  }`}>
                    {product.status === 'in_stock' 
                      ? 'In Stock' 
                      : product.status === 'low_stock' 
                      ? 'Low Stock' 
                      : 'Out of Stock'}
                  </span>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Category:</span>
                  <span className="text-sm">{product.category}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Price:</span>
                  <span className="text-sm font-medium">{formatCurrency(product.price)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Stock:</span>
                  <span className="text-sm">{product.stock} units</span>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="secondary" size="icon" className="p-1.5 h-8 w-8">
                  <EyeIcon className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="p-1.5 h-8 w-8">
                  <EditIcon className="h-4 w-4" />
                </Button>
                <Button variant="secondary" size="icon" className="p-1.5 h-8 w-8 text-red-500">
                  <DeleteIcon className="h-4 w-4" />
                </Button>
              </div>
            </CardView>
          )}
          onLoadMore={() => console.log('Loading more products...')}
          hasMore={false}
        />
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 136 products
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

export default Products;
