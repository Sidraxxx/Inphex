import React, { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  Search,
  Image,
  Eye,
  Globe,
  Code,
  Monitor,
  Lock,
  CreditCard,
  Mail,
  Shield,
  Link2,
  Bitcoin,
  Terminal,
  Phone,
  ChevronDown,
   Clock,
  Settings,
  Plus,
  List,
  RefreshCcw,
  Server,
  Repeat,
  Database,
  User,
  Key,
  UserPlus,
  Users,
  Building2,
  Logs
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
const iconMap = {
  // tags 
  "Search Messages": <MessageCircle className="w-4 h-4" />,
  "Search Items": <Search className="w-4 h-4" />,
  "Search Images": <Image className="w-4 h-4" />,
  "Search Ocrs": <Eye className="w-4 h-4" />,
  "Search Domains": <Globe className="w-4 h-4" />,
  "Search Decoded Items": <Code className="w-4 h-4" />,
  "Search Screenshots": <Monitor className="w-4 h-4" />,

  "Credentials": <Lock className="w-4 h-4" />,
  "Credit Cards": <CreditCard className="w-4 h-4" />,
  "Mails": <Mail className="w-4 h-4" />,
  "CVEs": <Shield className="w-4 h-4" />,
  "Onions": <Link2 className="w-4 h-4" />,
  "Bitcoin": <Bitcoin className="w-4 h-4" />,
  "Base64": <Terminal className="w-4 h-4" />,
  "Phones": <Phone className="w-4 h-4" />,
  "Dashboard": <Monitor className="w-4 h-4" />,
  "Onion Crawler": <Globe className="w-4 h-4" />,
  "Web Crawler": <Globe className="w-4 h-4" />,
  "Manual Crawler": <Terminal className="w-4 h-4" />,
  "Scheduler": <Clock className="w-4 h-4" />,
  "Settings": <Settings className="w-4 h-4" />,
  "Onion Domain": <Link2 className="w-4 h-4" />,
  "Web Domain": <Link2 className="w-4 h-4" />,
  "Vanity Explorer": <Eye className="w-4 h-4" />,
  "Add Cookiejar": <Plus className="w-4 h-4" />,
  "All Cookiejar": <List className="w-4 h-4" />,

  "Server Status": <Monitor className="w-4 h-4" />,
  "AIL Sync": <RefreshCcw className="w-4 h-4" />,
  "Servers": <Server className="w-4 h-4" />,
  "Sync Queues": <Repeat className="w-4 h-4" />,
  "Passive DNS": <Database className="w-4 h-4" />,
  "Profile": <User className="w-4 h-4" />,
  "Change Password": <Key className="w-4 h-4" />,
  "Add User": <UserPlus className="w-4 h-4" />,
  "Users List": <Users className="w-4 h-4" />,
  "Add Organization": <Building2 className="w-4 h-4" />,
  "Organizations List": <Logs className="w-4 h-4" />,
};

const routeMap = {
  "Search Items": "/Tags/TagsSearch/SearchItems",
  "Search Messages": "/Tags/TagsSearch/SearchMessages",
  "Search Images": "/Tags/TagsSearch/SearchImages",
  "Search Ocrs": "/Tags/TagsSearch/SearchOcrs",
  "Search Domains": "/Tags/TagsSearch/SearchDomains",
  "Search Decoded Items": "/Tags/TagsSearch/SearchDecodedItems",
  "Search Screenshots": "/Tags/TagsSearch/SearchScreenshots",
  "Taxonomies": "/Taxonomies",
  "Galaxies": "/Galaxies",
  "MISP and Hive,autopush": "/TagsExport",
  "Credentials": "/QuickSearch/Credentials",
  "Credit Cards": "/QuickSearch/CreditCards",
  "Mails": "/QuickSearch/Mails",
  "CVEs": "/QuickSearch/CVEs",
  "Onions": "/QuickSearch/Onions",
  "Bitcoin": "/QuickSearch/Bitcoin",
  "Base64": "/QuickSearch/Base64",
  "Phones": "/QuickSearch/Phones",

  // Crawlers
  "Dashboard": "/CrawlerDashboard",
  "Onion Crawler": "/OnionCrawler",
  "Web Crawler": "/WebCrawler",
  "Manual Crawler": "/ManualCrawler",
  "Scheduler": "/Schedulers",
  "Settings": "/Settings",
  "Onion Domain": "/OnionExplorer",
  "Web Domain": "/WebExplorer",
  "Vanity Explorer": "/VanityExplorer",
  "Add Cookiejar": "/AddCookieJar",
  "All Cookiejar": "/AllCookieJar",

  //Server Management
  "Server Status":"/ServerStatus",
  "AIL Sync":"/AilSync",
  "Servers":"",
  "Sync Queues":"",
  "Profile":"/Profile",
  "Change Password": "",
  "Add User": "/AddUser",
  "Users List": "/AllUsers",
  "Add Organization":"/AddOrganization",
  "Organizations List": "/OrganizationList ",
 
};

const Navbar = () => {
  // theme 
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const [isTagsOpen, setIsTagsOpen] = useState(false);
  const [isCrawlersOpen, setisCrawlersOpen] = useState(false);
  const [isServerManagementOpen, setIsServerManagementOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const navigate = useNavigate();


  const tagsRef = useRef(null);
  const crawlersRef = useRef(null);
  const serverRef = useRef(null);

  const tagsDropdownData = [
    {
      title: "Tags Search",
      items: [
        "Search Decoded Items",
        "Search Domains",
        "Search Images",
        "Search Items",
        "Search Messages",
        "Search Ocrs",
        "Search Screenshots",
      ],
    },
    
   
  ];
  const crawlersDropdownData = [
    {
      title: "Splash Crawlers",
      items: [
        "Dashboard",
        "Onion Crawler",
        "Web Crawler",
        "Manual Crawler",
        "Scheduler",
        "Settings",
      ],
    },
    {
      title: "Domain Explorer",
      items: ["Onion Domain", "Web Domain", "Vanity Explorer"],
    },
    {
      title: "CookieJar",
      items: ["Add Cookiejar", "All Cookiejar"],
    },
  ];

  const serverDropdownData  = [
    {
      title: "Diagnostic",
      items: [
        "Server Status",
      ],
    },
    {
      title: "AIL SYNC",
      items: ["AIL Sync", "Servers", "Sync Queues"],
    },
    {
      title: "Settings",
      items: ["Passive DNS"],
    },
    {
      title: "My Profile",
      items: ["Profile", "Change Password"],
    },
    {
      title: "UserManagement",
      items: ["Add User", "Users List"],
    },
    {
      title: "Organizations",
      items: ["Add Organization", "Organizations List"],
    },
    
    
  ];

  useEffect(() => {
    function handleClickOutside(event) {
      if (tagsRef.current && !tagsRef.current.contains(event.target)) {
        setIsTagsOpen(false)
      }
      if (crawlersRef.current && !crawlersRef.current.contains(event.target)) {
        setisCrawlersOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`relative border-b z-50  ${
        isDark ? "bg-[#1A1F27]/10 border-gray-800" : " border-gray-200"
      }`}
    >
      <div className="w-full mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div
              className={`text-xl font-bold transition-colors duration-200 ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              INPHEX
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-1">
              <Link
                to={"/"}
                className={`px-2 py-1 text-xs font-medium rounded-full  ${
                  isDark
                    ? "text-gray-300 hover:text-white hover:bg-white/10"
                    : "text-gray-700 hover:text-black hover:bg-gray-100"
                }`}
              >
                Home
              </Link>

              {/* Tags Dropdown */}
              <div
                className="relative"
                ref={tagsRef}
                onMouseLeave={() => setIsTagsOpen(false)}
              >
                <button
                  className={`px-3 flex justify-center items-center py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                  } ${
                    isTagsOpen
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-gray-100 text-black"
                      : ""
                  }`}
                  onClick={() => setIsTagsOpen(!isTagsOpen)}
                  onMouseEnter={() => setIsTagsOpen(true)}
                >
                  Tags
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isTagsOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`z-0 absolute top-full left-0  transition-all duration-200 ease-out ${
                    isTagsOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  }`}
                  onMouseLeave={() => setIsTagsOpen(false)}
                >
                  <div
                    className={`rounded-lg shadow-2xl border backdrop-blur-xl z-50 overflow-hidden ${
                      isDark
                        ? "bg-gray-900/95 border-gray-700"
                        : "bg-white/95 border-gray-200"
                    }`}
                  >
                    <div className="flex-col ">
                      {tagsDropdownData.map((section, sectionIndex) => (
                        <div key={section.title} className="p-6">
                          <div className="flex items-center mb-4">
                            <h3
                              className={`text-xs font-normal ${
                                isDark ? "text-[#CACACA]" : "text-gray-900"
                              }`}
                            >
                              {section.title}
                            </h3>
                          </div>
                          <ul className="space-y-1">
                            {section.items.map((item, itemIndex) => (
                              <li key={item}>
                                <Link
                                  to={routeMap[item] || "#"}
                                  className={`group flex items-center p-2 text-xs rounded-md transition-all duration-200 ${
                                    isDark
                                      ? "text-white hover:bg-white/10"
                                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                                  }`}
                                  onMouseEnter={() =>
                                    setHoveredItem(
                                      `${sectionIndex}-${itemIndex}`
                                    )
                                  }
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <div
                                    className={`mr-3 transition-all duration-200 ${
                                      hoveredItem ===
                                      `${sectionIndex}-${itemIndex}`
                                        ? isDark
                                          ? "text-white"
                                          : "text-black"
                                        : isDark
                                        ? "text-gray-400"
                                        : "text-black"
                                    }`}
                                  >
                                    {iconMap[item] || (
                                      <div className="w-4 h-4 rounded border border-current" />
                                    )}
                                  </div>
                                  <span className="truncate">{item}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Crawlers Dropdown */}
              <div
                className="relative"
                ref={crawlersRef}
                onMouseLeave={() => setisCrawlersOpen(false)}
              >
                <button
                  className={`px-2 flex justify-center items-center py-1 text-xs font-medium rounded-full  ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                  } ${
                    isCrawlersOpen
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-gray-100 text-black"
                      : ""
                  }`}
                  onClick={() => setisCrawlersOpen(!isCrawlersOpen)}
                  onMouseEnter={() => setisCrawlersOpen(true)}
                >
                  Crawlers
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isCrawlersOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`z-0 absolute top-full left-0  transition-all duration-200 ease-out ${
                    isCrawlersOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  }`}
                  onMouseLeave={() => setisCrawlersOpen(false)}
                >
                  <div
                    className={`rounded-lg shadow-2xl border backdrop-blur-xl z-50 overflow-hidden ${
                      isDark
                        ? "bg-gray-900/95 border-gray-700"
                        : "bg-white/95 border-gray-200"
                    }`}
                  >
                    <div className="grid grid-cols-3 w-[500px]">
                      {crawlersDropdownData.map((section, sectionIndex) => (
                        <div key={section.title} className="p-4">
                          <div className="flex items-center mb-4">
                            <h3
                              className={`text-xs font-normal ${
                                isDark ? "text-[#CACACA]" : "text-gray-900"
                              }`}
                            >
                              {section.title}
                            </h3>
                          </div>
                          <ul className="space-y-0.5">
                            {section.items.map((item, itemIndex) => (
                              <li key={item}>
                                <Link
                                  to={routeMap[item] || "#"}
                                  className={`group flex items-center p-2 text-xs rounded-md transition-all duration-200 ${
                                    isDark
                                      ? "text-white hover:bg-white/10"
                                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                                  }`}
                                  onMouseEnter={() =>
                                    setHoveredItem(
                                      `${sectionIndex}-${itemIndex}`
                                    )
                                  }
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <div
                                    className={`mr-3 transition-all duration-200 ${
                                      hoveredItem ===
                                      `${sectionIndex}-${itemIndex}`
                                        ? isDark
                                          ? "text-white"
                                          : "text-black"
                                        : isDark
                                        ? "text-gray-400"
                                        : "text-black"
                                    }`}
                                  >
                                    {iconMap[item] || (
                                      <div className="w-4 h-4 rounded border border-current" />
                                    )}
                                  </div>
                                  <span className="truncate">{item}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>


              
              
               {/* Server Management Dropdown */}
              <div
                className="relative"
                ref={serverRef}
                onMouseLeave={() => setIsServerManagementOpen(false)}
              >
                <button
                  className={`px-2 flex justify-center items-center py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isDark
                      ? "text-gray-300 hover:text-white hover:bg-white/10"
                      : "text-gray-700 hover:text-black hover:bg-gray-100"
                  } ${
                    isServerManagementOpen
                      ? isDark
                        ? "bg-white/10 text-white"
                        : "bg-gray-100 text-black"
                      : ""
                  }`}
                  onClick={() => setIsServerManagementOpen(!isServerManagementOpen)}
                  onMouseEnter={() => setIsServerManagementOpen(true)}
                >
                  Server Management
                  <ChevronDown
                    className={`ml-1 w-4 h-4 transition-transform duration-200 ${
                      isServerManagementOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                <div
                  className={`z-0 absolute top-full left-0  transition-all duration-200 ease-out ${
                    isServerManagementOpen
                      ? "opacity-100 visible transform translate-y-0"
                      : "opacity-0 invisible transform -translate-y-2"
                  }`}
                  onMouseLeave={() => setIsServerManagementOpen(false)}
                >
                  <div
                    className={`rounded-lg shadow-2xl border backdrop-blur-xl z-50 overflow-hidden ${
                      isDark
                        ? "bg-gray-900/95 border-gray-700"
                        : "bg-white/95 border-gray-200"
                    }`}
                  >
                    <div className="grid grid-cols-3 gap-0 w-[550px]">
                      {serverDropdownData.map((section, sectionIndex) => (
                        <div key={section.title} className="p-4">
                          <div className="flex items-center mb-4">
                            <h3
                              className={`text-xs font-normal ${
                                isDark ? "text-[#CACACA]" : "text-gray-900"
                              }`}
                            >
                              {section.title}
                            </h3>
                          </div>
                          <ul className="space-y-0.5">
                            {section.items.map((item, itemIndex) => (
                              <li key={item}>
                                <Link
                                  to={routeMap[item] || "#"}
                                  className={`group flex items-center p-2 text-xs rounded-md transition-all duration-200 ${
                                    isDark
                                      ? "text-white hover:bg-white/10"
                                      : "text-gray-600 hover:text-black hover:bg-gray-100"
                                  }`}
                                  onMouseEnter={() =>
                                    setHoveredItem(
                                      `${sectionIndex}-${itemIndex}`
                                    )
                                  }
                                  onMouseLeave={() => setHoveredItem(null)}
                                >
                                  <div
                                    className={`mr-3 transition-all duration-200 ${
                                      hoveredItem ===
                                      `${sectionIndex}-${itemIndex}`
                                        ? isDark
                                          ? "text-white"
                                          : "text-black"
                                        : isDark
                                        ? "text-gray-400"
                                        : "text-black"
                                    }`}
                                  >
                                    {iconMap[item] || (
                                      <div className="w-4 h-4 rounded border border-current" />
                                    )}
                                  </div>
                                  <span className="truncate">{item}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

            </nav>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1 rounded-full transition-all duration-200 ${
                isDark
                  ? "text-gray-300 hover:text-white hover:bg-gray-900"
                  : "text-gray-700 hover:text-black hover:bg-gray-100"
              }`}
              aria-label={
                isDark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {isDark ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Logout Button */}
            <button
              className={`flex items-center px-4 py-1 text-xs font-medium rounded-sm transition-all duration-200 ${
                isDark
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
               onClick={() => navigate("/SignIn")}
            >
              {/* <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg> */}
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;
