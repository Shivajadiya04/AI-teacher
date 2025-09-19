import React, { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { apiGet } from "../../utils/api";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setUser(null);
      setLoadingUser(false);
      return;
    }

    try {
      // backend se current user profile fetch karo
      const data = await apiGet("/api/auth/me");
      setUser(data.user || data); // 🔑 backend agar { user: {...} } bhej raha ho ya sirf {...}
    } catch (err) {
      console.error("Error fetching user info:", err);
      localStorage.removeItem("token"); // invalid token hata do
      setUser(null);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/login"; // redirect to login
  };

  return (
    <UserContext.Provider value={{ user, setUser, loadingUser, fetchUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
