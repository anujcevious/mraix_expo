import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CardView from '@/components/common/CardView';
import { getInitials } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  sender: {
    name: string;
    isMe: boolean;
  };
  content: string;
  timestamp: string;
  read: boolean;
}

interface Conversation {
  id: number;
  participant: {
    name: string;
    initials: string;
    avatarColor: string;
    online: boolean;
  };
  lastMessage: string;
  timestamp: string;
  unread: number;
  messages: Message[];
}

const Communication: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [activeConversation, setActiveConversation] = useState<number>(1);
  const [messageInput, setMessageInput] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailContent, setEmailContent] = useState('');
  
  // Mock conversations data
  const conversations: Conversation[] = [
    {
      id: 1,
      participant: {
        name: 'Alice Smith',
        initials: 'AS',
        avatarColor: 'bg-indigo-100 text-indigo-600',
        online: true
      },
      lastMessage: 'I\'ve sent the invoice to the client.',
      timestamp: '10:25 AM',
      unread: 2,
      messages: [
        {
          id: 1,
          sender: { name: 'Alice Smith', isMe: false },
          content: 'Hi there! I wanted to check in on the status of the new product launch.',
          timestamp: '10:00 AM',
          read: true
        },
        {
          id: 2,
          sender: { name: 'Me', isMe: true },
          content: 'Hi Alice, we\'re on track to launch next week. Just finalizing some details with the marketing team.',
          timestamp: '10:05 AM',
          read: true
        },
        {
          id: 3,
          sender: { name: 'Alice Smith', isMe: false },
          content: 'That\'s great news! Can you share the final price point?',
          timestamp: '10:15 AM',
          read: true
        },
        {
          id: 4,
          sender: { name: 'Alice Smith', isMe: false },
          content: 'I\'ve sent the invoice to the client.',
          timestamp: '10:25 AM',
          read: false
        }
      ]
    },
    {
      id: 2,
      participant: {
        name: 'Robert Johnson',
        initials: 'RJ',
        avatarColor: 'bg-blue-100 text-blue-600',
        online: false
      },
      lastMessage: 'Can we schedule a call to discuss the new requirements?',
      timestamp: 'Yesterday',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: { name: 'Robert Johnson', isMe: false },
          content: 'Hello, I wanted to discuss the supplier contract terms.',
          timestamp: 'Yesterday, 2:30 PM',
          read: true
        },
        {
          id: 2,
          sender: { name: 'Me', isMe: true },
          content: 'Sure, what specifically did you want to discuss?',
          timestamp: 'Yesterday, 3:00 PM',
          read: true
        },
        {
          id: 3,
          sender: { name: 'Robert Johnson', isMe: false },
          content: 'Can we schedule a call to discuss the new requirements?',
          timestamp: 'Yesterday, 4:15 PM',
          read: true
        }
      ]
    },
    {
      id: 3,
      participant: {
        name: 'Emily Davis',
        initials: 'ED',
        avatarColor: 'bg-green-100 text-green-600',
        online: true
      },
      lastMessage: 'The team meeting is scheduled for tomorrow at 10 AM.',
      timestamp: 'Monday',
      unread: 0,
      messages: [
        {
          id: 1,
          sender: { name: 'Emily Davis', isMe: false },
          content: 'When are we planning to roll out the new inventory system?',
          timestamp: 'Monday, 9:30 AM',
          read: true
        },
        {
          id: 2,
          sender: { name: 'Me', isMe: true },
          content: 'We\'re targeting the end of this month. The development team is finishing up testing.',
          timestamp: 'Monday, 10:00 AM',
          read: true
        },
        {
          id: 3,
          sender: { name: 'Emily Davis', isMe: false },
          content: 'The team meeting is scheduled for tomorrow at 10 AM.',
          timestamp: 'Monday, 4:30 PM',
          read: true
        }
      ]
    }
  ];

  const currentConversation = conversations.find(conv => conv.id === activeConversation);
  
  const handleSendMessage = () => {
    if (messageInput.trim() === '') return;
    
    // In a real app, you would send the message via API and update state accordingly
    console.log('Sending message:', messageInput);
    
    // Clear input after sending
    setMessageInput('');
  };
  
  const handleSendEmail = () => {
    if (emailSubject.trim() === '' || emailContent.trim() === '') return;
    
    // In a real app, you would send the email via API
    console.log('Sending email:', { subject: emailSubject, content: emailContent });
    
    // Clear inputs after sending
    setEmailSubject('');
    setEmailContent('');
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Communication' }]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Communication</h1>
        <p className="text-gray-500">Manage messages, emails, and notifications</p>
      </div>
      
      {/* Communication Tabs */}
      <Tabs defaultValue="messages" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full bg-background border border-border rounded-lg mb-4">
          <TabsTrigger value="messages" className="flex-1">Messages</TabsTrigger>
          <TabsTrigger value="email" className="flex-1">Email</TabsTrigger>
          <TabsTrigger value="notifications" className="flex-1">Notifications</TabsTrigger>
        </TabsList>
        
        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4 h-[600px]">
            {/* Conversations List */}
            <div className="w-full md:w-1/3 bg-white rounded-lg border border-border shadow-sm overflow-hidden">
              <div className="p-4 border-b border-border">
                <h3 className="font-medium">Conversations</h3>
                <div className="mt-2">
                  <Input 
                    placeholder="Search messages..." 
                    className="w-full text-sm"
                  />
                </div>
              </div>
              <div className="overflow-y-auto h-[calc(600px-65px)]">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id} 
                    className={`flex p-4 cursor-pointer hover:bg-gray-50 border-b border-border ${activeConversation === conversation.id ? 'bg-gray-50' : ''}`}
                    onClick={() => setActiveConversation(conversation.id)}
                  >
                    <div className="relative">
                      <Avatar className={`h-10 w-10 ${conversation.participant.avatarColor}`}>
                        <AvatarFallback>{conversation.participant.initials}</AvatarFallback>
                      </Avatar>
                      {conversation.participant.online && (
                        <span className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-white"></span>
                      )}
                    </div>
                    <div className="ml-3 flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium truncate">{conversation.participant.name}</h4>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge variant="default" className="ml-2 bg-primary h-5 w-5 flex items-center justify-center p-0 rounded-full">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Messages View */}
            <div className="flex-1 bg-white rounded-lg border border-border shadow-sm overflow-hidden flex flex-col">
              {currentConversation ? (
                <>
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <div className="flex items-center">
                      <Avatar className={`h-8 w-8 ${currentConversation.participant.avatarColor}`}>
                        <AvatarFallback>{currentConversation.participant.initials}</AvatarFallback>
                      </Avatar>
                      <div className="ml-3">
                        <h3 className="font-medium">{currentConversation.participant.name}</h3>
                        <span className="text-xs text-gray-500">
                          {currentConversation.participant.online ? 'Online' : 'Offline'}
                        </span>
                      </div>
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
                          <path d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                        </svg>
                        Call
                      </Button>
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
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        History
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {currentConversation.messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender.isMe ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[70%] rounded-lg p-3 ${
                            message.sender.isMe 
                              ? 'bg-primary text-white rounded-tr-none' 
                              : 'bg-gray-100 text-gray-800 rounded-tl-none'
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <div className={`text-xs mt-1 ${message.sender.isMe ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                            {message.timestamp}
                            {message.sender.isMe && (
                              <span className="ml-2">
                                {message.read ? (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="inline-block h-3 w-3"
                                  >
                                    <path d="M18 6 7 17l-5-5" />
                                    <path d="m22 10-7.5 7.5L13 16" />
                                  </svg>
                                ) : (
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="inline-block h-3 w-3"
                                  >
                                    <path d="m9 12 2 2 4-4" />
                                    <circle cx="12" cy="12" r="10" />
                                  </svg>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-4 border-t border-border">
                    <div className="flex space-x-2">
                      <Input 
                        placeholder="Type a message..." 
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                        className="flex-1"
                      />
                      <Button 
                        className="bg-primary text-white hover:bg-primary/90 transition-colors"
                        onClick={handleSendMessage}
                      >
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
                          <path d="m22 2-7 20-4-9-9-4Z" />
                          <path d="M22 2 11 13" />
                        </svg>
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-12 w-12 mx-auto text-gray-400 mb-4"
                    >
                      <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                    </svg>
                    <h3 className="text-lg font-medium mb-2">No conversation selected</h3>
                    <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        {/* Email Tab */}
        <TabsContent value="email">
          <div className="bg-white rounded-lg border border-border shadow-sm p-6">
            <h3 className="text-lg font-medium mb-4">Compose Email</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To:</label>
                </div>
                <div className="md:col-span-3">
                  <Input id="to" placeholder="recipient@example.com" className="w-full" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="cc" className="block text-sm font-medium text-gray-700 mb-1">CC:</label>
                </div>
                <div className="md:col-span-3">
                  <Input id="cc" placeholder="cc@example.com" className="w-full" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject:</label>
                </div>
                <div className="md:col-span-3">
                  <Input 
                    id="subject" 
                    placeholder="Email subject" 
                    className="w-full"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-1">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message:</label>
                </div>
                <div className="md:col-span-3">
                  <Textarea 
                    id="message" 
                    placeholder="Type your message here..." 
                    className="w-full min-h-[200px]"
                    value={emailContent}
                    onChange={(e) => setEmailContent(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button 
                  className="bg-primary text-white hover:bg-primary/90 transition-colors"
                  onClick={handleSendEmail}
                >
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
                    <path d="m22 2-7 20-4-9-9-4Z" />
                    <path d="M22 2 11 13" />
                  </svg>
                  Send Email
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <CardView className="mb-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Notification Settings</h3>
              <Button variant="outline" size="sm">Reset to Default</Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive email notifications for important updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div>
                  <h4 className="font-medium">Push Notifications</h4>
                  <p className="text-sm text-gray-500">Receive push notifications on your device</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center pb-3 border-b border-border">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Receive text message alerts for critical updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
              
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">Do Not Disturb</h4>
                  <p className="text-sm text-gray-500">Pause all notifications during specific hours</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>
          </CardView>
          
          <CardView>
            <h3 className="text-lg font-medium mb-4">Recent Notifications</h3>
            
            <div className="space-y-4 max-h-[400px] overflow-y-auto">
              <div className="flex items-start pb-4 border-b border-border">
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3 flex-shrink-0">
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
                    <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                    <path d="M9 22h9a2 2 0 0 0 2-2v-7" />
                    <path d="M13 6h2" />
                    <path d="M13 10h2" />
                    <path d="M13 14h2" />
                    <path d="M13 18h2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">New invoice created</p>
                  <p className="text-xs text-gray-500 mt-1">Invoice #3254 for Acme Corp. was created</p>
                  <p className="text-xs text-gray-400 mt-1">15 minutes ago</p>
                </div>
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
                    <path d="m9 12 2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex items-start pb-4 border-b border-border">
                <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-3 flex-shrink-0">
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
                </div>
                <div className="flex-1">
                  <p className="text-sm">New customer registered</p>
                  <p className="text-xs text-gray-500 mt-1">John Smith has registered as a new customer</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
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
                    <path d="m9 12 2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex items-start pb-4 border-b border-border">
                <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3 flex-shrink-0">
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
                </div>
                <div className="flex-1">
                  <p className="text-sm">Low inventory alert</p>
                  <p className="text-xs text-gray-500 mt-1">Product "Widget X" is running low on stock</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
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
                    <path d="m9 12 2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </Button>
              </div>
              
              <div className="flex items-start">
                <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3 flex-shrink-0">
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
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm">System maintenance scheduled</p>
                  <p className="text-xs text-gray-500 mt-1">The system will be undergoing maintenance on July 15, 2023</p>
                  <p className="text-xs text-gray-400 mt-1">2 days ago</p>
                </div>
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
                    <path d="m9 12 2 2 4-4" />
                    <circle cx="12" cy="12" r="10" />
                  </svg>
                </Button>
              </div>
            </div>
            
            <div className="mt-4 flex justify-center">
              <Button variant="outline" className="text-sm">
                Load More Notifications
              </Button>
            </div>
          </CardView>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Communication;
