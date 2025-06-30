import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { loadStripe } from "@stripe/stripe-js"
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js"

// Initialize Stripe (replace with your publishable key)
const stripePromise = loadStripe(
  import.meta.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_51OFrhCA8Z7XYs2EGhmpaLrnsI6NLc0u34OqER9RF0sO9R5SNeWioaqFyEnmzVRjBf0SOx7PPeT1IVVLk41vdgaJu00etitUgAj"
)

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

interface EditPaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (paymentMethod: PaymentMethod) => void
  paymentMethod: PaymentMethod | null
}

const cardElementOptions = {
  style: {
    base: {
      fontSize: "16px",
      color: "#424770",
      "::placeholder": {
        color: "#aab7c4",
      },
      padding: "10px 12px",
    },
    invalid: {
      color: "#9e2146",
    },
  },
  hidePostalCode: true,
}

function EditPaymentForm({
  onSave,
  onClose,
  paymentMethod,
}: {
  onSave: (paymentMethod: PaymentMethod) => void
  onClose: () => void
  paymentMethod: PaymentMethod | null
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [cardholderName, setCardholderName] = useState("")
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [cardError, setCardError] = useState<string | null>(null)
  const [updateCard, setUpdateCard] = useState(false)

  useEffect(() => {
    if (paymentMethod) {
      setCardholderName(paymentMethod.cardholderName || "Jhon Carter ex.")
      setAgreeToTerms(true)
    }
  }, [paymentMethod])

  const handleCardChange = (event: any) => {
    if (event.error) {
      setCardError(event.error.message)
    } else {
      setCardError(null)
    }
  }

  const handleSave = async () => {
    if (!paymentMethod) return

    if (!agreeToTerms) {
      alert("Please agree to the terms of service")
      return
    }

    if (!cardholderName.trim()) {
      alert("Please enter the cardholder name")
      return
    }

    setIsProcessing(true)

    let updatedPaymentMethod = { ...paymentMethod, cardholderName }

    // If user wants to update the card details
    if (updateCard && stripe && elements) {
      const cardElement = elements.getElement(CardElement)
      if (cardElement) {
        // Create new payment method with Stripe
        const { error, paymentMethod: newStripePaymentMethod } = await stripe.createPaymentMethod({
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

        if (newStripePaymentMethod && newStripePaymentMethod.card) {
          const card = newStripePaymentMethod.card
          const cardType = card.brand as "visa" | "mastercard" | "amex"
          const lastFour = card.last4
          const maskedNumber = `****-****-****-${lastFour}`
          const expiryDate = `${card.exp_month.toString().padStart(2, "0")}/${card.exp_year.toString().slice(-2)}`

          updatedPaymentMethod = {
            ...updatedPaymentMethod,
            type: cardType,
            lastFour,
            fullNumber: maskedNumber,
            expiryDate,
            stripePaymentMethodId: newStripePaymentMethod.id,
          }
        }
      }
    }

    onSave(updatedPaymentMethod)
    handleClose()
    setIsProcessing(false)
  }

  const handleClose = () => {
    setCardholderName("")
    setAgreeToTerms(false)
    setCardError(null)
    setUpdateCard(false)
    onClose()
  }

  return (
    <div className="space-y-6">
      {/* Card Details */}
      <div>
        <Label className="text-sm font-medium mb-3 block">Card Details</Label>
        <div className="space-y-4">
          <div>
            <Input
              placeholder="Enter Name on Card"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              className="w-full border-gray-300 py-5"
            />
          </div>

          {/* Current Card Info */}
          <div className="px-3 py-2 rounded-md border border-gray-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
                  {paymentMethod?.type.toUpperCase()}
                </div>
                <span className="text-sm text-gray-600">{paymentMethod?.fullNumber}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setUpdateCard(!updateCard)} className="text-xs">
                {updateCard ? "Keep Current" : "Update Card"}
              </Button>
            </div>
          </div>

          {/* New Card Input (only show if updating) */}
          {updateCard && (
            <div className="space-y-2">
              <Label className="text-sm text-gray-600">Enter new card details:</Label>
              <div className="border border-gray-300 rounded-md p-3 bg-white">
                <CardElement options={cardElementOptions} onChange={handleCardChange} />
              </div>
              {cardError && <div className="text-red-500 text-sm">{cardError}</div>}
            </div>
          )}
        </div>
      </div>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2">
        <Checkbox
          id="terms-edit"
          checked={agreeToTerms}
          onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
        />
        <Label htmlFor="terms-edit" className="text-xs text-gray-600 leading-relaxed">
          By Clicking "Confirm Payment" I agree to the{" "}
          <a href="#" className="text-blue-600 underline">
            companies terms of services
          </a>
        </Label>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button variant="outline" onClick={handleClose} className="flex-1" disabled={isProcessing}>
          Discard
        </Button>
        <Button onClick={handleSave} className="flex-1 rounded-lg" variant="primary" disabled={isProcessing}>
          {isProcessing ? "Processing..." : "Save"}
        </Button>
      </div>
    </div>
  )
}

export function EditPaymentModal({ isOpen, onClose, onSave, paymentMethod }: EditPaymentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-none rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Details</DialogTitle>
        </DialogHeader>
        <Elements stripe={stripePromise}>
          <EditPaymentForm onSave={onSave} onClose={onClose} paymentMethod={paymentMethod} />
        </Elements>
      </DialogContent>
    </Dialog>
  )
}
