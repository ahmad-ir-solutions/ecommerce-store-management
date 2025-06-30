import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2, CreditCard, Landmark } from "lucide-react"
import { useState } from "react"
import { AddPaymentModal } from "./modal/add-payment-modal"
// import { EditPaymentModal } from "./modal/edit-payment-modal"
import { useDeleteCard, useGetSavedCards, useSetDefaultCard } from "../core/hooks/useStripe"

interface PaymentMethod {
  id: string
  brand: string
  last4: string
  exp_month: number
  exp_year: number
  cardholder_name?: string
  isDefault?: boolean
  stripePaymentMethodId?: string
}

export function PaymentMethod() {
  const { data: paymentMethods = [], isLoading, refetch } = useGetSavedCards()
  const { mutate: deleteCard } = useDeleteCard()
  const { mutate: setDefaultCard } = useSetDefaultCard();

  const [showAddModal, setShowAddModal] = useState(false)
  // const [showEditModal, setShowEditModal] = useState(false)
  // const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null)

  const handleAddPaymentMethod = () => setShowAddModal(true)

  // const handleEditPaymentMethod = (methodId: string) => {
  //   const method = paymentMethods.find((m) => m.id === methodId)
  //   if (method) {
  //     setEditingPaymentMethod(method)
  //     setShowEditModal(true)
  //   }
  // }

  const handleDeletePaymentMethod = (methodId: string) => {
    deleteCard({ paymentMethodId: methodId })
  }

  const handleSetDefaultCard = (method: PaymentMethod) => {
    if (!method.isDefault && method.id) {
      console.log(method.id, "method.id")
      setDefaultCard({ paymentMethodId: method.id });
    }
  };

  const handleAddPaymentMethodSubmit = () => {
    // Refetch the saved cards after adding a new one
    refetch()
    setShowAddModal(false)
  }

  // const handleEditPaymentMethodSubmit = (updatedMethod: PaymentMethod) => {
  //   // You should call useUpdateStripeMethod (if applicable) and refetch
  //   refetch()
  //   setShowEditModal(false)
  //   setEditingPaymentMethod(null)
  // }

  const getCardIcon = (brand: string) => {
    switch (brand?.toLowerCase()) {
      case "visa":
        return (
          <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
            VISA
          </div>
        )
      case "mastercard":
        return (
          <div className="w-10 h-6 bg-red-600 rounded text-white text-xs font-bold flex items-center justify-center">
            MC
          </div>
        )
      case "amex":
        return (
          <div className="w-10 h-6 bg-green-600 rounded text-white text-xs font-bold flex items-center justify-center">
            AMEX
          </div>
        )
      default:
        return <CreditCard className="w-5 h-5 text-gray-400" />
    }
  }

  return (
    <div>
      <Card className="bg-white rounded-2xl border-none shadow-none">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-medium text-gray-900">Payment Methods</CardTitle>
          <Button onClick={handleAddPaymentMethod} className="rounded-lg" variant="primary">
            <PlusCircle className="w-4 h-4 mr-2" />
            Payment Method
          </Button>
        </CardHeader>

        <CardContent className="overflow-x-auto w-full">
          {isLoading ? (
            <div className="text-center py-8 min-w-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading payment methods...</p>
            </div>
          ) : paymentMethods.length === 0 ? (
            <div className="text-center py-8 min-w-full">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No payment methods added</p>
            </div>
          ) : (
            <div className="flex gap-4 w-max">
              {paymentMethods.map((method: PaymentMethod) => (
                <div
                  key={method.id}
                  className={`flex-shrink-0 flex items-center justify-between p-4 border-2 rounded-2xl transition-colors h-32 min-w-[300px] cursor-pointer ${method.isDefault ? 'border-blue-600 shadow-lg' : 'border-[#D3D3D3] hover:border-gray-300'}`}
                  onClick={() => handleSetDefaultCard(method)}
                  style={{ position: 'relative' }}
                >
                  {method.isDefault && (
                    <span className="absolute top-2 right-4 px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-700 rounded z-10">Default</span>
                  )}
                  <div className="w-full flex flex-col space-y-4">
                    {getCardIcon(method.brand)}
                    <div className="flex items-center justify-between space-x-4">
                      <div className="flex items-end space-x-2">
                        <Landmark className="w-7 h-7 font-extrabold text-[#413B89]" />
                        <span className="text-lg font-medium text-black whitespace-nowrap">
                          **** **** **** {method.last4}
                        </span>
                      </div>
                      <div className="flex items-center">
                        {/* <Button
                          size="sm"
                          onClick={() => handleEditPaymentMethod(method.id)}
                          className="text-black shadow-none"
                          variant="ghost"
                        >
                          <Edit className="w-4 h-4" />
                        </Button> */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={e => { e.stopPropagation(); handleDeletePaymentMethod(method.id); }}
                          className="text-red-600 shadow-none hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AddPaymentModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddPaymentMethodSubmit}
      />

      {/* <EditPaymentModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false)
          setEditingPaymentMethod(null)
        }}
        onSave={handleEditPaymentMethodSubmit}
        paymentMethod={editingPaymentMethod}
      /> */}
    </div>
  )
}
