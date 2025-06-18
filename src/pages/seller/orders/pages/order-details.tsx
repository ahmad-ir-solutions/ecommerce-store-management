import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const OrderDetailsPage = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({
    orderNumber: '',
    customerName: '',
    email: '',
    status: '',
    total: '',
    items: [],
    shippingAddress: '',
    createdAt: '',
  });

  useEffect(() => {
    // TODO: Fetch order details using orderId
    // This is a placeholder for the actual API call
    const fetchOrderDetails = async () => {
      // const response = await api.getOrderDetails(orderId);
      // setOrder(response.data);
    };
    fetchOrderDetails();
  }, [orderId]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Order Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Order Number</label>
                <p className="mt-1">{order.orderNumber}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Status</label>
                <p className="mt-1">{order.status}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Total Amount</label>
                <p className="mt-1">${order.total}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Order Date</label>
                <p className="mt-1">{order.createdAt}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-2">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-600">Customer Name</label>
                <p className="mt-1">{order.customerName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Email</label>
                <p className="mt-1">{order.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600">Shipping Address</label>
                <p className="mt-1">{order.shippingAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item: any, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.price}</td>
                    <td className="px-6 py-4 whitespace-nowrap">${item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage; 