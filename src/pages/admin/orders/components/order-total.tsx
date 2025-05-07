import { OrderDetails } from "../core/_modals"

interface OrderTotalsProps {
  order: OrderDetails
}

export function OrderTotals({ order }: OrderTotalsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-none overflow-hidden">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">Order Totals</h2>

        <div className="grid grid-cols-2 gap-y-4">
          <div>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Subtotal</div>
              <div className="text-sm">£ {order.totals.subtotal.toFixed(2)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Shipping Costs</div>
              <div className="text-sm">£ {order.totals.shippingCosts.toFixed(2)}</div>
            </div>
            
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Shipping Tax</div>
              <div className="text-sm">£ {order.totals.shippingTax.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Discount</div>
              <div className="text-sm">£ {order.totals.discount.toFixed(2)}</div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Lines Total Tax</div>
              <div className="text-sm">£ {order.totals.lineItemsTax.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-sm">£ {order.totals.total.toFixed(2)}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Refunded Amount</div>
              <div className="text-sm">£ {order.totals.refundedAmount.toFixed(2)}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
