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
import { AlertTriangle } from "lucide-react"
import { IProductModel } from "../../core/_modals"

interface DeleteConfirmationModalProps {
  onConfirm: (product: IProductModel) => void
  onCancel: () => void
}

export function DeleteConfirmationModal({ onConfirm, onCancel }: DeleteConfirmationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProductModel | null>(null)

  useEffect(() => {
    const handleOpenModal = (e: CustomEvent) => {
      setProduct(e.detail)
      setIsOpen(true)
    }

    window.addEventListener("open-delete-modal", handleOpenModal as EventListener)

    return () => {
      window.removeEventListener("open-delete-modal", handleOpenModal as EventListener)
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
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Confirm Delete
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete product <span className="font-semibold">{product.sku}</span>? This action
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="destructive" className="text-red-400 border" onClick={handleConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
