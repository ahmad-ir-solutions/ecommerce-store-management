import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomSelect } from '@/components/shared/custom-select';

interface CreatePickwaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalOrdersSelected: number;
  selectedOrderIds: string[];
}

// Define the Zod schema for the form
const createPickwaveSchema = z.object({
  picker: z.string().min(1, "Please select a picker"),
  restrictByWarehouseZone: z.boolean(),
  priorityWarehouseZone: z.string().optional(),
  tag1: z.string().optional(),
  splitByCourier1: z.boolean(),
  tag2: z.string().optional(),
  splitByCourier2: z.boolean(),
  tag3: z.string().optional(),
  splitByCourier3: z.boolean(),
});

type CreatePickwaveFormData = z.infer<typeof createPickwaveSchema>;

export function CreatePickwaveModal({
  isOpen,
  onClose,
  totalOrdersSelected,
  selectedOrderIds,
}: CreatePickwaveModalProps) {
  // Initialize react-hook-form
  const form = useForm<CreatePickwaveFormData>({
    resolver: zodResolver(createPickwaveSchema),
    defaultValues: {
      picker: '',
      restrictByWarehouseZone: false,
      priorityWarehouseZone: '',
      tag1: '',
      splitByCourier1: false,
      tag2: '',
      splitByCourier2: false,
      tag3: '',
      splitByCourier3: false,
    },
  });

  const { handleSubmit, control, formState: { errors } } = form;

  const handleCreateClick = (data: CreatePickwaveFormData) => {
    // TODO: Implement pickwave creation logic here with validated data
    console.log('Creating pickwave with:', data);
    console.log('Selected Order IDs:', selectedOrderIds);
    // onClose(); // Close modal after successful API call
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='bg-white text-[#4E5967]'>
        <DialogHeader>
          <DialogTitle>Create Pickwave Options</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleCreateClick)}>
          <div className="grid gap-4 p-4 bg-[#ECF6FF] rounded-lg">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="total-orders" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Total Orders To Be Assigned
              </Label>
              <div id="total-orders" className="col-span-2">
                {totalOrdersSelected}
              </div>
            </div>
            {/* Picker Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="picker" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Picker
              </Label>
              <Controller
                name="picker"
                control={control}
                render={({ field }) => (
                  <CustomSelect
                    placeholder="Select picker"
                    options={[
                        // TODO: Fetch and populate pickers dynamically
                        { id: "picker1", label: "Picker 1", value: "picker1" },
                        { id: "picker2", label: "Picker 2", value: "picker2" },
                    ]}
                    onChange={(value) => field.onChange(String(value))}
                    defaultValue={field.value}
                    className="border-gray-200 bg-white col-span-2"
                  />
                )}
              />
               {errors.picker && <p className="col-span-4 text-right text-red-500 text-xs">{errors.picker.message}</p>}
            </div>
            {/* Restrict By Warehouse Zone Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="restrictByWarehouseZone" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Restrict By Warehouse Zone
              </Label>
              <Controller
                name="restrictByWarehouseZone"
                control={control}
                render={({ field }) => (
                   <div>
                    <Switch
                      id="restrictByWarehouseZone"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="col-span-2"
                    />
                  </div>
                )}
              />
            </div>
            {/* Priority Warehouse Zone Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="priorityWarehouseZone" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Priority Warehouse Zone
              </Label>
              <Controller
                name="priorityWarehouseZone"
                control={control}
                render={({ field }) => (
                   <CustomSelect
                      placeholder="Select zone"
                      options={[
                          { id: "zone1", label: "Zone 1", value: "zone1" },
                          { id: "zone2", label: "Zone 2", value: "zone2" },
                      ]}
                      onChange={(value) => field.onChange(String(value))}
                      defaultValue={field.value}
                      className="border-gray-200 bg-white col-span-2 h-8"
                    />
                )}
              />
            </div>
            {/* Tag 1 Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag1" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Tag (optional)
              </Label>
               <Controller
                name="tag1"
                control={control}
                render={({ field }) => (
                  <Input id="tag1" {...field} className="bg-white border-gray-300 rounded-md col-span-2 h-8" />
                )}
              />
            </div>
             {/* Split By Courier 1 Field */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="splitByCourier1" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Split By Courier
              </Label>
              <Controller
                name="splitByCourier1"
                control={control}
                render={({ field }) => (
                   <div>
                    <Switch
                      id="splitByCourier1"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="col-span-2"
                    />
                  </div>
                )}
              />
            </div>
             {/* Tag 2 Field */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag2" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Tag (optional)
              </Label>
               <Controller
                name="tag2"
                control={control}
                render={({ field }) => (
                   <Input id="tag2" {...field} className="bg-white border-gray-300 rounded-md col-span-2 h-8" />
                )}
              />
            </div>
             {/* Split By Courier 2 Field */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="splitByCourier2" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Split By Courier
              </Label>
              <Controller
                name="splitByCourier2"
                control={control}
                render={({ field }) => (
                   <div>
                    <Switch
                      id="splitByCourier2"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="col-span-2"
                    />
                  </div>
                )}
              />
            </div>
             {/* Tag 3 Field */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag3" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Tag (optional)
              </Label>
              <Controller
                name="tag3"
                control={control}
                render={({ field }) => (
                  <Input id="tag3" {...field} className="bg-white border-gray-300 rounded-md col-span-2 h-8" />
                )}
              />
            </div>
             {/* Split By Courier 3 Field */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="splitByCourier3" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Split By Courier
              </Label>
              <Controller
                name="splitByCourier3"
                control={control}
                render={({ field }) => (
                   <div>
                    <Switch
                      id="splitByCourier3"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="col-span-2"
                    />
                  </div>
                )}
              />
            </div>

          </div>
          <DialogFooter className='mt-5'>
            <Button variant="outline" onClick={onClose} type="button">Cancel</Button>
            <Button type="submit" variant="primary" className='rounded-lg'>Create</Button>
          </DialogFooter>
        </form>
        <DialogClose asChild>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
} 