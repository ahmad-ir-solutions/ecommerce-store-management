import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { CreditCard } from "lucide-react"
import { useIntegrationStore } from '@/store/admin/integration-store'
import { Platform } from '../core/_schema'
import CourireTruck from "@/assets/images/courire-truck.svg"
import PaymentGateway from "@/assets/images/payment-gateway.svg"

export const PlatformSelection = () => {
  const { setSelectedPlatform, setStep } = useIntegrationStore()
  const [selected, setSelected] = useState<Platform | null>(null)

  const handleNext = () => {
    if (selected) {
      setSelectedPlatform(selected)
      setStep("profile")
    }
  }

  return (
    <div>
      <h2 className="text-md text-[#717171] my-2">Select Platform</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <div
          className={`flex flex-col items-center justify-center p-6 border border-[#9999997A] rounded-2xl cursor-pointer hover:border-[#024AFE] transition-colors ${selected === "courier" ? "border-[#024AFE] bg-blue-50" : ""}`}
          onClick={() => setSelected("courier")}
        >
          <div className="w-16 h-16 flex items-center justify-center mb-2">
            <div className="bg-orange-100 p-2 rounded-md">
              {/* <Truck className="h-8 w-8 text-orange-500" /> */}
                <img 
                    src={CourireTruck} 
                    alt="Courire Truck" 
                    className="w-full h-full object-contain"
                    style={{ 
                    imageRendering: 'crisp-edges',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                    }}
                />
            </div>
          </div>
          <span className="font-bold whitespace-nowrap">Courier</span>
        </div>

        <div
          className={`flex flex-col items-center justify-center p-6 border border-[#9999997A] rounded-2xl cursor-pointer hover:border-[#024AFE] transition-colors ${selected === "payment-gateway" ? "border-[#024AFE] bg-blue-50" : ""}`}
          onClick={() => setSelected("payment-gateway")}
        >
          <div className="w-16 h-18 flex items-center justify-center mb-2">
            <div className="bg-yellow-100 p-2 rounded-md">
                <img 
                    src={PaymentGateway} 
                    alt="Payment Gateway"
                    className="w-full h-full object-contain"
                    style={{
                    imageRendering: 'crisp-edges',
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden'
                    }}
                />
            </div>
          </div>
          <span className="font-bold whitespace-nowrap">Payment Gateway</span>
        </div>
      </div>

      <Button className="w-full mb-4" variant="primary" onClick={handleNext} disabled={!selected}>
        Next
      </Button>
    </div>
  )
}

export default PlatformSelection;