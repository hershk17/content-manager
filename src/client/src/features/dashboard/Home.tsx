import { Anchor, Text, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { Link } from "react-router-dom";

import styles from "@/features/dashboard/Home.module.css";

export const Home = () => {
  useDocumentTitle("Home | Nexus");

  return (
    <>
      <Title className={styles.title} ta="center" mt={60}>
        Welcome to your <br />
        <Text
          inherit
          variant="gradient"
          component="span"
          gradient={{ from: "pink", to: "yellow" }}>
          Nexus Hub
        </Text>
      </Title>
      <Text c="dimmed" ta="center" size="lg" maw={580} mx="auto" mt="xl">
        Nexus Hub is a platform for tracking, organizing, and managing all your
        video game libraries in one place.{" "}
        <Anchor
          component={Link}
          to="/register"
          size="lg"
          unstable_viewTransition>
          Create an account
        </Anchor>{" "}
        to start managing your libraries.
      </Text>
    </>
  );
};
