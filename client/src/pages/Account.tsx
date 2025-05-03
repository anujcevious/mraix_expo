import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CardView from '@/components/common/CardView';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  // User data (would typically come from API/state)
  const user = {
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'Account Manager',
    company: 'MrAix Expo',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Experienced account manager with over 5 years of experience in the SaaS industry. Focused on building strong client relationships and delivering exceptional service.',
    joined: '2021-05-15',
  };
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    inAppNotifications: true,
    marketingEmails: false
  });
  
  const handleNotificationChange = (key: string, value: boolean) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // API and integration settings
  const [integrations, setIntegrations] = useState({
    googleCalendar: true,
    slack: false,
    microsoftTeams: false,
    zoom: true
  });
  
  const handleIntegrationChange = (key: string, value: boolean) => {
    setIntegrations(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Mock billing data
  const subscriptionPlan = {
    name: 'Business Pro',
    price: '$49.99',
    billingCycle: 'monthly',
    nextBilling: '2023-08-15',
    status: 'active'
  };
  
  const billingHistory = [
    { id: 'INV-2023-007', date: '2023-07-15', amount: '$49.99', status: 'paid' },
    { id: 'INV-2023-006', date: '2023-06-15', amount: '$49.99', status: 'paid' },
    { id: 'INV-2023-005', date: '2023-05-15', amount: '$49.99', status: 'paid' },
    { id: 'INV-2023-004', date: '2023-04-15', amount: '$49.99', status: 'paid' },
    { id: 'INV-2023-003', date: '2023-03-15', amount: '$49.99', status: 'paid' }
  ];

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Account' }]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Account Settings</h1>
        <p className="text-gray-500">Manage your profile and preferences</p>
      </div>
      
      {/* Account Tabs */}
      <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full bg-background border border-border rounded-lg mb-4">
          <TabsTrigger value="profile" className="flex-1">Profile</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
          <TabsTrigger value="security" className="flex-1">Security</TabsTrigger>
          <TabsTrigger value="integrations" className="flex-1">Integrations</TabsTrigger>
          <TabsTrigger value="billing" className="flex-1">Billing</TabsTrigger>
        </TabsList>
        
        {/* Profile Tab */}
        <TabsContent value="profile">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Summary Card */}
            <div className="md:col-span-1">
              <CardView>
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 bg-primary/10 text-primary">
                    <AvatarFallback className="text-3xl">JS</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-xl font-semibold">{user.name}</h3>
                  <p className="text-gray-500">{user.role}</p>
                  <p className="text-sm text-gray-500 mt-1">{user.company}</p>
                  
                  <Separator className="my-4" />
                  
                  <div className="w-full space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Email</span>
                      <span className="font-medium">{user.email}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Phone</span>
                      <span className="font-medium">{user.phone}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Location</span>
                      <span className="font-medium">{user.location}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Joined</span>
                      <span className="font-medium">{new Date(user.joined).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <Button variant="outline" className="mt-6 w-full">
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
                      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                    </svg>
                    Change Avatar
                  </Button>
                </div>
              </CardView>
            </div>
            
            {/* Profile Edit Form */}
            <div className="md:col-span-2">
              <CardView>
                <h3 className="text-lg font-medium mb-4">Edit Profile Information</h3>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input 
                        id="fullName" 
                        placeholder="Your full name" 
                        defaultValue={user.name}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="Your email address" 
                        defaultValue={user.email}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <Input 
                        id="role" 
                        placeholder="Your role" 
                        defaultValue={user.role}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input 
                        id="company" 
                        placeholder="Your company" 
                        defaultValue={user.company}
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        placeholder="Your phone number" 
                        defaultValue={user.phone}
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        placeholder="Your location" 
                        defaultValue={user.location}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea 
                      id="bio" 
                      placeholder="Tell us about yourself" 
                      defaultValue={user.bio}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select defaultValue="america_new_york">
                        <SelectTrigger>
                          <SelectValue placeholder="Select timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="america_new_york">America/New York (GMT-4)</SelectItem>
                          <SelectItem value="america_chicago">America/Chicago (GMT-5)</SelectItem>
                          <SelectItem value="america_denver">America/Denver (GMT-6)</SelectItem>
                          <SelectItem value="america_los_angeles">America/Los Angeles (GMT-7)</SelectItem>
                          <SelectItem value="europe_london">Europe/London (GMT+1)</SelectItem>
                          <SelectItem value="asia_tokyo">Asia/Tokyo (GMT+9)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="language">Language</Label>
                      <Select defaultValue="english">
                        <SelectTrigger>
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="english">English</SelectItem>
                          <SelectItem value="spanish">Spanish</SelectItem>
                          <SelectItem value="french">French</SelectItem>
                          <SelectItem value="german">German</SelectItem>
                          <SelectItem value="japanese">Japanese</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline">Cancel</Button>
                    <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </CardView>
            </div>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <CardView>
            <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h4 className="font-medium">Email Notifications</h4>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications" className="font-normal">
                        All email notifications
                      </Label>
                      <p className="text-sm text-gray-500">Receive all notifications via email</p>
                    </div>
                    <Switch 
                      id="email-notifications" 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(value) => handleNotificationChange('emailNotifications', value)}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="marketing-emails" className="font-normal">
                        Marketing emails
                      </Label>
                      <p className="text-sm text-gray-500">Receive marketing newsletters and promotions</p>
                    </div>
                    <Switch 
                      id="marketing-emails" 
                      checked={notificationSettings.marketingEmails}
                      onCheckedChange={(value) => handleNotificationChange('marketingEmails', value)}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">SMS Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="sms-notifications" className="font-normal">
                      SMS notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive notifications via SMS</p>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={(value) => handleNotificationChange('smsNotifications', value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h4 className="font-medium">In-App Notifications</h4>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="inapp-notifications" className="font-normal">
                      In-app notifications
                    </Label>
                    <p className="text-sm text-gray-500">Receive notifications within the application</p>
                  </div>
                  <Switch 
                    id="inapp-notifications" 
                    checked={notificationSettings.inAppNotifications}
                    onCheckedChange={(value) => handleNotificationChange('inAppNotifications', value)}
                  />
                </div>
              </div>
              
              <Separator />
              
              <div className="pt-2 flex justify-end space-x-2">
                <Button variant="outline">Reset Defaults</Button>
                <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
                  Save Preferences
                </Button>
              </div>
            </div>
          </CardView>
        </TabsContent>
        
        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <CardView>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              
              <form className="space-y-4">
                <div>
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input 
                    id="current-password" 
                    type="password" 
                    placeholder="Enter your current password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="new-password">New Password</Label>
                  <Input 
                    id="new-password" 
                    type="password" 
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input 
                    id="confirm-password" 
                    type="password" 
                    placeholder="Confirm new password"
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
                    Update Password
                  </Button>
                </div>
              </form>
            </CardView>
            
            <CardView>
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              
              <p className="text-sm text-gray-500 mb-4">
                Add an extra layer of security to your account by enabling two-factor authentication.
              </p>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border">
                <div>
                  <h4 className="font-medium">Two-factor authentication</h4>
                  <p className="text-sm text-gray-500">Not enabled</p>
                </div>
                <Button>Enable</Button>
              </div>
            </CardView>
            
            <CardView>
              <h3 className="text-lg font-medium mb-4">Login Sessions</h3>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-border">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Current Session</h4>
                      <p className="text-sm text-gray-500">Chrome on Windows • New York, USA</p>
                      <p className="text-xs text-gray-400 mt-1">Started 2 hours ago</p>
                    </div>
                    <div className="flex items-center space-x-1 text-green-600 text-sm">
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
                        <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z" />
                        <path d="m9 12 2 2 4-4" />
                      </svg>
                      <span>Active</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Mobile App</h4>
                      <p className="text-sm text-gray-500">iOS App • New York, USA</p>
                      <p className="text-xs text-gray-400 mt-1">Last active 1 day ago</p>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex justify-between">
                    <div>
                      <h4 className="font-medium">Firefox</h4>
                      <p className="text-sm text-gray-500">Firefox on MacOS • Boston, USA</p>
                      <p className="text-xs text-gray-400 mt-1">Last active 3 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Button variant="outline" className="text-red-500 hover:bg-red-50">
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
                  Sign Out All Other Sessions
                </Button>
              </div>
            </CardView>
          </div>
        </TabsContent>
        
        {/* Integrations Tab */}
        <TabsContent value="integrations">
          <CardView>
            <h3 className="text-lg font-medium mb-4">Connected Applications</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M9 15h6" />
                      <path d="M9 11h6" />
                      <path d="M9 7h6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Google Calendar</h4>
                    <p className="text-sm text-gray-500">Sync your meetings and schedule</p>
                  </div>
                </div>
                <Switch 
                  checked={integrations.googleCalendar}
                  onCheckedChange={(value) => handleIntegrationChange('googleCalendar', value)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-purple-100 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#611f69"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                      <polyline points="14 2 14 8 20 8" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Slack</h4>
                    <p className="text-sm text-gray-500">Receive notifications in your Slack channels</p>
                  </div>
                </div>
                <Switch 
                  checked={integrations.slack}
                  onCheckedChange={(value) => handleIntegrationChange('slack', value)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2C70D8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      <path d="M7 15h2" />
                      <path d="M11 15h2" />
                      <path d="M15 15h2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Microsoft Teams</h4>
                    <p className="text-sm text-gray-500">Connect and collaborate with your team</p>
                  </div>
                </div>
                <Switch 
                  checked={integrations.microsoftTeams}
                  onCheckedChange={(value) => handleIntegrationChange('microsoftTeams', value)}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#2D8CFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="m19 7-7 5-7-5" />
                      <path d="M11 4h4a1 1 0 0 1 1 1v8h0" />
                      <path d="M5 8v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3" />
                      <path d="M4 13h9" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Zoom</h4>
                    <p className="text-sm text-gray-500">Schedule and join meetings directly</p>
                  </div>
                </div>
                <Switch 
                  checked={integrations.zoom}
                  onCheckedChange={(value) => handleIntegrationChange('zoom', value)}
                />
              </div>
            </div>
            
            <div className="mt-6">
              <Button variant="outline">
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
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                Connect New App
              </Button>
            </div>
          </CardView>
          
          <div className="mt-6">
            <CardView>
              <h3 className="text-lg font-medium mb-4">API Access</h3>
              
              <p className="text-sm text-gray-500 mb-4">
                Generate API keys to integrate MrAix Expo with external services.
              </p>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Production API Key</h4>
                      <p className="text-xs font-mono mt-1">••••••••••••••••••••••••••••••</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-1"
                        >
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg border border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Test API Key</h4>
                      <p className="text-xs font-mono mt-1">••••••••••••••••••••••••••••••</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4 mr-1"
                        >
                          <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                        Copy
                      </Button>
                      <Button variant="outline" size="sm">Regenerate</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardView>
          </div>
        </TabsContent>
        
        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <CardView>
              <h3 className="text-lg font-medium mb-4">Current Subscription</h3>
              
              <div className="bg-gray-50 rounded-lg border border-border p-4 mb-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h4 className="text-xl font-medium">{subscriptionPlan.name}</h4>
                    <p className="text-sm text-gray-500 mt-1">
                      {subscriptionPlan.price} billed {subscriptionPlan.billingCycle}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                      Active
                    </span>
                    <p className="text-sm text-gray-500">
                      Next billing on {new Date(subscriptionPlan.nextBilling).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-sm text-gray-500">Users</p>
                    <p className="text-xl font-medium">10 / 15</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Storage</p>
                    <p className="text-xl font-medium">28.5 GB / 50 GB</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Projects</p>
                    <p className="text-xl font-medium">12 / Unlimited</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline">Change Plan</Button>
                <Button variant="outline" className="text-red-500 hover:bg-red-50">Cancel Subscription</Button>
              </div>
            </CardView>
            
            <CardView>
              <h3 className="text-lg font-medium mb-4">Payment Method</h3>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-border mb-4">
                <div className="flex items-center">
                  <div className="w-12 h-8 bg-blue-600 rounded mr-4 flex items-center justify-center text-white font-bold">
                    Visa
                  </div>
                  <div>
                    <h4 className="font-medium">•••• •••• •••• 4242</h4>
                    <p className="text-sm text-gray-500">Expires 05/2025</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50">Remove</Button>
                </div>
              </div>
              
              <Button variant="outline">
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
                  <line x1="12" x2="12" y1="5" y2="19" />
                  <line x1="5" x2="19" y1="12" y2="12" />
                </svg>
                Add Payment Method
              </Button>
            </CardView>
            
            <CardView>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium">Billing History</h3>
                <Button variant="outline" size="sm">
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
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                  Download All
                </Button>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-border">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-white">
                    {billingHistory.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium">{invoice.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-500">{invoice.date}</td>
                        <td className="px-4 py-3 text-sm">{invoice.amount}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-sm text-right">
                          <Button variant="ghost" size="sm">
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
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                              <polyline points="7 10 12 15 17 10" />
                              <line x1="12" x2="12" y1="15" y2="3" />
                            </svg>
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardView>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Account;
