import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Table from '@/components/common/Table';
import MobileTableCard from '@/components/common/MobileTableCard';
import CardView from '@/components/common/CardView';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { EyeIcon, EditIcon, DeleteIcon } from '@/assets/icons';
import { getInitials } from '@/lib/utils';

interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  lastPurchase: string;
  status: 'active' | 'inactive';
}

const customers: Customer[] = [
  { 
    id: 1, 
    name: 'John Doe', 
    email: 'john.doe@example.com', 
    phone: '+1 (555) 123-4567', 
    totalSpent: 12450.75, 
    lastPurchase: '2023-07-15', 
    status: 'active' 
  },
  { 
    id: 2, 
    name: 'Jane Smith', 
    email: 'jane.smith@example.com', 
    phone: '+1 (555) 987-6543', 
    totalSpent: 8320.50, 
    lastPurchase: '2023-07-10', 
    status: 'active' 
  },
  { 
    id: 3, 
    name: 'Robert Johnson', 
    email: 'robert.johnson@example.com', 
    phone: '+1 (555) 234-5678', 
    totalSpent: 5150.25, 
    lastPurchase: '2023-06-28', 
    status: 'inactive' 
  },
  { 
    id: 4, 
    name: 'Emily Brown', 
    email: 'emily.brown@example.com', 
    phone: '+1 (555) 876-5432', 
    totalSpent: 15780.60, 
    lastPurchase: '2023-07-12', 
    status: 'active' 
  },
  { 
    id: 5, 
    name: 'Michael Wilson', 
    email: 'michael.wilson@example.com', 
    phone: '+1 (555) 345-6789', 
    totalSpent: 3250.15, 
    lastPurchase: '2023-06-15', 
    status: 'inactive' 
  }
];

const customerColumns = [
  {
    header: 'Customer Name',
    accessor: (customer: Customer) => (
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2 bg-primary/10 text-primary">
          <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
        </Avatar>
        <span>{customer.name}</span>
      </div>
    )
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
    header: 'Total Spent',
    accessor: (customer: Customer) => (
      <span className="font-medium">
        ${customer.totalSpent.toFixed(2)}
      </span>
    )
  },
  {
    header: 'Last Purchase',
    accessor: (customer: Customer) => {
      const date = new Date(customer.lastPurchase);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  },
  {
    header: 'Status',
    accessor: (customer: Customer) => (
      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
        customer.status === 'active' 
          ? 'bg-green-100 text-green-600' 
          : 'bg-gray-100 text-gray-600'
      }`}>
        {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
      </span>
    )
  },
  {
    header: 'Actions',
    accessor: (customer: Customer) => (
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

const Customers: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Sales', path: '/sales' },
        { label: 'Customers' }
      ]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <p className="text-gray-500">Manage your customer base</p>
      </div>
      
      {/* Customer Stats */}
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Customers</p>
              <h3 className="text-xl font-semibold">1,849</h3>
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Active Customers</p>
              <h3 className="text-xl font-semibold">1,254</h3>
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
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <line x1="19" x2="19" y1="8" y2="14" />
                <line x1="22" x2="16" y1="11" y2="11" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">New This Month</p>
              <h3 className="text-xl font-semibold">78</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Customers List */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-medium">Customer List</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput 
              placeholder="Search customers..." 
              className="w-full sm:w-64 text-sm"
            />
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
              + Add Customer
            </Button>
          </div>
        </div>
        
        {/* Desktop Table */}
        <Table 
          data={customers} 
          columns={customerColumns} 
          onRowClick={(customer) => console.log('Clicked on customer:', customer.id)}
        />
        
        {/* Mobile Card View */}
        <MobileTableCard
          data={customers}
          renderItem={(customer, index) => (
            <CardView
              key={customer.id}
              header={
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-primary/10 text-primary">
                      <AvatarFallback>{getInitials(customer.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{customer.name}</h4>
                      <p className="text-xs text-gray-500">{customer.email}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    customer.status === 'active' 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </span>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Phone:</span>
                  <span className="text-sm">{customer.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Total Spent:</span>
                  <span className="text-sm font-medium">${customer.totalSpent.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Purchase:</span>
                  <span className="text-sm">{new Date(customer.lastPurchase).toLocaleDateString()}</span>
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
          onLoadMore={() => console.log('Loading more customers...')}
          hasMore={false}
        />
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 1,849 customers
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
              185
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

export default Customers;
