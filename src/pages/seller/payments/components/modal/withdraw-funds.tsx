import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { SelectDropdown } from "@/components/shared/select-dropdown"

const withdrawSchema = z.object({
  amount: z.string().min(1, "Amount is required"),
  method: z.string().min(1, "Withdrawal method is required"),
})

type WithdrawFormValues = z.infer<typeof withdrawSchema>

interface WithdrawFundsModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: (amount: number) => void
}

export function WithdrawFundsModal({ isOpen, onClose, onConfirm }: WithdrawFundsModalProps) {
  const form = useForm<WithdrawFormValues>({
    resolver: zodResolver(withdrawSchema),
    defaultValues: {
      amount: "",
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

  const onSubmit = (data: WithdrawFormValues) => {
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
      <DialogContent className="sm:max-w-md w-[95vw] max-w-[400px] bg-white rounded-2xl border-0 mx-auto">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">Withdraw Funds</DialogTitle>
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
                        className="pl-8 border-gray-300 text-gray-900"
                        placeholder="0.00"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Withdrawal Method Selection */}
            <FormField
              control={form.control}
              name="method"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-gray-700">Select Method</FormLabel>
                  <SelectDropdown
                    title="Withdrawal Method"
                    placeholder="Choose withdrawal method"
                    defaultValue={field.value}
                    onChange={field.onChange}
                    options={[
                      { id: 1, label: "Bank Transfer", value: "bank-transfer" },
                      { id: 2, label: "PayPal", value: "paypal" },
                      { id: 3, label: "Check", value: "check" },
                      { id: 4, label: "Wire Transfer", value: "wire-transfer" },
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
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" className="flex-1 rounded-lg">
                Confirm
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
