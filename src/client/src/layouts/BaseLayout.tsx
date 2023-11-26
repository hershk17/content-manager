import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";

export const BaseLayout = () => {
  return (
    <AppShell>
      <AppShell.Main h="100dvh" w="100dvw" m="auto">
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
