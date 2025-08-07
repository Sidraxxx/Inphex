import { useState } from 'react';
import { RefreshCw, Home, GitBranch, GitCommit, ExternalLink, Info } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ServerStatus = () => {

  const { theme } = useTheme();
const darkMode = theme === "dark";


  const StatusCard = ({ title, subtitle, icon: Icon, iconColor, hasUpdate = false, isWarning = false }) => (
    <div className={`
      relative rounded-lg p-6 flex items-center justify-between py-10 
      ${darkMode 
        ? 'bg-[#0E11164D]/30 text-[#FFFFFF]' 
        : 'bg-[#232A34] text-white'
      }
    `}>
      <div>
        <h3 className="font-semibold mb-1.5 text-3xl">{title}</h3>
        <p className={`text-xl ${darkMode ? 'text-[#FFFFFF]/80' : 'text-gray-300'}`}>
          {subtitle}
        </p>
        {hasUpdate && (

          <div className="flex items-center mt-2.5">
          <Info className={`w-6 h-6 mr-2 ${isWarning ? 'text-[#EB5757]' : 'text-[#EEC84E]'}`} />
         <span className={`text-sm ${isWarning ? 'text-red-400' : 'text-yellow-400'}`}>
         {isWarning ? 'New Version Available!' : 'New Update Available!'}
          </span>
          </div>

        )}
      </div>
      <div className='rounded-full bg-[#BB6BD9]/20 p-2'>
<Icon className={`w-9 h-9  ${iconColor}`} />
      </div>
      
    </div>
  );

  const AlertBox = ({ type, title, message, linkText, onLinkClick, updatedetail }) => {
    const bgColor = type === 'version' 
      ? (darkMode ? 'bg-[#8F1A19]/20 ' : 'bg-[#E38F8F78]')
      : (darkMode ? 'bg-[#EEC84E]/20 ' : 'bg-[#EEC84E52] ');
    
    const textColor = type === 'version'
      ? (darkMode ? 'text-[#8F1A19]' : 'text-red-800')
      : (darkMode ? 'text-[#C58A0A]' : 'text-yellow-800');

    return (
      <div className={`rounded-lg p-4  ${bgColor}`}>
        <h4 className={`font-semibold mb-2 ${textColor}`}>
          {title}
        </h4>
        <p className={`text-sm mb-2  ${ type === 'version'
          ? (darkMode ? 'text-white ' : 'text-black-800')
      : (darkMode ? 'text-white' : 'text-black-800')
        }`}>
          {message + " "}
          <span className={`text-sm mb-2  ${ type === 'version'
          ? (darkMode ? 'text-[#8F1A19] ' : 'text-red-800')
      : (darkMode ? 'text-yellow-500' : 'text-yellow-800')
        }`}>
          {updatedetail + " "}
        </span>
        </p>
       
        <button 
          onClick={onLinkClick}
          className={`text-sm underline hover:no-underline ${
            type === 'version' 
              ? (darkMode ? 'text-[#2780E3] hover:text-blue-600' : 'text-blue-600 hover:text-blue-800')
              : (darkMode ? 'text-[#2780E3] hover:text-blue-600' : 'text-blue-600 hover:text-blue-800')
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
    <div >
      <div >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AIL Framework Status
          </h1>
          
        </div>
         
        {/* Header Line */}
        <div className={`w-full mb-6 h-0.5 bg-gradient-to-r  from-pink-500 to-blue-500  ${
          darkMode ? 'bg-slate-600' : 'bg-gray-300'
        }`}></div>

        {/* Status Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1.5 mb-2 p-28px w-300px rounded">
          <StatusCard
            title="Master"
            subtitle="AIL Version"
            icon={RefreshCw}
            iconColor={darkMode ? 'text-[#BB6BD9]' : 'text-[#BB6BD9]'}
          />
          
          <StatusCard
            title="v6.1"
            subtitle="Current Tag"
            icon={Home}
            iconColor={darkMode ? 'text-[#BB6BD9]' : 'text-[#BB6BD9]'}
            hasUpdate={true}
            isWarning={true}
          />
          
          <StatusCard
            title="Master"
            subtitle="Current Branch"
            icon={GitBranch}
            iconColor={darkMode ? 'text-[#BB6BD9]' : 'text-[#BB6BD9]'}
          />
        </div>

        {/* Commit ID Card */}
        <div className="mb-6 ">
          <StatusCard
            title="3bec7fe0e8e0d42e07e60953956e7b8df1a42fe2e"
            subtitle="Current Commit ID"
            icon={GitCommit}
            iconColor={darkMode ? 'text-[#BB6BD9]' : 'text-[#BB6BD9]'}
            hasUpdate={true}
            
          />
        </div>

        {/* Alert Boxes */}
        <div className="space-y-3 p-30px hug h-148px fill w-1334px gap-10px rounded text-lg ">
          <AlertBox
            type="version"
            title="New Version Available!"
            message="A new version is available. New version:" 
            updatedetail="v6.2"
            linkText="Check last release notes"
            onLinkClick={handleReleaseNotesClick}
          />
          
          <AlertBox
            type="update"
            title="New Update Available!"
            message="A new update is available. New commit ID:"
            updatedetail="3bec7fe0e8e0d42e07e60953956e7b8df1a42fe2e"
            linkText="Check last commit content"
            onLinkClick={handleCommitContentClick}
          />
        </div>

      
      </div>
    </div>
  );
};

export default ServerStatus;