import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, 
  Filter, 
  Plus, 
  Search, 
  Download, 
  ChevronDown,
  Eye,
  Edit,
  Trash,
  ArrowUp10,
  CreditCard,
  Printer
} from 'lucide-react';
import  Button  from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

// Sample data for payments
const payments = [
  {
    id: 'PAY-2023-045',
    purchaseId: 'PO-2023-004',
    vendor: {
      name: 'Global Supplies Inc.',
      avatar: ''
    },
    date: 'Apr 20, 2023',
    amount: '$12,450.00',
    paymentMethod: 'Bank Transfer',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 'PAY-2023-044',
    purchaseId: 'PO-2023-003',
    vendor: {
      name: 'Tech Components Ltd.',
      avatar: ''
    },
    date: 'Apr 18, 2023',
    amount: '$8,290.00',
    paymentMethod: 'Credit Card',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 'PAY-2023-043',
    purchaseId: 'PO-2023-001',
    vendor: {
      name: 'Industrial Solutions',
      avatar: ''
    },
    date: 'Apr 15, 2023',
    amount: '$5,875.00',
    paymentMethod: 'Bank Transfer',
    status: 'Pending',
    statusColor: 'yellow'
  },
  {
    id: 'PAY-2023-042',
    purchaseId: 'PO-2022-099',
    vendor: {
      name: 'Furniture Depot',
      avatar: ''
    },
    date: 'Apr 10, 2023',
    amount: '$2,250.00',
    paymentMethod: 'ACH',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 'PAY-2023-041',
    purchaseId: 'PO-2022-095',
    vendor: {
      name: 'Office Essentials Co.',
      avatar: ''
    },
    date: 'Apr 05, 2023',
    amount: '$3,150.00',
    paymentMethod: 'Credit Card',
    status: 'Failed',
    statusColor: 'red'
  }
];

const Payment = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCreatePayment = () => {
    toast({
      title: "New Payment",
      description: "Payment creation form would open here",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Payments",
      description: "Payment data export initiated",
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print Payments",
      description: "Payment print dialog would open here",
    });
  };
  
  const filteredPayments = payments.filter(payment => 
    payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.purchaseId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-yellow-100 text-yellow-600';
      case 'failed':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/">
          <a className="text-primary">Home</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <Link href="/purchase">
          <a className="text-primary">Purchase</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <span className="text-secondarytext">Payment</span>
      </div>
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl font-semibold text-primarytext">Payments</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-secondarytext" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 text-secondarytext" />
            </Button>
          </div>
          <Button onClick={handleCreatePayment} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create Payment</span>
          </Button>
        </div>
      </div>
      
      {/* Payment Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Payments</p>
              <h3 className="text-xl font-semibold text-primarytext">112</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">This Month</p>
              <h3 className="text-xl font-semibold text-primarytext">38</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Amount</p>
              <h3 className="text-xl font-semibold text-primarytext">$187,250.75</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Payment Table */}
      <Card className="overflow-hidden">
        {/* Table Filter/Search */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search payments..." 
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <div className="flex space-x-2">
            <select className="text-sm bg-gray-100 border border-transparent rounded-lg px-3 py-2 pr-8 focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none appearance-none transition">
              <option>All Status</option>
              <option>Completed</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>
            
            <select className="text-sm bg-gray-100 border border-transparent rounded-lg px-3 py-2 pr-8 focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none appearance-none transition">
              <option>This Month</option>
              <option>Last Month</option>
              <option>Last 3 Months</option>
              <option>This Year</option>
            </select>
            
            <Button 
              variant="outline" 
              className="text-sm text-primary border-primary rounded-lg flex items-center"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
            
            <Button 
              variant="outline" 
              className="text-sm text-secondarytext border-gray-200 rounded-lg flex items-center hidden md:flex"
              onClick={handlePrint}
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Payment ID</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Purchase</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Vendor</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Date</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Amount</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Payment Method</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Status</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm font-medium text-primarytext">
                    {payment.id}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {payment.purchaseId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={payment.vendor.avatar} />
                        <AvatarFallback className="bg-blue-600 text-white">
                          {payment.vendor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 text-sm text-secondarytext">{payment.vendor.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {payment.date}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-primarytext">
                    {payment.amount}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {payment.paymentMethod}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(payment.status)}`}>
                      {payment.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-secondarytext hover:text-primary">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-secondarytext hover:text-primary">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-secondarytext hover:text-red-500">
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <div className="hidden sm:block text-sm text-secondarytext">
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredPayments.length}</span> of <span className="font-medium">{filteredPayments.length}</span> results
          </div>
          <div className="flex space-x-1">
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-1 text-sm border-gray-200 rounded-md text-secondarytext hover:border-primary hover:text-primary"
              disabled
            >
              Previous
            </Button>
            <Button
              size="sm"
              className="px-3 py-1 text-sm bg-primary text-white rounded-md"
            >
              1
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-1 text-sm border-gray-200 rounded-md text-secondarytext hover:border-primary hover:text-primary"
              disabled
            >
              Next
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Payment;
