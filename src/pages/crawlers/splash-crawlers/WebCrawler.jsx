"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import {
  Sun,
  Moon,
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Eye,
  EyeOff,
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Database,
} from "lucide-react"

const WebCrawler = () => {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [showWebDomains, setShowWebDomains] = useState(false)
  const [domainUp, setDomainUp] = useState(true)
  const [domainDown, setDomainDown] = useState(true)
  const [startDate, setStartDate] = useState("2025-06-22")
  const [endDate, setEndDate] = useState("2025-06-28")
  const [showStartCalendar, setShowStartCalendar] = useState(false)
  const [showEndCalendar, setShowEndCalendar] = useState(false)
  const [upCount, setUpCount] = useState(12)
  const [downCount, setDownCount] = useState(3)
  const [crawledCount, setCrawledCount] = useState(8)
  const [queuedCount, setQueuedCount] = useState(5)

  const startCalendarRef = useRef(null)
  const endCalendarRef = useRef(null)

  // Close calendars when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (startCalendarRef.current && !startCalendarRef.current.contains(event.target)) {
        setShowStartCalendar(false)
      }
      if (endCalendarRef.current && !endCalendarRef.current.contains(event.target)) {
        setShowEndCalendar(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Generate sample table data
  const generateTableData = useCallback(() => {
    const items = [".org", ".text", ".html", ".php", ".js", ".css", ".json", ".xml"]
    const data = []
    for (let i = 1; i <= 47; i++) {
      data.push({
        id: i,
        date: `2025/06/${String(Math.floor(Math.random() * 28) + 1).padStart(2, "0")}`,
        item: items[Math.floor(Math.random() * items.length)],
        status: Math.random() > 0.7 ? "error" : "success",
      })
    }
    return data
  }, [])

  const [tableData] = useState(generateTableData())

  // Sample data for charts
  const statisticsData = [
    { name: "Day 1", value: 25 },
    { name: "Day 2", value: 20 },
    { name: "Day 3", value: 23 },
    { name: "Day 4", value: 18 },
    { name: "Day 5", value: 26 },
    { name: "Day 6", value: 24 },
  ]

  const monthStatsData = [
    { month: "Jan", green: 22, red: 8 },
    { month: "Feb", green: 18, red: 12 },
    { month: "Mar", green: 25, red: 5 },
    { month: "Apr", green: 20, red: 10 },
    { month: "May", green: 28, red: 7 },
    { month: "Jun", green: 24, red: 6 },
  ]

  const previousMonthData = [
    { month: "Jul", green: 19, red: 11 },
    { month: "Aug", green: 23, red: 7 },
    { month: "Sep", green: 21, red: 9 },
    { month: "Oct", green: 26, red: 4 },
    { month: "Nov", green: 22, red: 8 },
    { month: "Dec", green: 27, red: 3 },
  ]

  const itemsPerPage = 6
  const totalPages = Math.ceil(tableData.length / itemsPerPage)

  // Enhanced Custom Toggle Switch Component
  const CustomToggle = ({ checked, onChange, label, disabled = false }) => (
    <div className="flex items-center justify-between py-2">
      <label className={`text-sm font-medium ${disabled ? "opacity-50" : ""}`}>{label}</label>
      <button
        onClick={() => !disabled && onChange(!checked)}
        disabled={disabled}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          disabled
            ? "opacity-50 cursor-not-allowed"
            : checked
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-gray-300 hover:bg-gray-400"
        } ${isDarkMode && !checked ? "bg-gray-600 hover:bg-gray-500" : ""}`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  )

  // Enhanced Date Picker Component
  const DatePicker = ({ value, onChange, onClose, show, label, containerRef }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth())
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear())

    if (!show) return null

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
    const today = new Date()

    const days = []

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null)
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    const handleDateSelect = (day) => {
      if (day) {
        const selectedDate = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`
        onChange(selectedDate)
        onClose()
      }
    }

    const navigateMonth = (direction) => {
      if (direction === "prev") {
        if (currentMonth === 0) {
          setCurrentMonth(11)
          setCurrentYear(currentYear - 1)
        } else {
          setCurrentMonth(currentMonth - 1)
        }
      } else {
        if (currentMonth === 11) {
          setCurrentMonth(0)
          setCurrentYear(currentYear + 1)
        } else {
          setCurrentMonth(currentMonth + 1)
        }
      }
    }

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ]

    const isToday = (day) => {
      return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear()
    }

    const isSelected = (day) => {
      const selectedDate = new Date(value)
      return (
        day === selectedDate.getDate() &&
        currentMonth === selectedDate.getMonth() &&
        currentYear === selectedDate.getFullYear()
      )
    }

    return (
      <div className="absolute top-full left-0 mt-2 z-50" ref={containerRef}>
        <div
          className={`w-80 rounded-lg shadow-2xl border ${
            isDarkMode ? "bg-gray-800 border-gray-600 text-white" : "bg-white border-gray-200 text-gray-900"
          }`}
        >
          {/* Header */}
          <div className={`px-4 py-3 border-b ${isDarkMode ? "border-gray-600" : "border-gray-200"}`}>
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigateMonth("prev")}
                className={`p-1 rounded-md hover:bg-gray-100 ${isDarkMode ? "hover:bg-gray-700" : ""} transition-colors`}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </div>
              <button
                onClick={() => navigateMonth("next")}
                className={`p-1 rounded-md hover:bg-gray-100 ${isDarkMode ? "hover:bg-gray-700" : ""} transition-colors`}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>


          {/* Calendar Body */}
          <div className="p-4">
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-3">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div key={day} className="font-semibold text-gray-500 p-2">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {days.map((day, index) => (
                <button
                  key={index}
                  onClick={() => handleDateSelect(day)}
                  disabled={!day}
                  className={`h-10 w-10 rounded-md text-sm font-medium transition-all duration-150 ${
                    !day
                      ? "cursor-default"
                      : isSelected(day)
                        ? "bg-blue-600 text-white shadow-md"
                        : isToday(day)
                          ? "bg-blue-100 text-blue-800 font-bold"
                          : `hover:bg-gray-100 ${isDarkMode ? "hover:bg-gray-700" : ""}`
                  }`}
                >
                  {day || ""}
                </button>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div
            className={`px-4 py-3 border-t ${isDarkMode ? "border-gray-600" : "border-gray-200"} flex justify-end space-x-2`}
          >
            <button
              onClick={onClose}
              className={`px-4 py-2 text-sm rounded-md border transition-colors ${
                isDarkMode ? "border-gray-600 hover:bg-gray-700" : "border-gray-300 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Custom Status Badge Component
  const StatusBadge = ({ children, variant = "default" }) => {
    const variants = {
      default: "bg-gray-100 text-gray-800 border-gray-300",
      success: "bg-green-100 text-green-800 border-green-300",
      error: "bg-red-100 text-red-800 border-red-300",
      info: "bg-blue-100 text-blue-800 border-blue-300",
    }

    const darkVariants = {
      default: "bg-gray-700 text-gray-200 border-gray-600",
      success: "bg-green-900 text-green-200 border-green-700",
      error: "bg-red-900 text-red-200 border-red-700",
      info: "bg-blue-900 text-blue-200 border-blue-700",
    }

    return (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
          isDarkMode ? darkVariants[variant] : variants[variant]
        }`}
      >
        {children}
      </span>
    )
  }

  // Custom Card Component
  const Card = ({ children, className = "", header, title }) => (
    <div
      className={`rounded-xl border shadow-sm ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } ${className}`}
    >
      {(header || title) && (
        <div className={`px-6 py-4 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
          {header || <h3 className="text-lg font-semibold">{title}</h3>}
        </div>
      )}
      {children}
    </div>
  )

  // Pagination functions
  const goToFirstPage = () => setCurrentPage(1)
  const goToLastPage = () => setCurrentPage(totalPages)
  const goToPreviousPage = () => currentPage > 1 && setCurrentPage(currentPage - 1)
  const goToNextPage = () => currentPage < totalPages && setCurrentPage(currentPage + 1)
  const goToPage = (page) => page >= 1 && page <= totalPages && setCurrentPage(page)

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return tableData.slice(startIndex, endIndex)
  }

  const renderPaginationNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - 2)
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }

    return pages
  }

  // Toggle functions
  const toggleDomainUp = () => {
    setDomainUp(!domainUp)
    setUpCount(domainUp ? 0 : 12)
  }

  const toggleDomainDown = () => {
    setDomainDown(!domainDown)
    setDownCount(domainDown ? 0 : 3)
  }

  const toggleShowWebDomains = () => {
    setShowWebDomains(!showWebDomains)
    if (!showWebDomains) {
      setUpCount(upCount + 8)
      setDownCount(downCount + 2)
      setCrawledCount(crawledCount + 5)
      setQueuedCount(queuedCount + 3)
    } else {
      setUpCount(Math.max(0, upCount - 8))
      setDownCount(Math.max(0, downCount - 2))
      setCrawledCount(Math.max(0, crawledCount - 5))
      setQueuedCount(Math.max(0, queuedCount - 3))
    }
  }

  // Status indicator component
  const StatusIndicator = ({ label, count, color, icon: Icon, trend }) => (
    <div
      className={`p-4 rounded-lg border ${
        isDarkMode ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200"
      } hover:shadow-md transition-shadow`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${color.replace("text-", "bg-").replace("500", "100")}`}>
            <Icon className={`w-5 h-5 ${color}`} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{count}</p>
          </div>
        </div>
        {trend && (
          <div className={`text-xs ${trend > 0 ? "text-green-500" : "text-red-500"}`}>
           
           
          </div>
        )}
      </div>
    </div>
  )

  const themeClasses = isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"

  return (
    <div className={`min-h-screen p-20 ${themeClasses} transition-all duration-300`}>
      {/* Enhanced Header */}
      {/* <header
        className={`border-b backdrop-blur-sm ${
          isDarkMode ? "bg-gray-900/95 border-gray-700" : "bg-white/95 border-gray-200"
        } sticky top-0 z-40`}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto p-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Web Crawler</h1>
              <p className="text-sm text-gray-500">Advanced Web Monitoring Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              isDarkMode
                ? "border-gray-600 hover:bg-gray-700 hover:border-gray-500"
                : "border-gray-300 hover:bg-gray-100 hover:border-gray-400"
            }`}
          >
            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </header> */}
{/* Title */}
       <div className="w-full mb-2 font-medium   pb-4 border-b border-transparent relative inline-block">
  <h1 className="text-2xl  flex justify-start">
    Web Crawler
    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#F56C89] to-[#39D3EC]"></span>
  </h1>
</div>
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Enhanced Search Data Range Section */}
        <Card
          header={
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Calendar className="w-6 h-6 text-blue-500" />
                <div>
                  <h2 className="text-xl font-bold">Search Data Range</h2>
                  <p className="text-sm text-gray-500">Configure your data search parameters</p>
                </div>
              </div>
              <button
                onClick={toggleShowWebDomains}
                className={`flex items-center justify-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 min-w-60 ${
                  showWebDomains
                    ? "bg-gradient-to-r from-[#c7547c] to-[#4ec7e0] text-white shadow-lg hover:shadow-xl"
                    : "bg-gradient-to-r from-[#c7547c] to-[#4ec7e0] text-white shadow-lg hover:shadow-xl"
                }`}
              >
                {showWebDomains ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                <span>{showWebDomains ? "Hide" : "Show"} Web Domains</span>
              </button>
            </div>
          }
        >
          <div className="p-6 space-y-8">
            {/* Date Range and Controls */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Date Range Inputs */}
              <div className="xl:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">Start Date</label>
                    <div className="relative" ref={startCalendarRef}>
                      <input
                        type="text"
                        placeholder="yyyy-mm-dd"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                      />
                      <button
                        onClick={() => {
                          setShowStartCalendar(!showStartCalendar)
                          setShowEndCalendar(false)
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </button>
                      <DatePicker
                        value={startDate}
                        onChange={setStartDate}
                        show={showStartCalendar}
                        onClose={() => setShowStartCalendar(false)}
                        label="Start Date"
                        containerRef={startCalendarRef}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">End Date</label>
                    <div className="relative" ref={endCalendarRef}>
                      <input
                        type="text"
                        placeholder="yyyy-mm-dd"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className={`w-full px-4 py-3 pr-12 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          isDarkMode
                            ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500"
                            : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500"
                        }`}
                      />
                      <button
                        onClick={() => {
                          setShowEndCalendar(!showEndCalendar)
                          setShowStartCalendar(false)
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </button>
                      <DatePicker
                        value={endDate}
                        onChange={setEndDate}
                        show={showEndCalendar}
                        onClose={() => setShowEndCalendar(false)}
                        label="End Date"
                        containerRef={endCalendarRef}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Domain Toggles */}
              <div
                className={`p-6 rounded-xl border-2 border-dashed ${
                  isDarkMode ? "border-gray-600 bg-gray-800/50" : "border-gray-300 bg-gray-50"
                }`}
              >
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">Domain Filters</h4>
                <div className="space-y-4">
                  <CustomToggle checked={domainUp} onChange={toggleDomainUp} label="Domain Up" />
                  <CustomToggle checked={domainDown} onChange={toggleDomainDown} label="Domain Down" />
                </div>
              </div>
            </div>

            {/* Enhanced Status Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatusIndicator
                label="UP"
                count={domainUp ? upCount : 0}
                color="text-green-500"
                icon={TrendingUp}
                
              />
              <StatusIndicator
                label="DOWN"
                count={domainDown ? downCount : 0}
                color="text-red-500"
                icon={TrendingDown}
               
              />
              <StatusIndicator label="CRAWLED" count={crawledCount} color="text-blue-500" icon={Database} trend={8} />
              <StatusIndicator label="QUEUED" count={queuedCount} color="text-purple-500" icon={Clock} trend={3} />
            </div>

            {/* Data Table and Statistics */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Enhanced Data Table */}
              <Card title="Recent Activity">
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {getCurrentPageData().map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${item.status === "success" ? "bg-green-500" : "bg-red-500"}`}
                        />
                        <StatusBadge variant="info">{item.date}</StatusBadge>
                      </div>
                      <span className="font-mono text-sm font-medium">{item.item}</span>
                    </div>
                  ))}
                </div>

                {/* Enhanced Pagination */}
                <div
                  className={`px-4 py-4 border-t ${isDarkMode ? "border-gray-700 bg-gray-800/50" : "border-gray-200 bg-gray-50"}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToFirstPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-all ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <ChevronsLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-lg transition-all ${
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center space-x-1">
                      {renderPaginationNumbers().map((page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-lg text-sm font-medium transition-all ${
                            currentPage === page
                              ? "bg-blue-600 text-white shadow-lg"
                              : "hover:bg-gray-200 dark:hover:bg-gray-600"
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-all ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                      <button
                        onClick={goToLastPage}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-lg transition-all ${
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : "hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        <ChevronsRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-center text-sm text-gray-500">
                    Page {currentPage} of {totalPages} • {tableData.length} total items
                  </div>
                </div>
              </Card>

              {/* Enhanced Statistics Chart */}
              <Card title="Activity Statistics">
                <div className="p-6">
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={statisticsData}>
                        <XAxis
                          dataKey="name"
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                        />
                        <YAxis
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                          domain={[0, 30]}
                          ticks={[0, 5, 10, 15, 20, 25, 30]}
                        />
                        <Bar dataKey="value" fill="url(#gradient)" radius={[6, 6, 0, 0]} maxBarSize={50} />
                        <defs>
                          <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#1D4ED8" />
                          </linearGradient>
                        </defs>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Enhanced Previous Stats Section */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full" />
            <h3 className="text-2xl font-bold">Historical Analytics</h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Month Stats */}
            <Card title="Current Month Performance">
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthStatsData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                        domain={[0, 30]}
                      />
                      <Bar dataKey="green" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={30} />
                      <Bar dataKey="red" fill="#EF4444" radius={[3, 3, 0, 0]} maxBarSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>

            {/* Previous Month Stats */}
            <Card title="Previous Month Comparison">
              <div className="p-6">
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={previousMonthData}>
                      <XAxis
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: isDarkMode ? "#9CA3AF" : "#6B7280" }}
                        domain={[0, 30]}
                      />
                      <Bar dataKey="green" fill="#10B981" radius={[3, 3, 0, 0]} maxBarSize={30} />
                      <Bar dataKey="red" fill="#EF4444" radius={[3, 3, 0, 0]} maxBarSize={30} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WebCrawler
