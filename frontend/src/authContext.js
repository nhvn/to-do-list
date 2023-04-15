// authContext.js

import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogin = (name) => {
    setLoggedIn(true);
    setUserName(name);
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName('');
  };

  const value = {
    loggedIn,
    userName,
    handleLogin,
    handleLogout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
