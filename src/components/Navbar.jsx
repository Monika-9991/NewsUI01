import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { Sun, Moon, Bookmark, Mail } from "lucide-react";

export default function Navbar() {
  const { theme, toggleTheme, bookmarks } = useContext(AppContext);

  return (
    <nav className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 fixed top-0 w-full z-40 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto h-full px-4 flex items-center justify-between">
        
        {/* Left Side: Brand Logo */}
        <Link 
          to="/" 
          className="text-lg font-black tracking-tighter uppercase text-slate-900 dark:text-white transition-transform hover:scale-105"
        >
          📰 News<span className="text-blue-600">UI</span>
        </Link>

        {/* Right Side: Interactive Action Controls Container */}
        <div className="flex items-center gap-3">
          
          {/* Contact & Login Page Redirect Button */}
          <Link 
            to="/contact" 
            className="text-[11px] font-black uppercase tracking-wider bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 transition-all shadow-sm flex items-center gap-1.5"
          >
            <Mail className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400" />
            <span className="hidden sm:inline">Contact & Login</span>
            <span className="sm:hidden">Login</span>
          </Link>

          {/* Bookmarks Counter Badge Notification Anchor */}
          <Link 
            to="/" 
            className="relative p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            title="View Bookmarks"
          >
            <Bookmark className="h-4 w-4" />
            {bookmarks.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[9px] font-black h-4 w-4 rounded-full flex items-center justify-center animate-pulse shadow-md">
                {bookmarks.length}
              </span>
            )}
          </Link>

          {/* Theme Switch Control Button */}
          <button 
            onClick={toggleTheme} 
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-all shadow-sm"
            title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          >
            {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
          </button>

        </div>
      </div>
    </nav>
  );
}