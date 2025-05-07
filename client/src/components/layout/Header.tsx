import { useState } from "react";
import {
  Bell,
  Settings,
  ChevronDown,
  Search,
  Calendar,
  Building2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { logout } from "@/lib/slices/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NotificationPopup from "@/components/popups/NotificationPopup";
import UserProfilePopup from "@/components/popups/UserProfilePopup";

const Header = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);

  const handleToggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserProfile) setShowUserProfile(false);
  };

  const handleToggleUserProfile = () => {
    setShowUserProfile(!showUserProfile);
    if (showNotifications) setShowNotifications(false);
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-white border-b border-gray-200 py-3 px-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Left: Company Logo with Dropdown */}
      <div className="flex">
        <div className="flex w-[14rem] items-center">
          <div className="bg-primary rounded-full h-8 w-8 flex items-center justify-center text-white font-semibold">
            M
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="ml-2 flex justify-between w-[11rem]  items-center cursor-pointer hover:text-primary transition-colors">
                <span className="font-semibold text-primarytext">
                  MrAix Expo
                </span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Your Companies</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex items-center">
                <Building2 className="mr-2 h-4 w-4 text-primary" />
                <span className="font-medium">MrAix Expo</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center opacity-60">
                <Building2 className="mr-2 h-4 w-4" />
                <span>Company Two</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center opacity-60">
                <Building2 className="mr-2 h-4 w-4" />
                <span>Company Three</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="text-primary">+ Add New Company</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {/* Center: Search bar */}
        <div className="flex-1 w-[30rem] hidden md:block">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
        </div>
      </div>

      {/* Right: Controls */}
      <div className="flex items-center space-x-4">
        {/* Period Selector */}
        <div className="hidden md:block">
          <div className="flex items-center border border-gray-200 rounded-lg px-2 py-1 text-sm">
            <span className="text-secondarytext ml-1">Apr 2023</span>
            <Calendar className="ml-2 text-primary h-4 w-4" />
          </div>
        </div>

        {/* Settings Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-secondarytext hover:text-primary w-10 h-10 rounded-full"
          onClick={() => (window.location.href = "/settings")}
        >
          <Settings className="h-5 w-5" />
        </Button>

        {/* Notifications Button */}
        <Button
          variant="ghost"
          size="icon"
          className="text-secondarytext hover:text-primary w-10 h-10 rounded-full relative"
          onClick={handleToggleNotifications}
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-2 right-2 h-4 w-4 bg-red-500 rounded-full text-white text-[10px] flex items-center justify-center">
            3
          </span>
        </Button>

        {/* User Profile Button */}
        <Button
          variant="ghost"
          className="p-0"
          onClick={handleToggleUserProfile}
        >
          <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
            <AvatarImage src={user?.avatar || ""} alt={user?.name || "User"} />
            <AvatarFallback className="bg-primary text-white">
              {user?.name?.charAt(0) || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </div>

      {/* Notification Popup */}
      {showNotifications && (
        <NotificationPopup onClose={() => setShowNotifications(false)} />
      )}

      {/* User Profile Popup */}
      {showUserProfile && (
        <UserProfilePopup
          onClose={() => setShowUserProfile(false)}
          onLogout={handleLogout}
        />
      )}
    </header>
  );
};

export default Header;
