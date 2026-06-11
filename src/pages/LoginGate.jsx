import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

export default function LoginGate() {
  const { handleLogin } = useContext(AppContext);
  const navigate = useNavigate();

  // Toggle state between "login" screen view and "signup" screen view
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    contactNo: "",
    email: "",
    password: "", // Secured string variable parameter
    country: "India",
    description: "" 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Strict verification handling depending on active layout screen setting
    if (isSignUpMode) {
      if (!formData.name || !formData.contactNo || !formData.email || !formData.password || !formData.description) {
        alert("Please complete all registration parameters including your account security password.");
        return;
      }
    } else {
      if (!formData.email || !formData.password || !formData.name) {
        alert("Please provide your profile name, email, and validation password to continue.");
        return;
      }
    }
    
    try {
      // Direct submission to the authentication context processing engine
      handleLogin(formData);
      
      // If no validation errors/mismatches are thrown, unlock and navigate to the portal feed!
      navigate("/");
    } catch (error) {
      // If AppContext rejects the password match, clear out the field and freeze navigation
      setFormData({ ...formData, password: "" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 flex flex-col lg:flex-row items-center justify-center lg:gap-16 p-4 sm:p-8 transition-colors font-sans">
      
      {/* LEFT COLUMN: Facebook-Style Bold Brand Signature Pitch */}
      <div className="text-center lg:text-left max-w-md lg:mb-0 mb-8 lg:mt-0 mt-6 animate-fade-in">
        <h1 className="text-5xl lg:text-6xl font-black tracking-tighter text-blue-600 dark:text-blue-500">
          news<span className="text-slate-900 dark:text-white">ui</span>
        </h1>
        <p className="text-lg sm:text-2xl font-medium text-slate-700 dark:text-slate-300 mt-3 leading-tight tracking-tight">
          NewsUI helps you connect and track global live bulletins streaming straight into your workspace.
        </p>
      </div>

      {/* RIGHT COLUMN: Interactive Dynamic Authorization Card Layout */}
      <div className="w-full max-w-[400px]">
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl space-y-4">
          
          <form onSubmit={handleSubmit} className="space-y-3.5">
            
            {/* SIGNUP MODE EXCLUSIVE INPUT FIELDS */}
            {isSignUpMode && (
              <>
                <div>
                  <input 
                    type="text" name="name" value={formData.name} onChange={handleChange} required
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" 
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <input 
                    type="tel" name="contactNo" value={formData.contactNo} onChange={handleChange} required
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" 
                    placeholder="Contact mobile number"
                  />
                </div>
              </>
            )}

            {/* SHARED INPUT FIELD: Email address tracking row */}
            <div>
              <input 
                type="email" name="email" value={formData.email} onChange={handleChange} required
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner normal-case" 
                placeholder="Email address"
              />
            </div>

            {/* SHARED INPUT FIELD: Masked secure password character input */}
            <div>
              <input 
                type="password" name="password" value={formData.password} onChange={handleChange} required
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner normal-case" 
                placeholder={isSignUpMode ? "Create account password" : "Enter account password"}
              />
            </div>

            {/* LOGIN MODE EXCLUSIVE INPUT FIELDS */}
            {!isSignUpMode && (
              <div>
                <input 
                  type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 transition-colors shadow-inner" 
                  placeholder="Profile validation name (e.g. Monika)"
                />
              </div>
            )}

            {/* SIGNUP MODE EXCLUSIVE SELECTORS & SYSTEM INQUIRY TEXTAREAS */}
            {isSignUpMode && (
              <>
                <div>
                  <select 
                    name="country" value={formData.country} onChange={handleChange}
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                  >
                    <option value="India">India</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Australia">Australia</option>
                  </select>
                </div>

                <div>
                  <textarea 
                    name="description" value={formData.description} onChange={handleChange} rows="2" required
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 font-medium normal-case focus:outline-none focus:border-blue-500 shadow-inner resize-none transition-colors"
                    placeholder="Write an initial verification profile note here..."
                  ></textarea>
                </div>
              </>
            )}

            {/* Core Gateway Form Submission Button */}
            <button 
              type="submit" 
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-base uppercase rounded-xl transition-all shadow-md tracking-wider mt-1"
            >
              {isSignUpMode ? "Sign Up Account" : "Log In"}
            </button>

          </form>

          {/* Forgot Pass Parameters Mock Layout Trigger */}
          <div className="text-center text-xs text-blue-600 dark:text-blue-400 hover:underline cursor-pointer border-b border-slate-100 dark:border-slate-800 pb-4 font-medium">
            Forgot password parameters?
          </div>

          {/* Toggle Screen Workspace View State Switch Action Button */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => {
                setIsSignUpMode(!isSignUpMode);
                // Clean input structures across toggle switches
                setFormData({ name: "", contactNo: "", email: "", password: "", country: "India", description: "" });
              }}
              className="px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md"
            >
              {isSignUpMode ? "Already Have an Account?" : "Create New Account Node"}
            </button>
          </div>

        </div>

        {/* Branding Footer Meta Tag Element */}
        <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4 font-medium normal-case">
          <span className="font-bold uppercase text-[10px]">Create a Page</span> for a celebrity, brand or tech architecture workspace portfolio.
        </p>
      </div>

    </div>
  );
}