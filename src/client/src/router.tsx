import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

import { Suspense, useEffect } from "react";
import SuspenseLoader from "./components/SuspenseLoader";
import BaseLayout from "./layouts/BaseLayout";
import SidebarLayout from "./layouts/SidebarLayout";

const Loader =
  (Component: React.LazyExoticComponent<() => JSX.Element>) =>
  (props: JSX.IntrinsicAttributes) =>
    (
      <Suspense fallback={<SuspenseLoader />}>
        <Component {...props} />
      </Suspense>
    );

// TODO: lazy loading disabled for testing. Enable it later
// const Overview = Loader(lazy(() => import("./pages/status/Overview")));
// const Crypto = Loader(lazy(() => import("./pages/dashboards/Crypto")));
// const Messenger = Loader(lazy(() => import("./pages/dashboards/Messenger")));
// const Transactions = Loader(lazy(() => import("./pages/dashboards/Transactions")));
// const UserProfile = Loader(lazy(() => import("./pages/accounts/Profile")));
// const UserSettings = Loader(lazy(() => import("./pages/accounts/Settings")));
// const Buttons = Loader(lazy(() => import("./pages/components/Buttons")));
// const Modals = Loader(lazy(() => import("./pages/components/Modals")));
// const Accordions = Loader(lazy(() => import("./pages/components/Accordions")));
// const Tabs = Loader(lazy(() => import("./pages/components/Tabs")));
// const Badges = Loader(lazy(() => import("./pages/components/Badges")));
// const Tooltips = Loader(lazy(() => import("./pages/components/Tooltips")));
// const Avatars = Loader(lazy(() => import("./pages/components/Avatars")));
// const Cards = Loader(lazy(() => import("./pages/components/Cards")));
// const Forms = Loader(lazy(() => import("./pages/components/Forms")));
// const Status404 = Loader(lazy(() => import("./pages/status/NotFound")));
// const Status500 = Loader(lazy(() => import("./pages/status/Unauthorized")));
// const StatusComingSoon = Loader(lazy(() => import("./pages/status/ComingSoon")));
// const StatusMaintenance = Loader(lazy(() => import("./pages/status/Maintenance")));

import { useDispatch, useSelector } from "react-redux";
import { validateUser } from "../src/features/auth/authSlice";
import RequireAuth from "./components/RequireAuth";
import Login from "./features/auth/Login";
import Register from "./features/auth/Register";
import SteamLibrary from "./features/library/SteamLibrary";
import StatusComingSoon from "./features/status/ComingSoon";
import StatusMaintenance from "./features/status/Maintenance";
import Status404 from "./features/status/NotFound";
import Status500 from "./features/status/Unauthorized";
import Dashboard from "./features/template/Dashboard";
import Messenger from "./features/template/Messenger";
import Accordions from "./features/template/Samples/Accordions";
import Avatars from "./features/template/Samples/Avatars";
import Badges from "./features/template/Samples/Badges";
import Buttons from "./features/template/Samples/Buttons";
import Cards from "./features/template/Samples/Cards";
import Forms from "./features/template/Samples/Forms";
import Modals from "./features/template/Samples/Modals";
import Tabs from "./features/template/Samples/Tabs";
import Tooltips from "./features/template/Samples/Tooltips";
import Transactions from "./features/template/Transactions";
import UserProfile from "./features/user/Profile";
import UserSettings from "./features/user/Settings";
import { AppDispatch, RootState } from "./stores/Store";

function router() {
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
      {/* <Route path="" element={<BaseLayout />}></Route> */}

      <Route path="" element={<SidebarLayout />}>
        {/* base routes */}
        <Route path="" element={<Navigate to="steamLibrary" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected routes */}
        <Route
          path="/steamLibrary"
          element={
            <RequireAuth>
              <SteamLibrary />
            </RequireAuth>
          }
        />

        {/* example pages/components below, remove once not needed */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="messenger" element={<Messenger />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="profile">
          <Route path="" element={<Navigate to="details" replace />} />
          <Route path="details" element={<UserProfile />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        <Route path="sample">
          <Route path="" element={<Navigate to="buttons" replace />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="modals" element={<Modals />} />
          <Route path="accordions" element={<Accordions />} />
          <Route path="tabs" element={<Tabs />} />
          <Route path="badges" element={<Badges />} />
          <Route path="tooltips" element={<Tooltips />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="cards" element={<Cards />} />
          <Route path="forms" element={<Forms />} />
        </Route>
      </Route>

      {/* status routes */}
      <Route path="404" element={<Status404 />} />
      <Route path="500" element={<Status500 />} />
      <Route path="maintenance" element={<StatusMaintenance />} />
      <Route path="coming-soon" element={<StatusComingSoon />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
}

export default router;
