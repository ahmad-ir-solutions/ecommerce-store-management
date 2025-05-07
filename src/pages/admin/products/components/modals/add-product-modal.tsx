import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/shared/custom-select"
import { z } from "zod"

interface AddProductModalModalProps {
    isOpen: boolean
    onClose: () => void
    // onSave: (data: { productSKU: string; productName: string; productType: string }) => void
    isSubmitting?: boolean
}

const productSchema = z.object({
    productSKU: z.string().optional(),
    productName: z.string().min(1, "Product Name is required"),
    productType: z.string().min(1, "Product Type is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

export function AddProductModal({ isOpen, onClose, isSubmitting = false }: AddProductModalModalProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productSKU: "",
            productName: "",
            productType: "Complete (Ready to pick)",
        },
    })

    const onSubmit = (data: ProductFormValues) => {
        console.log(data,"dadadsadas");
        
        // onSave(data)
        reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[500px] p-2 gap-0 bg-white rounded-2xl border-none text-[#4E5967]">
                <div className="p-6 pb-0">
                    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-[150px_1fr]">
                            <label className="text-sm font-medium whitespace-nowrap">Product SKU</label>
                            <Input
                                {...register("productSKU")}
                                placeholder="Enter SKU"
                                disabled={isSubmitting}
                                className="border-gray-300"
                            />
                        </div>
                        <div className="grid grid-cols-[150px_1fr]">
                            <label className="text-sm font-medium whitespace-nowrap">Product Name *</label>
                            <div>
                                <Input
                                    {...register("productName")}
                                    placeholder="Enter product name"
                                    disabled={isSubmitting}
                                    className="border-gray-300"
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-sm">{errors.productName.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-[150px_1fr]">
                            <label className="text-sm font-medium whitespace-nowrap">Product Type *</label>
                            <div>
                                <CustomSelect
                                    defaultValue="Complete (Ready to pick)"
                                    placeholder="Select product type"
                                    options={[
                                        { id: "Complete (Ready to pick)", label: "Complete (Ready to pick)", value: "Complete (Ready to pick)" },
                                        { id: "Customer Service", label: "Customer Service", value: "Customer Service" },
                                        { id: "Shipping", label: "Shipping", value: "Shipping" },
                                        { id: "Payment", label: "Payment", value: "Payment" },
                                    ]}
                                    onChange={(value) => reset({ productType: value })}
                                    className="border-gray-200 bg-white"
                                />
                                {errors.productType && (
                                    <p className="text-red-500 text-sm">{errors.productType.message}</p>
                                )}
                            </div>
                        </div>
                        <div className="flex justify-end py-4">
                            <Button
                                type="button"
                                variant="outline"
                                size="lg"
                                className="rounded-lg mr-2"
                                onClick={onClose}
                                disabled={isSubmitting}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="rounded-lg"
                                disabled={isSubmitting}
                            >
                                Create
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}
