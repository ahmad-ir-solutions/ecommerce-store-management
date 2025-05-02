import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Save } from "lucide-react"
import { Customer } from "../core/_modals"
import { updateCustomer } from "../core/dummy"
import { useCustomerStore } from "@/store/admin/customer-store"

export function CustomerOverview({
  customer,
  setActiveTab,
}: { customer: Customer; setActiveTab: (tab: string) => void }) {
  const queryClient = useQueryClient()
  const [isEditingTags, setIsEditingTags] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [notes, setNotes] = useState(customer.notes || "")

  const updateMutation = useMutation({
    mutationFn: updateCustomer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", customer.id] })
    },
  })

  const handleAddTag = () => {
    if (!newTag.trim()) return

    const updatedTags = [...(customer.tags || []), newTag.trim()]
    updateMutation.mutate({
      id: customer.id,
      data: { tags: updatedTags },
    })
    setNewTag("")
  }

  const handleSaveNotes = () => {
    updateMutation.mutate({
      id: customer.id,
      data: { notes },
    })
    setIsEditingNotes(false)
  }

  const initials = customer.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 bg-red-500 text-white">
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-lg font-semibold">{customer.name}</h3>
              <p className="text-sm text-muted-foreground">{customer.email}</p>
              <p className="text-sm text-muted-foreground">{customer.reference}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardContent className="p-6">
          <h3 className="text-base font-medium mb-4">Activity</h3>
          <div className="grid grid-cols-5 gap-4 border-b pb-4">
            <div>
              <p className="text-sm text-muted-foreground">Customer since</p>
              <p className="font-medium">Today</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total orders</p>
              <p className="font-medium">{customer.order.numbers}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total returns</p>
              <p className="font-medium">0</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total spend</p>
              <p className="font-medium">£{customer.order.total.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average order value</p>
              <p className="font-medium">£{customer.order.average.toFixed(2)}</p>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base font-medium">Order History</h3>
              <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </div>

            {customer.orders && customer.orders.length > 0 ? (
              <div className="space-y-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="grid grid-cols-5 gap-2 mb-4 text-sm">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded">
                          <svg
                            width="24"
                            height="16"
                            viewBox="0 0 87 35"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M0 14.4V17.6H3.6V14.4H0Z" fill="#E53238" />
                            <path d="M3.9 14.4V17.6H8.2V14.4H3.9Z" fill="#0064D2" />
                            <path d="M8.5 14.4V17.6H12.1V14.4H8.5Z" fill="#F5AF02" />
                            <path d="M12.4 14.4V17.6H16V14.4H12.4Z" fill="#86B817" />
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium">Ebay DCUK</p>
                          <p className="text-xs text-muted-foreground">14-12808-55117</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Order number</p>
                      <p>19923422</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Order date</p>
                      <p>Today</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Shipping cost</p>
                      <p>£0.00</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Order total</p>
                      <p>£25.99</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mb-4 px-12">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M5 12.55a11 11 0 0 1 14.08 0" />
                          <path d="M1.42 9a16 16 0 0 1 21.16 0" />
                          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
                          <line x1="12" y1="20" x2="12" y2="20" />
                        </svg>
                      </div>
                      <p className="text-sm mt-1">Today</p>
                      <p className="text-xs text-muted-foreground">08:41</p>
                    </div>

                    <div className="flex-1 border-t border-dashed border-gray-300 mx-2"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                          <circle cx="12" cy="7" r="4" />
                        </svg>
                      </div>
                      <p className="text-sm mt-1">Today</p>
                      <p className="text-xs text-muted-foreground">08:41</p>
                    </div>

                    <div className="flex-1 border-t border-dashed border-gray-300 mx-2"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-500">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10 17h4V5H2v12h3" />
                          <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5" />
                          <path d="M14 17h1" />
                          <circle cx="7.5" cy="17.5" r="2.5" />
                          <circle cx="17.5" cy="17.5" r="2.5" />
                        </svg>
                      </div>
                      <p className="text-sm mt-1">Dispatched</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <div className="flex items-center gap-3">
                      <div className="bg-gray-100 p-2 rounded">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M20.38 3.46 16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Airmail Club De Nuit Intense Man 105ml EDT ........ x1</p>
                        <p className="text-xs text-muted-foreground">608301004471Z</p>
                      </div>
                    </div>
                    <p className="font-medium">£25.99</p>
                  </div>

                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-500 p-2 rounded-full">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Royal Mail</p>
                        <p className="text-xs text-muted-foreground">Tracked 24</p>
                      </div>
                    </div>
                    <p className="font-medium">£25.99</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No orders yet</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Tax & customs</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              setActiveTab("basic-details")
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">VAT number</p>
              <p className="font-medium">{customer.vatNumber || "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">EORI</p>
              <p className="font-medium">{customer.eori || "—"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Tags</CardTitle>
          <Button size="sm" variant="ghost" onClick={() => setIsEditingTags(!isEditingTags)}>
            {isEditingTags ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditingTags ? (
            <div className="flex items-center gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add a new tag"
                className="flex-1"
              />
              <Button size="sm" onClick={handleAddTag}>
                Add
              </Button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {customer.tags && customer.tags.length > 0 ? (
                customer.tags.map((tag, i) => (
                  <Badge key={i} variant="outline">
                    {tag}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No tags</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Notes</CardTitle>
          <Button size="sm" variant="ghost" onClick={() => setIsEditingNotes(!isEditingNotes)}>
            {isEditingNotes ? <Save className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
          </Button>
        </CardHeader>
        <CardContent>
          {isEditingNotes ? (
            <div className="space-y-2">
              <Input value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add notes" />
              <Button size="sm" onClick={handleSaveNotes}>
                Save
              </Button>
            </div>
          ) : (
            <p className="text-sm">{notes || <span className="text-muted-foreground">No notes</span>}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Shipping Addresses</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              // Navigate to addresses tab and focus on shipping form
              setActiveTab("addresses")
              useCustomerStore.getState().setAddressFormFocus("shipping")
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {customer.shippingAddress ? (
            <div className="text-sm">
              <p className="font-medium">{customer.shippingAddress.company || ""}</p>
              <p>{customer.shippingAddress.line1}</p>
              {customer.shippingAddress.line2 && <p>{customer.shippingAddress.line2}</p>}
              <p>{customer.shippingAddress.city}</p>
              <p>{customer.shippingAddress.state}</p>
              <p>{customer.shippingAddress.postalCode}</p>
              <p>{customer.shippingAddress.country}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No shipping address</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-base font-medium">Billing Addresses</CardTitle>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => {
              // Navigate to addresses tab and focus on billing form
              setActiveTab("addresses")
              useCustomerStore.getState().setAddressFormFocus("billing")
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          {customer.billingAddress ? (
            <div className="text-sm">
              <p className="font-medium">{customer.billingAddress.company || ""}</p>
              <p>{customer.billingAddress.line1}</p>
              {customer.billingAddress.line2 && <p>{customer.billingAddress.line2}</p>}
              <p>{customer.billingAddress.city}</p>
              <p>{customer.billingAddress.state}</p>
              <p>{customer.billingAddress.postalCode}</p>
              <p>{customer.billingAddress.country}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No billing address</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
