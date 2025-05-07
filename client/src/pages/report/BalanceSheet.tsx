import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, 
  Filter, 
  Download, 
  ChevronDown,
  Printer,
  Calendar
} from 'lucide-react';
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
import { useToast } from '@/hooks/use-toast';

// Sample data for balance sheet
const balanceSheetData = {
  assets: [
    {
      id: 1,
      category: 'Current Assets',
      items: [
        { name: 'Cash and Cash Equivalents', amount: 45250.00 },
        { name: 'Accounts Receivable', amount: 32750.25 },
        { name: 'Inventory', amount: 78920.75 },
        { name: 'Prepaid Expenses', amount: 5320.00 }
      ]
    },
    {
      id: 2,
      category: 'Non-Current Assets',
      items: [
        { name: 'Property, Plant and Equipment', amount: 187450.00 },
        { name: 'Intangible Assets', amount: 35000.00 },
        { name: 'Long-term Investments', amount: 50000.00 }
      ]
    }
  ],
  liabilities: [
    {
      id: 3,
      category: 'Current Liabilities',
      items: [
        { name: 'Accounts Payable', amount: 27340.50 },
        { name: 'Accrued Expenses', amount: 5840.00 },
        { name: 'Short-term Loans', amount: 15000.00 },
        { name: 'Current Portion of Long-term Debt', amount: 10000.00 }
      ]
    },
    {
      id: 4,
      category: 'Non-Current Liabilities',
      items: [
        { name: 'Long-term Debt', amount: 75000.00 },
        { name: 'Deferred Tax Liabilities', amount: 12500.00 }
      ]
    }
  ],
  equity: [
    {
      id: 5,
      category: 'Shareholders\' Equity',
      items: [
        { name: 'Common Stock', amount: 50000.00 },
        { name: 'Retained Earnings', amount: 128010.50 },
        { name: 'Additional Paid-in Capital', amount: 111000.00 }
      ]
    }
  ]
};

const BalanceSheet = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState('April 30, 2023');
  
  const handleExport = () => {
    toast({
      title: "Export Report",
      description: "Balance Sheet data export initiated",
    });
  };
  
  const handlePrint = () => {
    toast({
      title: "Print Report",
      description: "Balance Sheet print dialog would open here",
    });
  };
  
  // Calculate totals
  const totalCurrentAssets = balanceSheetData.assets[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentAssets = balanceSheetData.assets[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalAssets = totalCurrentAssets + totalNonCurrentAssets;
  
  const totalCurrentLiabilities = balanceSheetData.liabilities[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalNonCurrentLiabilities = balanceSheetData.liabilities[1].items.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalNonCurrentLiabilities;
  
  const totalEquity = balanceSheetData.equity[0].items.reduce((sum, item) => sum + item.amount, 0);
  const totalLiabilitiesAndEquity = totalLiabilities + totalEquity;
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return `$${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };
  
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/">
          <a className="text-primary">Home</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <Link href="/report">
          <a className="text-primary">Report</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <span className="text-secondarytext">Balance Sheet</span>
      </div>
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl font-semibold text-primarytext">Balance Sheet</h1>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-secondarytext" />
              <span>{selectedPeriod}</span>
              <ChevronDown className="h-4 w-4 text-secondarytext" />
            </Button>
          </div>
          <div className="relative">
            <Button variant="outline" className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-secondarytext" />
              <span>Filter</span>
              <ChevronDown className="h-4 w-4 text-secondarytext" />
            </Button>
          </div>
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
      
      {/* Report Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Assets</p>
              <h3 className="text-xl font-semibold text-primarytext">{formatCurrency(totalAssets)}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-red-100 flex items-center justify-center text-red-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                <path fillRule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Liabilities</p>
              <h3 className="text-xl font-semibold text-primarytext">{formatCurrency(totalLiabilities)}</h3>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-secondarytext">Total Equity</p>
              <h3 className="text-xl font-semibold text-primarytext">{formatCurrency(totalEquity)}</h3>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Balance Sheet */}
      <Card className="overflow-hidden">
        {/* Report Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-primarytext">MrAix Expo</h2>
            <p className="text-md font-medium text-secondarytext">Balance Sheet</p>
            <p className="text-sm text-secondarytext">As of {selectedPeriod}</p>
          </div>
        </div>
        
        {/* Assets */}
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-md font-semibold text-primarytext mb-3">Assets</h3>
          <Table>
            <TableBody>
              {/* Current Assets */}
              <TableRow className="border-0">
                <TableCell className="pl-0 font-medium text-secondarytext">
                  {balanceSheetData.assets[0].category}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {balanceSheetData.assets[0].items.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="pl-8 text-sm text-secondarytext">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right text-sm text-primarytext">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-0">
                <TableCell className="pl-0 text-sm font-medium text-primarytext">
                  Total Current Assets
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right text-sm font-medium text-primarytext">
                  {formatCurrency(totalCurrentAssets)}
                </TableCell>
              </TableRow>
              
              {/* Non-Current Assets */}
              <TableRow className="border-0">
                <TableCell className="pl-0 font-medium text-secondarytext pt-4">
                  {balanceSheetData.assets[1].category}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {balanceSheetData.assets[1].items.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="pl-8 text-sm text-secondarytext">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right text-sm text-primarytext">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-0">
                <TableCell className="pl-0 text-sm font-medium text-primarytext">
                  Total Non-Current Assets
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right text-sm font-medium text-primarytext">
                  {formatCurrency(totalNonCurrentAssets)}
                </TableCell>
              </TableRow>
              
              {/* Total Assets */}
              <TableRow className="border-0 bg-gray-50">
                <TableCell className="pl-0 font-semibold text-primarytext pt-4">
                  Total Assets
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-semibold text-primarytext">
                  {formatCurrency(totalAssets)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Liabilities and Equity */}
        <div className="p-4">
          <h3 className="text-md font-semibold text-primarytext mb-3">Liabilities and Shareholders' Equity</h3>
          <Table>
            <TableBody>
              {/* Current Liabilities */}
              <TableRow className="border-0">
                <TableCell className="pl-0 font-medium text-secondarytext">
                  {balanceSheetData.liabilities[0].category}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {balanceSheetData.liabilities[0].items.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="pl-8 text-sm text-secondarytext">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right text-sm text-primarytext">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-0">
                <TableCell className="pl-0 text-sm font-medium text-primarytext">
                  Total Current Liabilities
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right text-sm font-medium text-primarytext">
                  {formatCurrency(totalCurrentLiabilities)}
                </TableCell>
              </TableRow>
              
              {/* Non-Current Liabilities */}
              <TableRow className="border-0">
                <TableCell className="pl-0 font-medium text-secondarytext pt-4">
                  {balanceSheetData.liabilities[1].category}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {balanceSheetData.liabilities[1].items.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="pl-8 text-sm text-secondarytext">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right text-sm text-primarytext">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-0">
                <TableCell className="pl-0 text-sm font-medium text-primarytext">
                  Total Non-Current Liabilities
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right text-sm font-medium text-primarytext">
                  {formatCurrency(totalNonCurrentLiabilities)}
                </TableCell>
              </TableRow>
              
              {/* Total Liabilities */}
              <TableRow className="border-0">
                <TableCell className="pl-0 font-medium text-primarytext pt-2">
                  Total Liabilities
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-medium text-primarytext">
                  {formatCurrency(totalLiabilities)}
                </TableCell>
              </TableRow>
              
              {/* Shareholders' Equity */}
              <TableRow className="border-0">
                <TableCell className="pl-0 font-medium text-secondarytext pt-4">
                  {balanceSheetData.equity[0].category}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
              
              {balanceSheetData.equity[0].items.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="pl-8 text-sm text-secondarytext">
                    {item.name}
                  </TableCell>
                  <TableCell className="text-right text-sm text-primarytext">
                    {formatCurrency(item.amount)}
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              ))}
              
              <TableRow className="border-0">
                <TableCell className="pl-0 text-sm font-medium text-primarytext">
                  Total Shareholders' Equity
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right text-sm font-medium text-primarytext">
                  {formatCurrency(totalEquity)}
                </TableCell>
              </TableRow>
              
              {/* Total Liabilities and Equity */}
              <TableRow className="border-0 bg-gray-50">
                <TableCell className="pl-0 font-semibold text-primarytext pt-4">
                  Total Liabilities and Equity
                </TableCell>
                <TableCell></TableCell>
                <TableCell className="text-right font-semibold text-primarytext">
                  {formatCurrency(totalLiabilitiesAndEquity)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
        
        {/* Footer Notes */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-sm text-secondarytext">
            <span className="font-medium">Notes:</span> This balance sheet is prepared in accordance with International Financial Reporting Standards (IFRS).
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BalanceSheet;

//test