import { Loader2 } from 'lucide-react'
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, Filter } from 'lucide-react'

export const SellerOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [statusFilter, setStatusFilter] = useState('all');

    useEffect(() => {
        // TODO: Fetch orders with pagination, search, and filters
        const fetchOrders = async () => {
            try {
                // const response = await api.getOrders({ 
                //   page: currentPage, 
                //   search: searchTerm,
                //   status: statusFilter 
                // });
                // setOrders(response.data.orders);
                // setTotalPages(response.data.totalPages);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching orders:', error);
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage, searchTerm, statusFilter]);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Orders</h1>
            </div>

            <div className="bg-white shadow rounded-lg">
                <div className="p-4 border-b">
                    <div className="flex gap-4">
                        <div className="flex-1">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search orders..."
                                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        <select
                            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="all">All Status</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                        <button className="px-4 py-2 border rounded-lg flex items-center gap-2 hover:bg-gray-50">
                            <Filter size={20} />
                            More Filters
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="p-8 text-center">Loading...</div>
                ) : (
                    <>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Order ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Total
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map((order: any) => (
                                        <tr key={order.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.customerName}</div>
                                                <div className="text-sm text-gray-500">{order.customerEmail}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{order.date}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">${order.total}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <Link
                                                    to={`/seller/orders/${order.id}`}
                                                    className="text-blue-600 hover:text-blue-900"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="px-6 py-4 border-t">
                            <div className="flex justify-between items-center">
                                <div className="text-sm text-gray-700">
                                    Showing page {currentPage} of {totalPages}
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Previous
                                    </button>
                                    <button
                                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className="px-3 py-1 border rounded hover:bg-gray-50 disabled:opacity-50"
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SellerOrdersPage
