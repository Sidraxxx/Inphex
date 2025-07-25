import React, { useState, useRef } from 'react';
import { Plus, Trash2, Upload, Moon, Sun, ChevronDown } from 'lucide-react';

const AddCookieJar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [taskDescription, setTaskDescription] = useState('');
  const [viewLevel, setViewLevel] = useState('Global');
  const [cookies, setCookies] = useState([
    { id: 1, name: '', value: '' },
    { id: 2, name: '', value: '' }
  ]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const fileInputRef = useRef(null);

  const viewLevelOptions = [
    'Global',
    'Organizational',
    'Project',
    'Personal',
    'Team',
    'Department'
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file) => {
    setUploadedFile(file);
    // Here you would typically process the file
    console.log('File uploaded:', file.name);
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const addCookie = () => {
    const newCookie = {
      id: Date.now(),
      name: '',
      value: ''
    };
    setCookies([...cookies, newCookie]);
  };

  const deleteCookie = (id) => {
    setCookies(cookies.filter(cookie => cookie.id !== id));
  };

  const updateCookie = (id, field, value) => {
    setCookies(cookies.map(cookie => 
      cookie.id === id ? { ...cookie, [field]: value } : cookie
    ));
  };

  const handleSendToSpider = () => {
    const cookieData = {
      taskDescription,
      viewLevel,
      cookies: cookies.filter(cookie => cookie.name || cookie.value),
      uploadedFile: uploadedFile?.name
    };
    console.log('Sending to Spider:', cookieData);
    // Here you would send the data to your backend
  };

  const themeClasses = darkMode 
    ? 'bg-gray-900 text-white' 
    : 'bg-white text-gray-900';

  const cardClasses = darkMode 
    ? 'bg-gray-800 border-gray-700' 
    : 'bg-gray-50 border-gray-200';

  const inputClasses = darkMode 
    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500' 
    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500';

  return (
    <div className={`min-h-screen transition-all duration-300 ${themeClasses}`}>
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-bold">Create CookieJar</h1>
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <div className={`h-0.5 mt-2 bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 w-full`} />
        </div>

        {/* Task Description */}
        <div className="mb-6">
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            placeholder="Task Description (optional)"
            className={`w-full h-20 py-2 px-3 rounded border transition-colors resize-none ${inputClasses}`}
          />
        </div>

        {/* View Level and Dropdowns */}
        <div className="mb-6">
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium">View Level</span>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className={`w-48 py-2 px-3 rounded border text-left flex items-center justify-between transition-colors ${inputClasses}`}
              >
                <span className="text-sm">{viewLevel}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {dropdownOpen && (
                <div className={`absolute top-full left-0 w-48 mt-1 rounded border shadow-lg z-10 ${cardClasses}`}>
                  {viewLevelOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => {
                        setViewLevel(option);
                        setDropdownOpen(false);
                      }}
                      className={`w-full py-2 px-3 text-left text-sm hover:bg-opacity-50 transition-colors ${
                        darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                      } ${option === viewLevel ? (darkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Import Cookies Section */}
        <div className={`p-6 rounded-lg border mb-6 ${cardClasses}`}>
          <h3 className="font-semibold mb-4">Import Cookies</h3>
          
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
              dragActive 
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
                : darkMode 
                  ? 'border-gray-600 hover:border-gray-500' 
                  : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-8 h-8 mx-auto mb-3 text-gray-500" />
            <p className="text-lg font-medium mb-2">UPLOAD FILE</p>
            <p className="text-sm text-gray-500 mb-4">Drag and Drop here</p>
            
            {uploadedFile && (
              <div className="mb-4 p-2 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300">
                File uploaded: {uploadedFile.name}
              </div>
            )}
            
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Select file
            </button>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
              accept=".json,.txt,.csv"
            />
          </div>
        </div>

        {/* Create Cookies Section */}
        <div className={`p-6 rounded-lg border mb-6 ${cardClasses}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold">Create Cookies</h3>
            <button
              onClick={addCookie}
              className="w-8 h-8 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {cookies.map((cookie, index) => (
              <div key={cookie.id} className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  placeholder="Cookie Name"
                  value={cookie.name}
                  onChange={(e) => updateCookie(cookie.id, 'name', e.target.value)}
                  className={`flex-1 py-2 px-3 rounded border transition-colors ${inputClasses}`}
                />
                <input
                  type="text"
                  placeholder="Cookie Value"
                  value={cookie.value}
                  onChange={(e) => updateCookie(cookie.id, 'value', e.target.value)}
                  className={`flex-1 py-2 px-3 rounded border transition-colors ${inputClasses}`}
                />
                <button
                  onClick={() => deleteCookie(cookie.id)}
                  className={`py-2 px-3 rounded transition-colors flex-shrink-0 ${
                    darkMode 
                      ? 'bg-red-500 hover:bg-red-600 text-white' 
                      : 'bg-white hover:bg-gray-100 text-red-500 border border-gray-300'
                  }`}
                  disabled={cookies.length <= 1}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Send to Spider Button */}
        <div className="text-center">
          <button
            onClick={handleSendToSpider}
            className="px-8 py-3 bg-gradient-to-r from-pink-500 to-blue-500 hover:from-pink-600 hover:to-blue-600 text-white rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg"
          >
            Send To Spider
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Upload cookie files or create custom cookies for your web scraping tasks</p>
        </div>
      </div>

      {/* Click outside to close dropdown */}
      {dropdownOpen && (
        <div 
          className="fixed inset-0 z-0" 
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default AddCookieJar;