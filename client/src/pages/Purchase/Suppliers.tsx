import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Table from '@/components/common/Table';
import MobileTableCard from '@/components/common/MobileTableCard';
import CardView from '@/components/common/CardView';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EyeIcon, EditIcon, DeleteIcon } from '@/assets/icons';
import { formatCurrency, getInitials } from '@/lib/utils';

interface Supplier {
  id: number;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  status: 'active' | 'inactive';
}

const suppliers: Supplier[] = [
  {
    id: 1,
    name: 'Acme Supplies Inc.',
    contactPerson: 'John Smith',
    email: 'john.smith@acme.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, New York, NY 10001',
    totalOrders: 24,
    totalSpent: 32450.75,
    status: 'active'
  },
  {
    id: 2,
    name: 'Global Distributors Ltd.',
    contactPerson: 'Sarah Johnson',
    email: 'sarah.j@globaldist.com',
    phone: '+1 (555) 987-6543',
    address: '456 Market Ave, San Francisco, CA 94103',
    totalOrders: 18,
    totalSpent: 24680.50,
    status: 'active'
  },
  {
    id: 3,
    name: 'TechParts Co.',
    contactPerson: 'Michael Brown',
    email: 'michael@techparts.com',
    phone: '+1 (555) 234-5678',
    address: '789 Tech Blvd, Austin, TX 78701',
    totalOrders: 11,
    totalSpent: 15750.25,
    status: 'inactive'
  },
  {
    id: 4,
    name: 'Quality Manufacturing',
    contactPerson: 'Lisa Davis',
    email: 'lisa.davis@qualitymfg.com',
    phone: '+1 (555) 456-7890',
    address: '321 Industrial Pkwy, Chicago, IL 60607',
    totalOrders: 32,
    totalSpent: 47820.60,
    status: 'active'
  },
  {
    id: 5,
    name: 'Eco Friendly Products',
    contactPerson: 'David Wilson',
    email: 'david@ecofriendly.com',
    phone: '+1 (555) 567-8901',
    address: '654 Green St, Portland, OR 97201',
    totalOrders: 9,
    totalSpent: 11250.15,
    status: 'inactive'
  }
];

const supplierColumns = [
  {
    header: 'Supplier Name',
    accessor: (supplier: Supplier) => (
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2 bg-primary/10 text-primary">
          <AvatarFallback>{getInitials(supplier.name)}</AvatarFallback>
        </Avatar>
        <span>{supplier.name}</span>
      </div>
    )
  },
  {
    header: 'Contact Person',
    accessor: 'contactPerson'
  },
  {
    header: 'Email',
    accessor: 'email'
  },
  {
    header: 'Phone',
    accessor: 'phone'
  },
  {
    header: 'Total Orders',
    accessor: (supplier: Supplier) => (
      <span>{supplier.totalOrders}</span>
    )
  },
  {
    header: 'Total Spent',
    accessor: (supplier: Supplier) => (
      <span className="font-medium">
        {formatCurrency(supplier.totalSpent)}
      </span>
    )
  },
  {
    header: 'Status',
    accessor: (supplier: Supplier) => (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
        supplier.status === 'active' 
          ? 'bg-green-100 text-green-600' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
      </span>
    )
  },
  {
    header: 'Actions',
    accessor: (supplier: Supplier) => (
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
    )
  }
];

const Suppliers: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Purchase', path: '/purchase' },
        { label: 'Suppliers' }
      ]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Suppliers</h1>
        <p className="text-gray-500">Manage your supplier relationships</p>
      </div>
      
      {/* Supplier Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                <path d="M15 2H9a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1z" />
                <path d="M12 11h4" />
                <path d="M12 16h4" />
                <path d="M8 11h.01" />
                <path d="M8 16h.01" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Suppliers</p>
              <h3 className="text-xl font-semibold">127</h3>
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
              <p className="text-sm text-gray-500">Active Suppliers</p>
              <h3 className="text-xl font-semibold">92</h3>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-md bg-accent/10 text-accent">
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
                <path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" />
                <path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" />
                <path d="M4 13h16a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Avg. Monthly Spend</p>
              <h3 className="text-xl font-semibold">{formatCurrency(24560)}</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Suppliers List */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-medium">Supplier List</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput 
              placeholder="Search suppliers..." 
              className="w-full sm:w-64 text-sm"
            />
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
              + Add Supplier
            </Button>
          </div>
        </div>
        
        {/* Desktop Table */}
        <Table 
          data={suppliers} 
          columns={supplierColumns} 
          onRowClick={(supplier) => console.log('Clicked on supplier:', supplier.id)}
        />
        
        {/* Mobile Card View */}
        <MobileTableCard
          data={suppliers}
          renderItem={(supplier, index) => (
            <CardView
              key={supplier.id}
              header={
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-primary/10 text-primary">
                      <AvatarFallback>{getInitials(supplier.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{supplier.name}</h4>
                      <p className="text-xs text-gray-500">{supplier.contactPerson}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    supplier.status === 'active' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                  </span>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Email:</span>
                  <span className="text-sm">{supplier.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Phone:</span>
                  <span className="text-sm">{supplier.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Orders:</span>
                  <span className="text-sm">{supplier.totalOrders}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Spent:</span>
                  <span className="text-sm font-medium">{formatCurrency(supplier.totalSpent)}</span>
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
          onLoadMore={() => console.log('Loading more suppliers...')}
          hasMore={false}
        />
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 127 suppliers
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
              13
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

export default Suppliers;
