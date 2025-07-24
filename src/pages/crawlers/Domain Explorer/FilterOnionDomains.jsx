import React, { useState } from 'react';
import { Calendar, Filter, Sun, Moon, ExternalLink, CheckCircle, XCircle } from 'lucide-react';

const FilterOnionDomains = () => {
  const [isDark, setIsDark] = useState(true);
  const [blurLevel, setBlurLevel] = useState(50);
  const [startDate, setStartDate] = useState('2025-06-11');
  const [endDate, setEndDate] = useState('2025-06-11');
  const [domainsUp, setDomainsUp] = useState(true);
  const [domainsDown, setDomainsDown] = useState(true);
  const [showCards, setShowCards] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  const sampleWebsites = [
    {
      id: 1,
      url: 'https://www.figma.com/design/ke8QZ5YQxuuf2SUtRvShz/Cards-Component---Community-Profile',
      status: 'up',
      date: '2025/06/11 - 2025/06/11',
      description: 'intrude-automatic-detection-"gap-public-keyblock"',
      subdescription: 'intrude-automatic-detection-"own"',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 2,
      url: 'https://www.figma.com/design/ke8QZ5YQxuuf2SUtRvShz/Cards-Component---Community-Profile',
      status: 'up',
      date: '2025/06/11 - 2025/06/11',
      description: 'intrude-automatic-detection-"gap-public-keyblock"',
      subdescription: 'intrude-automatic-detection-"own"',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 3,
      url: 'https://www.figma.com/design/ke8QZ5YQxuuf2SUtRvShz/Cards-Component---Community-Profile',
      status: 'up',
      date: '2025/06/11 - 2025/06/11',
      description: 'intrude-automatic-detection-"gap-public-keyblock"',
      subdescription: 'intrude-automatic-detection-"own"',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 4,
      url: 'https://darkweb-marketplace.onion/shop/electronics',
      status: 'down',
      date: '2025/06/10 - 2025/06/11',
      description: 'marketplace-automatic-detection-"gap-public-keyblock"',
      subdescription: 'marketplace-automatic-detection-"down"',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 5,
      url: 'https://secure-forum.onion/community/tech',
      status: 'up',
      date: '2025/06/09 - 2025/06/11',
      description: 'forum-automatic-detection-"gap-public-keyblock"',
      subdescription: 'forum-automatic-detection-"active"',
      preview: '/api/placeholder/300/200'
    },
    {
      id: 6,
      url: 'https://privacy-tools.onion/encryption/guide',
      status: 'down',
      date: '2025/06/08 - 2025/06/11',
      description: 'tools-automatic-detection-"gap-public-keyblock"',
      subdescription: 'tools-automatic-detection-"offline"',
      preview: '/api/placeholder/300/200'
    }
  ];

  const filteredWebsites = sampleWebsites.filter(site => {
    if (!domainsUp && site.status === 'up') return false;
    if (!domainsDown && site.status === 'down') return false;
    return true;
  });

  const handleFilter = () => {
    setIsFiltered(true);
    setShowCards(true);
  };

  const shouldBlur = blurLevel > 0;
  const shouldShowCards = showCards && isFiltered;

  const WebsiteCard = ({ website }) => (
    <div className={`relative rounded-lg overflow-hidden ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      {/* Website Preview */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
        <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded shadow-sm">
          <div className="p-3 space-y-2">
            <div className="flex gap-2">
              <div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
              <div className="w-16 h-12 bg-orange-400 rounded"></div>
              <div className="w-16 h-12 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
            <div className="flex gap-2">
              <div className="w-16 h-12 bg-red-500 rounded"></div>
              <div className="w-16 h-12 bg-blue-400 rounded"></div>
              <div className="w-16 h-12 bg-purple-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Section */}
      <div className={`p-4 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {website.date}
          </span>
          <div className="ml-auto flex items-center gap-1">
            {website.status === 'up' ? (
              <CheckCircle className="w-4 h-4 text-green-500" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-xs font-medium ${
              website.status === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {website.status.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="mb-3">
          <a 
            href={website.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`text-sm break-all hover:underline flex items-center gap-1 ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            {website.url}
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>

        <div className="space-y-1">
          <div className={`text-xs ${isDark ? 'text-green-400' : 'text-green-600'}`}>
            {website.description}
          </div>
          <div className={`text-xs ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {website.subdescription}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <h1 className="text-xl sm:text-2xl font-bold">Filter Onion Domains</h1>
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 rounded-lg transition-colors self-start sm:self-auto ${
                isDark ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
          <div className={`h-0.5 w-full ${isDark ? 'bg-gradient-to-r from-pink-500 via-blue-500 to-cyan-400' : 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500'}`}></div>
        </div>

        {/* Filter Section */}
        <div className={`p-4 sm:p-6 rounded-lg mb-6 ${
          isDark ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-base sm:text-lg font-semibold">Filter Domains by Date Range</h2>
            <button 
              onClick={handleFilter}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 sm:px-6 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm font-medium w-full sm:w-auto"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-6">
            <div>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className={`w-full p-3 rounded border text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="yyyy-mm-dd"
              />
            </div>
            
            <div className="flex items-center">
              <span className="hidden sm:block mx-4 text-gray-500">—</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className={`w-full p-3 rounded border text-sm ${
                  isDark 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="yyyy-mm-dd"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={domainsUp}
                  onChange={(e) => setDomainsUp(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                  domainsUp 
                    ? 'bg-green-500 border-green-500' 
                    : isDark ? 'border-gray-500' : 'border-gray-400'
                }`}>
                  {domainsUp && (
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  )}
                </div>
              </div>
              <span className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                Domains UP
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={domainsDown}
                  onChange={(e) => setDomainsDown(e.target.checked)}
                  className="sr-only"
                />
                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer transition-colors ${
                  domainsDown 
                    ? 'bg-blue-500 border-blue-500' 
                    : isDark ? 'border-gray-500' : 'border-gray-400'
                }`}>
                  {domainsDown && (
                    <div className="w-2 h-2 bg-white rounded-sm"></div>
                  )}
                </div>
              </div>
              <span className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Domains DOWN
              </span>
            </label>
          </div>
        </div>

        {/* Blur Control */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span className="text-sm font-medium">Hide</span>
            <div className="flex-1 max-w-xs">
              <input
                type="range"
                min="0"
                max="100"
                value={blurLevel}
                onChange={(e) => setBlurLevel(e.target.value)}
                className="w-full h-2 bg-blue-500 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${blurLevel}%, #e5e7eb ${blurLevel}%, #e5e7eb 100%)`
                }}
              />
            </div>
            <span className="text-sm">{blurLevel}%</span>
          </div>
        </div>

        {/* Website Cards Grid */}
        {shouldShowCards ? (
          <div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            style={{
              filter: shouldBlur ? `blur(${blurLevel * 0.1}px)` : 'none',
              opacity: shouldBlur ? Math.max(0.3, 1 - (blurLevel / 100)) : 1,
              transition: 'filter 0.3s ease, opacity 0.3s ease'
            }}
          >
            {filteredWebsites.map((website) => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {!isFiltered ? 'Click "Filter" button to show domains.' : 'No domains match the current filter criteria.'}
          </div>
        )}

        {shouldShowCards && filteredWebsites.length === 0 && (
          <div className={`text-center py-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            No domains match the current filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterOnionDomains;