import { useState } from 'react';
import { X, Bell, FileText, User, Check, CheckCheck, ShoppingCart } from 'lucide-react';
import  Button  from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: 'invoice' | 'report' | 'user';
  read: boolean;
}

interface NotificationPopupProps {
  onClose: () => void;
}

const NotificationPopup = ({ onClose }: NotificationPopupProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('all');
  
  // Sample notifications data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Invoice Created',
      description: 'Invoice #INV-2023-04-28 has been created and is ready for review.',
      timestamp: '10 min ago',
      type: 'invoice',
      read: false
    },
    {
      id: '2',
      title: 'Report Generated',
      description: 'Monthly financial report for April 2023 is now available.',
      timestamp: '2 hours ago',
      type: 'report',
      read: false
    },
    {
      id: '3',
      title: 'User Invitation',
      description: 'You have invited sarah@example.com to join your organization.',
      timestamp: 'Yesterday',
      type: 'user',
      read: false
    },
    {
      id: '4',
      title: 'Invoice Paid',
      description: 'Invoice #INV-2023-04-15 has been paid by Customer A.',
      timestamp: '2 days ago',
      type: 'invoice',
      read: true
    },
    {
      id: '5',
      title: 'Report Access',
      description: 'John Doe accessed the Q1 financial reports.',
      timestamp: '3 days ago',
      type: 'report',
      read: true
    }
  ]);
  
  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    
    toast({
      title: "Notification marked as read",
      description: "The notification has been marked as read.",
    });
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All notifications marked as read",
      description: "All notifications have been marked as read.",
    });
  };
  
  const getFilteredNotifications = () => {
    if (activeTab === 'all') {
      return notifications;
    }
    if (activeTab === 'unread') {
      return notifications.filter(notification => !notification.read);
    }
    return notifications.filter(notification => notification.type === activeTab);
  };
  
  const renderIcon = (type: string) => {
    switch (type) {
      case 'invoice':
        return <ShoppingCart className="h-4 w-4 text-blue-500" />;
      case 'report':
        return <FileText className="h-4 w-4 text-amber-500" />;
      case 'user':
        return <User className="h-4 w-4 text-green-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  return (
    <div className="fixed top-16 right-4 z-50 w-80 md:w-96 animate-fade-in">
      <Card className="shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center">
            <Bell className="h-5 w-5 text-primary mr-2" />
            <h3 className="font-semibold text-primarytext">Notifications</h3>
            {unreadCount > 0 && (
              <span className="ml-2 bg-primary text-white text-xs px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
          <div className="border-b border-gray-100">
            <TabsList className="w-full rounded-none bg-transparent border-b">
              <TabsTrigger 
                value="all" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                All
              </TabsTrigger>
              <TabsTrigger 
                value="unread" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Unread
              </TabsTrigger>
              <TabsTrigger 
                value="invoice" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Invoices
              </TabsTrigger>
              <TabsTrigger 
                value="report" 
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
              >
                Reports
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="max-h-96 overflow-y-auto">
              {getFilteredNotifications().map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      {renderIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primarytext">{notification.title}</h4>
                      <p className="text-xs text-secondarytext mt-1">{notification.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-mutedtext">{notification.timestamp}</span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-primary"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {getFilteredNotifications().length === 0 && (
                <div className="p-8 text-center">
                  <Bell className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-secondarytext">No notifications found</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="unread" className="mt-0">
            <div className="max-h-96 overflow-y-auto">
              {getFilteredNotifications().map((notification) => (
                <div 
                  key={notification.id} 
                  className="p-4 border-b border-gray-100 bg-blue-50"
                >
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                      {renderIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primarytext">{notification.title}</h4>
                      <p className="text-xs text-secondarytext mt-1">{notification.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-mutedtext">{notification.timestamp}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs text-primary"
                          onClick={() => handleMarkAsRead(notification.id)}
                        >
                          <Check className="h-3 w-3 mr-1" />
                          Mark as read
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {getFilteredNotifications().length === 0 && (
                <div className="p-8 text-center">
                  <CheckCheck className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-secondarytext">All caught up!</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="invoice" className="mt-0">
            <div className="max-h-96 overflow-y-auto">
              {getFilteredNotifications().map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <ShoppingCart className="h-4 w-4 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primarytext">{notification.title}</h4>
                      <p className="text-xs text-secondarytext mt-1">{notification.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-mutedtext">{notification.timestamp}</span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-primary"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {getFilteredNotifications().length === 0 && (
                <div className="p-8 text-center">
                  <ShoppingCart className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-secondarytext">No invoice notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="report" className="mt-0">
            <div className="max-h-96 overflow-y-auto">
              {getFilteredNotifications().map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-4 border-b border-gray-100 ${notification.read ? 'bg-white' : 'bg-blue-50'}`}
                >
                  <div className="flex items-start">
                    <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                      <FileText className="h-4 w-4 text-amber-500" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-primarytext">{notification.title}</h4>
                      <p className="text-xs text-secondarytext mt-1">{notification.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-mutedtext">{notification.timestamp}</span>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs text-primary"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            <Check className="h-3 w-3 mr-1" />
                            Mark as read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {getFilteredNotifications().length === 0 && (
                <div className="p-8 text-center">
                  <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
                  <p className="text-secondarytext">No report notifications</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-3 border-t border-gray-100 flex justify-between">
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs text-primary w-full"
            onClick={handleMarkAllAsRead}
            disabled={!notifications.some(n => !n.read)}
          >
            <CheckCheck className="h-3 w-3 mr-1" />
            Mark all as read
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            className="text-xs text-secondarytext w-full"
            onClick={() => window.location.href = '/notifications'}
          >
            View all
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default NotificationPopup;