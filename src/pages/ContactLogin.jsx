import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Footer from "../components/Footer";

export default function ContactLogin() {
  const { currentUser, handleLogout, loginHistory, setLoginHistory } = useContext(AppContext);
  const [userQuery, setUserQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState(false);

  // Submits the new query message directly into the Admin Database Logs
  const handleQuerySubmit = (e) => {
    e.preventDefault();
    if (!userQuery.trim()) {
      alert("Please enter a valid query string before submitting.");
      return;
    }

    // Construct a new history row entry using the current user's data payload
    const newQueryLog = {
      id: Date.now(),
      name: currentUser.name,
      contactNo: currentUser.contactNo,
      email: currentUser.email,
      country: currentUser.country,
      description: userQuery, // Injecting the fresh query message text
      timestamp: new Date().toLocaleString()
    };

    // Push the query directly up into the global Admin database stream array
    const updatedHistory = [newQueryLog, ...loginHistory];
    setLoginHistory(updatedHistory);
    localStorage.setItem("loginHistory", JSON.stringify(updatedHistory));

    // Clear form UI states
    setUserQuery("");
    setSuccessMessage(true);
    setTimeout(() => setSuccessMessage(false), 4000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div className="max-w-xl mx-auto w-full flex-1 flex items-center justify-center py-12 px-4">
        
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-md w-full relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

          <div className="flex items-center gap-2 mb-6 border-b border-slate-100 dark:border-slate-800 pb-4 mt-2">
            <span className="text-xl">✉️</span>
            <h2 className="text-lg font-black uppercase tracking-tight">Contact Us Support Desk</h2>
          </div>

          <div className="space-y-6">
            {/* Logged In User Summary Header */}
            <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-800">
              <div className="h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-lg font-black uppercase shrink-0">
                {currentUser?.name?.charAt(0)}
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-black text-slate-800 dark:text-white truncate capitalize">{currentUser?.name}</h3>
                <p className="text-[11px] text-slate-400 truncate font-medium">{currentUser?.email} • {currentUser?.country}</p>
              </div>
            </div>

            {/* DYNAMIC INTERACTIVE ZONE: Live User Query Submission Box */}
            <form onSubmit={handleQuerySubmit} className="space-y-3">
              <label className="block text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Submit a Question or Query to Admin:
              </label>
              
              <textarea
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)}
                rows="4"
                className="w-full p-3 text-sm border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-2xl focus:outline-none focus:border-blue-500 shadow-inner resize-none transition-colors"
                placeholder="Type your question, request, or support ticket here..."
              ></textarea>

              {successMessage && (
                <div className="text-[11px] bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 px-3 py-2 rounded-xl text-center font-bold uppercase tracking-wide animate-fade-in">
                  ✅ Success! Your query has been logged securely onto the Admin board.
                </div>
              )}

              <button 
                type="submit" 
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md"
              >
                Transmit Query Ticket
              </button>
            </form>

            {/* Terminal Termination Node */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 text-center">
              <button 
                onClick={handleLogout} 
                className="text-[10px] font-black uppercase tracking-wider text-red-500 hover:text-red-600 transition-colors bg-red-50 dark:bg-red-950/20 px-3 py-1.5 rounded-lg"
              >
                Sign Out & Lock Workspace Terminal
              </button>
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}