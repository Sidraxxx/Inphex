import React, { useState } from 'react';
import { Calendar, Filter, Sun, Moon, ExternalLink, CheckCircle, XCircle } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const OnionExplorer = () => {
 
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
 const { theme } = useTheme();
const darkMode = theme === "dark";
  const handleFilter = () => {
    setIsFiltered(true);
    setShowCards(true);
  };

  const shouldBlur = blurLevel > 0;
  const shouldShowCards = showCards && isFiltered;

  const WebsiteCard = ({ website, blurLevel }) => (
    <div className={`relative rounded-lg  ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      {/* Website Preview */}
      <div className="relative h-48 bg-gray-200 dark:bg-gray-300">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 opacity-20"></div>
        <div
          className="absolute inset-4 rounded "
          style={{
            filter: `blur(${blurLevel * 0.1}px)`,
            opacity: Math.max(0.3, 1 - blurLevel / 100),
            transition: 'filter 0.3s ease, opacity 0.3s ease',
          }}
        >
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
      <div className={`p-4 ${darkMode ? 'bg-[#0E1116]/20' : 'bg-gray-50'}`}>
        <div className="flex items-center gap-2 mb-2">
          <Calendar className="w-4 h-4 text-gray-400 " />
          <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
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
              darkMode ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            {website.url}
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>

        <div className="space-y-1">
          <div className={`text-xs ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
            {website.description}
          </div>
          <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            {website.subdescription}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? ' text-white' : ' text-gray-900'
    }`}>
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
            <h1 className="text-xl sm:text-2xl font-bold">Filter Onion Domains</h1>
            
          </div>
          <div className={`h-0.5 w-full ${ darkMode? 'bg-gradient-to-r from-[#F46D89]  to-cyan-400' : 'bg-gradient-to-r from-[#F46D89]  to-cyan-400'}`}></div>
        </div>

        {/* Filter Section */}
        <div className={`p-4 sm:p-6 rounded-lg mb-6 ${
          darkMode ? 'bg-[#0E1116]/20' : 'bg-white'
        } shadow-lg`}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h2 className="text-base sm:text-lg font-semibold">Filter Domains by Date Range</h2>
            <button 
              onClick={handleFilter}
              className=" bg-gradient-to-r from-[#F46D89]  to-[#3BD2EB]
               hover:bg-pink-600 text-white px-4 sm:px-6 py-2 rounded-md transition-colors flex items-center justify-center gap-2 text-sm font-medium w-full sm:w-auto"
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
                  darkMode 
                    ? 'bg-[#3F4A5B] border-gray-600 text-white' 
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
                  darkMode 
                    ? 'bg-[#3F4A5B] border-gray-600 text-white' 
                    : 'bg-white border-gray-300 text-gray-900'
                }`}
                placeholder="yyyy-mm-dd"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
  {/* Domains UP Toggle */}
  <label className="flex items-center gap-2 cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        checked={domainsUp}
        onChange={(e) => setDomainsUp(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          domainsUp ? 'bg-green-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            domainsUp ? 'translate-x-4' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
    <span>⬆️ Domains UP</span>
  </label>

  {/* Domains DOWN Toggle */}
  <label className="flex items-center gap-2 cursor-pointer">
    <div className="relative">
      <input
        type="checkbox"
        checked={domainsDown}
        onChange={(e) => setDomainsDown(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-10 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
          domainsDown ? 'bg-blue-500' :darkMode ? 'bg-gray-600' : 'bg-gray-300'
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
            domainsDown ? 'translate-x-4' : 'translate-x-0'
          }`}
        ></div>
      </div>
    </div>
    <span>⬇️ Domains DOWN</span>
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
            {sampleWebsites.map((website) => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        ) : (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {!isFiltered ? 'Click "Filter" button to show domains.' : 'No domains match the current filter criteria.'}
          </div>
        )}

        {shouldShowCards && filteredWebsites.length === 0 && (
          <div className={`text-center py-12 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            No domains match the current filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default OnionExplorer;