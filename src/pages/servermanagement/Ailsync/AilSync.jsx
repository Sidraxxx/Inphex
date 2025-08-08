import { useState } from 'react';
import { Search, ChevronDown,Copy, Check,ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const AilSync = () => {
  const [searchTerm1, setSearchTerm1] = useState('');
  const [searchTerm2, setSearchTerm2] = useState('');
  const [currentPage1, setCurrentPage1] = useState(1);
  const [currentPage2, setCurrentPage2] = useState(1);
  const [itemsPerPage1, setItemsPerPage1] = useState(6);
  const [itemsPerPage2, setItemsPerPage2] = useState(6);
   const [copied, setCopied] = useState(false);
  const uuid = "3bec7fe0e8e-0d42e07e60953-95e7b8df1a42fe2e";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(uuid);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }
  // Sample data matching the images
  const ailSyncData = [
    { date: '2023/06/22', item: 'org', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    // Add more data for pagination demonstration
    ...Array.from({ length: 100 }, (_, i) => ({
      date: `202${3 + Math.floor(i / 20)}/0${(i % 12) + 1}/2${2 + (i % 8)}`,
      item: i % 4 === 0 ? 'org' : 'text',
      action: 'text'
    }))
  ];

  const remoteSyncData = [
    { date: '2023/06/22', item: 'org', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    { date: '2023/06/22', item: 'text', action: 'text' },
    // Add more data for pagination demonstration
    ...Array.from({ length: 80 }, (_, i) => ({
      date: `202${3 + Math.floor(i / 15)}/0${(i % 12) + 1}/2${2 + (i % 8)}`,
      item: i % 5 === 0 ? 'org' : 'text',
      action: 'text'
    }))
  ];

 

  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter(item => 
      item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.action.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const paginateData = (data, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return data.slice(startIndex, startIndex + itemsPerPage);
  };

  const getTotalPages = (data, itemsPerPage) => {
    return Math.ceil(data.length / itemsPerPage);
  };

  const Dropdown = ({ value, onChange, options }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`flex items-center px-2 py-1 text-xs ${
            darkMode 
              ? 'text-gray-300 hover:text-white' 
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          {value}
          <ChevronDown className="w-3 h-3 ml-1" />
        </button>
        {isOpen && (
          <div className={`absolute right-0 mt-1 rounded border shadow-lg z-10 min-w-[60px] ${
            darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'
          }`}>
            {options.map((option) => (
              <button
                key={option}
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className={`block w-full px-3 py-2 text-left text-xs hover:${
                  darkMode ? 'bg-slate-600' : 'bg-gray-100'
                } ${darkMode ? 'text-white' : 'text-gray-700'}`}
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
    const getPageNumbers = () => {
      const pages = [];
      const maxVisiblePages = 7;
      let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
      let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

      if (endPage - startPage < maxVisiblePages - 1) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      return pages;
    };

    return (
      <div className={`flex items-center justify-center space-x-1 py-4 text-xs ${
        darkMode ? 'text-gray-300 ' : 'text-gray-600 '
      }`}>
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className={`px-2 py-1  ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50 '
              : 'hover:text-blue-400'
          }`}
        >
          « First
        </button>

        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 py-1 ${
            currentPage === 1
              ? 'cursor-not-allowed opacity-50 '
              : 'hover:text-blue-400'
          }`}
        >
          Back
        </button>

        <div className="flex items-center space-x-1">
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 py-1 rounded ${
                page === currentPage
                  ? 'bg-blue-500 text-white'
                  : 'hover:text-blue-400'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 ${
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:text-blue-400'
          }`}
        >
          Next
        </button>

        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className={`px-2 py-1 ${
            currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:text-blue-400'
          }`}
        >
          Last »
        </button>

        <div className="flex items-center space-x-1 ml-4">
          <Dropdown
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            options={[6,10,25, 50, 100]}
          />
        </div>
      </div>
    );
  };

  const DataTable = ({ 
    title, 
    data, 
    currentPage, 
    setCurrentPage, 
    itemsPerPage, 
    setItemsPerPage,
    searchTerm,
    setSearchTerm 
  }) => {
    const filteredData = filterData(data, searchTerm);
    const paginatedData = paginateData(filteredData, currentPage, itemsPerPage);
    const totalPages = getTotalPages(filteredData, itemsPerPage);

    return (
      <div className="mb-8">
        <div className={`mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <h3 className="text-sm font-medium">{title}</h3>
        </div>

        {/* <div className={`mb-4 ${
          isDarkMode ? 'bg-[#2C3440]' : 'bg-[#1E293B]'
        } px-4 py-3 rounded-t`}>
          <div className="relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded border ${
                isDarkMode 
                  ? 'bg-[#2C34401A] border-slate-500 text-white placeholder-gray-400' 
                  : 'bg-[#1E293B] border-[#566A88] text-gray-900 placeholder-gray-500'
              } focus:outline-none focus:ring-1 focus:ring-blue-500`}
            />
          </div>
        </div> */}

        <div className={`rounded-b ${darkMode ? 'bg-[#2C3440]/20' : 'bg-white border border-gray-200'}`}>
          <table className="w-full">
            <thead className={`${darkMode ? 'bg-[#2C3440]' : 'bg-gray-50'}`}>
              <tr className={`border-b ${darkMode ? 'border-slate-600' : 'border-gray-200'}`}>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Date ↓
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Item
                </th>
                <th className={`px-6 py-3 text-left text-xs font-medium ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, index) => (
                <tr
                  key={index}
                  className={`border-b ${
                    darkMode 
                      ? 'border-slate-600 hover:bg-slate-700' 
                      : 'border-gray-100 hover:bg-gray-50'
                  }`}
                >
                  <td className={`px-6 py-4 text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {row.date}
                  </td>
                  <td className={`px-6 py-4 text-sm ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {row.item}
                  </td>
                  <td className={`px-6 py-4 text-sm ${
                    darkMode ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {row.action}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={setItemsPerPage}
          />
        </div>
      </div>
    );
  };

   const { theme } = useTheme();
const darkMode = theme === "dark";
  return (
    <div >
     
        {/* Header */}
       {/* Title */}
        <div className={`w-full pb-4 border-b border-transparent relative inline-block mt-12 mb-5 ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>
          <h1 className="text-md  flex justify-start ">
           AIl Sync
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
          </h1>
        </div>

        {/* UUID Section */}
        {/* <div className="mb-8 flex items-center justify-center space-x-4">
          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            AIL UUID
          </span>
          <span className={`text-sm font-mono ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            3bec7fe0e8e-0d42e07e60953-95e7b8df1a42fe2e
          </span>
          <span   className="px-2 py-1 bg-blue-500 text-white text-xs rounded font-medium">
            AIL
          </span>
        </div> */}
        <div className={`mb-8 flex items-center justify-center space-x-4 ${darkMode ? '' : ''}`}>
      <div >
        <div className=" flex items-center space-x-4 p-4">
          {/* AIL UUID Label */}
          <span className={`text-sm font-medium ${
            darkMode ? 'text-[#C9C9C9]' : 'text-[#000000]'
          }`}>
            AIL UUID
          </span>
       
            <div className={`space-x-4 p-2 rounded-sm px-3${
            darkMode ? 'bg-[#0E1116]/40' : 'bg-[#F4F9FF] border border-[#E2F0FF]'
          }`}>
          {/* UUID Value */}
          <span className={`text-sm font-mono space-x-4 select-all ${
            darkMode ? 'text-gray-600 ' : 'text-[#525252]'
          }`}>
            {uuid}
          </span>
          
          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className={`p-2 rounded transition-all space-x-4 duration-200 ${
              darkMode 
                ? 'bg-gradient-to-r from-[#F46D89]  to-cyan-400  text-white hover:text-white' 
                : 'bg-gradient-to-r from-[#F46D89]  to-cyan-400 text-white hover:text-gray-900'
            }`}
            title="Copy UUID"
          >
            {copied ? (
              <Check size={16} className="text-green-500" />
            ) : (
              <Copy size={16} />
            )}
          </button>
          </div>
          {/* AIL Badge */}
          {/* <span className="px-3 py-1 bg-blue-500 text-white text-xs rounded-md font-medium">
            AIL
          </span> */}
        </div>
      </div>
    </div>

        {/* Data Tables */}
        <div>
          <DataTable
            title="Connected - AIL Sync"
            data={ailSyncData}
            currentPage={currentPage1}
            setCurrentPage={setCurrentPage1}
            itemsPerPage={itemsPerPage1}
            setItemsPerPage={setItemsPerPage1}
            searchTerm={searchTerm1}
            setSearchTerm={setSearchTerm1}
          />

          <DataTable
            title="Connected - Remote Sync"
            data={remoteSyncData}
            currentPage={currentPage2}
            setCurrentPage={setCurrentPage2}
            itemsPerPage={itemsPerPage2}
            setItemsPerPage={setItemsPerPage2}
            searchTerm={searchTerm2}
            setSearchTerm={setSearchTerm2}
          />
        </div>
      </div>
   
  );
};

export default AilSync;