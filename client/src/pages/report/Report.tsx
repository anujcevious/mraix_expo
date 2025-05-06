import { Link } from 'wouter';
import { 
  ChevronRight,
  BarChart4,
  PieChart,
  LineChart,
  FileText,
  ArrowRight
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import  Button  from '@/components/ui/Button';

// Define report types for the grid
const reports = [
  {
    id: 1,
    title: 'Balance Sheet',
    description: 'A snapshot of your company\'s financial position at a specific point in time.',
    icon: <BarChart4 className="h-10 w-10 text-blue-500" />,
    link: '/report/balance-sheet',
    category: 'Financial',
    color: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'Income Statement',
    description: 'Shows your revenue, expenses, and profits over a specific period.',
    icon: <LineChart className="h-10 w-10 text-green-500" />,
    link: '/report/income-statement',
    category: 'Financial', 
    color: 'bg-green-50'
  },
  {
    id: 3,
    title: 'Cash Flow Statement',
    description: 'Tracks the flow of cash in and out of your business over a period.',
    icon: <LineChart className="h-10 w-10 text-purple-500" />,
    link: '/report/cash-flow',
    category: 'Financial',
    color: 'bg-purple-50'
  },
  {
    id: 4,
    title: 'Trial Balance',
    description: 'Lists the ending balances of all accounts in the general ledger.',
    icon: <FileText className="h-10 w-10 text-indigo-500" />,
    link: '/report/trial-balance',
    category: 'Financial',
    color: 'bg-indigo-50'
  },
  {
    id: 5,
    title: 'Accounts Receivable Aging',
    description: 'Groups unpaid customer invoices by age to track overdue payments.',
    icon: <PieChart className="h-10 w-10 text-red-500" />,
    link: '/report/ar-aging',
    category: 'Sales',
    color: 'bg-red-50'
  },
  {
    id: 6,
    title: 'Sales Analysis',
    description: 'Breakdown of sales by product, customer, region, or time period.',
    icon: <BarChart4 className="h-10 w-10 text-amber-500" />,
    link: '/report/sales-analysis',
    category: 'Sales',
    color: 'bg-amber-50'
  },
  {
    id: 7,
    title: 'Accounts Payable Aging',
    description: 'Groups unpaid vendor invoices by age to manage payments.',
    icon: <PieChart className="h-10 w-10 text-emerald-500" />,
    link: '/report/ap-aging',
    category: 'Purchase',
    color: 'bg-emerald-50'
  },
  {
    id: 8,
    title: 'Purchase Analysis',
    description: 'Breakdown of purchases by product, vendor, or time period.',
    icon: <BarChart4 className="h-10 w-10 text-teal-500" />,
    link: '/report/purchase-analysis',
    category: 'Purchase',
    color: 'bg-teal-50'
  }
];

const Report = () => {
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/">
          <a className="text-primary">Home</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <span className="text-secondarytext">Reports</span>
      </div>
      
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primarytext">Reports & Analysis</h1>
        <p className="text-secondarytext mt-1">Access and generate financial and business reports</p>
      </div>
      
      {/* Categories */}
      <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
        <Button variant="outline" className="rounded-full bg-primary text-white hover:bg-primary-dark">
          All Reports
        </Button>
        <Button variant="outline" className="rounded-full">
          Financial
        </Button>
        <Button variant="outline" className="rounded-full">
          Sales
        </Button>
        <Button variant="outline" className="rounded-full">
          Purchase
        </Button>
        <Button variant="outline" className="rounded-full">
          Inventory
        </Button>
        <Button variant="outline" className="rounded-full">
          Tax
        </Button>
      </div>
      
      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <Card key={report.id} className={`p-6 ${report.color} border-none hover:shadow-md transition-shadow duration-200`}>
            <div className="flex flex-col h-full">
              <div className="mb-4">
                {report.icon}
              </div>
              <h3 className="text-lg font-semibold text-primarytext mb-2">{report.title}</h3>
              <p className="text-secondarytext text-sm mb-4 flex-grow">{report.description}</p>
              
              <Link href={report.link}>
                <a className="inline-flex items-center text-primary font-medium text-sm hover:underline mt-auto">
                  View Report
                  <ArrowRight className="ml-1 h-4 w-4" />
                </a>
              </Link>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Recently Viewed Reports */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold text-primarytext mb-4">Recently Viewed</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 rounded-md p-2">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-primarytext">Balance Sheet</h3>
                <p className="text-xs text-secondarytext">Viewed 2 hours ago</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className="bg-indigo-100 rounded-md p-2">
                <FileText className="h-6 w-6 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-primarytext">Trial Balance</h3>
                <p className="text-xs text-secondarytext">Viewed 1 day ago</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className="bg-amber-100 rounded-md p-2">
                <BarChart4 className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-primarytext">Sales Analysis</h3>
                <p className="text-xs text-secondarytext">Viewed 2 days ago</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 rounded-md p-2">
                <PieChart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-primarytext">AR Aging</h3>
                <p className="text-xs text-secondarytext">Viewed 3 days ago</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Report;