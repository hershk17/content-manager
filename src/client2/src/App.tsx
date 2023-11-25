import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { NavigationProgress } from "@mantine/nprogress";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import { Router } from "./router";
import { store } from "./stores/store";
import { theme } from "./theme";

export const App = () => {
  return (
    <HelmetProvider>
      <MantineProvider theme={theme}>
        <Provider store={store}>
          <NavigationProgress />
          <Router />
        </Provider>
      </MantineProvider>
    </HelmetProvider>
  );
};
