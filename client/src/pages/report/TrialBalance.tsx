import { useState } from "react";
import { Link } from "wouter";
import {
  ChevronRight,
  Filter,
  Download,
  ChevronDown,
  Printer,
  Calendar,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

// Sample data for trial balance
const trialBalanceData = [
  {
    id: 1,
    accountNumber: "1000",
    accountName: "Cash",
    debit: 45250.0,
    credit: 0,
  },
  {
    id: 2,
    accountNumber: "1200",
    accountName: "Accounts Receivable",
    debit: 32750.25,
    credit: 0,
  },
  {
    id: 3,
    accountNumber: "1300",
    accountName: "Inventory",
    debit: 78920.75,
    credit: 0,
  },
  {
    id: 4,
    accountNumber: "1400",
    accountName: "Prepaid Expenses",
    debit: 5320.0,
    credit: 0,
  },
  {
    id: 5,
    accountNumber: "1500",
    accountName: "Property, Plant and Equipment",
    debit: 187450.0,
    credit: 0,
  },
  {
    id: 6,
    accountNumber: "1600",
    accountName: "Accumulated Depreciation",
    debit: 0,
    credit: 45680.0,
  },
  {
    id: 7,
    accountNumber: "1700",
    accountName: "Intangible Assets",
    debit: 35000.0,
    credit: 0,
  },
  {
    id: 8,
    accountNumber: "2000",
    accountName: "Accounts Payable",
    debit: 0,
    credit: 27340.5,
  },
  {
    id: 9,
    accountNumber: "2100",
    accountName: "Accrued Expenses",
    debit: 0,
    credit: 5840.0,
  },
  {
    id: 10,
    accountNumber: "2200",
    accountName: "Short-term Loans",
    debit: 0,
    credit: 15000.0,
  },
  {
    id: 11,
    accountNumber: "2300",
    accountName: "Current Portion of Long-term Debt",
    debit: 0,
    credit: 10000.0,
  },
  {
    id: 12,
    accountNumber: "2500",
    accountName: "Long-term Debt",
    debit: 0,
    credit: 75000.0,
  },
  {
    id: 13,
    accountNumber: "2600",
    accountName: "Deferred Tax Liabilities",
    debit: 0,
    credit: 12500.0,
  },
  {
    id: 14,
    accountNumber: "3000",
    accountName: "Common Stock",
    debit: 0,
    credit: 50000.0,
  },
  {
    id: 15,
    accountNumber: "3100",
    accountName: "Additional Paid-in Capital",
    debit: 0,
    credit: 111000.0,
  },
  {
    id: 16,
    accountNumber: "3200",
    accountName: "Retained Earnings",
    debit: 0,
    credit: 128010.5,
  },
  {
    id: 17,
    accountNumber: "4000",
    accountName: "Revenue",
    debit: 0,
    credit: 326500.0,
  },
  {
    id: 18,
    accountNumber: "5000",
    accountName: "Cost of Goods Sold",
    debit: 214750.0,
    credit: 0,
  },
  {
    id: 19,
    accountNumber: "6000",
    accountName: "Operating Expenses",
    debit: 78930.0,
    credit: 0,
  },
  {
    id: 20,
    accountNumber: "7000",
    accountName: "Depreciation Expense",
    debit: 12350.0,
    credit: 0,
  },
  {
    id: 21,
    accountNumber: "8000",
    accountName: "Interest Expense",
    debit: 4500.0,
    credit: 0,
  },
  {
    id: 22,
    accountNumber: "9000",
    accountName: "Income Tax Expense",
    debit: 15400.0,
    credit: 0,
  },
];

const TrialBalance = () => {
  const { toast } = useToast();
  const [selectedPeriod, setSelectedPeriod] = useState("April 30, 2023");

  const handleExport = () => {
    toast({
      title: "Export Report",
      description: "Trial Balance data export initiated",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Report",
      description: "Trial Balance print dialog would open here",
    });
  };

  // Calculate totals
  const totalDebit = trialBalanceData.reduce(
    (sum, account) => sum + account.debit,
    0,
  );
  const totalCredit = trialBalanceData.reduce(
    (sum, account) => sum + account.credit,
    0,
  );

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
        <span className="text-secondarytext">Trial Balance</span>
      </div>

      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-xl font-semibold text-primarytext">
          Trial Balance
        </h1>
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

      {/* Trial Balance Report */}
      <Card className="overflow-hidden">
        {/* Report Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="text-center">
            <h2 className="text-lg font-semibold text-primarytext">
              MrAix Expo
            </h2>
            <p className="text-md font-medium text-secondarytext">
              Trial Balance
            </p>
            <p className="text-sm text-secondarytext">As of {selectedPeriod}</p>
          </div>
        </div>

        {/* Trial Balance Table */}
        <div className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-24">Account #</TableHead>
                <TableHead>Account Name</TableHead>
                <TableHead className="text-right">Debit</TableHead>
                <TableHead className="text-right">Credit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trialBalanceData.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="text-sm text-secondarytext">
                    {account.accountNumber}
                  </TableCell>
                  <TableCell className="font-medium text-primarytext">
                    {account.accountName}
                  </TableCell>
                  <TableCell className="text-right text-primarytext">
                    {account.debit > 0 ? formatCurrency(account.debit) : ""}
                  </TableCell>
                  <TableCell className="text-right text-primarytext">
                    {account.credit > 0 ? formatCurrency(account.credit) : ""}
                  </TableCell>
                </TableRow>
              ))}

              {/* Total Row */}
              <TableRow className="border-t-2 border-gray-200 font-semibold bg-gray-50">
                <TableCell colSpan={2} className="text-primarytext">
                  Totals
                </TableCell>
                <TableCell className="text-right text-primarytext">
                  {formatCurrency(totalDebit)}
                </TableCell>
                <TableCell className="text-right text-primarytext">
                  {formatCurrency(totalCredit)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>

        {/* Footer Notes */}
        <div className="p-4 border-t border-gray-100">
          <div className="text-sm text-secondarytext">
            <span className="font-medium">Notes:</span> This trial balance is
            prepared in accordance with International Financial Reporting
            Standards (IFRS).
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TrialBalance;
