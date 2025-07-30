import React, { useState } from 'react';
import { Sun, Moon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Schedulers = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // Generate sample data for schedulers
  const generateSchedulerData = () => {
    const items = ['org', 'text', 'html', 'php', 'js', 'css', 'json', 'xml'];
    const actions = ['text', 'process', 'crawl', 'index', 'scan'];
    const data = [];
    
    for (let i = 1; i <= 47; i++) {
      data.push({
        id: i,
        date: `2025/06/${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        item: items[Math.floor(Math.random() * items.length)],
        action: actions[Math.floor(Math.random() * actions.length)]
      });
    }
    return data;
  };

  const [schedulerData] = useState(generateSchedulerData());

  const itemsPerPage = 6;
  const totalPages = Math.ceil(schedulerData.length / itemsPerPage);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Pagination functions
  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return schedulerData.slice(startIndex, endIndex);
  };

  const renderPaginationNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const themeClasses = isDarkMode 
    ? 'bg-[#1A1F27] text-white' 
    : 'bg-gray-50 text-gray-900';

  const tableHeaderClasses = isDarkMode 
    ? 'bg-[#2C3440]/20 text-white' 
    : 'bg-[#1E293B] text-white';

  const tableRowClasses = isDarkMode 
    ? 'bg-[#232A34]/20 border-gray-700 hover:bg-gray-750' 
    : 'bg-white border-gray-200 hover:bg-gray-50';

  const cardClasses = isDarkMode 
    ? ' border-gray-700' 
    : 'bg-white border-gray-300';

  return (
    <div className={`min-h-screen ${themeClasses} transition-colors duration-200`}>
      {/* Header */}
      <header className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} p-4`}>
        <div className="flex items-center justify-between max-w-6xl mx-auto">
           <div className="w-full mb-2 font-medium   pb-4 border-b border-transparent relative inline-block">
  <h1 className="text-2xl  flex justify-start">
    Schedulers
    
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
  </h1>
  
</div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border ${isDarkMode ? 'border-gray-600 hover:bg-gray-700' : 'border-gray-300 hover:bg-gray-100'} transition-colors`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>
     

      <div className="max-w-6xl mx-auto p-6 ">
        {/* Schedulers Section */}
        <div className="mb-6">
          <h2 className="text-lg font-medium mb-4">Schedulers</h2>
          
          {/* Table */}
          <div className={`${cardClasses} rounded-lg border overflow-hidden `}>
            {/* Table Header */}
            <div className={`${tableHeaderClasses} px-6 py-3  `}>
              <div className="grid grid-cols-3 gap-4 text-[#0070ff]">
                <div className="flex items-center space-x-1">
                  <span className="text-sm font-medium">Date</span>
                  <span className="text-xs">↓</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Item</span>
                </div>
                <div>
                  <span className="text-sm font-medium">Action</span>
                </div>
              </div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {getCurrentPageData().map((item, index) => (
                <div 
                  key={item.id} 
                  className={`${tableRowClasses} transition-colors duration-150`}
                >
                  <div className="grid grid-cols-3 gap-4 px-6 py-4">
                    <div className="text-sm text-[black] dark:text-blue-400">
                      {item.date}
                    </div>
                    <div className="text-sm">
                      {item.item}
                    </div>
                    <div className="text-sm">
                      {item.action}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={`${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-50 border-gray-200'} border-t px-6 py-4`}>
              <div className="flex items-center justify-center space-x-2">
                {/* First Page */}
                <button 
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className={`p-1 rounded transition-colors ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>

                {/* First Text */}
                <button 
                  onClick={goToFirstPage}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  First
                </button>

                {/* Previous Page */}
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`p-1 rounded transition-colors ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Back Text */}
                <button 
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    currentPage === 1 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  Back
                </button>

                {/* Page Numbers */}
                {renderPaginationNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 text-sm rounded transition-colors ${
                      currentPage === page 
                        ? 'bg-blue-500 text-white' 
                        : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                {/* Show ellipsis and last page if needed */}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-gray-400">...</span>
                    <button
                      onClick={() => goToPage(totalPages)}
                      className={`px-3 py-1 text-sm rounded transition-colors ${
                        currentPage === totalPages 
                          ? 'bg-blue-500 text-white' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700'
                      }`}
                    >
                      {totalPages}
                    </button>
                  </>
                )}

                {/* Next Text */}
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  Next
                </button>

                {/* Next Page */}
                <button 
                  onClick={goToNextPage}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded transition-colors ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Last Text */}
                <button 
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 text-sm rounded transition-colors ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  Last
                </button>

                {/* Last Page */}
                <button 
                  onClick={goToLastPage}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded transition-colors ${
                    currentPage === totalPages 
                      ? 'text-gray-400 cursor-not-allowed' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400'
                  }`}
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>

              {/* Page Info */}
              <div className="mt-3 text-center">
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  Page {currentPage} of {totalPages} ({schedulerData.length} total items)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedulers;