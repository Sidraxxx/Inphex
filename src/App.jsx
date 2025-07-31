import { useState } from "react";
import './App.css';
import AppRouter from './routes/AppRouter';
import Navbar from './components/Navbar';
// import ManualCrawler from './pages/crawlers/splash-crawlers/CrawlerDashboard';


function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <div style={{ backgroundColor: isDark ? "#1e293b" : "#f8fafc", minHeight: "100vh" }}>
      <Navbar isDark={isDark} setIsDark={setIsDark} />
      <AppRouter isDark={isDark} />
    </div>
  );
}

export default App;





