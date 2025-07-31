
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchMessages from "../pages/Tags/Tags Search/SearchMessages";
import SearchItems from "../pages/Tags/Tags Search/SearchItems";
import CrawlerDashboard from "../pages/crawlers/splash-crawlers/CrawlerDashboard";
import OnionCrawler from "../pages/crawlers/splash-crawlers/OnionCrawler";
import WebCrawler from "../pages/crawlers/splash-crawlers/WebCrawler";
import Schedulers from "../pages/crawlers/splash-crawlers/Schedulers";
import Settings from "../pages/crawlers/splash-crawlers/Settings";
import ManualCrawler from "../pages/crawlers/splashcrawlers/ManualCrawler";
import OnionExplorer from "../pages/crawlers/Domain Explorer/OnionExplorer";
import VanityExplorer from "../pages/crawlers/Domain Explorer/VanityExplorer";
import AddCookieJar from "../pages/crawlers/cookiejar/AddCookieJar";
import AllCookieJar from "../pages/crawlers/cookiejar/AllCookieJar";
import ServerStatus from "../pages/servermanagement/diagnostic/ServerStatus";
import AilSync from "../pages/servermanagement/Ailsync/AilSync";
import Profile from "../pages/servermanagement/myprofile/Profile";


const AppRouter = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchItemsByTags" element={< SearchItems/>} />
        <Route path="/SearchMessagesByTags" element={<SearchMessages />} />
        <Route path="/CrawlerDashboard" element={<CrawlerDashboard />} />
       <Route path="/OnionCrawler" element={<OnionCrawler />} />
       <Route path="/WebCrawler" element={<WebCrawler />} />   
       <Route path="/Schedulers" element={<Schedulers />} />  
        <Route path="/Settings" element={<Settings />} />   

        <Route path="/Tags/TagsSearch/SearchItems" element={< SearchItems/>} />
        <Route path="/Tags/TagsSearch/SearchMessages" element={<SearchMessages />} />
        <Route path="/ManualCrawler" element={<ManualCrawler />} />
        <Route path="/OnionExplorer" element={<OnionExplorer/>} />
        <Route path="/VanityExplorer" element={<VanityExplorer/>} />
        <Route path="/AddCookieJar" element={< AddCookieJar/>} />
        <Route path="/AllCookieJar" element={<AllCookieJar/>} />
        <Route path="/ServerStatus" element={<ServerStatus/>} />
        <Route path="/AilSync" element={<AilSync/>} />
        <Route path="/Profile" element={<Profile/>} />

       

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter

