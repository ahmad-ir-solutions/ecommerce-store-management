import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit, Loader2, Plus, Save, TrendingUp } from "lucide-react"
import { Calendar } from "lucide-react"
import { RefreshCw } from "lucide-react"
import { ShoppingCart } from "lucide-react"
import { Package } from "lucide-react"
import type { ICustomer } from "../core/_modals"
import { Link, useNavigate } from "react-router-dom"
import { useGetOrders } from "../../orders/core/hooks/use-orders"
import { formatCurrency } from "@/helpers/currencyFormat"
import { formatDate } from "@/helpers/formatDate"

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
  const navigate = useNavigate()
  const [isEditingTags, setIsEditingTags] = useState(false)
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [newTag, setNewTag] = useState("")
  const [notes, setNotes] = useState(customer.notes || "")
  const { data: ordersData, isLoading } = useGetOrders({
    page: 1,
    limit: 10,
    sortOrder: "desc",
    sortBy: "createdAt",
    customerDetails: customer._id
  })

  console.log(ordersData, "ordersData");

  const handleAddTag = async () => {
    if (!newTag.trim()) return

    const success = await onAddTag(newTag.trim())
    if (success) {
      setNewTag("")
      setIsEditingTags(false)
    }
  }

  const handleSaveNotes = async () => {
    const success = await onUpdateNotes(notes)
    if (success) {
      setIsEditingNotes(false)
    }
  }

  const handleCreateOrder = () => {
    navigate("/admin/orders/add-order", {
      state: {
        customerId: customer._id
      }
    })
  }

  const name = `${customer.firstName} ${customer.lastName}`
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  // Compute stats from orders if available
  const totalOrders = customer.totalOrders || 0;
  const totalReturns = customer.totalReturns || 0;
  const totalSpend = customer.totalSpend || 0;
  console.log(ordersData, "ordersData")

  return (
    <div className="grid grid-cols-2 lg:grid-cols-7 gap-4">
      <div className="space-y-4 col-span-7 lg:col-span-2">
        {/* customer details */}
        <Card className="bg-white border-0 shadow-none rounded-2xl gap-0">
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
              <Edit className="h-7 w-7 text-[#024AFE]" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar className="h-12 w-12 bg-red-500 text-white">
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>

              <div className="min-w-0 flex-1"> {/* Ensures truncation works */}
                <h3 className="text-lg font-semibold truncate">{name}</h3>
                <p className="text-sm text-gray-500 truncate">{customer.email}</p>
                <p className="text-sm text-gray-500 truncate">{customer.customerReference}</p>

                <div className="mt-3">
                  <h1 className="text-lg font-bold">Customer reference</h1>
                  <p className="text-gray-500 break-words">{customer.customerReference}</p>
                </div>
              </div>
            </div>
          </CardContent>

        </Card>

        {/* shipping address */}
        <Card className="bg-white border-0 shadow-none rounded-2xl gap-0">
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
              <Edit className="h-7 w-7 text-[#024AFE]" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {customer.shippingAddress ? (
              <div className="text-gray-500 font-medium">
                <p>{customer.shippingAddress.company || ""}</p>
                <p>{customer.shippingAddress.addressLine1}</p>
                {customer.shippingAddress.addressLine2 && <p>{customer.shippingAddress.addressLine2}</p>}
                <p>{customer.shippingAddress.city}</p>
                <p>{customer.shippingAddress.state}</p>
                <p>{customer.shippingAddress.postalCode}</p>
                <p>{customer.shippingAddress.country}</p>
                <p>{customer.shippingAddress.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No shipping address</p>
            )}
          </CardContent>
        </Card>

        {/* billing address */}
        <Card className="bg-white border-0 shadow-none rounded-2xl gap-0">
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
              <Edit className="h-7 w-7 text-[#024AFE]" />
            </Button>
          </CardHeader>
          <CardContent className="p-6">
            {customer.billingAddress ? (
              <div className="text-gray-500 font-medium">
                <p>{customer.billingAddress.company || ""}</p>
                <p>{customer.billingAddress.addressLine1}</p>
                {customer.billingAddress.addressLine2 && <p>{customer.billingAddress.addressLine2}</p>}
                <p>{customer.billingAddress.city}</p>
                <p>{customer.billingAddress.state}</p>
                <p>{customer.billingAddress.postalCode}</p>
                <p>{customer.billingAddress.country}</p>
                <p>{customer.billingAddress.phone}</p>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No billing address</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* activity */}
      {/* <Card className="col-span-7 lg:col-span-5 xl:col-span-3 bg-white border-0 shadow-none rounded-2xl">
        <CardContent className="px-6">
          <h3 className="text-xl font-semibold mb-4">Activity</h3>
          <div className="flex justify-between gap-6 border-gray-200 flex-wrap">
            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-500">Customer since</p>
                  <h2 className="text-lg font-medium">{customer.createdAt ? new Date(customer.createdAt).toLocaleDateString() : '—'}</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-500">Total orders</p>
                  <h2 className="text-lg font-medium">{totalOrders}</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-500">Total returns</p>
                  <h2 className="text-lg font-medium">{totalReturns}</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-500">Total spend</p>
                  <h2 className="text-lg font-medium">£ {totalSpend}</h2>
                </div>
              </CardContent>
            </Card>
            <div className="w-0.5 h-20 bg-gray-200 bg-opacity-50 border-dashed"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-lg font-medium text-gray-500">Average order value</p>
                  <h2 className="text-lg font-medium">£ {totalSpend / totalOrders || 0}</h2>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold mb-4">Order History</h3>
              <Button size="lg" className="bg-[#024AFE] hover:bg-[#1b02fe] text-white" onClick={() => {handleCreateOrder()}}>
                <Plus className="h-4 w-4 mr-2" />
                Create Order
              </Button>
            </div>

            {ordersData && ordersData.orders && ordersData.orders.length > 0 ? (
              <div className="space-y-8">
                <div className="grid grid-cols-1 justify-between space-y-0">
                  {isLoading }
                  {ordersData.orders.map((order: any) => (
                    <div key={order._id} className="flex justify-between items-center mt-2 col-span-2">
                      <div className="flex items-center gap-3">
                      <div className="w-13 h-13 flex items-center justify-center">
                        <img src={order.productDetails?.imageUrl || "/images/ebay.svg"} alt={order.productDetails?.productName || "Product"} className="object-contain w-full h-full" />
                      </div>
                        <div>
                          <p className="font-medium text-sm">{order.productDetails?.productName || "-"}</p>
                          <p className="text-xs text-gray-500 font-medium">SKU: {order.productDetails?.sku || "-"}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <p className="font-medium text-sm">£{order.totalPrice}</p>
                          <p className="text-xs text-gray-500 font-medium">Qty: {order.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center h-full mt-4">
                <p className="text-sm text-muted-foreground">No orders yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
 */}

      <Card className="col-span-7 lg:col-span-5 xl:col-span-3 bg-white border-0 shadow-none rounded-2xl">
        <CardContent className="px-6 py-6">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            <h3 className="text-xl font-semibold">Sales Activity</h3>
          </div>

          {/* Stats Section */}
          <div className="flex justify-between gap-6 border-gray-200 flex-wrap mb-8">
            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Customer since
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900">{formatDate(customer.createdAt)}</h2>
                </div>
              </CardContent>
            </Card>

            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    Total orders
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900">{totalOrders}</h2>
                </div>
              </CardContent>
            </Card>

            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <RefreshCw className="h-3 w-3" />
                    Total returns
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900">{totalReturns}</h2>
                </div>
              </CardContent>
            </Card>

            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    Total sales
                  </p>
                  <h2 className="text-lg font-semibold text-green-600">{totalSpend}</h2>
                </div>
              </CardContent>
            </Card>

            <div className="w-0.5 h-20 bg-gray-200 bg-opacity-50"></div>

            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <Package className="h-3 w-3" />
                    Average order value
                  </p>
                  <h2 className="text-lg font-semibold text-blue-600">{totalSpend / totalOrders || 0}</h2>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Orders Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                Recent Orders
              </h3>
              <div className="flex justify-between items-center mb-4">
                <Button className="bg-[#024AFE] hover:bg-[#1b02fe] text-white" onClick={() => { handleCreateOrder() }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Order
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center h-full mt-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
              </div>
            ) : ordersData && ordersData.orders && ordersData.orders.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {ordersData.orders.map((order: any) => (
                    <Link to={`/admin/orders/edit-order/${order._id}`}
                      key={order._id}
                      className="flex justify-between items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 flex items-center justify-center">
                          <img
                            src={order.productDetails?.imageUrl || "/placeholder.svg?height=48&width=48"}
                            alt={order.productDetails?.productName || "Product"}
                            className="object-contain w-full h-full rounded-lg"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm text-gray-900">
                              {order.productDetails?.productName || "Unknown Product"}
                            </p>
                            {/* <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}
                          >
                            {order.orderStatus}
                          </span> */}
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>SKU: {order.productDetails?.sku || "N/A"}</span>
                            {order.customerName && <span>Customer: {order.customerName}</span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <p className="font-semibold text-sm text-gray-900">{formatCurrency(order.totalPrice)}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Qty: {order.quantity}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>

                {ordersData.orders.length > 5 && (
                  <div className="text-center pt-4">
                    <Button variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50 bg-transparent">
                      View All Orders
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col justify-center items-center py-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCart className="h-8 w-8 text-gray-400" />
                </div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No orders yet</h4>
                <p className="text-sm text-gray-500 mb-6 max-w-sm">
                  Start selling to see your orders and sales statistics here.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* tax & customs */}
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
              <Edit className="h-7 w-7 text-[#024AFE]" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-500">VAT number</p>
                <p className="font-medium">{customer.vatNumber || "—"}</p>
              </div>
              <div className="flex items-center gap-2 justify-between">
                <p className="text-sm text-gray-500">AIRN</p>
                <p className="font-medium">{customer.airn || "—"}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-0 shadow-none rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xl font-semibold">Tags</CardTitle>
            <Button size="sm" variant="ghost" onClick={() => setIsEditingTags(!isEditingTags)}>
              {isEditingTags ? <Save className="h-7 w-7 text-[#024AFE]" /> : <Edit className="h-7 w-7 text-[#024AFE]" />}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditingTags ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleAddTag()
                    }
                  }}
                  placeholder="Add a new tag"
                  className="flex-1 border-gray-400"
                />
                <Button size="sm" onClick={handleAddTag} className="shadow-none text-[#024AFE]">
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
              {isEditingNotes ? <Save className="h-7 w-7 text-[#024AFE]" /> : <Edit className="h-7 w-7 text-[#024AFE]" />}
            </Button>
          </CardHeader>
          <CardContent>
            {isEditingNotes ? (
              <div className="flex items-center gap-2">
                <Input
                  value={notes}
                  className="border-gray-400"
                  onChange={(e) => setNotes(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      handleSaveNotes()
                    }
                  }}
                  placeholder="Add notes"
                />
                <Button size="sm" onClick={handleSaveNotes} className="shadow-none text-[#024AFE]">
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
