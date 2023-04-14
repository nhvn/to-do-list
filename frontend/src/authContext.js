import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [token, setToken] = useState(null);

  const handleLogin = (token) => {
    setToken(token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setToken(null);
    setLoggedIn(false);
  };

  const value = {
    loggedIn,
    handleLogin,
    handleLogout,
    token,
    setToken, // Add setToken to the value object
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
