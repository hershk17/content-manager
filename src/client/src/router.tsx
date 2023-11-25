import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import { Login } from "../../client/src/features/auth/Login";
import { Register } from "../../client/src/features/auth/Register";
import { RequireAuth } from "./components/RequireAuth";
import { Home } from "./features/dashboard/Home";
import { SteamLibrary } from "./features/library/SteamLibrary";
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
        element: <Home />,
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
        path: "/library",
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
