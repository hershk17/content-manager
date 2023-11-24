import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";
import { store } from "./stores/store";
import { theme } from "./theme";
import { NavigationProgress } from "@mantine/nprogress";

export const App = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <MantineProvider theme={theme}>
          <Provider store={store}>
            <NavigationProgress />
            <Router />
          </Provider>
        </MantineProvider>
      </BrowserRouter>
    </HelmetProvider>
  );
};
