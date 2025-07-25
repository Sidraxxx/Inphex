
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SearchMessages from "../pages/Tags/Tags Search/SearchMessages";
import SearchItems from "../pages/Tags/Tags Search/SearchItems";
import ManualCrawler from "../pages/crawlers/splashcrawlers/ManualCrawler";
import OnionExplorer from "../pages/crawlers/Domain Explorer/OnionExplorer";
import VanityExplorer from "../pages/crawlers/Domain Explorer/VanityExplorer";

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
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter