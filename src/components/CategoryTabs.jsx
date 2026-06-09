import { useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Layers, MapPin, Sparkles, Search } from "lucide-react";

const categories = ["Business", "Sports", "Technology", "Entertainment", "Health", "Science"];

const allIndianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", 
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", 
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", 
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", 
  "Uttar Pradesh", "Uttarakhand", "West Bengal",
  "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry", "Chandigarh"
];

export default function CategoryTabs() {
  const navigate = useNavigate();
  const { name, stateName } = useParams();

  // Controls whether the drop-down trays are physically open or shut
  const [openCategoryMenu, setOpenCategoryMenu] = useState(false);
  const [openStateMenu, setOpenStateMenu] = useState(false);
  const [stateSearchQuery, setStateSearchQuery] = useState("");

  const toggleCategoryMenu = () => {
    setOpenCategoryMenu(!openCategoryMenu);
    setOpenStateMenu(false); 
  };

  const toggleStateMenu = () => {
    setOpenStateMenu(!openStateMenu);
    setOpenCategoryMenu(false); 
    setStateSearchQuery("");
  };

  const handleStateClick = (state) => {
    setOpenStateMenu(false); 
    setStateSearchQuery("");
    navigate(`/state/${state.toLowerCase()}`);
  };

  const filteredStates = allIndianStates.filter((state) =>
    state.toLowerCase().includes(stateSearchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm sticky top-16 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:items-center gap-3">
        
        {/* TAB 1: Home (Trending) */}
        <div className="flex-shrink-0">
          <NavLink
            to="/"
            onClick={() => { setOpenCategoryMenu(false); setOpenStateMenu(false); }}
            className={({ isActive }) =>
              `w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }`
            }
          >
            <Sparkles className="h-3.5 w-3.5" /> Home (Trending)
          </NavLink>
        </div>

        {/* TAB 2: Different Category of News Dropdown Main Toggle */}
        <div className="relative">
          <button
            onClick={toggleCategoryMenu}
            className={`w-full md:w-auto inline-flex items-center justify-between gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              name 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" // Stays Blue if a sub-category is currently active
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100" // Off-white when inactive
            }`}
          >
            <span className="flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5" /> 
              {name ? `Category: ${name}` : "Different category of news"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openCategoryMenu ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* TAB 3: India State Wise Dropdown Main Toggle */}
        <div className="relative">
          <button
            onClick={toggleStateMenu}
            className={`w-full md:w-auto inline-flex items-center justify-between gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
              stateName 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" // Stays Blue if an Indian State is currently active
                : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100" // Off-white when inactive
            }`}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> 
              {stateName ? `State: ${stateName}` : "India State Wise"}
            </span>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openStateMenu ? "rotate-180" : ""}`} />
          </button>
        </div>

      </div>

      {/* SUB-PANEL A: Different Category Options */}
      {openCategoryMenu && (
        <div className="bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-3">
            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Select Target Desk Sub-Category</p>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <NavLink
                  key={cat}
                  to={`/category/${cat.toLowerCase()}`}
                  onClick={() => setOpenCategoryMenu(false)}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm" // Active Sub-category turns Blue
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-slate-300" // Inactive items stay Off-White
                    }`
                  }
                >
                  {cat}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-PANEL B: India State Options */}
      {openStateMenu && (
        <div className="bg-slate-50 dark:bg-slate-800/60 border-t border-slate-100 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 py-4">
            
            <div className="relative max-w-xs mb-3">
              <input
                type="text"
                value={stateSearchQuery}
                onChange={(e) => setStateSearchQuery(e.target.value)}
                placeholder="Type to filter states (e.g. Goa, Punjab)..."
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
            </div>

            <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">
              Select Regional State Context ({filteredStates.length} found)
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 max-h-48 overflow-y-auto pr-2">
              {filteredStates.map((state) => {
                // Compares if this specific grid button matches the URL state parameter string
                const isActive = stateName?.toLowerCase() === state.toLowerCase();
                return (
                  <button
                    key={state}
                    onClick={() => handleStateClick(state)}
                    className={`px-2 py-2 text-left rounded-lg text-xs font-semibold border transition-all truncate ${
                      isActive
                        ? "bg-blue-600 text-white border-blue-600 shadow-sm" // Active State turns Blue
                        : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-100 dark:border-slate-700 hover:border-slate-300" // Inactive states stay Off-White
                    }`}
                    title={state}
                  >
                    📍 {state}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}