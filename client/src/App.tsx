import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "../../store/silce/auth/authSlice";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { routes } from "./routes"; // Import the routes array
import { RootState } from "../../store/store";
import Demo from "./Demo";
import Create from "./pages/company/create/Create";

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && !isAuthenticated) {
      const mockUser = {
        user: {
          id: 1,
          username: "admin",
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
          lastLogin: new Date().toISOString(),
          avatar: "",
        },
        token: token,
      };
      dispatch(loginSuccess(mockUser));
    }
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            <Route path="/company/create" component={Create} />
            {routes.map((route) => (
              route.path !== "/company/create" && (
                <Route
                  key={route.path}
                  path={route.path}
                  component={() =>
                    route.protected ? (
                      <ProtectedLayout>{route.component}</ProtectedLayout>
                    ) : (
                      route.component
                    )
                  }
                />
              )
            ))}
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
