"use client"

import { useState } from "react"
import { X,} from "lucide-react"

const CrawlerDashboard = () => {
  const [darkMode, setDarkMode] = useState(true)
  const [searchBy, setSearchBy] = useState("Tags")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTags, setSelectedTags] = useState([])

  // Toggle states for different search types
  const [nameToggles, setNameToggles] = useState({
    "Onion Domains": false,
    "Web Domains": false,
  })

  const [dateToggles, setDateToggles] = useState({
    "Domain UP": false,
    "Domain Down": false,
  })

  const [languageToggles, setLanguageToggles] = useState({
    "Domain UP": false,
    "Domain Down": false,
  })

  // Available tags for selection
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

  const dropdownOptions = ["Tags", "Name", "Date", "Languages"]

  const toggleTheme = () => {
    setDarkMode(!darkMode)
  }

  const handleSearch = () => {
    console.log(`Searching in ${searchBy}`)
    if (searchBy === "Tags") {
      console.log("Selected tags:", selectedTags)
    } else if (searchBy === "Name") {
      const activeNames = Object.entries(nameToggles)
        .filter(([_, isActive]) => isActive)
        .map(([name, _]) => name)
      console.log("Active name toggles:", activeNames)
    } else if (searchBy === "Date") {
      const activeDates = Object.entries(dateToggles)
        .filter(([_, isActive]) => isActive)
        .map(([name, _]) => name)
      console.log("Active date toggles:", activeDates)
    } else if (searchBy === "Languages") {
      const activeLanguages = Object.entries(languageToggles)
        .filter(([_, isActive]) => isActive)
        .map(([name, _]) => name)
      console.log("Active language toggles:", activeLanguages)
    }
  }

  const handleTagSelect = (tag) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const removeTagFromSelection = (tagToRemove) => {
    setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
  }

  // Toggle functions for different search types
  const toggleNameOption = (option) => {
    setNameToggles((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const toggleDateOption = (option) => {
    setDateToggles((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const toggleLanguageOption = (option) => {
    setLanguageToggles((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  // Reset toggles when changing search type
  const handleSearchTypeChange = (newSearchType) => {
    setSearchBy(newSearchType)
    setIsDropdownOpen(false)
    setSearchTerm("")
    setSelectedTags([])
    // Reset all toggles when changing search type
    setNameToggles({ "Onion Domains": false, "Web Domains": false })
    setDateToggles({ "Domain UP": false, "Domain Down": false })
    setLanguageToggles({ "Domain UP": false, "Domain Down": false })
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}>
      {/* Header */}
      <div
        
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Crawler Dashboard</h1>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                darkMode
                  ? "bg-slate-700 hover:bg-slate-600 text-yellow-400"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-600"
              }`}
            >
              {darkMode ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full mb-2 font-medium   pb-4 border-b border-transparent relative inline-block">
  <h1 className="text-2xl  flex justify-start">
    
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
  </h1>
</div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Crawler Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Onion Crawlers */}
          <div
            className={`rounded-lg p-6 transition-colors duration-300 ${
              darkMode ? "bg-[#0E11164D]/30 border border-slate-700" : "bg-[#232A34] border-gray-200 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-4 ">
              <div>
                <h2 className={`text-xl font-semibold  ${darkMode ? "text-white" : "text-white"}`}>
                  Onion
                  <br />
                  Crawlers
                </h2>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className={`flex items-center bg-[#4CAF5033]/70 px-2 py-1 rounded-sm  ${darkMode ? "text-gray-300 " : "text-white  font-bold "}`}>
                0 UP
              </span>
              <span className={`flex items-center bg-[#D0191733]/70 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
               0 DOWN
              </span>
              <span className={`flex items-center bg-[#FFC24633]/90 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
               0 CRAWLED
              </span>
              <span className={`flex items-center bg-[#39D3EC33]/70 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
                0 QUEUED
              </span>
            </div>
          </div>

          {/* Web Crawlers */}
          <div
            className={`rounded-lg p-6 transition-colors duration-300 ${
              darkMode ? "bg-[#0E11164D]/30 border border-slate-700" : "bg-[#232A34] border-gray-200 shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : "text-white"}`}>
                  Web
                  <br />
                  Crawlers
                </h2>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className={`flex items-center  bg-[#4CAF5033]/70 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
               0 UP
              </span>
              <span className={`flex items-center  bg-[#D0191733]/70 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
                0 DOWN
              </span>
              <span className={`flex items-center  bg-[#FFC24633]/90 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
              0 CRAWLED
              </span>
              <span className={`flex items-center  bg-[#39D3EC33]/70 px-2 py-1 rounded-sm ${darkMode ? "text-gray-300" : "text-white font-bold"}`}>
               0 QUEUED
              </span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div
          className={`rounded-lg transition-colors duration-300 ${
            darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200 shadow-sm"
          }`}
        >
          {/* Search Header */}
          <div
            className={`px-6 py-4 border-b transition-colors duration-300 ${
              darkMode ? "border-slate-700 bg-slate-900" : "border-gray-200 bg-gray-800"
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">Search Domain by</span>

                {/* Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-600 text-sm font-medium transition-colors duration-200 bg-slate-700 text-white hover:bg-slate-600"
                  >
                    {searchBy}
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-1 w-full rounded-lg border border-slate-600 shadow-lg z-10 bg-slate-700">
                      {dropdownOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSearchTypeChange(option)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-white hover:bg-slate-600 ${
                            searchBy === option ? "bg-slate-600" : ""
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* <button
                onClick={handleSearch}
                className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Search
              </button> */}

              <button
                onClick={handleSearch}
                className={`flex items-center justify-center space-x-2  rounded-md font-medium transition-all duration-200 px-5 py-1 ${
                  
                     "bg-gradient-to-r from-[#c7547c] to-[#4ec7e0] text-white shadow-lg hover:shadow-xl"
                    
                }`}
              >
                
                <span> Search</span>
              </button>
            </div>
          </div>

          {/* Search Content */}
          <div className="p-6">
            {/* Date Range for Date Search */}
            {searchBy === "Date" && (
              <div className="mb-6">
                <div className={`text-sm font-medium mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                  Select Date Range
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="date"
                    className={`px-4 py-2 rounded-lg border text-sm transition-colors duration-200 ${
                      darkMode ? " border-slate-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                  <input
                    type="date"
                    className={`px-4 py-2 rounded-lg border text-sm transition-colors duration-200 ${
                      darkMode ? "bg-slate-700 border-slate-600 text-white" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  />
                </div>
              </div>
            )}

            {/* Section Headers */}
            <div className={`text-sm font-medium mb-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              {searchBy === "Tags" && "Select Tags"}
              {searchBy === "Name" && "Select Domain Types"}
              {searchBy === "Date" && "Select Domain Status"}
              {searchBy === "Languages" && "Select Domain Status"}
            </div>

            {/* TAGS - Dropdown Selection */}
            {searchBy === "Tags" && (
              <div className="mb-4">
                <div className="relative">
                  <select
                    defaultValue=""
                    onChange={(e) => {
                      if (e.target.value) {
                        handleTagSelect(e.target.value)
                        e.target.value = ""
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-md ${
                      darkMode ? "border-slate-600 text-white bg-slate-700" : "bg-white border-gray-300 text-gray-900"
                    }`}
                  >
                    <option value="" disabled hidden className={darkMode ? "text-slate-300" : "text-gray-400"}>
                      Select Tags
                    </option>
                    {availableTags.map((tag) => (
                      <option
                        key={tag}
                        value={tag}
                        disabled={selectedTags.includes(tag)}
                        className={selectedTags.includes(tag) ? "opacity-50" : ""}
                      >
                        {tag}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Selected Tags Display */}
                {selectedTags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-cyan-500 text-white"
                      >
                        {tag}
                        <button
                          onClick={() => removeTagFromSelection(tag)}
                          className="ml-2 hover:bg-cyan-600 rounded-full p-0.5 transition-colors duration-200"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}

                {selectedTags.length === 0 && (
                  <div className={`text-center py-8 w-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Select tags from the dropdown above
                  </div>
                )}
              </div>
            )}

            {/* NAME - Toggle Buttons */}
            {searchBy === "Name" && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {Object.entries(nameToggles).map(([option, isActive]) => (
                    <button
                      key={option}
                      onClick={() => toggleNameOption(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                        isActive
                          ? "bg-cyan-500 border-cyan-500 text-white shadow-lg transform scale-105"
                          : darkMode
                            ? "bg-slate-600 border-slate-500 text-gray-300 hover:bg-slate-500 hover:border-slate-400"
                            : "bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${isActive ? "bg-white" : "bg-gray-400"}`}></div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>

                {!Object.values(nameToggles).some(Boolean) && (
                  <div className={`text-center py-8 w-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Click the toggle buttons above to select domain types
                  </div>
                )}
              </div>
            )}

            {/* DATE - Toggle Buttons */}
            {searchBy === "Date" && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {Object.entries(dateToggles).map(([option, isActive]) => (
                    <button
                      key={option}
                      onClick={() => toggleDateOption(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                        isActive
                          ? "bg-cyan-500 border-cyan-500 text-white shadow-lg transform scale-105"
                          : darkMode
                            ? "bg-slate-600 border-slate-500 text-gray-300 hover:bg-slate-500 hover:border-slate-400"
                            : "bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            option === "Domain UP"
                              ? isActive
                                ? "bg-white"
                                : "bg-yellow-500"
                              : isActive
                                ? "bg-white"
                                : "bg-blue-500"
                          }`}
                        ></div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>

                {!Object.values(dateToggles).some(Boolean) && (
                  <div className={`text-center py-8 w-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Click the toggle buttons above to select domain status
                  </div>
                )}
              </div>
            )}

            {/* LANGUAGES - Toggle Buttons */}
            {searchBy === "Languages" && (
              <div className="mb-4">
                <div className="flex flex-wrap gap-3">
                  {Object.entries(languageToggles).map(([option, isActive]) => (
                    <button
                      key={option}
                      onClick={() => toggleLanguageOption(option)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ${
                        isActive
                          ? "bg-cyan-500 border-cyan-500 text-white shadow-lg transform scale-105"
                          : darkMode
                            ? "bg-slate-600 border-slate-500 text-gray-300 hover:bg-slate-500 hover:border-slate-400"
                            : "bg-gray-200 border-gray-300 text-gray-700 hover:bg-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            option === "Domain UP"
                              ? isActive
                                ? "bg-white"
                                : "bg-yellow-500"
                              : isActive
                                ? "bg-white"
                                : "bg-blue-500"
                          }`}
                        ></div>
                        {option}
                      </div>
                    </button>
                  ))}
                </div>

                {!Object.values(languageToggles).some(Boolean) && (
                  <div className={`text-center py-8 w-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    Click the toggle buttons above to select domain status
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CrawlerDashboard
