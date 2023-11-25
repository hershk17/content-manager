import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { Provider } from "react-redux";
import { Router } from "./router";
import { store } from "./stores/store";
import { theme } from "./theme";

export const App = () => {
  return (
    <MantineProvider theme={theme}>
      <Provider store={store}>
        <NavigationProgress />
        <Notifications />
        <Router />
      </Provider>
    </MantineProvider>
  );
};
