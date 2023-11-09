import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Login from "./features/auth/Login";
import { validateUser } from "./features/auth/authSlice";
import Home from "./features/library/Library";
import { AppDispatch, RootState } from "./stores/store";

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    dispatch(validateUser());
  }, [dispatch]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default App;
