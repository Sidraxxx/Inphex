import { useState, useEffect } from 'react';
import { Eye, EyeOff, Moon, Sun, Check, X } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
const ChangePassword = () => {
  
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Toggle dark mode
  
//   const toggleDarkMode = () => {
//     setDarkMode(!darkMode);
//   };
   const { theme } = useTheme();
const darkMode = theme === "dark";

  // Password requirements
  const requirements = [
    { id: 'length', text: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { id: 'uppercase', text: 'One uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { id: 'lowercase', text: 'One lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { id: 'number', text: 'One number', test: (pwd) => /\d/.test(pwd) },
    { id: 'special', text: 'One special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ];

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (!requirements.every(req => req.test(formData.password))) {
      newErrors.password = 'Password does not meet requirements';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async () => {
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      alert('Password changed successfully!');
      setFormData({ password: '', confirmPassword: '' });
    } catch (error) {
      alert('Failed to change password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  

  return (
    <div className={`min-h-screen  transition-all duration-300  ${
      darkMode 
        ? '' 
        : ''
    }`}>
      {/* Theme Toggle */}
      
      <div className="flex items-center justify-center  px-2 py-2">
        <div className={`w-full transition-all duration-300 ${
          darkMode 
            ? '  ' 
            : ' '
        } rounded-2xl p-8`}>
          
          {/* Header */}
          <div className="mb-30">
            <h1 className={`text-2xl  font-bold mb-5 ${
              darkMode ? 'text-[#FFFFFF]/80' : 'text-gray-800'
            }`}>
              Change Password
            </h1>
            <div className={`h-1 w-full rounded-full bg-gradient-to-r ${
              darkMode 
                ? 'from-[#E47692] to-[#47CBE4]' 
                : 'from-[#E47692] to-[#47CBE4]'
            }`}></div>
          </div>
          
         <div className="flex justify-center">

          <div className="space-y-6 max-w-md w-full ">
            {/* Password Input */}
            <div>
              {/* <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }Password`}>
                
              </label> */}
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg  transition-all duration-200 ${
                    darkMode
                      ? 'bg-[#0E1116]/30  text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-slate-600'
                      : 'bg-[#B7B7B7]/10 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    darkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                  } ${errors.password ? 'border-red-500' : ''}`}
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              {/* <label className={`block text-sm font-medium mb-2 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Confirm Password
              </label> */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg  transition-all duration-200 ${
                    darkMode
                      ? 'bg-[#0E1116]/30  text-white placeholder-gray-400 focus:border-cyan-400 focus:bg-slate-600'
                      : 'bg-[#B7B7B7]/10  text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:bg-white'
                  } focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
                    darkMode ? 'focus:ring-cyan-400' : 'focus:ring-blue-500'
                  } ${errors.confirmPassword ? 'border-red-500' : ''}`}
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                    darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
              )}
            </div>

            {/* Password Requirements */}
            
         <div className="flex justify-center">
            <div className={`p-4 rounded-lg ${
              darkMode ? '' : ''
            }`}>

              <h3 className={`text-sm font-medium mb-3 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password Requirements
              </h3>
              <div className="space-y-2">
                {requirements.map((req) => {
                  const isValid = req.test(formData.password);
                  return (
                    <div key={req.id} className="flex items-center space-x-2">
                      <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
                        isValid
                          ? darkMode ? 'bg-green-500' : 'bg-green-500'
                          : darkMode ? 'bg-slate-600' : 'bg-gray-300'
                      }`}>
                        {isValid ? (
                          <Check className="w-3 h-3 text-white" />
                        ) : (
                          <X className="w-3 h-3 text-gray-500" />
                        )}
                      </div>
                      <span className={`text-sm ${
                        isValid
                          ? darkMode ? 'text-green-400' : 'text-green-600'
                          : darkMode ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {req.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all duration-300 ${
                isSubmitting
                  ? 'opacity-70 cursor-not-allowed'
                  : 'hover:shadow-lg transform hover:-translate-y-0.5'
              } bg-gradient-to-r ${
                darkMode 
                  ? 'from-[#E47692] to-[#47CBE4] hover:from-pink-600 hover:to-cyan-600' 
                  : 'from-[#E47692] to-[#47CBE4] hover:from-pink-600 hover:to-blue-600'
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Submitting...</span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;