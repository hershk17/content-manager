import { Route, Routes } from "react-router";
import { Navigate } from "react-router-dom";

import { Suspense } from "react";
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

import StatusComingSoon from "./pages/ComingSoon";
import Dashboard from "./pages/Dashboard";
import StatusMaintenance from "./pages/Maintenance";
import Messenger from "./pages/Messenger";
import Status404 from "./pages/NotFound";
import UserProfile from "./pages/Profile";
import Accordions from "./pages/Samples/Accordions";
import Avatars from "./pages/Samples/Avatars";
import Badges from "./pages/Samples/Badges";
import Buttons from "./pages/Samples/Buttons";
import Cards from "./pages/Samples/Cards";
import Forms from "./pages/Samples/Forms";
import Modals from "./pages/Samples/Modals";
import Tabs from "./pages/Samples/Tabs";
import Tooltips from "./pages/Samples/Tooltips";
import UserSettings from "./pages/Settings";
import Transactions from "./pages/Transactions";
import Status500 from "./pages/Unauthorized";

function router() {
  return (
    <Routes>
      <Route path="" element={<BaseLayout />}>
        <Route path="" element={<SidebarLayout />}>
          <Route path="" element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="messenger" element={<Messenger />} />
          <Route path="transactions" element={<Transactions />} />
        </Route>
        <Route path="profile" element={<SidebarLayout />}>
          <Route path="" element={<Navigate to="details" replace />} />
          <Route path="details" element={<UserProfile />} />
          <Route path="settings" element={<UserSettings />} />
        </Route>
        <Route path="404" element={<Status404 />} />
        <Route path="500" element={<Status500 />} />
        <Route path="maintenance" element={<StatusMaintenance />} />
        <Route path="coming-soon" element={<StatusComingSoon />} />
        <Route path="*" element={<Navigate to="404" replace />} />

        {/* TODO: remove these temporary components after testing */}
        <Route path="sample" element={<SidebarLayout />}>
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
    </Routes>
  );
}

export default router;
