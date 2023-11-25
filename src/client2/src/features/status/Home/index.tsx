import { Anchor, Text, Title } from "@mantine/core";

import styles from "./styles.module.css";

export const Home = () => {
  return (
    <>
      <Title className={styles.title} ta="center" mt={60}>
        Welcome to your <br />
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}
        >
          Nexus Hub
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Nexus Hub is a platform for tracking, organizing, and managing all your
        video game libraries in one place.{" "}
        <Anchor href="https://mantine.dev/guides/vite/" size="lg">
          Create an account
        </Anchor>{" "}
        to start managing your libraries.
      </Text>
    </>
  );
};
