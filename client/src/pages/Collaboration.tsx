import { useState } from 'react';
import { Link } from 'wouter';
import { 
  ChevronRight,
  Users,
  MessageCircle,
  Calendar,
  FileText,
  CheckCircle,
  Plus,
  Search,
  MoreHorizontal
} from 'lucide-react';
import  Button  from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';

// Sample data for projects and team members
const projects = [
  {
    id: 1,
    name: 'Annual Financial Audit',
    description: 'Prepare documentation and coordinate with external auditors for annual audit.',
    progress: 75,
    dueDate: 'May 30, 2023',
    members: [
      { id: 1, name: 'John Doe', avatar: '', initials: 'JD' },
      { id: 2, name: 'Sarah Johnson', avatar: '', initials: 'SJ' },
      { id: 3, name: 'Michael Chen', avatar: '', initials: 'MC' }
    ],
    tasks: 12,
    completedTasks: 9
  },
  {
    id: 2,
    name: 'Tax Compliance Review',
    description: 'Review tax compliance documentation and prepare for filing deadlines.',
    progress: 40,
    dueDate: 'Jun 15, 2023',
    members: [
      { id: 2, name: 'Sarah Johnson', avatar: '', initials: 'SJ' },
      { id: 4, name: 'David Wilson', avatar: '', initials: 'DW' }
    ],
    tasks: 8,
    completedTasks: 3
  },
  {
    id: 3,
    name: 'Budget Planning 2024',
    description: 'Develop budget forecasts and financial projections for next fiscal year.',
    progress: 20,
    dueDate: 'Jul 10, 2023',
    members: [
      { id: 1, name: 'John Doe', avatar: '', initials: 'JD' },
      { id: 3, name: 'Michael Chen', avatar: '', initials: 'MC' },
      { id: 4, name: 'David Wilson', avatar: '', initials: 'DW' },
      { id: 5, name: 'Emily Davis', avatar: '', initials: 'ED' }
    ],
    tasks: 15,
    completedTasks: 3
  }
];

const teamMembers = [
  { id: 1, name: 'John Doe', position: 'Financial Director', avatar: '', initials: 'JD', status: 'online' },
  { id: 2, name: 'Sarah Johnson', position: 'Senior Accountant', avatar: '', initials: 'SJ', status: 'away' },
  { id: 3, name: 'Michael Chen', position: 'Tax Specialist', avatar: '', initials: 'MC', status: 'online' },
  { id: 4, name: 'David Wilson', position: 'Financial Analyst', avatar: '', initials: 'DW', status: 'offline' },
  { id: 5, name: 'Emily Davis', position: 'Accounts Payable', avatar: '', initials: 'ED', status: 'online' }
];

// Sample data for recent activities
const activities = [
  { 
    id: 1, 
    user: { name: 'Sarah Johnson', avatar: '', initials: 'SJ' }, 
    action: 'commented on', 
    target: 'Annual Financial Audit', 
    time: '10 minutes ago', 
    content: 'I\'ve uploaded the latest balance sheets to the shared folder.'
  },
  { 
    id: 2, 
    user: { name: 'John Doe', avatar: '', initials: 'JD' }, 
    action: 'completed task', 
    target: 'Prepare Q1 financial statements', 
    time: '1 hour ago',
    content: null
  },
  { 
    id: 3, 
    user: { name: 'Michael Chen', avatar: '', initials: 'MC' }, 
    action: 'created project', 
    target: 'Tax Compliance Review', 
    time: '3 hours ago',
    content: null
  },
  { 
    id: 4, 
    user: { name: 'Emily Davis', avatar: '', initials: 'ED' }, 
    action: 'assigned task to', 
    target: 'David Wilson', 
    time: 'Yesterday',
    content: 'Please review the latest vendor invoices by Friday.'
  }
];

const Collaboration = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleCreateProject = () => {
    toast({
      title: "Create Project",
      description: "Project creation form would open here",
    });
  };
  
  const handleJoinMeeting = () => {
    toast({
      title: "Join Meeting",
      description: "Video conference would start here",
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
        <span className="text-secondarytext">Collaboration</span>
      </div>
      
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold text-primarytext">Team Workspace</h1>
          <p className="text-secondarytext mt-1">Collaborate with your team on projects and tasks</p>
        </div>
        <div className="flex space-x-2 mt-2 sm:mt-0">
          <Button variant="outline" className="flex items-center" onClick={handleJoinMeeting}>
            <Users className="h-4 w-4 mr-2" />
            Join Meeting
          </Button>
          <Button className="flex items-center" onClick={handleCreateProject}>
            <Plus className="h-4 w-4 mr-2" />
            New Project
          </Button>
        </div>
      </div>
      
      {/* Quick Nav Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-primary-light bg-opacity-20 flex items-center justify-center text-primary mr-3">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-primarytext font-medium">Messages</h3>
              <p className="text-xs text-secondarytext">5 unread</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-green-100 flex items-center justify-center text-green-600 mr-3">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-primarytext font-medium">Tasks</h3>
              <p className="text-xs text-secondarytext">12 active</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-primarytext font-medium">Calendar</h3>
              <p className="text-xs text-secondarytext">2 events today</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4 hover:shadow-md transition-shadow duration-200 cursor-pointer">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-md bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-primarytext font-medium">Documents</h3>
              <p className="text-xs text-secondarytext">25 shared files</p>
            </div>
          </div>
        </Card>
      </div>
      
      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-primarytext">Active Projects</h2>
          <Link href="/projects">
            <a className="text-sm text-primary hover:underline">View All</a>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-primarytext font-semibold">{project.name}</h3>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-secondarytext mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1 text-sm">
                    <span className="text-secondarytext">Progress</span>
                    <span className="text-primarytext font-medium">{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2" 
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <span className="text-secondarytext">Due: </span>
                    <span className="text-primarytext">{project.dueDate}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-primarytext font-medium">{project.completedTasks}/{project.tasks} </span>
                    <span className="text-secondarytext">tasks</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex -space-x-2">
                    {project.members.slice(0, 3).map((member) => (
                      <Avatar key={member.id} className="border-2 border-white h-8 w-8">
                        <AvatarImage src={member.avatar} />
                        <AvatarFallback className="bg-primary text-white text-xs">
                          {member.initials}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    {project.members.length > 3 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-secondarytext">
                        +{project.members.length - 3}
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm" className="text-xs">Details</Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Two Column Layout: Team Members and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members */}
        <Card className="col-span-1">
          <div className="p-5 border-b border-gray-100">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-primarytext">Team Members</h2>
              <Button variant="ghost" size="sm">See All</Button>
            </div>
          </div>
          
          <div className="p-2">
            <div className="relative mb-3 px-3">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input 
                type="text" 
                placeholder="Search team members..." 
                className="w-full pl-8 pr-4 py-2 text-sm bg-gray-100 border border-transparent rounded-lg focus:bg-white focus:border-primary-light focus:ring-1 focus:ring-primary-light outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {teamMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                <div className="flex items-center">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback className="bg-primary text-white">
                        {member.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white ${
                      member.status === 'online' ? 'bg-green-500' : 
                      member.status === 'away' ? 'bg-amber-500' : 'bg-gray-300'
                    }`}></div>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-primarytext">{member.name}</h3>
                    <p className="text-xs text-secondarytext">{member.position}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="text-xs">Message</Button>
              </div>
            ))}
          </div>
        </Card>
        
        {/* Activity Feed */}
        <Card className="col-span-1 lg:col-span-2">
          <div className="p-5 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-primarytext">Recent Activity</h2>
          </div>
          
          <div className="p-4">
            {activities.map((activity) => (
              <div key={activity.id} className="flex mb-4 last:mb-0">
                <Avatar className="h-10 w-10 mr-3 mt-1">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="bg-primary text-white">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1">
                  <div className="text-sm">
                    <span className="font-medium text-primarytext">{activity.user.name}</span>
                    <span className="text-secondarytext"> {activity.action} </span>
                    <span className="font-medium text-primarytext">{activity.target}</span>
                  </div>
                  
                  {activity.content && (
                    <div className="mt-2 mb-2 p-3 bg-gray-50 rounded-md text-sm text-secondarytext">
                      {activity.content}
                    </div>
                  )}
                  
                  <div className="flex items-center text-xs text-secondarytext mt-1">
                    <span>{activity.time}</span>
                    <Button variant="ghost" size="sm" className="text-xs ml-2 h-auto p-1 hover:text-primary">Reply</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Collaboration;