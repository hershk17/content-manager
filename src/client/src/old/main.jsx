import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Contact, { action as contactAction, loader as contactLoader } from "./routes(old)/contact";
import { action as destroyAction } from "./routes(old)/destroy";
import EditContact, { action as editAction } from "./routes(old)/edit";
import Index from "./routes(old)/index";
import Root, { action as rootAction, loader as rootLoader } from "./routes(old)/root";
import CssBaseline from "@mui/material/CssBaseline";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} loader={rootLoader} action={rootAction} errorElement={<ErrorPage />}>
      <Route errorElement={<ErrorPage />}>
        <Route index element={<Index />} />
        <Route path="contacts/:contactId" element={<Contact />} loader={contactLoader} action={contactAction} />
        <Route path="contacts/:contactId/edit" element={<EditContact />} loader={contactLoader} action={editAction} />
        <Route path="contacts/:contactId/destroy" action={destroyAction} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <RouterProvider router={router} />
  </React.StrictMode>
);
