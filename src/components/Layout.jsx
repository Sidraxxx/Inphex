import React from "react";
import { useTheme } from "../context/ThemeContext";
import Navbar from "./Navbar";
import AppRouter from "../routes/AppRouter";
import { AuthProvider } from "../context/AuthContext";

const Layout = () => {
  const { theme } = useTheme();
  const darkMode = theme === "dark";

  return (
    <div
      className={`min-h-screen sm:px-5 md:px-10 lg:20 xl:px-30 ${
        darkMode ? "" : "bg-white"
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
      <AuthProvider>
        
      <AppRouter />
      </AuthProvider>
    </div>
  );
};

export default Layout;
