import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, 
  User,
  Building,
  Shield,
  Bell,
  CreditCard,
  Users,
  HelpCircle,
  Save,
  Upload
} from 'lucide-react';
import Breadcrumbs from '@/components/ui/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const Settings = () => {
  const { toast } = useToast();
  const { user } = useSelector((state: RootState) => state.auth);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Financial Director',
    department: 'Finance',
    bio: 'Experienced financial director with 10+ years of experience in corporate finance and accounting. Specializing in financial analysis, budgeting, and strategic planning.'
  });
  
  const [companyForm, setCompanyForm] = useState({
    name: 'Acme Corporation',
    website: 'www.acmecorp.com',
    industry: 'Technology',
    size: '50-100',
    address: '123 Business Ave, Suite 500',
    city: 'San Francisco',
    state: 'CA',
    zip: '94103',
    country: 'United States',
    taxId: 'US123456789'
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    appNotifications: true,
    dailyDigest: false,
    reminderNotifications: true,
    marketingEmails: false
  });
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved",
    });
  };
  
  const handleCompanyUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Company Updated",
      description: "Your company information has been saved",
    });
  };
  
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    
    toast({
      title: "Notification Settings Updated",
      description: "Your notification preferences have been saved",
    });
  };
  
  const handleUploadPhoto = () => {
    toast({
      title: "Upload Photo",
      description: "Photo upload dialog would open here",
    });
  };
  
  return (
    <div>
      {/* Page Title */}
      <div className="mb-2">
        <h1 className="text-xl font-semibold text-primarytext">Account Settings</h1>
        <p className="text-secondarytext mt-1">Manage your account and preferences</p>
      </div>
      
      {/* Breadcrumbs - positioned after heading */}
      <Breadcrumbs 
        items={[
          { label: 'Home', href: '/' },
          { label: 'Settings' }
        ]}
        className="mb-6"
      />
      
      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar - Setting Categories */}
        <div className="col-span-12 md:col-span-3">
          <Card className="p-4">
            <div className="flex flex-col space-y-1">
              <Button variant="ghost" className="justify-start" size="sm">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </Button>
              <Button variant="ghost" className="justify-start" size="sm">
                <Building className="mr-2 h-4 w-4" />
                <span>Company</span>
              </Button>
              <Button variant="ghost" className="justify-start" size="sm">
                <Bell className="mr-2 h-4 w-4" />
                <span>Notifications</span>
              </Button>
              <Button variant="ghost" className="justify-start" size="sm">
                <Shield className="mr-2 h-4 w-4" />
                <span>Security</span>
              </Button>
              <Button variant="ghost" className="justify-start" size="sm">
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </Button>
              <Button variant="ghost" className="justify-start" size="sm">
                <Users className="mr-2 h-4 w-4" />
                <span>Team</span>
              </Button>
              <Button variant="ghost" className="justify-start" size="sm">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>Help</span>
              </Button>
            </div>
          </Card>
        </div>
        
        {/* Main Content */}
        <div className="col-span-12 md:col-span-9">
          <Card>
            <Tabs defaultValue="profile">
              <div className="p-4 border-b border-gray-100">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="company">Company</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value="profile" className="p-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-primary text-white text-xl">
                        {profileForm.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button size="sm" variant="outline" onClick={handleUploadPhoto} className="mb-2">
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Photo
                    </Button>
                    <p className="text-xs text-center text-secondarytext">
                      Recommended: Square JPG, PNG. <br />
                      Maximum size 1MB.
                    </p>
                  </div>
                  
                  <div className="md:w-2/3">
                    <form onSubmit={handleProfileUpdate}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input 
                            id="name" 
                            value={profileForm.name} 
                            onChange={(e) => setProfileForm({...profileForm, name: e.target.value})} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address</Label>
                          <Input 
                            id="email" 
                            type="email" 
                            value={profileForm.email} 
                            onChange={(e) => setProfileForm({...profileForm, email: e.target.value})} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input 
                            id="phone" 
                            value={profileForm.phone} 
                            onChange={(e) => setProfileForm({...profileForm, phone: e.target.value})} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="position">Position</Label>
                          <Input 
                            id="position" 
                            value={profileForm.position} 
                            onChange={(e) => setProfileForm({...profileForm, position: e.target.value})} 
                          />
                        </div>
                        <div>
                          <Label htmlFor="department">Department</Label>
                          <Select 
                            value={profileForm.department} 
                            onValueChange={(value) => setProfileForm({...profileForm, department: value})}
                          >
                            <SelectTrigger id="department">
                              <SelectValue placeholder="Select department" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Finance">Finance</SelectItem>
                              <SelectItem value="Accounting">Accounting</SelectItem>
                              <SelectItem value="Sales">Sales</SelectItem>
                              <SelectItem value="Operations">Operations</SelectItem>
                              <SelectItem value="IT">IT</SelectItem>
                              <SelectItem value="HR">HR</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Label htmlFor="bio">Bio</Label>
                        <textarea 
                          id="bio" 
                          rows={4} 
                          className="w-full px-3 py-2 text-sm bg-transparent border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                          value={profileForm.bio} 
                          onChange={(e) => setProfileForm({...profileForm, bio: e.target.value})} 
                        />
                      </div>
                      
                      <div className="flex justify-end">
                        <Button type="submit">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="company" className="p-6">
                <form onSubmit={handleCompanyUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input 
                        id="companyName" 
                        value={companyForm.name} 
                        onChange={(e) => setCompanyForm({...companyForm, name: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        value={companyForm.website} 
                        onChange={(e) => setCompanyForm({...companyForm, website: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="industry">Industry</Label>
                      <Select 
                        value={companyForm.industry} 
                        onValueChange={(value) => setCompanyForm({...companyForm, industry: value})}
                      >
                        <SelectTrigger id="industry">
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Technology">Technology</SelectItem>
                          <SelectItem value="Healthcare">Healthcare</SelectItem>
                          <SelectItem value="Finance">Finance</SelectItem>
                          <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                          <SelectItem value="Retail">Retail</SelectItem>
                          <SelectItem value="Education">Education</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="size">Company Size</Label>
                      <Select 
                        value={companyForm.size} 
                        onValueChange={(value) => setCompanyForm({...companyForm, size: value})}
                      >
                        <SelectTrigger id="size">
                          <SelectValue placeholder="Select company size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-10">1-10 employees</SelectItem>
                          <SelectItem value="11-50">11-50 employees</SelectItem>
                          <SelectItem value="50-100">50-100 employees</SelectItem>
                          <SelectItem value="101-500">101-500 employees</SelectItem>
                          <SelectItem value="501+">501+ employees</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={companyForm.address} 
                        onChange={(e) => setCompanyForm({...companyForm, address: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input 
                        id="city" 
                        value={companyForm.city} 
                        onChange={(e) => setCompanyForm({...companyForm, city: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Input 
                        id="state" 
                        value={companyForm.state} 
                        onChange={(e) => setCompanyForm({...companyForm, state: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="zip">Postal/ZIP Code</Label>
                      <Input 
                        id="zip" 
                        value={companyForm.zip} 
                        onChange={(e) => setCompanyForm({...companyForm, zip: e.target.value})} 
                      />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select 
                        value={companyForm.country} 
                        onValueChange={(value) => setCompanyForm({...companyForm, country: value})}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="United States">United States</SelectItem>
                          <SelectItem value="Canada">Canada</SelectItem>
                          <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                          <SelectItem value="Australia">Australia</SelectItem>
                          <SelectItem value="Germany">Germany</SelectItem>
                          <SelectItem value="France">France</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="taxId">Tax ID / VAT Number</Label>
                      <Input 
                        id="taxId" 
                        value={companyForm.taxId} 
                        onChange={(e) => setCompanyForm({...companyForm, taxId: e.target.value})} 
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Company Info
                    </Button>
                  </div>
                </form>
              </TabsContent>
              
              <TabsContent value="notifications" className="p-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-primarytext mb-4">Email Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-primarytext">All Email Notifications</h4>
                          <p className="text-sm text-secondarytext">Receive email notifications for all activity</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.emailNotifications} 
                          onCheckedChange={() => handleNotificationChange('emailNotifications')} 
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-primarytext">Daily Digest</h4>
                          <p className="text-sm text-secondarytext">Receive a daily summary of all activity</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.dailyDigest} 
                          onCheckedChange={() => handleNotificationChange('dailyDigest')} 
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-primarytext">Marketing Emails</h4>
                          <p className="text-sm text-secondarytext">Receive emails about new features and promotions</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.marketingEmails} 
                          onCheckedChange={() => handleNotificationChange('marketingEmails')} 
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium text-primarytext mb-4">In-App Notifications</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-primarytext">All App Notifications</h4>
                          <p className="text-sm text-secondarytext">Receive in-app notifications for all activity</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.appNotifications} 
                          onCheckedChange={() => handleNotificationChange('appNotifications')} 
                        />
                      </div>
                      <Separator />
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-primarytext">Reminders and Alerts</h4>
                          <p className="text-sm text-secondarytext">Receive reminders for tasks and deadlines</p>
                        </div>
                        <Switch 
                          checked={notificationSettings.reminderNotifications} 
                          onCheckedChange={() => handleNotificationChange('reminderNotifications')} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;