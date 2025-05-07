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
  FileText,
  Printer
} from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';
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

// Sample data for invoices
const invoices = [
  {
    id: 'INV-2023-004',
    customer: {
      name: 'Acme Corporation',
      avatar: ''
    },
    date: 'Apr 15, 2023',
    dueDate: 'May 15, 2023',
    amount: '$3,450.00',
    status: 'Paid',
    statusColor: 'green'
  },
  {
    id: 'INV-2023-003',
    customer: {
      name: 'TechNova Inc.',
      avatar: ''
    },
    date: 'Apr 10, 2023',
    dueDate: 'May 10, 2023',
    amount: '$7,290.00',
    status: 'Pending',
    statusColor: 'blue'
  },
  {
    id: 'INV-2023-002',
    customer: {
      name: 'Global Enterprises',
      avatar: ''
    },
    date: 'Apr 05, 2023',
    dueDate: 'May 05, 2023',
    amount: '$2,150.00',
    status: 'Overdue',
    statusColor: 'red'
  },
  {
    id: 'INV-2023-001',
    customer: {
      name: 'Quantum Solutions',
      avatar: ''
    },
    date: 'Apr 01, 2023',
    dueDate: 'May 01, 2023',
    amount: '$4,875.00',
    status: 'Paid',
    statusColor: 'green'
  },
  {
    id: 'INV-2023-000',
    customer: {
      name: 'Stellar Systems',
      avatar: ''
    },
    date: 'Mar 28, 2023',
    dueDate: 'Apr 28, 2023',
    amount: '$1,250.00',
    status: 'Paid',
    statusColor: 'green'
  }
];

const Invoice = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCreateInvoice = () => {
    toast({
      title: "New Invoice",
      description: "Invoice creation form would open here",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Invoices",
      description: "Invoice data export initiated",
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print Invoices",
      description: "Invoice print dialog would open here",
    });
  };
  
  const filteredInvoices = invoices.filter(invoice => 
    invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-600';
      case 'pending':
        return 'bg-blue-100 text-blue-600';
      case 'overdue':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div>
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h1 className="text-xl font-semibold text-primarytext">Invoices</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-secondarytext" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 text-secondarytext" />
            </Button>
          </div>
          <Button onClick={handleCreateInvoice} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create Invoice</span>
          </Button>
        </div>
      </div>
      
      {/* Breadcrumbs - positioned after heading */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Sales', href: '/sales' },
          { label: 'Invoices' }
        ]}
        className="mb-4"
      />
      
      {/* Invoice Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Invoices</p>
              <h3 className="text-xl font-semibold text-primarytext">149</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Paid</p>
              <h3 className="text-xl font-semibold text-primarytext">96</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Pending</p>
              <h3 className="text-xl font-semibold text-primarytext">35</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center text-red-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Overdue</p>
              <h3 className="text-xl font-semibold text-primarytext">18</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Invoice Table */}
      <Card className="overflow-hidden">
        {/* Table Filter/Search */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search invoices..." 
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <div className="flex space-x-2">
            <select className="text-sm bg-gray-100 border border-transparent rounded-lg px-3 py-2 pr-8 focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none appearance-none transition">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
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
                    <span>Invoice</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Customer</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Issue Date</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Due Date</span>
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
              {filteredInvoices.map((invoice) => (
                <TableRow key={invoice.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm font-medium text-primarytext">
                    {invoice.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={invoice.customer.avatar} />
                        <AvatarFallback className="bg-primary text-white">
                          {invoice.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 text-sm text-secondarytext">{invoice.customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {invoice.date}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {invoice.dueDate}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-primarytext">
                    {invoice.amount}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(invoice.status)}`}>
                      {invoice.status}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredInvoices.length}</span> of <span className="font-medium">{filteredInvoices.length}</span> results
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

export default Invoice;
