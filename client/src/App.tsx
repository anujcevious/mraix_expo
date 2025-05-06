import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "next-themes";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { loginSuccess } from "../../store/silce/auth/authSlice";
import ProtectedLayout from "@/components/layout/ProtectedLayout";
import { routes } from "./routes"; // Import the routes array

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
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
      token: "mock-token-12345",
    };

    dispatch(loginSuccess(mockUser));
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Switch>
            {routes.map((route) => (
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
            ))}
          </Switch>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;