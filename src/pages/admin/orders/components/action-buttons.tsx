import { useState } from "react"
import { ChevronDown, FileText, Printer, Trash2, Copy, FileCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { showSuccessMessage } from "@/lib/utils/messageUtils"
import { InvoiceModal } from "./modal/invoice-modal"

interface ActionButtonsProps {
  orderId: string
  onClone: () => void
  onCancel: () => void
  isCloning?: boolean
  isCancelling?: boolean
}

export function ActionButtons({
  orderId,
  onClone,
  onCancel,
  isCloning = false,
  isCancelling = false,
}: ActionButtonsProps) {
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)

  const handleCloneOrder = () => {
    onClone()
    showSuccessMessage("A new order has been created based on this one")
  }

  const handleReprintInvoice = () => {
    setIsInvoiceModalOpen(true)
  }

  const handleReprintLabel = () => {
    window.open(`/api/orders/${orderId}/label/print`, "_blank")
    showSuccessMessage("The shipping label is being sent to your printer")
  }

  const handleCancelOrder = () => {
    onCancel()
    showSuccessMessage("The order has been cancelled successfully")
    }

  return (
    <div className="flex justify-end space-x-2 items-center">
      <Button
        type="button"
        variant="filter"
        className="rounded-lg xl:flex items-center gap-1 hidden"
        onClick={handleCloneOrder}
        disabled={isCloning}
      >
        <Copy className="h-4 w-4 mr-1" />
        {isCloning ? "Cloning..." : "Clone Order"}
      </Button>
      <Button
        type="button"
        variant="filter"
        className="rounded-lg xl:flex items-center gap-1 hidden"
        onClick={handleReprintInvoice}
      >
        <FileText className="h-4 w-4 mr-1" />
        Reprint Invoice
      </Button>
      <Button
        type="button"
        variant="filter"
        className="rounded-lg xl:flex items-center gap-1 hidden"
        onClick={handleReprintLabel}
      >
        <Printer className="h-4 w-4 mr-1" />
        Reprint Label
      </Button>
      <Button
        type="button"
        variant="filter"
        className="rounded-lg xl:flex items-center gap-1 hidden"
        onClick={handleCancelOrder}
        disabled={isCancelling}
      >
        {isCancelling ? "Cancelling..." : "Cancel Order"}
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type="button" variant="filter" className="rounded-lg flex items-center gap-1">
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuItem onClick={handleCloneOrder} disabled={isCloning}>
            <Copy className="h-4 w-4 mr-2" />
            Clone Order
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReprintInvoice}>
            <FileText className="h-4 w-4 mr-2" />
            Reprint Invoice
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleReprintLabel}>
            <Printer className="h-4 w-4 mr-2" />
            Reprint Label
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCancelOrder} className="text-red-600" disabled={isCancelling}>
            <Trash2 className="h-4 w-4 mr-2" />
            Cancel Order
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button  variant="primary" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
        <Trash2 className="h-4 w-4"/>
        </Button>
        <Button  variant="primary" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
        <FileCheck  className="h-4 w-4"/>
        </Button>
      <InvoiceModal isOpen={isInvoiceModalOpen} onClose={() => setIsInvoiceModalOpen(false)} orderId={orderId} />
    </div>
  )
}
