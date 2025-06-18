import { useState, useEffect } from 'react';

const PaymentSettingsPage = () => {
  const [paymentData, setPaymentData] = useState({
    bankName: '',
    accountNumber: '',
    routingNumber: '',
    accountHolderName: '',
    paypalEmail: '',
    stripeEnabled: false,
    paypalEnabled: false,
  });

  useEffect(() => {
    // TODO: Fetch payment settings
    // This is a placeholder for the actual API call
    const fetchPaymentSettings = async () => {
      // const response = await api.getPaymentSettings();
      // setPaymentData(response.data);
    };
    fetchPaymentSettings();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement payment settings update logic
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Payment Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Bank Account Information</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bank Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={paymentData.bankName}
                    onChange={(e) => setPaymentData({ ...paymentData, bankName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={paymentData.accountNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, accountNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Routing Number</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={paymentData.routingNumber}
                    onChange={(e) => setPaymentData({ ...paymentData, routingNumber: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Account Holder Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={paymentData.accountHolderName}
                    onChange={(e) => setPaymentData({ ...paymentData, accountHolderName: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-medium mb-4">Payment Gateways</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Stripe</h3>
                    <p className="text-sm text-gray-500">Accept credit card payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={paymentData.stripeEnabled}
                      onChange={(e) => setPaymentData({ ...paymentData, stripeEnabled: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">PayPal</h3>
                    <p className="text-sm text-gray-500">Accept PayPal payments</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={paymentData.paypalEnabled}
                      onChange={(e) => setPaymentData({ ...paymentData, paypalEnabled: e.target.checked })}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                {paymentData.paypalEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700">PayPal Email</label>
                    <input
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      value={paymentData.paypalEmail}
                      onChange={(e) => setPaymentData({ ...paymentData, paypalEmail: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Payment Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentSettingsPage; 