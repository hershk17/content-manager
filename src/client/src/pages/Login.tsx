import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

export default function Login() {
  const { isAuthenticated } = useContext(AuthContext);

  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div>
      You are not logged in. <br /> <br />
      <button type="button" onClick={handleGoogleLogin}>
        Sign In with Google
      </button>
    </div>
  );
}
