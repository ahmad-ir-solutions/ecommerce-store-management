"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download, Printer, X, ChevronLeft, ChevronRight, Minus, Plus, RotateCw } from 'lucide-react'

interface InvoiceModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

export function InvoiceModal({ isOpen, onClose, orderId }: InvoiceModalProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 2

  const handlePrint = () => {
    window.print()
  }

  const handleDownload = () => {
    // In a real implementation, this would download the invoice PDF
    console.log(`Downloading invoice for order ${orderId}`)
    // Example implementation:
    // window.open(`/api/orders/${orderId}/invoice/download`, '_blank')
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] p-0">
        <DialogHeader className="p-4 border-b flex flex-row items-center justify-between">
          <DialogTitle>Invoice</DialogTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>
        <div className="p-0">
          <div className="flex items-center justify-between bg-gray-800 text-white p-2">
            <div className="flex items-center space-x-2">
              <span>
                {currentPage} / {totalPages}
              </span>
              <Button variant="ghost" size="icon" className="text-white" onClick={handlePrevPage} disabled={currentPage === 1}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white" onClick={handleNextPage} disabled={currentPage === totalPages}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="text-white">
                <Minus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Plus className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <RotateCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white" onClick={handleDownload}>
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-4 flex justify-center">
            {currentPage === 1 ? (
              <div className="border p-6 w-full max-w-[600px] bg-white">
                <div className="flex justify-between mb-6">
                  <div>
                    <h3 className="font-bold">Designers Collection</h3>
                    <p className="text-sm">Invoice #: {orderId}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center justify-end mb-2">
                      <div className="border border-black p-1 mr-2">
                        <div className="font-bold text-xs">Order #{orderId}</div>
                        <div className="text-xs">Channel Ref: #12345678</div>
                      </div>
                      <div className="border border-black p-1 w-24 h-16 flex items-center justify-center">
                        Barcode
                      </div>
                    </div>
                    <p className="text-sm">Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Shipping Address:</h4>
                  <p className="text-sm">Customer Name</p>
                  <p className="text-sm">123 Street Name</p>
                  <p className="text-sm">City, Country</p>
                  <p className="text-sm">Postcode</p>
                </div>
                <div className="mb-6">
                  <h4 className="font-bold mb-2">Order Details:</h4>
                  <div className="text-sm">
                    <p>Shipping Method: Tracked 24</p>
                    <p>Payment Method: Credit Card</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="border p-6 w-full max-w-[600px] bg-white">
                <h3 className="font-bold mb-4">Order Items</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Item</th>
                      <th className="text-right py-2">Qty</th>
                      <th className="text-right py-2">Price</th>
                      <th className="text-right py-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="py-2">Product Name</td>
                      <td className="text-right py-2">1</td>
                      <td className="text-right py-2">£12.99</td>
                      <td className="text-right py-2">£12.99</td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={3} className="text-right py-2 font-bold">Subtotal:</td>
                      <td className="text-right py-2">£12.99</td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={3} className="text-right py-2">Shipping:</td>
                      <td className="text-right py-2">£4.99</td>
                    </tr>
                    <tr className="border-b">
                      <td colSpan={3} className="text-right py-2">Tax:</td>
                      <td className="text-right py-2">£3.60</td>
                    </tr>
                    <tr>
                      <td colSpan={3} className="text-right py-2 font-bold">Total:</td>
                      <td className="text-right py-2 font-bold">£21.58</td>
                    </tr>
                  </tbody>
                </table>
                <div className="mt-6 text-center text-sm">
                  <p>Thank you for your order!</p>
                  <p>For any questions, please contact support@example.com</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
