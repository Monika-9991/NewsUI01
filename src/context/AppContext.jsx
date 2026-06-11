import { createContext, useState, useEffect } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
  // ---------------------------------------------------------
  // 1. STATE INITIALIZATION CLOSURES
  // ---------------------------------------------------------
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");
  const [bookmarks, setBookmarks] = useState(() => JSON.parse(localStorage.getItem("bookmarks")) || []);
  const [currentUser, setCurrentUser] = useState(() => JSON.parse(localStorage.getItem("currentUser")) || null);
  const [loginHistory, setLoginHistory] = useState(() => JSON.parse(localStorage.getItem("loginHistory")) || []);
  const [authToken, setAuthToken] = useState(() => localStorage.getItem("authToken") || null);

  // ---------------------------------------------------------
  // 2. STORAGE SYNCHRONIZATION EFFECT WATCHERS
  // ---------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.className = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    localStorage.setItem("loginHistory", JSON.stringify(loginHistory));
  }, [currentUser, loginHistory]);

  useEffect(() => {
    if (authToken) {
      localStorage.setItem("authToken", authToken);
    } else {
      localStorage.removeItem("authToken");
    }
  }, [authToken]);

  // ---------------------------------------------------------
  // 3. AUTHENTICATION & CORE CRYPTO ENGINES
  // ---------------------------------------------------------
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const toggleBookmark = (article) => {
    setBookmarks((prev) => 
      prev.some((item) => item.url === article.url) 
        ? prev.filter((item) => item.url !== article.url) 
        : [...prev, article]
    );
  };

  // JWT TOKENS SIGNER MOCK INTERACTION NODE
  const generateMockJWT = (payload) => {
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const data = btoa(JSON.stringify({ ...payload, exp: Math.floor(Date.now() / 1000) + 3600 }));
    const signature = btoa("newsui_secure_secret_signature_hash");
    return `${header}.${data}.${signature}`;
  };

  // JWT TOKENS PARSER DECODER
  const decodeMockJWT = (token) => {
    try {
      if (!token) return null;
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch (e) {
      return null;
    }
  };

  // PROCESS LOGIN FORM CREDENTIALS MATRIX DATA WITH SMART PASSWORD VERIFICATION
  const handleLogin = (userData) => {
    const userEmail = userData.email.toLowerCase().trim();
    
    // 🛡️ PASSWORD SECURITY SHIELD WITH BLANK-PASSWORD FAILSAFE
    // Checks for any pre-existing records matching the email address
    const existingAccount = loginHistory.find(
      (account) => account.email.toLowerCase().trim() === userEmail
    );

    if (existingAccount) {
      // Only enforce password matching if the record has an existing password saved
      if (existingAccount.password && existingAccount.password !== userData.password) {
        alert("🛑 Authentication Failed: Incorrect password for this account node.");
        throw new Error("Auth failed: Invalid password string entry."); 
      }
    }

    // Determine if the input email matches your master administrative account address
    const isOwner = userEmail === "bavariamonika06@gmail.com";

    const tokenPayload = {
      name: userData.name || (existingAccount ? existingAccount.name : "User"),
      email: userEmail,
      role: isOwner ? "admin" : "subscriber"
    };

    const issuedToken = generateMockJWT(tokenPayload);
    
    const newRecord = {
      ...userData,
      name: userData.name || (existingAccount ? existingAccount.name : "User"),
      country: userData.country || (existingAccount ? existingAccount.country : "India"),
      description: userData.description || (existingAccount ? existingAccount.description : ""),
      isAdmin: isOwner,
      token: issuedToken,
      timestamp: new Date().toLocaleString(),
      id: Date.now()
    };

    // Commit parameters to the local state management layer
    setCurrentUser(newRecord);
    setAuthToken(issuedToken); 
    
    // Update structural log arrays cleanly
    if (!existingAccount) {
      // If it's a completely new account, add it straight to your historical logs
      setLoginHistory((prev) => [newRecord, ...prev]);
    } else {
      // If it's an existing profile updating a passwordless account, modify the existing item row
      setLoginHistory((prev) => 
        prev.map((acc) => acc.email.toLowerCase().trim() === userEmail ? { ...acc, password: userData.password } : acc)
      );
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthToken(null);
  };

  // COMPUTE DYNAMIC ACCESS RIGHTS CHECKS
  const decodedToken = decodeMockJWT(authToken);
  const isAdminAuthenticated = decodedToken && decodedToken.role === "admin";

  return (
    <AppContext.Provider
      value={{
        theme, toggleTheme,
        bookmarks, toggleBookmark,
        currentUser, loginHistory, setLoginHistory, // Fully exported for live query submissions
        authToken, isAdminAuthenticated,
        handleLogin, handleLogout
      }}
    >
      {children}
    </AppContext.Provider>
  );
}