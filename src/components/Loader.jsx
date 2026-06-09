export default function Loader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, idx) => (
        <div key={idx} className="animate-pulse bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 h-[400px]">
          <div className="bg-slate-200 dark:bg-slate-700 h-48 w-full"></div>
          <div className="p-5 space-y-4">
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
            <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          </div>
        </div>
      ))}
    </div>
  );
}