import React, { useState } from 'react';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import CardView from '@/components/common/CardView';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate, getInitials } from '@/lib/utils';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  email: string;
  avatarColor: string;
  status: 'active' | 'away' | 'offline';
}

interface Project {
  id: number;
  name: string;
  description: string;
  status: 'in_progress' | 'completed' | 'on_hold';
  progress: number;
  dueDate: string;
  members: number[];
}

interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
  assignee: number | null;
  project: number;
}

const Collaboration: React.FC = () => {
  const [activeTab, setActiveTab] = useState('projects');
  
  // Mock data for team members
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'John Smith',
      role: 'Product Manager',
      email: 'john.smith@example.com',
      avatarColor: 'bg-primary/10 text-primary',
      status: 'active'
    },
    {
      id: 2,
      name: 'Alice Johnson',
      role: 'UX Designer',
      email: 'alice.johnson@example.com',
      avatarColor: 'bg-indigo-100 text-indigo-600',
      status: 'active'
    },
    {
      id: 3,
      name: 'Robert Davis',
      role: 'Frontend Developer',
      email: 'robert.davis@example.com',
      avatarColor: 'bg-blue-100 text-blue-600',
      status: 'away'
    },
    {
      id: 4,
      name: 'Emily Wilson',
      role: 'Backend Developer',
      email: 'emily.wilson@example.com',
      avatarColor: 'bg-green-100 text-green-600',
      status: 'offline'
    },
    {
      id: 5,
      name: 'Michael Brown',
      role: 'QA Engineer',
      email: 'michael.brown@example.com',
      avatarColor: 'bg-orange-100 text-orange-600',
      status: 'active'
    }
  ];
  
  // Mock data for projects
  const projects: Project[] = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Redesigning the company website with updated branding and improved UX',
      status: 'in_progress',
      progress: 65,
      dueDate: '2023-08-15',
      members: [1, 2, 3]
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'Creating a native mobile app for both iOS and Android platforms',
      status: 'in_progress',
      progress: 30,
      dueDate: '2023-09-30',
      members: [1, 3, 4, 5]
    },
    {
      id: 3,
      name: 'CRM Integration',
      description: 'Integrating our systems with the new CRM platform',
      status: 'on_hold',
      progress: 15,
      dueDate: '2023-10-15',
      members: [1, 4]
    },
    {
      id: 4,
      name: 'Marketing Campaign',
      description: 'Q3 digital marketing campaign for new product launch',
      status: 'completed',
      progress: 100,
      dueDate: '2023-06-30',
      members: [1, 2]
    }
  ];
  
  // Mock data for tasks
  const tasks: Task[] = [
    {
      id: 1,
      title: 'Design homepage mockups',
      description: 'Create mockups for the new homepage design',
      status: 'completed',
      priority: 'high',
      dueDate: '2023-07-10',
      assignee: 2,
      project: 1
    },
    {
      id: 2,
      title: 'Implement authentication system',
      description: 'Set up user authentication and authorization',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2023-07-20',
      assignee: 4,
      project: 2
    },
    {
      id: 3,
      title: 'Create API documentation',
      description: 'Document all API endpoints for the mobile app',
      status: 'todo',
      priority: 'medium',
      dueDate: '2023-07-25',
      assignee: 3,
      project: 2
    },
    {
      id: 4,
      title: 'Review UI components',
      description: 'Review and approve the component library',
      status: 'review',
      priority: 'medium',
      dueDate: '2023-07-18',
      assignee: 1,
      project: 1
    },
    {
      id: 5,
      title: 'Set up analytics',
      description: 'Implement analytics tracking for the website',
      status: 'todo',
      priority: 'low',
      dueDate: '2023-07-30',
      assignee: 5,
      project: 1
    },
    {
      id: 6,
      title: 'Data migration planning',
      description: 'Create a plan for migrating data to the new CRM',
      status: 'in_progress',
      priority: 'high',
      dueDate: '2023-07-22',
      assignee: 4,
      project: 3
    }
  ];
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">In Progress</Badge>;
      case 'completed':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Completed</Badge>;
      case 'on_hold':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">On Hold</Badge>;
      case 'todo':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">To Do</Badge>;
      case 'review':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">In Review</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };
  
  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>;
      case 'medium':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Low</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };
  
  const getMemberById = (id: number) => {
    return teamMembers.find(member => member.id === id);
  };
  
  const getProjectById = (id: number) => {
    return projects.find(project => project.id === id);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'away':
        return 'bg-yellow-500';
      case 'offline':
        return 'bg-gray-400';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs items={[{ label: 'Collaboration' }]} />
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Collaboration</h1>
        <p className="text-gray-500">Manage projects, tasks, and team members</p>
      </div>
      
      {/* Collaboration Tabs */}
      <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="w-full bg-background border border-border rounded-lg mb-4">
          <TabsTrigger value="projects" className="flex-1">Projects</TabsTrigger>
          <TabsTrigger value="tasks" className="flex-1">Tasks</TabsTrigger>
          <TabsTrigger value="team" className="flex-1">Team</TabsTrigger>
        </TabsList>
        
        {/* Projects Tab */}
        <TabsContent value="projects">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">Projects</h3>
              <Badge className="bg-primary text-white">{projects.length}</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="on_hold">On Hold</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
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
                New Project
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <CardView key={project.id}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-medium">{project.name}</h3>
                  {getStatusBadge(project.status)}
                </div>
                <p className="text-sm text-gray-500 mb-4">{project.description}</p>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm">
                    <span className="text-gray-500">Due Date:</span>{' '}
                    <span className="font-medium">{formatDate(project.dueDate)}</span>
                  </div>
                  <div className="flex -space-x-2">
                    {project.members.map((memberId) => {
                      const member = getMemberById(memberId);
                      if (!member) return null;
                      
                      return (
                        <Avatar key={member.id} className={`h-8 w-8 border-2 border-white ${member.avatarColor}`}>
                          <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                        </Avatar>
                      );
                    })}
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
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
                      <rect width="18" height="18" x="3" y="3" rx="2" />
                      <path d="M8 12h8" />
                      <path d="M12 8v8" />
                    </svg>
                    Add Task
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
                      <path d="M3 12h4l3 8 4-16 3 8h4" />
                    </svg>
                    Details
                  </Button>
                </div>
              </CardView>
            ))}
          </div>
        </TabsContent>
        
        {/* Tasks Tab */}
        <TabsContent value="tasks">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">Tasks</h3>
              <Badge className="bg-primary text-white">{tasks.length}</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="Search tasks..." 
                className="w-full sm:w-64"
              />
              <Select defaultValue="all_status">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_status">All Statuses</SelectItem>
                  <SelectItem value="todo">To Do</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="review">In Review</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select defaultValue="all_priority">
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all_priority">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
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
                New Task
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task) => {
              const assignee = task.assignee ? getMemberById(task.assignee) : null;
              const project = getProjectById(task.project);
              
              return (
                <CardView key={task.id}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center">
                      <div className="mr-3">
                        <input 
                          type="checkbox" 
                          className="h-5 w-5 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={task.status === 'completed'}
                          onChange={() => {}}
                        />
                      </div>
                      <div>
                        <h3 className={`font-medium ${task.status === 'completed' ? 'line-through text-gray-500' : ''}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4 ml-8 sm:ml-0">
                      {getPriorityBadge(task.priority)}
                      {getStatusBadge(task.status)}
                    </div>
                  </div>
                  
                  <div className="ml-8 grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                    <div>
                      <span className="text-xs text-gray-500 block">Project</span>
                      <span className="text-sm font-medium">{project?.name || 'Unknown'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Due Date</span>
                      <span className="text-sm font-medium">{formatDate(task.dueDate)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Assignee</span>
                      {assignee ? (
                        <div className="flex items-center mt-1">
                          <Avatar className={`h-6 w-6 mr-2 ${assignee.avatarColor}`}>
                            <AvatarFallback>{getInitials(assignee.name)}</AvatarFallback>
                          </Avatar>
                          <span className="text-sm">{assignee.name}</span>
                        </div>
                      ) : (
                        <span className="text-sm">Unassigned</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2 mt-4">
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
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                      Edit
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
                        <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2v5Z" />
                        <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
                      </svg>
                      Comments
                    </Button>
                  </div>
                </CardView>
              );
            })}
          </div>
        </TabsContent>
        
        {/* Team Tab */}
        <TabsContent value="team">
          <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-medium">Team Members</h3>
              <Badge className="bg-primary text-white">{teamMembers.length}</Badge>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input 
                placeholder="Search members..." 
                className="w-full sm:w-64"
              />
              <Button className="bg-primary text-white hover:bg-primary/90 transition-colors">
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
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" x2="19" y1="8" y2="14" />
                  <line x1="22" x2="16" y1="11" y2="11" />
                </svg>
                Add Member
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-border shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 py-3 px-4 bg-gray-50 border-b border-border">
              <div className="font-medium text-sm text-gray-500 md:col-span-2">Name</div>
              <div className="font-medium text-sm text-gray-500 hidden md:block">Role</div>
              <div className="font-medium text-sm text-gray-500 hidden md:block">Email</div>
              <div className="font-medium text-sm text-gray-500">Status</div>
            </div>
            
            {teamMembers.map((member) => (
              <div 
                key={member.id} 
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 py-4 px-4 border-b border-border hover:bg-gray-50"
              >
                <div className="flex items-center md:col-span-2 mb-2 sm:mb-0">
                  <Avatar className={`h-8 w-8 mr-3 ${member.avatarColor}`}>
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{member.name}</div>
                    <div className="text-sm text-gray-500 md:hidden">{member.role}</div>
                  </div>
                </div>
                <div className="hidden md:flex md:items-center text-sm">
                  {member.role}
                </div>
                <div className="hidden md:flex md:items-center text-sm">
                  {member.email}
                </div>
                <div className="flex items-center justify-between sm:justify-start">
                  <div className="flex items-center">
                    <span className={`h-2.5 w-2.5 rounded-full ${getStatusColor(member.status)} mr-2`}></span>
                    <span className="text-sm capitalize">{member.status}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
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
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
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
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default Collaboration;
