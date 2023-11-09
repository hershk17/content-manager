import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../stores/store";

const Login = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  if (isAuthenticated) {
    navigate("/");
  }

  const API_URL = import.meta.env.VITE_SERVER_URL;
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div>
      <h2>Login</h2>
      You are not logged in. <br /> <br />
      <button type="button" onClick={handleGoogleLogin}>
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
