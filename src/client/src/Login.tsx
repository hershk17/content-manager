import "./global.css";

export default function App() {
  const API_URL = import.meta.env.VITE_SERVER_URL;

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };
  // const handleFacebookLogin = () => {
  //   window.location.href = `${API_URL}/auth/facebook`;
  // };

  return (
    <>
      You are not logged in. <br /> <br />
      <button type="button" onClick={handleGoogleLogin}>
        Sign In with Google
      </button>
      {/* <button type="button" onClick={handleFacebookLogin}>
        Sign In with Facebook
      </button> */}
    </>
  );
}
