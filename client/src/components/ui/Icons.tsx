import React from 'react';
import * as LucideIcons from 'lucide-react';

export type IconName = keyof typeof LucideIcons;

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
}

const Icons: React.FC<IconProps> = ({ name, className = '', size = 24 }) => {
  const IconComponent = LucideIcons[name];

  if (!IconComponent) {
    console.warn(`Icon ${name} not found`);
    return null;
  }

  return <IconComponent className={className} size={size} />;
};

export default Icons;