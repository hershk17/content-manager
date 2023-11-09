import { Suspense, lazy } from "react";
import { RouteObject } from "react-router";
import { Navigate } from "react-router-dom";

import BaseLayout from "./layouts/BaseLayout";
import SidebarLayout from "./layouts/SidebarLayout";

import { JSX } from "react/jsx-runtime";
import SuspenseLoader from "./components/SuspenseLoader";

// Lazy loader
const Loader = (Component: React.LazyExoticComponent<() => JSX.Element>) => (props: JSX.IntrinsicAttributes) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

// Pages
const Overview = Loader(lazy(() => import("./pages/status/Overview")));

// Dashboards
const Crypto = Loader(lazy(() => import("./pages/dashboards/Crypto")));

// Applications
const Messenger = Loader(lazy(() => import("./pages/dashboards/Messenger")));
const Transactions = Loader(lazy(() => import("./pages/dashboards/Transactions")));
const UserProfile = Loader(lazy(() => import("./pages/accounts/Profile")));
const UserSettings = Loader(lazy(() => import("./pages/accounts/Settings")));

// Components
const Buttons = Loader(lazy(() => import("./pages/components/Buttons")));
const Modals = Loader(lazy(() => import("./pages/components/Modals")));
const Accordions = Loader(lazy(() => import("./pages/components/Accordions")));
const Tabs = Loader(lazy(() => import("./pages/components/Tabs")));
const Badges = Loader(lazy(() => import("./pages/components/Badges")));
const Tooltips = Loader(lazy(() => import("./pages/components/Tooltips")));
const Avatars = Loader(lazy(() => import("./pages/components/Avatars")));
const Cards = Loader(lazy(() => import("./pages/components/Cards")));
const Forms = Loader(lazy(() => import("./pages/components/Forms")));

// Status
const Status404 = Loader(lazy(() => import("./pages/status/NotFound")));
const Status500 = Loader(lazy(() => import("./pages/status/Unauthorized")));
const StatusComingSoon = Loader(lazy(() => import("./pages/status/ComingSoon")));
const StatusMaintenance = Loader(lazy(() => import("./pages/status/Maintenance")));

const routes: RouteObject[] = [
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Overview />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "status",
        children: [
          {
            path: "",
            element: <Navigate to="404" replace />,
          },
          {
            path: "404",
            element: <Status404 />,
          },
          {
            path: "500",
            element: <Status500 />,
          },
          {
            path: "maintenance",
            element: <StatusMaintenance />,
          },
          {
            path: "coming-soon",
            element: <StatusComingSoon />,
          },
        ],
      },
      {
        path: "*",
        element: <Status404 />,
      },
    ],
  },
  {
    path: "dashboards",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="crypto" replace />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
      {
        path: "messenger",
        element: <Messenger />,
      },
    ],
  },
  {
    path: "management",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="transactions" replace />,
      },
      {
        path: "transactions",
        element: <Transactions />,
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: <Navigate to="details" replace />,
          },
          {
            path: "details",
            element: <UserProfile />,
          },
          {
            path: "settings",
            element: <UserSettings />,
          },
        ],
      },
    ],
  },
  {
    path: "/components",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="buttons" replace />,
      },
      {
        path: "buttons",
        element: <Buttons />,
      },
      {
        path: "modals",
        element: <Modals />,
      },
      {
        path: "accordions",
        element: <Accordions />,
      },
      {
        path: "tabs",
        element: <Tabs />,
      },
      {
        path: "badges",
        element: <Badges />,
      },
      {
        path: "tooltips",
        element: <Tooltips />,
      },
      {
        path: "avatars",
        element: <Avatars />,
      },
      {
        path: "cards",
        element: <Cards />,
      },
      {
        path: "forms",
        element: <Forms />,
      },
    ],
  },
];

export default routes;

// import { RouteObject } from "react-router";
// import { Navigate } from "react-router-dom";

// import { Tabs } from "@mui/material";
// import Messenger from "./content/applications/Messenger";
// import Transactions from "./content/applications/Transactions";
// import UserProfile from "./content/applications/Users/profile";
// import UserSettings from "./content/applications/Users/settings";
// import Crypto from "./content/dashboards/Crypto";
// import Overview from "./content/overview";
// import Accordions from "./content/pages/Components/Accordions";
// import Avatars from "./content/pages/Components/Avatars";
// import Badges from "./content/pages/Components/Badges";
// import Cards from "./content/pages/Components/Cards";
// import Forms from "./content/pages/Components/Forms";
// import Modals from "./content/pages/Components/Modals";
// import Tooltips from "./content/pages/Components/Tooltips";
// import StatusComingSoon from "./content/pages/Status/ComingSoon";
// import StatusMaintenance from "./content/pages/Status/Maintenance";
// import Status404 from "./content/pages/Status/Status404";
// import Status500 from "./content/pages/Status/Status500";
// import BaseLayout from "./layouts/BaseLayout";
// import SidebarLayout from "./layouts/SidebarLayout";
// import Buttons from "./layouts/SidebarLayout/Header/Buttons";

// const routes: RouteObject[] = [
//   {
//     path: "",
//     element: <BaseLayout />,
//     children: [
//       {
//         path: "/",
//         element: <Overview />,
//       },
//       {
//         path: "overview",
//         element: <Navigate to="/" replace />,
//       },
//       {
//         path: "status",
//         children: [
//           {
//             path: "",
//             element: <Navigate to="404" replace />,
//           },
//           {
//             path: "404",
//             element: <Status404 />,
//           },
//           {
//             path: "500",
//             element: <Status500 />,
//           },
//           {
//             path: "maintenance",
//             element: <StatusMaintenance />,
//           },
//           {
//             path: "coming-soon",
//             element: <StatusComingSoon />,
//           },
//         ],
//       },
//       {
//         path: "*",
//         element: <Status404 />,
//       },
//     ],
//   },
//   {
//     path: "dashboards",
//     element: <SidebarLayout />,
//     children: [
//       {
//         path: "",
//         element: <Navigate to="crypto" replace />,
//       },
//       {
//         path: "crypto",
//         element: <Crypto />,
//       },
//       {
//         path: "messenger",
//         element: <Messenger />,
//       },
//     ],
//   },
//   {
//     path: "management",
//     element: <SidebarLayout />,
//     children: [
//       {
//         path: "",
//         element: <Navigate to="transactions" replace />,
//       },
//       {
//         path: "transactions",
//         element: <Transactions />,
//       },
//       {
//         path: "profile",
//         children: [
//           {
//             path: "",
//             element: <Navigate to="details" replace />,
//           },
//           {
//             path: "details",
//             element: <UserProfile />,
//           },
//           {
//             path: "settings",
//             element: <UserSettings />,
//           },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/components",
//     element: <SidebarLayout />,
//     children: [
//       {
//         path: "",
//         element: <Navigate to="buttons" replace />,
//       },
//       {
//         path: "buttons",
//         element: <Buttons />,
//       },
//       {
//         path: "modals",
//         element: <Modals />,
//       },
//       {
//         path: "accordions",
//         element: <Accordions />,
//       },
//       {
//         path: "tabs",
//         element: <Tabs />,
//       },
//       {
//         path: "badges",
//         element: <Badges />,
//       },
//       {
//         path: "tooltips",
//         element: <Tooltips />,
//       },
//       {
//         path: "avatars",
//         element: <Avatars />,
//       },
//       {
//         path: "cards",
//         element: <Cards />,
//       },
//       {
//         path: "forms",
//         element: <Forms />,
//       },
//     ],
//   },
// ];

// export default routes;
