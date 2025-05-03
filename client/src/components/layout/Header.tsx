import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { useSidebar } from '@/context/SidebarContext';
import { useMobile } from '@/hooks/use-mobile';
import { COMPANIES, TIME_PERIODS } from '@/constants/menu';
import {
  MenuIcon,
  SearchIcon,
  ChevronDownIcon,
  SettingsIcon,
  NotificationIcon
} from '@/assets/icons';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import SearchInput from '@/components/ui/SearchInput';
import { getInitials } from '@/lib/utils';

const Header: React.FC = () => {
  const { toggleMobileSidebar } = useSidebar();
  const isMobile = useMobile();
  const [location, setLocation] = useLocation();
  
  // Mock data
  const company = COMPANIES[0];
  const user = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    initials: 'JS'
  };
  const selectedPeriod = TIME_PERIODS.find(period => period.default) || TIME_PERIODS[3];
  
  // Notifications
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(true);
  const notifications = [
    {
      id: 1,
      title: 'New invoice created',
      description: 'Invoice #3254 for Acme Corp. was created',
      time: '15 minutes ago',
      type: 'invoice',
      isUnread: true
    },
    {
      id: 2,
      title: 'New customer registered',
      description: 'John Smith has registered as a new customer',
      time: '2 hours ago',
      type: 'customer',
      isUnread: false
    },
    {
      id: 3,
      title: 'Low inventory alert',
      description: 'Product "Widget X" is running low on stock',
      time: 'Yesterday',
      type: 'inventory',
      isUnread: false
    }
  ];

  const handleMarkAllAsRead = () => {
    setHasUnreadNotifications(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-border h-16 z-50 flex items-center justify-between px-4">
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {/* Mobile Sidebar Toggle */}
        <Button variant="ghost" size="icon" onClick={toggleMobileSidebar} className="lg:hidden">
          <MenuIcon className="h-5 w-5" />
        </Button>
        
        {/* Logo & Company Selector */}
        <div className="flex items-center space-x-3">
          <Avatar className="bg-primary text-white h-9 w-9">
            <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-0">
                <span className="font-medium">{company.name}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {COMPANIES.map((company) => (
                <DropdownMenuItem key={company.id}>{company.name}</DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-primary">+ Add Company</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Search */}
        {!isMobile && (
          <div className="hidden md:block relative">
            <SearchInput placeholder="Search..." className="w-64" />
          </div>
        )}
      </div>
      
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* Period Selector */}
        <div className="hidden sm:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="text-sm flex items-center space-x-2">
                <span>{selectedPeriod.name}</span>
                <ChevronDownIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {TIME_PERIODS.map((period) => (
                <DropdownMenuItem key={period.id} className={period.default ? "font-medium" : ""}>
                  {period.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        {/* Settings */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="p-1.5 rounded-md">
              <SettingsIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Settings</TooltipContent>
        </Tooltip>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="p-1.5 rounded-md relative">
              <NotificationIcon className="h-5 w-5" />
              {hasUnreadNotifications && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end">
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <h3 className="font-medium">Notifications</h3>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs text-primary hover:underline h-auto p-0"
                onClick={handleMarkAllAsRead}
              >
                Mark all as read
              </Button>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {notifications.map((notification) => (
                <DropdownMenuItem key={notification.id} className="p-0 focus:bg-background">
                  <a href="#" className={`block px-4 py-3 hover:bg-background w-full text-left ${notification.isUnread ? 'border-l-2 border-primary' : ''}`}>
                    <div className="flex items-start">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 
                        ${notification.type === 'invoice' ? 'bg-primary/10 text-primary' : 
                         notification.type === 'customer' ? 'bg-accent/10 text-accent' : 
                         'bg-yellow-100 text-yellow-600'}`}>
                        {notification.type === 'invoice' && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M21 7v13H3V4h13" />
                            <path d="M17 2h5v5" />
                            <path d="m12 12 9-9" />
                          </svg>
                        )}
                        {notification.type === 'customer' && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                          </svg>
                        )}
                        {notification.type === 'inventory' && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="h-4 w-4"
                          >
                            <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                            <line x1="12" y1="9" x2="12" y2="13" />
                            <line x1="12" y1="17" x2="12.01" y2="17" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm ${notification.isUnread ? 'font-medium' : ''}`}>{notification.title}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  </a>
                </DropdownMenuItem>
              ))}
            </div>
            <div className="border-t border-border px-4 py-2">
              <Button variant="ghost" className="w-full text-primary text-sm hover:underline">
                View all notifications
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-0">
              <Avatar className="h-8 w-8 bg-primary/10 text-primary">
                <AvatarFallback>{user.initials}</AvatarFallback>
              </Avatar>
              <span className="hidden md:block text-sm font-medium">{user.name}</span>
              <ChevronDownIcon className="hidden md:block h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-4 py-2 border-b border-border">
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <DropdownMenuItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              My Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 mr-2"
              >
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
