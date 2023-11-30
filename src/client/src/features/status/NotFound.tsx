import { Box, Button, Image, Text, Title } from "@mantine/core";
import { useDocumentTitle } from "@mantine/hooks";
import { Link } from "react-router-dom";

export const NotFound = () => {
  useDocumentTitle("404 | Nexus");

  return (
    <Box miw={300} maw="60dvw" ml={50}>
      <Image src="https://i.ibb.co/nBRXZ3L/404.png" maw={500} mah={320} />
      <Title my="md">Something is not right...</Title>
      <Text c="dimmed" size="lg" mb="md">
        The page you are looking for does not exist. You may have mistyped the
        address, or the page has been moved to another URL. If you think this is
        an error contact support.
      </Text>
      <Button
        component={Link}
        to="/home"
        size="md"
        mt="xl"
        unstable_viewTransition>
        Return home
      </Button>
    </Box>
  );
};
