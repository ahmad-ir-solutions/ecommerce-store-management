import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, Edit, Trash2, CreditCard, Landmark } from "lucide-react"
import { useState } from "react"
import { AddPaymentModal } from "../components/modal/add-payment-modal"
import { EditPaymentModal } from "../components/modal/edit-payment-modal"
import { useGetSavedCards } from "../core/hooks/useStripe"
interface PaymentMethod {
    id: string
    type: "visa" | "mastercard" | "amex"
    lastFour: string
    fullNumber: string
    expiryDate: string
    cvv: string
    cardholderName: string
    isDefault: boolean
    stripePaymentMethodId?: string
}

// const mockPaymentMethods: PaymentMethod[] = [
//     {
//         id: "1",
//         type: "visa",
//         lastFour: "4832",
//         fullNumber: "4242-****-****-4832",
//         expiryDate: "12/25",
//         cvv: "***",
//         cardholderName: "John Doe",
//         isDefault: true,
//         stripePaymentMethodId: "pm_1234567890",
//     },
//     {
//         id: "1",
//         type: "mastercard",
//         lastFour: "4832",
//         fullNumber: "4242-****-****-4832",
//         expiryDate: "12/25",
//         cvv: "***",
//         cardholderName: "John Doe",
//         isDefault: true,
//         stripePaymentMethodId: "pm_1234567890",
//     },
// ]

// export function PaymentMethod() {
//     const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>(mockPaymentMethods)
//     const [showAddModal, setShowAddModal] = useState(false)
//     const [showEditModal, setShowEditModal] = useState(false)
//     const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null)

//     const handleAddPaymentMethod = () => {
//         setShowAddModal(true)
//     }

//     const handleEditPaymentMethod = (methodId: string) => {
//         const method = paymentMethods.find((m) => m.id === methodId)
//         if (method) {
//             setEditingPaymentMethod(method)
//             setShowEditModal(true)
//         }
//     }

//     const handleDeletePaymentMethod = async (methodId: string) => {
//         // const method = paymentMethods.find((m) => m.id === methodId)

//         // In a real app, you would also detach the payment method from Stripe
//         // if (method?.stripePaymentMethodId) {
//         //   await stripe.paymentMethods.detach(method.stripePaymentMethodId)
//         // }

//         setPaymentMethods((prev) => prev.filter((method) => method.id !== methodId))
//     }

//     const handleAddPaymentMethodSubmit = (newMethod: Omit<PaymentMethod, "id">) => {
//         const id = Date.now().toString()
//         setPaymentMethods((prev) => [...prev, { ...newMethod, id }])
//         setShowAddModal(false)
//     }

//     const handleEditPaymentMethodSubmit = (updatedMethod: PaymentMethod) => {
//         setPaymentMethods((prev) => prev.map((method) => (method.id === updatedMethod.id ? updatedMethod : method)))
//         setShowEditModal(false)
//         setEditingPaymentMethod(null)
//     }

//     const getCardIcon = (type: string) => {
//         switch (type) {
//             case "visa":
//                 return (
//                     <div className="w-10 h-6 bg-blue-600 rounded text-white text-xs font-bold flex items-center justify-center">
//                         VISA
//                     </div>
//                 )
//             case "mastercard":
//                 return (
//                     <div className="w-10 h-6 bg-red-600 rounded text-white text-xs font-bold flex items-center justify-center">
//                         MC
//                     </div>
//                 )
//             case "amex":
//                 return (
//                     <div className="w-10 h-6 bg-green-600 rounded text-white text-xs font-bold flex items-center justify-center">
//                         AMEX
//                     </div>
//                 )
//             default:
//                 return <CreditCard className="w-5 h-5 text-gray-400" />
//         }
//     }

//     return (
//         <div>
//             <Card className="bg-white rounded-2xl border-none shadow-none">
//                 <CardHeader className="flex flex-row items-center justify-between">
//                     <CardTitle className="text-lg font-medium text-gray-900">Payment Methods</CardTitle>
//                     <Button onClick={handleAddPaymentMethod} className="rounded-lg" variant="primary">
//                         <PlusCircle className="w-4 h-4 mr-2" />
//                         Payment Method
//                     </Button>
//                 </CardHeader>

//                 <CardContent className="overflow-x-auto w-full">
//                     {paymentMethods.length === 0 ? (
//                         <div className="text-center py-8 min-w-full">
//                             <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
//                             <p className="text-gray-500">No payment methods added</p>
//                         </div>
//                     ) : (
//                         <div className="flex gap-4 w-max">
//                             {paymentMethods.map((method) => (
//                                 <div
//                                     key={method.id}
//                                     className="flex-shrink-0 flex items-center justify-between p-4 border-2 border-[#D3D3D3] rounded-2xl hover:border-gray-300 transition-colors h-32 min-w-[300px]"
//                                 >
//                                     <div className="w-full flex flex-col space-y-4">
//                                         {getCardIcon(method.type)}
//                                         <div className="flex items-center justify-between space-x-4">
//                                             <div className="flex items-end space-x-2">
//                                                 <Landmark className="w-7 h-7 font-extrabold text-[#413B89]" />
//                                                 <span className="text-lg font-medium text-black whitespace-nowrap">
//                                                     {method.fullNumber}
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center">
//                                                 <Button
//                                                     size="sm"
//                                                     onClick={() => handleEditPaymentMethod(method.id)}
//                                                     className="text-black shadow-none"
//                                                 >
//                                                     <Edit className="w-4 h-4" />
//                                                 </Button>
//                                                 <Button
//                                                     variant="destructive"
//                                                     size="sm"
//                                                     onClick={() => handleDeletePaymentMethod(method.id)}
//                                                     className="text-red-600 shadow-none"
//                                                 >
//                                                     <Trash2 className="w-4 h-4" />
//                                                 </Button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                     )}
//                 </CardContent>
//             </Card>

//             <AddPaymentModal
//                 isOpen={showAddModal}
//                 onClose={() => setShowAddModal(false)}
//                 onAdd={handleAddPaymentMethodSubmit}
//             />

//             <EditPaymentModal
//                 isOpen={showEditModal}
//                 onClose={() => {
//                     setShowEditModal(false)
//                     setEditingPaymentMethod(null)
//                 }}
//                 onSave={handleEditPaymentMethodSubmit}
//                 paymentMethod={editingPaymentMethod}
//             />
//         </div>
//     )
// }

// export default PaymentMethod


export function PaymentMethod() {
  const { data: paymentMethods = [], isLoading } = useGetSavedCards();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingPaymentMethod, setEditingPaymentMethod] = useState<PaymentMethod | null>(null);

  // Remove mockPaymentMethods

  const handleAddPaymentMethod = () => setShowAddModal(true);

  const handleEditPaymentMethod = (methodId: string) => {
    const method = paymentMethods.find((m) => m.id === methodId);
    if (method) {
      setEditingPaymentMethod(method);
      setShowEditModal(true);
    }
  };

  const handleDeletePaymentMethod = async (methodId: string) => {
    // This can call useDeleteCard from hooks, if implemented
    // For now, we don't mutate local state since we're using server data
  };

  const handleAddPaymentMethodSubmit = (newMethod: Omit<PaymentMethod, "id">) => {
    // You should call useCreateStripeMethod (if implemented) and refetch
    setShowAddModal(false);
  };

  const handleEditPaymentMethodSubmit = (updatedMethod: PaymentMethod) => {
    // You should call useUpdateStripeMethod (if applicable) and refetch
    setShowEditModal(false);
    setEditingPaymentMethod(null);
  };

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
            <div className="text-center py-8 min-w-full">Loading...</div>
          ) : paymentMethods.length === 0 ? (
            <div className="text-center py-8 min-w-full">
              <CreditCard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No payment methods added</p>
            </div>
          ) : (
            <div className="flex gap-4 w-max">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  className="flex-shrink-0 flex items-center justify-between p-4 border-2 border-[#D3D3D3] rounded-2xl hover:border-gray-300 transition-colors h-32 min-w-[300px]"
                >
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
                        <Button size="sm" onClick={() => handleEditPaymentMethod(method.id)} className="text-black shadow-none">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeletePaymentMethod(method.id)}
                          className="text-red-600 shadow-none"
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

      <EditPaymentModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingPaymentMethod(null);
        }}
        onSave={handleEditPaymentMethodSubmit}
        paymentMethod={editingPaymentMethod}
      />
    </div>
  );
}
