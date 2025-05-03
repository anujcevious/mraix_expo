import React from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import CardView from '@/components/common/CardView';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports: React.FC = () => {
  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Reports' }]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <p className="text-gray-500">View and analyze business performance</p>
      </div>

      {/* Report Filters */}
      <div className="bg-white rounded-lg border border-border p-4 shadow-sm mb-6">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
            <Select defaultValue="last-30-days">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="last-7-days">Last 7 days</SelectItem>
                <SelectItem value="last-30-days">Last 30 days</SelectItem>
                <SelectItem value="this-month">This month</SelectItem>
                <SelectItem value="last-month">Last month</SelectItem>
                <SelectItem value="this-quarter">This quarter</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Report Type</label>
            <Select defaultValue="sales">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sales">Sales Report</SelectItem>
                <SelectItem value="purchases">Purchases Report</SelectItem>
                <SelectItem value="inventory">Inventory Report</SelectItem>
                <SelectItem value="financial">Financial Report</SelectItem>
                <SelectItem value="customer">Customer Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <Select defaultValue="all">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="audio">Audio</SelectItem>
                <SelectItem value="wearables">Wearables</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-end">
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors h-10">
              Generate Report
            </Button>
          </div>
        </div>
      </div>
      
      {/* Report Tabs */}
      <Tabs defaultValue="overview" className="mb-6">
        <TabsList className="w-full bg-background border border-border rounded-lg mb-4">
          <TabsTrigger value="overview" className="flex-1">Overview</TabsTrigger>
          <TabsTrigger value="sales" className="flex-1">Sales</TabsTrigger>
          <TabsTrigger value="purchases" className="flex-1">Purchases</TabsTrigger>
          <TabsTrigger value="inventory" className="flex-1">Inventory</TabsTrigger>
          <TabsTrigger value="customers" className="flex-1">Customers</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-semibold">{formatCurrency(145680.25)}</h3>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 mr-1"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                8.2% vs. previous period
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <p className="text-sm text-gray-500">Gross Profit</p>
              <h3 className="text-2xl font-semibold">{formatCurrency(58272.10)}</h3>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 mr-1"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                5.4% vs. previous period
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-semibold">492</h3>
              <div className="mt-2 flex items-center text-xs text-red-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 mr-1"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
                2.1% vs. previous period
              </div>
            </div>
            
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <p className="text-sm text-gray-500">Average Order Value</p>
              <h3 className="text-2xl font-semibold">{formatCurrency(296.10)}</h3>
              <div className="mt-2 flex items-center text-xs text-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-3 w-3 mr-1"
                >
                  <path d="m18 15-6-6-6 6" />
                </svg>
                3.5% vs. previous period
              </div>
            </div>
          </div>
          
          {/* Sales Overview Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
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
                {Array.from({ length: 12 }).map((_, index) => {
                  const value = Math.floor(Math.random() * 80) + 20;
                  const month = new Date(0, index).toLocaleString('default', { month: 'short' });
                  const isCurrentMonth = index === 6; // Highlight July

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className={`w-full ${
                          isCurrentMonth ? 'bg-primary' : 'bg-primary/10'
                        } hover:bg-primary/20 rounded-t-sm`}
                        style={{ height: `${value}%` }}
                      ></div>
                      <span className="text-xs mt-1 text-gray-500">{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* Sales by Category */}
            <div className="bg-white rounded-lg border border-border p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Sales by Category</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Electronics</span>
                    <span className="text-sm font-medium">42%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Audio</span>
                    <span className="text-sm font-medium">28%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-secondary h-2 rounded-full" style={{ width: '28%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Wearables</span>
                    <span className="text-sm font-medium">17%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-accent h-2 rounded-full" style={{ width: '17%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Other</span>
                    <span className="text-sm font-medium">13%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-gray-500 h-2 rounded-full" style={{ width: '13%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h4 className="text-sm font-medium mb-2">Top Selling Category</h4>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 text-primary">
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
                      <rect width="18" height="12" x="3" y="4" rx="2" ry="2" />
                      <line x1="2" y1="20" x2="22" y2="20" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-medium">Electronics</div>
                    <div className="text-xs text-gray-500">{formatCurrency(61185.71)} sales</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recent Reports */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-4">Recent Reports</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'Monthly Sales Report - July 2023', icon: 'sales', date: '2023-07-31', type: 'Sales' },
                { title: 'Inventory Status Report - July 2023', icon: 'inventory', date: '2023-07-31', type: 'Inventory' },
                { title: 'Customer Activity Report - Q2 2023', icon: 'customer', date: '2023-07-15', type: 'Customer' },
                { title: 'Financial Statement - Q2 2023', icon: 'financial', date: '2023-07-10', type: 'Financial' },
              ].map((report, index) => (
                <CardView key={index}>
                  <div className="flex items-start">
                    <div className={`h-10 w-10 rounded flex items-center justify-center mr-3 flex-shrink-0 ${
                      report.icon === 'sales' ? 'bg-primary/10 text-primary' :
                      report.icon === 'inventory' ? 'bg-accent/10 text-accent' :
                      report.icon === 'customer' ? 'bg-indigo-100 text-indigo-600' :
                      'bg-gray-100 text-gray-600'
                    }`}>
                      {report.icon === 'sales' && (
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
                          <path d="M3 3v18h18" />
                          <path d="m19 9-5 5-4-4-3 3" />
                        </svg>
                      )}
                      {report.icon === 'inventory' && (
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
                      )}
                      {report.icon === 'customer' && (
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
                      )}
                      {report.icon === 'financial' && (
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
                          <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                          <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                          <path d="M18 12H7" />
                          <path d="M18 16H7" />
                          <path d="M18 20H7" />
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{report.title}</h4>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">Generated: {new Date(report.date).toLocaleDateString()}</span>
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full">{report.type}</span>
                      </div>
                      <div className="flex mt-3 space-x-2">
                        <Button variant="secondary" size="sm" className="text-xs h-8">
                          View Report
                        </Button>
                        <Button variant="outline" size="sm" className="text-xs h-8">
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardView>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="sales">
          <div className="p-8 text-center bg-white rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-medium">Sales Reports</h3>
            <p className="text-gray-500 mt-2">Detailed sales reports with analytics and trends</p>
            <Button className="mt-4 bg-primary text-white hover:bg-primary/90 transition-colors">
              Generate Sales Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="purchases">
          <div className="p-8 text-center bg-white rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-medium">Purchase Reports</h3>
            <p className="text-gray-500 mt-2">Track purchase orders, payments, and supplier performance</p>
            <Button className="mt-4 bg-primary text-white hover:bg-primary/90 transition-colors">
              Generate Purchase Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="inventory">
          <div className="p-8 text-center bg-white rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-medium">Inventory Reports</h3>
            <p className="text-gray-500 mt-2">Monitor stock levels, movements, and valuation</p>
            <Button className="mt-4 bg-primary text-white hover:bg-primary/90 transition-colors">
              Generate Inventory Report
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <div className="p-8 text-center bg-white rounded-lg border border-border shadow-sm">
            <h3 className="text-lg font-medium">Customer Reports</h3>
            <p className="text-gray-500 mt-2">Analyze customer behavior, retention, and lifetime value</p>
            <Button className="mt-4 bg-primary text-white hover:bg-primary/90 transition-colors">
              Generate Customer Report
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Reports;
