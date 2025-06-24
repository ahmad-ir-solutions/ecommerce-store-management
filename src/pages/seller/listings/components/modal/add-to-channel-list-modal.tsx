import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { CustomSelect } from "@/components/shared/custom-select"

const addToListSchema = z.object({
    masterSku: z.string().min(1, "Master SKU is required"),
    shopSku: z.string().min(1, "Shop SKU is required"),
    channel: z.string().min(1, "Channel is required"),
})

type AddToListFormValues = z.infer<typeof addToListSchema>

interface AddToListModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddToChannelListModal({ isOpen, onClose }: AddToListModalProps) {
    const form = useForm<AddToListFormValues>({
        resolver: zodResolver(addToListSchema),
        defaultValues: {
            masterSku: "",
            shopSku: "",
            channel: "",
        },
    })

    const handleSubmit = (data: AddToListFormValues) => {
        console.log(data)
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white border-none text-[#4E5967] rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#11263C]">Add to your list</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="masterSku"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-3 items-center">
                                        <FormLabel className="col-span-1">Master SKU</FormLabel>
                                        <div className="col-span-2">
                                            <FormControl>
                                                <Input {...field} placeholder="Enter Master SKU" className="col-span-2 border-gray-200" />
                                            </FormControl>
                                            <FormMessage className="col-span-3 text-red-500" />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shopSku"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-3 items-center">
                                        <FormLabel className="col-span-1">Shop SKU</FormLabel>
                                        <div className="col-span-2">
                                            <FormControl>
                                                <Input {...field} placeholder="Enter Shop SKU" className="col-span-2 border-gray-200" />
                                            </FormControl>
                                            <FormMessage className="col-span-3 text-red-500" />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="channel"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-3 items-center">
                                        <FormLabel className="col-span-1">Channel</FormLabel>
                                        <div className="col-span-2">
                                            <FormControl>
                                                <CustomSelect
                                                    options={[
                                                        { id: "online", label: "Online", value: "online" },
                                                        { id: "retail", label: "Retail", value: "retail" },
                                                        { id: "wholesale", label: "Wholesale", value: "wholesale" },
                                                    ]}
                                                    placeholder="Select channel"
                                                    defaultValue={field.value}
                                                    onChange={field.onChange}
                                                    className="border-gray-200"
                                                />
                                            </FormControl>
                                            <FormMessage className="col-span-3 text-red-500" />
                                        </div>

                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end space-x-2 pt-4">
                            <Button variant="outline" type="button" onClick={onClose} className="text-black">
                                Cancel
                            </Button>
                            <Button type="submit" variant="primary" className="rounded-lg">
                                Add to list
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
