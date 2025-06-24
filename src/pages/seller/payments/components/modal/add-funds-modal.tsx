import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SelectDropdown } from "@/components/shared/select-dropdown"

const addFundsSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  method: z.string().min(1, "Payment method is required"),
})

type AddFundsFormValues = z.infer<typeof addFundsSchema>

interface AddFundsModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (amount: number) => void
}

export function AddFundsModal({ isOpen, onClose, onConfirm }: AddFundsModalProps) {
  const form = useForm<AddFundsFormValues>({
    resolver: zodResolver(addFundsSchema),
    defaultValues: {
      amount: "20,000",
      method: "",
    },
  })

  const formatAmount = (value: string) => {
    // Remove all non-numeric characters except decimal point
    const numericValue = value.replace(/[^0-9.]/g, "")

    // Format with commas
    const parts = numericValue.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return parts.join(".")
  }

  const onSubmit = (data: AddFundsFormValues) => {
    const numericAmount = Number.parseFloat(data.amount.replace(/,/g, ""))
    if (numericAmount > 0) {
      onConfirm(numericAmount)
      handleClose()
    }
  }

  const handleClose = () => {
    form.reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[400px] bg-white mx-auto rounded-2xl border-0">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">Add Funds</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Amount Field */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Amount</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">£</span>
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(formatAmount(e.target.value))}
                        className="pl-8 border-gray-300"
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Payment Method Selection */}
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Select Method</FormLabel>
                  <SelectDropdown
                    title="Choose Payment Method"
                    placeholder="Select a payment method"
                    defaultValue={field.value}
                    onChange={field.onChange}
                    options={[
                      { value: "bank-transfer", label: "Bank Transfer", id: 1 },
                      { value: "debit-card", label: "Debit Card", id: 2 },
                      { value: "credit-card", label: "Credit Card", id: 3 },
                      { value: "paypal", label: "PayPal", id: 4 },
                      { value: "stripe", label: "Stripe", id: 5 },
                    ]}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1 h-12 border-gray-300 text-gray-700 hover:bg-gray-50 text-base"
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 text-white text-base">
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
