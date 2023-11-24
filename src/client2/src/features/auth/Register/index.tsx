import { Helmet } from "react-helmet-async";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../stores/store";

export const Register = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      Register Page
    </>
  );
};
