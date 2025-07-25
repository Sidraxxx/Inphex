
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchMessages from "../pages/Tags/Tags Search/SearchMessages";
import SearchItems from "../pages/Tags/Tags Search/SearchItems";
import ManualCrawler from "../pages/crawlers/splashcrawlers/ManualCrawler";
import OnionExplorer from "../pages/crawlers/Domain Explorer/OnionExplorer";
import VanityExplorer from "../pages/crawlers/Domain Explorer/VanityExplorer";
import AddCookieJar from "../pages/crawlers/cookiejar/AddCookieJar";
import AllCookieJar from "../pages/crawlers/cookiejar/AllCookieJar";


const AppRouter = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Tags/TagsSearch/SearchItems" element={< SearchItems/>} />
        <Route path="/Tags/TagsSearch/SearchMessages" element={<SearchMessages />} />
        <Route path="/ManualCrawler" element={<ManualCrawler />} />
        <Route path="/OnionExplorer" element={<OnionExplorer/>} />
        <Route path="/VanityExplorer" element={<VanityExplorer/>} />
        <Route path="/AddCookieJar" element={< AddCookieJar/>} />
        <Route path="/AllCookieJar" element={<AllCookieJar/>} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter