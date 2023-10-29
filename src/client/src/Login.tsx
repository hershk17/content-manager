import "./global.css";

const BASE_URL = window.location.origin;
const API_URL = BASE_URL.includes("localhost:5173") ? "http://localhost:3000/api" : `${BASE_URL}/api`;

export default function App() {
  const handleLogin = () => {
    window.location.href = `${API_URL}/auth/steam`;
  };

  return (
    <>
      You are not logged in. <br /> <br />
      <button type="button" onClick={handleLogin}>
        Sign In with Steam
      </button>
    </>
  );
}
