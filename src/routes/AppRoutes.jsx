import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Category from "../pages/Category";
import NewsDetails from "../pages/NewsDetails";
import SearchResults from "../pages/SearchResults";
import IndiaStateNews from "../pages/IndiaStateNews";

// Import your new Contact Desk & Login screen container element
import ContactLogin from "../pages/ContactLogin"; 
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  return (
    <>
      {/* 1. Global Navigation Header (Always stays pinned at the top layout boundary) */}
      <Navbar />
      
      {/* 2. Main Work Content Viewport (Swaps components dynamically based on the active URL string) */}
      <div className="pt-16 min-h-screen flex flex-col">
        <Routes>
          {/* Main Root: Top Trending Global Headlines Grid view */}
          <Route path="/" element={<Home />} />
          
          {/* Standard Desk Categorization (e.g., /category/technology, /category/sports) */}
          <Route path="/category/:name" element={<Category />} />
          
          {/* Regional Geo-Location Filtering Node (e.g., /state/punjab, /state/assam) */}
          <Route path="/state/:stateName" element={<IndiaStateNews />} />
          
          {/* Deep-Read Article Space Workspace Reader (Accepts encoded Base64 link tags) */}
          <Route path="/news/:id" element={<NewsDetails />} />
          
          {/* Global Free-Form Keyword Search Tracker (Parses URL Search Parameters) */}
          <Route path="/search" element={<SearchResults />} />
          
          {/* NEW: Explicit route registration for Contact Us & Session Authentication Portal */}
          <Route path="/contact" element={<ContactLogin />} /> 
          
          {/* Wildcard Fallback Rule: Renders when no other URL template matches (404 Error handler) */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}