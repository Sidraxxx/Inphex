"use client"

import { useState, useEffect, useRef } from "react"
import { useTheme } from "../../../context/ThemeContext"


const ChevronDownIcon = ({ isOpen = false }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
)

// Custom Dropdown Component
const Dropdown1 = ({ value, onChange, options, className = "", placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left bg-transparent  rounded-sm text-[#C4C4C4] dark:text-[#8C8A8A] flex justify-between items-center transition-colors text-xs border border-[#1F6F8B]/40"
      >
        <span className={value === options[0] ? "dark:text-[#8C8A8A] text-[#C4C4C4]" : ""}>{value}</span>
        <ChevronDownIcon isOpen={isOpen} />   
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
          {options.slice(0, 6).map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white first:rounded-t last:rounded-b transition-colors text-xs"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
const Dropdown2 = ({ value, onChange, options, className = "", placeholder = "Select option" }) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-left rounded bg-[#1F6F8B]/20 text-[#1F6F8B] dark:text-white flex justify-between items-center  transition-colors text-xs "
      >
        <span className={value === options[0] ? "text-[#1F6F8B] dark:text-[#1F6F8B]" : ""}>{value}</span>
        <ChevronDownIcon isOpen={isOpen} />   
      </button>
      {isOpen && (
        <div className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-lg">
          {options.slice(0, 6).map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => {
                onChange(option)
                setIsOpen(false)
              }}
              className="w-full px-3 py-2 text-left hover:bg-[#1F6F8B]/20 dark:hover:bg-gray-700 text-gray-900 dark:text-white first:rounded-t last:rounded-b transition-colors text-xs"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}


// Custom Toggle Component
const Toggle = ({ enabled, onChange, label }) => (
  <div className="flex items-center space-x-2">
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-5 w-8 items-center rounded-full transition-colors duration-200 focus:outline-none ${
        enabled ? "bg-cyan-500" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <span
        className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform duration-200 ${
          enabled ? "translate-x-4" : "translate-x-1"
        }`}
      />
    </button>
    <span className="text-xs ">{label}</span>
  </div>
)

// Main CrawlADomain Component
const ManualCrawler = () => {
  const [customTags, setCustomTags] = useState("")
  const [selectedTags1, setSelectedTags1] = useState("Select Tags")
  const [selectedTaxonomie, setSelectedTaxonomie] = useState("Taxonomie Selected")
  const [selectedTags2, setSelectedTags2] = useState("Select Tags")
  const [selectedGalaxy, setSelectedGalaxy] = useState("Galaxy Selected")
  const [multipleUrls, setMultipleUrls] = useState(false)
  const [domainAddress, setDomainAddress] = useState("")
  const [cookiejar, setCookiejar] = useState("Dont use a cookie jar")
  const [crawlerType, setCrawlerType] = useState("Dont use a cookie jar")
  const [depthLimit, setDepthLimit] = useState("0")
  const [htmlEnabled, setHtmlEnabled] = useState(false)
  const [screenshotEnabled, setScreenshotEnabled] = useState(true)
  const [harEnabled, setHarEnabled] = useState(false)
  const [selected, setSelected] = useState("left");

  const { theme } = useTheme();
const darkMode = theme === "dark";

  // Dummy data for dropdowns
  const selectTagsOptions1 = [
    "Select Tags",
    "Web Scraping",
    "Data Mining",
    "Content Analysis",
    "SEO Research",
    "Market Research",
  ]

  const taxonomieOptions = [
    "Taxonomie Selected",
    "Web Security",
    "Data Classification",
    "Content Taxonomy",
    "Information Architecture",
    "Knowledge Management",
  ]

  const selectTagsOptions2 = ["Select Tags", "Social Media", "E-commerce", "News Sites", "Forums", "Blogs"]

  const galaxyOptions = [
    "Galaxy Selected",
    "Alpha Galaxy",
    "Beta Galaxy",
    "Gamma Galaxy",
    "Delta Galaxy",
    "Epsilon Galaxy",
  ]

  const cookiejarOptions = [
    "Dont use a cookie jar",
    "Use default cookie jar",
    "Use custom cookie jar",
    "Use session cookie jar",
    "Use persistent cookies",
  ]

  const crawlerTypeOptions = [
    "Dont use a cookie jar",
    "Standard Crawler",
    "Deep Crawler",
    "Fast Crawler",
    "Custom Crawler",
    "Stealth Crawler",
  ]

  const depthLimitOptions = ["0", "1", "2", "3", "4", "5"]


  const handleSubmit = () => {
    const formData = {
      customTags,
      selectedTags1,
      selectedTaxonomie,
      selectedTags2,
      selectedGalaxy,
      multipleUrls,
      domainAddress,
      cookiejar,
      crawlerType,
      depthLimit,
      options: {
        html: htmlEnabled,
        screenshot: screenshotEnabled,
        har: harEnabled,
      },
    }

    console.log("Crawl Domain Form submitted:", formData)
    alert("Form submitted successfully! Check console for details.")
  }



  return (
      <div  >
         {/* Title */}
        <div className={`w-full pb-4 border-b border-transparent relative inline-block mt-12 mb-5 ${
            darkMode
              ? "text-white"
              : "text-[#1E293B]/80"
          }`}>
          <h1 className="text-md  flex justify-start ">
           Crawl A Domain
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
          </h1>
        </div>

        {/* Main Form Container */}
        <div className="space-y-2">
          {/* Tags Section */}
          <div className={`rounded-lg p-6 text-sm ${darkMode ? "bg-[#232A34]/40 border border-[#232A34]/40" : "bg-white border border-gray-200"}`}>
            <h2 className={`mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>Tags</h2>

            <div className="space-y-2">
              <input
                type="text"
                placeholder="Custom tags (optional, space-separated)"
                value={customTags}
                onChange={(e) => setCustomTags(e.target.value)}
                className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-xs ${
                  darkMode
                    ? " border-gray-600 text-white placeholder-gray-400"
                    : " border-gray-300 text-gray-900 placeholder-gray-300 "
                }`}
              />

              {/* Flex layout for dropdowns */}
              <div className="flex gap-5 w-full">
  {/* part1 */}
  <div className="flex w-full gap-1">
    <div className="w-full">
      <Dropdown1
        value={selectedTags1}
        onChange={setSelectedTags1}
        options={selectTagsOptions1}
        className="w-full"
      />
    </div>
    <div className="flex-shrink-0">
      <Dropdown2
        value={selectedTaxonomie}
        onChange={setSelectedTaxonomie}
        options={taxonomieOptions}
        className=""
      />
    </div>
  </div>

  {/* part 2 */}
  <div className="flex w-full gap-1">
    <div className="w-full">
      <Dropdown1
        value={selectedTags2}
        onChange={setSelectedTags2}
        options={selectTagsOptions2}
        className="w-full  "
      />
    </div>
    <div className="flex-shrink-0">
      <Dropdown2
        value={selectedGalaxy}
        onChange={setSelectedGalaxy}
        options={galaxyOptions}
        className=""
      />
    </div>
  </div>
</div>

            </div>
          </div>

          {/* Multiple URLs Section */}
          {/* <div className="space-y-4">
            <div className="flex justify-between w-fit">
              <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"} pr-4`}>Single URL</span>
              <Toggle enabled={multipleUrls} onChange={setMultipleUrls}/>
              <span className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>Multiple URLs</span>
            </div>
 </div> */}

            {/* self  */}
            <div className="space-y-2 mt-5">
 <div className="flex gap-1 text-xs">
      <button
        onClick={() => setSelected("left") && setMultipleUrls}
        className={`px-4 py-1  rounded-full   transition-all duration-300
          ${selected === "left"
            ? "border border-[#1F6F8B] bg-[#1F6F8B] text-white"
            : `border   ${darkMode ? "border-gray-400 text-gray-400 hover:border-gray-500  hover:text-gray-500":" text-gray-400 hover:bg-[#1F6F8B]/20  hover:border-[#1F6F8B]/20 border-gray-200"}`}`}
      >
        Single Url
      </button>

      <button
        onClick={() => setSelected("right") && setMultipleUrls}
        className={`px-4 rounded-full   transition-all duration-300
          ${selected === "right"
            ? "border border-[#1F6F8B] bg-[#1F6F8B] text-white"
               : `border   ${darkMode ? "border-gray-400 text-gray-400 hover:border-gray-500  hover:text-gray-500":" text-gray-400 hover:bg-[#1F6F8B]/20  hover:border-[#1F6F8B]/20 border-gray-200"}`}`}
      >
          Multiple URLs
      </button>
    </div>
            <input
              type="text"
              placeholder="Address Or Domain"
              value={domainAddress}
              onChange={(e) => setDomainAddress(e.target.value)}
              className={`w-full px-3 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-xs ${
                darkMode
                  ? " border-gray-600 text-white placeholder-gray-400"
                  : " border-gray-300 text-gray-900 placeholder-gray-500"
              }`}
            />
         </div>

          {/* Configuration Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
            <div className="flex items-center space-x-2">
  <label
    className={`block text-xs font-medium whitespace-nowrap ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
    Cookiejar
  </label>
  <select
    value={cookiejar}
    onChange={(e) => setCookiejar(e.target.value)}
    className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-xs ${
      darkMode
        ? " border-gray-600 text-white"
        : " border-gray-300 text-gray-900"
    }`}
  >
    {cookiejarOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

           
            <div className="flex items-center space-x-2">
  <label
    className={`block text-xs font-medium whitespace-nowrap ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
   Crawler Type
  </label>
  <select
    value={crawlerType}
    onChange={(e) => setCrawlerType(e.target.value)}
    className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-xs ${
      darkMode
        ? " border-gray-600 text-white"
        : " border-gray-300 text-gray-900"
    }`}
  >
    {crawlerTypeOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

           
            <div className="flex items-center space-x-2">
  <label
    className={`block text-xs font-medium whitespace-nowrap ${
      darkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
   Depth Limit
  </label>
  <select
    value={depthLimit}
    onChange={(e) => setDepthLimit(e.target.value)}
    className={`flex-1 px-3 py-2 rounded border focus:outline-none focus:ring-1 focus:ring-cyan-500 transition-colors text-xs ${
      darkMode
        ? " border-gray-600 text-white"
        : " border-gray-300 text-gray-900"
    }`}
  >
    {depthLimitOptions.map((option, index) => (
      <option key={index} value={option}>
        {option}
      </option>
    ))}
  </select>
</div>

          </div>
          

          {/* Options Section */}
          <div className="space-y-4">
            <div className={`flex gap-4  ${darkMode? "text-gray-300":"text-gray-700"}`}>
              <Toggle enabled={htmlEnabled} onChange={setHtmlEnabled} label="HTML" />
              <Toggle enabled={screenshotEnabled} onChange={setScreenshotEnabled} label="Screenshot" />
              <Toggle enabled={harEnabled} onChange={setHarEnabled} label="HAR" />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-20 py-2 bg-gradient-to-r from-[#E47692] to-[#47CBE4] hover:from-[#df6180] hover:to-[#3ac9e6] text-white font-medium rounded-sm transition-all duration-200 shadow-sm text-sm"
            >
              Send To Spider
            </button>
          </div>
        </div>
      </div>
   
  )
}

export default ManualCrawler
