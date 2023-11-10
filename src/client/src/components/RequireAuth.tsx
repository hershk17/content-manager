import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../stores/Store";
import Login from "../features/auth/Login";

interface Props {
  children: React.ReactNode;
}

const RequireAuth = ({ children }: Props) => {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Login />;
    // return <Navigate to="/login" replace />;
  }

  return children;
};

export default RequireAuth;
