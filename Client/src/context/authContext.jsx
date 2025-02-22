import axios from "axios";
import { useState, createContext, useEffect, useContext } from "react";

const context = createContext(null);

export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  const checkLogin = async () => {
    try {
      const user = await axios.get("localhost:3000/api/auth/getuser");
      console.log(user);
      setUser(user.data);
      setIsLoggedIn(true);
    } catch (error) {}
  };

  useEffect(() => {
    checkLogin();
  }, [isLoggedIn]);

  const login = async (res) => {
    console.log(res);

    setUser(res.data);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await axios.post("localhost:3000/api/auth/logout");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <context.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, login, logout }}>
      {children}
    </context.Provider>
  );
};

export const useAuth = () => {
  return useContext(context);
};
