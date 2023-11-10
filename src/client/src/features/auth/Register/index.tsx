import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { RootState } from "../../../stores/Store";

const Register = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.user);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     navigate("/");
  //   }
  // }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Register</h2>
      !TODO!
    </div>
  );
};

export default Register;
