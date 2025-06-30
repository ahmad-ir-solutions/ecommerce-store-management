import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CreditCard } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { useSetupIntentConfirm } from "../../core/hooks/useStripe"
import { Stripe, StripeElements } from "@stripe/stripe-js"

interface AddPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: () => void
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#9e2146",
    },
  },
}

function AddPaymentForm({ onAdd, onClose }: { onAdd: () => void; onClose: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentType, setPaymentType] = useState("card")
  const [cardholderName, setCardholderName] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState("")

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
  }

  const { mutate: confirmSetupIntent } = useSetupIntentConfirm()

  const handleConfirm = () => {
    confirmSetupIntent({
      stripe: stripe as Stripe,
      elements: elements as StripeElements,
      cardholderName,
      agreeToTerms,
      onSuccess: () => {
        onAdd?.()
        setTimeout(() => {
          handleClose()
        }, 1500)
      }
    })
  }

  const handleClose = () => {
    if (!isProcessing) {
      setCardholderName("")
      setAgreeToTerms(false)
      setCardError(null)
      setSuccessMsg("")
      onClose()
    }
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
        <RadioGroup value={paymentType} onValueChange={setPaymentType} className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" className="checked:text-black" />
            <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
              <CreditCard className="w-5 h-5" />
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* Payment Details */}
      {paymentType === "card" && (
        <div>
          <Label className="text-sm font-medium mb-3 block">Payment Details</Label>
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Enter Name on Card"
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="w-full border-gray-300 py-5"
                disabled={isProcessing}
              />
            </div>

            <div className="space-y-2">
              <div className="border border-gray-300 rounded-md p-3 bg-white">
                <CardElement options={cardElementOptions} onChange={handleCardChange} />
              </div>
              {cardError && <div className="text-red-500 text-sm">{cardError}</div>}
              {successMsg && <div className="text-green-600 text-sm">{successMsg}</div>}
            </div>
          </div>
        </div>
      )}

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
          disabled={isProcessing}
        />
        <Label htmlFor="terms" className="text-xs text-gray-600 leading-relaxed">
          By Clicking "Confirm Payment" I agree to the{" "}
          <a href="#" className="text-blue-600 underline">
            companies terms of services
          </a>
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleClose} className="flex-1 bg-transparent" disabled={isProcessing}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} className="rounded-lg flex-1" disabled={isProcessing || !stripe} variant="primary">
          {isProcessing ? "Processing..." : "Confirm"}
        </Button>
      </div>
    </div>
  )
}

export function AddPaymentModal({ isOpen, onClose, onAdd }: AddPaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-none rounded-2xl">
        <DialogHeader>
          <DialogTitle>Add Payment Method</DialogTitle>
        </DialogHeader>
        <AddPaymentForm onClose={onClose} onAdd={onAdd} />
      </DialogContent>
    </Dialog>
  )
}
