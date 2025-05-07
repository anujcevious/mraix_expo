import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { updateUser } from '@/lib/slices/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Loader2, Save, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const profileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email(),
  bio: z.string().max(160).optional(),
  phone: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const companyFormSchema = z.object({
  companyName: z.string().min(2, {
    message: "Company name must be at least 2 characters.",
  }),
  industry: z.string().min(1, {
    message: "Please select an industry.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  taxId: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof companyFormSchema>;

const SettingsPanel = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      bio: '',
      phone: '',
    },
  });
  
  const companyForm = useForm<CompanyFormValues>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: 'MrAix Corp.',
      industry: 'technology',
      address: '123 Tech Avenue, San Francisco, CA 94107',
      taxId: 'TAX-12345-US',
    },
  });
  
  useEffect(() => {
    if (user) {
      profileForm.reset({
        name: user.name,
        email: user.email,
        bio: '',
        phone: '',
      });
    }
  }, [user, profileForm]);
  
  const onProfileSubmit = async (data: ProfileFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await apiRequest('PATCH', '/api/auth/profile', data);
      
      if (response.ok) {
        dispatch(updateUser({
          name: data.name,
          email: data.email,
        }));
        
        toast({
          title: 'Profile updated',
          description: 'Your profile has been updated successfully.',
        });
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile. Please try again.';
      
      toast({
        title: 'Update failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const onCompanySubmit = async (data: CompanyFormValues) => {
    try {
      setIsLoading(true);
      
      const response = await apiRequest('PATCH', '/api/company', data);
      
      if (response.ok) {
        toast({
          title: 'Company updated',
          description: 'Company details have been updated successfully.',
        });
      } else {
        throw new Error('Failed to update company details');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update company details. Please try again.';
      
      toast({
        title: 'Update failed',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and company settings
        </p>
      </div>
      
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="api">API & Integrations</TabsTrigger>
        </TabsList>
        
        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your personal information and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col items-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={user?.avatar || ''} alt={user?.name} />
                    <AvatarFallback className="text-xl bg-primary text-white">
                      {user?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm" className="mt-4">
                    <Upload className="mr-2 h-4 w-4" />
                    Change Avatar
                  </Button>
                </div>
                
                <div className="flex-1">
                  <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                      <FormField
                        control={profileForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Your email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                          control={profileForm.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone Number</FormLabel>
                              <FormControl>
                                <Input placeholder="Your phone number" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Input value={user?.role || 'User'} disabled />
                          <FormDescription>
                            Contact your administrator to change roles
                          </FormDescription>
                        </FormItem>
                      </div>
                      
                      <FormField
                        control={profileForm.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about yourself"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Brief description for your profile. Max 160 characters.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex justify-end">
                        <Button type="submit" disabled={isLoading}>
                          {isLoading ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Company Profile</CardTitle>
              <CardDescription>
                Manage your company information and settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(onCompanySubmit)} className="space-y-4">
                  <FormField
                    control={companyForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Company name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select an industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Company address" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Tax ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-end">
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>
                Manage how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive email notifications for important updates
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Invoice Alerts</h4>
                    <p className="text-sm text-muted-foreground">
                      Notifications for new invoices and payments
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">Report Updates</h4>
                    <p className="text-sm text-muted-foreground">
                      Notifications when reports are available
                    </p>
                  </div>
                  <Switch />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-sm font-medium">System Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Updates about system maintenance and changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save Notification Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize the look and feel of your workspace
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Theme</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                      <circle cx="8" cy="8" r="8" />
                    </svg>
                    Light
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                    </svg>
                    Dark
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 0a8 8 0 100 16A8 8 0 008 0zM2 8a6 6 0 1112 0 6 6 0 01-12 0z" />
                    </svg>
                    System
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Color Scheme</h4>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 mr-2 rounded-full bg-primary" />
                    Default
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 mr-2 rounded-full bg-green-600" />
                    Green
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <div className="w-4 h-4 mr-2 rounded-full bg-blue-600" />
                    Blue
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sidebar Position</h4>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="7" y="1" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Left
                  </Button>
                  <Button variant="outline" className="justify-start">
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="1" y="1" width="8" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
                      <rect x="11" y="1" width="4" height="14" rx="1" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    Right
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Save Appearance Settings
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* API Settings */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API & Integrations</CardTitle>
              <CardDescription>
                Manage API keys and external service integrations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">API Key</h4>
                <div className="flex items-center space-x-2">
                  <Input 
                    type="password" 
                    value="sk_live_a1b2c3d4e5f6g7h8i9j0" 
                    disabled 
                    className="font-mono"
                  />
                  <Button variant="outline" size="sm">Copy</Button>
                  <Button variant="outline" size="sm">Regenerate</Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Use this API key to authenticate your API requests
                </p>
              </div>
              
              <div className="space-y-2 pt-4">
                <h4 className="text-sm font-medium">Integrations</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M14.5 0h-13C.7 0 0 .7 0 1.5v13c0 .8.7 1.5 1.5 1.5h13c.8 0 1.5-.7 1.5-1.5v-13c0-.8-.7-1.5-1.5-1.5zm-5.25 14h-1.5v-6h1.5v6zm-2.25 0h-1.5V7h1.5v7zm-2.25 0h-1.5v-5h1.5v5zm-2.25 0H1V9h1.5v5zm10.5 0h-1.5V5h1.5v9zm-2.25 0h-1.5V3h1.5v11z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">QuickBooks</h5>
                        <p className="text-xs text-muted-foreground">
                          Sync your accounting data
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M7.5 15H13a2 2 0 002-2V8h-3.5a2.5 2.5 0 010-5H15V2a2 2 0 00-2-2H7.5a2.5 2.5 0 000 5H4v9a1 1 0 001 1h2.5z" />
                          <path d="M11.5 4a1 1 0 100 2h3v-2h-3z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Stripe</h5>
                        <p className="text-xs text-muted-foreground">
                          Payment processing integration
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-8 w-8 rounded bg-gray-100 flex items-center justify-center">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                          <path d="M9 1H4a1 1 0 00-1 1v5h1V2h5V1zm3 14h-5v1h5a1 1 0 001-1v-5h-1v5zM1 9H0v5a1 1 0 001 1h5v-1H1V9zm15-3V1a1 1 0 00-1-1h-5v1h5v5h1z" />
                        </svg>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium">Zapier</h5>
                        <p className="text-xs text-muted-foreground">
                          Connect with 3000+ apps
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Connect</Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Manage Integrations
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPanel;
