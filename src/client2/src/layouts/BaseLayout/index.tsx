import { Outlet } from "react-router-dom";
import { Center, Box } from "@mantine/core";

import styles from "./styles.module.css";

export const BaseLayout = () => {
  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};
