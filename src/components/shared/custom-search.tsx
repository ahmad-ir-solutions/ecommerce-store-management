import { Search } from 'lucide-react';
import { Input } from '../ui/input';
import { cn } from '@/lib/utils';

  export const CustomSearch = ({ onClick, placeholder,className, value, onChange }: { onClick?: React.MouseEventHandler<HTMLInputElement>; placeholder?: string, className?: string, value?: string, onChange?:  (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="relative w-full max-w-md">
        <Search className="absolute left-2.5 top-3 h-4 w-4 text-gray-400" />
        <Input
          type="search"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn("w-full pl-8 rounded-lg border-slate-100 bg-white h-10",
                  className
                )}
          onClick={onClick}
       />
      </div>
    );
  };
  