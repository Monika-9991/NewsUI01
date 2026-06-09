import { useEffect, useState } from "react";
import { fetchTopNews } from "../services/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import CategoryTabs from "../components/CategoryTabs";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function loadFeed() {
      try {
        setLoading(true);
        const data = await fetchTopNews(1);
        setArticles(data.articles.filter((a) => a.title && a.title !== "[Removed]"));
        if (data.articles.length < 12) setHasMore(false);
      } catch (err) {
        setError("Network error fetching layout feed items.");
      } finally {
        setLoading(false);
      }
    }
    loadFeed();
  }, []);

  const handleLoadMore = async () => {
    try {
      const nextPage = page + 1;
      const data = await fetchTopNews(nextPage);
      const cleanData = data.articles.filter((a) => a.title && a.title !== "[Removed]");
      if (cleanData.length === 0) setHasMore(false);
      setArticles((prev) => [...prev, ...cleanData]);
      setPage(nextPage);
    } catch (err) { console.error(err); }
  };

  if (error) return <div className="text-center py-24 text-red-500 font-bold">{error}</div>;

  return (
    <div>
      <CategoryTabs />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-black mb-6 tracking-tight">⚡ Hot Bulletins</h2>
        {loading && articles.length === 0 ? (
          <Loader />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art, idx) => <NewsCard key={idx} article={art} />)}
            </div>
            {hasMore && (
              <div className="flex justify-center mt-12">
                <button onClick={handleLoadMore} className="px-6 py-2 bg-blue-600 text-white font-bold text-xs rounded-xl shadow">
                  Load More Stories
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}