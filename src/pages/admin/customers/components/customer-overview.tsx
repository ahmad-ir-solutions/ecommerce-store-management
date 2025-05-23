import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Plus, Save } from "lucide-react"
import type { ICustomer } from "../core/_modals"

export function CustomerOverview({
  customer,
  setActiveTab,
  onAddTag,
  // onRemoveTag,
  onUpdateNotes,
  setAddressFormFocus,
}: {
  customer: ICustomer
  setActiveTab: (tab: string) => void
  onAddTag: (tag: string) => Promise<boolean>
  onRemoveTag: (tag: string) => Promise<boolean>
  onUpdateNotes: (notes: string) => Promise<boolean>
  setAddressFormFocus: (focus: string | null) => void
}) {
  const [isEditingTags, setIsEditingTags] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [notes, setNotes] = useState(customer.notes || "")

  const handleAddTag = async () => {
    if (!newTag.trim()) return

    const success = await onAddTag(newTag.trim())
    if (success) {
      setNewTag("")
    }
  }

  const handleSaveNotes = async () => {
    const success = await onUpdateNotes(notes)
    if (success) {
      setIsEditingNotes(false)
    }
  }

  const name = `${customer.firstName} ${customer.lastName}`
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  return (
    <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
      <div className="space-y-4 col-span-7 lg:col-span-2">
        <Card className="bg-white border-0 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Customer</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Navigate to addresses tab and focus on shipping form
                setActiveTab("addresses")
                setAddressFormFocus("shipping")
              }}
            >
              <Edit className="h-7 w-7 text-blue-500" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 bg-red-500 text-white">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
                <p className="text-sm text-gray-500">{customer.customerReference}</p>
                <div className="mt-3">
                  <h1 className="text-lg font-bold">Customer reference</h1>
                  <p className="text-gray-500">{customer.customerReference}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Shipping Addresses</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Navigate to addresses tab and focus on shipping form
                setActiveTab("addresses")
                setAddressFormFocus("shipping")
              }}
            >
              <Edit className="h-7 w-7 text-blue-500" />
            </Button>
          </CardHeader>
          <CardContent>
            {customer.shippingAddress ? (
              <div className="text-gray-500">
                <p>{customer.shippingAddress.company || ""}</p>
                <p>{customer.shippingAddress.addressLine1}</p>
                {customer.shippingAddress.addressLine2 && <p>{customer.shippingAddress.addressLine2}</p>}
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

        <Card className="bg-white border-0 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Billing Addresses</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                // Navigate to addresses tab and focus on billing form
                setActiveTab("addresses")
                setAddressFormFocus("billing")
              }}
            >
              <Edit className="h-7 w-7 text-blue-500" />
            </Button>
          </CardHeader>
          <CardContent>
            {customer.billingAddress ? (
              <div className="text-gray-500">
                <p>{customer.billingAddress.company || ""}</p>
                <p>{customer.billingAddress.addressLine1}</p>
                {customer.billingAddress.addressLine2 && <p>{customer.billingAddress.addressLine2}</p>}
                <p>{customer.billingAddress.city}</p>
                <p>{customer.billingAddress.state}</p>
                <p>{customer.billingAddress.postalCode}</p>
                <p>{customer.billingAddress.country}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No billing address</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-7 lg:col-span-5 xl:col-span-3 bg-white border-0 shadow-none rounded-2xl">
        <CardContent className="px-6">
          <h3 className="text-xl font-semibold mb-4">Activity</h3>
          <div className="flex justify-between gap-6 border-gray-200 flex-wrap">
            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Customer since</p>
                  <h2 className="text-3xl font-bold">Today</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Total orders</p>
                  <h2 className="text-3xl font-bold">1</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Total returns</p>
                  <h2 className="text-3xl font-bold">0</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Total spend</p>
                  <h2 className="text-3xl font-bold">0</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-20 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Average order value</p>
                  <h2 className="text-3xl font-bold">£ 25.99</h2>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold mb-4">Order History</h3>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </div>

            {customer.orders && customer.orders.length > 0 ? (
              <div className="space-y-8">
                <div className="bg-[#ECF6FF] rounded-2xl p-7">
                  <div className="grid grid-cols-1fr xl:grid-cols-1fr 2xl:grid-cols-[170px_1fr] gap-4 md:gap-2 mb-4 text-sm px-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="bg-white p-1 rounded">
                          <img src="/images/ebay.svg" alt="ebay" className="h-5" />
                        </div>
                        <div>
                          <p className="font-medium">Ebay DCUK</p>
                          <p className="text-xs text-muted-foreground">14-12808-55117</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between w-full">
                      <div>
                        <p className="text-xs text-muted-foreground">Order number</p>
                        <p>19923422</p>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200 bg-opacity-50 border-dashed"></div>

                      <div>
                        <p className="text-xs text-muted-foreground">Order date</p>
                        <p>Today</p>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200 bg-opacity-50 border-dashed"></div>

                      <div>
                        <p className="text-xs text-muted-foreground">Shipping cost</p>
                        <p>£0.00</p>
                      </div>
                      <div className="w-0.5 h-8 bg-gray-200 bg-opacity-50 border-dashed"></div>

                      <div>
                        <p className="text-xs text-muted-foreground">Order total</p>
                        <p>£25.99</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-start mb-4 px-12 mt-8">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
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

                    <div className="flex-1 border-t border-dashed border-gray-300 mx-2 mt-6"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
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

                    <div className="flex-1 border-t border-dashed border-gray-300 mx-2 mt-6"></div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-blue-500">
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
                </div>
                <div className="2xl:grid 2xl:grid-cols-5 justify-between space-y-8">
                  <div className="flex justify-between items-center mt-6 col-span-2">
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
                  <div className="2xl:flex items-center justify-center col-span-1 hidden">
                    <div className=" h-14 w-[2px] bg-gray-200 bg-opacity-50 border-dashed mt-3"></div>
                  </div>
                  <div className="flex justify-between items-center mt-4 col-span-2">
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

      <div className="space-y-4 col-span-7 lg:col-span-7 xl:col-span-2">
        <Card className="bg-white border-0 shadow-none rounded-2xl lg-flex-1">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Tax & customs</CardTitle>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setActiveTab("basic-details")
              }}
            >
              <Edit className="h-7 w-7 text-blue-500" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-500">VAT number</p>
                <p className="font-medium">{customer.vatNumber || "—"}</p>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-500">EORI</p>
                <p className="font-medium">{customer.abn || "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Tags</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsEditingTags(!isEditingTags)}>
              {isEditingTags ? <Save className="h-7 w-7 text-blue-500" /> : <Edit className="h-7 w-7 text-blue-500" />}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditingTags ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a new tag"
                  className="flex-1 border-gray-400"
                />
                <Button size="sm" onClick={handleAddTag} className="shadow-none text-blue-500">
                  + Add
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

        <Card className="bg-white border-0 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Notes</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsEditingNotes(!isEditingNotes)}>
              {isEditingNotes ? <Save className="h-7 w-7 text-blue-500" /> : <Edit className="h-7 w-7 text-blue-500" />}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditingNotes ? (
              <div className="flex items-center gap-2">
                <Input
                  value={notes}
                  className="border-gray-400"
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add notes"
                />
                <Button size="sm" onClick={handleSaveNotes} className="shadow-none text-blue-500">
                  + Add
                </Button>
              </div>
            ) : (
              <p className="text-sm">{notes || <span className="text-muted-foreground">No notes</span>}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
