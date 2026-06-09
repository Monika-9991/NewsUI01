import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchIndiaStateNews } from "../services/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import CategoryTabs from "../components/CategoryTabs";

export default function IndiaStateNews() {
  const { stateName } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    async function loadRegionalFeed() {
      try {
        setLoading(true);
        setPage(1);
        const data = await fetchIndiaStateNews(stateName, 1);
        // Exclude removed placeholders
        setArticles((data.articles || []).filter((a) => a.title && a.title !== "[Removed]"));
        setTotalResults(data.totalResults || 0);
      } catch (err) {
        console.error("State feed failure", err);
      } finally {
        setLoading(false);
      }
    }
    if (stateName) loadRegionalFeed();
  }, [stateName]);

  const handlePagination = async (direction) => {
    const targetPage = direction === "next" ? page + 1 : page - 1;
    try {
      setLoading(true);
      const data = await fetchIndiaStateNews(stateName, targetPage);
      setArticles((data.articles || []).filter((a) => a.title && a.title !== "[Removed]"));
      setPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <CategoryTabs />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-black mb-6 uppercase tracking-tight">
          🇮🇳 Regional Desk / <span className="text-blue-600">{stateName} News Feed</span>
        </h2>

        {loading ? (
          <Loader />
        ) : articles.length === 0 ? (
          <p className="text-center text-slate-400 py-16 text-sm font-medium">
            No live bulletins discovered matching this Indian state parameter.
          </p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art, idx) => (
                <NewsCard key={`${art.url}-${idx}`} article={art} />
              ))}
            </div>

            <div className="flex justify-between items-center mt-12 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                disabled={page === 1}
                onClick={() => handlePagination("prev")}
                className="px-4 py-2 border text-xs font-bold rounded-xl disabled:opacity-40 dark:border-slate-700 hover:bg-slate-50"
              >
                ← Prev Page
              </button>
              <span className="text-xs font-bold text-slate-400">PAGE {page}</span>
              <button
                disabled={page * 9 >= totalResults || articles.length < 9}
                onClick={() => handlePagination("next")}
                className="px-4 py-2 border text-xs font-bold rounded-xl disabled:opacity-40 dark:border-slate-700 hover:bg-slate-50"
              >
                Next Page →
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}