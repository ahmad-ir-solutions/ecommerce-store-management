import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Address, IOrder } from "../core/_modals"
import { EditAddressModal } from "./modal/edit-adress-modal"
import { Edit } from "lucide-react"
import { useUpdateCustomer } from "@/pages/admin/customers/core/hooks/useCustomer"

interface CustomerInformationProps {
  order: IOrder
  refetch: () => void
}

export function CustomerInformation({
  order,
  refetch,
}: CustomerInformationProps) {
  const [isEditingBillingAddress, setIsEditingBillingAddress] = useState(false)
  const [isEditingShippingAddress, setIsEditingShippingAddress] = useState(false)

  // const { mutate: updateOrderMutation, isPending: isUpdating } = useUpdateOrder()
  const { mutate: updateCustomerMutation, isPending: isUpdatingCustomer } = useUpdateCustomer()
  const handleEditBillingAddress = () => {
    setIsEditingBillingAddress(true)  
  }
  const handleSaveAddress = async (type: "billing" | "shipping", data: Address) => {
    console.log(data, "handleSaveAddress");

      if (type === "billing") {
        updateCustomerMutation({
            id: order.customerDetails._id ?? "",
          data: {
            billingAddress: data,
          },
        })
        setIsEditingBillingAddress(false)
        refetch()
      } else {
        updateCustomerMutation({
          id: order.customerDetails._id ?? "",
          data: {
            shippingAddress: data,
          },
        })
        setIsEditingShippingAddress(false)
        refetch()
      }
  }
  // const name = `${order?.billingAddress.firstName} ${order?.billingAddress.firstName}`
  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-4">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Customer</h2>
        <div className="bg-[#ECF6FF] rounded-xl p-4">
          <div className="grid grid-cols-2 gap-y-1 mb-6">
            <div className="text-sm text-gray-500 p-2 pl-4">Customer</div>
            <div className="text-sm p-2"> {`${order.customerDetails.firstName} ${order.customerDetails.lastName}`}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Phone</div>
            <div className="text-sm p-2">{order.customerDetails.billingAddress.phone}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Email</div>
            <div className="text-sm p-2">{order.customerDetails.email}</div>

            <div className="text-sm text-gray-500 p-2 pl-4">Email CC (comma-separated)</div>
            <div className="text-sm p-2">{order.customerDetails.emailCC || "-"}</div>
          </div>

          <div className="grid xl:grid-cols-2 gap-24">
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Billing Address</h3>
                <div className="flex items-center gap-3">
                  <h2>Edit</h2>
                  <Button
                    type="button"
                    className="bg-[#024AFE] text-white w-7 h-7"
                    onClick={handleEditBillingAddress}
                    disabled={isUpdatingCustomer}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-y-1">
                <div className="border-b h-[2px] w-full border-gray-300"></div>
                <div className="border-b h-[2px] w-full border-gray-300"></div>
                <div className="text-sm text-gray-500 p-2 pl-4">Name</div>
                <div className="text-sm p-2 whitespace-nowrap">{`${order.customerDetails.billingAddress.firstName} ${order.customerDetails.billingAddress.lastName}`}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">Company</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.company || "-"}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">Address 1</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.addressLine1}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">Address 2</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.addressLine2 || "-"}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">City</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.city}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">Postcode</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.postalCode}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">Country</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.country}</div>

                <div className="text-sm text-gray-500 p-2 pl-4">Phone</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.billingAddress.phone}</div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Shipping Address</h3>
                <div className="flex items-center gap-3">
                  <h2>Edit</h2>
                  <Button
                    type="button"
                    className="bg-[#024AFE] text-white w-7 h-7"
                    onClick={() => setIsEditingShippingAddress(true)}
                    disabled={isUpdatingCustomer}>
                    <Edit className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-2 xl:grid-cols-1 gap-y-1">
                <div className="border-b h-[2px] w-full border-gray-300"></div>
                <div className="border-b h-[2px] w-full border-gray-300 xl:hidden"></div>
                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Name</div>
                <div className="text-sm p-2 whitespace-nowrap">{`${order?.customerDetails.shippingAddress?.firstName} ${order?.customerDetails.shippingAddress?.lastName}`}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Company</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.company || "-"}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Address 1</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.addressLine1}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Address 2</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.addressLine2 || "-"}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">City</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.city}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Postcode</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.postalCode}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Country</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.country}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Phone</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.customerDetails.shippingAddress?.phone}</div>
              </div>
            </div>
          </div>

          {/* Address Edit Modals */}
          {isEditingBillingAddress && (
            <EditAddressModal
              isOpen={isEditingBillingAddress}
              onClose={() => setIsEditingBillingAddress(false)}
              addressType="billing"
              initialData={order.customerDetails.billingAddress ?? {}}
              onSave={(data) => handleSaveAddress("billing", data)}
              isSubmitting={isUpdatingCustomer}
            />
          )}

          {isEditingShippingAddress && (
            <EditAddressModal
              isOpen={isEditingShippingAddress}
              onClose={() => setIsEditingShippingAddress(false)}
              addressType="shipping"
              initialData={order.customerDetails.shippingAddress ?? {}}
              onSave={(data) => handleSaveAddress("shipping", data)}
              isSubmitting={isUpdatingCustomer}
            />
          )}
        </div>
      </div>
    </div>
  )
}
