
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchMessages from "../pages/Tags/Tags Search/SearchMessages";
import SearchItems from "../pages/Tags/Tags Search/SearchItems";
import CrawlADomain from "../pages/crawlers/splashcrawlers/CrawlADomain";
import FilterOnionDomains from "../pages/crawlers/Domain Explorer/FilterOnionDomains";




const AppRouter = () => {
  return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/SearchItemsByTags" element={< SearchItems/>} />
        <Route path="/SearchMessagesByTags" element={<SearchMessages />} />
        <Route path="/CrawlADomain" element={<CrawlADomain />} />
        <Route path="/FilterOnionDomains" element={<FilterOnionDomains/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter