import React, { useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function AddOrganization() {
  const [darkMode, setDarkMode] = useState(true);
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

  const theme = darkMode ? 'dark' : '';

  return (
    <div className={`${theme}`}>
      <div className="min-h-screen bg-gray-100 dark:bg#1A1F27] text-gray-900 dark:text-white transition-all duration-300">
        
        {/* Main Container */}
        <div className="bg-white dark:bg-slate-900 min-h-screen">
          
          {/* Header */}
          <div className="flex justify-between items-center px-8 py-6">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white">Add Organization</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Gradient Line */}
          <div className="mx-8 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 mb-12"></div>
          
          {/* Form Container */}
          <div className="max-w-7xl mx-auto px-8" >
            
            {/* URL Field */}
            <div className="mb-4">
              <input
                type="url"
                value={formData.url}
                onChange={(e) => handleInputChange('url', e.target.value)}
                className="w-full px-4 py-4 bg-[#0E11164D]/30 dark:bg-[#0E11164D]/30  rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                placeholder="URL"
                style={{ backgroundColor: darkMode ? '' : '#B7B7B71A' }}
              />
            </div>

            {/* Name Field */}
            <div className="mb-4">
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-4 bg-[#0E11164D]/30 dark:bg[#0E11164D]/30   rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-base"
                placeholder="Name"
                style={{ backgroundColor: darkMode ? '' : '#B7B7B71A' }}
              />
            </div>

            {/* Description Field */}
            <div className="mb-9">
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className="w-full px-4 py-4 bg-[#0E11164D]/30 dark:bg[#0E11164D]/30   rounded-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none text-base"
                placeholder="Description"
                style={{ backgroundColor: darkMode ? '' : '#B7B7B71A' }}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`px-16 py-3 w-90 rounded-sm text-white font-medium transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed ${
                  isSubmitting 
                    ? 'bg-gray-400 dark:bg-gray-600' 
                    : 'bg-gradient-to-r from-pink-500 to-cyan-500 hover:from-pink-600 hover:to-cyan-600'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2">
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
}