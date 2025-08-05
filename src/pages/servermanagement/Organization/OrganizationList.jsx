import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Sun, Moon } from 'lucide-react';

export default function OrganizationList() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState(2);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ item: '', action: '' });
  
  const totalPages = 25;
  
  const [data, setData] = useState([
    { id: 1, date: '2025/08/22', item: '.org', action: 'text' },
    { id: 2, date: '2025/08/22', item: 'text', action: 'text' },
    { id: 3, date: '2025/08/22', item: 'text', action: 'text' },
    { id: 4, date: '2025/08/22', item: 'text', action: 'text' },
    { id: 5, date: '2025/08/22', item: 'text', action: 'text' },
    { id: 6, date: '2025/08/22', item: 'text', action: 'text' },
  ]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleOrganizationList = () => {
    setShowAddForm(true);
  };

  const handleSubmit = () => {
    if (newItem.item.trim() && newItem.action.trim()) {
      const newEntry = {
        id: data.length + 1,
        date: new Date().toISOString().split('T')[0].replace(/-/g, '/').replace(/(\d{4})\/(\d{2})\/(\d{2})/, '$1/$3/$2'),
        item: newItem.item,
        action: newItem.action
      };
      setData([...data, newEntry]);
      setNewItem({ item: '', action: '' });
      setShowAddForm(false);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setNewItem({ item: '', action: '' });
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const theme = darkMode ? 'dark' : '';

  return (
    <div className={`${theme}`}>
      <div className="min-h-screen bg-gray-100 dark:bg-[#1A1F27] text-gray-900 dark:text-white transition-all duration-300">
        
        {/* Add Form Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-lg w-96 max-w-md mx-4 shadow-xl">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Add New Organization</h2>
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Item</label>
                  <input
                    type="text"
                    value={newItem.item}
                    onChange={(e) => setNewItem({ ...newItem, item: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                    placeholder="Enter item"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Action</label>
                  <input
                    type="text"
                    value={newItem.action}
                    onChange={(e) => setNewItem({ ...newItem, action: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-600 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 dark:focus:ring-cyan-400"
                    placeholder="Enter action"
                  />
                </div>
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-md hover:bg-gray-50 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-md transition-colors"
                  >
                    Add Entry
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Container */}
        <div className="bg-white dark:bg-slate-900 min-h-screen">
          {/* Header */}
          <div className="flex justify-between items-center p-6 pb-4">
            <h1 className="text-xl font-medium text-gray-900 dark:text-white">Organization List</h1>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-300"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>

          {/* Gradient Line */}
          <div className="mx-6 h-1 bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 mb-0"></div>
          
          {/* Table Container */}
          <div className="mx-6 bg-white dark:bg-slate-900">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-6 px-6 py-4 border-b border-gray-200 dark:border-slate-700">
              <div className="flex items-center space-x-1">
                <span className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Date</span>
                <ChevronDown className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Item</div>
              <div className="text-sm font-medium text-cyan-600 dark:text-cyan-400">Action</div>
            </div>

            {/* Table Body */}
            <div>
              {data.map((row, index) => (
                <div key={row.id} className="grid grid-cols-3 gap-6 px-6 py-4 border-b border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="text-sm text-gray-600 dark:text-gray-400">{row.date}</div>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{row.item}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{row.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center py-8 space-x-1">
            <button
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              First
            </button>
            
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </button>

            {/* Page Numbers */}
            <button
              onClick={() => goToPage(1)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              1
            </button>

            <button
              onClick={() => goToPage(2)}
              className="px-3 py-2 text-sm bg-cyan-600 dark:bg-cyan-500 text-white rounded transition-colors"
            >
              2
            </button>

            <button
              onClick={() => goToPage(3)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              3
            </button>

            <button
              onClick={() => goToPage(4)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              4
            </button>

            <span className="px-3 py-2 text-sm text-gray-500 dark:text-gray-500">...</span>

            <button
              onClick={() => goToPage(25)}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              25
            </button>

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center"
            >
              Last
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>

          {/* Add Organization Button */}
          <div className="flex justify-center pb-8">
            
          </div>
        </div>
      </div>
    </div>
  );
}