import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";
import CategoryTabs from "../components/CategoryTabs";
import Footer from "../components/Footer";

export default function ContactLogin() {
  const { currentUser, loginHistory, handleLogin, handleLogout } = useContext(AppContext);
  
  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    country: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.contactNo || !formData.email || !formData.country) {
      alert("Please fill in all mandatory profile fields.");
      return;
    }
    handleLogin(formData);
    setFormData({ name: "", contactNo: "", email: "", country: "" });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white transition-colors">
      <div>
        <CategoryTabs />
        
        <main className="max-w-4xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* LEFT: Contact & Verification Submission Form */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-black mb-1 uppercase tracking-tight">📬 Contact Desk & Access Portal</h2>
            <p className="text-xs text-slate-400 mb-6 font-medium">Register your parameters to unlock live bulletins tracking.</p>

            {currentUser ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="h-16 w-16 bg-blue-100 dark:bg-blue-950 text-blue-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-3">
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-sm font-bold">Welcome back, {currentUser.name}!</h3>
                <p className="text-xs text-slate-400 mb-6">{currentUser.email} • {currentUser.country}</p>
                <button 
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition-all shadow-sm"
                >
                  Disconnect Profile (Sign Out)
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-400 mb-1.5">Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Monika" className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" required />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-400 mb-1.5">Contact No.</label>
                  <input type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder="+91 XXXXX XXXXX" className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" required />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-400 mb-1.5">Email Identity</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" required />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-400 mb-1.5">Country</label>
                  <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="India" className="w-full text-xs p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800" required />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all shadow-md">
                  Authenticate Account Profile
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Live Device Registration History Tracker Logs */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-xl font-black mb-1 uppercase tracking-tight">📜 Device Access Logbook</h2>
            <p className="text-xs text-slate-400 mb-6 font-medium">Session records executed locally on this terminal setup ({loginHistory.length})</p>

            <div className="flex-1 overflow-y-auto max-h-[380px] space-y-3 pr-1">
              {loginHistory.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-12">No profile registrations recorded yet.</p>
              ) : (
                loginHistory.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700/50 flex flex-col justify-between text-xs">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-800 dark:text-slate-200">👤 {log.name}</span>
                      <span className="text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 font-bold px-2 py-0.5 rounded-md">📍 {log.country}</span>
                    </div>
                    <span className="text-slate-500 dark:text-slate-400 text-[11px]">📞 {log.contactNo} • ✉️ {log.email}</span>
                    <span className="text-[10px] text-slate-400 mt-2 text-right font-medium">🕒 {log.timestamp}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </main>
      </div>
      <Footer />
    </div>
  );
}