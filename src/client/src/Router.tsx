import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

import { LoaderTest } from "@/common/LoaderTest";
import { RequireAuth } from "@/common/RequireAuth";
import { Login } from "@/features/auth/Login";
import { Register } from "@/features/auth/Register";
import { Home } from "@/features/dashboard/Home";
import { SteamLibrary } from "@/features/library/SteamLibrary";
import { NotFound } from "@/features/status/NotFound";
import { BaseLayout } from "@/layouts/BaseLayout";
import { SidebarLayout } from "@/layouts/SidebarLayout";
import { GameDetails } from "./features/games/GameDetails";
import { Search } from "./features/games/Search";

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
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "library",
        element: (
          <RequireAuth>
            <SteamLibrary />
          </RequireAuth>
        ),
      },
      {
        path: "games/:id",
        element: (
          <RequireAuth>
            <GameDetails />
          </RequireAuth>
        ),
      },
      {
        path: "test",
        element: <LoaderTest />,
      },
      {
        path: "404",
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
