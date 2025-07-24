import { useState, useMemo } from 'react';
import { Sun, Moon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const VanityExplorer = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sample data - in a real app, this would come from props or API
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
    const delta = 2;
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
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeClasses = {
    container: isDarkMode 
      ? 'min-h-screen bg-slate-900 text-white' 
      : 'min-h-screen bg-gray-50 text-gray-900',
    header: isDarkMode 
      ? 'bg-slate-800 border-b border-slate-700' 
      : 'bg-white border-b border-gray-200',
    table: isDarkMode 
      ? 'bg-slate-800 border border-slate-700' 
      : 'bg-white border border-gray-200',
    tableHeader: isDarkMode 
      ? 'bg-slate-700 text-slate-200' 
      : 'bg-gray-100 text-gray-700',
    tableRow: isDarkMode 
      ? 'border-b border-slate-700 hover:bg-slate-750' 
      : 'border-b border-gray-200 hover:bg-gray-50',
    pagination: isDarkMode 
      ? 'bg-slate-800 border-t border-slate-700' 
      : 'bg-white border-t border-gray-200',
    paginationButton: isDarkMode 
      ? 'text-slate-300 hover:text-white hover:bg-slate-700 disabled:text-slate-600 disabled:cursor-not-allowed' 
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed',
    activePageButton: isDarkMode 
      ? 'bg-blue-600 text-white' 
      : 'bg-blue-600 text-white',
    themeButton: isDarkMode 
      ? 'text-slate-300 hover:text-white hover:bg-slate-700' 
      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
  };

  return (
    <div className={themeClasses.container}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className={`${themeClasses.header} px-6 py-4 flex justify-between items-center`}>
          <h1 className="text-xl font-semibold">Vanity Explorer</h1>
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors ${themeClasses.themeButton}`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        {/* Table */}
        <div className="p-6">
          <div className={`${themeClasses.table} rounded-lg overflow-hidden shadow-sm`}>
            {/* Table Header */}
            <div className={`${themeClasses.tableHeader} px-6 py-3 grid grid-cols-3 gap-4 text-sm font-medium`}>
              <div className="flex items-center space-x-1">
                <span>Date</span>
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
              <div>Item</div>
              <div>Action</div>
            </div>

            {/* Table Body */}
            <div>
              {currentData.map((row, index) => (
                <div key={row.id} className={`${themeClasses.tableRow} px-6 py-4 grid grid-cols-3 gap-4 text-sm`}>
                  <div className="text-slate-400">{row.date}</div>
                  <div>{row.item}</div>
                  <div>{row.action}</div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className={`${themeClasses.pagination} px-6 py-4 flex items-center justify-center space-x-1`}>
              {/* First Page */}
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className={`p-2 rounded transition-colors ${themeClasses.paginationButton}`}
              >
                <ChevronsLeft size={16} />
              </button>

              {/* Previous Page */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`p-2 rounded transition-colors ${themeClasses.paginationButton}`}
              >
                <ChevronLeft size={16} />
              </button>

              {/* Page Numbers */}
              {getVisiblePageNumbers().map((pageNum, index) => (
                <div key={index}>
                  {pageNum === '...' ? (
                    <span className="px-3 py-2 text-sm text-slate-400">...</span>
                  ) : (
                    <button
                      onClick={() => goToPage(pageNum)}
                      className={`px-3 py-2 text-sm rounded transition-colors ${
                        currentPage === pageNum
                          ? themeClasses.activePageButton
                          : themeClasses.paginationButton
                      }`}
                    >
                      {pageNum}
                    </button>
                  )}
                </div>
              ))}

              {/* Next Page */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded transition-colors ${themeClasses.paginationButton}`}
              >
                <ChevronRight size={16} />
              </button>

              {/* Last Page */}
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded transition-colors ${themeClasses.paginationButton}`}
              >
                <ChevronsRight size={16} />
              </button>
            </div>
          </div>

          {/* Page Info */}
          <div className="mt-4 text-center text-sm text-slate-400">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sampleData.length)} of {sampleData.length} entries
          </div>
        </div>
      </div>
    </div>
  );
};

export default VanityExplorer;