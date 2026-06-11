import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function Navbar() {
  const { theme, toggleTheme, bookmarks, currentUser } = useContext(AppContext);

  // Administrative check: Evaluated directly to guarantee immediate state rendering
  const showAdminHub = currentUser && currentUser.email.toLowerCase().trim() === "bavariamonika06@gmail.com";

  return (
    <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 fixed top-0 w-full z-40 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        
        {/* Left Side: Logo */}
        <Link 
          to="/" 
          className="text-lg font-black tracking-tighter uppercase text-slate-900 dark:text-white transition-transform hover:scale-105"
        >
          📰 News<span className="text-blue-600">UI</span>
        </Link>

        {/* Right Side: Interactive Menu System */}
        <div className="flex items-center gap-3">
          
          {/* Admin Desk Access Trigger */}
          {showAdminHub && (
            <Link 
              to="/admin-control-desk" 
              className="text-[11px] font-black uppercase tracking-wider bg-amber-50 hover:bg-amber-100 dark:bg-amber-950/40 dark:hover:bg-amber-950 text-amber-700 dark:text-amber-400 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-900 transition-all shadow-sm flex items-center gap-1 animate-pulse"
            >
              <span>👑 Admin Hub</span>
            </Link>
          )}

          {/* Contact Us Anchor Route Button Link */}
          <Link 
            to="/contact" 
            className="text-[11px] font-black uppercase tracking-wider bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm flex items-center gap-1.5"
          >
            <span className="text-blue-600 dark:text-blue-400 text-xs">✉️</span>
            <span>Contact Us</span>
          </Link>

          {/* Saved Bookmarks Notifications Count Badge Counter */}
          <Link 
            to="/" 
            className="relative p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
          >
            <span className="text-sm">🔖</span>
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center shadow-md">
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* Theme Dynamic Controller Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
          >
            {theme === "light" ? <span className="text-sm">🌙</span> : <span className="text-sm">☀️</span>}
          </button>

        </div>
      </div>
    </nav>
  );
}