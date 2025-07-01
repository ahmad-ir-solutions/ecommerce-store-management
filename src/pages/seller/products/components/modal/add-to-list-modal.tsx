import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form"
import { IProductModel } from "@/pages/admin/products/core/_modals"
import { useListWoocommerceProduct } from "@/pages/seller/listings/core/hooks/useListing"
import { SelectDropdown } from "@/components/shared/select-dropdown"
import { useGetConnectedAccounts } from "@/pages/seller/shops/core/hooks/useConnectAccount"

const addToListSchema = z.object({
    sellerPrice: z.number().min(1, "Seller price is required"),
    accountConnectionId: z.string().min(1, "Connected account is required"),
})

type AddToListFormValues = z.infer<typeof addToListSchema>

interface AddToListModalProps {
    isOpen: boolean
    onClose: () => void
    product: IProductModel | null
}

export function AddToListModal({ isOpen, onClose, product }: AddToListModalProps) {
    const form = useForm<AddToListFormValues>({
        resolver: zodResolver(addToListSchema),
        defaultValues: {
            sellerPrice: product?.price || 0,
            accountConnectionId: "",
        },
    })
    const { data: connectedAccounts = [], isLoading } = useGetConnectedAccounts();

    const connected = connectedAccounts.filter((acc: any) => acc.isAccountConnected === true);

    const connectedAccountOptions = connected.map((acc: any) => ({
        id: acc._id,
        label: acc.profileName,
        value: acc._id,
    }));


    const { mutate: listProduct, isPending } = useListWoocommerceProduct();

    const handleSubmit = (data: AddToListFormValues) => {
        console.log(data)
        listProduct({
            masterProductId: product?._id || "",
            sellerPrice: form.getValues("sellerPrice") || 0,
            accountConnectionId: form.getValues("accountConnectionId") || "",
        });
        onClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-md bg-white border-none text-[#4E5967] rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-[#11263C]">Add to your list</DialogTitle>
                </DialogHeader>
                {product && (
                    <div className="grid grid-cols-3 gap-4">
                        <div className="col-span-1 font-medium text-sm">Current Price</div>
                        <div className="col-span-2 text-sm">${product.price}</div>
                    </div>
                )}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                        <div className="grid gap-4">
                            {/* seller price */}
                            <FormField
                                control={form.control}
                                name="sellerPrice"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-3 items-center">
                                        <FormLabel className="col-span-1">Seller Price</FormLabel>
                                        <div className="col-span-2">
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    value={field.value || ''}
                                                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                                                    placeholder="Enter Seller Price"
                                                    className="col-span-2 border-gray-200"
                                                    type="number"
                                                />
                                            </FormControl>
                                            <FormMessage className="col-span-3 text-red-500" />
                                        </div>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="accountConnectionId"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-3 items-center">
                                        <FormLabel className="col-span-1">Select Account</FormLabel>
                                        <div className="col-span-2">
                                            <FormControl>
                                                <SelectDropdown
                                                    options={connectedAccountOptions}
                                                    placeholder={isLoading ? "Loading accounts..." : "Select Connected Account"}
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
                                {isPending ? "Listing..." : "Add to list"}
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
