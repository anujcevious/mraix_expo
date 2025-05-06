
import { ReactNode } from "react";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import Auth from "@/pages/auth";
import Dashboard from "@/pages/Dashboard";
import Customer from "@/pages/sales/Customer";
import Invoice from "@/pages/sales/Invoice";
import CreditNote from "@/pages/sales/CreditNote";
import Receipt from "@/pages/sales/Receipt";
import Vendor from "@/pages/purchase/Vendor";
import Purchase from "@/pages/purchase/Purchase";
import DebitNote from "@/pages/purchase/DebitNote";
import Payment from "@/pages/purchase/Payment";
import TrialBalance from "@/pages/report/TrialBalance";
import NotFound from "@/pages/not-found";

interface RouteConfig {
  path: string;
  component: ReactNode;
  protected?: boolean;
}

export const routes: RouteConfig[] = [
  {
    path: "/auth",
    component: <Auth />,
  },
  {
    path: "/",
    component: <Dashboard />,
    protected: true,
  },
  {
    path: "/sales/customer",
    component: <Customer />,
    protected: true,
  },
  {
    path: "/sales/invoice",
    component: <Invoice />,
    protected: true,
  },
  {
    path: "/sales/credit-note",
    component: <CreditNote />,
    protected: true,
  },
  {
    path: "/sales/receipt",
    component: <Receipt />,
    protected: true,
  },
  {
    path: "/purchase/vendor",
    component: <Vendor />,
    protected: true,
  },
  {
    path: "/purchase/purchase",
    component: <Purchase />,
    protected: true,
  },
  {
    path: "/purchase/debit-note",
    component: <DebitNote />,
    protected: true,
  },
  {
    path: "/purchase/payment",
    component: <Payment />,
    protected: true,
  },
  {
    path: "/report/trial-balance",
    component: <TrialBalance />,
    protected: true,
  },
  {
    path: "*",
    component: <NotFound />,
  },
];
