
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const [, setLocation] = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/auth");
    }
  }, [isAuthenticated, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} className="px-4 h-14" />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
        <main className={`flex-1 overflow-y-auto bg-gray-50 p-4 md:p-5 ${isMobile && isSidebarOpen ? 'opacity-50' : ''}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default ProtectedLayout;
