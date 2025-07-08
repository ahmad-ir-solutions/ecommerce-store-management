import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface Option {
    id: string | number;
    label: string;
    value: string | number;
}

interface SelectDropdown {
    placeholder: string;
    defaultValue?: string | number;
    options: Option[];
    onChange?: (value: string | number) => void;
    className?: string;
    title?: string;
}

export const SelectDropdown = ({
    placeholder,
    defaultValue,
    options,
    onChange,
    className,
    title,
}: SelectDropdown) => {
    const handleChange = (val: string) => {
        const selected = options.find((opt) => String(opt.value) === val);
        if (onChange && selected) {
            onChange(selected.value); // Maintain original type
        }
    };

    return (
        <div className="space-y-1">
            {title && (
                <div className="text-sm font-normal text-gray-500 whitespace-nowrap">
                    {title}
                </div>
            )}
            <Select defaultValue={String(defaultValue)} value={String(defaultValue)} onValueChange={handleChange}>
                <SelectTrigger className={cn("w-full border-gray-300 rounded-lg", className)}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent className="w-full border-gray-100 bg-white">
                    {options.map((opt) => (
                        <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};
