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
  console.log(initialData, "initialDatainitialData");

  const onSubmit = (data: AddressFormValues) => {
    console.log(data, "data");
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
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input id="firstName" {...register("firstName")} className="col-span-3" disabled={isSubmitting} />
              {errors.firstName && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.firstName.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input id="lastName" {...register("lastName")} className="col-span-3" disabled={isSubmitting} />
              {errors.lastName && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.lastName.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="company" className="text-right">
                Company
              </Label>
              <Input id="company" {...register("company")} className="col-span-3" disabled={isSubmitting} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addressLine1" className="text-right">
                Address 1
              </Label>
              <Input id="addressLine1" {...register("addressLine1")} className="col-span-3" disabled={isSubmitting} />
              {errors.addressLine1 && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.addressLine1.message}</p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="addressLine2" className="text-right">
                Address 2
              </Label>
              <Input id="addressLine2" {...register("addressLine2")} className="col-span-3" disabled={isSubmitting} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="city" className="text-right">
                City
              </Label>
              <Input id="city" {...register("city")} className="col-span-3" disabled={isSubmitting} />
              {errors.city && <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.city.message}</p>}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="postalCode" className="text-right">
                Postcode
              </Label>
              <Input id="postalCode" {...register("postalCode")} className="col-span-3" disabled={isSubmitting} />
              {errors.postalCode && (
                <p className="col-span-3 col-start-2 text-sm text-red-500">{errors.postalCode.message}</p>
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
