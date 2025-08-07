import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Moon, Sun, X , ChevronDown} from "lucide-react";

import { useTheme } from "../../../context/ThemeContext";

const SearchOcrs = () => {
  // theme
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [resultsPerPage, setResultsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    tag1: "",
    tag2: "",
    tagSelect1: [],
  });
const [dropdownOpen, setDropdownOpen] = useState(true);

   const availableTags = [
    "auto-hsi-automatic-detection-base-64",
    "infoleak:automatic-detection-base-64",
    "text",
    "database",
    "automation",
    "prod",
    "dev",
    "staging",
    "security",
    "monitoring",
    "analytics",
  ]

  // Sample data with "test" replaced by "text"
  const [data] = useState([
    { id: 1, date: "2023/06/22", name: "org", action: "text" },
    { id: 2, date: "2023/06/22", name: "text", action: "text" },
    { id: 3, date: "2023/06/22", name: "text", action: "text" },
    { id: 4, date: "2023/06/22", name: "text", action: "text" },
    { id: 5, date: "2023/06/22", name: "text", action: "text" },
    { id: 6, date: "2023/06/22", name: "text", action: "text" },
    { id: 7, date: "2023/06/23", name: "org", action: "text" },
    { id: 8, date: "2023/06/23", name: "text", action: "text" },
    { id: 9, date: "2023/06/24", name: "text", action: "text" },
    { id: 10, date: "2023/06/25", name: "org", action: "text" },
    // Add more sample data for pagination
    ...Array.from({ length: 90 }, (_, i) => ({
      id: i + 11,
      date: `2023/0${Math.floor(Math.random() * 2) + 6}/${
        Math.floor(Math.random() * 28) + 1
      }`,
      name: Math.random() > 0.5 ? "text" : "org",
      action: "text",
    })),
  ]);

  // Filter and search data - search works independently and shows only matching items
  const filteredData = data.filter((item) => {
    // Search filter - if there's a search term, only show items that match by date
    const matchesSearch = !searchTerm || item.date.includes(searchTerm);

    // If search term exists and item doesn't match, exclude it completely
    if (searchTerm && !matchesSearch) return false;

    // Apply other filters
    const matchesTag1 = !filters.tag1 || item.date.includes(filters.tag1);
    const matchesTag2 = !filters.tag2 || item.date.includes(filters.tag2);
    const matchesTagSelect1 =
      filters.tagSelect1.length === 0 ||
      filters.tagSelect1.some(
        (tag) =>
          item.name.toLowerCase().includes(tag.toLowerCase()) ||
          item.action.toLowerCase().includes(tag.toLowerCase())
      );

    return matchesTag1 && matchesTag2 && matchesTagSelect1;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, resultsPerPage]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "tagSelect1") {
      // Handle multiple selection for tag dropdown
      setFilters((prev) => ({
        ...prev,
        [filterType]: prev.tagSelect1.includes(value)
          ? prev.tagSelect1.filter((tag) => tag !== value)
          : [...prev.tagSelect1, value],
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        [filterType]: value,
      }));
    }
  };

  const clearFilter = (filterType) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: filterType === "tagSelect1" ? [] : "",
    }));
  };

  const removeTagFromSelection = (tagToRemove) => {
    setFilters((prev) => ({
      ...prev,
      tagSelect1: prev.tagSelect1.filter((tag) => tag !== tagToRemove),
    }));
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, 5);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }

    return pages;
  };

  return (
    <div>
      <div>
        {/* Title */}
        <div className={`w-full pb-4 border-b border-transparent relative inline-block mt-12 mb-5 ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>
          <h1 className="text-md  flex justify-start ">
            Search Ocrs by Tags
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
          </h1>
        </div>

        {/* Filter Section */}
        <div
          className={`p-4 rounded-sm mb-3 ${
            darkMode
              ? "bg-slate-800/20 border-1 border-slate-600"
              : "bg-white shadow-sm"
          }`}
        >
          <h2 className={` mb-4 flex justify-start ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>Filter Items</h2>

          <div className="flex text-xs  justify-center items-center flex-col sm:flex-row gap-2 mb-2">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="yyyy-mm-dd"
                value={filters.tag1}
                onChange={(e) => handleFilterChange("tag1", e.target.value)}
                className={`w-full px-3 py-2 border rounded-sm pr-8 text-xs ${
                  darkMode
                    ? "border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-[#CBD5E1] text-gray-900 placeholder-gray-500"
                }`}
              />
              {filters.tag1 && (
                <button
                  onClick={() => clearFilter("tag1")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <span className="text-slate-600">-</span>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="yyyy-mm-dd"
                value={filters.tag2}
                onChange={(e) => handleFilterChange("tag2", e.target.value)}
                className={`w-full px-3 py-2 border rounded-sm pr-8 ${
                  darkMode
                    ? "border-slate-600 text-white placeholder-slate-400"
                    : "bg-white border-[#CBD5E1] text-gray-900 placeholder-gray-500"
                }`}
              />
              {filters.tag2 && (
                <button
                  onClick={() => clearFilter("tag2")}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

         <div className="mb-2">
  <div className="relative">
    {/* Custom Dropdown Wrapper */}
    <div className="relative">
      <select
        defaultValue=""
        onChange={(e) =>
          e.target.value && handleFilterChange("tagSelect1", e.target.value)
        }
        onClick={() => setDropdownOpen((prev) => !prev)}
        className={`w-full appearance-none px-3 py-2 border rounded-sm text-xs transition-all duration-300
          ${darkMode ? "border-slate-600 text-white " : "border-gray-300 text-gray-900"}
        `}
      >
        <option
          value=""
          disabled
          hidden
          className={darkMode ? "text-gray-400" : "text-gray-400"}
        >
          Select Tags
        </option>
        <option value="infoleak:automatic-detection-”base-64”" className={`${darkMode?"bg-[#1C2E42]":""}`}>
          infoleak:automatic-detection-”base-64”
        </option>
        <option value="text" className={`${darkMode?"bg-[#1C2E42]":""}`}>text</option>
        <option value="database" className={`${darkMode?"bg-[#1C2E42]":""}`}>database</option>
        <option value="automation" className={`${darkMode?"bg-[#1C2E42]":""}`}>automation</option>
        <option value="prod" className={`${darkMode?"bg-[#1C2E42]":""}`}>prod</option>
        <option value="dev" className={`${darkMode?"bg-[#1C2E42]":""}`}>dev</option>
        <option value="staging" className={`${darkMode?"bg-[#1C2E42]":""}`}>staging</option>
      </select>

      {/* Animated Arrow */}
      <ChevronDown
        className={`absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-transform duration-300 pointer-events-none
          ${dropdownOpen ? "rotate-180" : "rotate-0"}
          ${darkMode ? "text-gray-300" : "text-gray-600"}
        `}
      />
    </div>
  </div>

  {/* Selected Tags */}
  {filters.tagSelect1.length > 0 && (
    <div className="flex flex-wrap gap-2 mt-2">
      {filters.tagSelect1.map((tag) => (
        <span
          key={tag}
          className="inline-flex items-center px-3 py-1 rounded-sm text-sm bg-[#00ADB5] text-white"
        >
          {tag}
          <button
            onClick={() => removeTagFromSelection(tag)}
            className="ml-2 p-0.5 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 shadow-sm"
          >
            <X className="w-3 h-3" />
          </button>
        </span>
      ))}
    </div>
  )}
</div>

{/* Active Filter Tags */}
<div className="flex flex-wrap gap-2">
  {filters.tag1 && (
    <span className="inline-flex items-center px-3 py-1 rounded-sm text-sm bg-cyan-500 text-white">
      {filters.tag1}
      <button
        onClick={() => clearFilter("tag1")}
        className="ml-2 p-0.5 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 shadow-sm"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )}
  {filters.tag2 && (
    <span className="inline-flex items-center px-3 py-1 rounded-sm text-sm bg-cyan-500 text-white">
      {filters.tag2}
      <button
        onClick={() => clearFilter("tag2")}
        className="ml-2 p-0.5 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 shadow-sm"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  )}
</div>
        </div>

        {/* Search and Results Section */}
        <div
          className={`rounded-sm  ${
            darkMode
              ? "bg-slate-800/20 border-1 border-slate-600"
              : "bg-white shadow-sm"
          }`}
        >
          {/* Search Bar */}
          <div
            className={`p-4 border-b ${
              darkMode ? "border-slate-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search by date (e.g., 2023/06/22 or 06/22)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`px-3 py-2 border rounded-sm w-64 ${
                    darkMode
                      ? " border-slate-600 text-white placeholder-slate-400"
                      : "bg-white border-[#CBD5E1] text-gray-900 placeholder-gray-500"
                  }`}
                />
                {searchTerm && (
                  <span className="text-sm text-gray-500">
                    {filteredData.length} result
                    {filteredData.length !== 1 ? "s" : ""} found
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>Result per page:</span>
                <select
                  value={resultsPerPage}
                  onChange={(e) => setResultsPerPage(Number(e.target.value))}
                  className={` py-1 text-[#50B8E4] font-bold rounded-sm `}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table Header */}
          <div
            className={`px-4 py-3 border-b text-xs ${
              darkMode
                ? "text-white border-slate-700"
                : "border-gray-200 bg-gray-50"
            }`}
          >
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center cursor-pointer ">
                Date 
              </div>
              <div>Item</div>
              <div>Action</div>
            </div>
          </div>

          {/* Table Body */}
          <div className={`divide-y ${darkMode?"divide-slate-700":""}  text-xs`}>
            {currentData.length > 0 ? (
              currentData.map((item) => (
                <div
                  key={item.id}
                  className={`px-4 py-3  text-cyan-400 transition-colors ${darkMode? "hover:bg-slate-700":""}`}
                >
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-cyan-400">{item.date}</div>
                    <div>{item.name}</div>
                    <div className="text-cyan-400 cursor-pointer hover:underline">
                      {item.action}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? `No results found for "${searchTerm}"`
                  : "No results found"}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              className={`px-4 py-3 border-t flex items-center justify-center ${
                darkMode ? "border-slate-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <button
                  onClick={() => goToPage(1)}
                  disabled={currentPage === 1}
                  className={`px-2 py-1 text-sm rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#38BDF8] hover:bg-blue-50 dark:hover:bg-slate-700"
                  }`}
                >
                  First
                </button>

                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-1 rounded ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#38BDF8] hover:bg-blue-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {getPageNumbers().map((page) => (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`px-3 py-1 text-sm rounded ${
                      page === currentPage
                        ? "bg-[#38BDF8] text-white"
                        : "text-[#38BDF8] hover:bg-blue-50 dark:hover:bg-slate-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-1 rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#38BDF8] hover:bg-blue-50 dark:hover:bg-slate-700"
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => goToPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={`px-2 py-1 text-sm rounded ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-[#38BDF8] hover:bg-blue-50 dark:hover:bg-slate-700"
                  }`}
                >
                  Last
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOcrs;
