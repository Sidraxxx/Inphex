// import { useState, useEffect } from 'react';
// import { Sun, Moon, LogOut, Search, Trash2, RefreshCw } from 'lucide-react';

// export default function Settings() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [lacusUrl, setLacusUrl] = useState('https://localhost:7000');
//   const [tempLacusUrl, setTempLacusUrl] = useState('https://localhost:7000');
//   const [crawlerCount, setCrawlerCount] = useState(10);
//   const [tempCrawlerCount, setTempCrawlerCount] = useState(10);
//   const [searchQuery, setSearchQuery] = useState('');
  
//   // Connection states
//   const [lacusConnected, setLacusConnected] = useState(true);
//   const [crawlerReady, setCrawlerReady] = useState(true);
//   const [isTestRunning, setIsTestRunning] = useState(false);
  
//   // Edit states
//   const [isEditingUrl, setIsEditingUrl] = useState(false);
//   const [isEditingCount, setIsEditingCount] = useState(false);
  
//   // Loading states
//   const [isDeletingQueues, setIsDeletingQueues] = useState(false);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//     // Store theme preference in localStorage if needed
//     localStorage.setItem('darkMode', (!isDarkMode).toString());
//   };

//   // Load theme preference on mount
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('darkMode');
//     if (savedTheme !== null) {
//       setIsDarkMode(savedTheme === 'true');
//     }
//   }, []);

 

//   const handleEditUrl = () => {
//     if (isEditingUrl) {
//       // Save the URL
//       setLacusUrl(tempLacusUrl);
//       setIsEditingUrl(false);
//       // Test connection with new URL
//       testLacusConnection(tempLacusUrl);
//     } else {
//       // Enter edit mode
//       setTempLacusUrl(lacusUrl);
//       setIsEditingUrl(true);
//     }
//   };

//   const handleEditCount = () => {
//     if (isEditingCount) {
//       // Save the count
//       if (tempCrawlerCount > 0 && tempCrawlerCount <= 100) {
//         setCrawlerCount(tempCrawlerCount);
//         setIsEditingCount(false);
//       } else {
//         alert('Please enter a valid number between 1 and 100');
//       }
//     } else {
//       // Enter edit mode
//       setTempCrawlerCount(crawlerCount);
//       setIsEditingCount(true);
//     }
//   };

//   const testLacusConnection = async (url) => {
//     setLacusConnected(false);
//     try {
//       // Simulate API call to test connection
//       await new Promise(resolve => setTimeout(resolve, 2000));
//       // For demo purposes, randomly succeed/fail
//       const success = Math.random() > 0.3;
//       setLacusConnected(success);
//       if (!success) {
//         alert('Failed to connect to Lacus server. Please check the URL.');
//       }
//     } catch (error) {
//       setLacusConnected(false);
//       alert('Connection test failed: ' + error.message);
//     }
//   };

//   const handleDeleteQueues = async () => {
//     if (confirm('Are you sure you want to delete all Lacus queues? This action cannot be undone.')) {
//       setIsDeletingQueues(true);
//       try {
//         // Simulate API call to delete queues
//         await new Promise(resolve => setTimeout(resolve, 3000));
//         alert('Lacus queues deleted successfully');
//       } catch (error) {
//         alert('Failed to delete queues: ' + error.message);
//       } finally {
//         setIsDeletingQueues(false);
//       }
//     }
//   };

//   const handleRunTest = async () => {
//     setIsTestRunning(true);
//     setCrawlerReady(false);
//     try {
//       // Simulate running crawler test
//       await new Promise(resolve => setTimeout(resolve, 5000));
//       alert(`Test completed successfully with ${crawlerCount} concurrent crawlers`);
//       setCrawlerReady(true);
//     } catch (error) {
//       alert('Test failed: ' + error.message);
//       setCrawlerReady(true);
//     } finally {
//       setIsTestRunning(false);
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//     // Implement search functionality here
//     console.log('Searching for:', e.target.value);
//   };

//   const handleKeyPress = (e, action) => {
//     if (e.key === 'Enter') {
//       action();
//     } else if (e.key === 'Escape') {
//       // Cancel editing
//       if (isEditingUrl) {
//         setTempLacusUrl(lacusUrl);
//         setIsEditingUrl(false);
//       }
//       if (isEditingCount) {
//         setTempCrawlerCount(crawlerCount);
//         setIsEditingCount(false);
//       }
//     }
//   };

//   return (
//     <div className={`min-h-screen transition-colors duration-200 ${
//       isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
//     }`}>
     

//       <div className="p-6">
//         <h1 className={`text-2xl font-normal mb-8 ${
//           isDarkMode ? 'text-white' : 'text-gray-900'
//         }`}>
//           Settings
//         </h1>
//         <button
//             onClick={toggleTheme}
//             className={`p-2 rounded-lg transition-colors ${
//               isDarkMode 
//                 ? 'text-gray-300 hover:text-white' 
//                 : 'text-gray-600 hover:text-gray-900'
//             }`}
//             title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
//           >
//             {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
//           </button>

//         {/* All Lacus Crawler Section */}
//         <div className={`rounded-lg p-6 mb-4 ${
//           isDarkMode ? 'bg-gray-800' : 'bg-gray-700'
//         }`}>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-white text-lg font-medium">
//               All Lacus Crawler
//             </h2>
//             <div className="flex items-center gap-2">
//               <div className={`w-2 h-2 rounded-full ${
//                 lacusConnected ? 'bg-green-500' : 'bg-red-500'
//               }`}></div>
//               <span className={`text-sm font-medium ${
//                 lacusConnected ? 'text-green-400' : 'text-red-400'
//               }`}>
//                 {lacusConnected ? 'Connected' : 'Disconnected'}
//               </span>
//             </div>
//           </div>

          
//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <label className="text-gray-300 text-sm min-w-fit">
//                 Lacus URL
//               </label>
//               <div className="flex items-center gap-2 flex-1">
//                 <input
//                   type="text"
//                   value={isEditingUrl ? tempLacusUrl : lacusUrl}
//                   onChange={(e) => setTempLacusUrl(e.target.value)}
//                   onKeyDown={(e) => handleKeyPress(e, handleEditUrl)}
//                   className={`flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white' 
//                       : 'bg-gray-600 border-gray-500 text-white'
//                   } ${isEditingUrl ? 'ring-2 ring-blue-500' : ''}`}
//                   readOnly={!isEditingUrl}
//                   placeholder="Enter Lacus URL"
//                 />
//                 <button 
//                   onClick={handleEditUrl}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
//                 >
//                   {isEditingUrl ? 'Save' : 'Edit'}
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4">
//               <button 
//                 onClick={handleDeleteQueues}
//                 disabled={isDeletingQueues}
//                 className={`text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
//                   isDeletingQueues 
//                     ? 'bg-gray-500 cursor-not-allowed' 
//                     : 'bg-red-600 hover:bg-red-700'
//                 }`}
//               >
//                 {isDeletingQueues ? (
//                   <RefreshCw size={16} className="animate-spin" />
//                 ) : (
//                   <Trash2 size={16} />
//                 )}
//                 {isDeletingQueues ? 'Deleting...' : 'Delete Lacus Queues'}
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Crawler Section */}
//         <div className={`rounded-lg p-6 ${
//           isDarkMode ? 'bg-gray-800' : 'bg-gray-700'
//         }`}>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-white text-lg font-medium">
//               Crawler
//             </h2>
//             <div className="flex items-center gap-2">
//               <div className={`w-2 h-2 rounded-full ${
//                 isTestRunning ? 'bg-yellow-500' : crawlerReady ? 'bg-green-500' : 'bg-red-500'
//               }`}></div>
//               <span className={`text-sm font-medium ${
//                 isTestRunning ? 'text-yellow-400' : crawlerReady ? 'text-green-400' : 'text-red-400'
//               }`}>
//                 {isTestRunning ? 'Running' : crawlerReady ? 'Ready' : 'Not Ready'}
//               </span>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center gap-4">
//               <label className="text-gray-300 text-sm min-w-fit">
//                 No. of concurrent crawlers to launch :
//               </label>
//               <div className="flex items-center gap-2">
//                 <input
//                   type="number"
//                   min="1"
//                   max="100"
//                   value={isEditingCount ? tempCrawlerCount : crawlerCount}
//                   onChange={(e) => setTempCrawlerCount(parseInt(e.target.value) || 1)}
//                   onKeyDown={(e) => handleKeyPress(e, handleEditCount)}
//                   className={`w-16 px-2 py-2 border rounded text-sm text-center focus:outline-none focus:border-blue-500 ${
//                     isDarkMode 
//                       ? 'bg-gray-700 border-gray-600 text-white' 
//                       : 'bg-gray-600 border-gray-500 text-white'
//                   } ${isEditingCount ? 'ring-2 ring-blue-500' : ''}`}
//                   readOnly={!isEditingCount}
//                 />
//                 <button 
//                   onClick={handleEditCount}
//                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
//                 >
//                   {isEditingCount ? 'Save' : 'Edit'}
//                 </button>
//               </div>
//             </div>

//             <div className="mt-4">
//               <button 
//                 onClick={handleRunTest}
//                 disabled={isTestRunning || !lacusConnected}
//                 className={`text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
//                   isTestRunning || !lacusConnected
//                     ? 'bg-gray-500 cursor-not-allowed' 
//                     : 'bg-teal-600 hover:bg-teal-700'
//                 }`}
//                 title={!lacusConnected ? 'Connect to Lacus first' : ''}
//               >
//                 <RefreshCw size={16} className={isTestRunning ? 'animate-spin' : ''} />
//                 {isTestRunning ? 'Running Test...' : 'Run Test'}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from 'react';
import { Sun, Moon, LogOut, Search, Trash2, RefreshCw } from 'lucide-react';

export default function Settings() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [lacusUrl, setLacusUrl] = useState('https://localhost:7000');
  const [tempLacusUrl, setTempLacusUrl] = useState('https://localhost:7000');
  const [crawlerCount, setCrawlerCount] = useState(10);
  const [tempCrawlerCount, setTempCrawlerCount] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');

  const [lacusConnected, setLacusConnected] = useState(true);
  const [crawlerReady, setCrawlerReady] = useState(true);
  const [isTestRunning, setIsTestRunning] = useState(false);

  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [isEditingCount, setIsEditingCount] = useState(false);
  const [isDeletingQueues, setIsDeletingQueues] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem('darkMode', (!isDarkMode).toString());
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      setIsDarkMode(savedTheme === 'true');
    }
  }, []);

  const handleEditUrl = () => {
    if (isEditingUrl) {
      setLacusUrl(tempLacusUrl);
      setIsEditingUrl(false);
      testLacusConnection(tempLacusUrl);
    } else {
      setTempLacusUrl(lacusUrl);
      setIsEditingUrl(true);
    }
  };

  const handleEditCount = () => {
    if (isEditingCount) {
      if (tempCrawlerCount > 0 && tempCrawlerCount <= 100) {
        setCrawlerCount(tempCrawlerCount);
        setIsEditingCount(false);
      } else {
        alert('Please enter a valid number between 1 and 100');
      }
    } else {
      setTempCrawlerCount(crawlerCount);
      setIsEditingCount(true);
    }
  };

  const testLacusConnection = async (url) => {
    setLacusConnected(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const success = Math.random() > 0.3;
      setLacusConnected(success);
      if (!success) {
        alert('Failed to connect to Lacus server. Please check the URL.');
      }
    } catch (error) {
      setLacusConnected(false);
      alert('Connection test failed: ' + error.message);
    }
  };

  const handleDeleteQueues = async () => {
    if (confirm('Are you sure you want to delete all Lacus queues? This action cannot be undone.')) {
      setIsDeletingQueues(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 3000));
        alert('Lacus queues deleted successfully');
      } catch (error) {
        alert('Failed to delete queues: ' + error.message);
      } finally {
        setIsDeletingQueues(false);
      }
    }
  };

  const handleRunTest = async () => {
    setIsTestRunning(true);
    setCrawlerReady(false);
    try {
      await new Promise(resolve => setTimeout(resolve, 5000));
      alert(`Test completed successfully with ${crawlerCount} concurrent crawlers`);
      setCrawlerReady(true);
    } catch (error) {
      alert('Test failed: ' + error.message);
      setCrawlerReady(true);
    } finally {
      setIsTestRunning(false);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    console.log('Searching for:', e.target.value);
  };

  const handleKeyPress = (e, action) => {
    if (e.key === 'Enter') {
      action();
    } else if (e.key === 'Escape') {
      if (isEditingUrl) {
        setTempLacusUrl(lacusUrl);
        setIsEditingUrl(false);
      }
      if (isEditingCount) {
        setTempCrawlerCount(crawlerCount);
        setIsEditingCount(false);
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-200 ${
      isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>

      <div className="p-6">
        {/* Header with Dark Mode Toggle on Left */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <h1 className={`text-2xl font-normal ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Settings
            </h1>
          </div>
        </div>

        {/* Lacus Section */}
        <div className={`rounded-lg p-6 mb-4 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-700'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-medium">All Lacus Crawler</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                lacusConnected ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                lacusConnected ? 'text-green-400' : 'text-red-400'
              }`}>
                {lacusConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-300 text-sm min-w-fit">Lacus URL</label>
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={isEditingUrl ? tempLacusUrl : lacusUrl}
                  onChange={(e) => setTempLacusUrl(e.target.value)}
                  onKeyDown={(e) => handleKeyPress(e, handleEditUrl)}
                  className={`flex-1 px-3 py-2 border rounded text-sm focus:outline-none focus:border-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-600 border-gray-500 text-white'
                  } ${isEditingUrl ? 'ring-2 ring-blue-500' : ''}`}
                  readOnly={!isEditingUrl}
                  placeholder="Enter Lacus URL"
                />
                <button 
                  onClick={handleEditUrl}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  {isEditingUrl ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button 
                onClick={handleDeleteQueues}
                disabled={isDeletingQueues}
                className={`text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
                  isDeletingQueues ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                {isDeletingQueues ? (
                  <RefreshCw size={16} className="animate-spin" />
                ) : (
                  <Trash2 size={16} />
                )}
                {isDeletingQueues ? 'Deleting...' : 'Delete Lacus Queues'}
              </button>
            </div>
          </div>
        </div>

        {/* Crawler Section */}
        <div className={`rounded-lg p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-gray-700'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-white text-lg font-medium">Crawler</h2>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${
                isTestRunning ? 'bg-yellow-500' : crawlerReady ? 'bg-green-500' : 'bg-red-500'
              }`}></div>
              <span className={`text-sm font-medium ${
                isTestRunning ? 'text-yellow-400' : crawlerReady ? 'text-green-400' : 'text-red-400'
              }`}>
                {isTestRunning ? 'Running' : crawlerReady ? 'Ready' : 'Not Ready'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label className="text-gray-300 text-sm min-w-fit">
                No. of concurrent crawlers to launch :
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={isEditingCount ? tempCrawlerCount : crawlerCount}
                  onChange={(e) => setTempCrawlerCount(parseInt(e.target.value) || 1)}
                  onKeyDown={(e) => handleKeyPress(e, handleEditCount)}
                  className={`w-16 px-2 py-2 border rounded text-sm text-center focus:outline-none focus:border-blue-500 ${
                    isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-600 border-gray-500 text-white'
                  } ${isEditingCount ? 'ring-2 ring-blue-500' : ''}`}
                  readOnly={!isEditingCount}
                />
                <button 
                  onClick={handleEditCount}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  {isEditingCount ? 'Save' : 'Edit'}
                </button>
              </div>
            </div>

            <div className="mt-4">
              <button 
                onClick={handleRunTest}
                disabled={isTestRunning || !lacusConnected}
                className={`text-white px-4 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
                  isTestRunning || !lacusConnected
                    ? 'bg-gray-500 cursor-not-allowed' 
                    : 'bg-teal-600 hover:bg-teal-700'
                }`}
                title={!lacusConnected ? 'Connect to Lacus first' : ''}
              >
                <RefreshCw size={16} className={isTestRunning ? 'animate-spin' : ''} />
                {isTestRunning ? 'Running Test...' : 'Run Test'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
