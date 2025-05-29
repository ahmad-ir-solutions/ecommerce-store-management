import { IOrder } from "../core/_modals"

interface OrderTotalsProps {
  order: IOrder
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
              <div className="text-sm">£ {order.unitSubtotal || "-"}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Shipping Costs</div>
              <div className="text-sm">£ {order.shippingAndHandling?.shippingCost || "-"}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Shipping Tax</div>
              <div className="text-sm">£ {order.taxRate || "-"}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Discount</div>
              <div className="text-sm">£ {order.discount || "-"}</div>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Lines Total Tax</div>
              <div className="text-sm">£ {order.taxTotal || "-"}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Total</div>
              <div className="text-sm">£ {order.totalPrice || "-"}</div>
            </div>

            <div className="grid grid-cols-2 gap-y-4">
              <div className="text-sm text-gray-500">Refunded Amount</div>
              {/* <div className="text-sm">£ {order.refundAmmount || "-"}</div> */}
              <div className="text-sm">-</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
