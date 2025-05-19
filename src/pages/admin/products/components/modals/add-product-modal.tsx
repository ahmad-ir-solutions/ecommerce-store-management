import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CustomSelect } from "@/components/shared/custom-select"
import { z } from "zod"
import { useCreateProduct } from '../../core/hooks/useProduct'

interface AddProductModalModalProps {
    isOpen: boolean
    onClose: () => void
}

const productSchema = z.object({
    sku: z.string().optional(),
    productName: z.string().min(1, "Product Name is required"),
    productType: z.string().min(1, "Product Type is required"),
})

type ProductFormValues = z.infer<typeof productSchema>

export function AddProductModal({ isOpen, onClose }: AddProductModalModalProps) {
    const createProductMutation = useCreateProduct()
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            productType: "simple",
        },
    })

    const onSubmit = (data: ProductFormValues) => {
        createProductMutation.mutate(data)
        onClose()
        reset()
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogTitle></DialogTitle>
            <DialogContent className="sm:max-w-[500px] p-2 gap-0 bg-white rounded-2xl border-none text-[#4E5967]">
                <div className="p-6 pb-0">
                    <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid grid-cols-[150px_1fr]">
                            <label className="text-sm font-medium whitespace-nowrap">Product SKU</label>
                            <Input
                                {...register("sku")}
                                placeholder="Enter SKU"
                                disabled={createProductMutation.isPending}
                                className="border-gray-300"
                            />
                        </div>
                        <div className="grid grid-cols-[150px_1fr]">
                            <label className="text-sm font-medium whitespace-nowrap">Product Name *</label>
                            <div>
                                <Input
                                    {...register("productName")}
                                    placeholder="Enter product name"
                                    disabled={createProductMutation.isPending}
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
                                        { id: "simple", label: "Simple", value: "simple" },
                                        { id: "variation", label: "Variation", value: "variation" },
                                    ]}
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
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="primary"
                                size="lg"
                                className="rounded-lg"
                                 disabled={createProductMutation.isPending}
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
