import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const BASE_URL = window.location.origin;
const API_URL = BASE_URL.includes("localhost:5173") ? "http://localhost:3000/api" : `${BASE_URL}/api`;

interface User {
  steamId: string;
  username: string;
  avatar: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
  user: User | null;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  setIsAuthenticated: () => null,
  isLoading: true,
  user: null,
});

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const validateUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/validate`, { withCredentials: true });
        if (response.status === 200) {
          setIsAuthenticated(true);
          setUser(response.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    validateUser();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isLoading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
