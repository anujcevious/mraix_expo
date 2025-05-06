
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { fetchUserByEmail, getAllCompany } from "../../../../store/silce/companySlice";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [, setLocation] = useLocation();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isAuthenticated && user?.email) {
      dispatch(fetchUserByEmail(user.email));
      dispatch(getAllCompany(user.email));
    }
  }, [dispatch, isAuthenticated, user?.email]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isAuthenticated && !token) {
      setLocation("/auth");
    } else if (location === "/") {
      setLocation("/dashboard");
    }
  }, [isAuthenticated, setLocation, location]);

  if (!isAuthenticated && !localStorage.getItem("token")) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} className="px-4 h-14" />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={`flex-1 overflow-y-auto bg-gray-50 p-4 md:p-5 ${isMobile && isSidebarOpen ? 'opacity-50 pointer-events-none' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
