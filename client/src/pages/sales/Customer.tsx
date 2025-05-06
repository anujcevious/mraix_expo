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
  ArrowUp10
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

// Sample data for customers
const customers = [
  {
    id: 1,
    name: 'Acme Corporation',
    contact: 'John Smith',
    email: 'john@acmecorp.com',
    phone: '+1 (555) 123-4567',
    totalSpent: '$28,450.00',
    status: 'Active',
    avatar: ''
  },
  {
    id: 2,
    name: 'TechNova Inc.',
    contact: 'Sarah Johnson',
    email: 'sarah@technova.com',
    phone: '+1 (555) 987-6543',
    totalSpent: '$42,120.75',
    status: 'Active',
    avatar: ''
  },
  {
    id: 3,
    name: 'Global Enterprises',
    contact: 'Michael Brown',
    email: 'michael@globalent.com',
    phone: '+1 (555) 456-7890',
    totalSpent: '$15,845.25',
    status: 'Inactive',
    avatar: ''
  },
  {
    id: 4,
    name: 'Quantum Solutions',
    contact: 'Emily Davis',
    email: 'emily@quantumsol.com',
    phone: '+1 (555) 789-0123',
    totalSpent: '$67,320.50',
    status: 'Active',
    avatar: ''
  },
  {
    id: 5,
    name: 'Stellar Systems',
    contact: 'David Wilson',
    email: 'david@stellarsys.com',
    phone: '+1 (555) 234-5678',
    totalSpent: '$9,875.00',
    status: 'Inactive',
    avatar: ''
  }
];

const Customer = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCreateCustomer = () => {
    toast({
      title: "New Customer",
      description: "Customer creation form would open here",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export Data",
      description: "Customer data export initiated",
    });
  };
  
  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.contact.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/">
          <a className="text-primary">Home</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <Link href="/sales">
          <a className="text-primary">Sales</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <span className="text-secondarytext">Customer</span>
      </div>
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl font-semibold text-primarytext">Customers</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-secondarytext" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 text-secondarytext" />
            </Button>
          </div>
          <Button onClick={handleCreateCustomer} className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            <span>Add Customer</span>
          </Button>
        </div>
      </div>
      
      {/* Customer Table */}
      <Card className="overflow-hidden">
        {/* Table Filter/Search */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1">
            <input 
              type="text" 
              placeholder="Search customers..." 
              className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          
          <div className="flex space-x-2">
            <select className="text-sm bg-gray-100 border border-transparent rounded-lg px-3 py-2 pr-8 focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none appearance-none transition">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            
            <Button 
              variant="outline" 
              className="text-sm text-primary border-primary rounded-lg flex items-center"
              onClick={handleExport}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
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
                    <span>Customer</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Contact</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Email</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Phone</span>
                    <ArrowUp10 className="ml-1 h-3 w-3 text-gray-400" />
                  </div>
                </TableHead>
                <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                  <div className="flex items-center">
                    <span>Total Spent</span>
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
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={customer.avatar} />
                        <AvatarFallback className="bg-primary text-white">
                          {customer.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="ml-3 text-sm font-medium text-primarytext">{customer.name}</div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {customer.contact}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-sm text-secondarytext">
                    {customer.phone}
                  </TableCell>
                  <TableCell className="text-sm font-medium text-primarytext">
                    {customer.totalSpent}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      customer.status === 'Active' 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {customer.status}
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
            Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCustomers.length}</span> of <span className="font-medium">{filteredCustomers.length}</span> results
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

export default Customer;
