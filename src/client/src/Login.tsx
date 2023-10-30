import "./global.css";

const BASE_URL = window.location.origin;
const API_URL = "https://localhost:3000/api";

export default function App() {
  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };
  const handleFacebookLogin = () => {
    window.location.href = `${API_URL}/auth/facebook`;
  };

  return (
    <>
      You are not logged in. <br /> <br />
      <button type="button" onClick={handleGoogleLogin}>
        Sign In with Google
      </button>
      <button type="button" onClick={handleFacebookLogin}>
        Sign In with Facebook
      </button>
    </>
  );
}
