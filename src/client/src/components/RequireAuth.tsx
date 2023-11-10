import { useSelector } from "react-redux";
import Login from "../features/auth/Login";
import { RootState } from "../stores/store";

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
