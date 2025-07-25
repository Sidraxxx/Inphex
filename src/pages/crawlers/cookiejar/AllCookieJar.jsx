import { useState, useEffect, useRef } from 'react';
import { Sun, Moon, Search, ChevronDown } from 'lucide-react';

const AllCookieJar = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Sample data for all three sections
  const yourCookieJar = [
    { date: '2025/06/22', item: 'org', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/21', item: 'item1', action: 'create' },
    { date: '2025/06/21', item: 'item2', action: 'update' },
    { date: '2025/06/20', item: 'item3', action: 'delete' },
    { date: '2025/06/20', item: 'item4', action: 'view' },
    { date: '2025/06/19', item: 'item5', action: 'edit' },
    { date: '2025/06/19', item: 'item6', action: 'share' },
    { date: '2025/06/18', item: 'item7', action: 'copy' },
  ];

  const organizationCookieJar = [
    { date: '2025/06/22', item: 'org', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/21', item: 'org-item1', action: 'approve' },
    { date: '2025/06/21', item: 'org-item2', action: 'reject' },
    { date: '2025/06/20', item: 'org-item3', action: 'review' },
  ];

  const globalCookieJar = [
    { date: '2025/06/22', item: 'org', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/22', item: 'text', action: 'text' },
    { date: '2025/06/21', item: 'global-item1', action: 'bookmark' },
    { date: '2025/06/21', item: 'global-item2', action: 'favorite' },
    { date: '2025/06/20', item: 'global-item3', action: 'archive' },
    { date: '2025/06/20', item: 'global-item4', action: 'tag' },
    { date: '2025/06/19', item: 'global-item5', action: 'note' },
    { date: '2025/06/19', item: 'global-item6', action: 'remind' },
  ];

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const CookieSection = ({ title, data, sectionPage, setSectionPage }) => {
    const [itemsPerPage, setItemsPerPage] = useState(6);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    
    const itemsPerPageOptions = [6, 10, 25, 50, 100];

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, []);
    const handleItemsPerPageChange = (newItemsPerPage) => {
      setItemsPerPage(newItemsPerPage);
      setSectionPage(1); // Reset to first page when changing items per page
      setDropdownOpen(false);
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const startIndex = (sectionPage - 1) * itemsPerPage;
    const currentData = data.slice(startIndex, startIndex + itemsPerPage);

    // Generate pagination numbers
    const generatePaginationNumbers = () => {
      const pages = [];
      const maxVisiblePages = 5;
      
      if (totalPages <= maxVisiblePages) {
        // Show all pages if total is small
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // Show smart pagination
        if (sectionPage <= 3) {
          // Show first few pages
          for (let i = 1; i <= 4; i++) {
            pages.push(i);
          }
          pages.push('...');
          pages.push(totalPages);
        } else if (sectionPage >= totalPages - 2) {
          // Show last few pages
          pages.push(1);
          pages.push('...');
          for (let i = totalPages - 3; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          // Show middle pages
          pages.push(1);
          pages.push('...');
          pages.push(sectionPage - 1);
          pages.push(sectionPage);
          pages.push(sectionPage + 1);
          pages.push('...');
          pages.push(totalPages);
        }
      }
      
      return pages;
    };

    const paginationNumbers = generatePaginationNumbers();

    return (
      <div className="mb-8">
        {/* Section Title */}
        <h3 className={`text-sm font-normal mb-4 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
          {title}
        </h3>
        
        {/* Search Bar */}
        <div className={`${darkMode ? 'bg-slate-700' : 'bg-gray-700'} px-4 py-3 flex justify-between items-center`}>
          <div className="flex items-center flex-1">
            <Search size={16} className="text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="bg-transparent text-white placeholder-gray-400 text-sm outline-none flex-1"
            />
          </div>
          <div className="flex items-center text-white text-sm">
            <span className="mr-2">Result per page:</span>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center bg-transparent hover:bg-gray-600 px-2 py-1 rounded transition-colors"
              >
                <span className="mr-1">{itemsPerPage}</span>
                <ChevronDown size={16} className={`transform transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropdownOpen && (
                <div className={`absolute right-0 top-full mt-1 ${darkMode ? 'bg-slate-600' : 'bg-gray-600'} rounded shadow-lg z-10 min-w-[80px]`}>
                  {itemsPerPageOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => handleItemsPerPageChange(option)}
                      className={`block w-full text-left px-3 py-2 text-sm text-white hover:${darkMode ? 'bg-slate-500' : 'bg-gray-500'} transition-colors ${
                        option === itemsPerPage ? `${darkMode ? 'bg-slate-500' : 'bg-gray-500'}` : ''
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Table */}
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
          {/* Column Headers */}
          <div className={`grid grid-cols-3 ${darkMode ? 'bg-slate-800' : 'bg-white'} py-3 border-b ${darkMode ? 'border-slate-700' : 'border-gray-300'}`}>
            <div className={`px-4 text-sm font-normal ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Date ↓
            </div>
            <div className={`px-4 text-sm font-normal ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Item
            </div>
            <div className={`px-4 text-sm font-normal ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
              Action
            </div>
          </div>
          
          {/* Data Rows */}
          {currentData.map((row, index) => (
            <div key={index} className={`grid grid-cols-3 py-3 border-b ${darkMode ? 'border-slate-700' : 'border-gray-200'} ${
              darkMode ? 'bg-slate-800' :'bg-gray-50 hover:bg-gray-200'
            }`}>
              <div className={`px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {row.date}
              </div>
              <div className={`px-4 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                {row.item}
              </div>
              <div className={`px-4 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                {row.action}
              </div>
            </div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className={`${darkMode ? 'bg-slate-800' : 'bg-white'} px-4 py-4 flex justify-center items-center gap-2 border-t ${darkMode ? 'border-slate-700' : 'border-gray-200'}`}>
          <button
            onClick={() => setSectionPage(1)}
            disabled={sectionPage === 1}
            className={`px-2 py-1 text-sm ${
              sectionPage === 1
                ? `${darkMode ? 'text-slate-600' : 'text-gray-400'} cursor-not-allowed`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} cursor-pointer`
            }`}
          >
            « First
          </button>
          <button
            onClick={() => setSectionPage(Math.max(1, sectionPage - 1))}
            disabled={sectionPage === 1}
            className={`px-2 py-1 text-sm ${
              sectionPage === 1
                ? `${darkMode ? 'text-slate-600' : 'text-gray-400'} cursor-not-allowed`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} cursor-pointer`
            }`}
          >
            ‹ Back
          </button>
          
          {/* Dynamic pagination numbers */}
          {paginationNumbers.map((pageNum, index) => (
            <span key={index}>
              {pageNum === '...' ? (
                <span className={`px-2 py-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  ...
                </span>
              ) : pageNum === sectionPage ? (
                <span className={`px-3 py-1 text-sm ${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-400 text-white'} rounded`}>
                  {pageNum}
                </span>
              ) : (
                <button
                  onClick={() => setSectionPage(pageNum)}
                  className={`px-2 py-1 text-sm ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} cursor-pointer`}
                >
                  {pageNum}
                </button>
              )}
            </span>
          ))}
          
          <button
            onClick={() => setSectionPage(Math.min(totalPages, sectionPage + 1))}
            disabled={sectionPage === totalPages}
            className={`px-2 py-1 text-sm ${
              sectionPage === totalPages
                ? `${darkMode ? 'text-slate-600' : 'text-gray-400'} cursor-not-allowed`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} cursor-pointer`
            }`}
          >
            Next ›
          </button>
          <button
            onClick={() => setSectionPage(totalPages)}
            disabled={sectionPage === totalPages}
            className={`px-2 py-1 text-sm ${
              sectionPage === totalPages
                ? `${darkMode ? 'text-slate-600' : 'text-gray-400'} cursor-not-allowed`
                : `${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} cursor-pointer`
            }`}
          >
            Last »
          </button>
        </div>
      </div>
    );
  };

  const [yourPage, setYourPage] = useState(1);
  const [organizationPage, setOrganizationPage] = useState(1);
  const [globalPage, setGlobalPage] = useState(1);

  return (
    <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-xl font-normal ${darkMode ? 'text-white' : 'text-gray-800'}`}>
            Create CookieJar
          </h1>
          <button
            onClick={toggleDarkMode}
            className={`p-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-slate-700 text-yellow-400 hover:bg-slate-600' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
        
        {/* Separator Line */}
        <div className={`h-0.5 mt-2 bg-gradient-to-r from-pink-500 to-blue-500 transition-all duration-300 w-full mb-8 `} />

        {/* Cookie Sections */}
        <CookieSection 
          title="Your CookieJar" 
          data={yourCookieJar} 
          sectionPage={yourPage}
          setSectionPage={setYourPage}
        />
        
        <CookieSection 
          title="Organization CookieJar" 
          data={organizationCookieJar} 
          sectionPage={organizationPage}
          setSectionPage={setOrganizationPage}
        />
        
        <CookieSection 
          title="Global CookieJar" 
          data={globalCookieJar} 
          sectionPage={globalPage}
          setSectionPage={setGlobalPage}
        />
      </div>
    </div>
  );
};

export default AllCookieJar;