import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";

export default function AdminHub() {
  const { isAdminAuthenticated, loginHistory } = useContext(AppContext);

  // Structural route protection mechanism fallback safety link shield
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-950 px-4 text-center">
        <div className="bg-white dark:bg-slate-900 border border-red-200 dark:border-red-950 p-8 rounded-2xl shadow-xl max-w-md">
          <span className="text-4xl">🛑</span>
          <h2 className="text-xl font-black uppercase text-red-600 mt-4">Access Denied</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Restricted area. Your token credentials do not authorize entry.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-8 w-full flex-1 mt-6">
        
        {/* Admin Branding Header Card Layout */}
        <div className="bg-gradient-to-r from-slate-900 to-blue-900 p-6 rounded-2xl shadow-md text-white mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border border-slate-800">
          <div>
            <span className="text-[10px] bg-blue-600 font-black tracking-widest uppercase px-2 py-0.5 rounded-md">Control Console</span>
            <h1 className="text-2xl font-black uppercase tracking-tight mt-1">👑 Master Administration Hub</h1>
            <p className="text-xs text-slate-300 mt-0.5 font-medium">Review submitted user queries, session metadata, and system security flags.</p>
          </div>
        </div>

        {/* Global Users Analytical Metrics Indicators Grid Layout Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 text-center">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Total Stored Records</h4>
            <p className="text-2xl font-black text-blue-600 dark:text-blue-400 mt-1">{loginHistory.length}</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Node Telemetry Tracking</h4>
            <p className="text-2xl font-black text-emerald-500 mt-1">Live-Vite</p>
          </div>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-sm">
            <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-wider">Token Signature Encryption</h4>
            <p className="text-2xl font-black text-indigo-500 mt-1">JWT-HS256</p>
          </div>
        </div>

        {/* User Query Database Main Component Layout Table Grid */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-black uppercase tracking-wider text-slate-400 mb-4">📥 Live User Inquiries & Queries Log</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3 px-2">Sender Name</th>
                  <th className="py-3 px-2">Contact Info</th>
                  <th className="py-3 px-2">Email</th>
                  <th className="py-3 px-2">Origin</th>
                  <th className="py-3 px-2 text-blue-600 dark:text-blue-400 font-black">Submitted Query / Message</th>
                  <th className="py-3 px-2">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                {loginHistory.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-2 font-bold text-slate-800 dark:text-slate-200 capitalize">{user.name}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400">{user.contactNo}</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400 normal-case">{user.email}</td>
                    <td className="py-3 px-2">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold text-[10px]">{user.country}</span>
                    </td>
                    {/* Captures and highlights query message values */}
                    <td className="py-3 px-2 text-slate-900 dark:text-slate-100 normal-case bg-blue-50/20 dark:bg-blue-950/10 font-semibold max-w-[300px] break-words">
                      {user.description ? `"${user.description}"` : <span className="text-slate-400 italic font-normal">No query text submitted</span>}
                    </td>
                    <td className="py-3 px-2 font-mono text-[10px] text-slate-400">{user.timestamp}</td>
                  </tr>
                ))}
                
                {loginHistory.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-8 italic text-slate-400">No user inquiries found in local system memory.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}