import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import EditShopDetails from "../../shops/pages/edit-marketplace-details"
import PaymentStep from "./payment-step"
import PlatformSelection from "./platform-selection"
import SetupConfiguration from "./setup-configuration"
import ProgressIndicator from "./process-indecator"
import StripeProvider from "@/lib/stripe/stripe-provider"

export type Step = "payment" | "platform" | "setup" | "edit-shop"
export type Platform = "marketplace" | "webstore"
export type PaymentMethod = "card" | "paypal"

interface PaymentData {
  cardName: string
  cardNumber: string
  expiration: string
  cvv: string
  agreeToTerms: boolean
}

interface SetupData {
  integrationType: string
  location: string
  profileName: string
  grantPermission: boolean
}

interface OnboardingStepperProps {
  isOpen: boolean
  isNewUser: boolean
  onClose: () => void
  onComplete?: (data: { platform: Platform; setupData: SetupData; paymentData?: PaymentData }) => void
}

const initialPaymentData: PaymentData = {
  cardName: "",
  cardNumber: "",
  expiration: "",
  cvv: "",
  agreeToTerms: false,
}

const initialSetupData: SetupData = {
  integrationType: "",
  location: "",
  profileName: "",
  grantPermission: false,
}

// Use your Stripe test publishable key

export function OnboardingStepper({ isOpen, isNewUser, onClose, onComplete }: OnboardingStepperProps) {
  const [step, setStep] = useState<Step>(isNewUser ? "payment" : "platform")
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>("card")
  const [paymentData, setPaymentData] = useState<PaymentData>(initialPaymentData)
  const [setupData, setSetupData] = useState<SetupData>(initialSetupData)

  const handleClose = () => {
    // Reset state when closing
    setStep(isNewUser ? "payment" : "platform")
    setSelectedPlatform(null)
    setSelectedPaymentMethod("card")
    setPaymentData(initialPaymentData)
    setSetupData(initialSetupData)
    onClose()
  }

  // const handleComplete = () => {
  //   if (onComplete && selectedPlatform) {
  //     onComplete({
  //       platform: selectedPlatform,
  //       setupData,
  //       paymentData: isNewUser ? paymentData : undefined,
  //     })
  //   }
  //   handleClose()
  // }

  const getTitle = () => {
    switch (step) {
      case "payment":
        return "Add Payment Method"
      case "platform":
        return "Integrate your shop"
      case "setup":
        return "Integrate your shop"
      case "edit-shop":
        return "Integration Complete"
      default:
        return "New Integration"
    }
  }

  const renderStep = () => {
    switch (step) {
      case "payment":
        return (
            <StripeProvider>
                <PaymentStep
                 selectedPaymentMethod={selectedPaymentMethod}
                 onPaymentMethodChange={setSelectedPaymentMethod}
                 onNext={() => setStep("platform")}
               />
            </StripeProvider>
        )
      case "platform":
        return (
          <PlatformSelection
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            onNext={() => setStep("setup")}
          />
        )
      case "setup":
        return (
          <SetupConfiguration
            selectedPlatform={selectedPlatform}
            setupData={setupData}
            onSetupDataChange={(data) => setSetupData({ ...setupData, ...data })}
            onNext={() => setStep("edit-shop")}
          />
        )
      // case "edit-shop":
      //   return <EditShopDetails selectedPlatform={selectedPlatform} setupData={setupData} onComplete={handleComplete} />
      default:
        return (
          <PlatformSelection
            selectedPlatform={selectedPlatform}
            onPlatformChange={setSelectedPlatform}
            onNext={() => setStep("setup")}
          />
        )
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl border-none py-3">
        <DialogHeader>
          <DialogTitle className="text-start text-lg text-[#11263C]">{getTitle()}</DialogTitle>
        </DialogHeader>

        <ProgressIndicator step={step} isNewUser={isNewUser} />
        {renderStep()}
      </DialogContent>
    </Dialog>
  )
}

export default OnboardingStepper
