import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { create } from "zustand"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Truck, CreditCard } from "lucide-react"

// Define the platform types
type Platform = "courier" | "payment-gateway"

// Define the integration store
interface IntegrationState {
  isOpen: boolean
  step: "platform" | "profile"
  selectedPlatform: Platform | null
  openModal: () => void
  closeModal: () => void
  setStep: (step: "platform" | "profile") => void
  setSelectedPlatform: (platform: Platform) => void
}

// Create the Zustand store
const useIntegrationStore = create<IntegrationState>((set) => ({
  isOpen: false,
  step: "platform",
  selectedPlatform: null,
  openModal: () => set({ isOpen: true, step: "platform", selectedPlatform: null }),
  closeModal: () => set({ isOpen: false }),
  setStep: (step) => set({ step }),
  setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
}))

// Validation schema for profile form
const profileSchema = z.object({
  integrationType: z.string().min(1, "Integration type is required"),
  location: z.string().min(1, "Location is required"),
  grantPermission: z.boolean(),
})

type ProfileFormValues = z.infer<typeof profileSchema>

// Platform selection component
const PlatformSelection = () => {
  const { setSelectedPlatform, setStep } = useIntegrationStore()
  const [selected, setSelected] = useState<Platform | null>(null)

  const handleNext = () => {
    if (selected) {
      setSelectedPlatform(selected)
      setStep("profile")
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Select Platform</h2>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${selected === "courier" ? "border-blue-500 bg-blue-50" : ""}`}
          onClick={() => setSelected("courier")}
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <div className="bg-orange-100 p-2 rounded-md">
              <Truck className="h-8 w-8 text-orange-500" />
            </div>
          </div>
          <span className="font-medium">Courier</span>
        </div>

        <div
          className={`flex flex-col items-center justify-center p-6 border rounded-lg cursor-pointer hover:border-blue-500 transition-colors ${selected === "payment-gateway" ? "border-blue-500 bg-blue-50" : ""}`}
          onClick={() => setSelected("payment-gateway")}
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <div className="bg-yellow-100 p-2 rounded-md">
              <CreditCard className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          <span className="font-medium">Payment Gateway</span>
        </div>
      </div>

      <Button className="w-full" onClick={handleNext} disabled={!selected}>
        Next
      </Button>
    </div>
  )
}

// Profile setup component
const ProfileSetup = () => {
  const { selectedPlatform, closeModal } = useIntegrationStore()

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      integrationType: "",
      location: "",
      grantPermission: false,
    },
  })

  const onSubmit = (data: ProfileFormValues) => {
    console.log("Form submitted:", { platform: selectedPlatform, ...data })
    // Here you would typically send this data to your API
    closeModal()
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Setup Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="integrationType">Integration Type</Label>
          <Select
            onValueChange={(value) => {
              // This is a workaround since react-hook-form doesn't directly support shadcn/ui Select
              const event = {
                target: {
                  name: "integrationType",
                  value,
                },
              }
              register("integrationType").onChange(event as any)
            }}
            defaultValue=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Select integration type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amazone">Amazone</SelectItem>
              <SelectItem value="shopify">Shopify</SelectItem>
              <SelectItem value="woocommerce">WooCommerce</SelectItem>
            </SelectContent>
          </Select>
          {errors.integrationType && <p className="text-sm text-red-500">{errors.integrationType.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Select
            onValueChange={(value) => {
              const event = {
                target: {
                  name: "location",
                  value,
                },
              }
              register("location").onChange(event as any)
            }}
            defaultValue=""
          >
            <SelectTrigger>
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="amazone-australia">Amazone (Australia)</SelectItem>
              <SelectItem value="amazone-us">Amazone (US)</SelectItem>
              <SelectItem value="amazone-uk">Amazone (UK)</SelectItem>
            </SelectContent>
          </Select>
          {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="grantPermission">Grant permission to all users</Label>
          <Switch id="grantPermission" {...register("grantPermission")} />
        </div>

        <Button type="submit" className="w-full">
          Integrate
        </Button>
      </form>
    </div>
  )
}

// Main modal component
export function IntegrationModal() {
  const { isOpen, step, closeModal } = useIntegrationStore()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal()
      }}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">New Integration</DialogTitle>
        </DialogHeader>

        {step === "platform" ? <PlatformSelection /> : <ProfileSetup />}
      </DialogContent>
    </Dialog>
  )
}

// Export the store for external use
export { useIntegrationStore }
