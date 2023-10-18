export default function Login() {
  return (
    <div>
      <a href={`https://localhost:3000/auth/google`}>
        <span>Login with Google</span>
      </a>
      <br />
      <a href={`https://localhost:3000/auth/facebook`}>
        <span>Login with Facebook</span>
      </a>
    </div>
  );
}
