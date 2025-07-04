import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Printer, Download, Loader2 } from "lucide-react"
import { useGetOrder } from '../../core/hooks/use-orders'

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

export function InvoiceModal({ isOpen, onClose, orderId }: InvoiceModalProps) {
  const {
    data: order,
    isLoading,
    // isError,
    // error,
  } = useGetOrder(orderId || "")

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF and download it
    alert("Invoice downloaded")
  }

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-64">
  //       <Loader2 className="h-8 w-8 animate-spin" />
  //     </div>
  //   )
  // }
  console.log(orderId, "orderId");


  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[800px] bg-white">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  if (!order) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent className="sm:max-w-[800px] bg-white">
          <DialogHeader>
            <DialogTitle>Error loading invoice</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  console.log(order, "orderderderderder");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="sm:max-w-[800px] bg-white">
        <DialogHeader>
          <DialogTitle>Invoice #{order._id}</DialogTitle>
          <div className="flex justify-end space-x-2 mt-2">
            <Button onClick={handlePrint} variant="outline" size="sm">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button onClick={handleDownload} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </DialogHeader>
        <div className="p-6 border rounded-lg">
          <div className="flex justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg">INVOICE</h3>
              <p className="text-sm text-gray-500">Invoice #: {order._id}</p>
              <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold">{order.customerDetails.billingAddress.company}</h3>
              <p className="text-sm">123 </p>
              <p className="text-sm">{`${order.shippingAddress?.city}, ${order.shippingAddress?.country}, ${order.shippingAddress?.postalCode}`}</p>
              <p className="text-sm">VAT: GB123456789</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-2">Bill To:</h4>
              <p>{`${order.customerDetails.billingAddress.firstName} ${order.customerDetails.billingAddress.lastName}`}</p>
              {order.customerDetails.billingAddress.company && <p>{order.customerDetails.billingAddress.company}</p>}
              <p>{order.customerDetails.billingAddress.addressLine1}</p>
              {order.customerDetails.billingAddress.addressLine2 && <p>{order.customerDetails.billingAddress.addressLine2}</p>}
              <p>
                {order.customerDetails.billingAddress.city}, {order.customerDetails.billingAddress.country}
              </p>
              <p>{order.customerDetails.billingAddress.postalCode}</p>
              <p>{order.customerDetails.billingAddress.country}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Ship To:</h4>
              <p>{`${order.customerDetails.shippingAddress?.firstName || "-"} ${order.customerDetails.shippingAddress?.lastName || "-"}`}</p>
              {order.customerDetails.shippingAddress?.company && <p>{order.customerDetails.shippingAddress?.company}</p>}
              <p>{order.customerDetails.shippingAddress?.addressLine1}</p>
              {order.customerDetails.shippingAddress?.addressLine2 && <p>{order.customerDetails.shippingAddress?.addressLine2}</p>}
              <p>{order.customerDetails.shippingAddress?.postalCode}</p>
              <p>{order.customerDetails.shippingAddress?.country}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Item</th>
                <th className="text-right py-2">Quantity</th>
                <th className="text-right py-2">Unit Price</th>
                <th className="text-right py-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {/* {order.map((item, index) => ( */}
              <tr className="border-b">
                <td className="py-2">{order.productDetails.productName}</td>
                <td className="text-right py-2">{order.quantity}</td>
                <td className="text-right py-2">£{order.unitSubtotal}</td>
                <td className="text-right py-2">£{(order.unitSubtotal * order.quantity).toFixed(2)}</td>
              </tr>
              {/* ))} */}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Subtotal:</span>
                <span>£{order.unitSubtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping:</span>
                <span>£{order?.shippingAndHandling?.shippingCost || "-"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax:</span>
                <span>£{order.taxTotal || "-"}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between py-1">
                  <span>Discount:</span>
                  <span>-£{order.discount}</span>
                </div>
              )}
              <div className="flex justify-between py-1 font-bold border-t mt-2 pt-2">
                <span>Total:</span>
                <span>£{order.totalPrice}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t">
            <p className="text-sm text-gray-500">Thank you for your business!</p>
            <p className="text-sm text-gray-500">Payment terms: 30 days</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
