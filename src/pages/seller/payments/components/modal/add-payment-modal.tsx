import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { CreditCard } from "lucide-react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe("pk_test_51RdPrsPu2CBPBRfynVQqYSA6fwxC3Sg786KotrR8eXij0QYv8ijirgLUha4jOPXPowtsognSnztlwLsfbgxoWrdZ00O24ncHY0")
// const clientSecret = "pi_3RdQ01Pu2CBPBRfy0cVRUKjk_secret_JaLjOpC2qYiwgKZXiShRgSP0T"

interface PaymentMethod {
  id: string
  type: "visa" | "mastercard" | "amex"
  lastFour: string
  fullNumber: string
  expiryDate: string
  cvv: string
  cardholderName: string
  isDefault: boolean
  stripePaymentMethodId?: string
}

interface AddPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onAdd: (paymentMethod: Omit<PaymentMethod, "id">) => void
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "gray-50",
      },
      padding: "10px 12px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
}

function AddPaymentForm({
  onAdd,
  onClose,
}: { onAdd: (paymentMethod: Omit<PaymentMethod, "id">) => void; onClose: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [paymentType, setPaymentType] = useState("card")
  const [cardholderName, setCardholderName] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
  }

  const handleConfirm = async () => {
    if (!stripe || !elements) {
      return
    }

    if (!agreeToTerms) {
      alert("Please agree to the terms of service")
      return
    }

    if (!cardholderName.trim()) {
      alert("Please enter the cardholder name")
      return
    }

    setIsProcessing(true)

    const cardElement = elements.getElement(CardElement)
    if (!cardElement) {
      setIsProcessing(false)
      return
    }

    // Create payment method with Stripe
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
      billing_details: {
        name: cardholderName,
      },
    })

    if (error) {
      setCardError(error.message || "An error occurred")
      setIsProcessing(false)
      return
    }

    if (paymentMethod) {
      // Extract card details from Stripe payment method
      const card = paymentMethod.card
      if (card) {
        const cardType = card.brand as "visa" | "mastercard" | "amex"
        const lastFour = card.last4
        const maskedNumber = `****-****-****-${lastFour}`
        const expiryDate = `${card.exp_month.toString().padStart(2, "0")}/${card.exp_year.toString().slice(-2)}`

        const newPaymentMethod: Omit<PaymentMethod, "id"> = {
          type: cardType,
          lastFour,
          fullNumber: maskedNumber,
          expiryDate,
          cvv: "***", // CVV is not stored for security
          cardholderName,
          isDefault: false,
          stripePaymentMethodId: paymentMethod.id,
        }

        onAdd(newPaymentMethod)
        handleClose()
      }
    }

    setIsProcessing(false)
  }

  const handleClose = () => {
    setCardholderName("")
    setAgreeToTerms(false)
    setCardError(null)
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Payment Method</Label>
        <RadioGroup value={paymentType} onValueChange={setPaymentType} className="flex space-x-6">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" className="checked:text-black"/>
            <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
              <CreditCard className="w-5 h-5" />
            </Label>
          </div>
          {/* <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer">
              <div className="text-blue-600 font-bold text-sm">PayPal</div>
            </Label>
          </div> */}
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
              />
            </div>

            <div className="space-y-2">
              <div className="border border-gray-300 rounded-md p-3 bg-white">
                <CardElement options={cardElementOptions} onChange={handleCardChange} />
              </div>
              {cardError && <div className="text-red-500 text-sm">{cardError}</div>}
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
        <Button variant="outline" onClick={handleClose} className="flex-1" disabled={isProcessing}>
          Cancel
        </Button>
        <Button onClick={handleConfirm} className="rounded-lg flex-1" variant="primary" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Confirm"}
        </Button>
      </div>
    </div>
  )
}

export function AddPaymentModal({ isOpen, onClose, onAdd }: AddPaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-0 rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Payment Methods</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <AddPaymentForm onAdd={onAdd} onClose={onClose} />
        </Elements>
      </DialogContent>
    </Dialog>
  )
}
