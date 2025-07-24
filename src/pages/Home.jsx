"use client"

import { useState } from "react"

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false)
  const [trackersPage, setTrackersPage] = useState(1)
  const [tagsPage, setTagsPage] = useState(1)
  const [selectedDate, setSelectedDate] = useState("2024-01-15")
  const [searchDate, setSearchDate] = useState("")
  const itemsPerPage = 5

  // Multiple chart datasets for different dates
  const chartDatasets = {
    "2024-01-15": [
      { month: "Jan", live: 35, down: 25 },
      { month: "Feb", live: 55, down: 15 },
      { month: "Mar", live: 25, down: 35 },
      { month: "Apr", live: 45, down: 20 },
      { month: "May", live: 65, down: 10 },
      { month: "Jun", live: 30, down: 30 },
      { month: "Jul", live: 50, down: 25 },
      { month: "Aug", live: 40, down: 20 },
      { month: "Sep", live: 60, down: 15 },
      { month: "Oct", live: 35, down: 25 },
      { month: "Nov", live: 55, down: 20 },
      { month: "Dec", live: 45, down: 30 },
    ],
    "2024-02-20": [
      { month: "Jan", live: 42, down: 18 },
      { month: "Feb", live: 38, down: 22 },
      { month: "Mar", live: 55, down: 15 },
      { month: "Apr", live: 30, down: 35 },
      { month: "May", live: 48, down: 12 },
      { month: "Jun", live: 62, down: 8 },
      { month: "Jul", live: 35, down: 25 },
      { month: "Aug", live: 58, down: 12 },
      { month: "Sep", live: 45, down: 20 },
      { month: "Oct", live: 52, down: 18 },
      { month: "Nov", live: 40, down: 30 },
      { month: "Dec", live: 60, down: 10 },
    ],
    "2024-03-10": [
      { month: "Jan", live: 28, down: 32 },
      { month: "Feb", live: 65, down: 5 },
      { month: "Mar", live: 40, down: 20 },
      { month: "Apr", live: 55, down: 15 },
      { month: "May", live: 35, down: 25 },
      { month: "Jun", live: 48, down: 22 },
      { month: "Jul", live: 62, down: 8 },
      { month: "Aug", live: 30, down: 30 },
      { month: "Sep", live: 58, down: 12 },
      { month: "Oct", live: 45, down: 25 },
      { month: "Nov", live: 38, down: 22 },
      { month: "Dec", live: 52, down: 18 },
    ],
    "2024-04-05": [
      { month: "Jan", live: 50, down: 20 },
      { month: "Feb", live: 32, down: 28 },
      { month: "Mar", live: 58, down: 12 },
      { month: "Apr", live: 25, down: 35 },
      { month: "May", live: 60, down: 10 },
      { month: "Jun", live: 42, down: 18 },
      { month: "Jul", live: 38, down: 22 },
      { month: "Aug", live: 55, down: 15 },
      { month: "Sep", live: 30, down: 30 },
      { month: "Oct", live: 48, down: 22 },
      { month: "Nov", live: 62, down: 8 },
      { month: "Dec", live: 35, down: 25 },
    ],
    "2024-05-12": [
      { month: "Jan", live: 45, down: 25 },
      { month: "Feb", live: 60, down: 10 },
      { month: "Mar", live: 32, down: 28 },
      { month: "Apr", live: 52, down: 18 },
      { month: "May", live: 28, down: 32 },
      { month: "Jun", live: 58, down: 12 },
      { month: "Jul", live: 40, down: 20 },
      { month: "Aug", live: 35, down: 25 },
      { month: "Sep", live: 55, down: 15 },
      { month: "Oct", live: 42, down: 18 },
      { month: "Nov", live: 48, down: 22 },
      { month: "Dec", live: 62, down: 8 },
    ],
  }

  // Get current chart data based on selected date
  const getCurrentChartData = () => {
    return chartDatasets[selectedDate] || chartDatasets["2024-01-15"]
  }

  // Replace the static categoriesData with dynamic categories based on date
  const categoriesDatasets = {
    "2024-01-15": [
      { name: "Barcodes", count: 2, color: "#f59e0b" },
      { name: "Cans", count: 3, color: "#f59e0b" },
      { name: "Cookie Names", count: 5, color: "#3b82f6" },
      { name: "Cryptocurrencies", count: 1, color: "#6b7280" },
      { name: "Cvs", count: 4, color: "#10b981" },
      { name: "Decoders", count: 2, color: "#3b82f6" },
      { name: "Donations", count: 3, color: "#6b7280" },
      { name: "Domains", count: 6, color: "#6b7280" },
      { name: "E-Tags", count: 2, color: "#06b6d4" },
      { name: "Extensions", count: 4, color: "#3b82f6" },
      { name: "Frameworks", count: 3, color: "#6b7280" },
    ],
    "2024-02-20": [
      { name: "Barcodes", count: 4, color: "#f59e0b" },
      { name: "Cans", count: 1, color: "#f59e0b" },
      { name: "Cookie Names", count: 7, color: "#3b82f6" },
      { name: "Cryptocurrencies", count: 3, color: "#6b7280" },
      { name: "Cvs", count: 2, color: "#10b981" },
      { name: "Decoders", count: 5, color: "#3b82f6" },
      { name: "Donations", count: 1, color: "#6b7280" },
      { name: "Domains", count: 4, color: "#6b7280" },
      { name: "E-Tags", count: 6, color: "#06b6d4" },
      { name: "Extensions", count: 2, color: "#3b82f6" },
      { name: "Frameworks", count: 5, color: "#6b7280" },
    ],
    "2024-03-10": [
      { name: "Barcodes", count: 1, color: "#f59e0b" },
      { name: "Cans", count: 5, color: "#f59e0b" },
      { name: "Cookie Names", count: 3, color: "#3b82f6" },
      { name: "Cryptocurrencies", count: 8, color: "#6b7280" },
      { name: "Cvs", count: 2, color: "#10b981" },
      { name: "Decoders", count: 4, color: "#3b82f6" },
      { name: "Donations", count: 6, color: "#6b7280" },
      { name: "Domains", count: 2, color: "#6b7280" },
      { name: "E-Tags", count: 3, color: "#06b6d4" },
      { name: "Extensions", count: 7, color: "#3b82f6" },
      { name: "Frameworks", count: 1, color: "#6b7280" },
    ],
    "2024-04-05": [
      { name: "Barcodes", count: 6, color: "#f59e0b" },
      { name: "Cans", count: 2, color: "#f59e0b" },
      { name: "Cookie Names", count: 4, color: "#3b82f6" },
      { name: "Cryptocurrencies", count: 2, color: "#6b7280" },
      { name: "Cvs", count: 7, color: "#10b981" },
      { name: "Decoders", count: 1, color: "#3b82f6" },
      { name: "Donations", count: 5, color: "#6b7280" },
      { name: "Domains", count: 3, color: "#6b7280" },
      { name: "E-Tags", count: 4, color: "#06b6d4" },
      { name: "Extensions", count: 1, color: "#3b82f6" },
      { name: "Frameworks", count: 6, color: "#6b7280" },
    ],
    "2024-05-12": [
      { name: "Barcodes", count: 3, color: "#f59e0b" },
      { name: "Cans", count: 4, color: "#f59e0b" },
      { name: "Cookie Names", count: 2, color: "#3b82f6" },
      { name: "Cryptocurrencies", count: 5, color: "#6b7280" },
      { name: "Cvs", count: 1, color: "#10b981" },
      { name: "Decoders", count: 8, color: "#3b82f6" },
      { name: "Donations", count: 2, color: "#6b7280" },
      { name: "Domains", count: 5, color: "#6b7280" },
      { name: "E-Tags", count: 7, color: "#06b6d4" },
      { name: "Extensions", count: 3, color: "#3b82f6" },
      { name: "Frameworks", count: 4, color: "#6b7280" },
    ],
  }

  // Add function to get current categories data
  const getCurrentCategoriesData = () => {
    return categoriesDatasets[selectedDate] || categoriesDatasets["2024-01-15"]
  }

  // Extended dummy data for pagination
  const allTrackersData = [
    { id: 1, tracker: "Web Analytics", time: "2 hours ago" },
    { id: 2, tracker: "User Behavior", time: "4 hours ago" },
    { id: 3, tracker: "Performance Monitor", time: "6 hours ago" },
    { id: 4, tracker: "Error Tracking", time: "8 hours ago" },
    { id: 5, tracker: "Conversion Tracker", time: "10 hours ago" },
    { id: 6, tracker: "Social Media Tracker", time: "12 hours ago" },
    { id: 7, tracker: "Email Campaign", time: "14 hours ago" },
    { id: 8, tracker: "Mobile App Analytics", time: "16 hours ago" },
    { id: 9, tracker: "SEO Monitor", time: "18 hours ago" },
    { id: 10, tracker: "Ad Performance", time: "20 hours ago" },
    { id: 11, tracker: "Customer Journey", time: "22 hours ago" },
    { id: 12, tracker: "Revenue Tracking", time: "1 day ago" },
    { id: 13, tracker: "Content Analytics", time: "1 day ago" },
    { id: 14, tracker: "API Monitor", time: "1 day ago" },
    { id: 15, tracker: "Database Performance", time: "1 day ago" },
    { id: 16, tracker: "Security Monitor", time: "2 days ago" },
    { id: 17, tracker: "Load Balancer", time: "2 days ago" },
    { id: 18, tracker: "CDN Analytics", time: "2 days ago" },
    { id: 19, tracker: "Server Health", time: "2 days ago" },
    { id: 20, tracker: "Network Monitor", time: "3 days ago" },
  ]

  const allTagsData = [
    { id: 1, tags: "analytics, web", time: "1 hour ago" },
    { id: 2, tags: "user, behavior", time: "3 hours ago" },
    { id: 3, tags: "performance", time: "5 hours ago" },
    { id: 4, tags: "error, logging", time: "7 hours ago" },
    { id: 5, tags: "conversion, sales", time: "9 hours ago" },
    { id: 6, tags: "social, media", time: "11 hours ago" },
    { id: 7, tags: "email, campaign", time: "13 hours ago" },
    { id: 8, tags: "mobile, app", time: "15 hours ago" },
    { id: 9, tags: "seo, search", time: "17 hours ago" },
    { id: 10, tags: "advertising, ppc", time: "19 hours ago" },
    { id: 11, tags: "customer, journey", time: "21 hours ago" },
    { id: 12, tags: "revenue, finance", time: "23 hours ago" },
    { id: 13, tags: "content, blog", time: "1 day ago" },
    { id: 14, tags: "api, integration", time: "1 day ago" },
    { id: 15, tags: "database, sql", time: "1 day ago" },
    { id: 16, tags: "security, auth", time: "2 days ago" },
    { id: 17, tags: "load, balance", time: "2 days ago" },
    { id: 18, tags: "cdn, cache", time: "2 days ago" },
    { id: 19, tags: "server, health", time: "2 days ago" },
    { id: 20, tags: "network, tcp", time: "3 days ago" },
  ]

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  // Date search functionality
  const handleDateSearch = () => {
    if (searchDate && chartDatasets[searchDate]) {
      setSelectedDate(searchDate)
    } else if (searchDate) {
      alert("No data available for this date. Available dates: " + Object.keys(chartDatasets).join(", "))
    }
  }

  const formatDisplayDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Pagination logic
  const totalTrackersPages = Math.ceil(allTrackersData.length / itemsPerPage)
  const totalTagsPages = Math.ceil(allTagsData.length / itemsPerPage)

  const getCurrentTrackersData = () => {
    const startIndex = (trackersPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return allTrackersData.slice(startIndex, endIndex)
  }

  const getCurrentTagsData = () => {
    const startIndex = (tagsPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return allTagsData.slice(startIndex, endIndex)
  }

  const handleTrackersPageChange = (page) => {
    if (page >= 1 && page <= totalTrackersPages) {
      setTrackersPage(page)
    }
  }

  const handleTagsPageChange = (page) => {
    if (page >= 1 && page <= totalTagsPages) {
      setTagsPage(page)
    }
  }

  const feedersData = getCurrentChartData()
  const maxValue = Math.max(...feedersData.map((d) => d.live + d.down))

  const styles = {
    container: {
      minHeight: "100vh",
      backgroundColor: isDark ? "#0f172a" : "#f8fafc",
      color: isDark ? "#ffffff" : "#0f172a",
      fontFamily: "system-ui, -apple-system, sans-serif",
      padding: "24px",
    },
    card: {
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      border: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
      borderRadius: "8px",
      boxShadow: isDark ? "0 1px 3px rgba(0,0,0,0.3)" : "0 1px 3px rgba(0,0,0,0.1)",
    },
    tableHeader: {
      backgroundColor: isDark ? "#334155" : "#1e293b",
      color: "#ffffff",
      padding: "12px 16px",
      fontSize: "14px",
      fontWeight: "600",
    },
    tableRow: {
      backgroundColor: isDark ? "#1e293b" : "#ffffff",
      borderBottom: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
    },
    tableCell: {
      padding: "12px 16px",
      fontSize: "14px",
      borderBottom: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
    },
    button: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: `1px solid ${isDark ? "#475569" : "#d1d5db"}`,
      backgroundColor: isDark ? "#475569" : "#ffffff",
      color: isDark ? "#ffffff" : "#374151",
      cursor: "pointer",
      fontSize: "12px",
      transition: "all 0.2s ease",
    },
    buttonActive: {
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      border: "1px solid #3b82f6",
    },
    buttonDisabled: {
      opacity: 0.5,
      cursor: "not-allowed",
    },
    searchContainer: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "16px",
      padding: "12px",
      backgroundColor: isDark ? "#334155" : "#f1f5f9",
      borderRadius: "6px",
    },
    input: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: `1px solid ${isDark ? "#475569" : "#d1d5db"}`,
      backgroundColor: isDark ? "#475569" : "#ffffff",
      color: isDark ? "#ffffff" : "#374151",
      fontSize: "12px",
      outline: "none",
    },
    searchButton: {
      padding: "6px 12px",
      borderRadius: "4px",
      border: "1px solid #3b82f6",
      backgroundColor: "#3b82f6",
      color: "#ffffff",
      cursor: "pointer",
      fontSize: "12px",
      transition: "all 0.2s ease",
    },
  }

  const PaginationControls = ({ currentPage, totalPages, onPageChange }) => (
    <div
      style={{
        padding: "16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
        borderTop: `1px solid ${isDark ? "#334155" : "#e2e8f0"}`,
      }}
    >
      <button
        style={{
          ...styles.button,
          ...(currentPage === 1 ? styles.buttonDisabled : {}),
        }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        First
      </button>
      <button
        style={{
          ...styles.button,
          ...(currentPage === 1 ? styles.buttonDisabled : {}),
        }}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Back
      </button>

      {[...Array(Math.min(5, totalPages))].map((_, index) => {
        let pageNum
        if (totalPages <= 5) {
          pageNum = index + 1
        } else if (currentPage <= 3) {
          pageNum = index + 1
        } else if (currentPage >= totalPages - 2) {
          pageNum = totalPages - 4 + index
        } else {
          pageNum = currentPage - 2 + index
        }

        return (
          <button
            key={pageNum}
            style={{
              ...styles.button,
              ...(currentPage === pageNum ? styles.buttonActive : {}),
            }}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </button>
        )
      })}

      {totalPages > 5 && currentPage < totalPages - 2 && (
        <>
          <span style={{ margin: "0 8px", fontSize: "12px" }}>...</span>
          <button style={styles.button} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </button>
        </>
      )}

      <button
        style={{
          ...styles.button,
          ...(currentPage === totalPages ? styles.buttonDisabled : {}),
        }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </button>
      <button
        style={{
          ...styles.button,
          ...(currentPage === totalPages ? styles.buttonDisabled : {}),
        }}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        Last
      </button>
    </div>
  )

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: "bold", margin: 0 }}>Dashboard</h1>
        <button
          style={{
            padding: "8px 16px",
            borderRadius: "6px",
            border: `1px solid ${isDark ? "#475569" : "#d1d5db"}`,
            backgroundColor: isDark ? "#475569" : "#ffffff",
            color: isDark ? "#ffffff" : "#374151",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
          onClick={toggleTheme}
        >
          {isDark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>

      {/* Date Search */}
      <div style={styles.searchContainer}>
        <span style={{ fontSize: "14px", fontWeight: "500" }}>📅 Search Chart by Date:</span>
        <input
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          style={styles.input}
          placeholder="YYYY-MM-DD"
        />
        <button style={styles.searchButton} onClick={handleDateSearch}>
          Search
        </button>
        <div style={{ marginLeft: "auto", fontSize: "12px", color: isDark ? "#94a3b8" : "#64748b" }}>
          Current: {formatDisplayDate(selectedDate)} | Available: {Object.keys(chartDatasets).length} datasets
        </div>
      </div>

      {/* Quick Date Buttons */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "24px", flexWrap: "wrap" }}>
        {Object.keys(chartDatasets).map((date) => (
          <button
            key={date}
            style={{
              ...styles.button,
              ...(selectedDate === date ? styles.buttonActive : {}),
              fontSize: "11px",
            }}
            onClick={() => setSelectedDate(date)}
          >
            {formatDisplayDate(date)}
          </button>
        ))}
      </div>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Feeders Chart */}
        <div style={styles.card}>
          <div style={{ padding: "20px", paddingBottom: "16px" }}>
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>
                Feeders - {formatDisplayDate(selectedDate)}
              </h3>
              <div style={{ display: "flex", gap: "8px" }}>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    backgroundColor: "#10b981",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Live
                </span>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    backgroundColor: "#ef4444",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Down
                </span>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    backgroundColor: "#06b6d4",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Created
                </span>
                <span
                  style={{
                    padding: "4px 8px",
                    borderRadius: "12px",
                    backgroundColor: "#8b5cf6",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: "600",
                  }}
                >
                  Deleted
                </span>
              </div>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "space-between",
                height: "200px",
                gap: "4px",
              }}
            >
              {feedersData.map((data, index) => (
                <div key={index} style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "end",
                      height: "160px",
                      width: "100%",
                      maxWidth: "24px",
                      gap: "1px",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "scale(1.05)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "scale(1)"
                    }}
                    title={`${data.month}: Live ${data.live}, Down ${data.down}, Total: ${data.live + data.down}`}
                  >
                    <div
                      style={{
                        backgroundColor: "#10b981",
                        height: `${(data.live / maxValue) * 100}%`,
                        minHeight: "4px",
                        transition: "all 0.3s ease",
                      }}
                    />
                    <div
                      style={{
                        backgroundColor: "#ef4444",
                        height: `${(data.down / maxValue) * 100}%`,
                        minHeight: "4px",
                        transition: "all 0.3s ease",
                      }}
                    />
                  </div>
                  <span style={{ fontSize: "11px", marginTop: "8px", color: isDark ? "#94a3b8" : "#64748b" }}>
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories */}
        <div style={styles.card}>
          <div style={{ padding: "20px", paddingBottom: "16px" }}>
            <div
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}
            >
              <h3 style={{ fontSize: "18px", fontWeight: "600", margin: 0 }}>Categories</h3>
              <span style={{ fontSize: "12px", color: isDark ? "#94a3b8" : "#64748b" }}>
                {formatDisplayDate(selectedDate)}
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {getCurrentCategoriesData().map((category, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "6px 8px",
                    cursor: "pointer",
                    borderRadius: "6px",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isDark ? "#334155" : "#f1f5f9"
                    e.currentTarget.style.transform = "translateX(4px)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent"
                    e.currentTarget.style.transform = "translateX(0px)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: category.color,
                        boxShadow: `0 0 0 2px ${category.color}20`,
                      }}
                    />
                    <span style={{ fontSize: "13px", fontWeight: "500" }}>{category.name}</span>
                  </div>
                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      backgroundColor: isDark ? "#475569" : "#e2e8f0",
                      padding: "2px 8px",
                      borderRadius: "12px",
                      minWidth: "20px",
                      textAlign: "center",
                    }}
                  >
                    {category.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Tables */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* Trackers Table */}
        <div style={styles.card}>
          <div style={styles.tableHeader}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" }} />
              <span>Tracker</span>
              <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" }} />
                <span>time</span>
              </div>
            </div>
          </div>

          <div>
            {getCurrentTrackersData().map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.tableRow,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#334155" : "#f8fafc"
                  e.currentTarget.style.transform = "translateX(2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#1e293b" : "#ffffff"
                  e.currentTarget.style.transform = "translateX(0px)"
                }}
              >
                <div
                  style={{
                    ...styles.tableCell,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" }} />
                    <span>{item.tracker}</span>
                  </div>
                  <span style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px" }}>{item.time}</span>
                </div>
              </div>
            ))}
          </div>

          <PaginationControls
            currentPage={trackersPage}
            totalPages={totalTrackersPages}
            onPageChange={handleTrackersPageChange}
          />
        </div>

        {/* Tags Table - FIXED ALIGNMENT: ID left, tags center, time right */}
        <div style={styles.card}>
          <div style={styles.tableHeader}>
            <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 100px", alignItems: "center", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#3b82f6" }} />
                <span>ID</span>
              </div>
              <div style={{ textAlign: "center" }}>
                <span>tags</span>
              </div>
              <div style={{ textAlign: "right" }}>
                <span>time</span>
              </div>
            </div>
          </div>

          <div>
            {getCurrentTagsData().map((item) => (
              <div
                key={item.id}
                style={{
                  ...styles.tableRow,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#334155" : "#f8fafc"
                  e.currentTarget.style.transform = "translateX(2px)"
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = isDark ? "#1e293b" : "#ffffff"
                  e.currentTarget.style.transform = "translateX(0px)"
                }}
              >
                <div
                  style={{
                    ...styles.tableCell,
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 100px",
                    alignItems: "center",
                    gap: "16px",
                  }}
                >
                  {/* ID - Left aligned */}
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "#10b981" }} />
                    <span style={{ fontWeight: "600" }}>{item.id}</span>
                  </div>

                  {/* Tags - Center aligned */}
                  <div style={{ textAlign: "center" }}>
                    <span
                      style={{
                        backgroundColor: isDark ? "#475569" : "#e2e8f0",
                        padding: "4px 8px",
                        borderRadius: "12px",
                        fontSize: "12px",
                        display: "inline-block",
                      }}
                    >
                      {item.tags}
                    </span>
                  </div>

                  {/* Time - Right aligned */}
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: isDark ? "#94a3b8" : "#64748b", fontSize: "12px" }}>{item.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <PaginationControls currentPage={tagsPage} totalPages={totalTagsPages} onPageChange={handleTagsPageChange} />
        </div>
      </div>
    </div>
  )
}
