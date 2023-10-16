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
import Home from "./routes/home";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({ uri: "http://localhost:3000/graphql", cache: new InMemoryCache() });

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/" element={<Home />} errorElement={<ErrorPage />}></Route>)
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <CssBaseline enableColorScheme />
      <RouterProvider router={router} />
    </ApolloProvider>
  </React.StrictMode>
);
