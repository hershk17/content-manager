import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import User from "../models/User";

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  isLoading: true,
  user: null,
  setUser: () => null,
  logout: () => null,
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401 && !error.response.config.url?.includes("/validate")) {
        setIsAuthenticated(false);
        setUser(null);
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );

  const validateUser = async () => {
    try {
      const response = await axios.get(`${API_URL}/validate`, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data);
      }
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    axios
      .get(`${API_URL}/auth/logout`, { withCredentials: true })
      .then((res) => {
        setIsAuthenticated(false);
        setUser(null);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    validateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
        user,
        setUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
