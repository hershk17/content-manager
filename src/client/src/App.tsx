import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { NavigationProgress } from "@mantine/nprogress";
import { Provider } from "react-redux";

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/nprogress/styles.css";

import { Router } from "@/Router";
import { theme } from "@/themes/baseTheme";
import { store } from "@/stores/store";

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
