import React, { useState } from 'react';
import { SearchIcon } from '@/assets/icons';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSearch?: (value: string) => void;
  delay?: number;
}

const SearchInput: React.FC<SearchInputProps> = ({
  className,
  onSearch,
  delay = 300,
  ...props
}) => {
  const [value, setValue] = useState('');
  const [debouncedSearchTimeout, setDebouncedSearchTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    
    if (onSearch) {
      // Clear any existing timeout
      if (debouncedSearchTimeout) {
        clearTimeout(debouncedSearchTimeout);
      }
      
      // Set a new timeout
      const timeout = setTimeout(() => {
        onSearch(newValue);
      }, delay);
      
      setDebouncedSearchTimeout(timeout);
    }
  };

  return (
    <div className="relative">
      <Input
        type="text"
        className={cn("pl-9 focus:ring-2 focus:ring-primary/20", className)}
        value={value}
        onChange={handleChange}
        {...props}
      />
      <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    </div>
  );
};

export default SearchInput;
