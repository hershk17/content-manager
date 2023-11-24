import { Anchor, Title, Text } from "@mantine/core";
import { ColorSchemeToggle } from "../../../components/ColorSchemeToggle";

import styles from "./styles.module.css";

export const Home = () => {
  return (
    <>
      <Title className={styles.title} ta="center" mt={100}>
        Welcome to{" "}
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Mantine
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        This starter Vite project includes a minimal setup, if you want to learn
        more on Mantine + Vite integration follow{" "}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          this guide
        </Anchor>
        . To get started edit pages/Home.page.tsx file.
      </Text>
      <ColorSchemeToggle />
    </>
  );
};
