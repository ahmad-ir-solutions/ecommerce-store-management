import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import SelectPlatform from "../select-platform";
import SetupProfile from "../setup-profile";

export function IntegratePlatformModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState<"platform" | "profile">("platform");
  const [selectedPlatform, setSelectedPlatform] = useState<any>(null);

  const handleClose = () => {
    onClose();
    setStep("platform");
    setSelectedPlatform(null);
  };

  return (
    <Dialog open={open} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl border-none py-3">
        <DialogHeader>
          <DialogTitle className="text-start text-lg text-[#11263C]">New Integration</DialogTitle>
        </DialogHeader>

        {step === "platform" ? (
          <SelectPlatform
            setStep={setStep}
            setSelectedPlatform={setSelectedPlatform}
          />
        ) : (
          <SetupProfile
            selectedPlatform={selectedPlatform}
            closeModal={onClose}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
