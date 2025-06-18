import { useState, useEffect } from 'react';

export const ShopSettingsPage = () => {
  const [shopData, setShopData] = useState({
    name: '',
    description: '',
    email: '',
    phone: '',
    address: '',
    logo: '',
    banner: '',
    currency: 'USD',
    timezone: 'UTC',
  });

  useEffect(() => {
    // TODO: Fetch shop settings
    // This is a placeholder for the actual API call
    const fetchShopSettings = async () => {
      // const response = await api.getShopSettings();
      // setShopData(response.data);
    };
    fetchShopSettings();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement shop settings update logic
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Shop Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Shop Name</label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={shopData.name}
                onChange={(e) => setShopData({ ...shopData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={4}
                value={shopData.description}
                onChange={(e) => setShopData({ ...shopData, description: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shopData.email}
                  onChange={(e) => setShopData({ ...shopData, email: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shopData.phone}
                  onChange={(e) => setShopData({ ...shopData, phone: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                rows={3}
                value={shopData.address}
                onChange={(e) => setShopData({ ...shopData, address: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Currency</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shopData.currency}
                  onChange={(e) => setShopData({ ...shopData, currency: e.target.value })}
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Timezone</label>
                <select
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={shopData.timezone}
                  onChange={(e) => setShopData({ ...shopData, timezone: e.target.value })}
                >
                  <option value="UTC">UTC</option>
                  <option value="EST">EST</option>
                  <option value="PST">PST</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Settings
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ShopSettingsPage; 