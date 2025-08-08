import React, { useState } from "react";
import { useTheme } from "../../../context/ThemeContext";

// Dummy Data
const userActions = [
  { date: "2024-07-01", item: "User John Doe", action: "Created" },
  { date: "2024-07-02", item: "User Jane Smith", action: "Updated" },
  { date: "2024-07-03", item: "User Mark Lee", action: "Deleted" },
  { date: "2024-07-04", item: "User Emily Clark", action: "Login" },
  { date: "2024-07-05", item: "User Alex Johnson", action: "Password Reset" },
  { date: "2024-07-06", item: "User Mia Wong", action: "Role Changed" },
  { date: "2024-07-07", item: "User Chris Evans", action: "Logout" },
  { date: "2024-07-08", item: "User Sarah Miller", action: "Created" },
  { date: "2024-07-09", item: "User Daniel Garcia", action: "Updated" },
  { date: "2024-07-10", item: "User Sophia Brown", action: "Deleted" },
  { date: "2024-07-11", item: "User William Jones", action: "Login" },
  { date: "2024-07-12", item: "User Olivia Taylor", action: "Password Reset" },
  { date: "2024-07-13", item: "User Ethan Davis", action: "Role Changed" },
  { date: "2024-07-14", item: "User Isabella Thomas", action: "Logout" },
  { date: "2024-07-15", item: "User Matthew Wilson", action: "Created" },
  { date: "2024-07-16", item: "User Ava Martinez", action: "Updated" },
  { date: "2024-07-17", item: "User James Anderson", action: "Deleted" },
  { date: "2024-07-18", item: "User Charlotte Moore", action: "Login" },
  { date: "2024-07-19", item: "User Benjamin Taylor", action: "Password Reset" },
  { date: "2024-07-20", item: "User Harper Clark", action: "Role Changed" },
  { date: "2024-07-21", item: "User Henry Lewis", action: "Logout" },
  { date: "2024-07-22", item: "User Amelia Walker", action: "Created" },
  { date: "2024-07-23", item: "User Lucas Hall", action: "Updated" },
  { date: "2024-07-24", item: "User Mia Allen", action: "Deleted" },
  { date: "2024-07-25", item: "User Elijah Young", action: "Login" },
  { date: "2024-07-26", item: "User Lily Hernandez", action: "Password Reset" },
  { date: "2024-07-27", item: "User Logan King", action: "Role Changed" },
  { date: "2024-07-28", item: "User Zoe Wright", action: "Logout" },
  { date: "2024-07-29", item: "User Jacob Scott", action: "Created" },
  { date: "2024-07-30", item: "User Grace Green", action: "Updated" },
];
export default function UserList() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const totalPages = Math.ceil(userActions.length / rowsPerPage);

  const currentData = userActions.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const containerStyle = {
    
    background: isDark ? "transparent" : "#f8fafc",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "24px",
    color: isDark ? "#ffffff" : "#0f172a",
    marginTop: "30px",
  };

  const contentWrapper = {
    width: "100%",
  };

  return (
    <div style={containerStyle}>
      <div style={contentWrapper}>
        <h1 style={{color: isDark ? "#fff" : "#0f172a", marginBottom: "10px", fontSize:"20px" }}>
          All Users
        </h1>
        <div
          style={{
            height: "3px",
            background: "linear-gradient(to right, #ff0080, #00bfff)",
            marginBottom:"20px",
          }}
        ></div>

        <UserTable isDark={isDark} data={currentData} />
        <div style={{ padding: "10px" }}></div>
        <Pagination
          isDark={isDark}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <LogoutAllUsers />
    </div>
  );
}
// Table Component
function UserTable({ isDark, data }) {
  return (
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        background: isDark ? "#0E11164D" : "#B7B7B71A",
        borderRadius: "8px",
        overflow: "hidden",
        tableLayout: "fixed", // prevents columns from shifting

      }}
    >
      <thead style={{ background: "#1e293b", color: "#50b8e4" }}>
        <tr>
          <th style={{ padding: "12px", textAlign: "left", width: "20%" }}>Date</th>
          <th style={{ padding: "12px", textAlign: "left", width: "50%" }}>Item</th>
          <th style={{ padding: "12px", textAlign: "left", width: "30%" }}>Action</th>
        </tr>
      </thead>
      <tbody>
        {data.map((record, i) => (
          <tr key={i}>
            <td
              style={{
                padding: "12px",
                
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: isDark ? "#94A3B8" : "#475569",
              }}
            >
              {record.date}
            </td>
            <td
              style={{
                padding: "12px",
            
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: isDark ? "#94A3B8" : "#475569",

              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = isDark ? "#374151" : "#e0f2fe")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              {record.item}
            </td>
            <td
              style={{
                padding: "12px",
              
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: isDark ? "#94A3B8" : "#475569",

              }}
            >
              {record.action}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Pagination({ isDark, currentPage, totalPages, setCurrentPage }) {
  const styles = {
    pagination: {
      display: "flex",
      justifyContent: "center",
      gap: "6px",
      marginTop: "12px",
    },
    pageButton: {
      padding: "6px 10px",
      background: "transparent",
      border: `1px solid ${isDark ? "#4b5563" : "#d1d5db"}`,
      borderRadius: "4px",
      color: isDark ? "#d1d5db" : "#374151",
      cursor: "pointer",
      minWidth: "40px",
      textAlign: "center",
    },
    active: {
      background: "#3b82f6",
      color: "#fff",
    },
    dots: {
      minWidth: "40px",
      textAlign: "center",
      color: isDark ? "#d1d5db" : "#374151",
    },
  };

  let pages = [];
  const maxButtons = 4;

  // If total pages <= 4, show all
  if (totalPages <= maxButtons) {
    pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  } else {
    // If we are close to the end (last 2 pages)
    if (currentPage >= totalPages - 2) {
      pages = [
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    } else {
      // Default: current, prev, next2, ... and last
      const prevPage = Math.max(1, currentPage - 1);
      const next1 = currentPage + 1;
      const next2 = currentPage + 2;

      pages = [prevPage, currentPage, next1, next2, totalPages];

      // Remove duplicates & sort
      pages = [...new Set(pages)].filter((p) => p > 0 && p <= totalPages);
    }
  }

  return (
    <div style={styles.pagination}>
      {/* First & Back */}
      <button
        style={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(1)}
      >
        {"<<"}
      </button>
      <button
        style={styles.pageButton}
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        {"<"}
      </button>

      {/* Pages */}
      {pages.map((p, idx) => {
        // Insert dots before the last page if we are far away
        if (p === totalPages && currentPage < totalPages - 3 && idx === pages.length - 1) {
          return (
            <React.Fragment key={p}>
              <span style={styles.dots}>...</span>
              <button
                style={{
                  ...styles.pageButton,
                  ...(p === currentPage ? styles.active : {}),
                }}
                onClick={() => setCurrentPage(p)}
              >
                {p}
              </button>
            </React.Fragment>
          );
        }

        return (
          <button
            key={p}
            style={{
              ...styles.pageButton,
              ...(p === currentPage ? styles.active : {}),
            }}
            onClick={() => setCurrentPage(p)}
          >
            {p}
          </button>
        );
      })}

      {/* Next & Last */}
      <button
        style={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        {">"}
      </button>
      <button
        style={styles.pageButton}
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(totalPages)}
      >
        {">>"}
      </button>
    </div>
  );
}
// Logout Button
function LogoutAllUsers() {
  const logOutButtonAction = () => {
    // Logic to log out all users
    console.log("All users logged out successfully!");
    //refresh table
    window.location.reload(); // Reload the page to reflect changes
    
  };
  
  return (
    <button
      style={{
        background: "#dc2626",
        color: "#fff",
        padding: "8px 16px",
        borderRadius: "6px",
        border: "none",
        marginTop: "15px",
        cursor: "pointer",
      }}
      onClick={logOutButtonAction}
    >
      Logout All Users
    </button>
  );
}
