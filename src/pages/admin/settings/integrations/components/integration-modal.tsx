import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ProfileSetup from './profile-setup'
import PlatformSelection from './platform-selection'
import { useIntegrationStore } from '@/store/admin/integration-store'

export function IntegrationModal() {
  const { isOpen, step, closeModal } = useIntegrationStore()

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) closeModal()
      }}
    >
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl border-none py-3">
        <DialogHeader>
          <DialogTitle className="text-start text-lg text-[#11263C]">New Integration</DialogTitle>
        </DialogHeader>

        {step === "platform" ? <PlatformSelection /> : <ProfileSetup />}
      </DialogContent>
    </Dialog>
  )
}

export { useIntegrationStore }
