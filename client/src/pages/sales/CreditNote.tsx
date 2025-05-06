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

// Sample data for credit notes
const creditNotes = [
  {
    id: 'CN-2023-018',
    invoiceId: 'INV-2023-004',
    customer: {
      name: 'Acme Corporation',
      avatar: ''
    },
    date: 'Apr 12, 2023',
    amount: '$850.00',
    reason: 'Goods returned',
    status: 'Processing',
    statusColor: 'yellow'
  },
  {
    id: 'CN-2023-017',
    invoiceId: 'INV-2023-002',
    customer: {
      name: 'TechNova Inc.',
      avatar: ''
    },
    date: 'Apr 08, 2023',
    amount: '$1,200.00',
    reason: 'Pricing error',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 'CN-2023-016',
    invoiceId: 'INV-2023-001',
    customer: {
      name: 'Global Enterprises',
      avatar: ''
    },
    date: 'Apr 05, 2023',
    amount: '$320.00',
    reason: 'Service not provided',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 'CN-2023-015',
    invoiceId: 'INV-2022-098',
    customer: {
      name: 'Quantum Solutions',
      avatar: ''
    },
    date: 'Mar 29, 2023',
    amount: '$750.00',
    reason: 'Goods damaged',
    status: 'Completed',
    statusColor: 'green'
  },
  {
    id: 'CN-2023-014',
    invoiceId: 'INV-2022-097',
    customer: {
      name: 'Stellar Systems',
      avatar: ''
    },
    date: 'Mar 22, 2023',
    amount: '$430.00',
    reason: 'Incorrect quantity',
    status: 'Rejected',
    statusColor: 'red'
  }
];

const CreditNote = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCreateCreditNote = () => {
    toast({
      title: "New Credit Note",
      description: "Credit note creation form would open here",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Credit Notes",
      description: "Credit note data export initiated",
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print Credit Notes",
      description: "Credit note print dialog would open here",
    });
  };
  
  const filteredCreditNotes = creditNotes.filter(note => 
    note.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.invoiceId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.reason.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-600';
      case 'processing':
        return 'bg-yellow-100 text-yellow-600';
      case 'rejected':
        return 'bg-red-100 text-red-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };
  
  return (
    <div>
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
        <h1 className="text-xl font-semibold text-primarytext">Credit Notes</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-secondarytext" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 text-secondarytext" />
            </Button>
          </div>
          <Button onClick={handleCreateCreditNote} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            <span>Create Credit Note</span>
          </Button>
        </div>
      </div>
      
      {/* Breadcrumbs - positioned after heading */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Sales', href: '/sales' },
          { label: 'Credit Notes' }
        ]}
        className="mb-4"
      />
      
      {/* Credit Note Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center text-red-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Credit Notes</p>
              <h3 className="text-xl font-semibold text-primarytext">42</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Completed</p>
              <h3 className="text-xl font-semibold text-primarytext">35</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm text-secondarytext">Processing</p>
              <h3 className="text-xl font-semibold text-primarytext">7</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Credit Note Table */}
      <Card className="overflow-hidden">
        {/* Table Filter/Search */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search credit notes..." 
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
              <option>Processing</option>
              <option>Rejected</option>
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
                    <span>Credit Note ID</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
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
                    <span>Reason</span>
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
              {filteredCreditNotes.map((note) => (
                <TableRow key={note.id} className="hover:bg-gray-50">
                  <TableCell className="text-sm font-medium text-primarytext">
                    {note.id}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {note.invoiceId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={note.customer.avatar} />
                        <AvatarFallback className="bg-primary text-white">
                          {note.customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 text-sm text-secondarytext">{note.customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {note.date}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-primarytext">
                    {note.amount}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {note.reason}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(note.status)}`}>
                      {note.status}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCreditNotes.length}</span> of <span className="font-medium">{filteredCreditNotes.length}</span> results
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

export default CreditNote;
