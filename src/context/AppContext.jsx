import { createContext, useState, useEffect } from "react";

// Initialize the global broadcast tracking context network channel
export const AppContext = createContext();

export function AppProvider({ children }) {
  // ---------------------------------------------------------
  // 1. INITIAL PARAMETER LIFECYCLE INITIALIZATION CLOSURES
  // ---------------------------------------------------------
  
  // Reads historical settings from the browser hardware storage to prevent state wipe on reload
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const savedBookmarks = localStorage.getItem("bookmarks");
    return savedBookmarks ? JSON.parse(savedBookmarks) : [];
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [loginHistory, setLoginHistory] = useState(() => {
    const savedHistory = localStorage.getItem("loginHistory");
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  // ---------------------------------------------------------
  // 2. HARDWARE PERSISTENCE SYNCHRONIZATION EFFICIENCY WATCHERS
  // ---------------------------------------------------------

  // Monitors and updates system theme classes across HTML nodes
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Syncs article bookmark modifications directly into machine memory
  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  // Locks active profile authentication tokens locally
  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  // Keeps cumulative local terminal access registration logs secure
  useEffect(() => {
    localStorage.setItem("loginHistory", JSON.stringify(loginHistory));
  }, [loginHistory]);

  // ---------------------------------------------------------
  // 3. GLOBAL CORE INTERACTION LOGIC UTILITIES
  // ---------------------------------------------------------

  // Switch dark/light modes smoothly
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Toggles article preservation maps in your tracking context array
  const toggleBookmark = (article) => {
    setBookmarks((prevBookmarks) => {
      const isBookmarked = prevBookmarks.some((item) => item.url === article.url);
      if (isBookmarked) {
        return prevBookmarks.filter((item) => item.url !== article.url);
      } else {
        return [...prevBookmarks, article];
      }
    });
  };

  // Authenticates credentials inputs and pushes profiles into the history array matrix
  const handleLogin = (userData) => {
    const newRecord = {
      name: userData.name,
      contactNo: userData.contactNo,
      email: userData.email,
      country: userData.country,
      timestamp: new Date().toLocaleString(), // Captures the exact moment they log in
      id: Date.now() // Unique tracking ID using epoch timestamp milliseconds
    };

    setCurrentUser(newRecord);
    setLoginHistory((prevHistory) => [newRecord, ...prevHistory]); // Spreads new record right to the top of the feed
  };

  // Disconnects active session tokens without clearing history logs
  const handleLogout = () => {
    setCurrentUser(null);
  };

  // ---------------------------------------------------------
  // 4. ENGINE BROADCASH EMISSION INJECTION EXPORT
  // ---------------------------------------------------------
  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        bookmarks,
        toggleBookmark,
        currentUser,
        loginHistory,
        handleLogin,
        handleLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}