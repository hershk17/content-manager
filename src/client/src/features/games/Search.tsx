import {
  Box,
  Button,
  Card,
  Image,
  TextInput,
  Text,
  Title,
  Flex,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconSearch } from "@tabler/icons-react";
import { useLazyGameSearchQuery } from "./gamesApi";

export const Search = () => {
  const form = useForm({
    initialValues: {
      searchQuery: "",
    },
    validate: {
      searchQuery: (value) =>
        value.trim().length > 0 ? null : "Please enter a search query",
    },
  });

  const [trigger, { isLoading, data, error }] = useLazyGameSearchQuery();

  const searchResults = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error fetching results.</div>;
    }

    if (data) {
      return data.results.map((game: any) => (
        <Card key={game.id} maw={250} radius="lg">
          <Card.Section>
            <Image src={game.background_image} alt="Cover image" />
          </Card.Section>
          <Title order={4}>{game.name}</Title>
        </Card>
      ));
    }

    return null;
  };

  return (
    <Box maw={1000} m="auto">
      <form
        onSubmit={form.onSubmit((values) => trigger(values.searchQuery, true))}>
        <TextInput
          size="xl"
          radius="lg"
          placeholder="Search for games"
          rightSection={
            <Button type="submit" variant="transparent">
              <IconSearch />
            </Button>
          }
          {...form.getInputProps("searchQuery")}
        />
        <Flex wrap="wrap" gap="lg">
          {searchResults()}
        </Flex>
      </form>
    </Box>
  );
};
