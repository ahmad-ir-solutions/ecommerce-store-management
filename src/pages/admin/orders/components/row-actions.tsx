import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { InvoiceModal } from "./modal/invoice-modal";

interface RowActionsProps {
  orderId: string
  isVisible: boolean
}

export function RowActions({ orderId, isVisible }: RowActionsProps) {
  const navigate = useNavigate();
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false)

  const handleEdit = () => {
    navigate(`/admin/orders/edit-order/${orderId}`)
  }

  const handleView = () => {
    setIsInvoiceModalOpen(true)
  }

  // const handlePrint = () => {
  //   window.open(`/api/orders/${orderId}/print`, '_blank')
  // }

  // const handleRedownload = () => {
  //   window.open(`/api/orders/${orderId}/download`, '_blank')
  // }

  if (!isVisible) return null

  return (
    <div className="flex space-x-6 absolute left-0 right-0 bg-white shadow-md p-1 z-10 border border-gray-200 rounded">
      <button
        onClick={handleEdit}
        className="text-[#024AFE] hover:underline text-xs"
      >
        Edit
      </button>
      <button
        onClick={handleView}
        className="text-[#024AFE] hover:underline text-xs"
      >
        View
      </button>
      {/* <button
        onClick={handlePrint}
        className="text-[#024AFE] hover:underline text-xs"
      >
        Print
      </button>
      <button
        onClick={handleRedownload}
        className="text-[#024AFE] hover:underline text-xs"
      >
        Redownload
      </button> */}

      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        orderId={orderId}
      />
    </div>
  )
}
