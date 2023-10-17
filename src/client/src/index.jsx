import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import ErrorPage from "./error-page";
import "./index.css";
import Login from "./routes/Login";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Login />} errorElement={<ErrorPage />}></Route>)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline enableColorScheme />
    <RouterProvider router={router} />
  </React.StrictMode>
);
