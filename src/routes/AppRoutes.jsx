import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Category from "../pages/Category";
import NewsDetails from "../pages/NewsDetails";
import SearchResults from "../pages/SearchResults";
import IndiaStateNews from "../pages/IndiaStateNews";
import ContactLogin from "../pages/ContactLogin"; 
import AdminHub from "../pages/AdminHub"; 
import LoginGate from "../pages/LoginGate"; 
import NotFound from "../pages/NotFound";

export default function AppRoutes() {
  const { currentUser } = useContext(AppContext);

  // 🚪 APP ROUTE GUARD SHIELD: If no profile is detected in local storage, lock out everything!
  if (!currentUser) {
    return (
      <Routes>
        {/* Force catch all URLs and lock them exclusively to the login screen panel layout */}
        <Route path="/login" element={<LoginGate />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  //  UNLOCKED STATE: Authenticated profiles get full layout access to Navbar and core directories
  return (
    <>
      {/* Structural layout components render safely now */}
      <Navbar />
      
      <div className="pt-16 min-h-screen flex flex-col">
        <Routes>
          {/* Main App Feed Unlocks at the basic root directory path */}
          <Route path="/" element={<Home />} />
          <Route path="/category/:name" element={<Category />} />
          <Route path="/state/:stateName" element={<IndiaStateNews />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/search" element={<SearchResults />} />
          
          {/* Dedicated profile review & support workspace card desk */}
          <Route path="/contact" element={<ContactLogin />} /> 
          
          {/* Protected Master Console: Only accessible when admin authentication variables compute to true */}
          <Route path="/admin-control-desk" element={<AdminHub />} /> 
          
          {/* Fallback configuration matches */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}