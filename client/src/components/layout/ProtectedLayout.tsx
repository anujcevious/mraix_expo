"use client";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useAppSelector } from "../../../../store/silce/hooks";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../store/store";
import { fetchUserByEmail, getAllCompany } from "../../../../store/silce/companySlice";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch<AppDispatch>();
  const [pathname] = useLocation();

  const isExpanded = useAppSelector((state) => state.globalSetting.isExpanded);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isAuthPage = pathname.startsWith("/auth");

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    dispatch(fetchUserByEmail("anujkumar@cevious.com"));
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCompany("anujkumar@cevious.com"));
  }, [dispatch]);

  // Don't show layout for company create page
  if (pathname === "/company/create") {
    return <>{children}</>;
  }

  return (
    <>
      {isAuthPage ? (
        children
      ) : (
        <div className="relative h-[100vh]">
          <div className="fixed bg-white my-auto border-b border-b-slate-200 h-[10vh] top-0 w-[100%]  z-20">
            <Header onMenuClick={toggleSidebar} isMobile={isMobile} />
          </div>
          <div className="flex mt-[10vh] h-[90vh]">
            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
              <div
                className="fixed inset-0 bg-black/50 z-30"
                onClick={() => setIsSidebarOpen(false)}
              />
            )}

            {/* Sidebar */}
            <div
              className={`fixed bg-white ${isMobile && "top-0 z-40"} left-0 transition-transform duration-300 ease-in-out ${
                isMobile
                  ? `w-[80%] h-full transform ${
                      isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`
                  : `${!isExpanded ? "w-[5%] " : "w-[20%]"} h-[90vh]`
              }`}
            >
              <Sidebar isMobile={isMobile} isSidebarOpen={isSidebarOpen} />
            </div>

            {/* Main content */}
            <main
              className={`transition-all duration-300 ease-in-out ${
                isMobile
                  ? "w-full p-4"
                  : `${isExpanded ? "w-[80%] ml-[20%]" : "w-[95%] ml-[5%]"} "m-auto p-5 bg-green-200"`
              }`}
            >
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
