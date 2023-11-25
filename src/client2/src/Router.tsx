import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { RequireAuth } from "./components/RequireAuth";
import { Login } from "./features/auth/Login";
import { Register } from "./features/auth/Register";
import { SteamLibrary } from "./features/library/SteamLibrary";
import { Home } from "./features/status/Home";
import { NotFound } from "./features/status/NotFound";
import { BaseLayout } from "./layouts/BaseLayout";
import { SidebarLayout } from "./layouts/SidebarLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="home" replace />,
  },
  {
    path: "/",
    element: <BaseLayout />,
    children: [],
  },
  {
    path: "/",
    element: <SidebarLayout />,
    children: [
      {
        path: "/home",
        // element: <Home />,
        element: (
          <RequireAuth>
            <Home />
          </RequireAuth>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/steamLibrary",
        element: (
          <RequireAuth>
            <SteamLibrary />
          </RequireAuth>
        ),
      },
      {
        path: "/404",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export function Router() {
  return (
    <RouterProvider
      router={router}
      future={{
        v7_startTransition: true,
      }}
    />
  );
}
