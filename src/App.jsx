import './App.css'
import AppRouter from './routes/AppRouter'
import Navbar from './components/Navbar'
// import ManualCrawler from './pages/crawlers/splash-crawlers/CrawlerDashboard';




function App() {
  return (
    <div>
       
    
      <Navbar/>
      <AppRouter />
    </div>
  )
}

export default App