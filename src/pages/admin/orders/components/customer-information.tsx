import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Address, IOrder } from "../core/_modals"
import { showErrorMessage, showSuccessMessage } from "@/lib/utils/messageUtils"
import { EditAddressModal } from "./modal/edit-adress-modal"
import { Edit } from "lucide-react"

interface CustomerInformationProps {
  order: IOrder
}

export function CustomerInformation({
  order,
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
    console.log(data, "handleSaveAddress");

    try {
      if (type === "billing") {
        setIsUpdatingBilling(true)
        // await onUpdateBillingAddress(data)
        setIsEditingBillingAddress(false)
        showSuccessMessage("The billing address has been updated successfully")
      } else {
        setIsUpdatingShipping(true)
        // await onUpdateShippingAddress(data)
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
            <div className="text-sm p-2">{order.channelOrderNumber}</div>
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
                <div className="text-sm p-2 whitespace-nowrap">{`${order.customerDetails.billingAddress.firstName} ${order.customerDetails.billingAddress.firstName}`}</div>

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
                <div className="text-sm p-2 whitespace-nowrap">{`${order?.shippingAddress.firstName} ${order?.shippingAddress.firstName}`}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Company</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.company || "-"}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Address 1</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.addressLine1}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Address 2</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.addressLine2 || "-"}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">City</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.city}</div>

                <div className="text-sm text-gray-500 p-2 pl-4 xl:hidden">Postcode</div>
                <div className="text-sm p-2 whitespace-nowrap">{order.shippingAddress.postalCode}</div>

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
              initialData={order.customerDetails.billingAddress}
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
