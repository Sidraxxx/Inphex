import {  Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

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
import SearchOcrs from "../pages/Tags/Tags Search/SearchOcrs";
import SearchImages from "../pages/Tags/Tags Search/SearchImages";
import SearchDomains from "../pages/Tags/Tags Search/SearchDomains";
import SearchDecodedItems from "../pages/Tags/Tags Search/SearchDecodedItems";
import SearchScreenshots from "../pages/Tags/Tags Search/SearchScreenshots";
import WebExplorer from "../pages/crawlers/Domain Explorer/WebExplorer";
import AddUser from "../pages/servermanagement/usermanagement/AddUser";
import AllUsers from "../pages/servermanagement/usermanagement/AllUsers";
import OrganizationList from "../pages/servermanagement/Organization/OrganizationList";
import AddOrganization from "../pages/servermanagement/Organization/AddOrganization";
import SignIn from "../pages/SignIn/SignIn";

const AppRouter = () => {
  return (
    <Routes>
      {/* pyblic route  */}
      <Route path="/SignIn" element={<SignIn />} />

      {/* Protected Routes  */}
      <Route path="/" element={ <ProtectedRoute>
            <Home />
          </ProtectedRoute>} />
      <Route path="/SearchItemsByTags" element={<ProtectedRoute><SearchItems /></ProtectedRoute>} />
      <Route path="/SearchMessagesByTags" element={<ProtectedRoute><SearchMessages /></ProtectedRoute>} />
      <Route path="/CrawlerDashboard" element={<ProtectedRoute><CrawlerDashboard /></ProtectedRoute>} />
      <Route path="/OnionCrawler" element={<ProtectedRoute><OnionCrawler /></ProtectedRoute>} />
      <Route path="/WebCrawler" element={<ProtectedRoute><WebCrawler /></ProtectedRoute>} />
      <Route path="/Schedulers" element={<ProtectedRoute><Schedulers /></ProtectedRoute>} />
      <Route path="/Settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      <Route path="/Organizationlist" element={<ProtectedRoute><OrganizationList /></ProtectedRoute>} />
      <Route path="/AddOrganization" element={<ProtectedRoute><AddOrganization /></ProtectedRoute>} />
      <Route path="/Tags/TagsSearch/SearchItems" element={<ProtectedRoute><SearchItems /></ProtectedRoute>} />
      <Route
        path="/Tags/TagsSearch/SearchMessages"
        element={<ProtectedRoute><SearchMessages /></ProtectedRoute>}
      />
      <Route path="/Tags/TagsSearch/SearchOcrs" element={<ProtectedRoute><SearchOcrs /></ProtectedRoute>} />
      <Route path="/Tags/TagsSearch/SearchImages" element={<ProtectedRoute><SearchImages /></ProtectedRoute>} />
      <Route
        path="/Tags/TagsSearch/SearchDomains"
        element={<ProtectedRoute><SearchDomains /></ProtectedRoute>}
      />
      <Route
        path="/Tags/TagsSearch/SearchDecodedItems"
        element={<ProtectedRoute><SearchDecodedItems /></ProtectedRoute>}
      />
      <Route
        path="/Tags/TagsSearch/SearchScreenshots"
        element={<ProtectedRoute><SearchScreenshots /></ProtectedRoute>}
      />
      <Route path="/ManualCrawler" element={<ProtectedRoute><ManualCrawler /></ProtectedRoute>} />
      <Route path="/OnionExplorer" element={<ProtectedRoute><OnionExplorer /></ProtectedRoute>} />
      <Route path="/WebExplorer" element={<ProtectedRoute><WebExplorer /></ProtectedRoute>} />
      <Route path="/VanityExplorer" element={<ProtectedRoute><VanityExplorer /></ProtectedRoute>} />
      <Route path="/AddCookieJar" element={<ProtectedRoute><AddCookieJar /></ProtectedRoute>} />
      <Route path="/AllCookieJar" element={<ProtectedRoute><AllCookieJar /></ProtectedRoute>} />
      <Route path="/ServerStatus" element={<ProtectedRoute><ServerStatus /></ProtectedRoute>} />
      <Route path="/AilSync" element={<ProtectedRoute><AilSync /></ProtectedRoute>} />
      <Route path="/Profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      <Route path="/AllUsers" element={<ProtectedRoute><AllUsers /></ProtectedRoute>} />
      <Route path="/AddUser" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
      <Route path="/AddOrganization" element={<ProtectedRoute><AddOrganization /></ProtectedRoute>} />
      <Route path="/OrganizationList" element={<ProtectedRoute><OrganizationList /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRouter;
