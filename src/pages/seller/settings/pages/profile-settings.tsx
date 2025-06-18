import { useState, useEffect } from 'react';

const ProfileSettingsPage = () => {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    // TODO: Fetch profile data
    // This is a placeholder for the actual API call
    const fetchProfileData = async () => {
      // const response = await api.getProfile();
      // setProfileData(response.data);
    };
    fetchProfileData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={profileData.firstName}
                  onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={profileData.lastName}
                  onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profileData.email}
                onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={profileData.phone}
                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
              />
            </div>

            <div className="border-t pt-6">
              <h2 className="text-lg font-medium mb-4">Change Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={profileData.currentPassword}
                    onChange={(e) => setProfileData({ ...profileData, currentPassword: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={profileData.newPassword}
                    onChange={(e) => setProfileData({ ...profileData, newPassword: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
                  <input
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    value={profileData.confirmPassword}
                    onChange={(e) => setProfileData({ ...profileData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileSettingsPage; 