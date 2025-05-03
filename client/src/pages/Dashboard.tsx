import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Table from '@/components/common/Table';
import MobileTableCard from '@/components/common/MobileTableCard';
import CardView from '@/components/common/CardView';
import SearchInput from '@/components/ui/SearchInput';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EyeIcon, EditIcon, DeleteIcon } from '@/assets/icons';
import { formatCurrency, getInitials } from '@/lib/utils';
import { STATUS_COLORS } from '@/constants/colors';

// Mock sales data for demonstration
const chartData = [
  { month: 'Jan', value: 40 },
  { month: 'Feb', value: 60 },
  { month: 'Mar', value: 45 },
  { month: 'Apr', value: 70 },
  { month: 'May', value: 65 },
  { month: 'Jun', value: 50 },
  { month: 'Jul', value: 75 },
  { month: 'Aug', value: 80 },
  { month: 'Sep', value: 90 },
  { month: 'Oct', value: 55 },
  { month: 'Nov', value: 65 },
  { month: 'Dec', value: 70 }
];

// Mock stats data
const statsCards = [
  { 
    title: 'Total Revenue', 
    value: 24563, 
    percentChange: 8.2, 
    positive: true, 
    icon: (
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
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8" />
        <path d="M12 18V6" />
      </svg>
    ),
    bgColor: 'bg-primary/10',
    textColor: 'text-primary'
  },
  { 
    title: 'Total Customers', 
    value: 1849, 
    percentChange: 4.3, 
    positive: true, 
    icon: (
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
    ),
    bgColor: 'bg-indigo-100',
    textColor: 'text-indigo-600'
  },
  { 
    title: 'Total Orders', 
    value: 492, 
    percentChange: 2.1, 
    positive: false, 
    icon: (
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
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
        <path d="M3 6h18" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-600'
  },
  { 
    title: 'Total Products', 
    value: 136, 
    percentChange: 6.8, 
    positive: true, 
    icon: (
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
    ),
    bgColor: 'bg-accent/10',
    textColor: 'text-accent'
  }
];

// Mock products data
const topProducts = [
  { id: 1, name: 'Premium Laptop Pro', sales: 32, price: 1299, icon: 'computer' },
  { id: 2, name: 'Smartphone X', sales: 28, price: 899, icon: 'smartphone' },
  { id: 3, name: 'Wireless Headphones', sales: 24, price: 249, icon: 'headphones' },
  { id: 4, name: 'Smartwatch Pro', sales: 19, price: 349, icon: 'watch' },
  { id: 5, name: '4K Smart TV', sales: 15, price: 799, icon: 'tv' }
];

// Transaction data
interface Transaction {
  id: string;
  customer: {
    name: string;
    initials: string;
    avatarColor: string;
  };
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  {
    id: 'TRX-5632',
    customer: { 
      name: 'John Doe', 
      initials: 'JD', 
      avatarColor: 'bg-indigo-100 text-indigo-600' 
    },
    date: 'Jul 25, 2023',
    amount: 540.50,
    status: 'completed'
  },
  {
    id: 'TRX-5631',
    customer: { 
      name: 'Alice Smith', 
      initials: 'AS', 
      avatarColor: 'bg-orange-100 text-orange-600' 
    },
    date: 'Jul 24, 2023',
    amount: 920.00,
    status: 'completed'
  },
  {
    id: 'TRX-5630',
    customer: { 
      name: 'Robert Johnson', 
      initials: 'RJ', 
      avatarColor: 'bg-blue-100 text-blue-600' 
    },
    date: 'Jul 23, 2023',
    amount: 350.25,
    status: 'pending'
  },
  {
    id: 'TRX-5629',
    customer: { 
      name: 'Emma Wilson', 
      initials: 'EW', 
      avatarColor: 'bg-purple-100 text-purple-600' 
    },
    date: 'Jul 22, 2023',
    amount: 720.75,
    status: 'failed'
  },
  {
    id: 'TRX-5628',
    customer: { 
      name: 'Michael Brown', 
      initials: 'MB', 
      avatarColor: 'bg-green-100 text-green-600' 
    },
    date: 'Jul 21, 2023',
    amount: 430.00,
    status: 'completed'
  }
];

// Define table columns
const transactionColumns = [
  {
    header: 'Transaction ID',
    accessor: 'id'
  },
  {
    header: 'Customer',
    accessor: (transaction: Transaction) => (
      <div className="flex items-center">
        <Avatar className={`h-8 w-8 mr-2 ${transaction.customer.avatarColor}`}>
          <AvatarFallback>{transaction.customer.initials}</AvatarFallback>
        </Avatar>
        <span>{transaction.customer.name}</span>
      </div>
    )
  },
  {
    header: 'Date',
    accessor: 'date'
  },
  {
    header: 'Amount',
    accessor: (transaction: Transaction) => (
      <span className="font-medium">{formatCurrency(transaction.amount)}</span>
    )
  },
  {
    header: 'Status',
    accessor: (transaction: Transaction) => {
      const statusColor = STATUS_COLORS[transaction.status];
      return (
        <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${statusColor.bg} ${statusColor.text}`}>
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      );
    }
  },
  {
    header: 'Actions',
    accessor: (transaction: Transaction) => (
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

const Dashboard: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-gray-500">Welcome back, John Smith</p>
      </div>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg border border-border p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-500 text-sm">{stat.title}</span>
              <div className={`p-1.5 rounded-md ${stat.bgColor} ${stat.textColor}`}>
                {stat.icon}
              </div>
            </div>
            <div className="flex items-end">
              <h3 className="text-2xl font-semibold">{formatCurrency(stat.value)}</h3>
              <span className={`text-xs ml-2 mb-1 ${stat.positive ? 'text-green-500' : 'text-red-500'} flex items-center`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3"
                >
                  <path d={stat.positive ? "m18 15-6-6-6 6" : "m6 9 6 6 6-6"} />
                </svg>
                {stat.percentChange}%
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-1">Compared to last month</p>
          </div>
        ))}
      </div>
      
      {/* Sales Overview & Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Sales Overview Chart */}
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Sales Overview</h3>
            <Select defaultValue="this-month">
              <SelectTrigger className="h-8 text-sm w-[110px]">
                <SelectValue placeholder="This Month" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="last-month">Last Month</SelectItem>
                <SelectItem value="last-3-months">Last 3 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="h-72 flex items-end space-x-4 pt-4 px-2">
            {chartData.map((item, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className={`w-full ${item.month === 'Jul' ? 'bg-primary' : 'bg-primary/10'} hover:bg-primary/20 rounded-t-sm`} 
                  style={{ height: `${item.value}%` }}
                ></div>
                <span className="text-xs mt-1 text-gray-500">{item.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Top Products */}
        <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium">Top Products</h3>
            <Button variant="ghost" className="text-sm text-primary hover:underline h-auto p-0">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div key={product.id} className="flex items-center">
                <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center mr-3 flex-shrink-0">
                  {product.icon === 'computer' && (
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
                  {product.icon === 'smartphone' && (
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
                      <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  )}
                  {product.icon === 'headphones' && (
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
                  {product.icon === 'watch' && (
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
                  {product.icon === 'tv' && (
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
                      <rect width="20" height="15" x="2" y="3" rx="2" ry="2" />
                      <polyline points="8 21 12 17 16 21" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{product.name}</h4>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{product.sales} sales</span>
                    <span className="text-xs font-medium">{formatCurrency(product.price)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 space-y-2 md:space-y-0">
          <h3 className="text-lg font-medium">Recent Transactions</h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <SearchInput
              placeholder="Search transactions..."
              className="w-full sm:w-64 text-sm"
            />
            <Button size="sm" className="bg-primary text-white hover:bg-primary/90 transition-colors">
              Export
            </Button>
          </div>
        </div>
        
        {/* Desktop Table */}
        <Table 
          data={transactions} 
          columns={transactionColumns} 
          onRowClick={(transaction) => console.log('Clicked on transaction:', transaction.id)}
        />
        
        {/* Mobile Card View */}
        <MobileTableCard
          data={transactions}
          renderItem={(transaction, index) => (
            <CardView
              key={transaction.id}
              header={
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className={`h-8 w-8 mr-2 ${transaction.customer.avatarColor}`}>
                      <AvatarFallback>{transaction.customer.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{transaction.customer.name}</h4>
                      <p className="text-xs text-gray-500">{transaction.date}</p>
                    </div>
                  </div>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${STATUS_COLORS[transaction.status].bg} ${STATUS_COLORS[transaction.status].text}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </span>
                </div>
              }
            >
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Transaction ID:</span>
                  <span className="text-sm font-medium">#{transaction.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Amount:</span>
                  <span className="text-sm font-medium">{formatCurrency(transaction.amount)}</span>
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
          onLoadMore={() => console.log('Loading more transactions...')}
          hasMore={false}
        />
        
        {/* Pagination */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-4">
          <div className="text-sm text-gray-500">
            Showing 1 to 5 of 42 transactions
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
              9
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

export default Dashboard;
