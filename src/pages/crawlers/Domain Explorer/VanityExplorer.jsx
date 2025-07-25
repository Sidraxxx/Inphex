import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Sun, Moon } from 'lucide-react';

const VanityExplorer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data matching the image
  const sampleData = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    date: '2025/06/22',
    item: i === 0 ? 'org' : 'text',
    action: 'text'
  }));

  const totalPages = Math.ceil(sampleData.length / itemsPerPage);
  
  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sampleData.slice(startIndex, startIndex + itemsPerPage);
  }, [currentPage, sampleData]);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => goToPage(currentPage - 1);
  const goToNextPage = () => goToPage(currentPage + 1);

  const getVisiblePageNumbers = () => {
    const delta = 1;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      if (totalPages > 1) rangeWithDots.push(totalPages);
    }

    return rangeWithDots.filter((item, index, arr) => arr.indexOf(item) === index);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-xl font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Vanity Explorer
            </h1>
            
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-gray-300 hover:text-white hover:bg-slate-700' 
                  : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          
          {/* Gradient separator line */}
          <div className="h-0.5 bg-gradient-to-r  from-pink-500 to-blue-500  w-full" />
        </div>

        {/* Table Container */}
        <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200'} border rounded-lg overflow-hidden shadow-sm`}>
          {/* Table Header */}
          <div className={isDarkMode ? 'bg-slate-700 text-white' : 'bg-slate-700 text-white'}>
            <div className="grid grid-cols-3 gap-4 px-6 py-3">
              <div className="flex items-center space-x-1 text-sm font-medium">
                <span>Date</span>
                <ChevronDown size={14} className="text-gray-300" />
              </div>
              <div className="text-sm font-medium">Item</div>
              <div className="text-sm font-medium">Action</div>
            </div>
          </div>

          {/* Table Body */}
          <div className={`divide-y ${isDarkMode ? 'divide-slate-700' : 'divide-gray-100'}`}>
            {currentData.map((row, index) => (
              <div key={row.id} className={`grid grid-cols-3 gap-4 px-6 py-3.5 text-sm ${
                isDarkMode 
                  ? 'bg-slate-800 hover:bg-slate-750' 
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}>
                <div className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{row.date}</div>
                <div className={isDarkMode ? 'text-slate-200' : 'text-gray-900'}>{row.item}</div>
                <div className={isDarkMode ? 'text-slate-200' : 'text-gray-900'}>{row.action}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className={`${isDarkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-100'} border-t px-6 py-4`}>
            <div className="flex items-center justify-center space-x-1">
              {/* First Page */}
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className={`p-1.5 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
                    : 'text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
                }`}
                title="First"
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Previous Page */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-1.5 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
                    : 'text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
                }`}
                title="Back"
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Numbers */}
              <div className="flex items-center space-x-1 mx-4">
                {getVisiblePageNumbers().map((pageNum, index) => (
                  <div key={index}>
                    {pageNum === '...' ? (
                      <span className={`px-2 py-1 text-sm ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>...</span>
                    ) : (
                      <button
                        onClick={() => goToPage(pageNum)}
                        className={`min-w-[32px] h-8 px-3 text-sm rounded transition-colors ${
                          currentPage === pageNum
                            ? 'bg-blue-500 text-white'
                            : isDarkMode 
                              ? 'text-slate-300 hover:bg-slate-700 hover:text-white'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Next Page */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-1.5 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
                    : 'text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
                }`}
                title="Next"
              >
                <ChevronRight size={16} />
              </button>

              {/* Last Page */}
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className={`p-1.5 transition-colors ${
                  isDarkMode 
                    ? 'text-slate-400 hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
                    : 'text-gray-400 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
                }`}
                title="Last"
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanityExplorer;