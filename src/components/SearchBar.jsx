import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Clock, FileText } from "lucide-react";
import { useApp } from "../context/AppContext";
import { fetchBySearch } from "../services/newsApi";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const { recentSearches, addSearchQuery } = useApp();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        const data = await fetchBySearch(query, 1, 5);
        setSuggestions(data.articles.filter(a => a.title && a.title !== "[Removed]").slice(0, 5));
      } catch (err) {
        console.error(err);
      }
    }, 400); // 400ms clean debouncing window

    return () => clearTimeout(delayDebounce);
  }, [query]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = (e, targetQuery) => {
    if (e) e.preventDefault();
    const finalSearch = targetQuery || query;
    if (!finalSearch.trim()) return;

    addSearchQuery(finalSearch);
    setShowDropdown(false);
    navigate(`/search?q=${encodeURIComponent(finalSearch)}`);
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md">
      <form onSubmit={(e) => handleSearch(e)} className="relative">
        <input
          type="text"
          value={query}
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search global stories..."
          className="w-full pl-10 pr-4 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
      </form>

      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden max-h-80">
          {recentSearches.length > 0 && !query && (
            <div className="p-2 border-b border-slate-100 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-400 px-2 uppercase">Recent</p>
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => { setQuery(item); handleSearch(null, item); }}
                  className="w-full text-left flex items-center gap-2 px-2 py-1.5 text-sm rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                >
                  <Clock className="h-3.5 w-3.5 text-slate-400" /> {item}
                </button>
              ))}
            </div>
          )}
          {suggestions.map((article, idx) => (
            <button
              key={idx}
              onClick={() => {
                setShowDropdown(false);
                navigate(`/news/${btoa(article.url)}`, { state: { article } });
              }}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 truncate"
            >
              <FileText className="h-4 w-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">{article.title}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}