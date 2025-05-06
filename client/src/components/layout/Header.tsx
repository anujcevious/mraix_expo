import { useState } from "react";
import { Bell, Settings, Search, Calendar, Menu } from "lucide-react";
import CompanySelect from "@/components/ui/CompanySelect";
import { useIsMobile } from "@/hooks/use-mobile";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { logout } from "../../../../store/silce/auth/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchBox from "../ui/SearchBox";
import Button from "@/components/ui/Button";
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
import SearchBox from "../ui/SearchBox";

interface HeaderProps {
  onMenuClick: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const isMobile = useIsMobile();

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
      {/* Left side */}
      <div className="flex items-center">
        {isMobile ? (
          <span className="font-semibold text-primarytext">MrAix Expo</span>
        ) : (
          <>
            <div className="flex items-center w-[14rem]">
              <CompanySelect />
            </div>
            {/* Search bar - only show on desktop */}
            <SearchBox />
          </>
        )}
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {isMobile ? (
          <Button
            variant="ghost"
            size="icon"
            className="p-0"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
        ) : (
          <>
            {/* Period Selector - desktop only */}
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
                <AvatarImage
                  src={user?.avatar || ""}
                  alt={user?.name || "User"}
                />
                <AvatarFallback className="bg-primary text-white">
                  {user?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>
            </Button>
          </>
        )}
      </div>

      {/* Popups */}
      {showNotifications && (
        <NotificationPopup onClose={() => setShowNotifications(false)} />
      )}
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
