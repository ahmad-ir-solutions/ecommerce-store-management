import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Archive } from "lucide-react"
import { IProductModel } from "../../core/_modals"

interface ArchiveConfirmationModalProps {
  onConfirm: (product: IProductModel) => void
  onCancel: () => void
}

export function ArchiveConfirmationModal({ onConfirm, onCancel }: ArchiveConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProductModel | null>(null)

  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      setProduct(e.detail)
      setIsOpen(true)
    }

    window.addEventListener("open-archive-modal", handleOpenModal as EventListener)

    return () => {
      window.removeEventListener("open-archive-modal", handleOpenModal as EventListener)
    }
  }, [])

  const handleConfirm = () => {
    if (product) {
      onConfirm(product)
    }
    setIsOpen(false)
  }

  const handleCancel = () => {
    onCancel()
    setIsOpen(false)
  }

  if (!product) return null

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Archive className="h-5 w-5 text-amber-500" />
            Confirm Archive
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to archive product <span className="font-semibold">{product.sku}</span>? Archived
            products will not be visible in the main inventory but can be restored later.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="default" className="bg-amber-500 hover:bg-amber-600 text-white" onClick={handleConfirm}>
            Archive
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
