import React from 'react';
import {
  Home,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  Menu,
  Search,
  Bell,
  Settings,
  User,
  LogOut,
  Filter,
  Plus,
  Download,
  Eye,
  Edit,
  Trash,
  ArrowUp10,
  FileText,
  Printer,
  ArrowRight,
  Calendar,
  CreditCard,
  DollarSign,
  BarChart2,
  TrendingUp,
  TrendingDown,
  Users,
  Building,
  Package,
  ShoppingCart,
  Truck,
  HelpCircle,
  Star,
  MoreHorizontal,
  AlertCircle,
  Check,
  X,
  Info,
  Shield,
  Mail,
  Phone,
  Megaphone,
  Bot
} from 'lucide-react';

export type IconName = 
  | 'home'
  | 'chevronRight'
  | 'chevronLeft'
  | 'chevronDown'
  | 'chevronUp'
  | 'menu'
  | 'search'
  | 'bell'
  | 'settings'
  | 'user'
  | 'logout'
  | 'filter'
  | 'plus'
  | 'download'
  | 'eye'
  | 'edit'
  | 'trash'
  | 'arrowUp10'
  | 'fileText'
  | 'printer'
  | 'arrowRight'
  | 'calendar'
  | 'creditCard'
  | 'dollarSign'
  | 'barChart2'
  | 'trendingUp'
  | 'trendingDown'
  | 'users'
  | 'building'
  | 'package'
  | 'shoppingCart'
  | 'truck'
  | 'helpCircle'
  | 'star'
  | 'moreHorizontal'
  | 'alertCircle'
  | 'check'
  | 'x'
  | 'info'
  | 'shield'
  | 'mail'
  | 'phone'
  | 'megaphone'
  | 'bot';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const Icons: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const iconProps = {
    className,
    size
  };

  switch (name) {
    case 'home':
      return <Home {...iconProps} />;
    case 'chevronRight':
      return <ChevronRight {...iconProps} />;
    case 'chevronLeft':
      return <ChevronLeft {...iconProps} />;
    case 'chevronDown':
      return <ChevronDown {...iconProps} />;
    case 'chevronUp':
      return <ChevronUp {...iconProps} />;
    case 'menu':
      return <Menu {...iconProps} />;
    case 'search':
      return <Search {...iconProps} />;
    case 'bell':
      return <Bell {...iconProps} />;
    case 'settings':
      return <Settings {...iconProps} />;
    case 'user':
      return <User {...iconProps} />;
    case 'logout':
      return <LogOut {...iconProps} />;
    case 'filter':
      return <Filter {...iconProps} />;
    case 'plus':
      return <Plus {...iconProps} />;
    case 'download':
      return <Download {...iconProps} />;
    case 'eye':
      return <Eye {...iconProps} />;
    case 'edit':
      return <Edit {...iconProps} />;
    case 'trash':
      return <Trash {...iconProps} />;
    case 'arrowUp10':
      return <ArrowUp10 {...iconProps} />;
    case 'fileText':
      return <FileText {...iconProps} />;
    case 'printer':
      return <Printer {...iconProps} />;
    case 'arrowRight':
      return <ArrowRight {...iconProps} />;
    case 'calendar':
      return <Calendar {...iconProps} />;
    case 'creditCard':
      return <CreditCard {...iconProps} />;
    case 'dollarSign':
      return <DollarSign {...iconProps} />;
    case 'barChart2':
      return <BarChart2 {...iconProps} />;
    case 'trendingUp':
      return <TrendingUp {...iconProps} />;
    case 'trendingDown':
      return <TrendingDown {...iconProps} />;
    case 'users':
      return <Users {...iconProps} />;
    case 'building':
      return <Building {...iconProps} />;
    case 'package':
      return <Package {...iconProps} />;
    case 'shoppingCart':
      return <ShoppingCart {...iconProps} />;
    case 'truck':
      return <Truck {...iconProps} />;
    case 'helpCircle':
      return <HelpCircle {...iconProps} />;
    case 'star':
      return <Star {...iconProps} />;
    case 'moreHorizontal':
      return <MoreHorizontal {...iconProps} />;
    case 'alertCircle':
      return <AlertCircle {...iconProps} />;
    case 'check':
      return <Check {...iconProps} />;
    case 'x':
      return <X {...iconProps} />;
    case 'info':
      return <Info {...iconProps} />;
    case 'shield':
      return <Shield {...iconProps} />;
    case 'mail':
      return <Mail {...iconProps} />;
    case 'phone':
      return <Phone {...iconProps} />;
    case 'megaphone':
      return <Megaphone {...iconProps} />;
    case 'bot':
      return <Bot {...iconProps} />;
    default:
      return null;
  }
};

export default Icons;