import { Link, useParams } from "react-router-dom"
import { useGetSellerOrderStats, useGetSellerOrders } from "../core/hooks/useSeller"
import { Loader2 } from "lucide-react"
import type { ISeller, ISellerOrderData, StatsData } from "../core/_modals"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/helpers/formatDate"
import { formatCurrency } from "@/helpers/currencyFormat"
import { getStatusColor } from "@/helpers/statuses"
import { TrendingUp, ShoppingCart, RefreshCw, Calendar, Package } from "lucide-react"
import { CustomPagination } from "@/components/shared/custom-pagination"

export default function SellerOrders({ seller }: { seller: ISeller }) {
  const { sellerId } = useParams()
  const [queryParams, setQueryParams] = useState({
    page: 1,
    limit: 10,
  })

  const { data: statsData, isLoading: isStatsLoading } = useGetSellerOrderStats(sellerId || "")
  const { data: ordersData, isLoading: isOrdersLoading } = useGetSellerOrders(sellerId || "", queryParams)

  const orderStats = statsData?.[0] as StatsData
  const orders = ordersData?.orders || []

  if (isStatsLoading || isOrdersLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
      </div>
    )
  }

  const handlePageChange = (page: number) => {
    setQueryParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const totalPages = ordersData?.total ? Math.ceil(ordersData.total / (queryParams.limit || 10)) : 0
  const currentPage = queryParams.page || 1

  return (
    <div className="flex flex-col gap-4">
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
                    Seller since
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900">{formatDate(seller.createdAt)}</h2>
                </div>
              </CardContent>
            </Card>

            <div className="w-0.5 h-16 bg-gray-200 bg-opacity-50"></div>
{/* stats */}
            <Card className="rounded-2xl border-none shadow-none pt-0">
              <CardContent className="p-0">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1">
                    <ShoppingCart className="h-3 w-3" />
                    Total orders
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900">{orderStats?.totalOrders || 0}</h2>
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
                  <h2 className="text-lg font-semibold text-gray-900">{orderStats?.numberOfReturns || 0}</h2>
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
                  <h2 className="text-lg font-semibold text-green-600">
                    {formatCurrency(orderStats?.totalSpent || 0)}
                  </h2>
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
                  <h2 className="text-lg font-semibold text-blue-600">
                    {orderStats?.totalOrders > 0
                      ? formatCurrency((orderStats?.totalSpent || 0) / orderStats.totalOrders)
                      : formatCurrency(0)}
                  </h2>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Channel Stats */}
          {orderStats?.channelStats && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Sales by Channel</h4>
              <div className="flex gap-4">
                {Object.entries(orderStats.channelStats).map(([channel, count]) => (
                  <div key={channel} className="bg-blue-50 px-3 py-2 rounded-lg">
                    <span className="text-sm font-medium text-blue-700">
                      {channel}: {count} orders
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Section */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-blue-600" />
                Recent Orders
              </h3>
            </div>

            {isOrdersLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-[#024AFE]" />
              </div>
            ) : orders && orders.length > 0 ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {orders.map((order: ISellerOrderData) => (
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
                            <p className="font-medium text-sm text-gray-900 truncate">
                              {order.productDetails?.productName || "Unknown Product"}
                            </p>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}
                            >
                              {order.orderStatus}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>SKU: {order.productDetails?.sku || "N/A"}</span>
                            <span>Channel: {order.channelDetails?.channelName || "N/A"}</span>
                            <span>Order ID: {order._id.slice(-8)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <p className="font-semibold text-sm text-gray-900">{formatCurrency(order.totalPrice)}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Qty: {order.quantity}</span>
                          <span>•</span>
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                {ordersData && ordersData.total > 5 && (
                  <div className="text-center pt-4">
                    <CustomPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                      totalItems={ordersData?.total || 0}
                      itemsPerPage={queryParams.limit}
                    />
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
    </div>
  )
}
