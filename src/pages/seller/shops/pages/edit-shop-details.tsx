import { Button } from "@/components/ui/button"
import { Store } from "lucide-react"

type Platform = "marketplace" | "webstore"

interface SetupData {
  integrationType: string
  location: string
  profileName: string
  grantPermission: boolean
}

interface EditShopScreenProps {
  selectedPlatform: Platform | null
  setupData: SetupData
  onComplete: () => void
}

export const EditShopDetails = ({ selectedPlatform, setupData, onComplete }: EditShopScreenProps) => {
  const handleComplete = () => {
    console.log("Integration completed:", { selectedPlatform, setupData })
    onComplete()
  }

  return (
    <div className="space-y-6 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Store className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Setup Complete!</h3>
        <p className="text-[#4E5967] mb-6">Your {selectedPlatform} integration has been configured successfully.</p>
      </div>

      <div className="bg-[#ECF6FF] rounded-lg p-4 space-y-2 text-left">
        <div className="flex justify-between">
          <span className="text-sm text-[#4E5967]">Platform:</span>
          <span className="text-sm font-medium capitalize">{selectedPlatform}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-[#4E5967]">Integration:</span>
          <span className="text-sm font-medium capitalize">{setupData.integrationType}</span>
        </div>
        {setupData.location && (
          <div className="flex justify-between">
            <span className="text-sm text-[#4E5967]">Location:</span>
            <span className="text-sm font-medium">{setupData.location}</span>
          </div>
        )}
        {setupData.profileName && (
          <div className="flex justify-between">
            <span className="text-sm text-[#4E5967]">Profile:</span>
            <span className="text-sm font-medium">{setupData.profileName}</span>
          </div>
        )}
      </div>

      <Button onClick={handleComplete} className="w-full" variant="primary">
        Continue to Dashboard
      </Button>
    </div>
  )
}

export default EditShopDetails;
