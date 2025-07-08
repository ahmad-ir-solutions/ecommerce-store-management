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
    placeholder?: string;
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
                    {options?.map((opt) => (
                        <SelectItem key={opt.value} value={String(opt.value)}>
                            {opt.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
};


// import { useState } from "react";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectItem,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

// interface Option {
//   id: string | number;
//   label: string;
//   value: string | number;
// }

// interface SelectDropdownProps {
//   placeholder?: string;
//   defaultValue?: string | number;
//   options: Option[];
//   onChange?: (value: string | number) => void;
//   className?: string;
//   title?: string;
// }

// export const SelectDropdown = ({
//   placeholder,
//   defaultValue,
//   options,
//   onChange,
//   className,
//   title,
// }: SelectDropdownProps) => {
//   const [searchQuery, setSearchQuery] = useState("");

//   const filteredOptions = options.filter((opt) =>
//     opt.label.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleChange = (val: string) => {
//     const selected = options.find((opt) => String(opt.value) === val);
//     if (onChange && selected) {
//       onChange(selected.value);
//     }
//   };

//   return (
//     <div className="space-y-1">
//       {title && (
//         <div className="text-sm font-normal text-gray-500 whitespace-nowrap">
//           {title}
//         </div>
//       )}
//       <Select
//         defaultValue={String(defaultValue)}
//         value={String(defaultValue)}
//         onValueChange={handleChange}
//       >
//         <SelectTrigger className={cn("w-full border-gray-300 rounded-lg", className)}>
//           <SelectValue placeholder={placeholder} />
//         </SelectTrigger>
//         <SelectContent className="w-full border-gray-100 bg-white max-h-64 overflow-y-auto">
//           <div className="p-2 sticky top-0 bg-white z-10">
//             <Input
//               placeholder="Search..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="text-sm"
//             />
//           </div>
//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((opt) => (
//               <SelectItem key={opt.value} value={String(opt.value)}>
//                 {opt.label}
//               </SelectItem>
//             ))
//           ) : (
//             <div className="px-3 py-2 text-sm text-muted-foreground">No results found</div>
//           )}
//         </SelectContent>
//       </Select>
//     </div>
//   );
// };
