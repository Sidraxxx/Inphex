import { useState } from 'react';
import { Eye, EyeOff, Sun, Moon } from 'lucide-react';

export default function Profile() {
  const [isDark, setIsDark] = useState(false);
  const [showApiKey, setShowApiKey] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [formData, setFormData] = useState({
    email: 'admin@admin.test',
    organization: 'Default All Organization',
    organizationId: '3bec7fe0e8a0d42e07e6095395e7b8df1e42fe2e',
    role: 'Admin',
    apiKey: '3bec7fe0e8a0d42e07e6095395e7b8df1e42fe2e'
  });

  const toggleDarkMode = () => setIsDark(!isDark);
  const toggleApiKeyVisibility = () => setShowApiKey(!showApiKey);
  const toggleTwoFactor = () => setTwoFactorEnabled(!twoFactorEnabled);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveChanges = () => {
    console.log('Saving changes:', formData);
    alert('Changes saved successfully!');
  };

  const handleAddMISPAccount = () => {
    console.log('Adding MISP account');
    alert('MISP account integration initiated!');
  };

  const maskedApiKey = formData.apiKey.substring(0, 4) + '*'.repeat(30) + formData.apiKey.substring(-4);

  return (
    <div className={`min-h-screen transition-colors duration-300  ${
      isDark ? 'bg-[#1A1F27] text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="w-full p-6">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-full">
            <h1 className="text-2xl font-bold mb-2">Profile</h1>
            <div className={`h-1 w-full bg-gradient-to-r ${
              isDark ? 'from-pink-500 to-cyan-400' : 'from-pink-400 to-cyan-500'
            } rounded-full`}></div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`absolute top-6 right-6 p-2 rounded-lg transition-colors ${
              isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
            } shadow-md`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Details Section */}
        <div className={`rounded-lg shadow-lg mb-8 ${
          isDark ? 'bg-[#1A1F2733]' : 'bg-white'
        }`}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6 border">Details</h2>
            
            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-md border transition-colors ${
                  isDark 
                    ? 'bg-[#5067910D] border-gray-600 focus:border-cyan-400 focus:ring-cyan-400' 
                    : 'bg-gray-100 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                } focus:ring-1 focus:outline-none`}
              />
            </div>

            {/* Organization Field */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Organization</label>
              <div className="flex items-center justify-between">
                <input
                  type="text"
                  name="organization"
                  value={formData.organization}
                  onChange={handleInputChange}
                  className={`flex-1 px-3 py-2 rounded-md border transition-colors ${
                    isDark 
                      ? 'bg-[#5067910D] border-gray-600 focus:border-cyan-400 focus:ring-cyan-400' 
                      : 'bg-gray-100 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                  } focus:ring-1 focus:outline-none mr-4`}
                />
                <span className={`text-xs px-2 py-1 rounded ${
                  isDark ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  {formData.organizationId}
                </span>
              </div>
            </div>

            {/* Role and API Key */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2">Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md border transition-colors ${
                    isDark 
                      ? 'bg-[#5067910D] border-gray-600 focus:border-cyan-400 focus:ring-cyan-400' 
                      : 'bg-gray-100 border-gray-300 focus:border-cyan-500 focus:ring-cyan-500'
                  } focus:ring-1 focus:outline-none`}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">API Key</label>
                <div className="relative">
                  <input
                    type="text"
                    value={showApiKey ? formData.apiKey : maskedApiKey}
                    readOnly
                    className={`w-full px-3 py-2 pr-10 rounded-md border transition-colors ${
                      isDark 
                        ? 'bg-[#5067910D] border-gray-600' 
                        : 'bg-gray-100 border-gray-300'
                    }`}
                  />
                  <button
                    onClick={toggleApiKeyVisibility}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 2FA Section */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium">2FA OTP</span>
                <span className={`text-sm px-2 py-1 rounded ${
                  twoFactorEnabled 
                    ? 'text-green-500 bg-green-100' 
                    : isDark 
                      ? 'text-red-400 bg-red-900/30' 
                      : 'text-red-500 bg-red-100'
                }`}>
                  {twoFactorEnabled ? 'Yes' : 'No'}
                </span>
                <button
                  onClick={toggleTwoFactor}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    twoFactorEnabled
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : 'bg-green-500 hover:bg-green-600 text-white'
                  }`}
                >
                  {twoFactorEnabled ? 'Disable 2FA OTP' : 'Activate 2FA OTP'}
                </button>
              </div>
            </div>

            {/* Save Changes Button */}
            <div className="text-center">
              <button
                onClick={handleSaveChanges}
                className="px-8 py-3 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-md font-medium hover:from-pink-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* User Settings Section */}
        <div className={`rounded-lg shadow-lg ${
          isDark ? 'bg-[#1A1F27]' : 'bg-white,border-grey-600'
        }`}>
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-6">User Settings</h2>
            
            {/* MISP Integration */}
            <div className="text-center">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-cyan-500 rounded-lg mb-4">
                  <div className="bg-white rounded p-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                      <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">MISP</h3>
                <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  Threat Sharing
                </p>
              </div>
              
              <button
                onClick={handleAddMISPAccount}
                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-md font-medium transition-colors duration-300 shadow-lg transform hover:scale-105"
              >
                + Add MISP Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}