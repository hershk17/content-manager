export default function Login() {
  const handleClick = () => {
    if (window.location.href.includes("localhost")) {
      window.location.href = "http://localhost:3000/api/auth/google";
    } else {
      window.location.href = "http://game-nexus-env.eba-jxqhrsxd.us-east-1.elasticbeanstalk.com/api/auth/google";
    }
  };

  return (
    <div>
      <button onClick={handleClick}>
        <span>TEST</span>
      </button>
      <a href="/api/auth/google">Login with Google</a>
    </div>
  );
}
