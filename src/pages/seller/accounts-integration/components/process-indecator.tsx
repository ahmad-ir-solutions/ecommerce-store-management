type Step = "payment" | "platform" | "setup" | "edit-shop"

interface ProgressIndicatorProps {
  step: Step
  isNewUser: boolean
}

export const ProgressIndicator = ({ step, isNewUser }: ProgressIndicatorProps) => {
  const getStepNumber = () => {
    if (!isNewUser) {
      // For existing users, skip payment step
      switch (step) {
        case "platform":
          return 1
        case "setup":
          return 2
        case "edit-shop":
          return 3
        default:
          return 1
      }
    } else {
      // For new users, include payment step
      switch (step) {
        case "payment":
          return 1
        case "platform":
          return 2
        case "setup":
          return 3
        case "edit-shop":
          return 4
        default:
          return 1
      }
    }
  }

  const totalSteps = isNewUser ? 4 : 3
  const currentStepNumber = getStepNumber()

  if (step === "edit-shop") return null // Don't show progress on completion screen

  return (
    <div className="flex items-center justify-center mb-6">
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps - 1 }, (_, i) => i + 1).map((stepNum) => (
          <div key={stepNum} className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${stepNum <= currentStepNumber ? "bg-[#024AFE]" : "bg-gray-300"}`} />
            {stepNum < totalSteps - 1 && (
              <div className={`w-12 h-0.5 ${stepNum < currentStepNumber ? "bg-[#024AFE]" : "bg-gray-300"}`} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProgressIndicator
