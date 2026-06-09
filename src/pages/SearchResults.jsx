import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchBySearch } from "../services/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!query) return;

    async function getResults() {
      try {
        setLoading(true);
        const data = await fetchBySearch(query);
        setArticles(data.articles.filter((a) => a.title !== "[Removed]"));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getResults();
  }, [query]);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-black mb-6 tracking-tight border-b pb-2 dark:border-slate-800">
        🔍 Results for: <span className="text-blue-600">"{query}"</span>
      </h2>

      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <div className="text-center py-20 text-slate-500">No match records discovered for this phrase. Try another target keyword!</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((art, idx) => (
            <NewsCard key={idx} article={art} />
          ))}
        </div>
      )}
    </main>
  );
}