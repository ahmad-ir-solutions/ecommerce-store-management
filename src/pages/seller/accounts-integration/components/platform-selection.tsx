import { Button } from "@/components/ui/button"
import { ShoppingBag, ShoppingCart } from "lucide-react"

type Platform = "marketplace" | "webstore"

interface PlatformSelectionProps {
  selectedPlatform: Platform | null
  onPlatformChange: (platform: Platform) => void
  onNext: () => void
}

export const PlatformSelection = ({ selectedPlatform, onPlatformChange, onNext }: PlatformSelectionProps) => {
  const handleNext = () => {
    if (selectedPlatform) {
      onNext()
    }
  }

  return (
    <div>
      <h2 className="text-md text-[#717171] my-2">Select Platform</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`flex flex-col items-center justify-center p-6 border border-[#9999997A] rounded-2xl cursor-pointer hover:border-[#024AFE] transition-colors ${
            selectedPlatform === "marketplace" ? "border-[#024AFE] bg-blue-50" : ""
          }`}
          onClick={() => onPlatformChange("marketplace")}
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <div className="bg-orange-100 p-3 rounded-lg">
              <ShoppingBag className="h-8 w-8 text-orange-600" />
            </div>
          </div>
          <span className="font-bold whitespace-nowrap">Marketplace</span>
        </div>

        <div
          className={`flex flex-col items-center justify-center p-6 border border-[#9999997A] rounded-2xl cursor-pointer hover:border-[#024AFE] transition-colors ${
            selectedPlatform === "webstore" ? "border-[#024AFE] bg-blue-50" : ""
          }`}
          onClick={() => onPlatformChange("webstore")}
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <div className="bg-green-100 p-3 rounded-lg">
              <ShoppingCart className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <span className="font-bold whitespace-nowrap">Webstore</span>
        </div>
      </div>

      <Button className="w-full mb-4" variant="primary" onClick={handleNext} disabled={!selectedPlatform}>
        Next
      </Button>
    </div>
  )
}

export default PlatformSelection
