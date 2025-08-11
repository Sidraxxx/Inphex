import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Sun, Moon } from 'lucide-react';
import { useTheme } from "../../../context/ThemeContext";
  



const VanityExplorer = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";  
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

  return (
    <div className={`${isDark ? 'bg-transparent' : 'bg-white'}`}>
      <div className="py-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className={`text-xl font-medium ${isDark ? 'text-white' : 'text-black'}`}>
              Vanity Explorer
            </h1>

          </div>
          
          {/* Gradient separator line */}
        <div className=" inset-0 bg-gradient-to-r from-[#ff0080] to-[#00bfff] h-1 rounded-md"></div>

        </div>

        {/* Table Container */}
        <div className={`${isDark ? 'bg-transparent border-slate-700' : 'bg-white border-gray-200'} border border-[#2C34401A] rounded-lg overflow-hidden`}>
          {/* Table Header */}
          <div className={isDark ? 'bg-[#2C344033] text-[#50B8E4]' : 'bg-[#1E293B] text-[#50B8E4]'}>
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
          <div className={`divide-y ${isDark ? 'divide-slate-700 bg-[#2C34401A]' : 'divide-gray-100 bg-[#2C34400A]'}`}>
            {currentData.map((row, index) => (
              <div key={row.id} className={`grid grid-cols-3 gap-4 px-6 py-3.5 text-sm ${
                isDark 
                  ? ' hover:bg-slate-750' 
                  : ' hover:bg-gray-100'
              }`}>
                <div className={isDark ? 'text-[#94A3B8]' : ' text-[#475569]'}>{row.date}</div>
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}>{row.item}</div>
                <div className={isDark ? 'text-[#94A3B8]' : 'text-[#475569]'}>{row.action}</div>
              </div>
            ))}
          </div>

          {/* Pagination */}
<div className={`${isDark ? 'bg-transparent border-slate-700' : 'bg-[#2C34400A] border-gray-100'} border-t px-6 py-4`}>
  <div className="flex items-center justify-center space-x-1 text-xs">
    
    {/* First Page */}
    <button
      onClick={goToFirstPage}
      disabled={currentPage === 1}
      className={`flex items-center gap-1 px-2 py-1 transition-colors border rounded ${
        isDark 
          ? 'text-slate-400 border-[#25313F] hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
          : 'bg-white text-gray-400 border-gray-300 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
      }`}
      title="First"
    >
      <ChevronsLeft size={14} /> First
    </button>

    {/* Previous Page */}
    <button
      onClick={goToPreviousPage}
      disabled={currentPage === 1}
      className={`flex items-center gap-1 px-2 py-1 transition-colors border rounded ${
        isDark 
          ? 'text-slate-400 border-[#25313F] hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
          : 'bg-white text-gray-400 border-gray-300 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
      }`}
      title="Back"
    >
      <ChevronLeft size={14} /> Prev
    </button>

    {/* Page Numbers */}
    <div className="flex items-center space-x-1 mx-4">
      {getVisiblePageNumbers().map((pageNum, index) => (
        <div key={index}>
          {pageNum === '...' ? (
            <span className={`px-2 py-1 text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>...</span>
          ) : (
            <button
              onClick={() => goToPage(pageNum)}
              className={`min-w-[32px] h-8 px-3 text-sm rounded transition-colors ${
                currentPage === pageNum
                  ? 'bg-blue-500 text-white'
                  : isDark 
                    ? 'text-slate-300 border border-[#25313F] hover:bg-slate-700 hover:text-white'
                    : 'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
      className={`flex items-center gap-1 px-2 py-1 transition-colors border rounded ${
        isDark 
          ? 'text-slate-400 border-[#25313F] hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
          : 'bg-white text-gray-400 border-gray-300 hover:text-gray-600 disabled:text-gray-300 disabled:cursor-not-allowed'
      }`}
      title="Next"
    >
      Next <ChevronRight size={14} />
    </button>

    {/* Last Page */}
    <button
      onClick={goToLastPage}
      disabled={currentPage === totalPages}
      className={`flex items-center gap-1 px-2 py-1 transition-colors border rounded ${
        isDark 
          ? 'text-slate-400 border-[#25313F] hover:text-white disabled:text-slate-600 disabled:cursor-not-allowed' 
          : 'bg-white border-gray-100 text-gray-400  hover:text-gray-600  disabled:text-gray-300 disabled:cursor-not-allowed'
      }`}
      title="Last"
    >
      Last <ChevronsRight size={14} />
    </button>

  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default VanityExplorer;