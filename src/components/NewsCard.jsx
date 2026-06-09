import { useNavigate } from "react-router-dom";
import { Bookmark, Share2, ArrowRight } from "lucide-react";
//import { useApp } from "../context/AppContext";
import { useContext } from "react"; // Add useContext here
import { AppContext } from "../context/AppContext"; // Import AppContext instead of useApp
// Keep your other imports (lucide-react, react-router-dom) the same...
export default function NewsCard({ article }) {
  const navigate = useNavigate();
  const { toggleBookmark, bookmarks } = useContext(AppContext);
  const isBookmarked = bookmarks.some((b) => b.url === article.url);

  const handleDetails = () => {
    navigate(`/news/${btoa(article.url)}`, { state: { article } });
  };

  const handleShare = async (e) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url: article.url });
      } catch (err) { console.warn(err); }
    } else {
      navigator.clipboard.writeText(article.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 flex flex-col hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-700">
        <img
          src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600"}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md">
          {article.source?.name || "News Network"}
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <p className="text-xs text-slate-400 mb-2">
            {article.publishedAt ? new Date(article.publishedAt).toLocaleDateString() : "Recent"}
          </p>
          <h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-slate-50 line-clamp-2 mb-2 group-hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
          <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
            {article.description || "Read full visual story information inside the article preview stream folder directly."}
          </p>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-700">
          <button onClick={handleDetails} className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400">
            Read More <ArrowRight className="h-3.5 w-3.5" />
          </button>
          <div className="flex gap-1">
            <button onClick={() => toggleBookmark(article)} className={`p-2 rounded-lg ${isBookmarked ? "text-yellow-500" : "text-slate-400"}`}>
              <Bookmark className="h-4 w-4" fill={isBookmarked ? "currentColor" : "none"} />
            </button>
            <button onClick={handleShare} className="p-2 rounded-lg text-slate-400">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}