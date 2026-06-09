import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchByCategory } from "../services/newsApi";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import CategoryTabs from "../components/CategoryTabs";

export default function Category() {
  const { name } = useParams();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  useEffect(() => {
    async function loadCategory() {
      try {
        setLoading(true);
        setPage(1);
        const data = await fetchByCategory(name, 1);
        setArticles(data.articles.filter((a) => a.title && a.title !== "[Removed]"));
        setTotalResults(data.totalResults);
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    }
    loadCategory();
  }, [name]);

  const handlePagination = async (mode) => {
    const targetPage = mode === "next" ? page + 1 : page - 1;
    try {
      setLoading(true);
      const data = await fetchByCategory(name, targetPage);
      setArticles(data.articles.filter((a) => a.title && a.title !== "[Removed]"));
      setPage(targetPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div>
      <CategoryTabs />
      <main className="max-w-7xl mx-auto px-4 py-6">
        <h2 className="text-xl font-black mb-6 uppercase tracking-tight">📂 Section: <span className="text-blue-600">{name}</span></h2>
        {loading ? <Loader /> : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((art, idx) => <NewsCard key={idx} article={art} />)}
            </div>
            <div className="flex justify-between items-center mt-12 pt-4 border-t border-slate-200 dark:border-slate-800">
              <button disabled={page === 1} onClick={() => handlePagination("prev")} className="px-4 py-2 border text-xs font-bold rounded-xl disabled:opacity-40">← Prev</button>
              <span className="text-xs font-bold text-slate-400">PAGE {page}</span>
              <button disabled={page * 12 >= totalResults} onClick={() => handlePagination("next")} className="px-4 py-2 border text-xs font-bold rounded-xl disabled:opacity-40">Next →</button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}