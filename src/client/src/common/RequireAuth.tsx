import { Login } from "@/features/auth/Login";
import { useValidateQuery } from "@/features/auth/authApi";

interface Props {
  children: React.ReactNode;
}

export function RequireAuth({ children }: Props) {
  const { data, isFetching, isLoading } = useValidateQuery();

  if (isFetching || isLoading) {
    return null;
  }

  if (!data) {
    return <Login />;
  }

  return children;
}
