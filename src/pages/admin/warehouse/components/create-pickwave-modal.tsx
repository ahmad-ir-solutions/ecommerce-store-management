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
import { useCreatePickwave } from "../core/hooks/usePickwave";

interface CreatePickwaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalOrdersSelected: number;
  selectedOrderIds: string[];
  onSuccess?: () => void;
}

// Define the Zod schema for the form
const createPickwaveSchema = z.object({
  picker: z.string().min(1, "Please select a picker"),
  restrictedByWarehouseZone: z.boolean(),
  priorityWarehouseZone: z.string().optional(),
  tag: z.string().optional(),
  splitByCourier: z.boolean(),
});

type CreatePickwaveFormData = z.infer<typeof createPickwaveSchema>;

export function CreatePickwaveModal({
  isOpen,
  onClose,
  totalOrdersSelected,
  selectedOrderIds,
  onSuccess,
}: CreatePickwaveModalProps) {
  const { mutate: createPickwave } = useCreatePickwave()

  // Initialize react-hook-form
  const form = useForm<CreatePickwaveFormData>({
    resolver: zodResolver(createPickwaveSchema),
    defaultValues: {
      picker: '',
      restrictedByWarehouseZone: false,
      priorityWarehouseZone: '',
      tag: '',
      splitByCourier: false,
    },
  });

  const { handleSubmit, control, formState: { errors }, reset } = form;

  const handleCreateClick = (data: CreatePickwaveFormData) => {
    createPickwave(
      {...data, orders: selectedOrderIds, createdBy: "Ahmad",},
      {
        onSuccess: () => {
          reset();
          onClose();
          onSuccess?.();
        }
      }
    );
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
              <Label htmlFor="restrictedByWarehouseZone" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Restrict By Warehouse Zone
              </Label>
              <Controller
                name="restrictedByWarehouseZone"
                control={control}
                render={({ field }) => (
                   <div>
                    <Switch
                      id="restrictedByWarehouseZone"
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
            {/* Tag Field */}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="tag" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Tag (optional)
              </Label>
               <Controller
                name="tag"
                control={control}
                render={({ field }) => (
                  <Input id="tag" {...field} className="bg-white border-gray-300 rounded-md col-span-2 h-8" />
                )}
              />
            </div>
             {/* Split By Courier Field */}
             <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="splitByCourier" className="text-right whitespace-nowrap col-span-2 text-[#4E5967] font-normal">
                Split By Courier
              </Label>
              <Controller
                name="splitByCourier"
                control={control}
                render={({ field }) => (
                   <div>
                    <Switch
                      id="splitByCourier"
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