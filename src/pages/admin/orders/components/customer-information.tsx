import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Address, OrderDetails } from "../core/_modals"
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"
import { EditAddressModal } from "./modal/edit-adress-modal"
import { Edit } from "lucide-react"

interface CustomerInformationProps {
  order: OrderDetails
  onUpdateBillingAddress: (data: Address) => Promise<OrderDetails>
  onUpdateShippingAddress: (data: Address) => Promise<OrderDetails>
}

export function CustomerInformation({
  order,
  onUpdateBillingAddress,
  onUpdateShippingAddress,
}: CustomerInformationProps) {
  const [isEditingBillingAddress, setIsEditingBillingAddress] = useState(false)
  const [isEditingShippingAddress, setIsEditingShippingAddress] = useState(false)
  const [isUpdatingBilling, setIsUpdatingBilling] = useState(false)
  const [isUpdatingShipping, setIsUpdatingShipping] = useState(false)

  const handleEditBillingAddress = () => {
    setIsEditingBillingAddress(true)
  }

  const handleEditShippingAddress = () => {
    setIsEditingShippingAddress(true)
  }

  const handleSaveAddress = async (type: "billing" | "shipping", data: Address) => {
    try {
      if (type === "billing") {
        setIsUpdatingBilling(true)
        await onUpdateBillingAddress(data)
        setIsEditingBillingAddress(false)
        showSuccessMessage("The billing address has been updated successfully")
      } else {
        setIsUpdatingShipping(true)
        await onUpdateShippingAddress(data)
        setIsEditingShippingAddress(false)
        showSuccessMessage("The shipping address has been updated successfully")
      }
    } catch (error) {
      showErrorMessage("There was an error updating the address. Please try again.")
    } finally {
      setIsUpdatingBilling(false)
      setIsUpdatingShipping(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden mb-4">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-4">Customer</h2>
          <div className="bg-[#ECF6FF] rounded-xl p-4">
            <div className="grid grid-cols-2 gap-y-1 mb-6">
              <div className="text-sm text-gray-500 p-2 pl-4">Customer</div>
              <div className="text-sm p-2">{order.customerName}</div>

              <div className="text-sm text-gray-500 p-2 pl-4">Phone</div>
              <div className="text-sm p-2">{order.billingAddress.phone}</div>

              <div className="text-sm text-gray-500 p-2 pl-4">Email</div>
              <div className="text-sm p-2">{order.emailAddress}</div>

              <div className="text-sm text-gray-500 p-2 pl-4">Email CC (comma-separated)</div>
              <div className="text-sm p-2">{order.channelOrderId}</div>
            </div>

            <div className="grid xl:grid-cols-2 gap-24">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Billing Address</h3>
                  <div className="flex items-center gap-3">
                    <h2>Edit</h2>
                    <Button 
                      type="button"
                      className="bg-blue-500 text-white w-7 h-7"
                      onClick={handleEditBillingAddress}
                      disabled={isUpdatingBilling}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-y-1">
                  <div className="border-b h-[2px] w-full border-gray-300"></div>
                  <div className="border-b h-[2px] w-full border-gray-300"></div>
                  <div className="text-sm text-gray-500 p-2 pl-4">Name</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.name}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">Company</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.company || "-"}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">Address 1</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.address1}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">Address 2</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.address2 || "-"}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">City</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.city}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">County</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.county}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">Postcode</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.postcode}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">Country</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.country}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4">Phone</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.billingAddress.phone}</div>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Shipping Address</h3>
                  <div className="flex items-center gap-3">
                    <h2>Edit</h2>
                    <Button 
                      type="button"
                      className="bg-blue-500 text-white w-7 h-7"
                      onClick={handleEditShippingAddress}
                      disabled={isUpdatingShipping}>
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-1 gap-y-1">
                  <div className="border-b h-[2px] w-full border-gray-300"></div>
                  <div className="border-b h-[2px] w-full border-gray-300 xl:hidden"></div>
                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Name</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.name}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Company</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.company || "-"}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Address 1</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.address1}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Address 2</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.address2 || "-"}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">City</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.city}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">County</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.county}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Postcode</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.postcode}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Country</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.country}</div>

                  <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Phone</div>
                  <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.phone}</div>
                </div>
              </div>
            </div>

            {/* Address Edit Modals */}
            {isEditingBillingAddress && (
              <EditAddressModal
                isOpen={isEditingBillingAddress}
                onClose={() => setIsEditingBillingAddress(false)}
                addressType="billing"
                initialData={order.billingAddress}
                onSave={(data) => handleSaveAddress("billing", data)}
                isSubmitting={isUpdatingBilling}
              />
            )}

            {isEditingShippingAddress && (
              <EditAddressModal
                isOpen={isEditingShippingAddress}
                onClose={() => setIsEditingShippingAddress(false)}
                addressType="shipping"
                initialData={order.shippingAddress}
                onSave={(data) => handleSaveAddress("shipping", data)}
                isSubmitting={isUpdatingShipping}
              />
            )}
          </div>
      </div>
    </div>
  )
}
