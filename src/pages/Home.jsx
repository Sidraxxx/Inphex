import { AlignLeft, AlignRight } from "lucide-react";
import React, { use } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

// Home2 Component
export default function Home() {
  const [selectedDate, setSelectedDate] = React.useState("2024-01-15");
  const { theme } = useTheme();
  const isDark = theme === "dark";


// Multiple chart datasets for different dates
  const chartDatasets = {
  "2024-01-15": [
    { time: "00:00", live: 35, down: 25 },
    { time: "02:00", live: 55, down: 15 },
    { time: "04:00", live: 25, down: 35 },
    { time: "06:00", live: 45, down: 20 },
    { time: "08:00", live: 65, down: 10 },
    { time: "10:00", live: 30, down: 30 },
    { time: "12:00", live: 50, down: 25 },
    { time: "14:00", live: 40, down: 20 },
    { time: "16:00", live: 60, down: 15 },
    { time: "18:00", live: 35, down: 25 },
    { time: "20:00", live: 55, down: 20 },
    { time: "22:00", live: 45, down: 30 },
  ],
  "2024-02-20": [
    { time: "00:00", live: 42, down: 18 },
    { time: "02:00", live: 38, down: 22 },
    { time: "04:00", live: 55, down: 15 },
    { time: "06:00", live: 30, down: 35 },
    { time: "08:00", live: 48, down: 12 },
    { time: "10:00", live: 62, down: 8 },
    { time: "12:00", live: 35, down: 25 },
    { time: "14:00", live: 58, down: 12 },
    { time: "16:00", live: 45, down: 20 },
    { time: "18:00", live: 52, down: 18 },
    { time: "20:00", live: 40, down: 30 },
    { time: "22:00", live: 60, down: 10 },
  ],
  "2024-03-10": [
    { time: "00:00", live: 28, down: 32 },
    { time: "02:00", live: 65, down: 5 },
    { time: "04:00", live: 40, down: 20 },
    { time: "06:00", live: 55, down: 15 },
    { time: "08:00", live: 35, down: 25 },
    { time: "10:00", live: 48, down: 22 },
    { time: "12:00", live: 62, down: 8 },
    { time: "14:00", live: 30, down: 30 },
    { time: "16:00", live: 58, down: 12 },
    { time: "18:00", live: 45, down: 25 },
    { time: "20:00", live: 38, down: 22 },
    { time: "22:00", live: 52, down: 18 },
  ],
  "2024-04-05": [
    { time: "00:00", live: 50, down: 20 },
    { time: "02:00", live: 32, down: 28 },
    { time: "04:00", live: 58, down: 12 },
    { time: "06:00", live: 25, down: 35 },
    { time: "08:00", live: 60, down: 10 },
    { time: "10:00", live: 42, down: 18 },
    { time: "12:00", live: 38, down: 22 },
    { time: "14:00", live: 55, down: 15 },
    { time: "16:00", live: 30, down: 30 },
    { time: "18:00", live: 48, down: 22 },
    { time: "20:00", live: 62, down: 8 },
    { time: "22:00", live: 35, down: 25 },
  ],
  "2024-05-12": [
    { time: "00:00", live: 45, down: 25 },
    { time: "02:00", live: 60, down: 10 },
    { time: "04:00", live: 32, down: 28 },
    { time: "06:00", live: 52, down: 18 },
    { time: "08:00", live: 28, down: 32 },
    { time: "10:00", live: 58, down: 12 },
    { time: "12:00", live: 40, down: 20 },
    { time: "14:00", live: 35, down: 25 },
    { time: "16:00", live: 55, down: 15 },
    { time: "18:00", live: 42, down: 18 },
    { time: "20:00", live: 48, down: 22 },
    { time: "22:00", live: 62, down: 8 },
  ],
};

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

 // Add function to get current categories data
  const getCurrentCategoriesData = () => {
    return categoriesDatasets[selectedDate] || categoriesDatasets["2024-01-15"]
  }
  const styles = {
    container: {
      
      // background: isDark ? "#0f172a" : "#f8fafc",
      
      display: "flex",
      flexDirection: "column",
      gap: "24px",
      color: isDark ? "#ffffff" : "#0f172a",
    },
    topRow: {
      display: "flex",
       border: "1.5px solid",
        borderColor: isDark ? "#25313F" : "#d1d5db",
        borderRadius: "8px",
    },
    bottomGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
    },
  };
return (
  <div style={styles.container}>
    {/* Top Row */}
    <div style={styles.topRow}>
      <ChartCard 
        isDark={isDark} 
        selectedDate={selectedDate} 
        chartData={chartDatasets[selectedDate]} 
      />
      <TagList 
        isDark={isDark} 
        selectedDate={selectedDate} 
        setSelectedDate={setSelectedDate}
        categories={getCurrentCategoriesData()}
      />
    </div>

    {/* Bottom Row */}
    <div style={styles.bottomGrid}>
      <TrackerTable isDark={isDark} data={allTrackersData} />
      <TagsTable isDark={isDark} data={allTagsData} />
    </div>
  </div>
);} 


// Pagination Component
function Pagination({ isDark, currentPage, totalPages, onPageChange }) {
  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 16px",
      color: isDark ? "#d1d5db" : "#374151",
    },
    buttonGroup: {
      display: "flex",
      gap: "8px",
      
    },
    button: {
      padding: "2px 10px",
      fontSize: "12px",
      background: "transparent",
      border: `1px solid ${isDark ? "#25313F" : "#d1d5db"}`,
      borderRadius: "4px",
      color: isDark ? "#d1d5db" : "#374151",
      cursor: "pointer",
    },
    activeButton: {
      background: "#3b82f6",
      color: "#fff",
      border: "1px solid #3b82f6",
    },
  };

  return (
    <div style={styles.container}>
      {/* Left */}
      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        >
          {"<<"} First
        </button>
        <button
          style={styles.button}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {"<"} Back
        </button>
      </div>

      {/* Middle Pages */}
      <div style={styles.buttonGroup}>
        {[...Array(totalPages)].slice(0, 4).map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => onPageChange(pageNum)}
              style={
                pageNum === currentPage
                  ? { ...styles.button, ...styles.activeButton }
                  : styles.button
              }
            >
              {pageNum}
            </button>
          );
        })}
        {totalPages > 4 && <span>... {totalPages}</span>}
      </div>

      {/* Right */}
      <div style={styles.buttonGroup}>
        <button
          style={styles.button}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next {">"}
        </button>
        <button
          style={styles.button}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        >
          Last {">>"}
        </button>
      </div>
    </div>
  );
}

function TrackerTable({ isDark, data }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const styles = {
    container: {
      background: isDark ? "transparent" : "#ffffff",
      border: `1.5px solid ${isDark ? "#25313F" : "#d1d5db"}`,
      borderRadius: "8px",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
      color: isDark ? "#d1d5db" : "#374151",
    },
    thead: {
      background: "#1E293B"
    },
    th: {
      padding: "8px 16px",
      textAlign: "left",
      color: "#38BDF8",
    },
    td: {
      padding: "8px 16px",
    },
    row: {
      borderBottom: `1.5px solid ${isDark ? "#25313F" : "#e5e7eb"}`,
      cursor: "pointer",
      transition: "background 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>Tracker</th>
            <th style={styles.th}>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr
              key={item.id}
              style={styles.row}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = isDark ? "#374151" : "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={styles.td}>{item.tracker}</td>
              <td style={styles.td}>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        isDark={isDark}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}


function TagsTable({ isDark, data }) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = data.slice(startIndex, startIndex + itemsPerPage);

  const styles = {
    container: {
      background: isDark ? "transparent" : "#ffffff",
      border: `1.5px solid ${isDark ? "#25313F" : "#d1d5db"}`,
      borderRadius: "8px",
      overflow: "hidden",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      fontSize: "14px",
      color: isDark ? "#d1d5db" : "#374151",
    },
    thead: {
      background: "#1E293B",
    },
    th: {
      padding: "8px 16px",
      textAlign: "left",
      color: "#38BDF8",
    },
    td: {
      padding: "8px 16px",
    },
    row: {
      borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
      cursor: "pointer",
      transition: "background 0.2s",
    },
  };

  return (
    <div style={styles.container}>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Tags</th>
            <th style={styles.th}>Time</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr
              key={item.id}
              style={styles.row}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = isDark ? "#374151" : "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <td style={styles.td}>{item.id}</td>
              <td style={styles.td}>{item.tags}</td>
              <td style={styles.td}>{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        isDark={isDark}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
}



// ChartCard Component
function ChartCard({ isDark, selectedDate, chartData }) {
  // Use the chart data passed from parent (Home2)
  const data = chartData || [];

  // Calculate totals for badges
  const totalUp = data.reduce((sum, item) => sum + (item.live || 0), 0);
  const totalDown = data.reduce((sum, item) => sum + (item.down || 0), 0);

  const styles = {
    container: {
      background: isDark ? "transparent" : "#ffffff",
      padding: "16px",
      flex: 1,
      
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "8px",
      color: isDark ? "#fff" : "#0f172a",
    },
    badgesRow: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "16px",
      fontSize: "12px",
    },
    badges: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
    },
    badge: (color) => ({
      background: color,
      padding: "4px 8px",
      borderRadius: "4px",
      color: "#fff",
      fontSize: "12px",
    }),
    logo: {
      width: "25px",
      height: "25px",
      borderRadius: "4px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Feeders ({selectedDate})</h2>
        <h2>Crawlers</h2>
      </div>
      <div style={styles.badgesRow}>
        <div style={styles.badges}>
          <img src="/security-grey.svg" style={styles.logo}></img>
          <span style={styles.badge("#16a34a")}>{totalUp} Up</span>
          <span style={styles.badge("#dc2626")}>{totalDown} Down</span>
          <span style={styles.badge("#2563eb")}>
            {totalUp + totalDown} Crawled
          </span>
          <span style={styles.badge("#38bdf8")}>{data.length} Queued</span>
        </div>
        <div style={styles.badges}>
          <img src="/shape-grey.svg" style={styles.logo}></img>
          <span style={styles.badge("#16a34a")}>{totalUp} Up</span>
          <span style={styles.badge("#dc2626")}>{totalDown} Down</span>
          <span style={styles.badge("#2563eb")}>
            {totalUp + totalDown} Crawled
          </span>
          <span style={styles.badge("#38bdf8")}>{data.length} Queued</span>
        </div>
      </div>

    <ResponsiveContainer width="100%" height={320}>
    <BarChart data={data}>
    <CartesianGrid
      stroke={isDark ? "#4b5563" : "#d1d5db"}
      vertical={false}
    />
    {/* NOW USING time FOR X-AXIS */}
    <XAxis dataKey="time" stroke={isDark ? "#ccc" : "#374151"} />
    <YAxis stroke={isDark ? "#ccc" : "#374151"} />
    <Tooltip
      contentStyle={{
        background: isDark ? "#1e293b" : "#f9fafb",
        border: "none",
        color: isDark ? "#fff" : "#374151",
      }}
      labelStyle={{ color: isDark ? "#fff" : "#374151" }}
    />
    <Bar dataKey="down" stackId="a" fill="#ef4444" />
    <Bar dataKey="live" stackId="a" fill="#22c55e" />
  </BarChart>
</ResponsiveContainer>

    </div>
  );
}

// TagList Component
function TagList({ selectedDate, setSelectedDate, categories, isDark }) {
  const styles = {
    container: {
      background: isDark ? "transparent" : "#ffffff",
      borderLeft: `1.5px solid ${isDark ? "#25313F" : "#d1d5db"}`,
      padding: "15px",
      width: "280px",
      display: "flex",
      flexDirection: "column",
    },
    dateInput: {
      background: isDark ? "#374151" : "#f1f5f9",
      color: isDark ? "#fff" : "#374151",
      padding: "4px 8px",
      fontSize: "14px",
      marginBottom: "16px",
      border: "none",
    },
    listContainer: {
      flex: 1,
      overflowY: "auto",
      maxHeight: "350px",
      direction: "ltr",
      scrollbarWidth: "none",
      padding: "13px",
    },
    list: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      direction: "ltr",
    },
    listItem: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 5px",
      fontSize: "14px",
      color: isDark ? "#fff" : "#0f172a",
      borderBottom: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
      cursor: "pointer",
      transition: "background 0.2s",
    },
    // listItemHover: {
    //   background: isDark ? "#374151" : "#f1f5f9",
    // },
    circle: (color) => ({
      width: "12px",
      height: "12px",
      borderRadius: "50%",
      background: color,
    }),
    count: {
      fontWeight: "600",
      marginLeft: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
        style={styles.dateInput}
      />
      <div style={styles.listContainer}>
        <ul style={styles.list}>
          {categories.map((tag, idx) => (
            <li
              key={idx}
              style={styles.listItem}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = isDark ? "#374151" : "#f1f5f9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={styles.circle(tag.color)}></span>
                {tag.name}
              </div>
              <span style={styles.count}>{tag.count}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



