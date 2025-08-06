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
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-[#1A1F27]' : 'bg-white'
    }`}>
      <div className="w-full p-6">
        {/* Header with Dark Mode Toggle */}
        <div className="flex justify-between items-center mb-8">
          <div className="w-full">
            <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>Profile</h1>
            <div className={`h-1 w-full bg-gradient-to-r ${
              isDark ? 'from-pink-500 to-cyan-400' : 'from-pink-400 to-cyan-500'
            } rounded-full`}></div>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`absolute top-6 right-6 p-2 rounded-lg transition-colors ${
              isDark ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-white hover:bg-gray-100 text-gray-900'
            } shadow-md`}
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>

        {/* Details Section */}
        <div className={`rounded-lg border shadow-lg mb-8 ${
          isDark ? 'bg-[#1A1F27] border-gray-800 ' : 'bg-white'
        }`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>Details</h2>
            
            {/* Email Field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-md  transition-colors ${
                  isDark 
                    ? 'bg-[#5067910D]  text-gray-400 focus:border-cyan-400 focus:ring-cyan-400' 
                    : 'bg-gray-100  text-[#00000099]/60 focus:border-cyan-500 focus:ring-cyan-500'
                } focus:ring-1 focus:outline-none`}
              />
            </div>

            {/* Organization Field - with ID inside the field */}
            <div className="mb-6">
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Organization</label>
              <div className={`relative px-3 py-2 rounded-md  flex items-center justify-between ${
                isDark 
                  ? 'bg-[#5067910D] ' 
                  : 'bg-gray-100 '
              }`}>
                <span className={`${isDark ? 'text-gray-400' : 'text-[#00000099]/60'}`}>
                  {formData.organization}
                </span>
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                  {formData.organizationId}
                </span>
              </div>
            </div>

            {/* Role and API Key - Adjusted widths */}
            <div className="grid grid-cols-12 gap-6 mb-6">
              <div className="col-span-4">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-700'}`}>Role</label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-md  transition-colors ${
                    isDark 
                      ? 'bg-[#5067910D] text-gray-400 focus:border-cyan-400 focus:ring-cyan-400' 
                      : 'bg-gray-100 text-[#00000099]/60 focus:border-cyan-500 focus:ring-cyan-500'
                  } focus:ring-1 focus:outline-none`}
                />
              </div>
              <div className="col-span-8">
                <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>API Key</label>
                <div className="relative">
                  <input
                    type="text"
                    value={showApiKey ? formData.apiKey : maskedApiKey}
                    readOnly
                    className={`w-full px-3 py-2 pr-10 rounded-md  transition-colors ${
                      isDark 
                        ? 'bg-[#5067910D] text-gray-400' 
                        : 'bg-gray-100 text-[#00000099]/60 '
                    }`}
                  />
                  <button
                    onClick={toggleApiKeyVisibility}
                    className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                      isDark ? 'text-gray-400 hover:text-white' : 'text-gray-900 hover:text-gray-700'
                    }`}
                  >
                    {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 2FA Section without background */}
            <div className="mb-8">
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${isDark ? 'text-white ' : 'text-gray-900  '}`}>2FA OTP</span>
                <span className={`text-sm px-3 py-1  font-medium ${
                  twoFactorEnabled 
                    ? 'text-green-500 bg-[#5067910D]' 
                    : 'text-red-500 bg-[#5067910D]'
                }`}>
                  {twoFactorEnabled ? 'Yes' : 'No'}
                </span>
                <button
                  onClick={toggleTwoFactor}
                  className={`px-4 py-2 rounded-sm text-sm font-medium transition-colors ${
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
                className="px-30 py-2 bg-gradient-to-r from-pink-500 to-cyan-400 text-white rounded-md font-medium hover:from-pink-600 hover:to-cyan-500 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>

        {/* User Settings Section */}
        <div className={`rounded-lg border shadow-lg ${
          isDark ? 'bg-[#1A1F27] border-gray-800 ' : 'bg-white'
        }`}>
          <div className="p-6">
            <h2 className={`text-lg font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>User Settings</h2>
            
            {/* MISP Integration */}
            <div className="flex-col  w-full items-center justify-center rounded-lg mb-4">
              <div className=" flex items-center justify-center mb-6">
                      <div ><img src="/Misp-logo.png" alt="Logo" /></div>
                
              </div>
              <div className=" flex items-center justify-center  ">

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
    </div>
  );
}