import { useQuery } from "@tanstack/react-query"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Printer, Download } from "lucide-react"
import { fetchOrderDetails } from "../../core/_dummy"

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

export function InvoiceModal({ isOpen, onClose, orderId }: InvoiceModalProps) {
  const { data: order, isLoading } = useQuery({
    queryKey: ["order-invoice", orderId],
    queryFn: () => fetchOrderDetails(orderId),
    enabled: isOpen && !!orderId,
  })

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real app, this would generate a PDF and download it
    alert("Invoice downloaded")
  }

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Loading invoice...</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  if (!order) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>Error loading invoice</DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Invoice #{order.orderId}</DialogTitle>
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
              <p className="text-sm text-gray-500">Invoice #: {order.orderId}</p>
              <p className="text-sm text-gray-500">Date: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="text-right">
              <h3 className="font-bold">Your Company Name</h3>
              <p className="text-sm">123 Business Street</p>
              <p className="text-sm">City, Country, Postcode</p>
              <p className="text-sm">VAT: GB123456789</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-semibold mb-2">Bill To:</h4>
              <p>{order.billingAddress.name}</p>
              {order.billingAddress.company && <p>{order.billingAddress.company}</p>}
              <p>{order.billingAddress.address1}</p>
              {order.billingAddress.address2 && <p>{order.billingAddress.address2}</p>}
              <p>
                {order.billingAddress.city}, {order.billingAddress.county}
              </p>
              <p>{order.billingAddress.postcode}</p>
              <p>{order.billingAddress.country}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Ship To:</h4>
              <p>{order.shippingAddress.name}</p>
              {order.shippingAddress.company && <p>{order.shippingAddress.company}</p>}
              <p>{order.shippingAddress.address1}</p>
              {order.shippingAddress.address2 && <p>{order.shippingAddress.address2}</p>}
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.county}
              </p>
              <p>{order.shippingAddress.postcode}</p>
              <p>{order.shippingAddress.country}</p>
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
              {order.items.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="py-2">{item.name}</td>
                  <td className="text-right py-2">{item.quantity}</td>
                  <td className="text-right py-2">£{item.unitSubtotal.toFixed(2)}</td>
                  <td className="text-right py-2">£{(item.unitSubtotal * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64">
              <div className="flex justify-between py-1">
                <span>Subtotal:</span>
                <span>£{order.totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Shipping:</span>
                <span>£{order.totals.shippingCosts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Tax:</span>
                <span>£{order.totals.lineItemsTax.toFixed(2)}</span>
              </div>
              {order.totals.discount > 0 && (
                <div className="flex justify-between py-1">
                  <span>Discount:</span>
                  <span>-£{order.totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between py-1 font-bold border-t mt-2 pt-2">
                <span>Total:</span>
                <span>£{order.totals.total.toFixed(2)}</span>
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
