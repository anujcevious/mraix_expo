import { X, User, Settings, LogOut, HelpCircle, Mail, Phone } from 'lucide-react';
import  Button  from '@/components/ui/Button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

interface UserProfilePopupProps {
  onClose: () => void;
  onLogout: () => void;
}

const UserProfilePopup = ({ onClose, onLogout }: UserProfilePopupProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  
  const handleNavigation = (path: string) => {
    window.location.href = path;
  };
  
  return (
    <div className="fixed top-16 right-4 z-50 w-72 animate-fade-in">
      <Card className="shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-semibold text-primarytext">My Profile</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4">
          {/* User Avatar and Name */}
          <div className="flex items-center">
            <Avatar className="h-16 w-16 border-4 border-white shadow-md">
              <AvatarImage src={user?.avatar || ''} alt={user?.name || 'User'} />
              <AvatarFallback className="bg-primary text-white text-lg">
                {user?.name?.charAt(0) || 'U'}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h4 className="font-semibold text-primarytext">{user?.name || 'Guest User'}</h4>
              <p className="text-sm text-secondarytext">{user?.role || 'User'}</p>
              <div className="flex items-center mt-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></div>
                <span className="text-xs text-green-600">Online</span>
              </div>
            </div>
          </div>
          
          {/* User Contact Info */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center text-sm text-secondarytext">
              <Mail className="h-4 w-4 mr-2 text-gray-400" />
              <span>{user?.email || 'No email provided'}</span>
            </div>
            <div className="flex items-center text-sm text-secondarytext">
              <Phone className="h-4 w-4 mr-2 text-gray-400" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          
          <Separator className="my-4" />
          
          {/* Quick Links */}
          <div className="space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
              onClick={() => handleNavigation('/settings')}
            >
              <User className="h-4 w-4 mr-2 text-primary" />
              My Account
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
              onClick={() => handleNavigation('/settings')}
            >
              <Settings className="h-4 w-4 mr-2 text-primary" />
              Settings
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-sm font-normal"
              onClick={() => handleNavigation('/help')}
            >
              <HelpCircle className="h-4 w-4 mr-2 text-primary" />
              Help & Support
            </Button>
          </div>
          
          <Separator className="my-4" />
          
          {/* Logout Button */}
          <Button
            variant="destructive"
            className="w-full"
            onClick={onLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default UserProfilePopup;