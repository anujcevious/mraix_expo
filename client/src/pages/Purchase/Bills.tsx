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
import { STATUS_COLORS } from '@/constants/colors';

interface Bill {
  id: string;
  supplier: {
    name: string;
    initials: string;
  };
  amount: number;
  issueDate: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'overdue';
  reference: string;
}

const bills: Bill[] = [
  {
    id: 'BILL-2023-001',
    supplier: {
      name: 'Acme Supplies Inc.',
      initials: 'AS',
    },
    amount: 3450.75,
    issueDate: '2023-07-01',
    dueDate: '2023-07-15',
    status: 'paid',
    reference: 'PO-2023-145'
  },
  {
    id: 'BILL-2023-002',
    supplier: {
      name: 'Global Distributors Ltd.',
      initials: 'GD',
    },
    amount: 1250.50,
    issueDate: '2023-07-05',
    dueDate: '2023-07-20',
    status: 'pending',
    reference: 'PO-2023-148'
  },
  {
    id: 'BILL-2023-003',
    supplier: {
      name: 'TechParts Co.',
      initials: 'TP',
    },
    amount: 5730.25,
    issueDate: '2023-06-25',
    dueDate: '2023-07-10',
    status: 'overdue',
    reference: 'PO-2023-132'
  },
  {
    id: 'BILL-2023-004',
    supplier: {
      name: 'Quality Manufacturing',
      initials: 'QM',
    },
    amount: 2180.60,
    issueDate: '2023-07-10',
    dueDate: '2023-07-25',
    status: 'pending',
    reference: 'PO-2023-151'
  },
  {
    id: 'BILL-2023-005',
    supplier: {
      name: 'Eco Friendly Products',
      initials: 'EF',
    },
    amount: 890.15,
    issueDate: '2023-06-15',
    dueDate: '2023-06-30',
    status: 'paid',
    reference: 'PO-2023-125'
  }
];

const billColumns = [
  {
    header: 'Bill ID',
    accessor: 'id',
  },
  {
    header: 'Supplier',
    accessor: (bill: Bill) => (
      <div className="flex items-center">
        <Avatar className="h-8 w-8 mr-2 bg-primary/10 text-primary">
          <AvatarFallback>{bill.supplier.initials}</AvatarFallback>
        </Avatar>
        <span>{bill.supplier.name}</span>
      </div>
    ),
  },
  {
    header: 'Reference',
    accessor: 'reference'
  },
  {
    header: 'Amount',
    accessor: (bill: Bill) => (
      <span className="font-medium">{formatCurrency(bill.amount)}</span>
    ),
  },
  {
    header: 'Issue Date',
    accessor: (bill: Bill) => {
      const date = new Date(bill.issueDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  {
    header: 'Due Date',
    accessor: (bill: Bill) => {
      const date = new Date(bill.dueDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    },
  },
  {
    header: 'Status',
    accessor: (bill: Bill) => {
      let statusColor;
      if (bill.status === 'paid') {
        statusColor = STATUS_COLORS.completed;
      } else if (bill.status === 'pending') {
        statusColor = STATUS_COLORS.pending;
      } else {
        statusColor = STATUS_COLORS.failed;
      }

      return (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor.bg} ${statusColor.text}`}>
          {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
        </span>
      );
    },
  },
  {
    header: 'Actions',
    accessor: (bill: Bill) => (
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

const Bills: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[
        { label: 'Purchase', path: '/purchase' },
        { label: 'Bills' }
      ]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Bills</h1>
        <p className="text-gray-500">Manage your bills and payments to suppliers</p>
      </div>
      
      {/* Bill Stats */}
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
                <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                <path d="M13 14H8" />
                <path d="M13 19H8" />
                <path d="M16 14h.01" />
                <path d="M16 19h.01" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Bills</p>
              <h3 className="text-xl font-semibold">167</h3>
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
              <p className="text-sm text-gray-500">Paid</p>
              <h3 className="text-xl font-semibold">104</h3>
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
              <p className="text-sm text-gray-500">Pending</p>
              <h3 className="text-xl font-semibold">42</h3>
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
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
                <path d="M21.07 8.5A9 9 0 1 1 3.07 5.5" />
                <path d="M11 1 3 5l1 18 7 3Z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-500">Overdue</p>
              <h3 className="text-xl font-semibold">21</h3>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bill List */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-medium">Bill List</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput 
              placeholder="Search bills..." 
              className="w-full sm:w-64 text-sm"
            />
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
              + Create Bill
            </Button>
          </div>
        </div>
        
        {/* Desktop Table */}
        <Table 
          data={bills} 
          columns={billColumns} 
          onRowClick={(bill) => console.log('Clicked on bill:', bill.id)}
        />
        
        {/* Mobile Card View */}
        <MobileTableCard
          data={bills}
          renderItem={(bill, index) => (
            <CardView
              key={bill.id}
              header={
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2 bg-primary/10 text-primary">
                      <AvatarFallback>{bill.supplier.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{bill.supplier.name}</h4>
                      <p className="text-xs text-gray-500">{bill.id}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                    bill.status === 'paid'
                      ? STATUS_COLORS.completed.bg + ' ' + STATUS_COLORS.completed.text
                      : bill.status === 'pending'
                      ? STATUS_COLORS.pending.bg + ' ' + STATUS_COLORS.pending.text
                      : STATUS_COLORS.failed.bg + ' ' + STATUS_COLORS.failed.text
                  }`}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Reference:</span>
                  <span className="text-sm">{bill.reference}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="text-sm font-medium">{formatCurrency(bill.amount)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Issue Date:</span>
                  <span className="text-sm">{new Date(bill.issueDate).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Due Date:</span>
                  <span className="text-sm">{new Date(bill.dueDate).toLocaleDateString()}</span>
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
          onLoadMore={() => console.log('Loading more bills...')}
          hasMore={false}
        />
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 167 bills
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
              17
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

export default Bills;
