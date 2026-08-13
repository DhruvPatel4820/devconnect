import { createContext, useEffect, useState } from "react";
import { getCurrentUser, logout } from "../services/auth.service";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    user,
    loading,
    setUser,      // Abhi temporarily rehne do, login ke baad use karenge.
    logoutUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// AuthProvider ka kaam hai:

// 1. Authentication check karna
// 2. User state manage karna
// 3. Loading state manage karna
// 4. Context provide karna