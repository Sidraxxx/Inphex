import { useState } from 'react';
import { RefreshCw, Home, GitBranch, GitCommit, ExternalLink } from 'lucide-react';

const ServerStatus = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const StatusCard = ({ title, subtitle, icon: Icon, iconColor, hasUpdate = false, isWarning = false }) => (
    <div className={`
      relative rounded-lg p-4 flex items-center justify-between
      ${isDarkMode 
        ? 'bg-[#0E11164D]/30 text-white' 
        : 'bg-[#232A34] text-white'
      }
    `}>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-300'}`}>
          {subtitle}
        </p>
        {hasUpdate && (
          <div className="flex items-center mt-1">
            <div className={`w-2 h-2 rounded-full mr-2 ${isWarning ? 'bg-[#EB5757]' : 'bg-[#EEC84E]'}`}></div>
            <span className={`text-xs ${isWarning ? 'text-red-400' : 'text-yellow-400'}`}>
              {isWarning ? 'New Version Available!' : 'New Update Available!'}
            </span>
          </div>
        )}
      </div>
      <div className='rounded-full bg-[#BB6BD9]/40 p-2'>
<Icon className={`w-6 h-6  ${iconColor}`} />
      </div>
      
    </div>
  );

  const AlertBox = ({ type, title, message, linkText, onLinkClick }) => {
    const bgColor = type === 'version' 
      ? (isDarkMode ? 'bg-[#8F1A1933] ' : 'bg-[#E38F8F78]')
      : (isDarkMode ? 'bg-[#EEC84E33] ' : 'bg-[#EEC84E52] ');
    
    const textColor = type === 'version'
      ? (isDarkMode ? 'text-red-500' : 'text-red-800')
      : (isDarkMode ? 'text-yellow-300' : 'text-yellow-800');

    return (
      <div className={`rounded-lg p-4  ${bgColor}`}>
        <h4 className={`font-semibold mb-2 ${textColor}`}>
          {title}
        </h4>
        <p className={`text-sm mb-2 ${ type === 'version'
          ? (isDarkMode ? 'text-black-500' : 'text-black-800')
      : (isDarkMode ? 'text-black-300' : 'text-black-800')
        }`}>
          {message}
        </p>
        <button 
          onClick={onLinkClick}
          className={`text-sm underline hover:no-underline ${
            type === 'version' 
              ? (isDarkMode ? 'text-blue-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800')
              : (isDarkMode ? 'text-blue-400 hover:text-blue-600' : 'text-blue-600 hover:text-blue-800')
          }`}
        >
          {linkText}
        </button>
      </div>
    );
  };

  const handleReleaseNotesClick = () => {
    console.log('Opening release notes...');
  };

  const handleCommitContentClick = () => {
    console.log('Opening commit content...');
  };

  return (
    <div className={`min-h-screen p-6 transition-colors duration-200 ${
      isDarkMode ? 'bg-[#1A1F27]' : 'bg-gray-50'
    }`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            AIL Framework Status
          </h1>
          <button
            onClick={toggleTheme}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode 
                ? 'bg-slate-600 hover:bg-slate-500 text-white' 
                : 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300'
            }`}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
         
        {/* Header Line */}
        <div className={`w-full mb-6 h-0.5 bg-gradient-to-r  from-pink-500 to-blue-500  ${
          isDarkMode ? 'bg-slate-600' : 'bg-gray-300'
        }`}></div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatusCard
            title="Master"
            subtitle="AIL Version"
            icon={RefreshCw}
            iconColor={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
          />
          
          <StatusCard
            title="v6.1"
            subtitle="Current Tag"
            icon={Home}
            iconColor={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
            hasUpdate={true}
            isWarning={true}
          />
          
          <StatusCard
            title="Master"
            subtitle="Current Branch"
            icon={GitBranch}
            iconColor={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
          />
        </div>

        {/* Commit ID Card */}
        <div className="mb-6">
          <StatusCard
            title="3bec7fe0e8e0d42e07e60953956e7b8df1a42fe2e"
            subtitle="Current Commit ID"
            icon={GitCommit}
            iconColor={isDarkMode ? 'text-purple-400' : 'text-purple-600'}
            hasUpdate={true}
          />
        </div>

        {/* Alert Boxes */}
        <div className="space-y-3">
          <AlertBox
            type="version"
            title="New Version Available!"
            message="A new version is available. New version: v6.2"
            linkText="Check last release notes"
            onLinkClick={handleReleaseNotesClick}
          />
          
          <AlertBox
            type="update"
            title="New Update Available!"
            message="A new update is available. New commit ID: 3bec7fe0e8e0d42e07e60953956e7b8df1a42fe2e"
            linkText="Check last commit content"
            onLinkClick={handleCommitContentClick}
          />
        </div>

      
      </div>
    </div>
  );
};

export default ServerStatus;