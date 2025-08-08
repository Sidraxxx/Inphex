import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

export default function AddOrganization() {
  
  const [formData, setFormData] = useState({
    url: '',
    name: '',
    description: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.url.trim() || !formData.name.trim() || !formData.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      alert('Organization added successfully!');
      setFormData({ url: '', name: '', description: '' });
      setIsSubmitting(false);
    }, 1000);
  };

 
  const { theme } = useTheme();
const darkMode = theme === "dark";

  return (
    <div className={`${theme}`}>
      
          
           <div className={`w-full pb-4 border-b border-transparent relative inline-block mt-12 mb-5 ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>
          <h1 className="text-md  flex justify-start ">
           Create Organization
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
          </h1>
        </div>

      
          
          {/* Form Container */}
          <div >
            
            {/* URL Field */}
            <div className="mb-2">
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-4 py-2 bg-[#0E11164D]/40 text-xs  rounded-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="URL"
                style={{ backgroundColor: darkMode ? '' : '#B7B7B71A' }}
              />
            </div>

            {/* Name Field */}
            <div className="mb-2">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 bg-[#0E11164D]/40 rounded-xs focus:outline-none focus:ring-1 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-xs"
                placeholder="Name"
                style={{ backgroundColor: darkMode ? '' : '#B7B7B71A' }}
              />
            </div>

            {/* Description Field */}
            <div className="mb-10">
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-4 bg-[#0E11164D]/40 dark:bg[#0E11164D]/30   rounded-xs focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-xs"
                placeholder="Description"
                style={{ backgroundColor: darkMode ? '' : '#B7B7B71A' }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
                <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-20 py-2 bg-gradient-to-r from-[#E47692] to-[#47CBE4] hover:from-[#df6180] hover:to-[#3ac9e6] text-white font-medium rounded-sm transition-all duration-200 shadow-sm text-sm"
            >
              Send To Spider
            </button>
          </div>
            </div>



          </div>
        
    </div>
  );
}