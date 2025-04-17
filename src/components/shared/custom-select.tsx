import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Option {
  label: string;
  value: string;
}

interface CustomSelectProps {
  placeholder: string;
  defaultValue?: string;
  options: Option[];
  onChange?: (value: string) => void;
  className?: string;
  title?: string;
}

export const CustomSelect = ({
  placeholder,
  defaultValue,
  options,
  onChange,
  className,
  title,
}: CustomSelectProps) => {
  return (
    <Select defaultValue={defaultValue} onValueChange={onChange}>
      <div className="text-sm font-normal text-gray-500 whitespace-nowrap">{title}</div>
      <SelectTrigger className={cn("w-full border-gray-300 rounded-lg", className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="w-full border-gray-100 bg-white">
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
