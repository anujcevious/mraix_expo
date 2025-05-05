import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight, 
  MessageCircle, 
  Users,
  Search,
  Paperclip,
  Send,
  Image,
  File,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

// Sample data for conversations
const conversations = [
  {
    id: 1,
    user: {
      id: 2,
      name: 'Sarah Johnson',
      position: 'Senior Accountant',
      avatar: '',
      initials: 'SJ',
      status: 'online',
      lastSeen: 'Active now'
    },
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Hi there! I need your input on the Q1 financial statements before I send them to the auditors.',
        time: '10:32 AM'
      },
      {
        id: 2,
        sender: 'me',
        text: 'Sure, I can take a look. Did you have any specific concerns about any of the sections?',
        time: '10:35 AM'
      },
      {
        id: 3,
        sender: 'them',
        text: 'Yes, I\'m particularly concerned about the revenue recognition for the new subscription-based services. Can you review that section carefully?',
        time: '10:37 AM'
      },
      {
        id: 4,
        sender: 'me',
        text: 'No problem, I\'ll review the revenue recognition policies and make sure everything is compliant with the latest accounting standards.',
        time: '10:40 AM'
      },
      {
        id: 5,
        sender: 'them',
        text: 'Thank you! I\'ve also attached the latest projection report for reference.',
        time: '10:42 AM',
        attachment: {
          type: 'file',
          name: 'Q1_Projections.pdf',
          size: '2.3 MB'
        }
      }
    ],
    unread: 1
  },
  {
    id: 2,
    user: {
      id: 3,
      name: 'Michael Chen',
      position: 'Tax Specialist',
      avatar: '',
      initials: 'MC',
      status: 'away',
      lastSeen: '15m ago'
    },
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Just a reminder that we need to prepare for the upcoming tax filing deadline.',
        time: 'Yesterday'
      }
    ],
    unread: 1
  },
  {
    id: 3,
    user: {
      id: 1,
      name: 'John Doe',
      position: 'Financial Director',
      avatar: '',
      initials: 'JD',
      status: 'online',
      lastSeen: 'Active now'
    },
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Team meeting at 3 PM today to discuss the new budgeting strategy.',
        time: 'Yesterday'
      }
    ],
    unread: 0
  },
  {
    id: 4,
    user: {
      id: 4,
      name: 'David Wilson',
      position: 'Financial Analyst',
      avatar: '',
      initials: 'DW',
      status: 'offline',
      lastSeen: '3h ago'
    },
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'I\'ve updated the forecasting models with the latest market data.',
        time: 'Tuesday'
      }
    ],
    unread: 0
  },
  {
    id: 5,
    user: {
      id: 5,
      name: 'Emily Davis',
      position: 'Accounts Payable',
      avatar: '',
      initials: 'ED',
      status: 'online',
      lastSeen: 'Active now'
    },
    messages: [
      {
        id: 1,
        sender: 'them',
        text: 'Can you approve these vendor invoices by the end of the day?',
        time: 'Monday'
      }
    ],
    unread: 0
  }
];

const Communication = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    toast({
      title: "Message Sent",
      description: "Your message has been sent",
    });
    
    setNewMessage('');
  };
  
  const handleAttachFile = () => {
    toast({
      title: "Attach File",
      description: "File attachment dialog would open here",
    });
  };
  
  const handleStartCall = () => {
    toast({
      title: "Start Call",
      description: "Voice call would initiate here",
    });
  };
  
  const handleStartVideoCall = () => {
    toast({
      title: "Start Video Call",
      description: "Video call would initiate here",
    });
  };
  
  const handleViewInfo = () => {
    toast({
      title: "Contact Info",
      description: "User profile would open here",
    });
  };
  
  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center text-sm mb-4">
        <Link href="/">
          <a className="text-primary">Home</a>
        </Link>
        <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
        <span className="text-secondarytext">Communication</span>
      </div>
      
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-primarytext">Messaging</h1>
        <p className="text-secondarytext mt-1">Communicate with your team and contacts</p>
      </div>
      
      {/* Messaging Interface */}
      <Card className="overflow-hidden">
        <div className="flex h-[calc(100vh-220px)]">
          {/* Sidebar - Conversations List */}
          <div className="w-80 border-r border-gray-100 flex flex-col">
            <div className="p-4 border-b border-gray-100">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input 
                  type="text" 
                  placeholder="Search messages..." 
                  className="w-full pl-10 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <div 
                  key={conversation.id} 
                  className={`flex items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeConversation.id === conversation.id ? 'bg-gray-50' : ''
                  }`}
                  onClick={() => setActiveConversation(conversation)}
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={conversation.user.avatar} />
                      <AvatarFallback className="bg-primary text-white">
                        {conversation.user.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      conversation.user.status === 'online' ? 'bg-green-500' : 
                      conversation.user.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-medium text-primarytext truncate">{conversation.user.name}</h3>
                      <span className="text-xs text-secondarytext">{conversation.messages[conversation.messages.length - 1].time}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-xs text-secondarytext truncate">
                        {conversation.messages[conversation.messages.length - 1].text}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="bg-primary text-white text-xs font-medium h-5 min-w-5 flex items-center justify-center rounded-full px-1.5">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-100">
              <Button className="w-full flex items-center justify-center">
                <Users className="mr-2 h-4 w-4" />
                New Conversation
              </Button>
            </div>
          </div>
          
          {/* Main Conversation Area */}
          <div className="flex-1 flex flex-col">
            {/* Conversation Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activeConversation.user.avatar} />
                  <AvatarFallback className="bg-primary text-white">
                    {activeConversation.user.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-primarytext">{activeConversation.user.name}</h3>
                  <p className="text-xs text-secondarytext">{activeConversation.user.lastSeen}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="ghost" size="icon" onClick={handleStartCall}>
                  <Phone className="h-5 w-5 text-secondarytext" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleStartVideoCall}>
                  <Video className="h-5 w-5 text-secondarytext" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleViewInfo}>
                  <Info className="h-5 w-5 text-secondarytext" />
                </Button>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5 text-secondarytext" />
                </Button>
              </div>
            </div>
            
            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              {activeConversation.messages.map((message) => (
                <div key={message.id} className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  {message.sender === 'them' && (
                    <Avatar className="h-8 w-8 mr-2 mt-1">
                      <AvatarImage src={activeConversation.user.avatar} />
                      <AvatarFallback className="bg-primary text-white text-xs">
                        {activeConversation.user.initials}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  
                  <div className="max-w-[70%]">
                    <div className={`p-3 rounded-lg ${
                      message.sender === 'me' ? 
                      'bg-primary text-white rounded-tr-none' : 
                      'bg-gray-100 text-primarytext rounded-tl-none'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      {message.attachment && (
                        <div className={`mt-2 p-2 rounded flex items-center ${
                          message.sender === 'me' ? 
                          'bg-primary-dark' : 
                          'bg-gray-200'
                        }`}>
                          <div className="h-8 w-8 rounded flex items-center justify-center bg-white mr-2">
                            <File className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-medium truncate">{message.attachment.name}</p>
                            <p className="text-xs opacity-70">{message.attachment.size}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className={`mt-1 text-xs text-secondarytext ${
                      message.sender === 'me' ? 'text-right' : ''
                    }`}>
                      {message.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Message Input */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handleAttachFile}>
                  <Paperclip className="h-5 w-5 text-secondarytext" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Image className="h-5 w-5 text-secondarytext" />
                </Button>
                <div className="flex-1 mx-2">
                  <input 
                    type="text" 
                    placeholder="Type a message..." 
                    className="w-full px-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-gray-300 outline-none transition"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSendMessage();
                      }
                    }}
                  />
                </div>
                <Button variant="ghost" size="icon">
                  <Smile className="h-5 w-5 text-secondarytext" />
                </Button>
                <Button 
                  size="icon" 
                  className="bg-primary text-white hover:bg-primary-dark rounded-full"
                  onClick={handleSendMessage}
                  disabled={newMessage.trim() === ''}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Communication;