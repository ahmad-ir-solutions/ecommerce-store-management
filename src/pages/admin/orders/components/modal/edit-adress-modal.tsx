import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AddressFormValues } from "../../core/_modals"
import { addressSchema } from "../../core/_schema"

interface EditAddressModalProps {
  isOpen: boolean
  onClose: () => void
  addressType: "billing" | "shipping"
  initialData: AddressFormValues
  onSave: (data: AddressFormValues) => void
  isSubmitting?: boolean
}

export function EditAddressModal({
  isOpen,
  onClose,
  addressType,
  initialData,
  onSave,
  isSubmitting = false,
}: EditAddressModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  })

  const onSubmit = (data: AddressFormValues) => {
    onSave(data)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white">
        <DialogHeader>
          <DialogTitle>Edit {addressType === "billing" ? "Billing" : "Shipping"} Address</DialogTitle>
          <DialogDescription>Make changes to the {addressType} address below.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4 text-gray-500">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" {...register("name")} className="col-span-3" disabled={isSubmitting} />
              {errors.name && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input id="company" {...register("company")} className="col-span-3" disabled={isSubmitting} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address1" className="text-right">
                Address 1
              </Label>
              <Input id="address1" {...register("address1")} className="col-span-3" disabled={isSubmitting} />
              {errors.address1 && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.address1.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="address2" className="text-right">
                Address 2
              </Label>
              <Input id="address2" {...register("address2")} className="col-span-3" disabled={isSubmitting} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input id="city" {...register("city")} className="col-span-3" disabled={isSubmitting} />
              {errors.city && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.city.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="county" className="text-right">
                County
              </Label>
              <Input id="county" {...register("county")} className="col-span-3" disabled={isSubmitting} />
              {errors.county && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.county.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postcode" className="text-right">
                Postcode
              </Label>
              <Input id="postcode" {...register("postcode")} className="col-span-3" disabled={isSubmitting} />
              {errors.postcode && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.postcode.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="country" className="text-right">
                Country
              </Label>
              <Input id="country" {...register("country")} className="col-span-3" disabled={isSubmitting} />
              {errors.country && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.country.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right text-gray-500">
                Phone
              </Label>
              <Input id="phone" {...register("phone")} className="col-span-3" disabled={isSubmitting} />
              {errors.phone && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.phone.message}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting} className="rounded-lg">
              {isSubmitting ? "Saving..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
