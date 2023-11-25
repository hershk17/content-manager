import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

import styles from "./styles.module.css";

export const BaseLayout = () => {
  return (
    <AppShell>
      <AppShell.Main h="100dvh" w="100dvw" m="auto">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
