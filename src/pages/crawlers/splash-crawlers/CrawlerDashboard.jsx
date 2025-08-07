"use client"
import { use, useState } from "react"
import { X, } from "lucide-react"
import { useTheme } from "../../../context/ThemeContext";


const CrawlerDashboard = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
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

  const toggleStyle = (isOn, isDark) => ({
    width: "40px",
    height: "20px",
    borderRadius: "20px",
    backgroundColor: isOn ? "#06b6d4" : isDark ? "#475569" : "#ccc",
    position: "relative",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
  });

  const knobStyle = (isOn) => ({
    width: "18px",
    height: "18px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    position: "absolute",
    top: "1px",
    left: isOn ? "20px" : "1px",
    transition: "left 0.2s ease",
  });


  return (
    <div className={` transition-colors duration-300 ${isDark ? "transparent" : "bg-gray-50"}`}>
      {/* Header */}
      <div>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center h-16">
            <h1 className={`text-lg font-bold text-xl mt-[30px] ${isDark ? "text-white" : "text-gray-900"}`}>
              Crawler Dashboard
            </h1>

          </div>

        </div>

      </div>

      <div className="w-full mb-2 font-medium  pb-4 border-b border-transparent relative inline-block mt-[10px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#ff0080] to-[#00bfff] h-1 rounded-md"></div>
      </div>

      {/* Main Content */}
      <div className="  sm:px-6 lg:px-0 py-8">
        {/* Crawler Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 ">
          {/* Onion Crawlers */}
          <div
            className={`rounded-lg p-6 transition-colors duration-300 ${isDark
              ? "bg-[#0E11164D] border border-[#2C3440]"
              : "bg-[#232A34] border border-gray-200 shadow-sm"
              }`}
          >
            <div className="flex items-center justify-between mb-4  ">
              <div >
                <h2 className={`text-xl font-semibold  ${isDark ? "text-white" : "text-white"}`}>
                  Onion
                  <br />
                  Crawlers
                </h2>
              </div>
              <div className="w-12 h-12 rounded-md bg-[#6FD8661A] flex items-center justify-center">
              <img src="/coin-dollar.svg" className="rounded-full"></img>
              </div>
            </div>

            {/* Need to add function that gets data from backend and updates here in real time */}

            <div className="flex flex-wrap gap-4 text-sm">
              <span className={`flex items-center bg-[#4CAF5033]/70 px-2 py-1 rounded-sm  ${isDark ? "text-gray-300 " : "text-white"}`}>
                0 UP
              </span>
              <span className={`flex items-center bg-[#D0191733]/70 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white"}`}>
                0 DOWN
              </span>
              <span className={`flex items-center bg-[#FFC24633]/90 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white "}`}>
                0 CRAWLED
              </span>
              <span className={`flex items-center bg-[#39D3EC33]/70 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white"}`}>
                0 QUEUED
              </span>
            </div>
          </div>

          {/* Web Crawlers */}
          <div
            className={`rounded-lg p-6 transition-colors duration-300 ${isDark
              ? "bg-[#0E11164D] border border-[#2C3440]"
              : "bg-[#232A34] border border-gray-200 shadow-sm"
              }`}
          >
            <div className="flex items-center justify-between mb-4 rounded-full">
              <div>
                <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-white"}`}>
                  Web
                  <br />
                  Crawlers
                </h2>
              </div>
             <div className="w-12 h-12 rounded-md bg-[#6FD8661A] flex items-center justify-center">
              <img src="/coin-dollar.svg" className="rounded-full"></img>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm">
              <span className={`flex items-center  bg-[#4CAF5033]/70 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white"}`}>
                0 UP
              </span>
              <span className={`flex items-center  bg-[#D0191733]/70 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white"}`}>
                0 DOWN
              </span>
              <span className={`flex items-center  bg-[#FFC24633]/90 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white"}`}>
                0 CRAWLED
              </span>
              <span className={`flex items-center  bg-[#39D3EC33]/70 px-2 py-1 rounded-sm ${isDark ? "text-gray-300" : "text-white"}`}>
                0 QUEUED
              </span>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div
          className={`rounded-md transition-colors duration-300 ${isDark ? "bg-transparent border border-[#2C3440]" : "bg-white border border-gray-200 shadow-sm"
            }`}
        >
          {/* Search Header */}
          <div
            className={`px-6 py-4 border-b rounded-t-md transition-colors duration-300 ${isDark ? "border-[#2C3440] bg-[#0E11164D]" : "border-gray-200 bg-gray-800"
              }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-white">Search Domain by</span>

                {/* Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 px-7 py-2 rounded-lg  text-sm font-medium transition-colors duration-200 bg-[#232A34] text-white hover:bg-slate-600"
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
                    <div className="absolute top-full left-0 mt-1 w-full rounded-lg border border-[#2C3440] shadow-lg z-10 bg-[#232A34]">
                      {dropdownOptions.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleSearchTypeChange(option)}
                          className={`w-full text-left px-4 py-2 text-sm transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg text-white hover:bg-slate-600 ${searchBy === option ? "bg-slate-600" : ""
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
                className={`flex items-center justify-center space-x-2  rounded-md font-medium transition-all duration-200 px-5 py-1 ${"bg-gradient-to-r from-[#c7547c] to-[#4ec7e0] text-white shadow-lg hover:shadow-xl"

                  }`}
              >

                <span>Search</span>
              </button>
            </div>
          </div>

          {/* Search Content */}
          <div className="p-6">


            {/* Section Headers */}
            <div className={`text-sm font-medium mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              {searchBy === "Tags" && "Select Tags"}
              {searchBy === "Name" && "Select Names"}
              {searchBy === "Date" && "Select Date Range"}
              {searchBy === "Languages" && "Select Languages"}
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
                    className={`w-full px-3 py-2 border rounded-md ${isDark ? "border-[#2C3440] text-white bg-transparent" : "bg-white border-gray-300 text-gray-900"
                      }`}
                  >
                    <option value="" disabled hidden className={isDark ? "text-slate-300" : "text-gray-400"}>
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
                        className="inline-flex items-center px-3 py-1 rounded-md text-sm bg-[#00ADB5] text-white"
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
                  <div className={`text-center py-8 w-full ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Select tags from the dropdown above
                  </div>
                )}
              </div>
            )}

            {/* NAME - Toggle Buttons */}
            {searchBy === "Name" && (
              <div style={{ marginBottom: "24px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  {/* Name Search Bar */}
                  <div style={{ marginBottom: "16px" }}>
                    <input
                      type="text"
                      placeholder="Search domain name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{
                        width: "100%",
                        padding: "10px 14px",
                        borderRadius: "6px",
                        border: `1px solid ${isDark ? "#2C3440" : "#cbd5e1"}`,
                        backgroundColor: isDark ? "#0E11164D" : "#B7B7B71A",
                        color: isDark ? "#f8fafc" : "#0f172a",
                      }}
                    />
                  </div>

                  {/* Onion Toggle */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={toggleStyle(nameToggles["Onion Domains"], isDark)}
                      onClick={() => toggleNameOption("Onion Domains")}
                    >
                      <div style={knobStyle(nameToggles["Onion Domains"])} />
                    </div>
                    <span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Onion Domains</span>
                  </div>

                  {/* Web Toggle */}
                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div
                      style={toggleStyle(nameToggles["Web Domains"], isDark)}
                      onClick={() => toggleNameOption("Web Domains")}
                    >
                      <div style={knobStyle(nameToggles["Web Domains"])} />
                    </div>
                    <span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Web Domains</span>
                  </div>
                </div>
              </div>
            )}


            {searchBy === "Date" && (
              <div style={{ marginBottom: "24px" }}>
                {/* 🔍 Search Bar for Domain Name */}
                <div style={{ marginBottom: "16px" }}>
                  {/* Date Range for Date Search */}
                  {searchBy === "Date" && (
                    <div className="mb-6">
                      <div className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>

                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <input
                          type="date"
                          className={`px-4 py-2 rounded-lg border text-sm transition-colors duration-200 ${isDark ? " transparent border-[#2C3440] text-white" : "bg-white border-gray-300 text-gray-900"
                            }`}
                        />
                        <input
                          type="date"
                          className={`px-4 py-2 rounded-lg border text-sm transition-colors duration-200 ${isDark ? "transparent border-[#2C3440] text-white" : "bg-white border-gray-300 text-gray-900"
                            }`}
                        />
                      </div>
                    </div>
                  )}
                  <div className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    Select Name
                  </div>
                  <input
                    type="text"
                    placeholder="Search domain name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: `1px solid ${isDark ? "#2C3440" : "#cbd5e1"}`,
                      backgroundColor: isDark ? "#0E11164D" : "#B7B7B71A",
                      color: isDark ? "#f8fafc" : "#0f172a",
                    }}
                  />
                </div>

                {/* Domain UP Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div
                    style={toggleStyle(dateToggles["Domain UP"], isDark)}
                    onClick={() => toggleDateOption("Domain UP")}
                  >
                    <div style={knobStyle(dateToggles["Domain UP"])} />
                  </div>
                  <span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Domain UP</span>
                </div>

                {/* Domain DOWN Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={toggleStyle(dateToggles["Domain Down"], isDark)}
                    onClick={() => toggleDateOption("Domain Down")}
                  >
                    <div style={knobStyle(dateToggles["Domain Down"])} />
                  </div>
                  <span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Domain Down</span>
                </div>
              </div>
            )}




            {/* LANGUAGES - Toggle Buttons */}
            {searchBy === "Languages" && (
              <div style={{ marginBottom: "24px" }}>
                {/* 🔤 Language Search Bar [do we need this as a drop down?] */}
                <div style={{ marginBottom: "16px" }}>
                  <input
                    type="text"
                    placeholder="Search language..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: `1px solid ${isDark ? "#2C3440" : "#cbd5e1"}`,
                      backgroundColor: isDark ? "#0E11164D" : "#B7B7B71A",
                      color: isDark ? "#f8fafc" : "#0f172a",
                    }}
                  />
                </div>

                {/* 🔍 Domain Name Search Bar */}
                <div className={`mb-16 text-sm font-medium mb-4 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                  Select Names
                  <input
                    type="text"
                    placeholder="Search domain name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                      marginTop: "16px",
                      width: "100%",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      border: `1px solid ${isDark ? "#2C3440" : "#cbd5e1"}`,
                      backgroundColor: isDark ? "#0E11164D" : "#B7B7B71A",

                      color: isDark ? "#f8fafc" : "#0f172a",
                    }}
                  />
                </div>

                {/* Domain UP Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <div
                    style={toggleStyle(languageToggles["Domain UP"], isDark)}
                    onClick={() => toggleLanguageOption("Domain UP")}
                  >
                    <div style={knobStyle(languageToggles["Domain UP"])} />
                  </div>
                  <span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Domain UP</span>
                </div>

                {/*Domain DOWN Toggle */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div
                    style={toggleStyle(languageToggles["Domain Down"], isDark)}
                    onClick={() => toggleLanguageOption("Domain Down")}
                  >
                    <div style={knobStyle(languageToggles["Domain Down"])} />
                  </div>
                  <span style={{ color: isDark ? "#e2e8f0" : "#1e293b" }}>Domain Down</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default CrawlerDashboard
