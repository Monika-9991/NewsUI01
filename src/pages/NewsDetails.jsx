import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchTopNews } from "../services/newsApi";
import NewsCard from "../components/NewsCard";

export default function NewsDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);
  const article = state?.article;

  useEffect(() => {
    if (!article) {
      navigate("/", { replace: true });
      return;
    }
    async function getRelated() {
      try {
        const data = await fetchTopNews(1, 4);
        setRelated(data.articles.filter((a) => a.url !== article.url).slice(0, 3));
      } catch (err) { console.error(err); }
    }
    getRelated();
  }, [article, navigate]);

  if (!article) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <button onClick={() => navigate(-1)} className="mb-4 text-xs font-bold text-blue-600 uppercase">← Back</button>
      <header className="mb-6">
        <span className="bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 text-xs font-bold px-3 py-1 rounded-md">{article.source?.name}</span>
        <h1 className="text-2xl md:text-4xl font-black mt-3 mb-2">{article.title}</h1>
        <p className="text-xs text-slate-400">{article.author && `By ${article.author} • `}{new Date(article.publishedAt).toLocaleDateString()}</p>
      </header>

      <img src={article.urlToImage || "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200"} alt="" className="w-full h-64 md:h-96 object-cover rounded-2xl mb-6" />
      <div className="space-y-4 text-slate-700 dark:text-slate-300">
        <p className="font-semibold text-slate-900 dark:text-white">{article.description}</p>
        <p>{article.content?.replace(/\[\+\d+\schars\]/g, "") || "Full coverage wire text content is expanding on site location feed."}</p>
        <div className="pt-4">
          <a href={article.url} target="_blank" rel="noreferrer" className="bg-slate-900 text-white dark:bg-blue-600 text-xs font-bold px-5 py-3 rounded-xl inline-block">Read Full Original Story ↗</a>
        </div>
      </div>
    </div>
  );
}