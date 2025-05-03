import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import ContentWrapper from "@/components/layout/ContentWrapper";

// Pages
import Dashboard from "@/pages/Dashboard";
import Customers from "@/pages/Sales/Customers";
import Invoices from "@/pages/Sales/Invoices";
import Suppliers from "@/pages/Purchase/Suppliers";
import Bills from "@/pages/Purchase/Bills";
import Products from "@/pages/Inventory/Products";
import Stock from "@/pages/Inventory/Stock";
import Reports from "@/pages/Reports";
import Communication from "@/pages/Communication";
import Collaboration from "@/pages/Collaboration";
import Account from "@/pages/Account";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="relative flex flex-col flex-1 overflow-hidden">
        <Header />
        <ContentWrapper>
          <Switch>
            <Route path="/" component={Dashboard} />
            <Route path="/sales/customers" component={Customers} />
            <Route path="/sales/invoices" component={Invoices} />
            <Route path="/purchase/suppliers" component={Suppliers} />
            <Route path="/purchase/bills" component={Bills} />
            <Route path="/inventory/products" component={Products} />
            <Route path="/inventory/stock" component={Stock} />
            <Route path="/reports" component={Reports} />
            <Route path="/communication" component={Communication} />
            <Route path="/collaboration" component={Collaboration} />
            <Route path="/account" component={Account} />
            <Route component={NotFound} />
          </Switch>
        </ContentWrapper>
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
