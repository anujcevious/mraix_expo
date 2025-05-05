import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { loginSuccess } from '@/lib/slices/authSlice';
import NotFound from "@/pages/not-found";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/Dashboard";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Customer from "@/pages/sales/Customer";
import Invoice from "@/pages/sales/Invoice";
import CreditNote from "@/pages/sales/CreditNote";
import Receipt from "@/pages/sales/Receipt";
import Vendor from "@/pages/purchase/Vendor";
import Purchase from "@/pages/purchase/Purchase";
import DebitNote from "@/pages/purchase/DebitNote";
import Payment from "@/pages/purchase/Payment";
import TrialBalance from "@/pages/report/TrialBalance";

function Router() {
  return (
    <Switch>
      {/* Auth Route */}
      <Route path="/auth" component={Auth} />
      
      {/* Protected Routes */}
      <Route path="/">
        <ProtectedLayout>
          <Dashboard />
        </ProtectedLayout>
      </Route>
      
      {/* Sales Routes */}
      <Route path="/sales/customer">
        <ProtectedLayout>
          <Customer />
        </ProtectedLayout>
      </Route>
      
      <Route path="/sales/invoice">
        <ProtectedLayout>
          <Invoice />
        </ProtectedLayout>
      </Route>
      
      <Route path="/sales/credit-note">
        <ProtectedLayout>
          <CreditNote />
        </ProtectedLayout>
      </Route>
      
      <Route path="/sales/receipt">
        <ProtectedLayout>
          <Receipt />
        </ProtectedLayout>
      </Route>

      {/* Purchase Routes */}
      <Route path="/purchase/vendor">
        <ProtectedLayout>
          <Vendor />
        </ProtectedLayout>
      </Route>
      
      <Route path="/purchase/purchase">
        <ProtectedLayout>
          <Purchase />
        </ProtectedLayout>
      </Route>
      
      <Route path="/purchase/debit-note">
        <ProtectedLayout>
          <DebitNote />
        </ProtectedLayout>
      </Route>
      
      <Route path="/purchase/payment">
        <ProtectedLayout>
          <Payment />
        </ProtectedLayout>
      </Route>

      {/* Report Routes */}
      <Route path="/report/trial-balance">
        <ProtectedLayout>
          <TrialBalance />
        </ProtectedLayout>
      </Route>

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const dispatch = useDispatch();
  
  // For development/testing only: Set a mock user
  useEffect(() => {
    const mockUser = {
      user: {
        id: 1,
        username: 'admin',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        lastLogin: new Date().toISOString(),
        avatar: ''
      },
      token: 'mock-token-12345'
    };
    
    dispatch(loginSuccess(mockUser));
  }, [dispatch]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
