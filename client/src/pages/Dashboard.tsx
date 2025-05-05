import { useState } from "react";
import { Link } from "wouter";
import {
  ArrowRight,
  Filter,
  Plus,
  ArrowUp,
  ArrowDown,
  ChevronLeft,
  ChevronRight,
  Megaphone,
  Mail,
  Search,
  Eye,
  Edit,
  Trash,
  Bot,
} from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

// Mock data for dashboard charts
const revenueData = [
  { name: "Jan", value: 4000 },
  { name: "Feb", value: 3000 },
  { name: "Mar", value: 5000 },
  { name: "Apr", value: 7000 },
  { name: "May", value: 6000 },
  { name: "Jun", value: 8000 },
  { name: "Jul", value: 10000 },
];

const pieData = [
  { name: "Sales", value: 94251 },
  { name: "Subscriptions", value: 42642 },
  { name: "Payments", value: 68195 },
  { name: "Other", value: 25000 },
];

const COLORS = ["#6B44EC", "#3B82F6", "#8B5CF6", "#10B981", "#F59E0B"];

const summaryCards = [
  {
    title: "Total Revenue",
    value: "$147,891.29",
    change: "+12.8%",
    increasing: true,
    icon: "dollar-sign",
    color: "primary",
    progress: 78,
  },
  {
    title: "Sales",
    value: "$94,251.40",
    change: "+8.2%",
    increasing: true,
    icon: "shopping-cart",
    color: "blue",
    progress: 65,
  },
  {
    title: "Subscriptions",
    value: "$42,642.12",
    change: "+17.4%",
    increasing: true,
    icon: "refresh-cw",
    color: "purple",
    progress: 82,
  },
  {
    title: "Payments",
    value: "$68,195.70",
    change: "-3.6%",
    increasing: false,
    icon: "credit-card",
    color: "green",
    progress: 45,
  },
];

const transactions = [
  {
    id: "INV-2023-004",
    type: "invoice",
    date: "Apr 15, 2023",
    customer: {
      name: "Acme Corporation",
      avatar: "",
    },
    amount: "$3,450.00",
    status: "Paid",
    statusColor: "green",
  },
  {
    id: "PAY-2023-125",
    type: "payment",
    date: "Apr 14, 2023",
    customer: {
      name: "TechNova Inc.",
      avatar: "",
    },
    amount: "$12,750.00",
    status: "Completed",
    statusColor: "green",
  },
  {
    id: "CN-2023-018",
    type: "credit-note",
    date: "Apr 12, 2023",
    customer: {
      name: "Global Enterprises",
      avatar: "",
    },
    amount: "$850.00",
    status: "Processing",
    statusColor: "yellow",
  },
  {
    id: "INV-2023-003",
    type: "invoice",
    date: "Apr 10, 2023",
    customer: {
      name: "Quantum Solutions",
      avatar: "",
    },
    amount: "$7,290.00",
    status: "Pending",
    statusColor: "blue",
  },
];

const Dashboard = () => {
  const { toast } = useToast();
  const [visibleCardRange, setVisibleCardRange] = useState({
    start: 0,
    end: 3,
  });

  const handleNextCards = () => {
    if (visibleCardRange.end < summaryCards.length) {
      setVisibleCardRange({
        start: visibleCardRange.start + 1,
        end: visibleCardRange.end + 1,
      });
    }
  };

  const handlePrevCards = () => {
    if (visibleCardRange.start > 0) {
      setVisibleCardRange({
        start: visibleCardRange.start - 1,
        end: visibleCardRange.end - 1,
      });
    }
  };

  const handleNewTransaction = () => {
    toast({
      title: "New Transaction",
      description: "Transaction form would open here",
    });
  };

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "invoice":
        return (
          <div className="h-8 w-8 rounded-md bg-blue-100 flex items-center justify-center text-blue-600">
            <FileText className="h-4 w-4" />
          </div>
        );
      case "payment":
        return (
          <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center text-green-600">
            <CreditCard className="h-4 w-4" />
          </div>
        );
      case "credit-note":
        return (
          <div className="h-8 w-8 rounded-md bg-red-100 flex items-center justify-center text-red-600">
            <FileText className="h-4 w-4" />
          </div>
        );
      default:
        return (
          <div className="h-8 w-8 rounded-md bg-gray-100 flex items-center justify-center text-gray-600">
            <FileText className="h-4 w-4" />
          </div>
        );
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-600";
      case "processing":
        return "bg-yellow-100 text-yellow-600";
      case "pending":
        return "bg-blue-100 text-blue-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div>
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
        <h1 className="text-xl font-semibold text-primarytext">Dashboard</h1>
      </div>

      {/* Breadcrumbs - positioned after heading */}
      <Breadcrumbs
        items={[{ label: "Home", href: "/" }, { label: "Dashboard" }]}
        className=""
      />

      {/* Summary Cards Section */}
      <div className="relative mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards
            .slice(visibleCardRange.start, visibleCardRange.end + 1)
            .map((card, index) => (
              <Card key={index} className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-secondarytext text-sm">{card.title}</p>
                    <h3 className="text-xl font-semibold mt-1 text-primarytext">
                      {card.value}
                    </h3>
                    <div className="flex items-center mt-2 text-xs">
                      <span
                        className={`flex items-center ${card.increasing ? "text-green-600" : "text-red-600"}`}
                      >
                        {card.increasing ? (
                          <ArrowUp className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDown className="h-3 w-3 mr-1" />
                        )}
                        {card.change}
                      </span>
                      <span className="text-secondarytext ml-2">
                        vs. last month
                      </span>
                    </div>
                  </div>
                  <div
                    className={`h-10 w-10 rounded-lg ${
                      card.color === "primary"
                        ? "bg-primary-light bg-opacity-20 text-primary"
                        : card.color === "blue"
                          ? "bg-blue-100 text-blue-600"
                          : card.color === "purple"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-green-100 text-green-600"
                    } 
                  flex items-center justify-center`}
                  >
                    {card.icon === "dollar-sign" ? (
                      <DollarSign className="h-5 w-5" />
                    ) : card.icon === "shopping-cart" ? (
                      <ShoppingCart className="h-5 w-5" />
                    ) : card.icon === "refresh-cw" ? (
                      <RefreshCw className="h-5 w-5" />
                    ) : (
                      <CreditCard className="h-5 w-5" />
                    )}
                  </div>
                </div>
                <div className="mt-3">
                  <Progress value={card.progress} className="h-1 bg-gray-100" />
                </div>
              </Card>
            ))}
        </div>
      </div>

      {/* AI Insights Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primarytext mb-4">
          AI Insights
        </h2>

        <Card className="p-5">
          <div className="flex items-start">
            <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
              <Bot className="h-5 w-5" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-primarytext">
                Revenue Growth Analysis
              </h3>
              <p className="text-sm text-secondarytext mt-1">
                Based on your current data, we predict a{" "}
                <span className="text-primary font-medium">15.2% growth</span>{" "}
                in Q2. Consider increasing marketing spend in the following
                areas:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="bg-light-bg-color rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary">
                      <Megaphone className="h-4 w-4" />
                    </div>
                    <div className="ml-2">
                      <h4 className="font-medium text-primarytext">
                        Social Media
                      </h4>
                      <p className="text-xs text-secondarytext">
                        Increase budget by 20%
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-light-bg-color rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary">
                      <Mail className="h-4 w-4" />
                    </div>
                    <div className="ml-2">
                      <h4 className="font-medium text-primarytext">
                        Email Campaigns
                      </h4>
                      <p className="text-xs text-secondarytext">
                        Optimize send times
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-light-bg-color rounded-lg p-3">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-primary">
                      <Search className="h-4 w-4" />
                    </div>
                    <div className="ml-2">
                      <h4 className="font-medium text-primarytext">PPC Ads</h4>
                      <p className="text-xs text-secondarytext">
                        Target new keywords
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <Button
                  variant="link"
                  className="text-sm text-primary font-medium flex items-center"
                >
                  <span>View detailed report</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-primarytext mb-4">
          Performance Analytics
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Line Chart */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-primarytext">Revenue Trend</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-light-bg-color text-primary px-2 py-1 text-xs"
                >
                  Weekly
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-secondarytext px-2 py-1 text-xs"
                >
                  Monthly
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-secondarytext px-2 py-1 text-xs"
                >
                  Yearly
                </Button>
              </div>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={revenueData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#6B44EC"
                    strokeWidth={2}
                  />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Pie Chart */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-primarytext">
                Revenue Distribution
              </h3>
              <Button
                size="icon"
                variant="ghost"
                className="text-sm text-secondarytext"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>

      {/* Data Table Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primarytext">
            Recent Transactions
          </h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="text-sm text-primary border-primary rounded-lg px-3 py-1.5 flex items-center"
            >
              <FileText className="h-4 w-4 mr-1" />
              Export
            </Button>
            <Button
              variant="outline"
              className="text-sm text-secondarytext border-gray-200 rounded-lg px-3 py-1.5 flex items-center"
            >
              <Printer className="h-4 w-4 mr-1" />
              Print
            </Button>
          </div>
        </div>

        <Card className="overflow-hidden">
          {/* Table Filter/Search */}
          <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search transactions..."
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </div>

            <div className="flex space-x-2">
              <select className="text-sm bg-gray-100 border border-transparent rounded-lg px-3 py-2 pr-8 focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none appearance-none transition">
                <option>All Types</option>
                <option>Invoice</option>
                <option>Payment</option>
                <option>Credit Note</option>
              </select>

              <select className="text-sm bg-gray-100 border border-transparent rounded-lg px-3 py-2 pr-8 focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none appearance-none transition">
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
                <option>This year</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="text-xs font-semibold text-secondarytext uppercase tracking-wider">
                    <div className="flex items-center">
                      <span>Transaction</span>
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
                      <span>Customer</span>
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
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div className="flex items-center">
                        {getTransactionIcon(transaction.type)}
                        <div className="ml-3">
                          <div className="text-sm font-medium text-primarytext">
                            {transaction.id}
                          </div>
                          <div className="text-xs text-secondarytext">
                            {transaction.type === "invoice"
                              ? "Invoice"
                              : transaction.type === "payment"
                                ? "Payment"
                                : "Credit Note"}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-secondarytext">
                      {transaction.date}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={transaction.customer.avatar} />
                          <AvatarFallback className="bg-gray-200 text-gray-600 text-xs">
                            {transaction.customer.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="ml-2 text-sm text-primarytext">
                          {transaction.customer.name}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm font-medium text-primarytext">
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${getStatusColor(transaction.status)}`}
                      >
                        {transaction.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-secondarytext hover:text-primary"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-secondarytext hover:text-primary"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-secondarytext hover:text-red-500"
                        >
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
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">10</span> of{" "}
              <span className="font-medium">45</span> results
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
              >
                2
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 py-1 text-sm border-gray-200 rounded-md text-secondarytext hover:border-primary hover:text-primary"
              >
                3
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="px-3 py-1 text-sm border-gray-200 rounded-md text-secondarytext hover:border-primary hover:text-primary"
              >
                Next
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

// Import icons used in the component
import {
  ChevronDown,
  FileText,
  CreditCard,
  RefreshCw,
  DollarSign,
  ShoppingCart,
  ArrowUp10,
  MoreVertical,
  Printer,
} from "lucide-react";

export default Dashboard;
