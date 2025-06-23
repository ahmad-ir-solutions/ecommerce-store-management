import { useState } from "react";
import { useStripe, useElements, CardNumberElement, CardExpiryElement, CardCvcElement } from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CreditCard } from "lucide-react";

type PaymentMethod = "card" | "paypal";

interface PaymentStepProps {
  selectedPaymentMethod: PaymentMethod;
  onPaymentMethodChange: (method: PaymentMethod) => void;
  onNext: () => void;
}

export const PaymentStep = ({
  selectedPaymentMethod,
  onPaymentMethodChange,
  onNext,
}: PaymentStepProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardholderName, setCardholderName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePaymentNext = async () => {
    setError(null);
    if (!agreeToTerms) {
      setError("You must agree to the terms of service");
      return;
    }

    if (selectedPaymentMethod === "paypal") {
      alert("PayPal is not implemented in this demo.");
      onNext();
      return;
    }

    if (!stripe || !elements) {
      setError("Stripe has not loaded yet");
      return;
    }

    const cardNumberElement = elements.getElement(CardNumberElement);
    if (!cardNumberElement) {
      setError("Card element not found");
      return;
    }

    setIsProcessing(true);

    // Create a PaymentMethod (test only, no backend)
    const { error: stripeError, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardNumberElement,
      billing_details: {
        name: cardholderName,
      },
    });

    if (stripeError) {
      setError(stripeError.message || "Payment failed");
      setIsProcessing(false);
      return;
    }

    // For demo: just log the payment method
    console.log("Stripe PaymentMethod:", paymentMethod);
    alert("Stripe PaymentMethod created! Check console for details.");

    setIsProcessing(false);
    onNext();
  };

  const elementOptions = {
    style: {
      base: {
        fontSize: "16px",
        color: "#424770",
        fontFamily: "system-ui, sans-serif",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#df1b41",
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-4 text-gray-700">Payment Method</h3>
        <RadioGroup
          value={selectedPaymentMethod}
          onValueChange={(value) => onPaymentMethodChange(value as PaymentMethod)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="card" id="card" />
            <Label htmlFor="card" className="flex items-center space-x-2 cursor-pointer">
              <CreditCard className="w-4 h-4" />
              <span>Card</span>
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="paypal" id="paypal" />
            <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer">
              <div className="w-4 h-4 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                P
              </div>
              <span>PayPal</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {selectedPaymentMethod === "card" && (
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Name on Card"
            value={cardholderName}
            onChange={(e) => setCardholderName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2"
          />
          <div className="grid grid-cols-1 gap-4">
            <CardNumberElement options={elementOptions} className="p-2 border rounded" />
            <div className="grid grid-cols-2 gap-4">
              <CardExpiryElement options={elementOptions} className="p-2 border rounded" />
              <CardCvcElement options={elementOptions} className="p-2 border rounded" />
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start space-x-2">
        <input
          type="checkbox"
          id="terms"
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e.target.checked)}
          className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <Label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer leading-relaxed">
          By clicking "Confirm Payment" I agree to the{" "}
          <a href="#" className="text-blue-600 underline hover:text-blue-800">
            companies terms of services
          </a>
        </Label>
      </div>

      {error && (
        <div className="text-sm text-red-600">{error}</div>
      )}

      <Button
        onClick={handlePaymentNext}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium"
        disabled={!agreeToTerms || isProcessing}
      >
        {isProcessing ? "Processing..." : "Next"}
      </Button>
    </div>
  );
};

export default PaymentStep;
