import { Link } from "react-router-dom";

export default function Footer() {
  // Smoothly scrolls the window viewport back to the top of the browser screen when shifting routes
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 mt-auto py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6 text-xs">
        
        {/* Left Column: Brand Signature */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-1.5 font-black text-sm uppercase tracking-wider text-blue-600 dark:text-blue-500">
            <span className="text-base animate-pulse">🌐</span>
            <span>NewsUI Portal Engine</span>
          </div>
          <p className="text-slate-400 dark:text-slate-500 mt-1 font-medium">
            © 2026 Developer Workspace Terminal. Stored securely on local device memory stacks.
          </p>
        </div>

        {/* Right Column: Quick Links Matrix */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          
          <Link to="/" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            🏠 Home Feed
          </Link>
          
          <Link to="/category/technology" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            📁 Tech Desk
          </Link>
          
          <Link to="/category/business" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            📈 Business Desk
          </Link>
          
          <Link to="/state/delhi" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            📍 Delhi Hub
          </Link>
          
          <Link to="/contact" onClick={scrollToTop} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md flex items-center gap-1">
            ✉️ Contact & Login <span className="text-[10px]">↗️</span>
          </Link>

        </div>

      </div>
    </footer>
  );
}