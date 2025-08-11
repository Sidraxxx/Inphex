import { useState } from 'react';
import { RefreshCw, Home, GitBranch, GitCommit, ExternalLink, Info } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';

const ServerStatus = () => {

  const { theme } = useTheme();
const darkMode = theme === "dark";


  const StatusCard = ({ title, subtitle, icon: Icon, iconColor, hasUpdate = false, isWarning = false }) => (
    <div className={`
      relative rounded-lg p-6 flex items-center justify-between py-4 
      ${darkMode 
        ? 'bg-[#0E11164D]/70 text-[#FFFFFF]' 
        : 'bg-[#232A34] text-white'
      }
    `}>
      <div>
        <h3 className="font-semibold mb-1.5 text-xl">{title}</h3>
        <p className={`text-md ${darkMode ? 'text-[#FFFFFF]/80' : 'text-gray-300'}`}>
          {subtitle}
        </p>
        {hasUpdate && (

          <div className="flex items-center mt-2.5">
          <Info className={`w-4 h-4 mr-2 ${isWarning ? 'text-[#EB5757]' : 'text-[#EEC84E]'}`} />
         <span className={`text-xs ${isWarning ? 'text-red-400' : 'text-yellow-400'}`}>
         {isWarning ? 'New Version Available!' : 'New Update Available!'}
          </span>
          </div>

        )}
      </div>
      <div className='rounded-full bg-[#BB6BD9]/20 p-2'>
<Icon className={`w-8 h-8  ${iconColor}`} />
      </div>
      
    </div>
  );

  const AlertBox = ({ type, title, message, linkText, onLinkClick, updatedetail }) => {
    const bgColor = type === 'version' 
      ? (darkMode ? 'bg-[#8F1A19]/20 ' : 'bg-[#E38F8F78]')
      : (darkMode ? 'bg-[#EEC84E]/20 ' : 'bg-[#EEC84E52] ');
    
    const textColor = type === 'version'
      ? (darkMode ? 'text-[#b82523]' : 'text-red-800')
      : (darkMode ? 'text-[#C58A0A]' : 'text-yellow-800');

    return (
      <div className={`rounded-md text-sm p-4  ${bgColor}`}>
        <h4 className={`font-semibold mb-2 ${textColor}`}>
          {title}
        </h4>
        <p className={`text-xs mb-2  ${ type === 'version'
          ? (darkMode ? 'text-white ' : 'text-black-800')
      : (darkMode ? 'text-white' : 'text-black-800')
        }`}>
          {message + " "}
          <span className={`text-xs mb-2  ${ type === 'version'
          ? (darkMode ? 'text-[#b82523] ' : 'text-red-800')
      : (darkMode ? 'text-yellow-500' : 'text-yellow-800')
        }`}>
          {updatedetail + " "}
        </span>
        </p>
       
        <button 
          onClick={onLinkClick}
          className={`text-xs underline hover:no-underline ${
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
      <div  >
        {/* Header */}
        <div className={`w-full pb-4 border-b border-transparent relative inline-block mt-12 mb-5 ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>
          <h1 className="text-md  flex justify-start ">
           Schedulers
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
          </h1>
        </div>
         
      

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
        <div className="space-y-1 p-30px hug  fill w-full rounded text-lg ">
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