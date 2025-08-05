import React from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";
import AppRouter from "../routes/AppRouter";

const Layout = () => {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div
      className={`min-h-screen transition-colors duration-300  ${
        darkMode ? "" : "bg-gray-50"
      }`}
      style={
        darkMode
          ? {
              background: `radial-gradient(circle at center, #1B3449 0%, #1B3042 25%, #1A232E 50%, #1B2027 75%, #1A1F27 100%)`,
            }
          : {}
      }
    >
      <Navbar />
      <AppRouter />
    </div>
  );
};

export default Layout;
