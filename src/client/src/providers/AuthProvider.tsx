import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../models/User";

export interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: User | null;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  user: null,
  logout: () => null,
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  const validateUser = async () => {
    const response = await axios.get(`${API_URL}/auth/validate`, { withCredentials: true });
    if (response?.status === 200) {
      setIsAuthenticated(true);
      setUser(response.data);
    }
    setIsLoading(false);
  };

  const logout = async () => {
    const response = await axios.get(`${API_URL}/auth/logout`, { withCredentials: true });
    if (response?.status === 200) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401 && !window.location.pathname.includes("/login")) {
          setIsAuthenticated(false);
          setUser(null);
          navigate("/login");
        }
        return error.response;
      }
    );

    validateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        user,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
