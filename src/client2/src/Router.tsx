import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";
import { validateUser } from "../src/features/auth/authSlice";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import { SteamLibrary } from "./features/library/SteamLibrary";
import { Home } from "./features/status/Home";
import { NotFound } from "./features/status/NotFound";
import { BaseLayout } from "./layouts/BaseLayout";
import { SidebarLayout } from "./layouts/SidebarLayout";
import { AppDispatch, RootState } from "./stores/store";

export function Router() {
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
      <Route path="" element={<Navigate to="home" replace />} />

      {/* routes with no sidebar */}
      <Route path="" element={<BaseLayout />}>
        {/* no routes here for now */}
      </Route>

      {/* routes with sidebar */}
      <Route path="" element={<SidebarLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="404" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/steamLibrary"
          element={
            <RequireAuth>
              <SteamLibrary />
            </RequireAuth>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
}
