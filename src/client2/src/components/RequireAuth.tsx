import { useSelector } from "react-redux";
import { Login } from "../features/auth/Login";
import { RootState } from "../stores/store";
import { Navigate } from "react-router";

interface Props {
  children: React.ReactNode;
}

export function RequireAuth({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    // return <Login />;
    // return <Navigate to="/login" replace />;
  }

  return children;
}
