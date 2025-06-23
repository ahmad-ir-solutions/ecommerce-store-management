import type React from "react"

import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

// Replace with your actual Stripe publishable key
export const stripePromise = loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "pk_test_51N6c4DGFwMfBeP3SgDIkFSkQfMoZkI1doBwWMT4zA9HtFtPbub34itE9VuFaQUVzE6bwLpP0u0P2WmP83D6DAgZK00FeQpyx9R"
  );
interface StripeProviderProps {
  children: React.ReactNode
}

export function StripeProvider({ children }: StripeProviderProps) {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        appearance: {
          theme: "flat",
          variables: {
            colorPrimary: "#024AFE",
            colorBackground: "#ffffff",
            colorText: "#424770",
            colorDanger: "#df1b41",
            fontFamily: "system-ui, sans-serif",
            spacingUnit: "4px",
            borderRadius: "8px",
          },
          rules: {
            ".Input": {
              border: "none",
              borderBottom: "1px solid #e1e5e9",
              borderRadius: "0",
              padding: "12px 0",
              backgroundColor: "transparent",
              fontSize: "16px",
            },
            ".Input:focus": {
              borderBottom: "2px solid #024AFE",
              outline: "none",
            },
            ".Input--invalid": {
              borderBottom: "1px solid #df1b41",
            },
          },
        },
      }}
    >
      {children}
    </Elements>
  )
}

export default StripeProvider
