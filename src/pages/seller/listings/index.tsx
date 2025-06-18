import { Loader2 } from 'lucide-react'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"

// Sample data for the dashboard
const dashboardData = {
  totalOrders: 156,
  totalRevenue: 12580.45,
  totalProducts: 89,
  totalUsers: 245,
  recentOrders: [
    { id: "ORD-001", customer: "John Doe", amount: 125.99, status: "delivered", date: "2023-04-10" },
    { id: "ORD-002", customer: "Jane Smith", amount: 89.5, status: "processing", date: "2023-04-09" },
    { id: "ORD-003", customer: "Robert Johnson", amount: 245.0, status: "shipped", date: "2023-04-08" },
    { id: "ORD-004", customer: "Emily Davis", amount: 65.75, status: "pending", date: "2023-04-07" },
    { id: "ORD-005", customer: "Michael Brown", amount: 189.25, status: "delivered", date: "2023-04-06" },
  ],
}

export default function AdminDashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const data = dashboardData

  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Orders</div>
          <div className="mt-2 text-3xl font-bold">{data.totalOrders}</div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Revenue</div>
          <div className="mt-2 text-3xl font-bold">${data.totalRevenue.toLocaleString()}</div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Products</div>
          <div className="mt-2 text-3xl font-bold">{data.totalProducts}</div>
        </div>
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="text-sm font-medium text-gray-500">Total Users</div>
          <div className="mt-2 text-3xl font-bold">{data.totalUsers}</div>
        </div>
      </div>

      {/* Recent orders */}
      <div className="rounded-lg bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-medium">Recent Orders</h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b text-left text-sm font-medium text-gray-500">
                <th className="pb-3 pr-4">Order ID</th>
                <th className="pb-3 pr-4">Customer</th>
                <th className="pb-3 pr-4">Amount</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Date</th>
              </tr>
            </thead>
            <tbody>
              {data.recentOrders.map((order) => (
                <tr key={order.id} className="border-b text-sm">
                  <td className="py-3 pr-4 font-medium">{order.id}</td>
                  <td className="py-3 pr-4">{order.customer}</td>
                  <td className="py-3 pr-4">${order.amount.toFixed(2)}</td>
                  <td className="py-3 pr-4">
                    <span
                      className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${order.status === "delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "processing"
                            ? "bg-blue-100 text-[#024AFE]"
                            : order.status === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-right">
          <Link to="/admin/orders" className="text-sm font-medium text-[#024AFE] hover:text-[#0230fe]">
            View all orders →
          </Link>
        </div>
      </div>
    </div>
  )
}
