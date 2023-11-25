import { Login } from "../features/auth/Login";
import { useValidateQuery } from "../features/auth/authApi";

interface Props {
  children: React.ReactNode;
}

export function RequireAuth({ children }: Props) {
  const { data, isFetching, isLoading } = useValidateQuery();

  if (isFetching || isLoading) {
    return <div>Loading...</div>;
  }

  console.log(data);

  if (!data) {
    return <Login />;
  }

  return children;
}
